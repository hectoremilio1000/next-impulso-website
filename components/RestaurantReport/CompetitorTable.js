export default function CompetitorTable({ competitors }) {
  if (!competitors || competitors.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        Restaurantes cerca de ti
      </h3>
      <ul className="mt-4 divide-y divide-white/10">
        {competitors.map((competitor) => (
          <li
            key={competitor.place_id}
            className="flex items-center justify-between gap-3 py-3"
          >
            <div>
              <p className="parrafo-tw text-white/90">{competitor.name}</p>
              {competitor.vicinity && (
                <p className="text-xs text-white/40">{competitor.vicinity}</p>
              )}
            </div>
            <div className="flex flex-none items-center gap-1 text-sm text-white/70">
              <span className="text-principal">★</span>
              <span>{competitor.rating ?? "—"}</span>
              <span className="text-white/40">
                ({competitor.user_ratings_total ?? 0})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
