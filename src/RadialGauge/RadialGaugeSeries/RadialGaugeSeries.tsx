import React, {
  cloneElement,
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useMemo
} from 'react';
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
import { RadialGaugeOuterArc } from './RadialGaugeOuterArc';

export interface RadialGaugeSeriesProps {
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
   * The "thickness" of the arcs
   */
  arcWidth?: number;

  /**
   * Width set by `RadialGauge` component.
   */
  width: number;

  /**
   * Height set by `RadialGauge` component.
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
  arcWidth,
  outerArc,
  innerArc,
  label,
  valueLabel,
  colorScheme,
  padding,
  minGaugeWidth,
  ...props
}) => {
  const { columns, width, height, xScale, yScale } = useMemo(() => {
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
  }, [data.length, minGaugeWidth, props.height, props.width]);

  const renderGauge = useCallback(
    (point: ChartShallowDataShape, index: number) => {
      const dataEndAngle = scale(point.data as number);

      const outerRadius =
        (min([width - padding * 2, height - padding * 2]) as number) / 2;

      const innerRadius = outerRadius - arcWidth;

      const labelOffset = height / 2;

      const x = xScale(index % columns);
      const y = yScale(Math.floor(index / columns));

      const xOffset = x + width / 2;
      const yOffset = y + height / 2;

      return (
        <g
          transform={`translate(${xOffset}, ${yOffset})`}
          key={point.key.toLocaleString()}
        >
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
          {valueLabel && cloneElement(valueLabel, { data: point })}
          {label && cloneElement(label, { data: point, offset: labelOffset })}
        </g>
      );
    },
    [
      arcWidth,
      colorScheme,
      columns,
      data,
      endAngle,
      height,
      innerArc,
      label,
      outerArc,
      padding,
      scale,
      startAngle,
      valueLabel,
      width,
      xScale,
      yScale
    ]
  );

  return <Fragment>{data.map(renderGauge)}</Fragment>;
};

RadialGaugeSeries.defaultProps = {
  arcWidth: 5,
  outerArc: <RadialGaugeOuterArc />,
  innerArc: <RadialGaugeArc />,
  label: <RadialGaugeLabel />,
  valueLabel: <RadialGaugeValueLabel />,
  colorScheme: ['#00ECB1'],
  padding: 20,
  minGaugeWidth: 50
};
