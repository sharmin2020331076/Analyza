import { Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = usePuterStore();
    const isLanding = location.pathname === "/";

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg-dark/80 border-b border-purple-500/10">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
                    Analyza
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <button 
                        onClick={() => {
                            if (isLanding) {
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/#features';
                            }
                        }}
                        className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                        Features
                    </button>
                    <button 
                        onClick={() => {
                            if (isLanding) {
                                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/#how-it-works';
                            }
                        }}
                        className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                        How it Works
                    </button>
                    <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                </div>

                <div className="flex items-center gap-4">
                    {auth.isAuthenticated ? (
                        <>
                            <Link to="/upload" className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all">
                                Upload Resume
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link to="/auth" className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all">
                            Get started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
