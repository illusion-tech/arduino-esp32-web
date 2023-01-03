import { useEffect, useState } from "preact/hooks";
import { IDeviceProps } from "../interface/device-props.interface.ts";
import { IDeviceChart } from "../interface/chart-data.interface.ts";
import Chart from "../components/chart.tsx";

const endpoint = "http://localhost:8000";
const projectId = "f6ec7524bd17497fafc9fa1ff8fdd8da";
const deviceId = "63a8fee2c4efcc747bd6ee06_dht11";
const serviceId = "Dev_data";

export default function Device() {
  const [deviceProps, setProps] = useState<IDeviceProps>({
    Temperature: 0,
    Humidity: 0,
  });

  // 图表数据集
  const chartData: IDeviceChart = {
    labels: [],
    data: [],
  };

  // 更新图表数据
  const updateDataSet = (props: IDeviceProps) => {
    chartData.data.push(props);
    chartData.labels.push(new Date().getTime());
  };

  const setProperties = async () => {
    try {
      const resp = await fetch(
        `${endpoint}/api/iot/${projectId}/devices/${deviceId}/properties?service_id=${serviceId}`,
      );
      const deviceProps: IDeviceProps = (await resp.json()).response.services[0].properties;

      setProps(deviceProps);
      updateDataSet(deviceProps);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProperties();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="p-10">
      <h3 className="text-base font-semibold text-gray-900 mb-6">设备属性</h3>
      <ul className="flex gap-4">
        <li className="w-40 h-24 p-6 rounded-lg bg-gray-100 ring-1 ring-gray-200">
          <h2 className="text-xs font-medium text-gray-500 mb-1">温度</h2>
          <span className="font-sans font-semibold text-gray-700 text-2xl">
            {deviceProps.Temperature} ℃
          </span>
        </li>
        <li className="w-40 h-24 p-6 rounded-lg bg-gray-100 ring-1 ring-gray-200">
          <h2 className="text-xs font-medium text-gray-500 mb-1">湿度</h2>
          <span className="font-sans font-semibold text-gray-700 text-2xl">
            {deviceProps.Humidity} %
          </span>
        </li>
      </ul>
      <div className="h-80 mt-4 mx-auto max-w-screen-md bg-gray-100 rounded-2xl overflow-hidden ring-1 ring-gray-200">
        <Chart data={chartData}/>
      </div>
    </section>
  );
}
