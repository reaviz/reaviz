import React, { Component, Fragment, ReactElement } from 'react';
import {
  ChartShallowDataShape,
  buildShallowChartData,
  ChartInternalShallowDataShape
} from '../common/data';
import { scaleTime } from 'd3-scale';
import { getYDomain, getXDomain } from '../common/utils/domains';
import {
  RadialScatterSeries,
  RadialScatterSeriesProps
} from './RadialScatterSeries';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers';
import { CloneElement } from '../common/utils/children';
import { RadialAxisProps, RadialAxis } from '../common/Axis/RadialAxis';
import { getRadialYScale } from '../common/scales';
import memoize from 'memoize-one';

export interface RadialScatterPlotProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the scatter components.
   */
  series: ReactElement<RadialScatterSeriesProps, typeof RadialScatterSeries>;

  /**
   * The radial axis component for the chart.
   */
  axis: ReactElement<RadialAxisProps, typeof RadialAxis> | null;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;
}

export class RadialScatterPlot extends Component<RadialScatterPlotProps> {
  static defaultProps: Partial<RadialScatterPlotProps> = {
    innerRadius: 80,
    margins: 75,
    axis: <RadialAxis />,
    series: <RadialScatterSeries />
  };

  getScales = memoize(
    (
      preData: ChartShallowDataShape[],
      outerRadius: number,
      innerRadius: number
    ) => {
      const data = buildShallowChartData(
        preData
      ) as ChartInternalShallowDataShape[];

      const yDomain = getYDomain({ data, scaled: false });
      const xDomain = getXDomain({ data });

      const xScale = scaleTime()
        .range([0, 2 * Math.PI])
        .domain(xDomain);

      const yScale = getRadialYScale(innerRadius, outerRadius, yDomain);

      return {
        yScale,
        xScale,
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
      outerRadius,
      innerRadius
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
        <CloneElement<RadialScatterSeriesProps>
          element={series}
          id={id}
          data={data}
          xScale={xScale}
          yScale={yScale}
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
        {this.renderChart.bind(this)}
      </ChartContainer>
    );
  }
}
