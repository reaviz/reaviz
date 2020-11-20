import React, { cloneElement, FC, ReactElement } from 'react';

import { range, min } from 'd3-array';
import { scaleBand } from 'd3-scale';

import { ChartShallowDataShape } from '../../common/data';
import { ColorSchemeType, getColor } from '../../common/color';
import { RadialGaugeArc, RadialGaugeArcProps } from './RadialGaugeArc';
import { RadialGaugeLabel, RadialGaugeLabelProps } from './RadialGaugeLabel';
import {
  RadialGaugeValueLabel,
  RadialGaugeValueLabelProps
} from './RadialGaugeValueLabel';

export interface RadialGaugeSeriesProps {
  /**
   * Data to render set bby `RadialGauge` component.
   */
  data: ChartShallowDataShape[];

  /**
   * D3 scale function set bby `RadialGauge` component.
   */
  scale: any;

  /**
   * Start angle set bby `RadialGauge` component.
   */
  startAngle: number;

  /**
   * Start angle set bby `RadialGauge` component.
   */
  endAngle: number;

  /**
   * Width set bby `RadialGauge` component.
   */
  width: number;

  /**
   * Height set bby `RadialGauge` component.
   */
  height: number;

  /**
   * Padding between each gauge.
   */
  padding: number;

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
  label: ReactElement<RadialGaugeLabelProps, typeof RadialGaugeLabel> | null;

  /**
   * Value label component.
   */
  valueLabel: ReactElement<
    RadialGaugeValueLabelProps,
    typeof RadialGaugeValueLabel
  > | null;

  /**
   * Min width for a gauge. Only applicable in multi-series gauges.
   */
  minGaugeWidth: number;
}

export const RadialGaugeSeries: FC<Partial<RadialGaugeSeriesProps>> = ({
  data,
  scale,
  startAngle,
  endAngle,
  outerArc = <RadialGaugeArc disabled={true} />,
  innerArc = <RadialGaugeArc width={10} animated={true} />,
  label = <RadialGaugeLabel />,
  valueLabel = <RadialGaugeValueLabel />,
  colorScheme = ['#00ECB1'],
  padding = 10,
  minGaugeWidth = 50,
  ...props
}: Partial<RadialGaugeSeriesProps>) => {
  function getWidths() {
    let rows = 1;
    let columns = data.length;

    if (props.width / data.length < minGaugeWidth) {
      while (props.width / columns < minGaugeWidth) {
        rows += 1;
        columns = Math.ceil(data.length / rows);
      }
    }

    const xScale: any = scaleBand();
    xScale.domain(range(columns));
    xScale.rangeRound([0, props.width], 0.1);

    const yScale: any = scaleBand();
    yScale.domain(range(rows));
    yScale.rangeRound([0, props.height], 0.1);

    return {
      columns,
      xScale,
      yScale,
      width: xScale.bandwidth(),
      height: yScale.bandwidth()
    };
  }

  function renderGauge(
    point: ChartShallowDataShape,
    index: number,
    columns: number,
    height: number,
    width: number,
    xScale,
    yScale
  ) {
    const dataEndAngle = scale(point.data as number);

    const baselineLabelHeight = 20;
    const outerRadius =
      (min([
        width - padding,
        height - baselineLabelHeight - padding
      ]) as number) /
        2 -
      10;

    const labelOffset = height / 2 - baselineLabelHeight;

    const x = xScale(index % columns);
    const y = yScale(Math.floor(index / columns));

    const xOffset = x + (width - padding) / 2;
    const yOffset = y + (height - baselineLabelHeight) / 2;

    return (
      <g
        transform={`translate(${xOffset}, ${yOffset})`}
        key={point.key.toLocaleString()}
      >
        {outerArc &&
          cloneElement(outerArc, { outerRadius, startAngle, endAngle })}
        {innerArc &&
          cloneElement(innerArc, {
            outerRadius,
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
        {valueLabel && cloneElement(valueLabel, { data: point })}
        {label && cloneElement(label, { data: point, offset: labelOffset })}
      </g>
    );
  }

  const { columns, width, height, xScale, yScale } = getWidths();

  return (
    <>
      {data.map((d, i) =>
        renderGauge(d, i, columns, height, width, xScale, yScale)
      )}
    </>
  );
};
