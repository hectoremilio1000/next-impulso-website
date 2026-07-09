// Color por severidad del score, para que el número se lea como veredicto
// (rojo = muy mal) y no como una cifra neutra.
function severityColor(pct) {
  if (pct >= 90) return "#34d399"; // emerald-400
  if (pct >= 70) return "#10b981"; // emerald-500
  if (pct >= 50) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
}

export default function ScoreGauge({ score, maxScore, label, caption }) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (pct / 100) * circumference;
  const color = severityColor(pct);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40">
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
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold leading-none text-white">
            {score}
          </span>
          <span className="mt-1 text-xs text-white/50">de {maxScore} puntos</span>
          {label && (
            <span
              className="mt-1.5 text-sm font-bold uppercase tracking-wide"
              style={{ color }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
      {caption && (
        <p className="mt-4 max-w-[320px] text-center text-sm text-white/60">
          {caption}
        </p>
      )}
    </div>
  );
}
