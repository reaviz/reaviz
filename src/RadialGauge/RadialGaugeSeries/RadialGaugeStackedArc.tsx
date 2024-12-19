import React, { FC, JSX, useMemo } from 'react';
import { arc } from 'd3-shape';

import {
  ChartNestedDataShape,
  ChartShallowDataShape,
  ChartTooltip,
  ColorSchemeType,
  getColor
} from '@/common';
import { ArcData, PieArc } from '@/PieChart';
import { RadialGaugeArcProps } from './RadialGaugeArc';

export type RadialGaugeStackedArcProps = Omit<
  RadialGaugeArcProps,
  'endAngle' | 'data' | 'color'
> & {
  /**
   * Data set by the `StackedRadialGaugeSeries` components.
   */
  data: ChartNestedDataShape;

  /**
   * D3 scale function set by `RadialGauge` component.
   */
  scale: (x: number) => number;

  /**
   * Color scheme to apply set by 'StackedRadialGaugeSeries' component.
   */
  colorScheme: ColorSchemeType;
};

export const RadialGaugeStackedArc: FC<Partial<RadialGaugeStackedArcProps>> = ({
  id,
  data,
  scale,
  innerRadius,
  outerRadius,
  cornerRadius = 0,
  padAngle = 0,
  padRadius = 0,
  startAngle,
  colorScheme,
  animated = true,
  disabled = false,
  tooltip = <ChartTooltip />,
  ...restProps
}) => {
  const arcGenerator = useMemo(() => {
    return arc<ArcData>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius);
  }, [innerRadius, outerRadius, cornerRadius]);

  const stackedArcs = useMemo(() => {
    let prevEndAngle = startAngle;

    function renderArc(
      point: ChartShallowDataShape,
      index: number
    ): JSX.Element {
      const value = point.data as number;
      const startArcAngle = prevEndAngle;
      const endArcAngle = startArcAngle + scale(value) - startAngle;
      prevEndAngle = endArcAngle;

      const arcData: ArcData = {
        data: point,
        startAngle: startArcAngle,
        endAngle: endArcAngle,
        padAngle,
        value,
        index
      };

      const color = getColor({
        colorScheme,
        data: [data],
        point: point,
        index,
        active: [data],
        isMultiSeries: true
      });

      return (
        <PieArc
          animated={animated}
          disabled={disabled}
          tooltip={tooltip}
          {...restProps}
          id={point.key.toLocaleString()}
          key={point.key.toLocaleString()}
          arc={arcGenerator}
          data={arcData}
          color={color}
        />
      );
    }

    return data.data.map(renderArc as any) as any;
  }, [
    animated,
    arcGenerator,
    colorScheme,
    data,
    disabled,
    padAngle,
    restProps,
    scale,
    startAngle,
    tooltip
  ]);

  return <g key={id}>{stackedArcs}</g>;
};
