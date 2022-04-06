import React, {
  FC,
  Fragment,
  MouseEvent,
  ReactElement,
  useMemo,
  useState,
  useRef
} from 'react';
import { ChartTooltip, ChartTooltipProps } from '../../common/Tooltip';
import { CloneElement } from 'rdk';
import {
  constructFunctionProps,
  PropFunctionTypes
} from '../../common/utils/functions';
import chroma from 'chroma-js';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '../../common/Motion';
import { ChartInternalShallowDataShape } from '../../common/data';
import css from './HeatmapCell.module.css';

export type HeatmapCellProps = {
  /**
   * X Position set by `HeatmapSeries`.
   */
  x: number;

  /**
   * Y Position set by `HeatmapSeries`.
   */
  y: number;

  /**
   * rx SVG Attribute.
   */
  rx: number;

  /**
   * ry SVG Attribute.
   */
  ry: number;

  /**
   * Height of cell set by `HeatmapSeries`.
   */
  height: number;

  /**
   * Width of cell set by `HeatmapSeries`.
   */
  width: number;

  /**
   * Total count of cells set by `HeatmapSeries`.
   */
  cellCount: number;

  /**
   * Tooltip component.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Fill color set by `HeatmapSeries`.
   */
  fill: string;

  /**
   * Data object set by `Heatmap`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * Whether cell is animated or not set by `HeatmapSeries`.
   */
  animated: boolean;

  /**
   * Cell index set by `HeatmapSeries`.
   */
  cellIndex: number;

  /**
   * Cursor style attribute.
   */
  cursor: string;

  /**
   * Event for when the bar is clicked.
   */
  onClick: (event) => void;

  /**
   * Event for when the bar has mouse enter.
   */
  onMouseEnter: (event) => void;

  /**
   * Event for when the bar has mouse leave.
   */
  onMouseLeave: (event) => void;
} & PropFunctionTypes;

interface HeatmapCellState {
  active?: boolean;
}

// Set padding modifier for the tooltips
const modifiers = {
  offset: {
    offset: '0, 3px'
  }
};

export const HeatmapCell: FC<Partial<HeatmapCellProps>> = ({
  rx,
  ry,
  cursor,
  tooltip,
  onClick,
  onMouseEnter,
  onMouseLeave,
  data,
  animated,
  cellIndex,
  cellCount,
  fill,
  x,
  y,
  style,
  className,
  ...rest
}) => {
  const [active, setActive] = useState(false);
  const rect = useRef<SVGRectElement | null>(null);

  const onMouseEnterWrapper = (event: MouseEvent) => {
    setActive(true);
    onMouseEnter({
      value: data,
      nativeEvent: event
    });
  };

  const onMouseLeaveWrapper = (event: MouseEvent) => {
    setActive(false);

    onMouseLeave({
      value: data,
      nativeEvent: event
    });
  };

  const onMouseClick = (event: MouseEvent) => {
    onClick({
      value: data,
      nativeEvent: event
    });
  };
  const tooltipData = useMemo(
    () => ({
      y: data.value,
      x: `${data.key} ∙ ${data.x}`,
      data
    }),
    [data]
  );

  const transition = useMemo(() => {
    if (animated) {
      return {
        ...DEFAULT_TRANSITION,
        delay: (cellIndex / cellCount) * 0.005
      };
    } else {
      return {
        type: false,
        delay: 0
      };
    }
  }, [animated, cellIndex, cellCount]);

  const extras = constructFunctionProps({ style, className }, data);
  const isTransparent = fill === 'transparent';
  const stroke = active && !isTransparent ? chroma(fill).brighten(1) : fill;

  return (
    <Fragment>
      <g ref={rect}>
        <motion.rect
          {...rest}
          fill={fill}
          stroke={stroke}
          x={x}
          y={y}
          style={{ ...extras.style, cursor }}
          className={classNames(css.cell, extras.className)}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={transition}
          onMouseEnter={onMouseEnterWrapper}
          onMouseLeave={onMouseLeaveWrapper}
          onClick={onMouseClick}
        />
      </g>
      {tooltip && !(tooltip.props as any).disabled && !isTransparent && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={active}
          modifiers={(tooltip.props as any).modifiers || modifiers}
          reference={rect}
          value={tooltipData}
        />
      )}
    </Fragment>
  );
};

HeatmapCell.defaultProps = {
  rx: 2,
  ry: 2,
  cursor: 'auto',
  tooltip: <ChartTooltip />,
  onClick: () => undefined,
  onMouseEnter: () => undefined,
  onMouseLeave: () => undefined
};
