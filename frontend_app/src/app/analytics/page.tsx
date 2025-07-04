"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// PUBLIC_INTERFACE
export default function AnalyticsPage() {
  // Dummy data; in a real app, fetch from Supabase for user
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [8500, 7650, 9000, 7500, 8000, 8700, 9500],
        fill: false,
        borderColor: "#1976d2",
        backgroundColor: "#1976d2"
      },
      {
        label: "Calories Intake",
        data: [2100, 2250, 2000, 2200, 2150, 2300, 2050],
        fill: false,
        borderColor: "#ffb300",
        backgroundColor: "#ffb300"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Weekly Health Overview" }
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-7">My Analytics</h2>
        <Line data={data} options={options}/>
      </div>
    </ProtectedRoute>
  );
}
