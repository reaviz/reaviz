import React, { ReactElement, useState, FC, useRef, useMemo } from 'react';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import { CloneElement } from 'rdk';
import type { ArcData } from '../PieChart';
import { ChartTooltip, ChartTooltipProps } from '../../common/Tooltip';
import { useInterpolate } from './useInterpolate';

export interface PieArcMouseEvent {
  value: ArcData['data'];
  nativeEvent: React.MouseEvent<SVGPathElement>;
}

export interface PieArcProps {
  data?: ArcData;
  innerArc?: (data: ArcData) => string | null;
  color?: string;
  animated?: boolean;
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;
  cursor?: string;
  disabled?: boolean;
  onClick?: (e: PieArcMouseEvent) => void;
  onMouseEnter?: (e: PieArcMouseEvent) => void;
  onMouseLeave?: (e: PieArcMouseEvent) => void;
}

export const PieArc: FC<PieArcProps> = ({
  color,
  data,
  innerArc,
  cursor = 'initial',
  animated = true,
  disabled = false,
  onClick = () => undefined,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined,
  tooltip = <ChartTooltip />
}) => {
  const arcRef = useRef<SVGPathElement | null>(null);
  const { transition, d } = useInterpolate({ animated, innerArc, data });
  const [active, setActive] = useState<boolean>(false);
  const fill = useMemo(() => (active ? chroma(color).brighten(0.5) : color), [
    color,
    active
  ]);

  return (
    <g ref={arcRef}>
      <motion.path
        role="graphics-symbol"
        transition={transition}
        d={d}
        style={{ cursor }}
        fill={fill}
        onMouseEnter={(event) => {
          if (!disabled) {
            setActive(true);
            onMouseEnter({
              value: data.data,
              nativeEvent: event
            });
          }
        }}
        onMouseLeave={(event) => {
          if (!disabled) {
            setActive(false);
            onMouseLeave({
              value: data.data,
              nativeEvent: event
            });
          }
        }}
        onClick={(event) => {
          if (!disabled) {
            onClick({
              value: data.data,
              nativeEvent: event
            });
          }
        }}
      />
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!active}
          reference={arcRef}
          value={{ y: data.data.data, x: data.data.key }}
        />
      )}
    </g>
  );
};
