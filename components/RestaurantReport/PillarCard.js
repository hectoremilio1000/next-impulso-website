// Severidad por % del pilar. Clases Tailwind completas y estáticas (no
// concatenadas) para que el purge no las elimine.
const TIERS = {
  critical: {
    label: "Muy deficiente",
    card: "bg-red-500/10 ring-red-500/40",
    score: "text-red-400",
    track: "bg-red-500/15",
    bar: "bg-red-500",
    chip: "bg-red-500/20 text-red-300",
    icon: "✗",
  },
  regular: {
    label: "Regular",
    card: "bg-amber-500/[0.08] ring-amber-500/30",
    score: "text-amber-400",
    track: "bg-amber-500/15",
    bar: "bg-amber-500",
    chip: "bg-amber-500/20 text-amber-300",
    icon: "!",
  },
  good: {
    label: "Bien",
    card: "bg-emerald-500/[0.08] ring-emerald-500/30",
    score: "text-emerald-400",
    track: "bg-emerald-500/15",
    bar: "bg-emerald-500",
    chip: "bg-emerald-500/20 text-emerald-300",
    icon: "✓",
  },
  great: {
    label: "Excelente",
    card: "bg-emerald-400/10 ring-emerald-400/40",
    score: "text-emerald-300",
    track: "bg-emerald-400/15",
    bar: "bg-emerald-400",
    chip: "bg-emerald-400/20 text-emerald-200",
    icon: "★",
  },
};

function tierFor(percentage) {
  if (percentage >= 90) return TIERS.great;
  if (percentage >= 70) return TIERS.good;
  if (percentage >= 50) return TIERS.regular;
  return TIERS.critical;
}

export default function PillarCard({ title, score, maxScore, comingSoon }) {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const tier = tierFor(percentage);

  if (comingSoon) {
    return (
      <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
            {title}
          </h3>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/60">
            Próximamente
          </span>
        </div>
        <p className="mt-3 text-3xl font-bold text-white/40">—</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-5 ring-1 ${tier.card}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
          {title}
        </h3>
        <span
          className={`inline-flex flex-none items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tier.chip}`}
        >
          <span aria-hidden="true">{tier.icon}</span>
          {tier.label}
        </span>
      </div>

      <p className="mt-3 flex items-baseline gap-1">
        <span className={`text-3xl font-extrabold tabular-nums ${tier.score}`}>
          {score}
        </span>
        <span className="text-lg font-medium text-white/40">/{maxScore}</span>
      </p>

      <div
        className={`mt-3 h-2 w-full overflow-hidden rounded-full ${tier.track}`}
      >
        <div
          className={`h-full rounded-full ${tier.bar}`}
          style={{ width: `${Math.max(percentage, 4)}%` }}
        />
      </div>
    </div>
  );
}
