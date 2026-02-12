import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";

export const meta = () => ([
    { title: 'Analyza | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/dashboard';
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && auth.isAuthenticated) navigate(next);
    }, [isLoading, auth.isAuthenticated, next, navigate])

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-accent-violet/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md px-6"
            >
                <div className="bg-bg-card/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl mb-4 border border-white/5 shadow-inner">
                            <img src="/logo-dark.svg" alt="Analyza Logo" className="w-12 h-12 invert opacity-90" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                        <p className="text-text-secondary text-lg">
                            Log in to access your resume analysis and track your applications.
                        </p>
                    </div>

                    <div className="w-full">
                        {isLoading ? (
                            <button disabled className="w-full py-3.5 px-6 rounded-xl bg-white/5 border border-white/5 text-text-muted cursor-wait flex items-center justify-center gap-3">
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span>Verifying session...</span>
                            </button>
                        ) : (
                            <>
                                {!auth.isAuthenticated ? (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors shadow-lg hover:shadow-white/20 flex items-center justify-center gap-3"
                                        onClick={auth.signIn}
                                    >
                                        <span>Sign In with Puter</span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 px-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold hover:bg-red-500/20 transition-colors"
                                        onClick={auth.signOut}
                                    >
                                        Sign Out
                                    </motion.button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <p className="mt-8 text-center text-text-muted text-sm">
                    Powered by AI & Puter.com
                </p>
            </motion.div>
        </main>
    )
}

export default Auth
