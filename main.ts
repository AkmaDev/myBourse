import { initUI, getFormValues, showLoader, hideLoader, showError, hideError } from "./ui/interface";
import { fetchStock } from "./api/fetch";

import { updateChart,changeType } from "./charts/chart";

async function loadData(): Promise<void> {
  const { symbol1, symbol2, period } = getFormValues();

  if (symbol1 === symbol2) {
    showError("Please select two different stocks.");
    return;
  }

  hideError();
  showLoader();

  try {
    const [data1, data2] = await Promise.all([
      fetchStock(symbol1, period),
      fetchStock(symbol2, period),
    ]);

    console.log(`${symbol1}:`, data1);
    console.log(`${symbol2}:`, data2);

    updateChart(data1, data2);

  } catch (err) {
    const msg = err instanceof Error ? err.message : "An error occurred.";
    showError(`Error: ${msg}`);
    console.error(err);
  } finally {
    hideLoader();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  document.getElementById("btn-show")?.addEventListener("click", loadData);
  const selectType = document.getElementById("select-chart-type") as HTMLSelectElement;
  
  selectType?.addEventListener("change", (event) => {
    const newType = (event.target as HTMLSelectElement).value as any;
    
    changeType(newType);
  });
});
