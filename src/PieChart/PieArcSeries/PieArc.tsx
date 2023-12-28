import React, { ReactElement, useState, FC, useRef, useMemo, useCallback } from 'react';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import { CloneElement } from 'rdk';
import { ArcData } from '../PieChart';
import { ChartTooltip, ChartTooltipProps } from '../../common/Tooltip';
import { useInterpolate } from './useInterpolate';
import { useHoverIntent } from '../../common/utils/useHoverIntent';
import { Gradient, GradientProps } from '../../common/Gradient';

export interface PieArcMouseEvent {
  value: ArcData['data'];
  nativeEvent: React.MouseEvent<SVGPathElement>;
}

export interface PieArcProps {
  /**
   * Unique id for arc
   */
  id?: string;

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
   * Gradient shades for the bar.
   */
  gradient?: ReactElement<GradientProps, typeof Gradient> | null;

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
  id,
  color,
  data,
  arc,
  cursor,
  animated,
  gradient,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltip
}) => {
  const arcRef = useRef<SVGPathElement | null>(null);
  const d = useInterpolate({ animated, arc, data });
  const [active, setActive] = useState<boolean>(false);
  const fill = useMemo(
    () => (active ? chroma(color).brighten(0.5) : color),
    [color, active]
  );

  const { pointerOut, pointerOver } = useHoverIntent({
    onPointerOver: (event) => {
      if (!disabled) {
        setActive(true);
        onMouseEnter?.({
          value: data.data,
          nativeEvent: event as any
        });
      }
    },
    onPointerOut: (event) => {
      if (!disabled) {
        setActive(false);
        onMouseLeave?.({
          value: data.data,
          nativeEvent: event as any
        });
      }
    }
  });

  const internalFill = useMemo(
    () => {
      if (gradient) {
        return `url(#gradient-${id})`;
      }

      return color;
    },
    [gradient, id, color]
  );

  return (
    <g ref={arcRef} tabIndex={0}>
      <motion.path
        role="graphics-symbol"
        d={d}
        style={{ cursor }}
        fill={internalFill}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        onClick={event => {
          if (!disabled) {
            onClick?.({
              value: data.data,
              nativeEvent: event
            });
          }
        }}
      />
      {gradient && (
        <CloneElement<GradientProps>
          element={gradient}
          id={`gradient-${id}`}
          direction="horizontal"
          color={fill}
        />
      )}
      {!tooltip?.props?.disabled && (
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
  tooltip: <ChartTooltip />
};
