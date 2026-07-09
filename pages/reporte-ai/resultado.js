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
import SearchCompetitors from "../../components/RestaurantReport/SearchCompetitors";
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

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

// Bloque "potencial" (Frente B Nº2) — copy CONFIGURABLE, sin cifras ni nombres
// de restaurantes. Edita este texto libremente; es lo que verá el dueño en la
// sección "Hasta dónde puedes llegar".
const POTENCIAL_COPY =
  "Los restaurantes que dominan su zona en Google y redes no solo recuperan lo que hoy se les va: multiplican sus reservas llenando las mesas en las horas valle y los días flojos. Tu techo real es mucho más alto que lo que dejas ir hoy — y llegar ahí es exactamente lo que hacemos contigo.";

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

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getRestaurantReport(id);
        setReport(data);
        // Gate SIEMPRE: el reporte arranca bloqueado en cada carga. Solo se
        // desbloquea al pasar el captcha + dejar datos (handleUnlock), y solo
        // para esta carga — NO se recuerda por localStorage ni por hasLead.
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

  const { topIssues, checkableCount, failedCount } = useMemo(() => {
    if (!report) {
      return { topIssues: [], checkableCount: 0, failedCount: 0 };
    }

    const allIssues = [
      ...(report.issues ?? []),
      ...(report.seoIssues ?? []),
      ...(report.guestExperienceIssues ?? []),
    ];
    const checkable = allIssues.filter((issue) => issue.checkable);
    const failed = checkable.filter((issue) => !issue.pass);
    const sorted = [...failed].sort((a, b) => b.weight - a.weight);

    return {
      topIssues: sorted.slice(0, 4),
      checkableCount: checkable.length,
      failedCount: failed.length,
    };
  }, [report]);

  const moneyLostMonthly = report?.estimatedMonthlyLoss ?? 0;

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
    // Sin persistencia: al recargar vuelve a estar bloqueado (gate siempre).
  };

  return (
    <>
      <Head>
        <title>
          {report ? `Reporte de ${report.name}` : "Reporte"} — Impulso
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

          {!loading && !error && report && report.expired && (
            <div className="rounded-2xl bg-white/5 p-8 text-center ring-1 ring-white/10">
              <p className="title4-tw text-white">Este reporte caducó</p>
              <p className="parrafo-tw mt-2 text-white/70">
                Por seguridad, la liga de tu reporte solo dura 24 horas. Genera
                uno nuevo para ver el análisis actualizado de tu restaurante.
              </p>
              <a
                href="/reporte-ai"
                className="mt-5 inline-block rounded-xl bg-principal px-6 py-3 text-base font-semibold text-black transition-colors hover:brightness-110"
              >
                Generar un reporte nuevo
              </a>
            </div>
          )}

          {!loading && !error && report && !report.expired && (
            <div className="space-y-6">
              <header className="text-center">
                <span className="mb-4 inline-block rounded-full bg-secundario px-4 py-2 text-sm font-semibold uppercase tracking-wide text-principal">
                  Reporte Impulso Restaurantero
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

              {moneyLostMonthly > 0 &&
                report.lossBreakdown &&
                (() => {
                  const lb = report.lossBreakdown;
                  // Fallbacks para reportes viejos (antes de Frente B): en esos
                  // el total era todo "medido en Google" y no había estimado
                  // de redes.
                  const googleMedido = lb.googleMedido ?? moneyLostMonthly;
                  const estimadoRedes = lb.estimadoRedes ?? 0;
                  const loQueDejasHoy = lb.loQueDejasHoy ?? moneyLostMonthly;

                  return (
                    <div className="rounded-2xl bg-gradient-to-br from-red-600/20 to-black p-6 ring-1 ring-red-500/40">
                      <p className="text-center text-xs font-semibold uppercase tracking-wide text-red-400">
                        Lo que dejas ir cada mes
                      </p>
                      <p className="mt-1 text-center text-4xl font-bold text-white md:text-5xl">
                        {moneyFormatter.format(loQueDejasHoy)}
                        <span className="text-lg font-normal text-white/60">
                          {" "}
                          /mes
                        </span>
                      </p>
                      <p className="parrafo-tw mx-auto mt-2 max-w-[520px] text-center text-white/70">
                        Clientes que te están buscando ahora mismo y terminan
                        con el de junto — por cómo te encuentran (o no te
                        encuentran) en internet.
                      </p>

                      {/* Medido (Google) vs estimado (redes) — SIEMPRE separados */}
                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                          <p className="text-[11px] uppercase tracking-wide text-white/50">
                            📊 Medido en Google
                          </p>
                          <p className="mt-1 text-2xl font-bold text-white">
                            {moneyFormatter.format(googleMedido)}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-white/50">
                            Dato duro: búsquedas reales de la gente × el lugar
                            donde apareces hoy. No lo inventamos nosotros.
                          </p>
                        </div>
                        {estimadoRedes > 0 && (
                          <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                            <p className="text-[11px] uppercase tracking-wide text-white/50">
                              📱 Estimado en redes
                            </p>
                            <p className="mt-1 text-2xl font-bold text-white">
                              + {moneyFormatter.format(estimadoRedes)}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-white/50">
                              Aproximado de lo que además se mueve en Instagram,
                              TikTok y Facebook. Es un estimado, no una medición.
                            </p>
                          </div>
                        )}
                      </div>

                      <details className="mt-4 text-left text-white/50">
                        <summary className="cursor-pointer text-xs text-white/50">
                          ¿Cómo lo calculamos?
                        </summary>
                        <div className="mt-3 space-y-3 text-xs leading-relaxed">
                          <p>
                            Vemos <strong>lo que la gente escribe en Google</strong>{" "}
                            para encontrar un lugar como el tuyo, y{" "}
                            <strong>en qué lugar sales tú</strong>. Cuando no
                            estás arriba, esos clientes se van con otro:
                          </p>
                          <ul className="space-y-1.5 border-l border-white/10 pl-3">
                            {lb.breakdown.map((item, i) => (
                              <li key={`${item.query}-${i}`}>
                                &ldquo;{item.query}&rdquo; — {item.searchVolume}{" "}
                                personas al mes lo buscan; como no sales arriba,
                                se van ~{Math.round(item.clicsPerdidos)}.
                              </li>
                            ))}
                          </ul>
                          <p>
                            De todos esos, contamos solo los que de verdad
                            habrían venido a comer (
                            {Math.round(lb.conversionClickAVisita * 100)}%),
                            calculamos {lb.personasPorMesa} personas por mesa y
                            tu ticket promedio de{" "}
                            {moneyFormatter.format(lb.ticket)} (según Google), y
                            aún así le bajamos a la mitad para no exagerar. Eso
                            da los {moneyFormatter.format(googleMedido)} medidos
                            en Google.
                          </p>
                          <p className="text-white/30">
                            Fuentes: volumen de búsqueda de Google Ads · CTR por
                            posición (estudios públicos de industria) ·
                            conversión de búsqueda local a visita (benchmark de
                            marketing local).
                          </p>
                        </div>
                      </details>
                    </div>
                  );
                })()}

              {/* Potencial — "hasta dónde puedes llegar" (copy configurable) */}
              {moneyLostMonthly > 0 && (
                <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-principal">
                    Hasta dónde puedes llegar
                  </p>
                  <p className="parrafo-tw mt-2 text-white/80">
                    {POTENCIAL_COPY}
                  </p>
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
                  caption="Qué tan fácil te encuentran y te eligen tus clientes en internet (tu Perfil de Google + tu sitio web)."
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
                  title="Perfil de Google"
                  score={report.scoreLocalListings}
                  maxScore={LOCAL_LISTINGS_MAX}
                />
                <PillarCard
                  title="Resultados de búsqueda (SEO)"
                  score={report.scoreSeo}
                  maxScore={SEO_MAX}
                />
                <PillarCard
                  title="Experiencia de cliente web"
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
                  <SearchCompetitors
                    queries={report.serpQueries ?? []}
                    targetName={report.name}
                  />

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
