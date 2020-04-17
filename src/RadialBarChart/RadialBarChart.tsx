import React, { Component, Fragment, ReactElement } from 'react';
import {
  ChartShallowDataShape,
  ChartInternalShallowDataShape,
  buildShallowChartData
} from '../common/data';
import { scaleBand } from 'd3-scale';
import { getYDomain } from '../common/utils/domains';
import { RadialBarSeries, RadialBarSeriesProps } from './RadialBarSeries';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers';
import { CloneElement } from '../common/utils/children';
import { RadialAxis, RadialAxisProps } from '../common/Axis/RadialAxis';
import { getRadialYScale } from '../common/scales';
import { uniqueBy } from '../common/utils/array';
import memoize from 'memoize-one';

export interface RadialBarChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the bar components.
   */
  series: ReactElement<RadialBarSeriesProps, typeof RadialBarSeries>;

  /**
   * The radial axis component for the chart.
   */
  axis: ReactElement<RadialAxisProps, typeof RadialAxis> | null;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;
}

export class RadialBarChart extends Component<RadialBarChartProps> {
  static defaultProps: Partial<RadialBarChartProps> = {
    innerRadius: 0.1,
    margins: 75,
    axis: <RadialAxis />,
    series: <RadialBarSeries />
  };

  getScales = memoize(
    (
      preData: ChartShallowDataShape[],
      innerRadius: number,
      outerRadius: number
    ) => {
      const data = buildShallowChartData(
        preData
      ) as ChartInternalShallowDataShape[];
      const xDomain = uniqueBy<ChartInternalShallowDataShape>(data, d => d.x);
      const yDomain = getYDomain({ data, scaled: false });

      const xScale = scaleBand()
        .range([0, 2 * Math.PI])
        .domain(xDomain as any[]);

      const yScale = getRadialYScale(innerRadius, outerRadius, yDomain);

      return {
        xScale,
        yScale,
        data
      };
    }
  );

  renderChart(containerProps: ChartContainerChildProps) {
    const { chartWidth, chartHeight, id } = containerProps;
    const { innerRadius, series, axis } = this.props;
    const outerRadius = Math.min(chartWidth, chartHeight) / 2;
    const { yScale, xScale, data } = this.getScales(
      this.props.data,
      innerRadius,
      outerRadius
    );

    return (
      <Fragment>
        {axis && (
          <CloneElement<RadialAxisProps>
            element={axis}
            xScale={xScale}
            height={chartHeight}
            width={chartWidth}
            innerRadius={innerRadius}
          />
        )}
        <CloneElement<RadialBarSeriesProps>
          element={series}
          id={id}
          data={data}
          height={chartHeight}
          width={chartWidth}
          xScale={xScale}
          yScale={yScale}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        />
      </Fragment>
    );
  }

  render() {
    const { id, width, height, margins, className } = this.props;

    return (
      <ChartContainer
        id={id}
        width={width}
        height={height}
        margins={margins}
        xAxisVisible={false}
        yAxisVisible={false}
        center={true}
        className={className}
      >
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
