export type Props = Record<string, number>;

/** 设备属性 */
export interface IDeviceProps extends Props {
  /** 温度 */
  Temperature: number;
  /** 湿度 */
  Humidity: number;
}
