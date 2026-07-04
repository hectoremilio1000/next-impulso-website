import { useEffect, useRef, useState } from "react";
import CompetitorsMap from "./CompetitorsMap";
import {
  getRestaurantReportPreview,
  createRestaurantReport,
} from "../../lib/restaurantReportApi";

// minMs de "search" y "photos" es sólo un estimado para el contador — su
// avance real depende de que su animación termine (ver SIGNAL_STEP_INDEXES).
const STEPS = [
  { key: "search", label: "Restaurante y competidores cercanos", minMs: 23000 },
  { key: "profile", label: "Perfil de Google Business", minMs: 5500 },
  { key: "reviews", label: "Sentimiento de reseñas", minMs: 6000 },
  { key: "photos", label: "Calidad y cantidad de fotos", minMs: 14000 },
  { key: "website", label: "Tu sitio web", minMs: 5000 },
  { key: "mobile", label: "Experiencia móvil", minMs: 5000 },
];

const HOLD_MS = 5000;
const SIGNAL_STEP_INDEXES = new Set([0, 3]); // "search" (mapa) y "photos"
const SIGNAL_FALLBACK_MS = 26000;
const PHOTO_REVEAL_STEP_MS = 2000;

const TOTAL_MS = STEPS.reduce((sum, step) => sum + step.minMs, 0);

function ProfilePreview({ preview }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
        {preview.photos?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview.photos[0]}
            alt={preview.name}
            className="h-48 w-full object-cover"
          />
        )}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white">{preview.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-white/70">
            <span className="text-principal">★</span> {preview.rating ?? "—"}{" "}
            · {preview.user_ratings_total ?? 0} reseñas
          </p>
          <p className="mt-2 text-xs text-white/40">
            {preview.formatted_address}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReviewsPreview({ reviews }) {
  if (!reviews?.length) {
    return <ScanningPlaceholder label="Analizando reseñas…" />;
  }
  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mx-auto max-w-lg space-y-4">
        {reviews.slice(0, 4).map((review) => (
          <div
            key={`${review.authorName}-${review.relativeTimeDescription}`}
            className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
          >
            <div className="flex items-center gap-3">
              {review.profilePhotoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={review.profilePhotoUrl}
                  alt={review.authorName}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-white">
                  {review.authorName}
                </p>
                <p className="text-xs text-white/40">
                  {review.relativeTimeDescription}
                </p>
              </div>
              <span className="ml-auto text-principal">
                {"★".repeat(review.rating ?? 0)}
              </span>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-white/70">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const PHOTO_ROTATIONS = [-4, 3, -2, 4, -3, 2, -2, 3, -4];

function PhotosPreview({ photos, onAllVisible }) {
  const shown = (photos ?? []).slice(0, 9);
  const [visibleCount, setVisibleCount] = useState(0);
  const firedRef = useRef(false);

  useEffect(() => {
    setVisibleCount(0);
    firedRef.current = false;
  }, [photos]);

  useEffect(() => {
    if (visibleCount >= shown.length) {
      if (!firedRef.current) {
        firedRef.current = true;
        onAllVisible?.();
      }
      return undefined;
    }
    const t = setTimeout(
      () => setVisibleCount((c) => c + 1),
      PHOTO_REVEAL_STEP_MS
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, shown.length]);

  if (!shown.length) {
    return <ScanningPlaceholder label="Analizando fotos…" />;
  }

  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="grid w-full max-w-lg grid-cols-3 gap-4">
        {shown.map((url, i) => {
          const visible = i < visibleCount;
          return (
            <div
              key={url}
              className="aspect-square rounded-lg bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,.45)] ring-1 ring-black/10"
              style={{
                transform: `rotate(${
                  PHOTO_ROTATIONS[i % PHOTO_ROTATIONS.length]
                }deg) scale(${visible ? 1 : 0.85})`,
                opacity: visible ? 1 : 0,
                transition: "opacity 500ms ease, transform 500ms ease",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-full w-full rounded object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScanningPlaceholder({ label }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="h-40 w-24 animate-pulse rounded-2xl border-4 border-white/10 bg-white/5" />
      <p className="text-sm text-white/50">{label}</p>
    </div>
  );
}

export default function ScanningExperience({
  placeId,
  restaurantName,
  onDone,
  onError,
}) {
  const [preview, setPreview] = useState(null);
  const [previewError, setPreviewError] = useState(false);
  const [fullReport, setFullReport] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepContentReady, setStepContentReady] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(Math.round(TOTAL_MS / 1000));
  const startedAtRef = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;

    getRestaurantReportPreview(placeId)
      .then((data) => {
        if (!cancelled) setPreview(data);
      })
      .catch((err) => {
        console.error("Error obteniendo preview:", err);
        if (!cancelled) setPreviewError(true);
      });

    createRestaurantReport(placeId)
      .then((report) => {
        if (!cancelled) setFullReport(report);
      })
      .catch((err) => {
        console.error("Error generando reporte:", err);
        if (!cancelled) onError?.();
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId]);

  // Los pasos "search" (mapa) y "photos" avanzan cuando su propia animación
  // termina de pintarse (no por un tiempo fijo que podría cortarla a medias)
  // + un margen fijo (HOLD_MS) para poder leerlos. El resto de los pasos
  // usan una duración fija.
  useEffect(() => {
    setStepContentReady(false);
  }, [stepIndex]);

  useEffect(() => {
    if (!SIGNAL_STEP_INDEXES.has(stepIndex)) return undefined;
    const fallback = setTimeout(
      () => setStepContentReady(true),
      SIGNAL_FALLBACK_MS
    );
    return () => clearTimeout(fallback);
  }, [stepIndex]);

  useEffect(() => {
    if (!SIGNAL_STEP_INDEXES.has(stepIndex) || !stepContentReady) {
      return undefined;
    }
    if (stepIndex >= STEPS.length - 1) return undefined;
    const t = setTimeout(() => setStepIndex((i) => i + 1), HOLD_MS);
    return () => clearTimeout(t);
  }, [stepIndex, stepContentReady]);

  useEffect(() => {
    if (SIGNAL_STEP_INDEXES.has(stepIndex)) return undefined;
    if (stepIndex >= STEPS.length - 1) return undefined;
    const timer = setTimeout(
      () => setStepIndex((i) => i + 1),
      STEPS[stepIndex].minMs
    );
    return () => clearTimeout(timer);
  }, [stepIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current;
      setSecondsLeft(Math.max(0, Math.round((TOTAL_MS - elapsed) / 1000)));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stepIndex === STEPS.length - 1 && fullReport) {
      const t = setTimeout(() => onDone(fullReport), 900);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [stepIndex, fullReport, onDone]);

  const currentStep = STEPS[stepIndex];

  return (
    <div className="fixed inset-0 z-[1100] flex flex-col bg-black md:flex-row">
      <div className="w-full flex-none border-b border-white/10 bg-[#0b0b0b] p-6 md:h-full md:w-[320px] md:border-b-0 md:border-r">
        <p className="title4-tw text-white">Escaneando…</p>
        <ul className="mt-6 space-y-4">
          {STEPS.map((step, i) => (
            <li key={step.key} className="flex items-center gap-3">
              {i < stepIndex ? (
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-principal text-xs font-bold text-black">
                  ✓
                </span>
              ) : i === stepIndex ? (
                <span className="h-6 w-6 flex-none animate-spin rounded-full border-2 border-principal border-t-transparent" />
              ) : (
                <span className="h-6 w-6 flex-none rounded-full border border-white/20" />
              )}
              <span
                className={`text-sm ${
                  i <= stepIndex ? "text-white" : "text-white/30"
                }`}
              >
                {i === 0 && restaurantName ? `${restaurantName}` : step.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-principal transition-all duration-500"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-white/40">
          {secondsLeft > 0
            ? `${secondsLeft} segundos restantes`
            : "Finalizando…"}
        </p>
      </div>

      <div className="relative flex-1 overflow-hidden bg-[#0d0d0d]">
        {previewError ? (
          <div className="flex h-full items-center justify-center p-6 text-center text-white/50">
            No pudimos cargar la vista previa, pero tu reporte se sigue
            generando…
          </div>
        ) : !preview ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-principal border-t-transparent" />
          </div>
        ) : (
          <>
            {currentStep.key === "search" && preview.location && (
              <CompetitorsMap
                center={preview.location}
                restaurantName={restaurantName || preview.name}
                address={preview.formatted_address}
                competitors={preview.competitors}
                onReady={() => setStepContentReady(true)}
              />
            )}
            {currentStep.key === "profile" && (
              <ProfilePreview preview={preview} />
            )}
            {currentStep.key === "reviews" && (
              <ReviewsPreview reviews={preview.reviews} />
            )}
            {currentStep.key === "photos" && (
              <PhotosPreview
                photos={preview.photos}
                onAllVisible={() => setStepContentReady(true)}
              />
            )}
            {currentStep.key === "website" && (
              <ScanningPlaceholder label="Escaneando tu sitio web…" />
            )}
            {currentStep.key === "mobile" && (
              <ScanningPlaceholder label="Analizando tu experiencia móvil…" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
