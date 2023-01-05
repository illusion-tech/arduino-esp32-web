import { ApexOptions } from "apexcharts";

type ApexChartSeries = NonNullable<ApexOptions["series"]>;
type Props = Record<string, string | number>;

interface DataSet {
  labels: number[];
  data: Props[];
}

/**
 * 数据转换
 * @returns ApexAxisChartSeries
 */
export const convertDataSetToSeries = (dataSet: DataSet): ApexChartSeries => {
  if (dataSet.data.length === 0) return [];

  const keys = Object.keys(dataSet.data[0]);
  const series: ApexChartSeries = keys.map((key) => {
    return { name: key, data: [] };
  });

  dataSet.data.forEach((props, i) => {
    keys.forEach((key) => {
      series.find((_) => _.name === key)!.data.push({
        x: dataSet.labels[i],
        y: props[key],
      });
    });
  });

  return series;
}

export const getAreaChartOption = (): ApexOptions => {
  return {
    chart: {
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
    series: [],
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
        formatter: (value) => {
          return new Date(value + 3600 * 8).toLocaleString();
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      labels: {
        offsetY: -22,
        offsetX: 20,
        rotate: 0,
        style: {
          colors: "#64748B",
        },
        formatter: (_value: string, timestamp: number) => {
          return new Date(timestamp + 3600 * 8).toLocaleTimeString().slice(0, 5);
        },
      },
      tooltip: {
        enabled: false,
      },
      tickAmount: 6,
      tickPlacement: "between",
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
      min: 0,
    },
  };
}
