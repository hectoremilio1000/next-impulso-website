import Link from "next/link";
import Image from "next/image";
import { money } from "../../lib/traspasosApi";

const WHATS_NUMBER = "525531491808";

export default function TraspasoCard({ t }) {
  const fichaPath = `/traspasos/${t.id}`;
  const waText = `Hola, me interesa el traspaso "${t.title}" (ID ${t.id}). Lo vi en Impulso Restaurantero. ¿Podemos coordinar una visita? ${fichaPath}`;
  const waHref = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(
    waText
  )}`;

  const isDraft = t.status === "draft";
  const isArchived = t.status === "archived";
  const isPublished = t.status === "published";

  const badgeText = isArchived
    ? "Traspaso logrado"
    : isDraft
    ? "Muy pronto"
    : "Disponible";

  const badgeClass = isArchived
    ? "bg-red-700 text-white" // rojo fuerte
    : isDraft
    ? "bg-amber-400 text-black" // amarillo
    : "bg-emerald-600 text-white"; // verde

  const disableWhatsApp = isArchived || isDraft;

  return (
    <li className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden">
      <div className="relative aspect-[4/3] bg-slate-100">
        {t.thumbUrl ? (
          <Image
            src={t.thumbUrl}
            alt={t.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        ) : null}

        {/* 🔴 Tinte rojo cuando está traspasado */}
        {isArchived && (
          <div className="absolute inset-0 bg-red-700/40 mix-blend-multiply pointer-events-none" />
        )}

        {/* Badge de estatus */}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur ${
            isArchived
              ? "bg-red-700 text-white"
              : isDraft
              ? "bg-amber-400 text-black"
              : "bg-emerald-600 text-white"
          }`}
        >
          {isArchived
            ? "Traspaso logrado"
            : isDraft
            ? "Muy pronto"
            : "Disponible"}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-semibold leading-tight line-clamp-2">
          <Link href={fichaPath} className="hover:underline">
            {t.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {t.colonia ?? "—"} · {t.alcaldia ?? "—"} · {t.ciudad ?? "CDMX"}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border bg-slate-50 p-3">
            <div className="text-slate-500">Renta</div>
            <div className="font-medium">{money(t.rentaMx)}</div>
          </div>
          <div className="rounded-xl border bg-slate-50 p-3">
            <div className="text-slate-500">Traspaso</div>
            <div className="font-medium">{money(t.traspasoMx)}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
            {t.metrosCuadrados ?? 0} m²
          </span>
          <div className="flex items-center gap-3">
            <Link
              href={fichaPath}
              className="text-slate-600 hover:text-slate-900"
            >
              Ver detalles →
            </Link>
          </div>
        </div>

        {/* Botón WhatsApp: desactivado si está traspasado o en borrador */}
        <div className="mt-3">
          <a
            href={disableWhatsApp ? undefined : waHref}
            target={disableWhatsApp ? undefined : "_blank"}
            rel={disableWhatsApp ? undefined : "noopener noreferrer"}
            aria-disabled={disableWhatsApp}
            className={`inline-flex items-center rounded-lg px-3 py-1.5 font-medium
              ${
                disableWhatsApp
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              }`}
            title={
              isArchived
                ? "Este traspaso ya se realizó"
                : isDraft
                ? "Aún no disponible"
                : "Agendar por WhatsApp"
            }
          >
            📲 WhatsApp
          </a>
        </div>
      </div>
    </li>
  );
}
