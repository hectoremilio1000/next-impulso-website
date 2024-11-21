import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";

const RestauranterosExitosos = () => {
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

  const transform = useMotionTemplate`translate3d(${translateX}%, ${translateY}em, 0px) scale3d(1, 1, 1) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = (height / 2 - mouseY) / 20;
    const rotateY = (mouseX - width / 2) / 20;

    const tX = ((mouseX - width / 2) / width) * 10;
    const tY = ((mouseY - height / 2) / height) * 10;

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

  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-2"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >


      <div className="heading-block flex flex-col justify-center items-center mb-8">
        <span className="rounded-full bg-secundario text-principal font-semibold px-4 py-2 mb-4">
          #RESTAURANTEROSEXITOSOS
        </span>

        <motion.h2
          transition={{ duration: 0.5 }}  // Duración ajustada
          initial={{ opacity: 0, y: 50 }} // Cambio a 50 para que la animación inicie más rápido
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Solo ejecuta la animación una vez
          className="title2-tw text-center uppercase"
        >
          ¿Listo para empezar a recibir <br />
          a millones <br />
          de nuevos clientes?
        </motion.h2>



      </div>
      <div className="max-w-[1085px] mx-auto w-full">
        <div className="grid gap-16 w-full">
          {/* Bloque 1 */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">Cómo Iniciar <br /> un Restaurante</h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Es tu guía esencial para convertirte en dueño de un restaurante
                    exitoso. Desde la elección del tipo de restaurante y ubicación,
                    hasta comprender las complejidades de los arrendamientos. Además,
                    descubre cómo evitar los errores comunes que pueden afectar tu
                    emprendimiento gastronómico.
                  </p>
                  <Link href="/casosexito">
                    <button className="button-small font-bold">LEER AHORA</button>
                  </Link>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/seccion1/restaurant-hall-with-round-table-some-chairs-fireplace-plants1.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Bloque 2 */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">
                    7 Modelos de Ingresos <br /> para Restaurantes
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    ¿Quieres hacer crecer tu restaurante o bar y generar más de
                    $100,000 al mes? Descarga nuestro PDF gratuito con los 7 Modelos de
                    Ingresos y accede a una capacitación en video aquí.
                  </p>
                  <Link href="/casosexito">
                    <button className="button-small font-bold">VER AHORA</button>
                  </Link>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://www.exquisitoperu.com/wp-content/uploads/2019/03/mayta.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Bloque 3 */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">
                    ANUNCIOS DE 30 MINUTOS <br /> PARA RESTAURANTES
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Los dueños de restaurantes consiguen 20-30 nuevos clientes al mes
                    con este plan de anuncios en Facebook "listo para usar".
                  </p>
                  <Link href="/casosexito">
                    <button className="button-small font-bold">PROBAR AHORA</button>
                  </Link>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://i.pinimg.com/736x/73/a5/48/73a5481477d4842fc7cb46730557aabc.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Bloque 4 */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase text-center">
                    SECRETOS DE <br /> IMPULSO RESTAURANTERO
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    La guía paso a paso para que los dueños de restaurantes
                    aprendan a llegar a más clientes, transformar más vidas y construir
                    negocios sumamente rentables.
                  </p>
                  <Link href="/casosexito">
                    <button className="button-small font-bold">SOLICITAR AHORA</button>
                  </Link>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://www.idgastronomic.com/wp-content/uploads/2023/01/tiktok-videos-restaurantes-1.jpg"
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

export default RestauranterosExitosos;
