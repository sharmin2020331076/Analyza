import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0] || null;
        setFile(selectedFile);
        onFileSelect?.(selectedFile);
    }, [onFileSelect]);

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        onFileSelect?.(null);
    }

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    return (
        <div className="w-full">
            <div 
                {...getRootProps()} 
                className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer p-8
                    ${isDragActive 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border-light bg-bg-card hover:border-primary/50 hover:bg-bg-card-hover'
                    }
                `}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {file ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500/20 rounded-lg">
                                    <img src="/images/pdf.png" alt="pdf" className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-white font-medium truncate max-w-[200px]">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-text-muted">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={removeFile}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-5 h-5 opacity-50 group-hover:opacity-100 invert" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center gap-4 py-8"
                        >
                            <div className={`p-4 rounded-full transition-colors duration-300 ${isDragActive ? 'bg-primary/20' : 'bg-white/5'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-70">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-lg font-medium text-white">
                                    {isDragActive ? "Drop your resume here" : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-sm text-text-muted mt-1">
                                    PDF only (max {formatSize(maxFileSize)})
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
export default FileUploader
