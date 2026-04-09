import Chart from 'chart.js/auto';
import type { StockData } from '../models/types';

let myChart: Chart | null = null;

let currentChartType: any = 'line';
let lastData1: StockData[] = [];
let lastData2: StockData[] = [];

export function drawChart(data1: StockData[], data2: StockData[]): void {
  lastData1 = data1;
  lastData2 = data2;

  const container = document.getElementById("chart-container");
  if (!container) return;

  container.innerHTML = '<canvas id="myCanvas"></canvas>';
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

  if (myChart) {
    myChart.destroy();
  }

  const labels = data1.map(d => d.date);
  const isRadial = currentChartType === 'pie' || currentChartType === 'doughnut' || currentChartType === 'radar';

  myChart = new Chart(canvas, {
    type: currentChartType,
    data: {
      labels: labels,
      datasets: [
        {
          label: data1.length > 0 ? data1[0].symbol : 'Action 1',
          data: data1.map(d => d.price),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: data2.length > 0 ? data2[0].symbol : 'Action 2',
          data: data2.map(d => d.price),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: isRadial ? {} : { y: { beginAtZero: false } }
    }
  });
}

export function updateChart(data1: StockData[], data2: StockData[]): void {
  lastData1 = data1;
  lastData2 = data2;

  if (!myChart) {
    drawChart(data1, data2);
    return;
  }
  
  myChart.data.labels = data1.map(d => d.date);
  
  myChart.data.datasets[0].data = data1.map(d => d.price);
  myChart.data.datasets[0].label = data1.length > 0 ? data1[0].symbol : 'Action 1';
  
  myChart.data.datasets[1].data = data2.map(d => d.price);
  myChart.data.datasets[1].label = data2.length > 0 ? data2[0].symbol : 'Action 2';
  
  myChart.update();
}

export function changeType(type: "line" | "bar" | "radar"): void {
  currentChartType = type;
  
  if (lastData1.length > 0) {
    drawChart(lastData1, lastData2);
  }
}

export function exportAsImage(): void {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    if (canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = 'mon-graphique.png';
        link.href = url;
        link.click();
    }
}