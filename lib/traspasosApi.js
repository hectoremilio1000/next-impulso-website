// /lib/traspasosApi.js
const API = process.env.NEXT_PUBLIC_TRASPASOS_API;

if (!API) {
  throw new Error(
    "NEXT_PUBLIC_TRASPASOS_API no está definida. " +
      "Configúrala en .env.local de este proyecto (impulso_administrador), " +
      "por ejemplo: NEXT_PUBLIC_TRASPASOS_API=http://localhost:53107/api"
  );
}

async function get(path, init) {
  if (!API.startsWith("http")) {
    throw new Error(
      `NEXT_PUBLIC_TRASPASOS_API debe ser una URL absoluta. Valor actual: "${API}"`
    );
  }

  const res = await fetch(`${API}${path}`, {
    ...init,
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`);
  return res.json();
}

export async function listTraspasos(q) {
  const qs = q ? `?q=${encodeURIComponent(q)}` : "";
  // 🔥 ahora solo /traspasos
  return get(`/traspasos${qs}`);
}

export async function getTraspaso(id) {
  // 🔥 ahora solo /traspasos/:id
  return get(`/traspasos/${id}`);
}

export function money(v) {
  const n = typeof v === "string" ? Number(v) : v ?? 0;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
}
