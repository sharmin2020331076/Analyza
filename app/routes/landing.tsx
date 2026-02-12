import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, FileCheck, Sparkles, Target, Zap } from "lucide-react";
import { usePuterStore } from "~/lib/puter";

export function meta() {
    return [
        { title: "Analyza - AI Resume Analysis" },
        { name: "description", content: "Optimize your resume for ATS with AI-powered feedback." },
    ];
}

const Landing = () => {
    const { auth } = usePuterStore();
    const navigate = useNavigate();

    // Smart redirect: go to dashboard if authenticated, auth page if not
    const handleGetStarted = () => {
        if (auth.isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/auth');
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden text-white selection:bg-purple-500/30 bg-[#0a0a1f]">
            {/* Background Effects - matching reference (very subtle) */}
            <div className="fixed inset-0 z-0 pointer-events-none ">
                {/* Very subtle purple glow top */}
                <div className="absolute top-[-20%] right-[10%] w-[800px] h-[800px] bg-purple-600/[0.08] rounded-full blur-[150px]" />
                {/* Minimal bottom glow */}
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/[0.05] rounded-full blur-[120px]" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-20 py-auto lg:pt-10 sm:pt-20">
                <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-center">
                    {/* Left: Content */}
                    <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm font-medium"
                        >
                            <Sparkles className="w-4 h-4" />
                            AI-powered resume analysis
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
                        >
                            Accelerate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#8b5cf6] via-[#a78bfa] to-white">
                                Career Intelligence
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Get instant, AI-powered feedback on your resume. Optimize for ATS,
                            improve your tone, and stand out to recruiters with data-driven insights.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center gap-4 justify-center lg:justify-start"
                        >
                            <button
                                onClick={handleGetStarted}
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full shadow-lg hover:shadow-primary/40 transition-all text-base sm:text-lg"
                            >
                                {auth.isAuthenticated ? 'Go to Dashboard' : 'Get started'}
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full max-w-3xl mx-auto lg:mx-0"
                    >
                        {/* Enhanced glow effect */}
                        <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/30 via-violet-600/30 to-purple-600/30 rounded-3xl blur-[80px] opacity-60"></div>
                        <div className="relative bg-[#13132b] border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden">
                            {/* Browser Header */}
                            <div className="h-10 bg-[#0a0a1f] border-b border-purple-500/10 flex items-center px-4 gap-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                </div>
                                <div className="ml-4 flex-1 bg-[#0a0a18] h-6 rounded-md border border-purple-500/10 px-3 flex items-center text-xs text-slate-500 font-mono">
                                    Analyza.app/dashboard
                                </div>
                            </div>
                            {/* Dashboard Content */}
                            <div className=" bg-gradient-to-br from-[#13132b] to-[#0a0a1f] flex items-center justify-center">
                                <img
                                    src="/dashboard.png"
                                    alt="Dashboard Preview"
                                    className="w-full h-full object-cover rounded-lg opacity-90"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/800x600/13132b/8b5cf6?text=Dashboard+Preview'
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="max-w-7xl mx-auto relative z-10 py-20 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            Powerful Features
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto"
                        >
                            Everything you need to optimize your resume and land your dream job
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <FeatureCard
                                icon={<Target className="w-6 h-6 text-purple-400" />}
                                title="ATS Optimization"
                                description="Get your resume past Applicant Tracking Systems with AI-powered suggestions and keyword optimization."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <FeatureCard
                                icon={<Sparkles className="w-6 h-6 text-purple-400" />}
                                title="Smart Analysis"
                                description="Receive personalized feedback tailored to specific job descriptions and industry standards."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <FeatureCard
                                icon={<FileCheck className="w-6 h-6 text-purple-400" />}
                                title="Instant Results"
                                description="Upload your resume and get comprehensive analysis in seconds, not hours."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <FeatureCard
                                icon={<CheckCircle className="w-6 h-6 text-purple-400" />}
                                title="Keyword Matching"
                                description="Identify missing keywords relevant to your target jobs and industry."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <FeatureCard
                                icon={<Zap className="w-6 h-6 text-purple-400" />}
                                title="Action Items"
                                description="Get specific, actionable suggestions to improve your resume immediately."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <FeatureCard
                                icon={<ArrowRight className="w-6 h-6 text-purple-400" />}
                                title="Career Insights"
                                description="Understand what recruiters look for in your target industry and role."
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-3xl p-16 backdrop-blur-sm">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to land your dream job?</h2>
                            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                                Join thousands of job seekers who have improved their resumes and landed more interviews.
                            </p>
                            <Link to="/auth">
                                <button className="px-10 py-4 bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-full shadow-lg hover:shadow-primary/40 transition-all inline-flex items-center gap-2">
                                    Get Started Now
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            How It Works
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto"
                        >
                            Get your resume analyzed in three simple steps
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connection line - hidden on mobile */}
                        <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="relative mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30 relative z-10">
                                    <span className="text-3xl font-bold text-white">1</span>
                                </div>
                                <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-xl"></div>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Upload Resume</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Sign in and upload your resume in PDF format. It's secure and takes seconds.
                            </p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="relative mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30 relative z-10">
                                    <span className="text-3xl font-bold text-white">2</span>
                                </div>
                                <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-xl"></div>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">AI Analysis</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Our AI analyzes your resume for ATS compatibility, keywords, and structure.
                            </p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="relative mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30 relative z-10">
                                    <span className="text-3xl font-bold text-white">3</span>
                                </div>
                                <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-xl"></div>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Get Feedback</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Receive detailed insights and actionable recommendations to improve your resume.
                            </p>
                        </motion.div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex justify-center mt-16"
                    >
                        <button
                            onClick={handleGetStarted}
                            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all text-lg hover:scale-105"
                        >
                            Start Analyzing Now
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-purple-500/10 bg-[#0a0a1f] py-12 px-6">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Analyza. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </main >
    )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="group relative p-6 rounded-2xl border border-purple-500/10 bg-[#1a1b3a]/40 backdrop-blur-sm hover:bg-[#1a1b3a]/60 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
        {/* Modern gradient left border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Subtle glow effect on hover */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600/20 via-violet-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

        <div className="relative z-10">
            <div className="mb-4 p-3 bg-purple-500/10 rounded-xl w-fit group-hover:bg-purple-500/20 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
)

export default Landing;
