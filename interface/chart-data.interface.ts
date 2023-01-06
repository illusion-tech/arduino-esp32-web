import { IDeviceProps } from "./device-props.interface.ts";
import type { Props } from "./device-props.interface.ts";

export type DataSet = {
  labels: number[];
  data: Props[];
}

export interface IDeviceChart {
  /** 横坐标数据集 */
  labels: number[];
  /** 纵坐标数据集 */
  data: IDeviceProps[];
}
