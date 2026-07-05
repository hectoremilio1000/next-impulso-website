import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import ScoreGauge from "../../components/RestaurantReport/ScoreGauge";
import PillarCard from "../../components/RestaurantReport/PillarCard";
import IssueList from "../../components/RestaurantReport/IssueList";
import CompetitorTable from "../../components/RestaurantReport/CompetitorTable";
import GoogleProfileCard from "../../components/RestaurantReport/GoogleProfileCard";
import LocalRankingsTable from "../../components/RestaurantReport/LocalRankingsTable";
import LeadGateModal from "../../components/RestaurantReport/LeadGateModal";
import { getRestaurantReport } from "../../lib/restaurantReportApi";

const WHATS_NUMBER = "5215531491808";
const LOCAL_LISTINGS_MAX = 20;
const SEO_MAX = 40;
const GUEST_EXPERIENCE_MAX = 40;
const TOTAL_MAX = LOCAL_LISTINGS_MAX + SEO_MAX + GUEST_EXPERIENCE_MAX;

const SCORE_LABEL_ES = {
  Poor: "Deficiente",
  Fair: "Regular",
  Good: "Bueno",
  Excellent: "Excelente",
};

// Gancho de "dinero perdido": estimación conservadora, no un cálculo real del
// negocio. Sólo cuenta problemas de alto impacto (no los 32 checks), para que
// el número se quede en un rango creíble en vez de dispararse.
const CRITICAL_ISSUE_KEYS = new Set([
  "rating_reviews",
  "own_website",
  "opening_hours",
  "phone",
  "no_offsite_ordering",
  "order_cta_clear",
  "page_speed",
]);
const AVG_TICKET_MXN = 220;
const LOST_ORDERS_PER_CRITICAL_ISSUE = 6;

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

function unlockStorageKey(id) {
  return `reporte-ai-unlocked-${id}`;
}

export default function ReporteResultado() {
  const router = useRouter();
  const { id } = router.query;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!router.isReady || !id) return;

    if (typeof window !== "undefined") {
      setUnlocked(window.localStorage.getItem(unlockStorageKey(id)) === "1");
    }

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getRestaurantReport(id);
        setReport(data);
      } catch (err) {
        console.error("Error obteniendo el reporte:", err);
        setError(
          "No encontramos ese reporte. Puede que haya expirado o el enlace esté mal escrito."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, id]);

  const { topIssues, checkableCount, failedCount, criticalFailedCount, moneyLostMonthly } =
    useMemo(() => {
      if (!report) {
        return {
          topIssues: [],
          checkableCount: 0,
          failedCount: 0,
          criticalFailedCount: 0,
          moneyLostMonthly: 0,
        };
      }

      const allIssues = [
        ...(report.issues ?? []),
        ...(report.seoIssues ?? []),
        ...(report.guestExperienceIssues ?? []),
      ];
      const checkable = allIssues.filter((issue) => issue.checkable);
      const failed = checkable.filter((issue) => !issue.pass);
      const sorted = [...failed].sort((a, b) => b.weight - a.weight);
      const critical = failed.filter((issue) => CRITICAL_ISSUE_KEYS.has(issue.key));

      return {
        topIssues: sorted.slice(0, 4),
        checkableCount: checkable.length,
        failedCount: failed.length,
        criticalFailedCount: critical.length,
        moneyLostMonthly: critical.length * LOST_ORDERS_PER_CRITICAL_ISSUE * AVG_TICKET_MXN,
      };
    }, [report]);

  const waHref = useMemo(() => {
    if (!report) return "";
    const text =
      moneyLostMonthly > 0
        ? `Hola, vi el reporte AI de "${report.name}" y podría estar perdiendo ~${moneyFormatter.format(moneyLostMonthly)}/mes por problemas en mi presencia online. Quiero que me ayuden a arreglarlo.`
        : report.hasWebsite
        ? `Hola, vi el reporte AI de "${report.name}" (${report.scoreTotal}/${TOTAL_MAX}, ${SCORE_LABEL_ES[report.scoreLabel] ?? report.scoreLabel}). Quiero mejorarlo.`
        : `Hola, vi que "${report.name}" no tiene sitio web propio. Quiero que me ayuden a arreglarlo.`;
    return `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [report, moneyLostMonthly]);

  const handleUnlock = () => {
    setUnlocked(true);
    setModalOpen(false);
    if (typeof window !== "undefined" && id) {
      window.localStorage.setItem(unlockStorageKey(id), "1");
    }
  };

  return (
    <>
      <Head>
        <title>
          {report ? `Reporte AI de ${report.name}` : "Reporte AI"} — Impulso
          Restaurantero
        </title>
      </Head>

      <NavBar />

      <main className="min-h-screen w-full bg-black pb-24 pt-24 md:pt-32">
        <div className="mx-auto max-w-[880px] px-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-principal border-t-transparent" />
              <p className="mt-4 text-white/60">Cargando tu reporte…</p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl bg-white/5 p-8 text-center ring-1 ring-white/10">
              <p className="parrafo-tw text-white/80">{error}</p>
            </div>
          )}

          {!loading && !error && report && (
            <div className="space-y-6">
              <header className="text-center">
                <span className="mb-4 inline-block rounded-full bg-secundario px-4 py-2 text-sm font-semibold uppercase tracking-wide text-principal">
                  Reporte AI
                </span>
                <div className="flex flex-col items-center gap-3">
                  {report.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={report.photoUrl}
                      alt={report.name}
                      className="h-16 w-16 rounded-xl object-cover ring-1 ring-white/10"
                    />
                  )}
                  <h1 className="title3-tw text-white">{report.name}</h1>
                </div>
                {report.formattedAddress && (
                  <p className="parrafo-tw mt-1 text-white/60">
                    {report.formattedAddress}
                  </p>
                )}
              </header>

              {moneyLostMonthly > 0 && (
                <div className="rounded-2xl bg-gradient-to-br from-red-600/20 to-black p-6 text-center ring-1 ring-red-500/40">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-400">
                    Podrías estar perdiendo
                  </p>
                  <p className="mt-1 text-4xl font-bold text-white md:text-5xl">
                    {moneyFormatter.format(moneyLostMonthly)}
                    <span className="text-lg font-normal text-white/60"> /mes</span>
                  </p>
                  <p className="parrafo-tw mt-2 text-white/70">
                    Por {criticalFailedCount}{" "}
                    {criticalFailedCount === 1
                      ? "problema crítico que encontramos"
                      : "problemas críticos que encontramos"}{" "}
                    en tu presencia online.
                  </p>
                  <details className="mt-3 text-left text-white/40">
                    <summary className="cursor-pointer text-xs text-white/50">
                      ¿Cómo calculamos esto?
                    </summary>
                    <p className="mt-2 text-xs leading-relaxed">
                      Estimación conservadora, no un cálculo exacto de tu
                      negocio: {criticalFailedCount} problema
                      {criticalFailedCount === 1 ? "" : "s"} crítico
                      {criticalFailedCount === 1 ? "" : "s"} × ~
                      {LOST_ORDERS_PER_CRITICAL_ISSUE} pedidos perdidos al mes
                      cada uno × un ticket promedio de{" "}
                      {moneyFormatter.format(AVG_TICKET_MXN)}.
                    </p>
                  </details>
                </div>
              )}

              {!report.hasWebsite && (
                <div className="rounded-2xl bg-red-500/10 p-6 text-center ring-1 ring-red-500/30">
                  <p className="text-lg font-bold text-white">
                    No tienes sitio web propio
                  </p>
                  <p className="parrafo-tw mt-2 text-white/70">
                    Este es tu problema #1: sin un sitio propio, Google no
                    tiene a dónde mandar a tus clientes y estás perdiendo
                    reservas y pedidos todos los días.
                  </p>
                </div>
              )}

              {report.hasWebsite && report.websiteScrapeError && (
                <div className="rounded-2xl bg-amber-500/10 p-6 text-center ring-1 ring-amber-500/30">
                  <p className="text-lg font-bold text-white">
                    Tu score podría ser más bajo de lo real
                  </p>
                  <p className="parrafo-tw mt-2 text-white/70">
                    {report.websiteScrapeError}
                  </p>
                </div>
              )}

              <div className="flex justify-center py-4">
                <ScoreGauge
                  score={report.scoreTotal}
                  maxScore={TOTAL_MAX}
                  label={SCORE_LABEL_ES[report.scoreLabel] ?? report.scoreLabel}
                  caption="Score general basado en Perfil de Google, SEO y experiencia de cliente."
                />
              </div>

              {checkableCount > 0 && (
                <p className="text-center text-sm text-white/60">
                  Revisamos <strong className="text-white">{checkableCount}</strong>{" "}
                  puntos y{" "}
                  <strong className="text-red-400">
                    {failedCount} necesitan trabajo
                  </strong>
                  .
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <PillarCard
                  title="Local Listings"
                  score={report.scoreLocalListings}
                  maxScore={LOCAL_LISTINGS_MAX}
                />
                <PillarCard
                  title="Search Results (SEO)"
                  score={report.scoreSeo}
                  maxScore={SEO_MAX}
                />
                <PillarCard
                  title="Guest Experience"
                  score={report.scoreGuestExperience}
                  maxScore={GUEST_EXPERIENCE_MAX}
                />
              </div>

              {!unlocked && topIssues.length > 0 && (
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
                    Algunos de los problemas que encontramos
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {topIssues.map((issue) => (
                      <li
                        key={issue.key}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-[2px] flex h-6 w-6 flex-none items-center justify-center rounded-full bg-red-500/90 text-sm font-bold text-white">
                          ✗
                        </span>
                        <span className="parrafo-tw text-white/85">
                          {issue.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {unlocked ? (
                <>
                  <CompetitorTable
                    competitors={report.competitors ?? []}
                    targetRating={report.rating}
                    targetReviews={report.userRatingsTotal}
                  />

                  <LocalRankingsTable
                    queries={report.serpQueries ?? []}
                    error={report.serpRankingError}
                  />

                  <IssueList
                    title="Tu perfil de Google Business"
                    intro="Tu Perfil de Google Business es lo primero que ve un cliente antes de decidir visitarte: qué tan fácil es encontrarte, contactarte y confiar en ti."
                    header={
                      <GoogleProfileCard
                        photoUrl={report.photoUrl}
                        rating={report.rating}
                        userRatingsTotal={report.userRatingsTotal}
                      />
                    }
                    issues={report.issues ?? []}
                  />
                  <IssueList
                    title="SEO de tu sitio web"
                    intro="El SEO es que tu sitio web sea fácil de encontrar en Google: entre mejor optimizado esté, más gente te encuentra sin pagar publicidad."
                    issues={report.seoIssues ?? []}
                  />
                  <IssueList
                    title="Experiencia para tus clientes"
                    intro="El contenido y la experiencia de tu sitio web son los que convierten una visita en una reserva o un pedido."
                    issues={report.guestExperienceIssues ?? []}
                  />

                  <div className="pt-4 text-center">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,.35)] transition-colors hover:bg-emerald-700 active:bg-emerald-800"
                    >
                      Quiero que me ayuden a mejorarlo
                    </a>
                  </div>
                </>
              ) : (
                <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <div className="pointer-events-none select-none space-y-4 p-6 opacity-40 blur-sm">
                    <div className="h-4 w-3/4 rounded bg-white/20" />
                    <div className="h-4 w-1/2 rounded bg-white/20" />
                    <div className="h-4 w-2/3 rounded bg-white/20" />
                    <div className="h-4 w-1/3 rounded bg-white/20" />
                    <div className="h-4 w-3/5 rounded bg-white/20" />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6 text-center">
                    <p className="title4-tw text-white">
                      Desbloquea tu reporte completo gratis
                    </p>
                    <p className="parrafo-tw mt-2 max-w-[420px] text-white/70">
                      Ve el detalle de los {checkableCount} puntos revisados,
                      tus competidores cercanos, y deja que te contactemos
                      para ayudarte a arreglarlo.
                    </p>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="mt-5 rounded-xl bg-principal px-6 py-3 text-base font-semibold text-black transition-colors hover:brightness-110"
                    >
                      Ver reporte completo gratis
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {modalOpen && report && (
        <LeadGateModal
          reportId={report.id}
          onClose={() => setModalOpen(false)}
          onUnlock={handleUnlock}
        />
      )}
    </>
  );
}
