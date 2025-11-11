export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  localization: {
    en: string;
  };
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: MarketData;
  last_updated: string;
}

export interface MarketData {
  current_price: CurrencyValue;
  total_value_locked: number | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: number | null;
  ath: CurrencyValue;
  ath_change_percentage: CurrencyValue;
  ath_date: CurrencyDate;
  atl: CurrencyValue;
  atl_change_percentage: CurrencyValue;
  atl_date: CurrencyDate;
  market_cap: CurrencyValue;
  market_cap_rank: number;
  market_cap_fdv_ratio: number;
  total_volume: CurrencyValue;
  high_24h: CurrencyValue;
  low_24h: CurrencyValue;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: CurrencyValue;
  price_change_percentage_1h_in_currency: CurrencyValue;
  price_change_percentage_24h_in_currency: CurrencyValue;
  price_change_percentage_7d_in_currency: CurrencyValue;
  price_change_percentage_14d_in_currency: CurrencyValue;
  price_change_percentage_30d_in_currency: CurrencyValue;
  price_change_percentage_60d_in_currency: CurrencyValue;
  price_change_percentage_200d_in_currency: CurrencyValue;
  price_change_percentage_1y_in_currency: CurrencyValue;
  market_cap_change_24h_in_currency: CurrencyValue;
  market_cap_change_percentage_24h_in_currency: CurrencyValue;
  total_supply: number;
  max_supply: number;
  max_supply_infinite: boolean;
  circulating_supply: number;
  last_updated: string;
}

export interface CurrencyValue {
  usd: number;
}

export interface CurrencyDate {
  usd: string;
}
