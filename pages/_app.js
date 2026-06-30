import "../styles/main.css";
import "../styles/global.css";
import "../components/Navbar/navBar.css";
import "../components/NavbarWhite/navBarWhite.css";
import LayoutFinal from "../components/layout";

import AppContextProvider from "../components/context/Context";
import Head from "next/head";

import TagManager from "react-gtm-module";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as fbq from "../lib/fpixel";
import { GTM_ID, pageview } from "../lib/gtm";
import * as gtag from "../lib/gtag";
import { TIXTOK_PIXEL_ID } from "../lib/tikp";
import TikTokPixel from "../components/PixelTiktok/TiktokPixel";
import { initTracker, trackPageview } from "../lib/tracker";

export default function MyApp({ Component, pageProps }) {
  // console.log(TIXTOK_PIXEL_ID);

  const router = useRouter();

  // First-party tracker — registra cada visita y mantiene el lead_uid
  // Se inicializa una sola vez al montar la app
  useEffect(() => {
    initTracker({
      site: "impulso",
      debug: process.env.NODE_ENV !== "production",
    });
  }, []);

  // Pageview en cada cambio de ruta
  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageview({ event_name: "page_view", landing_page: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <AppContextProvider>
        <LayoutFinal>
          {/* <TikTokPixel pixelId={TIXTOK_PIXEL_ID} /> */}
          <Component {...pageProps} />
        </LayoutFinal>
      </AppContextProvider>
    </>
  );
}
