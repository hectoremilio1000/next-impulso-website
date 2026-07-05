function isBetterRanked(a, b) {
  const ratingA = a.rating ?? 0;
  const ratingB = b.rating ?? 0;
  if (ratingA !== ratingB) return ratingA > ratingB;
  return (a.user_ratings_total ?? 0) > (b.user_ratings_total ?? 0);
}

export default function CompetitorTable({
  competitors,
  targetRating,
  targetReviews,
}) {
  if (!competitors || competitors.length === 0) {
    return null;
  }

  const sorted = [...competitors].sort((a, b) => {
    const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0);
    if (ratingDiff !== 0) return ratingDiff;
    return (b.user_ratings_total ?? 0) - (a.user_ratings_total ?? 0);
  });

  const target = { rating: targetRating ?? 0, user_ratings_total: targetReviews ?? 0 };
  const aboveCount = sorted.filter((competitor) =>
    isBetterRanked(competitor, target)
  ).length;

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <h3 className="title4-tw text-white">
        {aboveCount > 0
          ? `Estás por debajo de ${aboveCount} ${
              aboveCount === 1 ? "competidor" : "competidores"
            }.`
          : "Vas arriba de tus competidores cercanos por calificación."}
      </h3>
      <p className="mt-1 text-sm text-white/50">
        Comparado por calificación y número de reseñas en Google, contra los
        restaurantes más cercanos a ti.
      </p>
      <ul className="mt-4 divide-y divide-white/10">
        {sorted.map((competitor, index) => (
          <li
            key={competitor.place_id}
            className="flex items-center justify-between gap-3 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/70">
                {index + 1}°
              </span>
              <div>
                <p className="parrafo-tw text-white/90">{competitor.name}</p>
                {competitor.vicinity && (
                  <p className="text-xs text-white/40">
                    {competitor.vicinity}
                  </p>
                )}
              </div>
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
