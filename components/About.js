import React from "react";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={`${styles.containerAbout}`}>
      <div className="max-w-[1300px] mx-auto px-[20px]">
        <div className="w-full flex justify-end">
          <div className="box shadow-2xl md:w-1/2 bg-white border-[1px] border-[#e5e5e5] rounded-[1.2em] p-8 md:py-16 md:px-16 flex flex-col">
            <h1 className=" titlebanner-tw text-center text-clip mb-1 md:mb-4">
              Impulso
            </h1>
            <h1 className=" titlebanner-tw text-center mb-4">Restaurantero</h1>
            <p className="title4-tw paragraph-feature mb-6">
              Impulso Restaurantero es un movimiento diseñado para que todos los
              dueños de restaurantes lleguen a más clientes, transformen más
              vidas, y construyan negocios sumamente rentables.
            </p>
            <p className="title4-tw paragraph-feature mb-6">
              Fundada en 2024, hemos trabajado con más de 1,000 restauranteros
              en México, creando miles de restaurantes que generan millones de
              pesos en utilidades, y ayudando a miles de dueños a llevarse a
              casa su inversión en menos de dos años. Hemos logrado esto a
              través de nuestra plataforma exclusiva de crecimiento.
            </p>
            <div className="flex justify-around mt-6">
              {/* <div>
                <h1 className="counter font-bold">10</h1>
                <p className="font-bold title4-tw text-block-6">Restaurantes</p>
              </div>
              <div>
                <h1 className="counter font-bold">3</h1>
                <p className="font-bold title4-tw text-block-6">Dueños</p>
              </div> */}
              <div>
                <h1 className="counter font-bold">+$2B</h1>
                <p className="font-bold title4-tw text-block-6">Ganancias</p>
              </div>
              <div>
                <h1 className="counter font-bold ">+1,000</h1>
                <p className="font-bold title4-tw text-block-6">Clientes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
