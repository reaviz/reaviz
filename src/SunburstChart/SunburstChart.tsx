import React, { FC, ReactElement, useCallback } from 'react';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '@/common/containers/ChartContainer';
import { ChartNestedDataShape, ChartShallowDataShape } from '@/common/data';
import { hierarchy, partition } from 'd3-hierarchy';
import { CloneElement, useId } from 'reablocks';
import { SunburstSeries, SunburstSeriesProps } from './SunburstSeries';

export interface SunburstChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[] | ChartNestedDataShape[];

  /**
   * The series component that renders the components.
   */
  series?: ReactElement<SunburstSeriesProps, typeof SunburstSeries>;
}

export const SunburstChart: FC<Partial<SunburstChartProps>> = ({
  data,
  id,
  series,
  containerClassName,
  width,
  height,
  className,
  margins
}) => {
  const newId = useId(id);

  const getData = useCallback(
    (radius: number) => {
      const rootHierarchy = hierarchy<any>({ data }, (d) => d.data)
        .sum((d) => d.data)
        .sort((a, b) => b.data - a.data);

      const root = partition().size([2 * Math.PI, radius])(rootHierarchy);

      const nodes = [];
      const getAllNodes = (node) => {
        if (node?.parent) {
          // Don't add root node
          nodes.push(node);
        }
        for (let child of node?.children || []) {
          getAllNodes(child);
        }
      };

      getAllNodes(root);
      return nodes;
    },
    [data]
  );

  const renderChart = useCallback(
    ({ chartWidth, chartHeight, ...rest }: ChartContainerChildProps) => {
      const radius = Math.min(chartWidth, chartHeight) / 2;
      const root = getData(radius);

      return (
        <CloneElement<SunburstSeriesProps>
          element={series}
          id={`${newId}-series`}
          data={root}
          radius={radius}
        />
      );
    },
    [getData, newId, series]
  );

  return (
    <ChartContainer
      id={newId}
      width={width}
      height={height}
      containerClassName={containerClassName}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      center={true}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};

SunburstChart.defaultProps = {
  margins: 0,
  series: <SunburstSeries />,
  data: []
};
