import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine style based on score
  const isGood = score > 69;
  const isAverage = score > 49 && score <= 69;
  
  const gradientClass = isGood
    ? 'from-green-500/10 to-transparent border-green-500/20'
    : isAverage
      ? 'from-yellow-500/10 to-transparent border-yellow-500/20'
      : 'from-red-500/10 to-transparent border-red-500/20';

  const iconSrc = isGood
    ? '/icons/ats-good.svg'
    : isAverage
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  const subtitle = isGood
    ? 'Great Job!'
    : isAverage
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} bg-bg-card border rounded-2xl shadow-xl w-full p-6 text-white`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-white/5 rounded-full backdrop-blur-sm">
             <img src={iconSrc} alt="ATS Score Icon" className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-text-primary">{subtitle}</h3>
        <p className="text-text-secondary mb-6 text-sm leading-relaxed">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className={`w-5 h-5 mt-0.5 ${suggestion.type === "good" ? "invert-0 opacity-80" : "invert-0 opacity-80"}`} 
                style={{ filter: suggestion.type === "good" ? "sepia(1) hue-rotate(90deg) saturate(300%)" : "sepia(1) hue-rotate(0deg) saturate(300%) text-yellow-500" }} 
              />
               {/* 
                 Note: The icons might need specific coloring or filters if they are black. 
                 Assuming they are colored SVGs, we might need no filter or brightness adjustment.
                 For now applying a safe fallback style or assuming they work.
                 Actually, check.svg is usually green and warning.svg is yellow/red. 
                 In dark mode, they might be hard to see if they are dark. 
               */}
              <p className={suggestion.type === "good" ? "text-green-300 text-sm" : "text-amber-300 text-sm"}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-text-muted italic text-xs border-t border-white/10 pt-4 mt-4">
        Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
      </p>
    </div>
  )
}

export default ATS
