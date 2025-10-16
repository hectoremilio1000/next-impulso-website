// /pages/blog/[slug].js
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import { getBlogPostBySlug } from "../../lib/blogApi";

function RenderBlock({ block }) {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{block.text}</h3>
      );
    case "paragraph":
      return <p className="mb-6">{block.text}</p>;
    case "image":
      return (
        <figure className="my-10">
          <img
            className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
            src={block.imageUrl || "/images/placeholder-img.webp"}
            alt=""
          />
        </figure>
      );
    default:
      return null;
  }
}

export default function SinglePost() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const p = await getBlogPostBySlug(slug);
        setPost(p);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="mx-auto max-w-5xl px-4 pt-24 pb-12">Cargando…</div>
      </>
    );
  }
  if (notFound || !post) {
    return (
      <>
        <NavBar />
        <div className="mx-auto max-w-5xl px-4 pt-24 pb-12">No encontrado</div>
      </>
    );
  }

  const cover = post.coverImage || "/images/placeholder-cover.webp";

  return (
    <>
      <NavBar />

      {/* Banner */}
      <div
        className="relative h-[45vh] md:h-[80vh] pt-16 bg-center bg-cover"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>

          {post.bannerPhrase && (
            <p className="italic text-lg mb-4">{post.bannerPhrase}</p>
          )}

          <p className="text-sm">
            <span className="font-semibold">Autor:</span>{" "}
            {post?.author?.name || "Impulso Restaurantero"}
            <br />
            <span className="font-semibold">Fecha:</span>{" "}
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("es-MX")
              : ""}
          </p>
        </div>
      </div>

      {/* Contenido por bloques */}
      <section className="bg-gray-50 px-4 md:px-16 py-12 font-serif">
        <article className="prose lg:prose-lg max-w-3xl mx-auto">
          {post.blocks?.length ? (
            post.blocks
              .sort(
                (a, b) => (a.order ?? a.sortOrder) - (b.order ?? b.sortOrder)
              )
              .map((block) => (
                <Fragment key={block.id}>
                  <RenderBlock block={block} />
                </Fragment>
              ))
          ) : (
            <p>(Sin contenido todavía)</p>
          )}
        </article>
      </section>
    </>
  );
}
