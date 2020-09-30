import React, { FC, useRef, ReactElement, useState, Fragment } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { ChartTooltip, ChartTooltipProps } from '../common/Tooltip';
import { CloneElement } from '../common/utils';
import { motion } from 'framer-motion';
import { useInterpolate } from './useInterpolate';
import { Mask, MaskProps } from '../common/Mask';

export interface VennArcProps {
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
  stroke: string;

  /**
   * The internal data object built by venn.js
   */
  data: IVennLayout<any>;

  /**
   * Whether the chart is disabled.
   */
  disabled?: boolean;

  /**
   * Cursor for the arc hover.
   */
  cursor?: string;

  /**
   * Stroke on the arc.
   */
  strokeWidth?: number;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Mask element for the arc.
   */
  mask: ReactElement<MaskProps, typeof Mask> | null;

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
  strokeWidth = 3,
  cursor = 'initial',
  tooltip = <ChartTooltip />,
  onClick = () => undefined,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined
}) => {
  const arcRef = useRef<any | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const { transition, d } = useInterpolate({ animated, data });
  const arcFill = mask ? `url(#mask-pattern-${id})` : fill;

  return (
    <g
      style={{ cursor }}
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
    >
      <motion.path
        ref={arcRef}
        fill={arcFill}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transition={transition}
        d={d}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: active ? 0.7 : 0.6 }}
      />
      {mask && (
        <Fragment>
          <Mask id={`mask-${id}`} fill={`url(#gradient-${id})`} />
          <CloneElement<MaskProps>
            element={mask}
            id={`mask-pattern-${id}`}
            fill={stroke}
          />
        </Fragment>
      )}
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!active}
          reference={arcRef}
          value={{ y: data.data.size, x: data.data.sets.join(' | ') }}
        />
      )}
    </g>
  );
};
