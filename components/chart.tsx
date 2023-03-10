import type { IDeviceChart } from "@interface/chart-data.interface.ts";
import { convertDataSetToSeries, getAreaChartOption } from "@tools/charts.ts";
import type { default as ApexCharts } from "apexcharts";
import { createRef } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function Chart(props: { data: IDeviceChart }) {
  const [chartData, setData] = useState<IDeviceChart>(props.data);

  const [chart, setChart] = useState<ApexCharts | null>(null);
  const chartRef = createRef();

  if (chart) {
    const series = convertDataSetToSeries(chartData);
    chart.updateSeries(series);
  }

  useEffect(() => {
    import("apexcharts").then((module) => {
      const ApexCharts = module.default;
      const chartOption = getAreaChartOption();
      const apexChart = new ApexCharts(chartRef.current, chartOption);
      apexChart.render();
      setChart(apexChart);
    });
  }, []);

  return <div ref={chartRef} />;
}
