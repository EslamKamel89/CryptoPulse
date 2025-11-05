import { useEffect, useState } from "react";
import getErrorMessage from "./helpers/getErrorMessage";
import type { Coin } from "./types";
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, { method: "GET" });
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
      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <div className="coin-card" key={`coin-${coin.id}`}>
              <div className="coin-header">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div>
                  <h2>{coin.name}</h2>
                  <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p>Price: {coin.current_price}</p>
              <p
                className={
                  coin.price_change_percentage_24h > 0 ? "positive" : "negative"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
            </div>
          ))}
        </main>
      )}
    </>
  );
}

export default App;
