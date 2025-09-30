import { hierarchy, partition } from 'd3-hierarchy';
import { CloneElement, useId } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { useCallback } from 'react';

import type {
  ChartContainerChildProps,
  ChartProps
} from '@/common/containers/ChartContainer';
import { ChartContainer } from '@/common/containers/ChartContainer';
import type {
  ChartNestedDataShape,
  ChartShallowDataShape
} from '@/common/data';

import type { SunburstSeriesProps } from './SunburstSeries';
import { SunburstSeries } from './SunburstSeries';

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
  data = [],
  id,
  series = <SunburstSeries />,
  containerClassName,
  width,
  height,
  className,
  margins = 0
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
        for (const child of node?.children || []) {
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
