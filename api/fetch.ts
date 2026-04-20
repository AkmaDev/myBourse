// fetch.ts — Récupération des données de l'API REST

import type { StockData, Period, StockAPI } from "../models/types";

const API_URL = "https://keligmartin.github.io/api/stocks.json";
let cachedStocks: StockAPI[] | null = null;


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


async function getAllStocks(): Promise<StockAPI[]> {
  if (cachedStocks) {
    return cachedStocks;
  }

  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Erreur API (${response.status}): ${response.statusText}`);
    }

    const data = await response.json();

    // Validation basique
    if (!Array.isArray(data)) {
      throw new Error("Format API invalide: attendu un tableau");
    }

    // Validation des données
    data.forEach((stock, index) => {
      if (!stock.symbol || !stock.history || !Array.isArray(stock.history)) {
        throw new Error(`Données invalides pour l'action ${index}: propriétés manquantes`);
      }
    });

    cachedStocks = data;
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Erreur réseau: impossible de contacter l'API");
    }
    throw error;
  }
}

/**
 * Récupère les données d'une action pour une période donnée
 * @param symbol - Symbole de l'action (ex: "AAPL")
 * @param period - Période: "1W", "1M", "1Y"
 * @throws Error si l'action n'existe pas ou erreur API/réseau
 */
export async function fetchStock(symbol: string, period: Period): Promise<StockData[]> {
  try {
    const stocks = await getAllStocks();
    const stock = stocks.find((s) => s.symbol === symbol);

    if (!stock) {
      const availableSymbols = stocks.map((s) => s.symbol).join(", ");
      throw new Error(`Action '${symbol}' non trouvée. Disponibles: ${availableSymbols}`);
    }

    return filterByPeriod(convertData(stock), period);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erreur inconnue lors de la récupération des données");
  }
}


export async function getAvailableSymbols(): Promise<string[]> {
  try {
    const stocks = await getAllStocks();
    return stocks.map((s) => s.symbol);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erreur lors de la récupération de la liste des actions");
  }
}


export async function getStockInfo(symbol: string): Promise<Omit<StockAPI, "history">> {
  try {
    const stocks = await getAllStocks();
    const stock = stocks.find((s) => s.symbol === symbol);

    if (!stock) {
      throw new Error(`Action '${symbol}' non trouvée`);
    }

    const { history, ...info } = stock;
    return info;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erreur lors de la récupération des infos");
  }
}

// Réinitialise le cache (utile pour les tests ou forcer un refresh)

export function clearCache(): void {
  cachedStocks = null;
}
