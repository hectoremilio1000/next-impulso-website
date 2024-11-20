import React from 'react'
import NavBar from '../components/NavBarBlack/NavBarEs'
import Link from 'next/link'
import FAQ from '../components/FAQ/faq'


function Comolohacemos() {

  const faqs = [
    { question: "¿Qué pasará con mi sitio web actual?", answer: "Cuando te registras con Impulso Restaurantero, obtendrás un nuevo sitio web optimizado para atraer tráfico y aumentar tus ventas. Este reemplazará tu sitio web actual. Tu dominio y URL seguirán siendo los mismos. No eliminaremos tu sitio web actual. Si en algún momento decides cancelar tu suscripción con nosotros, restauraremos tu sitio web a como estaba antes de registrarte." },
    { question: "¿Qué tan personalizable es el diseño?", answer: "En Impulso Restaurantero creemos que las ventas son lo más importante. Por eso, te ofrecemos un diseño probado que puedes personalizar con la identidad de tu marca. Así es como nuestros sitios web para restaurantes tienen un estilo único. Hemos estudiado las mejores marcas online, generado más de $100 millones en ventas para restaurantes y ayudado a miles de dueños de restaurantes a hacer crecer su base de clientes con nuestros sitios web. Si buscas total libertad en el diseño, Impulso Restaurantero puede no ser la mejor opción para tu negocio." },
    { question: "¿Cuánto tiempo tomará?", answer: "Si tienes todo listo, solo te tomará unos pocos días. La mayoría de nuestros clientes logran tener su nueva presencia en línea configurada en aproximadamente una semana. Al registrarte, necesitaremos algo de información sobre tu restaurante. Esto incluye los datos de tu dominio web, así como los detalles de tu cuenta de Google Business, Facebook, Tik tok, Instagram. Cuanta más información tengas preparada, más rápido podremos lanzar tu nueva plataforma." },
  ];

  return (
    <>
    <NavBar />
    <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
      {/* Header */}
      <div className="text-center max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Podrías estar obteniendo MUCHAS más ventas en línea.
        </h1>
        <p className="text-gray-600 text-sm md:text-xl">
        Impulso Restaurantero es la manera más sencilla de COONSEGUIR MÁS reservas en línea y ofrecer la mejor experiencia a tus clientes. Descubre cómo lo hacemos.
        </p>
      </div>

      {/* Call to Action Button */}
      <div className="mt-6 mb-4">
      <Link href="/casosexito">
              <button className="button-small">Demo Gratis</button>
            </Link>
      </div>

      <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
            <img
              className=" w-full object-contain "
              src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bf1948a130a34f7abb_Wins+copy.png"
              alt=""
            />
            <h2 className="title3-tw text-center">Historias Inspiradoras</h2>
            
           
          </div>
      {/* Image Section */}
     <>
     <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexito">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/googleSeo.png"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">01. Destaca en Internet</h2>
            <p className="parrafo-tw paragraph-feature text-center">
            Con técnicas avanzadas de SEO y estrategias de marketing digital, optimizamos tu presencia en línea para que tu restaurante aparezca en los primeros lugares de Google, Tik Tok, Facebook e Instagram.
            </p>
            <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain rounded-2xl"
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/pagina%2Bvisitas%2Bwebsite.jpg"
              alt=""
            />
            <h2 className="title3-tw text-center">02. Páginas que venden</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Creamos tu página para que tengas más reservas
            </p>
              <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexito">
              <img
                className=" w-full object-contain rounded-2xl"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/punto-venta%2Bimpuloso%2Brestaurantero.jpg"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">03. Punto de venta con instalación </h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Te damos un punto de venta para que puedas agilizar tu operación
            </p>
            <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/recursos%2Bhumanps%2Bmanuales%2Bia.png"
              alt=""
            />
            <h2 className="title3-tw text-center">04. Manuales y Recursos humanos</h2>
            <p className="parrafo-tw paragraph-feature text-center">
             Te ofrecemos manuales y un departamento de recursos humanos con inteligencia artificial
            </p>
            <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>

        </div>
     </>
     <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 px-[20px] items-start">
     <FAQ items={faqs}/>
     <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
            <img
              className=" w-full object-contain "
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/comolohacemos%2Bpagina.png"
              alt=""
            />
          
            
           
          </div>
     </div>
    </div>

    </>
    
  )
}

export default Comolohacemos