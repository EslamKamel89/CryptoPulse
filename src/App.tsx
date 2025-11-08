import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
import FilterInput from "./components/FilterInput";
import LimitSelector from "./components/LimitSelector";
import getErrorMessage from "./helpers/getErrorMessage";
import type { Coin } from "./types";
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>("");
  useEffect(() => {
    fetchData();
  }, [limit]);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        { method: "GET" }
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = (await res.json()) as Coin[];
      setCoins(data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  const filteredCoins = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.symbol.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      <div>🚀 Crypto Pulse </div>
      {loading && <div>Loading.......</div>}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>
      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length ? (
            filteredCoins.map((coin) => (
              <CoinCard coin={coin} key={`coin-${coin.id}`} />
            ))
          ) : (
            <p>No matched data</p>
          )}
        </main>
      )}
    </>
  );
}

export default App;
