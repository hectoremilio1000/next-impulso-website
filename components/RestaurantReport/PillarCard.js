function labelForPercentage(percentage) {
  if (percentage >= 90) return "Excelente";
  if (percentage >= 70) return "Bueno";
  if (percentage >= 50) return "Regular";
  return "Deficiente";
}

export default function PillarCard({ title, score, maxScore, comingSoon }) {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
          {title}
        </h3>
        {comingSoon && (
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/60">
            Próximamente
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-white">
        {comingSoon ? "—" : `${score}/${maxScore}`}
      </p>
      {!comingSoon && (
        <p className="mt-1 text-sm text-white/50">
          {labelForPercentage(percentage)}
        </p>
      )}
    </div>
  );
}
