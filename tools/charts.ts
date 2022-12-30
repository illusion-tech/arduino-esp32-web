import { ApexOptions } from "apexcharts";

export class Charts {
  constructor() {}

  getAreaChartOption(): ApexOptions {
    return {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: "inherit",
        foreColor: "inherit",
        height: "100%",
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      series: [
        {
          name: "Temperature",
          data: [
            { x: "0", y: 20 },
            { x: "1", y: 21 },
            { x: "2", y: 22 },
            { x: "3", y: 20 },
            { x: "4", y: 21 },
            { x: "5", y: 20 },
          ],
        },
        {
          name: "Humidity",
          data: [
            { x: "0", y: 10 },
            { x: "1", y: 8 },
            { x: "2", y: 8 },
            { x: "3", y: 4 },
            { x: "4", y: 7 },
            { x: "5", y: 9 },
          ],
        }
      ],
      colors: ["#64748B", "#94A3B8"],
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: ["#64748B", "#94A3B8"],
        opacity: 0.5,
      },
      grid: {
        show: false,
        padding: {
          bottom: -40,
          left: 0,
          right: 0,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      tooltip: {
        followCursor: true,
        theme: "dark",
        x: {
          format: "MMM dd, yyyy",
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        labels: {
          offsetY: -20,
          rotate: 0,
          style: {
            colors: "#64748B",
          },
        },
        tickAmount: 3,
        tooltip: {
          enabled: false,
        },
        type: "datetime",
      },
      yaxis: {
        labels: {
          style: {
            colors: "#64748B",
          },
        },
        show: false,
        tickAmount: 5,
      },
    };
  }
}
