export default function ScoreGauge({ score, maxScore, label, caption }) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,.12)"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#a78b21"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {score}/{maxScore}
          </span>
          {label && <span className="text-xs text-white/60">{label}</span>}
        </div>
      </div>
      {caption && (
        <p className="mt-4 max-w-[280px] text-center text-sm text-white/60">
          {caption}
        </p>
      )}
    </div>
  );
}
