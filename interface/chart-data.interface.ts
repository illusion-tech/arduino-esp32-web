import { IDeviceProps } from "./device-props.interface.ts";

export interface IDeviceChart {
  /** 横坐标数据集 */
  labels: number[];
  /** 纵坐标数据集 */
  data: IDeviceProps[];
}
