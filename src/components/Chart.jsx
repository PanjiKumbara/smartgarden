import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map(item => new Date(item.timestamp).toLocaleString()), // Format waktu agar lebih mudah dibaca
    datasets: [
      {
        label: 'Soil Moisture (%)',
        data: data.map(item => item.soil_moisture),
        borderColor: '#388e3c', // Hijau daun
        backgroundColor: 'rgba(56, 142, 60, 0.2)', // Hijau transparan
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Humidity (%)',
        data: data.map(item => item.humidity),
        borderColor: '#00897b', // Hijau kebiruan
        backgroundColor: 'rgba(0, 137, 123, 0.2)', // Hijau kebiruan transparan
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Temperature (°C)',
        data: data.map(item => item.temperature),
        borderColor: '#ff9e00', // Oranye tanjung
        backgroundColor: 'rgba(255, 158, 0, 0.2)', // Oranye transparan
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Grafik Data Sensor Smart Garden',
        font: {
          size: 18,
        },
        color: '#2e7d32', // Hijau gelap
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#2e7d32', // Hijau gelap untuk label
          boxWidth: 20,
        },
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#333',
        borderColor: '#2e7d32', // Hijau gelap border
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
          autoSkip: true,
          maxTicksLimit: 20,
        },
        grid: {
          color: '#e0e0e0', // Warna grid abu-abu lembut
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#666',
        },
        grid: {
          color: '#e0e0e0', // Warna grid abu-abu lembut
        },
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
