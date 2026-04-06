export interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

export interface StockAPI {
  symbol: string;
  name: string;
  sector: string;
  currentPrice: number;
  currency: string;
  history: PricePoint[];
}

export interface StockData {
  date: string;
  price: number;
  volume: number;
  symbol: string;
}

export type Period = "1W" | "1M" | "1Y";

export interface ChartService {
  draw(data1: StockData[], data2: StockData[]): void;
  update(data1: StockData[], data2: StockData[]): void;
  changeType(type: "line" | "bar"): void;
}
