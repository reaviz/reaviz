import React, { cloneElement, FC, ReactElement } from 'react';
import { range } from 'd3-array';
import { scaleBand } from 'd3-scale';
import { ChartShallowDataShape } from '../../common/data';
import { ColorSchemeType, getColor } from '../../common/color';
import { RadialGaugeArc, RadialGaugeArcProps } from './RadialGaugeArc';
import {
  StackedRadialGaugeLabel,
  StackedRadialGaugeLabelProps
} from './StackedRadialGaugeLabel';

export interface StackedRadialGaugeSeriesProps {
  /**
   * Data to render set by `RadialGauge` component.
   */
  data: ChartShallowDataShape[];

  /**
   * D3 scale function set by `RadialGauge` component.
   */
  scale: any;

  /**
   * Start angle set by `RadialGauge` component.
   */
  startAngle: number;

  /**
   * Start angle set by `RadialGauge` component.
   */
  endAngle: number;

  /**
   * Width set by `RadialGauge` component.
   */
  width: number;

  /**
   * Height set by `RadialGauge` component.
   */
  height: number;

  /**
   * Color scheme to apply.
   */
  colorScheme: ColorSchemeType;

  /**
   * Arc component.
   */
  innerArc: ReactElement<RadialGaugeArcProps, typeof RadialGaugeArc>;

  /**
   * Outer arc component. This is the 'fill' element.
   */
  outerArc: ReactElement<RadialGaugeArcProps, typeof RadialGaugeArc> | null;

  /**
   * Label component.
   */
  label: ReactElement<
    StackedRadialGaugeLabelProps,
    typeof StackedRadialGaugeLabel
  > | null;

  /**
   * A factor from 0 to 1 determining how much of the Gauge should be filled with arcs
   */
  fillFactor: number;

  /**
   * Padding between the stacked arcs, following d3 bandwidth innerPadding
   */
  arcPadding: number;
}

export const StackedRadialGaugeSeries: FC<
  Partial<StackedRadialGaugeSeriesProps>
> = ({
  data,
  width,
  height,
  scale,
  startAngle,
  endAngle,
  outerArc = <RadialGaugeArc disabled={true} />,
  innerArc = <RadialGaugeArc animated={true} />,
  label = <StackedRadialGaugeLabel />,
  colorScheme = ['#00ECB1'],
  fillFactor = 0.2,
  arcPadding = 0.15
}: Partial<StackedRadialGaugeSeriesProps>) => {
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * (1 - Math.min(fillFactor, 1));

  const rAxis = scaleBand();
  rAxis.domain(range(data.length));
  rAxis.range([innerRadius, radius]);
  rAxis.paddingInner(arcPadding);

  function renderStackedGauges(
    point: ChartShallowDataShape,
    index: number,
    rAxis
  ) {
    const dataEndAngle = scale(point.data as number);

    const outerRadius = rAxis(index);
    const innerRadius = outerRadius - rAxis.bandwidth();

    return (
      <g key={point.key.toLocaleString()}>
        {outerArc &&
          cloneElement(outerArc, {
            outerRadius,
            innerRadius,
            startAngle,
            endAngle
          })}
        {innerArc &&
          cloneElement(innerArc, {
            outerRadius,
            innerRadius,
            startAngle,
            endAngle: dataEndAngle,
            data: point,
            color: getColor({
              data,
              colorScheme,
              point,
              index
            })
          })}
      </g>
    );
  }

  return (
    <>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {data.map((d, i) => renderStackedGauges(d, i, rAxis))}
        {label}
      </g>
    </>
  );
};
