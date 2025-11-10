import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import getErrorMessage from "./helpers/getErrorMessage";
import HomePage from "./pages/Home";
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            coins={coins}
            loading={loading}
            error={error}
            limit={limit}
            setLimit={setLimit}
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        }
      />
    </Routes>
  );
}

export default App;
