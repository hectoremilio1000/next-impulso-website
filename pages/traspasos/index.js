// /pages/traspasos/index.js
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import TraspasoCard from "../../components/Traspasos/TraspasoCard";
import { listTraspasos } from "../../lib/traspasosApi";
import Link from "next/link";
import NavBar from "../../components/NavBarBlack/NavBarEs";

const WHATS_NUMBER = "525531491808"; // tu número en formato internacional sin +
const waMsg =
  "Hola, quiero publicar un traspaso y necesito ayuda de Impulso Restaurantero.";
const waHrefCTA = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(
  waMsg
)}`;

const ALCALDIAS = [
  "Cuauhtémoc",
  "Miguel Hidalgo",
  "Benito Juárez",
  "Álvaro Obregón",
  "Coyoacán",
  "GAM",
  "Iztapalapa",
  "Tlalpan",
  "Xochimilco",
];

export default function TraspasosPage() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  // filtros UI
  const [q, setQ] = useState("");
  // const [alcaldia, setAlcaldia] = useState("");
  // const [minRenta, setMinRenta] = useState("");
  // const [maxRenta, setMaxRenta] = useState("");
  // const [orden, setOrden] = useState("recientes"); // 'renta-asc' | 'renta-desc' | 'traspaso-asc' | 'traspaso-desc'

  async function load(query) {
    setLoading(true);
    try {
      const { data } = await listTraspasos(query);
      setRows(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // aplica filtros y orden en cliente
  // const filtered = useMemo(() => {
  //   let out = [...rows];
  //   if (q.trim()) {
  //     const t = q.trim().toLowerCase();
  //     out = out.filter(
  //       (r) =>
  //         (r.title || "").toLowerCase().includes(t) ||
  //         (r.colonia || "").toLowerCase().includes(t) ||
  //         (r.alcaldia || "").toLowerCase().includes(t)
  //     );
  //   }
  //   if (alcaldia) out = out.filter((r) => (r.alcaldia || "") === alcaldia);

  //   const parseN = (v) =>
  //     v == null ? 0 : Number(String(v).replace(/,/g, "")) || 0;

  //   if (minRenta)
  //     out = out.filter((r) => parseN(r.rentaMx) >= Number(minRenta));
  //   if (maxRenta)
  //     out = out.filter((r) => parseN(r.rentaMx) <= Number(maxRenta));

  //   switch (orden) {
  //     case "renta-asc":
  //       out.sort((a, b) => parseN(a.rentaMx) - parseN(b.rentaMx));
  //       break;
  //     case "renta-desc":
  //       out.sort((a, b) => parseN(b.rentaMx) - parseN(a.rentaMx));
  //       break;
  //     case "traspaso-asc":
  //       out.sort((a, b) => parseN(a.traspasoMx) - parseN(b.traspasoMx));
  //       break;
  //     case "traspaso-desc":
  //       out.sort((a, b) => parseN(b.traspasoMx) - parseN(a.traspasoMx));
  //       break;
  //     default:
  //       /* recientes */ break;
  //   }
  //   return out;
  // }, [rows, q, alcaldia, minRenta, maxRenta, orden]);
  const filtered = useMemo(() => {
    let out = [...rows];

    if (q.trim()) {
      const t = q.trim().toLowerCase();
      out = out.filter(
        (r) =>
          (r.title || "").toLowerCase().includes(t) ||
          (r.colonia || "").toLowerCase().includes(t) ||
          (r.alcaldia || "").toLowerCase().includes(t)
      );
    }

    // Mostrar primero disponibles/draft y al final archivados
    out.sort((a, b) => (a.status === "archived") - (b.status === "archived"));
    return out;
  }, [rows, q]);

  return (
    <>
      <Head>
        <title>Traspasos | Impulso Restaurantero</title>
        <meta name="description" content="Listado de traspasos disponibles" />
      </Head>

      <NavBar />

      {/* Wrapper para compensar NavBar fijo (ajusta si tu NavBar no es fixed) */}
      <div className="">
        {/* HERO negro/dorado estable */}
        <section className="relative isolate overflow-hidden">
          <div className="relative h-[220px] md:h-[320px]">
            <img
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/seccion1/restaurant-hall-with-round-table-some-chairs-fireplace-plants1.jpg"
              alt="Fondo traspasos"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative z-10 mx-auto max-w-6xl h-full flex flex-col justify-center px-4">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Traspasos
              </h1>
              <p className="mt-2 max-w-2xl text-slate-200">
                Apoyamos a dueños que necesitan traspasar su negocio.
                Publicación sencilla, visibilidad real y acompañamiento.
              </p>
            </div>
          </div>
        </section>

        {/* Filtros y búsqueda (flotando sobre el hero con z-index) */}
        <div className="mx-auto max-w-6xl px-4 -mt-10 md:-mt-12 relative z-20">
          <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur p-4 shadow-lg">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por colonia, alcaldía o título"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ring-slate-200"
              />
              <button
                onClick={() => load(q)}
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "..." : "Buscar"}
              </button>
            </div>
          </div>
        </div>

        {/* Grid / Skeleton / Empty */}
        <div className="mx-auto max-w-6xl px-4 py-8">
          {loading ? (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                >
                  <div className="h-40 bg-slate-200 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-3/4 bg-slate-200 animate-pulse rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 animate-pulse rounded" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-10 bg-slate-200 animate-pulse rounded-xl" />
                      <div className="h-10 bg-slate-200 animate-pulse rounded-xl" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-center">
              <p className="text-slate-600">Sin resultados con esos filtros.</p>
              <button
                onClick={() => {
                  setQ("");
                  setAlcaldia("");
                  setMinRenta("");
                  setMaxRenta("");
                  setOrden("recientes");
                }}
                className="mt-4 rounded-lg border px-4 py-2 hover:bg-slate-50"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <TraspasoCard key={t.id} t={t} />
              ))}
            </ul>
          )}
        </div>

        {/* Banda CTA inferior */}
        <section className="bg-gradient-to-r from-black to-slate-900 py-10">
          <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                ¿Quieres publicar tu traspaso?
              </h2>
              <p className="text-slate-300">
                Te ayudamos con fotos, copy y difusión.
              </p>
            </div>
            <a
              href={waHrefCTA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <span className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-gray hover:bg-amber-400 transition">
                📲 Publicar mi traspaso
              </span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
