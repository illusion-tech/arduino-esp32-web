import { createRef } from "preact";
import { useEffect } from "preact/hooks";
import { Charts } from "../tools/charts.ts";

export default function Chart(props: any) {
  let chart: any;
  const chartRef = createRef();

  useEffect(() => {
    import("apexcharts").then((module: any) =>  {
      const ApexCharts = module.default;
      const chartOption = new Charts().getAreaChartOption();
      chart = new ApexCharts(chartRef.current, chartOption);
      chart.render();
    });
  }, []);

  return (
    <div ref={chartRef}></div>
  )
}
