// Fase 1 del PLAN_COMPETIDORES: "competidores de búsqueda".
// Reencuadra la data que YA existe (serpQueries -> mapPack.topResults) para
// contestar "¿quién te está ganando cuando buscan lo que vendes?". No mezcla
// resultados orgánicos (suelen ser agregadores: TripAdvisor, apps de delivery).

function normalize(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

// A partir de las queries de DataForSEO, arma la lista de competidores del
// local pack (mapa) agregada y deduplicada, excluyendo al propio negocio.
export function deriveSearchCompetitors(queries, targetName) {
  const target = normalize(targetName);
  const byName = new Map();
  let anyRanked = false;
  let targetIsFirstEverywhere = true;

  for (const q of queries ?? []) {
    const targetRank = q.mapPack?.targetRank ?? null;
    if (targetRank != null) {
      anyRanked = true;
      if (targetRank !== 1) targetIsFirstEverywhere = false;
    } else {
      // no aparece en el pack para esta búsqueda => no está "ganando" aquí
      targetIsFirstEverywhere = false;
    }

    (q.mapPack?.topResults ?? []).forEach((result, idx) => {
      if (!result?.name) return;
      const key = normalize(result.name);
      if (!key || key === target) return; // excluir al propio negocio

      const prev =
        byName.get(key) || {
          name: result.name,
          rating: result.rating ?? null,
          queries: new Set(),
          bestPos: Infinity,
        };
      prev.queries.add(q.query);
      if (prev.rating == null && result.rating != null) prev.rating = result.rating;
      prev.bestPos = Math.min(prev.bestPos, idx + 1);
      byName.set(key, prev);
    });
  }

  const competitors = [...byName.values()]
    .map((c) => ({
      name: c.name,
      rating: c.rating,
      appearances: c.queries.size,
      bestPos: c.bestPos,
    }))
    .sort((a, b) => b.appearances - a.appearances || a.bestPos - b.bestPos);

  return {
    competitors,
    // "ganas" solo si apareces #1 en TODAS las búsquedas donde clasificas.
    targetIsFirstEverywhere: anyRanked && targetIsFirstEverywhere,
  };
}

export default function SearchCompetitors({ queries, targetName }) {
  const { competitors, targetIsFirstEverywhere } = deriveSearchCompetitors(
    queries,
    targetName
  );

  if (!competitors.length) return null;

  const winning = targetIsFirstEverywhere;
  const top = competitors.slice(0, 6);

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        {winning ? "Apareces #1 🎉 — quién te pisa los talones" : "Te están ganando en búsqueda"}
      </h3>
      <p className="mt-1 text-xs text-white/40">
        {winning
          ? "Vas arriba en tus búsquedas. Estos son los que vienen justo detrás de ti."
          : "Cuando alguien busca en Google lo que tú vendes, estos negocios aparecen arriba de ti."}
      </p>

      <ul className="mt-4 space-y-2">
        {top.map((c, i) => (
          <li
            key={c.name}
            className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/70">
                {i + 1}
              </span>
              <span className="truncate parrafo-tw font-semibold text-white">
                {c.name}
              </span>
            </div>
            <div className="flex flex-none items-center gap-3 text-xs text-white/50">
              {c.rating != null && <span>★ {c.rating}</span>}
              <span>
                aparece en {c.appearances}{" "}
                {c.appearances === 1 ? "búsqueda" : "búsquedas"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
