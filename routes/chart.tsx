import { Handlers } from "$fresh/server.ts";
import { renderChart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export const handler: Handlers = {
  GET(req, cxt) {
    const url = new URL(req.url);
    const temps = url.searchParams.get("temps") || "[]";
    const hums = url.searchParams.get("hums") || "[]";
    const labels = url.searchParams.get("labels") || "[]";

    return renderChart({
      type: "line",
      data: {
        labels: JSON.parse(labels),
        datasets: [{
          label: "温度",
          data: JSON.parse(temps),
          borderColor: ChartColors.Green,
          backgroundColor: transparentize(ChartColors.Green, 0.5),
          borderWidth: 1,
          yAxisID: "temperature",
        }, {
          label: "湿度",
          data: JSON.parse(hums),
          borderColor: ChartColors.Blue,
          backgroundColor: transparentize(ChartColors.Blue, 0.5),
          borderWidth: 1,
          yAxisID: "humidity",
        }],
      },
      options: {
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          temperature: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "温度 (℃)",
              align: "end",
            },
          },
          humidity: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "湿度 (%)",
              align: "end",
            },
          },
        },
      },
    });
  },
};
