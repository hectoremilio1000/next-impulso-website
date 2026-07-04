import { useState } from "react";
import { createRestaurantReportLead } from "../../lib/restaurantReportApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^[0-9]{10,15}$/;

export default function LeadGateModal({ reportId, onClose, onUnlock }) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
      });
      onUnlock();
    } catch (err) {
      console.error("Error guardando tus datos:", err);
      setSubmitError(
        "No pudimos guardar tus datos en este momento. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

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
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-principal"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Número de WhatsApp"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-principal"
            />
            {errors.whatsapp && (
              <p className="mt-1 text-sm text-red-400">{errors.whatsapp}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-principal"
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
            disabled={loading}
            className="w-full rounded-xl bg-principal px-5 py-3 text-base font-semibold text-black transition-colors hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Desbloqueando…" : "Ver mi reporte completo"}
          </button>
        </form>
      </div>
    </div>
  );
}
