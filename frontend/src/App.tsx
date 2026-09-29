import { useState } from "react";
import "./App.css";

type Result = { cityNames: Array<string>; count: number; prefix: string };

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/cities/count?prefix=${encodeURIComponent(query)}`,
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);

        throw new Error(body?.error?.message ?? `Request failed`);
      }

      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");

      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="center">
        <div>
          <h1>GeoNames City Counter</h1>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a letter..."
        />
        <button
          type="button"
          className="counter"
          onClick={handleSearch}
          disabled={loading || !query.trim()}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </section>
      {error && (
        <section id="center">
          <p style={{ color: "red" }}>{error}</p>
        </section>
      )}
      {data && (
        <section id="center">
          <div>
            <p>
              Number of cities: {data.count} (starting with "{data.prefix}")
            </p>
            <ul>
              {data.cityNames.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
