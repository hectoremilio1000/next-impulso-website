export default function LocalRankingsTable({ queries, error }) {
  if (error) {
    return (
      <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
          Así es como te va en línea
        </h3>
        <p className="mt-3 text-sm text-white/50">{error}</p>
      </div>
    );
  }

  if (!queries?.length) return null;

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        Así es como te va en línea
      </h3>
      <p className="mt-1 text-xs text-white/40">
        ¿Dónde apareces cuando buscan esto en Google, junto a tus
        competidores?
      </p>

      <div className="mt-4 space-y-3">
        {queries.map((q) => (
          <div key={q.query} className="rounded-xl bg-white/5 p-4">
            <p className="parrafo-tw font-semibold text-white">
              &ldquo;{q.query}&rdquo;
            </p>
            <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-white/40">Mapa (Local Pack)</p>
                {q.mapPack?.targetRank ? (
                  <p className="mt-1 text-base font-bold text-emerald-400">
                    #{q.mapPack.targetRank}
                  </p>
                ) : (
                  <p className="mt-1 text-base font-bold text-red-400">
                    Sin clasificación
                  </p>
                )}
                {q.mapPack?.topResults?.[0] && (
                  <p className="mt-1 text-white/40">
                    #1: {q.mapPack.topResults[0].name}
                    {q.mapPack.topResults[0].rating
                      ? ` · ★ ${q.mapPack.topResults[0].rating}`
                      : ""}
                  </p>
                )}
              </div>
              <div>
                <p className="text-white/40">Orgánico</p>
                {q.organic?.targetRank ? (
                  <p className="mt-1 text-base font-bold text-emerald-400">
                    #{q.organic.targetRank}
                  </p>
                ) : (
                  <p className="mt-1 text-base font-bold text-red-400">
                    Sin clasificación
                  </p>
                )}
                {q.organic?.topResult?.domain && (
                  <p className="mt-1 text-white/40">
                    #1: {q.organic.topResult.domain}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
