import { initUI, getFormValues, showLoader, hideLoader, showError, hideError } from "./ui/interface";
import { fetchStock } from "./api/fetch";

// TODO (P2): import { drawChart, updateChart } from "./charts/chart";

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

    // TODO (P2): plug the chart here
    // drawChart(data1, data2);

    const container = document.getElementById("chart-container");
    if (container) {
      container.textContent = `${data1.length} points for ${symbol1}, ${data2.length} for ${symbol2}`;
    }
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
});
