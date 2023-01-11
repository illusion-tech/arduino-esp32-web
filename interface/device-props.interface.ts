export type Props = Record<string, number>;

/** 设备属性 */
export interface IDeviceProps extends Props {
  /** 当前电压 */
  voltage: number;
  /** 充电电流 */
  chargeCurrent: number;
  /** 放电电流 */
  dischargeCurrent: number;
}
