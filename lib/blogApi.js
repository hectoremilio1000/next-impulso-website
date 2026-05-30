// /lib/blogApi.js
const API = process.env.NEXT_PUBLIC_BLOG_API; // ej: http://localhost:53108/api

async function get(path, init) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    next: { revalidate: 30 }, // cache ISR-like (en SSR/SSG)
  });
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`);
  return res.json();
}

/** Lista pública (paginada) */
export async function listBlogPosts(limit = 100, page = 1) {
  return get(`/blog-posts?limit=${limit}&page=${page}`); // { meta, data }
}

/** Detalle por slug (sitio público) */
export async function getBlogPostBySlug(slug) {
  return get(`/blog-posts/${slug}`); // post con blocks[]
}

/** (Opcional) Detalle por ID — si algún día lo usas en el sitio público */
export async function getBlogPostById(id) {
  return get(`/blog-posts/id/${id}`);
}

/** Utilidad sencilla de fecha */
export function fmtDate(mxIso) {
  if (!mxIso) return "";
  try {
    return new Date(mxIso).toLocaleDateString("es-MX");
  } catch {
    return "";
  }
}
