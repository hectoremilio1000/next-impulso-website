import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";

import { YouTubeEmbed } from "@next/third-parties/google";

const CasosEstudio = () => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const z = useMotionValue(0);
  const translateY = useMotionValue(0);
  const translateX = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const zSpring = useSpring(z);
  const txSpring = useSpring(translateX);
  const tySpring = useSpring(translateY);

  // const transform = useMotionTemplate`translate3d(${txSpring}%, ${tySpring}em, 0px) scale3d(1, 1, 1) rotateX(${xSpring}deg) rotateY(${ySpring}deg) rotateZ(${zSpring}deg)`;
  const transform = useMotionTemplate`translate3d(${translateX}%, ${translateY}em, 0px) scale3d(1, 1, 1) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Valores ajustados para movimientos más suaves
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Ajustes de rotación más suaves
    const rotateX = (height / 2 - mouseY) / 20; // Divide por un número mayor para suavizar
    const rotateY = (mouseX - width / 2) / 20; // Divide por un número mayor para suavizar

    // Traslación ajustada para que se mueva menos y de forma más controlada
    const tX = ((mouseX - width / 2) / width) * 10; // Multiplicador más bajo para control
    const tY = ((mouseY - height / 2) / height) * 10; // Multiplicador más bajo para control

    // Establecer los valores en los motionValues
    translateX.set(tX);
    translateY.set(tY);
    x.set(rotateX);
    y.set(rotateY);
  };

  const handleMouseLeave = () => {
    x.set(15);
    y.set(-25);
    z.set(15);
  };
  const handleScroll = (e) => {
    console.log(e);
    translateY.set(50);
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-5 px-2"
      ref={ref}
      onScroll={handleScroll}
      onMouseMove={handleMouseMove}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="heading-block flex flex-col justify-center items-center mb-16">
        <motion.span
          drag="x"
          dragConstraints={{
            top: 0,
            left: -50,
            right: 50,
            bottom: 0,
          }}
          className="rounded-full bg-secundario text-principal font-semibold px-4 py-2 mb-4 block"
        >
          #RESTAURANTEROSEXITOSOS
        </motion.span>
        <motion.h2
          transition={{ duration: 0.5 }} // Duración ajustada
          initial={{ opacity: 0, y: 50 }} // Cambio a 50 para que la animación inicie más rápido
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Solo ejecuta la animación una vez
          className="title2-tw text-center uppercase"
        >
          Más de 10 años de experiencia
          <br /> que garantizan resultados
        </motion.h2>
      </div>
      <div className="w-[100%] max-w-[1085px] flex flex-col justify-center items-center">
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start">
          <div className="w-full flex flex-col items-center gap-4 justify-start group p-6 bg-white border border-gray-100 rounded-3xl shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)] hover:shadow-[0_24px_55px_-18px_rgba(15,23,42,0.35)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            <Link href="/casosexito">
              <iframe
                className="w-full aspect-video self-stretch rounded-2xl"
                src="https://www.youtube.com/embed/N9o8Pa11K0E"
                title="Product Overview Video"
                aria-hidden="true"
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
          <div className="w-full flex flex-col items-center gap-4 justify-start group p-6 bg-white border border-gray-100 rounded-3xl shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)] hover:shadow-[0_24px_55px_-18px_rgba(15,23,42,0.35)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            <div className="w-full overflow-hidden rounded-2xl">
              <img
                className="w-full h-56 object-cover group-hover:scale-[1.04] transition-transform duration-500"
                src="/images/impulso/wins.jpeg"
                alt=""
              />
            </div>
            <h2 className="title3-tw text-center">Construye tu éxito</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Explora nuestra colección en constante actualización de
              restauranteros celebrando desde pequeños logros hasta ganancias
              extraordinarias.
            </p>
            <Link href="/casosexito">
              <button className="button-small">VER CLIENTES EXITÓSOS</button>
            </Link>
          </div>
          <div className="w-full md:col-span-2 relative">
            <div className="group w-full bg-white border border-gray-100 rounded-3xl shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)] hover:shadow-[0_24px_55px_-18px_rgba(15,23,42,0.35)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
              <div className="w-full relative p-8 md:p-16 flex items-start justify-start flex-col md:pr-[45%]">
                <div className="z-20 relative content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw">
                    Impulso Restaurantero <br />
                    AYUDA A Construir
                    <br />
                    Un Nuevo Restaurante <br />
                    de 7 Cifras Cada 21 Días
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Descubre lo que otros restauranteros alrededor del mundo
                    tienen que decir sobre los resultados que han logrado en el
                    camino.
                  </p>
                  <Link href="/casosexito">
                    <button className="button-small">
                      VER CASOS DE ESTUDIO
                    </button>
                  </Link>
                </div>
                <img
                  className="w-full h-56 mt-6 rounded-2xl object-cover md:h-full md:w-[42%] md:mt-0 md:rounded-none md:absolute md:right-0 md:top-0 group-hover:scale-105 transition-transform duration-500"
                  src="https://media-cdn.tripadvisor.com/media/photo-s/19/4b/66/9e/satisfaccion-bajo.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasosEstudio;
