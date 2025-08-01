import { RadialGaugeArcProps } from '@/RadialGauge';
import React, { FC, useMemo } from 'react';
import { PieArc, ArcData } from '@/PieChart';
import { ChartTooltip } from '@/common/Tooltip';

export interface StrokePieArcProps extends RadialGaugeArcProps {
  strokeWidth?: number;
  strokeDasharray?: string;
}

export const StrokePieArc: FC<Partial<StrokePieArcProps>> = ({
  data,
  gradient,
  startAngle,
  id,
  endAngle,
  outerRadius,
  padAngle = 0,
  color = '#353d44',
  strokeWidth,
  strokeDasharray,
  animated = true,
  disabled = false,
  fill,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltip = <ChartTooltip />
}) => {
  /**
   * This function will generate the arcs
   * https://github.com/d3/d3-shape#arcs
   */
  const arcGenerator = useMemo(() => {
    return (data: ArcData) => {
      const startAngle = data.startAngle;
      const endAngle = data.endAngle;
      const angleDiff = endAngle - startAngle;

      // Adjust radius by half stroke width
      const adjustedRadius = outerRadius - 8 / 2;

      // Handle complete or near-complete circles
      if (Math.abs(angleDiff - 2 * Math.PI) < 0.001) {
        // For complete circles, draw two semicircles
        const x1 = Math.cos(-Math.PI / 2) * adjustedRadius;
        const y1 = Math.sin(-Math.PI / 2) * adjustedRadius;
        const x2 = Math.cos(Math.PI / 2) * adjustedRadius;
        const y2 = Math.sin(Math.PI / 2) * adjustedRadius;

        return `M ${x1},${y1} A ${adjustedRadius},${adjustedRadius} 0 0,1 ${x2},${y2} A ${adjustedRadius},${adjustedRadius} 0 0,1 ${x1},${y1}`;
      }

      // Calculate start and end points on the adjusted radius
      const x1 = Math.cos(startAngle - Math.PI / 2) * adjustedRadius;
      const y1 = Math.sin(startAngle - Math.PI / 2) * adjustedRadius;
      const x2 = Math.cos(endAngle - Math.PI / 2) * adjustedRadius;
      const y2 = Math.sin(endAngle - Math.PI / 2) * adjustedRadius;

      // Determine if we need a large arc flag
      const largeArcFlag = angleDiff > Math.PI ? 1 : 0;

      // Generate the arc path (outer arc only)
      return `M ${x1},${y1} A ${adjustedRadius},${adjustedRadius} 0 ${largeArcFlag},1 ${x2},${y2}`;
    };
  }, [outerRadius]);

  const arcElement = useMemo(() => {
    const arcData: ArcData = {
      // @ts-ignore Data must be passed
      data: data || {},
      startAngle,
      endAngle,
      padAngle
    };

    return (
      <PieArc
        id={id}
        style={{
          strokeDasharray,
          fill: 'transparent',
          stroke: color,
          strokeWidth
        }}
        arc={arcGenerator}
        data={arcData}
        animated={animated}
        color={color}
        gradient={gradient}
        disabled={disabled}
        tooltip={tooltip}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }, [
    data,
    startAngle,
    endAngle,
    padAngle,
    id,
    strokeDasharray,
    color,
    strokeWidth,
    arcGenerator,
    animated,
    gradient,
    disabled,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave
  ]);

  return (
    <g>
      {fill && <circle fill={fill} r={outerRadius} />}
      {arcElement}
    </g>
  );
};
