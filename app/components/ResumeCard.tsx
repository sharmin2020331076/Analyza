import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { motion } from "framer-motion";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            const url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`}>
            <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-bg-card border border-border-dark rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col"
            >
                {/* Image Section */}
                <div className="relative h-[240px] w-full overflow-hidden bg-gray-900 group">
                    {resumeUrl ? (
                         <div className="w-full h-full relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-60 z-10" />
                            <img
                                src={resumeUrl}
                                alt="resume"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full animate-pulse bg-white/5" />
                    )}
                    
                    <div className="absolute top-4 right-4 z-20">
                        <ScoreCircle score={feedback.overallScore} />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col gap-2 relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    {companyName ? (
                        <h3 className="text-xl font-bold text-white truncate" title={companyName}>
                            {companyName}
                        </h3>
                    ) : (
                        <h3 className="text-xl font-bold text-white">Resume</h3>
                    )}
                    
                    {jobTitle ? (
                        <p className="text-text-secondary text-sm font-medium truncate">
                            {jobTitle}
                        </p>
                    ) : (
                        <p className="text-text-muted text-sm italic">No Job Title</p>
                    )}
                </div>
            </motion.div>
        </Link>
    )
}
export default ResumeCard
