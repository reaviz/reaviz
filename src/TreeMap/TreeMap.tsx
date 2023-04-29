import React, { FC, ReactElement, useCallback } from 'react';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '../common/containers/ChartContainer';
import { ChartNestedDataShape, ChartShallowDataShape } from '../common/data';
import { hierarchy, treemap, treemapSquarify } from 'd3-hierarchy';
import { TreeMapSeries, TreeMapSeriesProps } from './TreeMapSeries';
import { CloneElement } from 'rdk';

export interface TreeMapProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[] | ChartNestedDataShape[];

  /**
   * The series component that renders the components.
   */
  series?: ReactElement<TreeMapSeriesProps, typeof TreeMapSeries>;
}

export const TreeMap: FC<Partial<TreeMapProps>> = ({
  data,
  id,
  containerClassName,
  width,
  height,
  className,
  margins,
  series
}) => {
  const getData = useCallback(
    (cw: number, ch: number) => {
      const root = hierarchy<any>({ data: data }, (d) => d.data)
        .sum((d) => d.data)
        .sort((a, b) => b.data - a.data);

      const t = treemap()
        .size([cw, ch])
        .tile(treemapSquarify)
        .round(true)
        .paddingInner(1)
        .paddingOuter(25);

      const tree = t(root);
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

      getAllNodes(tree);
      return nodes;
    },
    [data]
  );

  const renderChart = useCallback(
    ({ chartWidth, chartHeight, ...rest }: ChartContainerChildProps) => {
      const datas = getData(chartWidth, chartHeight);
      return (
        <CloneElement<TreeMapSeriesProps>
          element={series}
          {...rest}
          id={`${id}-series`}
          data={datas}
        />
      );
    },
    [series, getData, id]
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

TreeMap.defaultProps = {
  margins: 0,
  series: <TreeMapSeries />,
  data: []
};
