import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
import FilterInput from "./components/FilterInput";
import LimitSelector from "./components/LimitSelector";
import SortSelector from "./components/SortSelector";
import getErrorMessage from "./helpers/getErrorMessage";
import type { Coin } from "./types";
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("market_cap_desc");
  useEffect(() => {
    fetchData();
  }, [limit]);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`,
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
  const filteredCoins = coins
    .filter(
      (c) =>
        c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.market_cap_change_24h - a.market_cap_change_24h;
        case "change_asc":
          return a.market_cap_change_24h - b.market_cap_change_24h;
        default:
          return 1;
      }
    });
  return (
    <>
      <div>🚀 Crypto Pulse </div>
      {loading && <div>Loading.......</div>}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sort={sortBy} onSortChange={setSortBy} />
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
