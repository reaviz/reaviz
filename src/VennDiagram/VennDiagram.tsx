import React, { FC, Fragment, ReactElement, useCallback } from 'react';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '../common/containers';
import { layout } from '@upsetjs/venn.js';
import { VennSeries, VennSeriesProps } from './VennSeries';
import { CloneElement } from '../common/utils';

export interface VennDiagramData {
  key: string[];
  data: number;
}

export interface VennDiagramProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: VennDiagramData[];

  /**
   * The series component that renders the arc and label components.
   */
  series?: ReactElement<VennSeriesProps, typeof VennSeries> | null;

  /**
   * Whether the chart is disabled.
   */
  disabled?: boolean;
}

export const VennDiagram: FC<VennDiagramProps> = ({
  id,
  width,
  height,
  margins,
  className,
  data,
  disabled,
  series = <VennSeries />
}) => {
  const normalized = data.map((d) => ({ sets: d.key, size: d.data }));

  const renderChart = useCallback(
    (containerProps: ChartContainerChildProps) => {
      const layoutData = layout(normalized, {
        height: containerProps.height,
        width: containerProps.width
      });

      return (
        <CloneElement<VennSeriesProps>
          element={series}
          data={layoutData}
          disabled={disabled}
          id={containerProps.id}
        />
      );
    },
    [normalized, series]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      center={false}
      className={className}
    >
      {(props) => renderChart(props)}
    </ChartContainer>
  );
};
