import { useState, useEffect } from "preact/hooks";
import { DeviceProps } from "../interface/device-props.ts";
import { ChartData } from "../interface/chart-data.ts";
import Chart from "../components/Chart.tsx";

const endpoint = "http://localhost:8000";
const projectId = "f6ec7524bd17497fafc9fa1ff8fdd8da";
const deviceId = "63a8fee2c4efcc747bd6ee06_dht11";

export default function Device() {
  const keyAndSecretExist = (): boolean => {
    return !!(localStorage.getItem("key") && localStorage.getItem("secret"));
  };

  if (!keyAndSecretExist()) {
    const [key, setKey] = useState("");
    const [secret, setSecret] = useState("");

    const confirm = () => {
      if (key && secret) {
        localStorage.setItem("key", key);
        localStorage.setItem("secret", secret);
        window.location.reload();
      }
    };
    return (
      <section className="p-10">
        <h3 className="text-base font-semibold text-gray-900 mb-6">请输入密钥</h3>
        <div className="w-96">
          <input
            name="key"
            type="text"
            required
            className="relative block w-full appearance-none rounded-md border border-gray-300 mb-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.currentTarget.value)}
          />
          <input
            name="secret"
            type="text"
            required
            className="relative block w-full appearance-none rounded-md border border-gray-300 mb-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Secret"
            value={secret}
            onChange={(e) => setSecret(e.currentTarget.value)}
          />
          <button
            onClick={confirm}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            确定
          </button>
        </div>
      </section>
    );
  }

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  // 图表数据集
  const chartData: ChartData = {
    labels: [],
    temps: [],
    hums: [],
  };
  const [chartUrl, setChartUrl] = useState("");

  const stringify = (value: any) => {
    return JSON.stringify(value);
  };

  // 更新图表数据
  const updateDataSet = () => {
    chartData.temps.push(temperature);
    chartData.hums.push(humidity);
    chartData.labels.push("");

    const searchParams =
      `labels=${stringify(chartData.labels)}&temps=${stringify(chartData.temps)}&hums=${stringify(chartData.hums)}`;
    setChartUrl(`/chart?${searchParams}`);
  };

  const setProperties = async () => {
    try {
      const resp = await fetch(`${endpoint}/api/iot/${projectId}/devices/${deviceId}/properties`);
      const deviceProps: DeviceProps = await resp.json();

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
          <span className="font-sans font-semibold text-gray-700 text-2xl">{temperature} ℃</span>
        </li>
        <li className="w-40 h-24 p-6 rounded-lg bg-gray-100 ring-1 ring-gray-200">
          <h2 className="text-xs font-medium text-gray-500 mb-1">湿度</h2>
          <span className="font-sans font-semibold text-gray-700 text-2xl">{humidity} %</span>
        </li>
      </ul>
      <div class="p-4 mx-auto max-w-screen-md">
        <Chart url={chartUrl}/>
      </div>
    </section>
  );
}
