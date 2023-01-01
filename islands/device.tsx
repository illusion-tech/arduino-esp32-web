import { useEffect, useState } from "preact/hooks";
import { IDeviceProps } from "../interface/device-props.interface.ts";
import { IChartData } from "../interface/chart-data.interface.ts";
import Chart from "../components/chart.tsx";

const endpoint = "http://localhost:8000";
const projectId = "f6ec7524bd17497fafc9fa1ff8fdd8da";
const deviceId = "63a8fee2c4efcc747bd6ee06_dht11";
const serviceId = "Dev_data";

export default function Device() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  // 图表数据集
  const chartData: IChartData = {
    labels: [],
    temps: [],
    hums: [],
  };

  // 更新图表数据
  const updateDataSet = () => {
    chartData.temps.push(temperature);
    chartData.hums.push(humidity);
    chartData.labels.push("");
  };

  const setProperties = async () => {
    try {
      const resp = await fetch(
        `${endpoint}/api/iot/${projectId}/devices/${deviceId}/properties?service_id=${serviceId}`,
      );
      const deviceProps: IDeviceProps = (await resp.json()).response.services[0].properties;

      setTemperature(deviceProps.Temperature);
      setHumidity(deviceProps.Humidity);
      updateDataSet();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setProperties();
    const timer = setInterval(() => {
      setProperties();
    }, 5000);
    return () => clearInterval(timer);
  }, [temperature, humidity]);

  return (
    <section className="p-10">
      <h3 className="text-base font-semibold text-gray-900 mb-6">设备属性</h3>
      <ul className="flex gap-4">
        <li className="w-40 h-24 p-6 rounded-lg bg-gray-100 ring-1 ring-gray-200">
          <h2 className="text-xs font-medium text-gray-500 mb-1">温度</h2>
          <span className="font-sans font-semibold text-gray-700 text-2xl">
            {temperature} ℃
          </span>
        </li>
        <li className="w-40 h-24 p-6 rounded-lg bg-gray-100 ring-1 ring-gray-200">
          <h2 className="text-xs font-medium text-gray-500 mb-1">湿度</h2>
          <span className="font-sans font-semibold text-gray-700 text-2xl">
            {humidity} %
          </span>
        </li>
      </ul>
      <div class="p-4 mx-auto max-w-screen-md">
        <Chart />
      </div>
    </section>
  );
}
