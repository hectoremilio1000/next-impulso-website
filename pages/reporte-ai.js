import Head from "next/head";
import NavBar from "../components/NavBarBlack/NavBarEs";
import WhatsappButton from "../components/WhatsappButton";
import ReportSearchHero from "../components/RestaurantReport/ReportSearchHero";

export default function ReporteAI() {
  return (
    <>
      <Head>
        <title>Reporte AI gratis de tu restaurante — Impulso Restaurantero</title>
        <meta
          name="description"
          content="Descubre gratis cómo se ve tu restaurante en Google y qué te está costando en clientes."
        />
      </Head>

      <NavBar />
      <main className="w-full bg-black">
        <ReportSearchHero />
      </main>
      <WhatsappButton />
    </>
  );
}
