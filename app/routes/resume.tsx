import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import { motion } from "framer-motion";

export const meta = () => ([
    { title: 'Analyza | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            try {
                if (!id) throw new Error("No Resume ID provided");

                console.log(`Loading resume: ${id}`);
                const resume = await kv.get(`resume:${id}`);

                if (!resume) throw new Error("Resume not found in database");

                const data = JSON.parse(resume);
                console.log("Resume data loaded:", data);

                if (!data.resumePath) throw new Error("Resume path missing in data");
                const resumeBlob = await fs.read(data.resumePath);
                if (!resumeBlob) throw new Error(`Failed to read resume file at: ${data.resumePath}`);

                // If resumeBlob is already a blob, we can use it directly, but ensuring type is good
                const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
                const resumeUrl = URL.createObjectURL(pdfBlob);
                setResumeUrl(resumeUrl);

                if (data.imagePath) {
                    const imageBlob = await fs.read(data.imagePath);
                    if (imageBlob) {
                        const imageUrl = URL.createObjectURL(imageBlob);
                        setImageUrl(imageUrl);
                    } else {
                        console.warn("Failed to read image file, skipping preview image");
                    }
                }

                if (!data.feedback) throw new Error("No feedback data found for this resume");
                setFeedback(data.feedback);
                console.log("Feedback loaded successfully");
            } catch (err: any) {
                console.error("Error loading resume:", err);
                setError(err.message || "Failed to load resume details");
            }
        }

        loadResume();
    }, [id]);

    if (error) {
        return (
            <main className="!pt-32 relative min-h-screen flex flex-col items-center justify-center">
                <div className="bg-bg-card p-8 rounded-2xl border border-red-500/20 shadow-2xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <img src="/icons/warning.svg" className="w-8 h-8 opacity-80" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Unavailable</h2>
                    <p className="text-text-secondary mb-6">{error}</p>
                    <Link to="/" className="primary-button inline-flex">Go Home</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex flex-col bg-bg-dark pt-20">

            <div className="flex flex-col lg:flex-row flex-1 h-[calc(100vh-73px)] overflow-hidden">
                {/* Left Side: Resume Preview */}
                <section className="w-full lg:w-1/2 h-full bg-bg-card/30 p-8 flex items-center justify-center overflow-y-auto relative border-r border-white/5">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px]" />
                    </div>

                    {imageUrl && resumeUrl ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative z-10 w-full max-w-xl h-[85vh] shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain bg-white/90"
                                    title="View Resume PDF"
                                />
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center group pointer-events-none">
                                    <div className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                                        Open PDF
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ) : (
                        <div className="animate-pulse w-full max-w-xl aspect-[21/29] bg-white/5 rounded-2xl" />
                    )}
                </section>

                {/* Right Side: Analysis */}
                <section className="w-full lg:w-1/2 h-full overflow-y-auto bg-bg-dark p-8 lg:p-12 scroll-smooth">
                    <div className="max-w-2xl mx-auto space-y-10 pb-20">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-bold text-white mb-8"
                        >
                            AI Analysis Results
                        </motion.h2>

                        {feedback ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col gap-10"
                            >
                                <Summary feedback={feedback} />
                                <div className="h-px w-full bg-white/10" />
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                <div className="h-px w-full bg-white/10" />
                                <Details feedback={feedback} />
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 opacity-50">
                                <img src="/images/resume-scan-2.gif" className="w-full max-w-md rounded-xl mix-blend-screen" />
                                <p className="mt-8 text-xl text-text-secondary animate-pulse">Analyzing your resume...</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Resume
