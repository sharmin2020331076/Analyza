import type { Route } from "./+types/dashboard";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Analyza" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Dashboard() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/dashboard');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return (
    <main className="min-h-screen pt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-violet/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
        </div>

        <section className="relative z-10 flex flex-col items-center gap-12 pt-12 pb-20 w-full max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
            >
              Track Your Applications <br className="hidden md:block" /> & Resume Ratings
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {!loadingResumes && resumes?.length === 0 ? (
                <h2 className="text-xl md:text-2xl text-text-secondary font-medium">To get started, upload your first resume for AI-powered feedback.</h2>
              ) : (
                <h2 className="text-xl md:text-2xl text-text-secondary font-medium">Review your submissions and improve your ATS score.</h2>
              )}
            </motion.div>
          </div>

          {loadingResumes && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center p-12"
            >
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-text-secondary">Loading your resumes...</p>
            </motion.div>
          )}

          {!loadingResumes && resumes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                >
                  <ResumeCard resume={resume} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loadingResumes && resumes?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center justify-center mt-8"
            >
              <Link to="/upload" className="bg-gradient-to-r from-accent-purple to-accent-violet text-white text-lg font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95">
                Upload Resume Now
              </Link>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
