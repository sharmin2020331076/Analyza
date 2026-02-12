import { type FormEvent, useState } from 'react'
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import { motion, AnimatePresence } from 'framer-motion';

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);
        setStatusText('Uploading the file...');

        try {
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile) throw new Error('Failed to upload file');

            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            console.log('Image conversion result:', imageFile);
            if (!imageFile.file) throw new Error(imageFile.error || 'Failed to convert PDF to image');

            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage) throw new Error('Failed to upload image');

            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText('Analyzing...');
            console.log('Sending to AI...');

            const feedback = await ai.feedback(
                uploadedImage.path,
                prepareInstructions({ jobTitle, jobDescription })
            )

            if (!feedback) throw new Error('Failed to receive feedback from AI');

            let feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;

            console.log('Raw AI Response:', feedbackText);

            // Enhanced JSON sanitization
            // 1. Remove markdown code blocks
            feedbackText = feedbackText.replace(/```json/g, '').replace(/```/g, '');

            // 2. Extract the first valid JSON object using regex
            const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                feedbackText = jsonMatch[0];
            }

            feedbackText = feedbackText.trim();

            try {
                data.feedback = JSON.parse(feedbackText);
            } catch (e) {
                console.error('JSON Parse Error:', e);
                console.log('Failed text:', feedbackText);
                throw new Error(`Failed to parse AI response. Received: ${feedbackText.substring(0, 100)}...`);
            }

            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText('Analysis complete, redirecting...');
            console.log('Success:', data);
            navigate(`/resume/${uuid}`);
        } catch (error: any) {
            console.error('Analysis Error:', error);
            let errorMessage = 'Something went wrong';
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            } else {
                errorMessage = JSON.stringify(error);
            }
            setStatusText(`Error: ${errorMessage}`);
            // Optional: reset after delay or provide manual close
            setTimeout(() => {
                setIsProcessing(false);
                setStatusText('');
            }, 5000);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="relative min-h-screen pt-32">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-accent-violet/10 rounded-full blur-[120px]" />
            </div>

            <section className="relative z-10 flex flex-col items-center gap-8 pt-4 pb-20 px-4 w-full max-w-3xl mx-auto">
                <div className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                    >
                        {isProcessing ? "Analyzing Resume..." : "Upload Your Resume"}
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-text-secondary font-medium max-w-lg mx-auto"
                    >
                        {isProcessing ? statusText : "Get instant AI feedback on your resume's ATS compatibility."}
                    </motion.h2>
                </div>

                <AnimatePresence mode="wait">
                    {isProcessing ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center justify-center p-8 bg-bg-card/50 backdrop-blur-md rounded-3xl border border-white/10 w-full max-w-md aspect-square shadow-2xl"
                        >
                            <img src="/images/resume-scan.gif" className="w-full max-w-[280px] rounded-xl mb-6 opacity-90 mix-blend-screen" />
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                <p className="text-white font-medium animate-pulse">{statusText}</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            id="upload-form"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6 w-full bg-bg-card/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="company-name">Target Company</label>
                                    <input
                                        type="text"
                                        name="company-name"
                                        placeholder="e.g. Google, Microsoft"
                                        id="company-name"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="job-title">Job Title</label>
                                    <input
                                        type="text"
                                        name="job-title"
                                        placeholder="e.g. Frontend Engineer"
                                        id="job-title"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea
                                    rows={4}
                                    name="job-description"
                                    placeholder="Paste the job requirements here..."
                                    id="job-description"
                                    className="resize-none"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label>Resume PDF</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="primary-button mt-4"
                                type="submit"
                                disabled={!file}
                            >
                                Start Analysis
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </section>
        </main>
    )
}
export default Upload
