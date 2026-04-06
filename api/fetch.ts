// fetch.ts — stub, P1 remplace le corps de fetchStock() par le vrai appel API

import type { StockData, Period, StockAPI } from "../models/types";
import { MOCK_DATA } from "./mockData";

function convertData(stock: StockAPI): StockData[] {
  return stock.history.map((point) => ({
    date: point.date,
    price: point.price,
    volume: point.volume,
    symbol: stock.symbol,
  }));
}

function filterByPeriod(data: StockData[], period: Period): StockData[] {
  const now = new Date("2026-03-14");
  const limits: Record<Period, number> = { "1W": 7, "1M": 30, "1Y": 365 };
  const maxDays = limits[period];

  return data.filter((d) => {
    const diff = (now.getTime() - new Date(d.date).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= maxDays;
  });
}

export async function fetchStock(symbol: string, period: Period): Promise<StockData[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const stock = MOCK_DATA.find((s) => s.symbol === symbol);
  if (!stock) throw new Error(`Unknown stock: ${symbol}`);

  return filterByPeriod(convertData(stock), period);
}
