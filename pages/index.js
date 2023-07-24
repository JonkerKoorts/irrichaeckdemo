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
import Link from "next/link";
import Rotate from "./components/rotate";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [chartData, setChartData] = useState(null);
  const [isPortrait, setIsPortrait] = useState(null);

  const labelMapping = {
    T1: "100mm",
    T2: "200mm",
    T3: "300mm",
    T4: "400mm",
    T5: "600mm",
    T6: "800mm",
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const data = await response.json();
      return data;
    };

    fetchData().then((data) => setChartData(data));

    if (typeof window !== "undefined") {
      import("hammerjs");
      import("chartjs-plugin-zoom").then((zoomPlugin) => {
        ChartJS.register(
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement,
          Title,
          Tooltip,
          Filler,
          Legend,
          zoomPlugin.default
        );
      });
    }

    const setOrientationData = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };

    window.addEventListener("resize", setOrientationData);
    setOrientationData();

    return () => window.removeEventListener("resize", setOrientationData);
  }, []);

  if (!chartData) {
    return <Loading />;
  }

  if (isPortrait) {
    return (
      <div className="flex justify-between content-center items-center">
        <Rotate />
        <p className="flex justify-center h-screen content-center items-center">
          Please switch your device to landscape mode
        </p>
      </div>
    );
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
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
          speed: 20,
          threshold: 10,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
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

  return (
    <main
      className={`w-[80%] h-[80%] mx-auto m-10 sm:px-0 flex flex-row lg:flex-row items-center justify-between ${inter.className}`}
    >
      <Line
        options={options}
        data={{
          labels: labels,
          datasets: datasets,
        }}
      />
      <Link
        className="absolute top-5 right-5 px-4 py-2 text-xs font-base text-center text-white bg-indigo-600 rounded focus:outline-none"
        href="https://github.com/JonkerKoorts/irrichaeckdemo"
      >
        Checkout Github
      </Link>
    </main>
  );
};

export default Home;
