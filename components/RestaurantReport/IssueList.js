export default function IssueList({ title, issues }) {
  const checkable = issues.filter((issue) => issue.checkable);
  const upcoming = issues.filter((issue) => !issue.checkable);

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {checkable.map((issue) => (
          <li key={issue.key} className="flex items-start gap-3">
            <span
              className={`mt-[2px] flex h-6 w-6 flex-none items-center justify-center rounded-full text-sm font-bold ${
                issue.pass
                  ? "bg-emerald-500 text-black"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {issue.pass ? "✓" : "✗"}
            </span>
            <span className="parrafo-tw text-white/85">{issue.label}</span>
          </li>
        ))}
      </ul>

      {upcoming.length > 0 && (
        <>
          <div className="my-5 h-px w-full bg-white/10" />
          <p className="text-xs uppercase tracking-wide text-white/40">
            Próximamente en el reporte
          </p>
          <ul className="mt-3 space-y-2">
            {upcoming.map((issue) => (
              <li key={issue.key} className="text-sm text-white/40">
                {issue.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
