import { useEffect, Fragment } from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";

/* ───────────── rutas estáticas ───────────── */
export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog-posts?limit=100`
  );
  const { data } = await res.json();

  return {
    paths: data.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

/* ───────────── datos por slug ───────────── */
export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog-posts/${params.slug}`
  );

  if (res.status === 404) return { notFound: true };

  const post = await res.json();
  console.log("[getStaticProps] post ⇒", post);
  return { props: { post } };
}

/* ───────────── Renderizador de bloques ───────────── */
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
            src={block.imageUrl}
            alt=""
          />
        </figure>
      );
    default:
      return null;
  }
}

/* ───────────── componente página ───────────── */
export default function SinglePost({ post }) {
  useEffect(() => {
    console.log("[SinglePost] post ⇒", post);
  }, [post]);

  return (
    <>
      <NavBar />

      {/* Banner */}
      <div
        className="relative h-[45vh] md:h-[80vh] pt-16 bg-center bg-cover"
        style={{ backgroundImage: `url(${post.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>

          {post.bannerPhrase && (
            <p className="italic text-lg mb-4">{post.bannerPhrase}</p>
          )}

          {post.author && (
            <p className="text-sm">
              <span className="font-semibold">Autor:</span> {post.author.name}
              <br />
              <span className="font-semibold">Fecha:</span>{" "}
              {new Date(post.publishedAt).toLocaleDateString("es-MX")}
            </p>
          )}
        </div>
      </div>

      {/* Contenido basado en bloques ★ */}
      <section className="bg-gray-50 px-4 md:px-16 py-12 font-serif">
        <article className="prose lg:prose-lg max-w-3xl mx-auto">
          {post.blocks?.length ? (
            post.blocks
              .sort((a, b) => a.order - b.order)
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
