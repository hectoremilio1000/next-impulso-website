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
        {t.status && (
          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {t.status}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-semibold leading-tight line-clamp-2">
          <Link href={`/traspasos/${t.id}`} className="hover:underline">
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
          {/* un hint pequeño de “Ver más” */}
          <div className="flex items-center gap-3">
            <Link
              href={fichaPath}
              className="text-slate-600 hover:text-slate-900"
            >
              Ver detalles →
            </Link>
          </div>
        </div>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 font-medium text-white hover:bg-emerald-500"
          aria-label="Agendar por WhatsApp"
        >
          📲 WhatsApp
        </a>
      </div>
    </li>
  );
}
