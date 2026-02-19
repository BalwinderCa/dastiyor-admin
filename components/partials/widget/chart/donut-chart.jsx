import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";

const DonutChart = ({ height = 113, series = [70, 30], labels = ["Complete", "Left"] }) => {
  const [isDark] = useDarkMode();
  const chartTextColor = isDark ? "#f8fafc" : "#475569";

  function colorOpacity(color, opacity) {
    // coerce values so ti is between 0 and 1.
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  const options = {
    labels: labels,
    dataLabels: {
      enabled: false,
    },

    colors: [colors.info, colorOpacity(colors.info, 0.16)],
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontFamily: "Inter",
      fontWeight: 400,
      show: false,
    },

    plotOptions: {
      pie: {
        donut: {
          size: "40%",
          labels: {
            show: true,
            name: {
              show: false,
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Inter",
              color: chartTextColor,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "Inter",
              color: chartTextColor,
              formatter(val) {
                // eslint-disable-next-line radix
                return `${parseInt(val)}`;
              },
            },
            total: {
              show: true,
              fontSize: "10px",
              fontWeight: 600,
              label: "",
              color: chartTextColor,
              formatter() {
                return series.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="pie" height={height} width="100%" />
    </div>
  );
};

export default DonutChart;
