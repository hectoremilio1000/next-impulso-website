import { useEffect, useRef, useState } from "react";
import { autocompleteRestaurants } from "../../lib/restaurantReportApi";

const DEBOUNCE_MS = 350;

export default function SearchInput({ onSelect, disabled }) {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);
  const skipNextSearchRef = useRef(false);

  const runSearch = async (value) => {
    const trimmed = value.trim();

    if (trimmed.length < 3) {
      setPredictions([]);
      setOpen(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const results = await autocompleteRestaurants(trimmed);
      setPredictions(results);
      setOpen(true);
    } catch (err) {
      console.error("Error buscando restaurantes:", err);
      setError(
        "No pudimos buscar tu restaurante en este momento. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    if (query.trim().length < 3) {
      setPredictions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => runSearch(query), DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (prediction) => {
    skipNextSearchRef.current = true;
    setQuery(prediction.description);
    setPredictions([]);
    setOpen(false);
    onSelect(prediction);
  };

  const handleButtonClick = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    runSearch(query);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-2 pl-6 pr-2 transition-colors focus-within:border-principal">
        <input
          type="text"
          value={query}
          disabled={disabled}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => predictions.length > 0 && setOpen(true)}
          placeholder="Escribe el nombre de tu restaurante"
          className="w-full bg-transparent py-2 text-base text-white placeholder-white/40 outline-none disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled || loading}
          className="flex flex-none items-center justify-center gap-1.5 rounded-full bg-principal px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black" />
          ) : (
            "Prueba cómo lo hacemos"
          )}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      {open && predictions.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(0,0,0,.25)] ring-1 ring-black/10">
          {predictions.map((prediction) => (
            <li key={prediction.place_id}>
              <button
                type="button"
                onClick={() => handleSelect(prediction)}
                className="w-full px-5 py-3 text-left text-sm text-gray-800 hover:bg-gray-50"
              >
                {prediction.description}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
