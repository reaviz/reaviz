import { hierarchy, treemap, treemapSquarify } from 'd3-hierarchy';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { useCallback } from 'react';

import type {
  ChartContainerChildProps,
  ChartProps,
} from '@/common/containers/ChartContainer';
import { ChartContainer } from '@/common/containers/ChartContainer';
import type {
  ChartNestedDataShape,
  ChartShallowDataShape,
} from '@/common/data';

import type { TreeMapSeriesProps } from './TreeMapSeries';
import { TreeMapSeries } from './TreeMapSeries';

export interface TreeMapProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[] | ChartNestedDataShape[];

  /**
   * The series component that renders the components.
   */
  series?: ReactElement<TreeMapSeriesProps, typeof TreeMapSeries>;

  /**
   * Inner padding for the treemap. Defaults to 5.
   */
  paddingInner?: number;

  /**
   * Outer padding for the treemap. Defaults to 5.
   */
  paddingOuter?: number;

  /**
   * Padding top for the treemap. This is used for the title
   * spacing in nested situations. Defaults to 30.
   */
  paddingTop?: number;
}

export const TreeMap: FC<Partial<TreeMapProps>> = ({
  data = [],
  id,
  containerClassName,
  paddingInner = 5,
  paddingTop = 30,
  paddingOuter = 5,
  width,
  height,
  className,
  margins = 0,
  series = <TreeMapSeries />,
}) => {
  const getData = useCallback(
    (cw: number, ch: number) => {
      const root = hierarchy<any>({ data }, (d) => d.data)
        .sum((d) => d.data)
        .sort((a, b) => b.data - a.data);

      const t = treemap()
        .size([cw, ch])
        .tile(treemapSquarify)
        .round(true)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .paddingTop(paddingTop);

      const tree = t(root);
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

      getAllNodes(tree);
      return nodes;
    },
    [data, paddingInner, paddingOuter, paddingTop],
  );

  const renderChart = useCallback(
    ({ chartWidth, chartHeight, ...rest }: ChartContainerChildProps) => {
      const datas = getData(chartWidth, chartHeight);
      return (
        <CloneElement<TreeMapSeriesProps>
          element={series}
          {...rest}
          id={`${id || rest.id}-series`}
          data={datas}
        />
      );
    },
    [series, getData, id],
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      containerClassName={containerClassName}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};
