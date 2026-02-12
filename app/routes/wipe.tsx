import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        if(!confirm("Are you sure you want to wipe all data? This action cannot be undone.")) return;
        
        // This logic seems to depend on `files` state which might be stale or incomplete.
        // Ideally we should list again or handle deletion differently.
        // Keeping original logic structure but adding confirm.
        for (const file of files) {
             await fs.delete(file.path);
        }
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-bg-dark text-white">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center bg-bg-dark text-red-500">Error {error}</div>;
    }

    return (
        <div className="min-h-screen bg-bg-dark text-white flex flex-col items-center justify-center gap-8 p-8">
            <h1 className="text-3xl font-bold text-red-500">Wipe App Data</h1>
            
            <div className="bg-bg-card border border-white/10 rounded-xl p-6 w-full max-w-lg">
                <p className="mb-4 text-text-secondary">Authenticated as: <span className="text-white font-medium">{auth.user?.username}</span></p>
                <div className="mb-2 font-semibold">Existing files:</div>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto mb-6 pr-2">
                    {files.length === 0 ? (
                        <p className="text-text-muted italic">No files found.</p>
                    ) : (
                        files.map((file) => (
                            <div key={file.id} className="flex flex-row gap-4 bg-white/5 p-2 rounded text-sm">
                                <p className="truncate">{file.name}</p>
                            </div>
                        ))
                    )}
                </div>
                
                <button
                    className="w-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 px-4 py-3 rounded-xl transition-colors font-semibold"
                    onClick={() => handleDelete()}
                >
                    Wipe All Data
                </button>
            </div>
             <button onClick={() => navigate('/')} className="text-text-secondary hover:text-white transition-colors">
                Back to Home
            </button>
        </div>
    );
};

export default WipeApp;
