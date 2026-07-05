import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchInput from "./SearchInput";
import ScanningExperience from "./ScanningExperience";

const SLIDES = [
  { key: "score", durationMs: 4200 },
  { key: "scroll", durationMs: 6800 },
];

function PhonePreview() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDES[slideIndex].durationMs);
    return () => clearTimeout(timer);
  }, [slideIndex]);

  return (
    <div className="relative mx-auto mt-12 w-[320px] md:mt-16 md:w-[380px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[1000px] -translate-x-1/2 -translate-y-1/2 md:h-[560px] md:w-[1200px]">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(520px_520px_at_35%_50%,rgba(167,139,33,.4),transparent_70%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(520px_520px_at_65%_50%,rgba(167,139,33,.4),transparent_70%)]" />
      </div>

      <div className="relative h-[600px] overflow-hidden rounded-[3rem] border-[8px] border-white/10 bg-[#0b0b0b] shadow-[0_40px_100px_rgba(0,0,0,.6)]">
        <div className="relative z-10 flex items-center justify-between px-6 pt-4 text-xs text-white/40">
          <span>9:41</span>
          <span>●●●●</span>
        </div>

        {/* Escena 1: score general */}
        <div
          className={`absolute inset-0 px-6 pt-12 transition-opacity duration-700 ${
            slideIndex === 0 ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 text-base">
              🍽️
            </span>
            <span className="text-sm font-semibold text-white/70">
              Tu restaurante
            </span>
          </div>

          <div className="relative mx-auto mt-8 h-[160px] w-[160px]">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(255,255,255,.12)"
                strokeWidth="9"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#a78b21"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - 0.61)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">61</span>
              <span className="text-xs text-white/50">/100</span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-white/50">
            Salud online:{" "}
            <span className="font-semibold text-principal">Regular</span>
          </p>

          <div className="mt-5 space-y-2">
            {[
              ["Local Listings", "17/20"],
              ["SEO", "20/40"],
              ["Guest Experience", "21/40"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-[11px]"
              >
                <span className="text-white/70">{label}</span>
                <span className="font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Escena 2: competidores -> problemas -> CTA (con scroll interno) */}
        <div
          className={`absolute inset-0 overflow-hidden px-6 pt-12 transition-opacity duration-700 ${
            slideIndex === 1 ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            key={slideIndex}
            className={slideIndex === 1 ? "phone-scroll" : ""}
          >
            <p className="text-sm font-bold text-white">
              ¿Quién te gana en Google?
            </p>
            <div className="mt-3 space-y-2">
              {[
                ["1°", "Competencia A", "4.8"],
                ["2°", "Competencia B", "4.5"],
                ["3°", "Competencia C", "4.3"],
              ].map(([place, name, rating]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2.5 text-xs"
                >
                  <span className="text-white/40">{place}</span>
                  <span className="flex-1 px-2 text-white/80">{name}</span>
                  <span className="text-principal">★ {rating}</span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg bg-amber-500/15 px-4 py-2.5 text-xs ring-1 ring-amber-500/30">
                <span className="text-white/40">8°</span>
                <span className="flex-1 px-2 font-semibold text-white">
                  Tu restaurante
                </span>
                <span className="text-principal">★ 3.9</span>
              </div>
            </div>

            <p className="mt-6 text-sm font-bold text-white">
              Podrías estar perdiendo{" "}
              <span className="text-red-400">$3,200</span>/mes por:
            </p>
            <div className="mt-3 space-y-2.5">
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs font-semibold text-white">
                  No apareces en 3 búsquedas cercanas
                </p>
                <p className="mt-1 text-[11px] text-white/50">
                  Tus competidores aparecen primero que tú.
                </p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs font-semibold text-white">
                  Tu sitio no tiene CTA para ordenar
                </p>
                <p className="mt-1 text-[11px] text-white/50">
                  Estás perdiendo pedidos directos cada día.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-principal px-4 py-3.5 text-sm font-bold text-black"
            >
              Arréglalo con IA
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-scroll {
          animation: phoneScroll ${SLIDES[1].durationMs}ms ease-in-out;
        }
        @keyframes phoneScroll {
          0%,
          12% {
            transform: translateY(0);
          }
          88%,
          100% {
            transform: translateY(-280px);
          }
        }
      `}</style>
    </div>
  );
}

export default function ReportSearchHero() {
  const router = useRouter();
  const [scanning, setScanning] = useState(null);
  const [error, setError] = useState("");

  const handleSelect = (prediction) => {
    setError("");
    setScanning({
      placeId: prediction.place_id,
      restaurantName: prediction.description.split(",")[0],
    });
  };

  const handleScanDone = (report) => {
    router.push(`/reporte-ai/resultado?id=${report.id}`);
  };

  const handleScanError = () => {
    setScanning(null);
    setError(
      "No pudimos generar tu reporte en este momento. Intenta de nuevo en unos minutos."
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-black pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_360px_at_50%_0%,rgba(245,197,94,.16),transparent)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[960px] px-4 text-center">
        <span className="mb-5 inline-block rounded-full bg-secundario px-4 py-2 text-sm font-semibold uppercase tracking-wide text-principal md:text-base">
          Reporte gratis con IA
        </span>
        <h1 className="title2-tw text-white">
          Te garantizamos <span className="text-principal">vender más</span>
        </h1>

        <div className="mx-auto mt-6 max-w-[560px]">
          <SearchInput onSelect={handleSelect} disabled={Boolean(scanning)} />
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </div>

        <PhonePreview />
      </div>

      {scanning && (
        <ScanningExperience
          placeId={scanning.placeId}
          restaurantName={scanning.restaurantName}
          onDone={handleScanDone}
          onError={handleScanError}
        />
      )}
    </section>
  );
}
