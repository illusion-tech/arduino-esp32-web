import { Handlers } from "$fresh/server.ts";
import { renderChart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export const handler: Handlers = {
  GET(req, cxt) {
    const url = new URL(req.url);
    const temperature = url.searchParams.get("temperature");
    const humidity = url.searchParams.get("humidity");

    return renderChart({
      type: "line",
      data: {
        labels: ["1", "2", "3"],
        datasets: [{
          label: "温度",
          data: [123, 234, 234],
          borderColor: ChartColors.Green,
          backgroundColor: transparentize(ChartColors.Green, 0.5),
          borderWidth: 1,
        }, {
          label: "湿度",
          data: [346, 233, 123],
          borderColor: ChartColors.Blue,
          backgroundColor: transparentize(ChartColors.Blue, 0.5),
          borderWidth: 1,
        }],
      },
      options: {
        devicePixelRatio: 1,
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
      },
    });
  },
};
