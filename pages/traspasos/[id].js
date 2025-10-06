import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getTraspaso, money } from "../../lib/traspasosApi";
import NavBar from "../../components/NavBarBlack/NavBarEs";

const WHATS_NUMBER = "525531491808";

export default function TraspasoDetalle() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await getTraspaso(id);
        setData(data);
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const { fichaPath, fichaUrl, waHref } = useMemo(() => {
    if (!data) return { fichaPath: "", fichaUrl: "", waHref: "" };
    const fichaPath = `/traspasos/${data.id}`;
    const origin =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : ""; // vacío en build estático
    const fichaUrl = origin ? `${origin}${fichaPath}` : fichaPath;
    const waText = `Hola, me interesa el traspaso "${data.title}" (ID ${data.id}). Lo vi en Impulso Restaurantero. ¿Podemos coordinar una visita? ${fichaUrl}`;
    const waHref = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(
      waText
    )}`;
    return { fichaPath, fichaUrl, waHref };
  }, [data]);

  if (loading)
    return <div className="mx-auto max-w-6xl px-4 py-8">Cargando…</div>;
  if (notFound || !data)
    return <div className="mx-auto max-w-6xl px-4 py-8">No encontrado</div>;
  return (
    <>
      <Head>
        <title>{data.title} | Traspasos</title>
        <meta
          name="description"
          content={`${data.colonia ?? ""} · ${data.alcaldia ?? ""}`}
        />
        {/* Open Graph básico */}
        <meta property="og:title" content={`${data.title} | Traspasos`} />
        <meta
          property="og:description"
          content={`${data.colonia ?? ""} · ${data.alcaldia ?? ""}`}
        />
        {Array.isArray(data.photos) && data.photos[0]?.url ? (
          <meta property="og:image" content={data.photos[0].url} />
        ) : null}
      </Head>
      <NavBar />
      <div className="mx-auto max-w-6xl px-4 pt-20 md:pt-24 pb-24 space-y-6">
        {/* Encabezado superior con botón responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/traspasos"
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              ← Ver lista
            </Link>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-500 shadow-sm w-full sm:w-auto transition"
          >
            📲 Agendar por WhatsApp
          </a>
        </div>
        <header className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
          <p className="black">
            {data.colonia || "—"} · {data.alcaldia || "—"} · {data.ciudad}
          </p>
        </header>

        {Array.isArray(data.photos) && data.photos.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {data.photos.map((p) => (
              <figure
                key={p.id}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-slate-100"
              >
                <Image
                  src={p.url}
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 50vw, 33vw"
                />
              </figure>
            ))}
          </div>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Datos</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border bg-slate-50 p-3">
                <div className="text-slate-500">Renta</div>
                <div className="font-medium">{money(data.rentaMx)}</div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <div className="text-slate-500">Traspaso</div>
                <div className="font-medium">{money(data.traspasoMx)}</div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <div className="text-slate-500">Metros</div>
                <div className="font-medium">
                  {data.metrosCuadrados ?? 0} m²
                </div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <div className="text-slate-500">Aforo</div>
                <div className="font-medium">{data.aforo ?? 0}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Contacto</h2>
            <div className="text-sm text-slate-700 space-y-1">
              <div>
                <span className="text-slate-500">Nombre:</span>{" "}
                {data.contactoNombre ?? "—"}
              </div>
              <div>
                <span className="text-slate-500">Tel:</span>{" "}
                {data.contactoTel ?? "—"}
              </div>
              <div>
                <span className="text-slate-500">WhatsApp:</span>{" "}
                {data.contactoWhatsapp ?? "—"}
              </div>
            </div>
          </div>
        </section>

        {data.descripcion && (
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Descripción</h2>
            <p className="whitespace-pre-wrap text-slate-700">
              {data.descripcion}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
