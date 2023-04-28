import { createContext, useContext } from 'react';
import { Dimensions } from '../utils';
import { LinearAxisDimensionChanged } from '../Axis';

export interface ChartContextProps extends Dimensions {
  id: string;
  chartSized?: boolean;
  yAxisSized?: boolean;
  xAxisSized?: boolean;
  updateAxes: (
    orientation: 'horizontal' | 'vertical',
    event: LinearAxisDimensionChanged
  ) => void;
}

export const ChartContext = createContext<Partial<ChartContextProps>>({});

export const { Provider: ChartProvider, Consumer: ChartConsumer } =
  ChartContext;

export const useChart = () => {
  const context = useContext(ChartContext);

  if (context === undefined) {
    throw new Error('`useChart` hook must be used within a `ChartProvider`');
  }

  return context;
};
