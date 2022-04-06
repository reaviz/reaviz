import React, { ReactElement, useState, FC, useRef, useMemo } from 'react';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import { CloneElement } from 'rdk';
import { ArcData } from '../PieChart';
import { ChartTooltip, ChartTooltipProps } from '../../common/Tooltip';
import { useInterpolate } from './useInterpolate';

export interface PieArcMouseEvent {
  value: ArcData['data'];
  nativeEvent: React.MouseEvent<SVGPathElement>;
}

export interface PieArcProps {
  /**
   * The arc generator function returning an arc path
   * @param data
   */
  arc?: (data: ArcData) => string | null;

  /**
   * Data is the datum passed to the arc generator function
   */
  data?: ArcData;

  /**
   * Color
   */
  color?: string;

  /**
   * Animate
   */
  animated?: boolean;

  /**
   * Tooltip component
   */
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * The cursor type used when hovering
   */
  cursor?: string;

  /**
   * Disable the arc
   */
  disabled?: boolean;

  /**
   * OnClick event handler
   * @param e Click event
   */
  onClick?: (e: PieArcMouseEvent) => void;

  /**
   * MouseEnter event handler
   * @param e MouseEnter event
   */
  onMouseEnter?: (e: PieArcMouseEvent) => void;

  /**
   * MouseLeave event handler
   * @param e MouseLeave event
   */
  onMouseLeave?: (e: PieArcMouseEvent) => void;
}

export const PieArc: FC<PieArcProps> = ({
  color,
  data,
  arc,
  cursor,
  animated,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltip
}) => {
  const arcRef = useRef<SVGPathElement | null>(null);
  const { transition, d } = useInterpolate({ animated, arc, data });
  const [active, setActive] = useState<boolean>(false);
  const fill = useMemo(
    () => (active ? chroma(color).brighten(0.5) : color),
    [color, active]
  );

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

PieArc.defaultProps = {
  cursor: 'initial',
  animated: true,
  disabled: false,
  onClick: () => undefined,
  onMouseEnter: () => undefined,
  onMouseLeave: () => undefined,
  tooltip: <ChartTooltip />
};
