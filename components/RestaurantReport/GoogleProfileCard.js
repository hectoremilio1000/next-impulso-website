export default function GoogleProfileCard({ photoUrl, rating, userRatingsTotal }) {
  if (!rating && !userRatingsTotal && !photoUrl) return null;

  return (
    <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt="Perfil de Google Business"
          className="h-14 w-14 flex-none rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-white/10 text-2xl">
          📍
        </div>
      )}
      <div>
        <p className="text-xs uppercase tracking-wide text-white/40">
          Perfil de Google Business
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-lg font-semibold text-white">
          <span className="text-principal">★</span> {rating ?? "—"}
          <span className="text-sm font-normal text-white/50">
            · {userRatingsTotal ?? 0} reseñas
          </span>
        </p>
      </div>
    </div>
  );
}
