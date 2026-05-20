import { useEffect, useRef, useState } from "react";
import { buildBookingWidgetUrl } from "../../lib/tracker";

/**
 * Embeds the pos_booking_widget en un iframe, con lead_uid + UTMs del
 * navegador del usuario inyectados como query params. Así la atribución
 * multi-touch se mantiene aunque el widget viva en otro dominio.
 *
 * Auto-redimensiona el iframe escuchando los mensajes `widget_height` que
 * postea el widget vía window.postMessage. Sin scroll interno.
 */
const WIDGET_BASE_URL =
  process.env.NEXT_PUBLIC_BOOKING_WIDGET_URL || "http://localhost:5174";

const DEFAULT_SLUG = "impulso-restaurantero";

/* Solo un piso/techo de seguridad. El widget reporta su altura real vía
 * postMessage y el iframe se ajusta a eso. */
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 1800;

export default function BookingWidget({
  slug = DEFAULT_SLUG,
  eventTypeSlug,
  initialHeight = 560,
}) {
  const [src, setSrc] = useState("");
  const [height, setHeight] = useState(initialHeight);
  const iframeRef = useRef(null);

  useEffect(() => {
    const url = buildBookingWidgetUrl(WIDGET_BASE_URL, slug, eventTypeSlug);
    setSrc(url);
  }, [slug, eventTypeSlug]);

  /* Listen for height updates from the embedded widget (cross-origin postMessage) */
  useEffect(() => {
    function handleMessage(event) {
      const data = event?.data;
      if (!data || typeof data !== "object") return;
      if (data.source !== "booking-widget") return;

      if (data.type === "widget_height" && typeof data.height === "number") {
        /* SIN buffer +N — esa adición creaba un loop con el body 100% */
        const clamped = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, data.height));
        setHeight((prev) => (Math.abs(prev - clamped) > 4 ? clamped : prev));
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!src) {
    return (
      <div
        style={{
          height: initialHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
        }}
      >
        Cargando widget…
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title="Agenda con Impulso Restaurantero"
      style={{
        width: "100%",
        height,
        border: 0,
        borderRadius: 12,
        background: "#fff",
        display: "block",
        transition: "height 200ms ease-out",
      }}
    />
  );
}
