import type { Period } from "../models/types";

const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
];

const PERIODS: { value: Period; label: string }[] = [
  { value: "1W", label: "1 week" },
  { value: "1M", label: "1 month" },
  { value: "1Y", label: "1 year" },
];

function createStockSelect(id: string, labelText: string): HTMLSelectElement {
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = labelText;

  const select = document.createElement("select");
  select.id = id;

  STOCKS.forEach((s) => {
    const option = document.createElement("option");
    option.value = s.symbol;
    option.textContent = `${s.symbol} — ${s.name}`;
    select.appendChild(option);
  });

  const wrapper = document.getElementById("controls");
  if (wrapper) {
    const div = document.createElement("div");
    div.className = "field";
    div.appendChild(label);
    div.appendChild(select);
    wrapper.appendChild(div);
  }

  return select;
}

function createPeriodSelect(): HTMLSelectElement {
  const label = document.createElement("label");
  label.htmlFor = "select-period";
  label.textContent = "Period";

  const select = document.createElement("select");
  select.id = "select-period";

  PERIODS.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.value;
    option.textContent = p.label;
    select.appendChild(option);
  });

  select.value = "1M";

  const wrapper = document.getElementById("controls");
  if (wrapper) {
    const div = document.createElement("div");
    div.className = "field";
    div.appendChild(label);
    div.appendChild(select);
    wrapper.appendChild(div);
  }

  return select;
}

function createButton(): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.id = "btn-show";
  btn.textContent = "Show chart";
  btn.type = "button";

  document.getElementById("controls")?.appendChild(btn);
  return btn;
}

function createLoader(): void {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.textContent = "Loading...";
  loader.style.display = "none";
  document.getElementById("app")?.appendChild(loader);
}

function createErrorBox(): void {
  const box = document.createElement("div");
  box.id = "error-box";
  box.style.display = "none";
  document.getElementById("app")?.appendChild(box);
}

function createTypeSelect(): HTMLSelectElement {
  const label = document.createElement("label");
  label.htmlFor = "select-chart-type";
  label.textContent = "Type de graphique";

  const select = document.createElement("select");
  select.id = "select-chart-type";

  const types = [
    { value: "line", label: "Courbes" },
    { value: "bar", label: "Histogramme" },
    { value: "radar", label: "Radar" }
  ];

  types.forEach((t) => {
    const option = document.createElement("option");
    option.value = t.value;
    option.textContent = t.label;
    select.appendChild(option);
  });

  const wrapper = document.getElementById("controls");
  if (wrapper) {
    const div = document.createElement("div");
    div.className = "champ";
    div.appendChild(label);
    div.appendChild(select);
    wrapper.appendChild(div);
  }

  return select;
}


export function showLoader(): void {
  const el = document.getElementById("loader");
  if (el) el.style.display = "block";
}

export function hideLoader(): void {
  const el = document.getElementById("loader");
  if (el) el.style.display = "none";
}

export function showError(message: string): void {
  const el = document.getElementById("error-box");
  if (el) {
    el.textContent = message;
    el.style.display = "block";
  }
}

export function hideError(): void {
  const el = document.getElementById("error-box");
  if (el) {
    el.textContent = "";
    el.style.display = "none";
  }
}

export function getFormValues(): { symbol1: string; symbol2: string; period: Period } {
  const s1 = document.getElementById("select-stock1") as HTMLSelectElement;
  const s2 = document.getElementById("select-stock2") as HTMLSelectElement;
  const p = document.getElementById("select-period") as HTMLSelectElement;

  return { symbol1: s1.value, symbol2: s2.value, period: p.value as Period };
}

export function initUI(): void {
  const app = document.getElementById("app");
  if (!app) {
    console.error("#app not found");
    return;
  }

  const controls = document.createElement("div");
  controls.id = "controls";
  app.appendChild(controls);

  createStockSelect("select-stock1", "Stock 1");
  createStockSelect("select-stock2", "Stock 2");

  const s2 = document.getElementById("select-stock2") as HTMLSelectElement;
  s2.value = "TSLA";

  createPeriodSelect();
  createButton();
  createTypeSelect();
  createLoader();
  createErrorBox();
}
