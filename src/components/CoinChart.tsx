import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import getErrorMessage from "../helpers/getErrorMessage";
import type { Prices } from "../types";
// import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LinearScale,
  TimeScale
);
type CoinChartProps = {
  coinId: string;
};
type ChartData = {
  datasets: {
    label: string;
    data: { x: number; y: number }[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
    pointRadius: number;
    tension: number;
  }[];
};
const API_URL = import.meta.env.VITE_COIN_API_URL + "";
const CoinChart = ({ coinId }: CoinChartProps) => {
  const [chartData, setChartData] = useState<ChartData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchData();
  }, [coinId]);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      if (!res.ok) throw new Error("Something went wrong");
      const json = (await res.json()) as Prices;
      const formattedPrices = json.prices.map((p) => ({
        x: p[0],
        y: p[1],
      }));
      setChartData({
        datasets: [
          {
            label: "Price (USD)",
            data: formattedPrices,
            fill: true,
            borderColor: "#007bff",
            backgroundColor: "rgba(0,123,255,0.1)",
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  return <div>Chart</div>;
};

export default CoinChart;
