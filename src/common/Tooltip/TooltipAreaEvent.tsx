import type {
  ChartDataTypes,
  ChartInternalShallowDataShape
} from '@/common/data';

export interface TooltipAreaEvent {
  visible: boolean;
  nativeEvent: any;
  value?:
    | ChartDataTypes
    | Array<ChartDataTypes | ChartInternalShallowDataShape>;
  pointY?: number;
  pointX?: number;
  offsetX?: number;
  offsetY?: number;
}
