import React, { cloneElement, FC, ReactElement, useCallback } from 'react';
import { range } from 'd3-array';
import { scaleBand } from 'd3-scale';
import {
  ChartDataShape,
  ChartNestedDataShape,
  ChartShallowDataShape
} from '@/common/data';
import { ColorSchemeType, getColor } from '@/common/color';
import { RadialGaugeArc, RadialGaugeArcProps } from './RadialGaugeArc';
import {
  RadialGaugeStackedArc,
  RadialGaugeStackedArcProps
} from './RadialGaugeStackedArc';
import {
  StackedRadialGaugeValueLabel,
  StackedRadialGaugeValueLabelProps
} from './StackedRadialGaugeValueLabel';
import {
  StackedRadialGaugeDescriptionLabel,
  StackedRadialGaugeDescriptionLabelProps
} from './StackedRadialGaugeDescriptionLabel';

export interface StackedRadialGaugeSeriesProps {
  /**
   * Data to render set by `RadialGauge` component.
   */
  data: ChartDataShape[];

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
   * Stacked Arc component.
   */
  stackedInnerArc: ReactElement<
    RadialGaugeStackedArcProps,
    typeof RadialGaugeStackedArc
  >;

  /**
   * Outer arc component. This is the 'fill' element.
   */
  outerArc: ReactElement<RadialGaugeArcProps, typeof RadialGaugeArc> | null;

  /**
   * Label component.
   */
  label: ReactElement<
    StackedRadialGaugeValueLabelProps,
    typeof StackedRadialGaugeValueLabel
  > | null;

  /**
   * Description label component.
   */
  descriptionLabel: ReactElement<
    StackedRadialGaugeDescriptionLabelProps,
    typeof StackedRadialGaugeDescriptionLabel
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

const isChartNestedData = (
  point: ChartDataShape
): point is ChartNestedDataShape => {
  return Array.isArray(point.data);
};

export const StackedRadialGaugeSeries: FC<
  Partial<StackedRadialGaugeSeriesProps>
> = ({
  data,
  width,
  height,
  scale,
  startAngle,
  endAngle,
  outerArc = <RadialGaugeArc disabled={true} animated={false} />,
  innerArc = <RadialGaugeArc animated={true} />,
  stackedInnerArc = <RadialGaugeStackedArc animated={true} />,
  label = <StackedRadialGaugeValueLabel />,
  descriptionLabel,
  colorScheme = ['#00ECB1'],
  fillFactor = 0.2,
  arcPadding = 0.15
}) => {
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * (1 - Math.min(fillFactor, 1));

  const rAxis = scaleBand()
    .domain(range(data.length))
    .range([innerRadius, radius])
    .paddingInner(arcPadding);

  const renderOuterArc = useCallback(
    (outerRadius: number, innerRadius: number) => {
      return (
        outerArc &&
        cloneElement(outerArc, {
          outerRadius,
          innerRadius,
          startAngle,
          endAngle
        })
      );
    },
    [outerArc, startAngle, endAngle]
  );

  const renderInnerArc = useCallback(
    (
      outerRadius: number,
      innerRadius: number,
      dataEndAngle: number,
      point: ChartShallowDataShape,
      index: number
    ) => {
      const color = getColor({ data, colorScheme, point, index });

      return (
        innerArc &&
        cloneElement(innerArc, {
          outerRadius,
          innerRadius,
          startAngle,
          endAngle: dataEndAngle,
          data: point,
          color
        })
      );
    },
    [innerArc, startAngle, data, colorScheme]
  );

  const renderStackedArc = useCallback(
    (
      outerRadius: number,
      innerRadius: number,
      point: ChartNestedDataShape,
      index: number
    ) => {
      return (
        <>
          {stackedInnerArc &&
            cloneElement(stackedInnerArc, {
              outerRadius,
              innerRadius,
              colorScheme,
              startAngle,
              scale: scale?.[index] ?? scale?.[index] ?? scale,
              data: point
            })}
        </>
      );
    },
    [stackedInnerArc, colorScheme, startAngle, scale]
  );

  const renderStackedGauges = useCallback(
    (point: ChartDataShape, index: number) => {
      const outerRadius = rAxis(index as any);
      const innerRadius = outerRadius - rAxis.bandwidth();

      return (
        <g key={point.key.toLocaleString()}>
          {renderOuterArc(outerRadius, innerRadius)}
          {isChartNestedData(point)
            ? renderStackedArc(outerRadius, innerRadius, point, index)
            : renderInnerArc(
              outerRadius,
              innerRadius,
              scale?.[index]?.(point.data) ??
                  scale?.[0]?.(point.data) ??
                  scale(point.data),
              point,
              index
            )}
        </g>
      );
    },
    [rAxis, renderOuterArc, renderStackedArc, renderInnerArc, scale]
  );

  return (
    <>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {data.map(renderStackedGauges)}
        {descriptionLabel}
        {label}
      </g>
    </>
  );
};
