
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBarBlack/NavBarEs'
import Link from 'next/link'

function Casosexito() {


  
  return (
    <>
    <NavBar />
    <div className="flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
    {/* Header */}
    <div className="text-center max-w-4xl">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        Impulso Restaurantero: La herramienta confiable para aumentar tus ventas y llevar tu restaurante al éxito.
        </h1>
        <p className="text-gray-600 text-sm md:text-2xl">
        Descubre cómo los dueños de restaurantes han utilizado Impulso Restaurantero para maximizar su éxito en línea. Conoce los números reales de restaurantes reales, antes y después de unirse a nuestra plataforma
        </p>
        </div>
    </div>
    
  <>
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start mb-4">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexito">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bff8de9f73cec2b5c5_Videos+copy.png"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">Historias Inspiradoras</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Inspírate con una colección de historias inspiradoras sobre
              restauranteros que superaron desafíos únicos y obstáculos para
              construir restaurantes generadores de dinero.
            </p>
            <Link href="/casosexito">
              <button className="button-small">Ver Historias</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bf1948a130a34f7abb_Wins+copy.png"
              alt=""
            />
            <h2 className="title3-tw text-center">Historias Inspiradoras</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Explora nuestra colección en constante actualización de
              restauranteros celebrando desde pequeños logros hasta ganancias
              extraordinarias.
            </p>
            <Link href="/casosexito">
              <button className="button-small">VER CLIENTES EXITÓSOS</button>
            </Link>
          </div>
        </div>
       
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start mb-4">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexito">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bff8de9f73cec2b5c5_Videos+copy.png"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">Historias Inspiradoras</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Inspírate con una colección de historias inspiradoras sobre
              restauranteros que superaron desafíos únicos y obstáculos para
              construir restaurantes generadores de dinero.
            </p>
            <Link href="/casosexito">
              <button className="button-small">Ver Historias</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bf1948a130a34f7abb_Wins+copy.png"
              alt=""
            />
            <h2 className="title3-tw text-center">Historias Inspiradoras</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Explora nuestra colección en constante actualización de
              restauranteros celebrando desde pequeños logros hasta ganancias
              extraordinarias.
            </p>
            <Link href="/casosexito">
              <button className="button-small">VER CLIENTES EXITÓSOS</button>
            </Link>
          </div>
        </div>
        </>
        <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        <div className="text-center max-w-4xl mb-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-center">
            Podrías estar obteniendo MUCHAS más ventas en línea.
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl text-center">
            Obten tu demo gratis ya
          </p>
        </div>
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
          {/* Imagen de fondo */}
          <img
            src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/seccion1/restaurant-hall-with-round-table-some-chairs-fireplace-plants1.jpg"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          {/* Gradiente superpuesto */}
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-75 bg-black"></div>
          {/* Contenido */}
          <div className="relative z-20 flex flex-col justify-center items-center h-full p-8 text-white">
            <div>
              <div className="mb-8 text-center">
                <p className="text-4xl font-bold text-white">$9,999</p>
                <p className="text-lg text-gray-300">Facturado mensualmente</p>
              </div>
              <div className="text-center">
                
              </div>
            </div>
            <Link href="/demogratis">
            <button className="button-small">Demo Gratis</button>
            </Link>
          </div>
        </div>
        </div>
        </>

  )
}

export default Casosexito