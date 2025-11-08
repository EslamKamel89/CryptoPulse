import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
import getErrorMessage from "./helpers/getErrorMessage";
import type { Coin } from "./types";
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
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
  return (
    <>
      <div>🚀 Crypto Pulse </div>
      {loading && <div>Loading.......</div>}
      {error && <div className="error">{error}</div>}
      <div className="controls">
        <label htmlFor="limit">Show: </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
      </div>
      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard coin={coin} key={`coin-${coin.id}`} />
          ))}
        </main>
      )}
    </>
  );
}

export default App;
