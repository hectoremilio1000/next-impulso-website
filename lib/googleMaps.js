// /lib/googleMaps.js
let mapsLoadPromise = null;

export function loadGoogleMaps() {
  if (mapsLoadPromise) return mapsLoadPromise;

  mapsLoadPromise = new Promise((resolve, reject) => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!key) {
      reject(new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no está configurada."));
      return;
    }

    if (typeof window !== "undefined" && window.google?.maps) {
      resolve(window.google);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&language=es`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Error al cargar Google Maps."));
    document.head.appendChild(script);
  });

  return mapsLoadPromise;
}
