import CoinCard from "../components/CoinCard";
import FilterInput from "../components/FilterInput";
import LimitSelector from "../components/LimitSelector";
import SortSelector from "../components/SortSelector";
import Spinner from "../components/Spinner";
import type { Coin } from "../types";

type HomePageProps = {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  limit: number;
  setLimit: (v: number) => void;
  filter: string;
  setFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
};

const HomePage = ({
  coins,
  loading,
  error,
  limit,
  setLimit,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}: HomePageProps) => {
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

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sort={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && <Spinner loading={loading} color="white" />}
      {error && <div className="error">{error}</div>}
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
};

export default HomePage;
