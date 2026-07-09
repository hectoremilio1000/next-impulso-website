function Stars({ rating }) {
  const full = Math.max(0, Math.min(5, rating || 0));
  return (
    <span className="flex-none font-bold text-red-400" aria-label={`${full} de 5`}>
      {"★".repeat(full)}
      <span className="text-white/20">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function WorstReviews({ reviews }) {
  if (!reviews?.length) return null;

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        Las reseñas que más te pegan
      </h3>
      <p className="parrafo-tw mt-2 text-white/60">
        Cuando alguien te busca en Google, no ve solo tu calificación: lee tus
        peores reseñas primero. Estas son las que le hacen{" "}
        <strong className="text-white/80">dudar de ir</strong> — y las que te
        cuestan clientes sin que te enteres. Atenderlas y responderlas es de lo
        que más rápido mueve la aguja.
      </p>

      <ul className="mt-4 space-y-3">
        {reviews.map((r, i) => (
          <li
            key={`${r.authorName}-${i}`}
            className="rounded-xl bg-red-500/[0.06] p-4 ring-1 ring-red-500/20"
          >
            <div className="flex items-center gap-3">
              {r.profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.profileImageUrl}
                  alt={r.authorName}
                  className="h-8 w-8 flex-none rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10 text-xs text-white/50">
                  {(r.authorName || "?").charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {r.authorName}
                </p>
                {r.timeAgo && (
                  <p className="text-xs text-white/40">{r.timeAgo}</p>
                )}
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              {r.text}
            </p>
            {r.reviewUrl && (
              <a
                href={r.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-white/40 underline hover:text-white/60"
              >
                Ver en Google
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
