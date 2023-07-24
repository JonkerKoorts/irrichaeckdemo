import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Inter } from "next/font/google";
import Loading from "./components/loading";

const inter = Inter({ subsets: ["latin"] });

const fetchData = async () => {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "IrriCheck Data",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(0, 0, 0, 0)",
      },
    },
    y: {
      grid: {
        color: "rgba(0, 0, 0, 0)",
      },
    },
  },
};

const Home = () => {
  const [chartData, setChartData] = useState(null);

  const labelMapping = {
    T1: "100mm",
    T2: "200mm",
    T3: "300mm",
    T4: "400mm",
    T5: "600mm",
    T6: "800mm",
  };

  useEffect(() => {
    fetchData().then((data) => setChartData(data));
  }, []);

  if (!chartData) {
    return <Loading />;
  }

  const originalLabels = Object.keys(chartData.data);
  const labels = originalLabels.map((label) => labelMapping[label] || label);

  const datasets = Object.keys(chartData.options.color).map((key) => ({
    label: labelMapping[key] || key,
    data: originalLabels.map((label) => chartData.data[label][key]),
    borderColor: chartData.options.color[key],
    fill: false,
    borderWidth: 1.5,
    pointRadius: 1,
  }));

  // console.log("Transformed Labels: ", labels);
  // console.log("Generated Datasets: ", datasets);

  return (
    <main
      className={`container w-[80%] h-screen mx-auto m-10 sm:px-0 flex flex-col lg:flex-row items-center justify-between ${inter.className}`}
    >
      <Line
        options={options}
        data={{
          labels: labels,
          datasets: datasets,
        }}
      />
    </main>
  );
};

export default Home;
