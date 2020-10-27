import React, { FC, Fragment, ReactElement, useCallback } from 'react';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '../common/containers';
import { layout } from '@upsetjs/venn.js';
import { VennSeries, VennSeriesProps } from './VennSeries';
import { CloneElement } from '../common/utils';
import { starEulerLayout } from './starEuler';

export interface VennDiagramData {
  /**
   * List of Keys for the data.
   */
  key: string[];

  /**
   * Size of the data keys.
   */
  data: number;
}

export interface VennDiagramProps extends ChartProps {
  /**
   * Type of the chart.
   */
  type?: 'venn' | 'euler' | 'starEuler';

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
  type = 'venn',
  width,
  height,
  margins,
  className,
  data,
  disabled,
  series = <VennSeries />
}) => {
  const renderChart = useCallback(
    (containerProps: ChartContainerChildProps) => {
      const normalized = data.map((d) => ({
        key: d.key.map(k => k.split(' ').join('')).join('|'),
        sets: d.key,
        size: d.data
      }));

      let layoutData;
      if (type === 'starEuler') {
        layoutData = starEulerLayout(normalized, {
          height: containerProps.height,
          width: containerProps.width
        });
      } else {
        layoutData = layout(normalized, {
          height: containerProps.height,
          width: containerProps.width,
          distinct: type !== 'euler'
        });
      }

      return (
        <CloneElement<VennSeriesProps>
          element={series}
          data={layoutData}
          disabled={disabled}
          id={containerProps.id}
        />
      );
    },
    [data, series, type]
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
