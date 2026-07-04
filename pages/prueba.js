import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBarBlack/NavBarEs";
import axios from "axios";
import { useRouter } from "next/router";

// Config D1a: qué preguntas son multi-select (por id de pregunta, NO por texto).
// Si en el futuro hay más preguntas de opción múltiple, se agregan aquí.
const MULTI_SELECT = { 10: 2 }; // pregunta 10 = "¿Quién será tu público objetivo?" → elige 2

// Marco visual del wizard. DEFINIDO FUERA del componente: si se define adentro,
// React lo re-monta en cada render (cada tecleo) y los inputs pierden el foco.
function Shell({ contexto, children }) {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-24 md:pt-32 pb-16">
        <div className="w-full max-w-xl mx-auto flex items-center justify-between mb-5">
          <span className="text-sm font-extrabold tracking-tight">
            <span className="text-principal">IMPULSO</span>RESTAURANTERO
          </span>
          {contexto && (
            <span className="text-xs text-gray-400">
              {contexto === "operando" ? "Ya operando" : "En planeación"}
            </span>
          )}
        </div>
        <div className="w-full max-w-xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl p-7 md:p-8">
          {children}
        </div>
      </div>
    </>
  );
}

function Prueba() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [contexto, setContexto] = useState(null); // "planeacion" | "operando"
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]); // [{ pregunta_id, option_id }]
  const [paso, setPaso] = useState(0); // 0..preguntas.length-1 = preguntas; === length → datos
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // spinner al generar recomendaciones
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    whatsapp: "",
    origin: "inteligenciaArtificial",
    status: "creado",
  });

  const preguntaInicial = {
    texto: "¿Ya abriste tu negocio o estás en planeación?",
    opciones: [
      { id: "planeacion", texto: "Planeación", sub: "Aún no abro" },
      { id: "operando", texto: "Operando", sub: "Ya tengo el negocio" },
    ],
  };

  // Elegir contexto
  const handleSeleccionInicial = (opcion) => {
    setContexto(opcion);
    setPaso(0);
    setRespuestas([]);
  };

  // Cargar preguntas del contexto
  useEffect(() => {
    if (!contexto) return;
    const fetchPreguntas = async () => {
      setCargando(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/questionsByContext/${contexto}`);
        if (response.data.status === "success") {
          setPreguntas(response.data.data);
        } else {
          throw new Error("Error al cargar preguntas");
        }
      } catch (err) {
        console.error("Error al cargar preguntas:", err.message);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    fetchPreguntas();
  }, [contexto]);

  // Helpers de selección
  const maxFor = (pregunta) => MULTI_SELECT[pregunta.id] || 0;
  const seleccionadas = (preguntaId) =>
    respuestas.filter((r) => r.pregunta_id === preguntaId);
  const isSel = (preguntaId, optionId) =>
    respuestas.some((r) => r.pregunta_id === preguntaId && r.option_id === optionId);
  const answered = (pregunta) => {
    const max = maxFor(pregunta);
    const count = seleccionadas(pregunta.id).length;
    return max ? count === max : count >= 1;
  };

  const toggleOpcion = (pregunta, opcion) => {
    const max = maxFor(pregunta);
    if (max) {
      // multi-select
      setRespuestas((prev) => {
        const existe = prev.find(
          (r) => r.pregunta_id === pregunta.id && r.option_id === opcion.id
        );
        if (existe) {
          return prev.filter(
            (r) => !(r.pregunta_id === pregunta.id && r.option_id === opcion.id)
          );
        }
        const mismas = prev.filter((r) => r.pregunta_id === pregunta.id);
        if (mismas.length >= max) return prev;
        return [...prev, { pregunta_id: pregunta.id, option_id: opcion.id }];
      });
    } else {
      // single-select → reemplaza y AUTO-AVANZA
      setRespuestas((prev) =>
        prev
          .filter((r) => r.pregunta_id !== pregunta.id)
          .concat({ pregunta_id: pregunta.id, option_id: opcion.id })
      );
      setTimeout(() => setPaso((p) => p + 1), 300);
    }
  };

  const avanzar = () => setPaso((p) => p + 1);
  const retroceder = () => {
    if (paso === 0) {
      setContexto(null);
      setPreguntas([]);
      setRespuestas([]);
    } else {
      setPaso((p) => p - 1);
    }
  };

  // Validación de datos del prospecto
  const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whatsappRegex = /^[0-9]{10}$/;
    const fieldErrors = {};
    if (!data.first_name) fieldErrors.first_name = "Por favor, ingresa tu nombre.";
    if (!data.last_name) fieldErrors.last_name = "Por favor, ingresa tu apellido.";
    if (!emailRegex.test(data.email))
      fieldErrors.email = "Por favor, ingresa un correo electrónico válido.";
    if (!whatsappRegex.test(data.whatsapp))
      fieldErrors.whatsapp = "Ingresa un WhatsApp válido (10 dígitos).";
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Envío (mismo payload que antes: sirve con backend viejo y nuevo)
  const handleProspectSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const payload = {
      ...form,
      responses: respuestas.map((resp) => {
        const preguntaEncontrada = preguntas.find((p) => p.id === resp.pregunta_id);
        return {
          pregunta: preguntaEncontrada?.statement || "",
          opciones: [resp.option_id],
          option_id: resp.option_id,
        };
      }),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/prospectsWithRecommendations`,
        payload
      );
      setLoading(false);
      if (response.data.status === "success") {
        router.push("/gracias");
      } else {
        throw new Error("Error al enviar respuestas.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error al enviar respuestas:", error);
      alert("Hubo un error al procesar tus respuestas. Intenta nuevamente.");
    }
  };

  // ---------- Render ----------
  // 1) Intro / elección de contexto
  if (!contexto) {
    return (
      <Shell contexto={contexto}>
        <p className="text-xs font-extrabold tracking-widest uppercase text-principal mb-3">
          Diagnóstico gratis con IA
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
          Descubre cómo hacer que tu restaurante venda más
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
          Contesta unas preguntas rápidas y recibe un{" "}
          <b>plan personalizado con IA</b>, hecho a la medida de tu negocio.
        </p>
        <div className="flex flex-wrap gap-4 mb-6 text-sm font-semibold text-gray-800">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-principal" /> ~2 minutos
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-principal" /> Gratis
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-principal" /> Plan a tu correo
          </span>
        </div>
        <p className="text-base font-extrabold text-gray-900 mb-3">
          {preguntaInicial.texto}
        </p>
        <div className="flex gap-3">
          {preguntaInicial.opciones.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => handleSeleccionInicial(opcion.id)}
              className="flex-1 text-center px-4 py-4 rounded-2xl border-[1.5px] border-gray-200 bg-gray-50 hover:border-principal hover:-translate-y-0.5 transition font-extrabold text-gray-900"
            >
              {opcion.texto}
              <span className="block font-medium text-xs text-gray-500 mt-1">
                {opcion.sub}
              </span>
            </button>
          ))}
        </div>
      </Shell>
    );
  }

  if (cargando) {
    return (
      <Shell contexto={contexto}>
        <p className="text-gray-600">Cargando preguntas…</p>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell contexto={contexto}>
        <p className="text-red-500">Error: {error}</p>
      </Shell>
    );
  }

  const total = preguntas.length;

  // 2) Preguntas (una por pantalla)
  if (paso < total) {
    const pregunta = preguntas[paso];
    const max = maxFor(pregunta);
    const n = paso + 1;
    const pct = Math.round((n / total) * 100);
    const seleccion = seleccionadas(pregunta.id);

    return (
      <Shell contexto={contexto}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold tracking-widest uppercase text-principal">
            {contexto === "operando" ? "Tu negocio" : "Tu proyecto"}
          </span>
          <span className="text-xs text-gray-500 tabular-nums">
            Pregunta {n} de {total}
          </span>
        </div>
        <div className="h-[7px] rounded-full bg-gray-100 overflow-hidden mb-6">
          <div
            className="h-full rounded-full bg-principal transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug mb-1">
          {pregunta.statement}
        </p>
        <p className="text-sm text-gray-500 mb-5">
          {max
            ? `Elige ${max} opciones (${seleccion.length}/${max})`
            : "Toca una opción para continuar"}
        </p>

        <div className="flex flex-col gap-3">
          {pregunta.options.map((opcion) => {
            const on = isSel(pregunta.id, opcion.id);
            return (
              <button
                key={opcion.id}
                type="button"
                onClick={() => toggleOpcion(pregunta, opcion)}
                className={`flex items-center gap-3 w-full text-left px-4 py-4 rounded-xl border-[1.5px] transition ${
                  on
                    ? "border-principal bg-principal/10"
                    : "border-gray-200 bg-gray-50 hover:border-principal"
                }`}
              >
                <span
                  className={`flex-none grid place-items-center w-[22px] h-[22px] border-2 transition ${
                    max ? "rounded-md" : "rounded-full"
                  } ${on ? "border-principal bg-principal" : "border-gray-300"}`}
                >
                  {on && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="#fff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-base text-gray-900">{opcion.text}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={retroceder}
            className="px-5 py-3.5 rounded-xl border border-gray-200 text-gray-500 font-bold hover:text-gray-900 transition"
          >
            Atrás
          </button>
          {max > 0 && (
            <button
              type="button"
              onClick={avanzar}
              disabled={!answered(pregunta)}
              className="flex-1 px-5 py-3.5 rounded-xl bg-principal text-white font-extrabold shadow-md hover:bg-yellow-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {n === total ? "Ver mis recomendaciones" : "Siguiente"}
            </button>
          )}
        </div>
      </Shell>
    );
  }

  // 3) Datos del prospecto (último paso)
  return (
    <Shell contexto={contexto}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold tracking-widest uppercase text-principal">
          Último paso
        </span>
        <span className="text-xs text-gray-500">Casi listo</span>
      </div>
      <div className="h-[7px] rounded-full bg-gray-100 overflow-hidden mb-6">
        <div className="h-full rounded-full bg-principal" style={{ width: "100%" }} />
      </div>

      <p className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug mb-1">
        ¿A dónde te enviamos tu plan?
      </p>
      <p className="text-sm text-gray-500 mb-5">
        Lo generamos con IA y te lo mandamos por correo.
      </p>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 my-6">
          <div className="animate-spin w-14 h-14 border-4 border-principal border-t-transparent rounded-full" />
          <p className="text-base font-semibold text-gray-700">
            Generando tus recomendaciones con IA…
          </p>
        </div>
      )}

      {!loading && (
        <form onSubmit={handleProspectSubmit} className="flex flex-col gap-3">
          {[
            { key: "first_name", label: "Nombre(s)", ph: "Tu nombre", type: "text" },
            { key: "last_name", label: "Apellido(s)", ph: "Tu apellido", type: "text" },
            { key: "email", label: "Correo electrónico", ph: "tucorreo@ejemplo.com", type: "email" },
            { key: "whatsapp", label: "WhatsApp", ph: "10 dígitos", type: "tel" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.ph}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-[1.5px] border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-principal"
              />
              {errors[f.key] && (
                <span className="text-xs text-red-500">{errors[f.key]}</span>
              )}
            </div>
          ))}

          <div className="flex gap-3 mt-3">
            <button
              type="button"
              onClick={() => setPaso(total - 1)}
              className="px-5 py-3.5 rounded-xl border border-gray-200 text-gray-500 font-bold hover:text-gray-900 transition"
            >
              Atrás
            </button>
            <button
              type="submit"
              className="flex-1 px-5 py-3.5 rounded-xl bg-principal text-white font-extrabold shadow-md hover:bg-yellow-500 transition"
            >
              Generar mi plan
            </button>
          </div>
        </form>
      )}
    </Shell>
  );
}

export default Prueba;
