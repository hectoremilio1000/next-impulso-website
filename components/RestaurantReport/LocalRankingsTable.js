export default function LocalRankingsTable({ queries, error }) {
  if (error) {
    return (
      <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
          Así es como te va en línea de mapas
        </h3>
        <p className="mt-3 text-sm text-white/50">{error}</p>
      </div>
    );
  }

  if (!queries?.length) return null;

  // Los restaurantes compiten en el MAPA (local pack), no en la web orgánica
  // (esa la ganan directorios). Sólo mostramos el mapa. En vez de repetir
  // "sin clasificación", cuando no apareces mostramos QUIÉN te gana ahí — es
  // info distinta y accionable por búsqueda.
  const ranked = queries.filter((q) => q.mapPack?.targetRank != null);
  const appearsCount = ranked.length;
  const total = queries.length;
  const avgRank =
    appearsCount > 0
      ? Math.round(
          ranked.reduce((sum, q) => sum + q.mapPack.targetRank, 0) / appearsCount
        )
      : null;

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        Así es como te va en línea de mapas
      </h3>
      <p className="mt-1 text-xs text-white/40">
        ¿Dónde apareces cuando buscan esto en Google, junto a tus competidores?
      </p>

      <p className="parrafo-tw mt-3 text-white/80">
        Apareces en el mapa en{" "}
        <strong className="text-white">
          {appearsCount} de {total}
        </strong>{" "}
        búsquedas
        {avgRank ? (
          <>
            {" "}
            (posición promedio <strong className="text-white">#{avgRank}</strong>)
          </>
        ) : (
          ""
        )}
        .
      </p>

      <div className="mt-4 space-y-2">
        {queries.map((q) => {
          const rank = q.mapPack?.targetRank ?? null;
          const winner = q.mapPack?.topResults?.[0];
          return (
            <div
              key={q.query}
              className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate parrafo-tw font-semibold text-white">
                  &ldquo;{q.query}&rdquo;
                </p>
                {winner && (
                  <p className="mt-0.5 truncate text-xs text-white/40">
                    {rank
                      ? `1º en el mapa: ${winner.name}`
                      : `Aquí te gana: ${winner.name}`}
                    {winner.rating ? ` · ★ ${winner.rating}` : ""}
                  </p>
                )}
              </div>
              {rank ? (
                <span className="flex-none text-base font-bold text-emerald-400">
                  #{rank}
                </span>
              ) : (
                <span className="flex-none rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-semibold text-red-300">
                  No estás
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
