import { IDeviceChart } from "@interface/chart-data.interface.ts";
import { IDeviceProps } from "@interface/device-props.interface.ts";
import { useEffect, useState } from "preact/hooks";
import Chart from "../components/chart.tsx";

// 设备 ID
const deviceId = "63b687c5b7768d66eb705b98_0001";
// 服务 ID
const serviceId = "service01";

const apiEndpoint = "http://localhost:8000";

export default function Device() {
  const [deviceProps, setProps] = useState<IDeviceProps>({
    voltage: 0,
    chargeCurrent: 0,
    dischargeCurrent: 0,
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
        `${apiEndpoint}/api/iot/devices/${deviceId}/properties?service_id=${serviceId}`,
      );
      const { properties } = (await resp.json()).response.services[0];
      const deviceProps: IDeviceProps = {
        voltage: properties.voltage,
        chargeCurrent: properties.charge_current,
        dischargeCurrent: properties.discharge_current,
      };
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
    <section className="h-screen w-full p-10 bg-gray-100">
      <div className="mx-auto rounded-2xl overflow-hidden bg-white ring-1 ring-gray-200">
        <h3 className="text-base text-gray-900 p-6 pb-0">设备实时属性</h3>
        <ul className="flex gap-4">
          <li className="w-40 h-20 p-6 rounded-lg">
            <h2 className="text-xs font-medium text-gray-500 mb-1">当前电压</h2>
            <span className="font-sans font-semibold text-gray-700 text-4xl">
              {deviceProps.voltage} V
            </span>
          </li>
          <li className="w-40 h-20 p-6 rounded-lg">
            <h2 className="text-xs font-medium text-gray-500 mb-1">充电电流</h2>
            <span className="font-sans font-semibold text-gray-700 text-4xl">
              {deviceProps.chargeCurrent} A
            </span>
          </li>
          <li className="w-40 h-20 p-6 rounded-lg">
            <h2 className="text-xs font-medium text-gray-500 mb-1">放电电流</h2>
            <span className="font-sans font-semibold text-gray-700 text-4xl">
              {deviceProps.dischargeCurrent} A
            </span>
          </li>
        </ul>
        <div className="h-80 mt-4 w-full">
          <Chart data={chartData}/>
        </div>
      </div>
    </section>
  );
}
