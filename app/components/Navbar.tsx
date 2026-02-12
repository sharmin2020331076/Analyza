import { Link, useLocation } from "react-router";

const Navbar = () => {
    const location = useLocation();
    const isLanding = location.pathname === "/";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg-dark/80 border-b border-purple-500/10">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
                    Analyza
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link to="/#features" className="text-text-secondary hover:text-white transition-colors">Features</Link>
                    <Link to="/#how-it-works" className="text-text-secondary hover:text-white transition-colors">How it Works</Link>
                    <Link to="/pricing" className="text-text-secondary hover:text-white transition-colors">Pricing</Link>
                    <Link to="/contact" className="text-text-secondary hover:text-white transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    {isLanding ? (
                        <Link to="/auth" className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all">
                            Get started
                        </Link>
                    ) : (
                        <Link to="/upload" className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all">
                            Upload Resume
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
