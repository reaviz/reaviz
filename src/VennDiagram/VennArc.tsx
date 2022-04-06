import React, { FC, useRef, ReactElement, useState, Fragment } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { ChartTooltip, ChartTooltipProps } from '../common/Tooltip';
import { CloneElement } from 'rdk';
import { motion } from 'framer-motion';
import { useInterpolate } from './useInterpolate';
import { Mask, MaskProps } from '../common/Mask';
import { Gradient, GradientProps } from '../common/Gradient';

export interface VennArcProps {
  /**
   * Whether the shape is active or not.
   */
  active?: boolean | null;

  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Fill color for the arc.
   */
  fill: string;

  /**
   * Stroke for the arc.
   */
  stroke?:
    | string
    | ((
        data: IVennLayout<any>,
        index: number,
        isActive: boolean | null,
        isHovered: boolean | null
      ) => string);

  /**
   * The internal data object built by venn.js
   */
  data: IVennLayout<any>;

  /**
   * Whether the chart is disabled.
   */
  disabled?: boolean;

  /**
   * Stroke on the arc.
   */
  strokeWidth?: number;

  /**
   * Initial style of arc.
   */
  initialStyle?: any;

  /**
   * Active style of arc.
   */
  activeStyle?: any;

  /**
   * Inactive style of arc.
   */
  inactiveStyle?: any;

  /**
   * CSS Styles for the arc.
   */
  style?: any;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Mask element for the arc.
   */
  mask: ReactElement<MaskProps, typeof Mask> | null;

  /**
   * Gradient shades for the arc.
   */
  gradient: ReactElement<GradientProps, typeof Gradient> | null;

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

export const VennArc: FC<Partial<VennArcProps>> = ({
  data,
  fill,
  disabled,
  animated,
  stroke,
  mask,
  id,
  style,
  active,
  inactiveStyle,
  activeStyle,
  initialStyle,
  strokeWidth,
  gradient,
  tooltip,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const [internalActive, setInternalActive] = useState<boolean>(false);
  const arcRef = useRef<any | null>(null);
  const { transition, d } = useInterpolate({ animated, data });
  const currentStyle = active
    ? activeStyle
    : active === null
      ? inactiveStyle
      : initialStyle;

  const arcFill =
    gradient && !mask
      ? `url(#gradient-${id})`
      : mask
        ? `url(#mask-pattern-${id})`
        : fill;

  return (
    <g
      title={data.data.key}
      onMouseEnter={(event) => {
        if (!disabled) {
          setInternalActive(true);
          onMouseEnter({
            value: data.data,
            nativeEvent: event
          });
        }
      }}
      onMouseLeave={(event) => {
        if (!disabled) {
          setInternalActive(false);
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
    >
      <motion.path
        ref={arcRef}
        fill={arcFill}
        id={`${id}-arc`}
        strokeWidth={strokeWidth}
        stroke={stroke as string}
        transition={transition}
        d={d}
        initial={initialStyle}
        animate={currentStyle}
        style={style}
      />
      {mask && (
        <Fragment>
          <Mask id={`mask-${id}`} fill={`url(#gradient-${id})`} />
          <CloneElement<MaskProps>
            element={mask}
            id={`mask-pattern-${id}`}
            fill={fill}
          />
        </Fragment>
      )}
      {gradient && (
        <CloneElement<GradientProps>
          element={gradient}
          id={`gradient-${id}`}
          color={fill}
        />
      )}
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!internalActive}
          reference={arcRef}
          value={{ y: data.data.size, x: data.data?.sets?.join(' | ') }}
        />
      )}
    </g>
  );
};

VennArc.defaultProps = {
  active: false,
  inactiveStyle: { opacity: 0.3 },
  activeStyle: { opacity: 0.8 },
  initialStyle: { opacity: 0.6 },
  strokeWidth: 3,
  gradient: <Gradient />,
  tooltip: <ChartTooltip />,
  onClick: () => undefined,
  onMouseEnter: () => undefined,
  onMouseLeave: () => undefined
};
