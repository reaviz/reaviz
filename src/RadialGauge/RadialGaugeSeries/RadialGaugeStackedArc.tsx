import React, { FC, JSX, useMemo } from 'react';
import { arc } from 'd3-shape';

import {
  ChartNestedDataShape,
  ChartShallowDataShape,
  ChartTooltip,
  ColorSchemeType,
  getColor
} from '../../common';
import { ArcData, PieArc } from '../../PieChart';
import { RadialGaugeArcProps } from './RadialGaugeArc';

export type RadialGaugeStackedArcProps = Omit<
  RadialGaugeArcProps,
  'startAngle' | 'endAngle' | 'data' | 'color'
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
  cornerRadius,
  padAngle,
  colorScheme,
  ...restProps
}) => {
  const arcGenerator = useMemo(() => {
    return arc<ArcData>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius);
  }, [innerRadius, outerRadius, cornerRadius]);

  const stackedArcs = useMemo(() => {
    let prevEndAngle = 0;

    function renderArc(
      point: ChartShallowDataShape,
      index: number
    ): JSX.Element {
      const value = point.data as number;
      const startAngle = prevEndAngle;
      const endAngle = startAngle + scale(value);
      prevEndAngle = endAngle;

      const arcData: ArcData = {
        data: point,
        startAngle,
        endAngle,
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
          {...restProps}
          id={point.key.toLocaleString()}
          key={point.key.toLocaleString()}
          arc={arcGenerator}
          data={arcData}
          color={color}
        />
      );
    }

    return data.data.map(renderArc);
  }, [arcGenerator, colorScheme, data, padAngle, restProps, scale]);

  return <g key={id}>{stackedArcs}</g>;
};

RadialGaugeStackedArc.defaultProps = {
  cornerRadius: 0,
  padAngle: 0,
  padRadius: 0,
  animated: true,
  disabled: false,
  tooltip: <ChartTooltip />
};
