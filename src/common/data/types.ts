// eslint-disable-next-line no-undef
export type ChartDataTypes = ChartInternalDataTypes | bigInt.BigInteger;

export type ChartInternalDataTypes = number | string | Date;

export interface BaseChartDataShape<T> {
  key: ChartDataTypes;
  data: T;
  metadata?: any;
  id?: string;
}

export type ChartNestedDataShape = BaseChartDataShape<
  ChartShallowDataShape<ChartDataTypes>[]
>;

export type ChartShallowDataShape<
  T = ChartDataTypes | [ChartDataTypes, ChartDataTypes]
> = BaseChartDataShape<T>;

export type ChartDataShape = ChartNestedDataShape | ChartShallowDataShape;

export interface ChartInternalNestedDataShape {
  key: ChartInternalDataTypes;
  data: ChartInternalShallowDataShape[];
  metadata?: any;
  id?: string;
}

export interface ChartInternalShallowDataShape {
  id?: string;
  key?: ChartInternalDataTypes;
  value?: ChartInternalDataTypes;
  metadata?: any;
  x?: ChartInternalDataTypes;
  x0: ChartInternalDataTypes;
  x1?: ChartInternalDataTypes;
  y: ChartInternalDataTypes;
  y0?: ChartInternalDataTypes;
  y1: ChartInternalDataTypes;
}

export type ChartInternalDataShape =
  | ChartInternalShallowDataShape
  | ChartInternalNestedDataShape;
