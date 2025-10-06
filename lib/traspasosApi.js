const API = process.env.NEXT_PUBLIC_TRASPASOS_API;

async function get(path, init) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`);
  return res.json();
}

export async function listTraspasos(q) {
  const qs = q ? `?q=${encodeURIComponent(q)}` : "";
  return get(`/api/traspasos${qs}`);
}

export async function getTraspaso(id) {
  return get(`/api/traspasos/${id}`);
}

export function money(v) {
  const n = typeof v === "string" ? Number(v) : v ?? 0;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
}
