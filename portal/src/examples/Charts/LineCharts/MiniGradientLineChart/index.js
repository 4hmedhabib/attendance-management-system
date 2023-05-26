/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useRef, useEffect, useState, useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

import gradientChartLine from "assets/theme/functions/gradientChartLine";

// MiniGradientLineChart configurations
import configs from "examples/Charts/LineCharts/MiniGradientLineChart/configs";

// Argon Dashboard 2 PRO MUI base styles
import colors from "assets/theme/base/colors";

function MiniGradientLineChart({ title, description, height, chart }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  useEffect(() => {
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
          ...dataset,
          tension: 0.5,
          pointRadius: 0,
          borderWidth: 2,
          borderColor: colors[dataset.color]
            ? colors[dataset.color || "dark"].main
            : colors.dark.main,
          fill: true,
          maxBarThickness: 6,
          backgroundColor: gradientChartLine(
            chartRef.current.children[0],
            colors[dataset.color] ? colors[dataset.color || "dark"].main : colors.dark.main,
            0.02
          ),
        }))
      : [];

    setChartData(configs(chart.labels || [], chartDatasets, chart.customTick || " "));
  }, [chart]);

  const renderChart = (
    <>
      {title || description ? (
        <ArgonBox pt={1} px={2}>
          {title && (
            <ArgonTypography
              variant="button"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}
            </ArgonTypography>
          )}
          {description}
        </ArgonBox>
      ) : null}
      {useMemo(
        () => (
          <ArgonBox ref={chartRef} sx={{ height }}>
            <Line data={data} options={options} />
          </ArgonBox>
        ),
        [chartData, height]
      )}
    </>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of MiniGradientLineChart
MiniGradientLineChart.defaultProps = {
  title: "",
  description: "",
  height: "6.25rem",
};

// Typechecking props for the MiniGradientLineChart
MiniGradientLineChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
};

export default MiniGradientLineChart;
