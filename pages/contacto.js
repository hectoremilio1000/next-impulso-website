import React from "react";
import Head from "next/head";
import NavBar from "../components/NavBarBlack/NavBarEs";
import BookingWidget from "../components/BookingWidget";

function Contacto() {
  return (
    <>
      <Head>
        <title>Contacto — Impulso Restaurantero</title>
        <meta
          name="description"
          content="Agenda una sesión con el equipo de Impulso Restaurantero. Te ayudamos a impulsar tu restaurante."
        />
      </Head>

      <NavBar />

      <main className="w-full bg-white pt-24 md:pt-28">
        <section className="w-full max-w-[1184px] mx-auto px-4 pt-10 pb-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Agenda tu sesión
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-3">
            Elige el horario que más te convenga y un experto de Impulso
            Restaurantero te atenderá.
          </p>
        </section>

        <section className="w-full max-w-[900px] mx-auto px-4 pb-16">
          <div className="w-full rounded bg-gray-100 p-3 md:p-6">
            <BookingWidget eventTypeSlug="agenda-demo" />
          </div>
        </section>
      </main>
    </>
  );
}

export default Contacto;
