import { useEffect, useRef, useState } from "react";
import { createRestaurantReportLead } from "../../lib/restaurantReportApi";
import { getLeadUid } from "../../lib/tracker";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^[0-9]{10,15}$/;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Carga el script de reCAPTCHA una sola vez.
function loadRecaptchaScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject();
    if (window.grecaptcha && window.grecaptcha.render) return resolve();
    const existing = document.getElementById("recaptcha-script");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const s = document.createElement("script");
    s.id = "recaptcha-script";
    s.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject();
    document.head.appendChild(s);
  });
}

export default function LeadGateModal({ reportId, onClose, onUnlock }) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Renderiza el "No soy un robot" (reCAPTCHA v2) — paso 1 del gate.
  useEffect(() => {
    let cancelled = false;
    loadRecaptchaScript()
      .then(() => {
        const tryRender = () => {
          if (cancelled) return;
          if (
            window.grecaptcha &&
            window.grecaptcha.render &&
            recaptchaRef.current &&
            widgetIdRef.current === null
          ) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
              theme: "dark",
              callback: (token) => setCaptchaToken(token),
              "expired-callback": () => setCaptchaToken(""),
              "error-callback": () => setCaptchaToken(""),
            });
          } else {
            setTimeout(tryRender, 200);
          }
        };
        tryRender();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const resetCaptcha = () => {
    setCaptchaToken("");
    if (window.grecaptcha && widgetIdRef.current !== null) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
      } catch (e) {
        /* noop */
      }
    }
  };

  const validate = () => {
    const fieldErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      fieldErrors.name = "Ingresa tu nombre completo.";
    }
    if (!WHATSAPP_REGEX.test(whatsapp.trim())) {
      fieldErrors.whatsapp = "Ingresa un WhatsApp válido (10-15 dígitos).";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      fieldErrors.email = "Ingresa un correo electrónico válido.";
    }
    if (!captchaToken) {
      fieldErrors.captcha = "Confirma que no eres un robot.";
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    try {
      setLoading(true);
      await createRestaurantReportLead(reportId, {
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        captchaToken,
        leadUid: getLeadUid(),
      });
      onUnlock();
    } catch (err) {
      console.error("Error guardando tus datos:", err);
      setSubmitError(
        "No pudimos guardar tus datos en este momento. Intenta de nuevo."
      );
      resetCaptcha(); // el token es de un solo uso; hay que resolverlo de nuevo
    } finally {
      setLoading(false);
    }
  };

  const fieldsDisabled = !captchaToken;
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-principal disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-white/10 md:p-8">
        <div className="flex items-start justify-between">
          <h2 className="title4-tw text-white">
            Desbloquea tu reporte completo gratis
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="ml-4 text-white/40 hover:text-white"
          >
            ✕
          </button>
        </div>

        <p className="parrafo-tw mt-2 text-white/60">
          Déjanos tus datos y te mostramos el detalle completo: todos los
          problemas encontrados, tus competidores cercanos, y en breve te
          contactamos para ayudarte a arreglarlo.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Paso 1: captcha */}
          <div>
            <p className="mb-2 text-sm font-semibold text-white/70">
              1. Confirma que no eres un robot
            </p>
            <div className="flex justify-center">
              <div ref={recaptchaRef} />
            </div>
            {errors.captcha && (
              <p className="mt-1 text-center text-sm text-red-400">
                {errors.captcha}
              </p>
            )}
          </div>

          {/* Paso 2: datos (deshabilitados hasta resolver el captcha) */}
          <p className="pt-2 text-sm font-semibold text-white/70">
            2. Deja tus datos
          </p>

          <div>
            <input
              type="text"
              value={name}
              disabled={fieldsDisabled}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo"
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              value={whatsapp}
              disabled={fieldsDisabled}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Número de WhatsApp"
              className={inputClass}
            />
            {errors.whatsapp && (
              <p className="mt-1 text-sm text-red-400">{errors.whatsapp}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              value={email}
              disabled={fieldsDisabled}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-red-400">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={loading || fieldsDisabled}
            className="w-full rounded-xl bg-principal px-5 py-3 text-base font-semibold text-black transition-colors hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Desbloqueando…" : "Ver mi reporte completo"}
          </button>
        </form>
      </div>
    </div>
  );
}
