import React, { FC, ReactElement, useCallback } from 'react';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '../common/containers/ChartContainer';
import { ChartShallowDataShape } from '../common/data';
import { hierarchy, treemap, treemapSquarify } from 'd3-hierarchy';
import { TreeMapSeries, TreeMapSeriesProps } from './TreeMapSeries';
import { CloneElement } from 'rdk';

export interface TreeMapProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

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
      const root = hierarchy<any>({ children: data })
        .sum((d) => d.data)
        .sort((a, b) => b.data - a.data);

      const t = treemap()
        .size([cw, ch])
        .tile(treemapSquarify)
        .round(true)
        .padding(1);

      return t(root).leaves();
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
