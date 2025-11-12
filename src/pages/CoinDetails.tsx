import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CoinChart from "../components/CoinChart";
import Spinner from "../components/Spinner";
import getErrorMessage from "../helpers/getErrorMessage";
import type { CoinData } from "../types";
const API_URL = import.meta.env.VITE_COIN_API_URL;
const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch the data");
      const json = await res.json();
      setCoin(json);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="coin-details-container">
      <Link to="/">⬅️ back</Link>
      <h1 className="coin-details-title">
        {loading
          ? "Coin Details"
          : `${coin?.name} (${coin?.symbol.toUpperCase()})`}
      </h1>
      {loading && <Spinner loading={loading} color="blue" />}
      {error && <div className="error">❌ {error}</div>}
      {!loading && !error && (
        <>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            className="coin-details-image"
          />
          <p>{coin?.description.en.split(". ")[0] + "."}</p>
          <CoinChart coinId={coin?.id ?? ""} />
          <div className="coin-details-info">
            <div className="coin-details-info">
              <h3>Rank: #{coin?.market_cap_rank}</h3>

              <h3>
                Current Price: $
                {coin?.market_data?.current_price.usd.toLocaleString()}
              </h3>

              <h3>
                Market Cap: $
                {coin?.market_data?.market_cap.usd.toLocaleString()}
              </h3>

              <h3>
                24h High: ${coin?.market_data?.high_24h.usd.toLocaleString()}
              </h3>

              <h3>
                24h Low: ${coin?.market_data?.low_24h.usd.toLocaleString()}
              </h3>

              <h3>
                24h Price Change: $
                {coin?.market_data?.price_change_24h.toLocaleString()}
              </h3>

              <h3>
                24h Change (%):{" "}
                {coin?.market_data?.price_change_percentage_24h.toFixed(2)}%
              </h3>

              <h3>
                7d Change (%):{" "}
                {coin?.market_data?.price_change_percentage_7d.toFixed(2)}%
              </h3>

              <h3>
                30d Change (%):{" "}
                {coin?.market_data?.price_change_percentage_30d.toFixed(2)}%
              </h3>

              <h3>
                1y Change (%):{" "}
                {coin?.market_data?.price_change_percentage_1y.toFixed(2)}%
              </h3>

              <h3>
                All-Time High: ${coin?.market_data?.ath.usd.toLocaleString()} (
                {coin?.market_data?.ath_change_percentage.usd.toFixed(2)}%)
              </h3>

              <h3>
                All-Time Low: ${coin?.market_data?.atl.usd.toLocaleString()}
              </h3>

              <h3>
                Circulating Supply:{" "}
                {coin?.market_data?.circulating_supply.toLocaleString()}
              </h3>

              <h3>
                Total Supply:{" "}
                {coin?.market_data?.total_supply?.toLocaleString() ?? "N/A"}
              </h3>

              <h3>
                Max Supply:{" "}
                {coin?.market_data?.max_supply?.toLocaleString() ?? "N/A"}
              </h3>

              <h3>
                Sentiment Votes Up:{" "}
                {coin?.sentiment_votes_up_percentage.toFixed(1)}%
              </h3>

              <h3>
                Sentiment Votes Down:{" "}
                {coin?.sentiment_votes_down_percentage.toFixed(1)}%
              </h3>

              <h3>Genesis Date: {coin?.genesis_date}</h3>

              <h3>
                Last Updated:{" "}
                {new Date(coin?.last_updated ?? "").toLocaleString()}
              </h3>
              {coin?.categories?.length && (
                <p>Categories: {coin?.categories?.join(", ")}</p>
              )}
            </div>
            {!loading && !error && !coin && <p>No data found!</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetailsPage;
