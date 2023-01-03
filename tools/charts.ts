import { ApexOptions } from "apexcharts";

interface DataSet {
  labels: number[];
  data: any[];
}

/**
 * 数据转换
 * @returns ApexAxisChartSeries
 */
// TODO: 方法和类型优化
export const transDataSetToSeries = (dataSet: DataSet) => {
  if (dataSet.data.length === 0) return [];

  const keys = Object.keys(dataSet.data[0]);
  const series: any[] = keys.map((key) => {
    return { name: key, data: [] };
  });

  dataSet.data.forEach((props, i) => {
    keys.forEach((key) => {
      series.find((_: any) => _.name === key).data.push({
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
        format: "MM/dd hh:mm:ss",
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
        format: "hh:mm",
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
      min: 0,
    },
  };
}