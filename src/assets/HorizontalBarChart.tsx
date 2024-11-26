import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface HorizontalBarChartProps {
  total: number; // Total de tareas o progreso (ejemplo: 100)
  completed: number; // Tareas completadas o progreso alcanzado (ejemplo: 56)
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ total, completed }) => {
  const pending = total - completed; // Calculamos los pendientes dinámicamente
//   background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  
  const data = {
    labels: ["Progreso"],
    datasets: [
      {
        label: "Práctico",
        data: [completed],
        backgroundColor: "#63E938",
        borderRadius: 20,

      },
      {
        label: "Teórico",
        data: [pending],
        backgroundColor: "#D2CD2C",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        // text: "Progreso de tareas",
      },
    },
    scales: {
      x: {
        stacked: true,
        max: total, // Máximo dinámico basado en el total
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};