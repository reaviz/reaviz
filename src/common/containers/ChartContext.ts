import { createContext, useContext } from 'react';
import { Dimensions } from '@/common/utils';
import { LinearAxisDimensionChanged } from '@/common/Axis';

export interface ChartContextProps extends Dimensions {
  /**
   * Unique id of the chart.
   */
  id: string;

  /**
   * Whether the chart has reached its final size and is ready to render data.
   */
  chartSized?: boolean;

  /**
   * Whether the Y axis has finished measuring itself.
   */
  yAxisSized?: boolean;

  /**
   * Whether the X axis has finished measuring itself.
   */
  xAxisSized?: boolean;

  /**
   * Callback fired when an axis reports a new dimension.
   */
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
