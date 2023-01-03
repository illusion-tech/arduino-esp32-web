import { createRef } from "preact";
import { useEffect, useState } from "preact/hooks";
import { IDeviceChart } from "../interface/chart-data.interface.ts";
import { getAreaChartOption, transDataSetToSeries } from "../tools/charts.ts";

export default function Chart(props: { data: IDeviceChart }) {
  const [chartData, setData] = useState<IDeviceChart>(props.data);

  const [chart, setChart] = useState<any>(null);
  const chartRef = createRef();

  if (chart) {
    const series = transDataSetToSeries(chartData);
    chart.updateSeries(series);
  }

  useEffect(() => {
    import("apexcharts").then((module: any) =>  {
      const ApexCharts = module.default;
      const chartOption = getAreaChartOption();
      const apexChart = new ApexCharts(chartRef.current, chartOption);
      apexChart.render();
      setChart(apexChart);
    });
  }, []);

  return (
    <div ref={chartRef}></div>
  );
}
