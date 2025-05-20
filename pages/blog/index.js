import Link from "next/link";
import NavBar from "../../components/NavBarBlack/NavBarEs";

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog-posts?limit=100`
  );
  const { data: posts } = await res.json();

  return { props: { posts } }; // 👈 sin revalidate
}

export default function BlogIndex({ posts }) {
  return (
    <>
      <NavBar />
      <section className="pt-24 md:pt-36 px-4 md:px-16 bg-gray-50 min-h-screen">
        <header className="max-w-5xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Blog Impulso Restaurantero
          </h1>
          <p className="text-gray-600 text-xl">
            Tips, estrategias y casos de éxito para restaurantes.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl md:text-xl font-semibold mb-2">
                  {post.title}
                </h2>
                <div className="flex justify-between items-center mb-2 text-sm">
                  {/* Autor: extremo izquierdo */}
                  <span className="font-semibold text-gray-700">
                    {post.author.name}
                  </span>

                  {/* Fecha: extremo derecho */}
                  <span className="text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString("es-MX")}
                  </span>
                </div>
                <p className="text-gray-700">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="block mt-4">
                  <button className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md">
                    Leer más
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
