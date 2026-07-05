import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../lib/googleMaps";

const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#3c3c3c" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1a1a1a" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d0d0d" }] },
];

// Pin tipo "ubicación" clásico (viewBox 24x24), en vez de un círculo plano.
const PIN_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z";

const PULSE_MS = 2200;
const TYPEWRITER_SPEED_MS = 35;
const COMPETITOR_STEP_MS = 2000;

function makeNameLabel(google, map, position, text, variant) {
  class NameLabel extends google.maps.OverlayView {
    constructor() {
      super();
      this.div = null;
      this.setMap(map);
    }

    onAdd() {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.transform = "translate(-50%, -160%)";
      div.style.whiteSpace = "nowrap";
      div.style.padding = "3px 10px";
      div.style.borderRadius = "9999px";
      div.style.fontSize = "11px";
      div.style.fontWeight = "600";
      div.style.pointerEvents = "none";
      div.style.boxShadow = "0 4px 12px rgba(0,0,0,.35)";
      if (variant === "primary") {
        div.style.background = "#a78b21";
        div.style.color = "#000";
      } else {
        div.style.background = "#ffffff";
        div.style.color = "#111";
      }
      div.textContent = text;
      this.div = div;
      this.getPanes().overlayMouseTarget.appendChild(div);
    }

    draw() {
      const projection = this.getProjection();
      if (!projection || !this.div) return;
      const point = projection.fromLatLngToDivPixel(position);
      if (point) {
        this.div.style.left = `${point.x}px`;
        this.div.style.top = `${point.y}px`;
      }
    }

    onRemove() {
      if (this.div?.parentNode) {
        this.div.parentNode.removeChild(this.div);
      }
      this.div = null;
    }
  }

  return new NameLabel();
}

function useTypewriter(active, text, speedMs) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setShown("");
      setDone(false);
      return undefined;
    }
    if (!text) {
      setDone(true);
      return undefined;
    }
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speedMs);
    return () => clearInterval(interval);
  }, [active, text, speedMs]);

  return { shown, done };
}

export default function CompetitorsMap({
  center,
  restaurantName,
  address,
  competitors,
  onReady,
}) {
  const mapDivRef = useRef(null);
  const mapRefsRef = useRef(null);
  const [phase, setPhase] = useState("pulse");
  const [competitorIndex, setCompetitorIndex] = useState(0);
  const [error, setError] = useState(false);

  const typewriterText = [restaurantName || "Tu restaurante", address]
    .filter(Boolean)
    .join(" — ");
  const { shown: typedText, done: typingDone } = useTypewriter(
    phase === "type",
    typewriterText,
    TYPEWRITER_SPEED_MS
  );

  const competitorList = (competitors ?? []).filter((c) => c.location);

  // Fase 1: pin parpadeando (2.2s) -> pasa a escritura del nombre/dirección.
  useEffect(() => {
    if (phase !== "pulse") return undefined;
    const t = setTimeout(() => setPhase("type"), PULSE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Fase 2: cuando termina de "escribirse" el nombre, se ubica en el mapa.
  useEffect(() => {
    if (phase !== "type" || !typingDone) return undefined;
    const t = setTimeout(() => setPhase("locate"), 500);
    return () => clearTimeout(t);
  }, [phase, typingDone]);

  // Fase 3: inicializa el mapa real centrado en el restaurante.
  useEffect(() => {
    if (phase !== "locate") return undefined;
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !mapDivRef.current || !center) return;

        const map = new google.maps.Map(mapDivRef.current, {
          center,
          zoom: 15,
          disableDefaultUI: true,
          gestureHandling: "none",
          styles: DARK_MAP_STYLE,
        });

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(center);

        new google.maps.Marker({
          position: center,
          map,
          zIndex: 999,
          icon: {
            path: PIN_PATH,
            fillColor: "#a78b21",
            fillOpacity: 1,
            strokeColor: "#000000",
            strokeWeight: 1.5,
            scale: 1.7,
            anchor: new google.maps.Point(12, 22),
          },
        });
        makeNameLabel(
          google,
          map,
          center,
          restaurantName || "Tu restaurante",
          "primary"
        );

        mapRefsRef.current = { google, map, bounds };

        google.maps.event.addListenerOnce(map, "idle", () => {
          if (cancelled) return;
          setPhase(competitorList.length > 0 ? "competitors" : "done");
        });
      })
      .catch((err) => {
        console.error("Error cargando Google Maps:", err);
        if (!cancelled) {
          setError(true);
          onReady?.();
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, center, restaurantName]);

  // Fase 4: revela un competidor a la vez, cada ~2s.
  useEffect(() => {
    if (phase !== "competitors" || !mapRefsRef.current) return undefined;

    if (competitorIndex >= competitorList.length) {
      const { map, bounds } = mapRefsRef.current;
      map.fitBounds(bounds, 70);
      setPhase("done");
      return undefined;
    }

    const competitor = competitorList[competitorIndex];
    const { google, map, bounds } = mapRefsRef.current;

    new google.maps.Marker({
      position: competitor.location,
      map,
      icon: {
        path: PIN_PATH,
        fillColor: "#ffffff",
        fillOpacity: 0.95,
        strokeColor: "#000000",
        strokeWeight: 1,
        scale: 1.2,
        anchor: new google.maps.Point(12, 22),
      },
    });
    makeNameLabel(google, map, competitor.location, competitor.name, "secondary");
    bounds.extend(competitor.location);

    const t = setTimeout(
      () => setCompetitorIndex((i) => i + 1),
      COMPETITOR_STEP_MS
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, competitorIndex]);

  useEffect(() => {
    if (phase === "done") onReady?.();
  }, [phase, onReady]);

  const showMap = phase === "locate" || phase === "competitors" || phase === "done";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#141414]">
      <div
        ref={mapDivRef}
        className="h-full w-full"
        style={{ visibility: showMap ? "visible" : "hidden" }}
      />

      {(phase === "pulse" || phase === "type") && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
          <div className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-principal opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-principal" />
          </div>
          {phase === "type" && (
            <div className="max-w-xs rounded-xl bg-white/5 px-5 py-3 text-center ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">
                {typedText}
                <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-principal align-middle" />
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs text-white/40">
          No pudimos cargar el mapa.
        </div>
      )}
    </div>
  );
}
