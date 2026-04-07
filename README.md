# MyBourse

Application web de visualisation de cours boursiers — Projet fin de module TS/JS.

## Installation

```bash
npm install
npm run dev
```

Ouvrir http://localhost:5173

## Structure du projet

```
myBourse/
├── models/types.ts       # interfaces partagées (StockAPI, StockData, Period...)
├── api/
│   ├── mockData.ts       # données en dur pour travailler sans l'API (P1)
│   └── fetch.ts          # fetchStock() — stub à remplacer par P1
├── ui/interface.ts       # tout le DOM : selects, bouton, loader, erreurs (P3)
├── main.ts               # orchestration : fetch + graphique + events
└── index.html
```

## Répartition

**P1 — fetch & API**
Remplacer le corps de `fetchStock()` dans `api/fetch.ts`. La signature ne doit pas changer :
```ts
export async function fetchStock(symbol: string, period: Period): Promise<StockData[]>
```

**P2 — graphique**
Importer `MOCK_DATA` depuis `api/mockData.ts` pour tester sans attendre P1.
Créer un fichier `charts/chart.ts` qui exporte au minimum `drawChart(data1, data2)`.
Ensuite décommenter le bloc `TODO (P2)` dans `main.ts`.

**P3 — UI/DOM** ✓
- `models/types.ts` — interfaces TypeScript
- `api/mockData.ts` — données de test
- `api/fetch.ts` — stub
- `ui/interface.ts` — interface DOM complète
- `main.ts` — orchestration
- `index.html` — structure + CSS

## Interfaces importantes

```ts
// Données que fetchStock() doit retourner (P1)
interface StockData {
  date: string;
  price: number;
  volume: number;
  symbol: string;
}

// Contrat que le graphique de P2 doit respecter
interface ChartService {
  draw(data1: StockData[], data2: StockData[]): void;
  update(data1: StockData[], data2: StockData[]): void;
  changeType(type: "line" | "bar"): void;
}

type Period = "1W" | "1M" | "1Y";
```
