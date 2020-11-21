import React, { FC, ReactElement, useMemo } from 'react';
import { arc } from 'd3-shape';
import { PieArc, ArcData, PieArcProps } from '../../PieChart';
import { ChartShallowDataShape } from '../../common/data';
import { ChartTooltip, ChartTooltipProps } from '../../common/Tooltip';

export interface RadialGaugeArcProps {
  /**
   * Data set by the `RadialGaugeSeries` components.
   */
  data?: ChartShallowDataShape;

  /**
   * Start angle set by the `RadialGaugeSeries` components.
   */
  startAngle: number;

  /**
   * End angle set by the `RadialGaugeSeries` components.
   */
  endAngle: number;

  /**
   * Inner radius set by the `RadialGaugeSeries` components.
   */
  innerRadius: number;

  /**
   * Outer radius set by the `RadialGaugeSeries` components.
   */
  outerRadius: number;

  /**
   * Color set by the `RadialGaugeSeries` components.
   */
  color: any;

  /**
   * Corner Radius set by the `RadialGaugeSeries` components.
   */
  cornerRadius?: number;

  /**
   * Pad Angle set by the `RadialGaugeSeries` components.
   */
  padAngle?: number;

  /**
   * Pad Radius set by the `RadialGaugeSeries` components.
   */
  padRadius?: number;

  /**
   * Animation set by the `RadialGaugeSeries` component.
   */
  animated: boolean;

  /**
   * Disable the interactions.
   */
  disabled: boolean;

  /**
   * Tooltip component.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Event for when the arc is clicked.
   */
  onClick: (event) => void;

  /**
   * Event for when the arc has mouse enter.
   */
  onMouseEnter: (event) => void;

  /**
   * Event for when the arc has mouse leave.
   */
  onMouseLeave: (event) => void;
}

export const RadialGaugeArc: FC<Partial<RadialGaugeArcProps>> = ({
  data,
  startAngle,
  endAngle,
  innerRadius,
  outerRadius,
  cornerRadius = 0,
  padAngle = 0,
  padRadius = 0,
  color = '#353d44',
  animated = true,
  disabled = false,
  onClick = () => undefined,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined,
  tooltip = <ChartTooltip />
}: Partial<RadialGaugeArcProps>) => {
  /**
   * This function will generate the arcs
   * https://github.com/d3/d3-shape#arcs
   */
  const arcGenerator = useMemo(() => {
    return arc<ArcData>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius);
  }, [innerRadius, outerRadius, cornerRadius, padAngle, padRadius]);

  const arcData: ArcData = {
    // @ts-ignore Data must be passed
    data: data || {},
    startAngle,
    endAngle,
    padAngle
  };

  return (
    <PieArc
      arc={arcGenerator}
      data={arcData}
      animated={animated}
      color={color}
      disabled={disabled}
      tooltip={tooltip}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
