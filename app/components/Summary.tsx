import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-400'
            : score > 49
        ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="resume-summary !p-0">
            <div className="category !bg-white/5 !border !border-white/5 hover:!bg-white/10 transition-colors">
                <div className="flex flex-row gap-3 items-center justify-center">
                    <p className="text-lg font-medium text-white">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-lg font-bold">
                    <span className={textColor}>{score}</span><span className="text-text-muted text-sm font-normal">/100</span>
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-bg-card border border-white/5 rounded-2xl shadow-xl w-full text-white">
            <div className="flex flex-row items-center p-6 gap-8 border-b border-white/5">
                <div className="scale-110">
                    <ScoreGauge score={feedback.overallScore} />
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Your Resume Score</h2>
                    <p className="text-sm text-text-secondary">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary
