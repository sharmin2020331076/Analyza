interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-green-500/20 text-green-400 border border-green-500/30';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-red-500/20 text-red-400 border border-red-500/30';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-xs font-semibold">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
