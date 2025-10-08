import React, {
  Fragment,
  ReactElement,
  useCallback,
  FC,
  useState,
  useRef,
  useMemo
} from 'react';
import { offset } from '@floating-ui/dom';
import classNames from 'classnames';
import { motion } from 'motion/react';
import { ChartInternalDataTypes } from '@/common/data';
import { CloneElement } from 'reablocks';
import { formatValue } from '@/common/utils/formatting';
import { Tooltip, TooltipProps } from 'reablocks';
import {
  SankeyLabel,
  SankeyLabelPosition,
  SankeyLabelProps
} from '@/Sankey/SankeyLabel';
import { SankeyNodeExtra, DEFAULT_COLOR } from '@/Sankey/utils';
import css from './SankeyNode.module.css';
import { useHoverIntent } from '@/common/utils/useHoverIntent';
import { tooltipTheme } from '@/common';

export interface SankeyNodeProps extends SankeyNodeExtra {
  /**
   * ID of the node. If not provided, the node's index will be used.
   */
  id?: string;

  /**
   * Title of the node.
   */
  title: string;

  /**
   * Color of the node.
   */
  color?: string;

  /**
   * Whether the element is active or not. Set internally by `Sankey`.
   */
  active: boolean;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Width of the chart. Set internally by `Sankey`.
   */
  chartWidth?: number;

  /**
   * CSS class to apply.
   */
  className?: string;

  /**
   * Whether the node is disabled. Set internally by `Sankey`.
   */
  disabled: boolean;

  /**
   * Label element.
   */
  label: ReactElement<SankeyLabelProps, typeof SankeyLabel>;

  /**
   * Label position. Set internally by `Sankey`.
   */
  labelPosition?: SankeyLabelPosition;

  /**
   * Percentage of total width occupied by labels on
   * either side of the graph inside the container.
   * Set internally by `Sankey`.
   */
  labelPadding?: number;

  /**
   * Opacity callback for the node.
   */
  opacity: (active: boolean, disabled: boolean) => number;

  /**
   * CSS styles to apply.
   */
  style?: React.StyleHTMLAttributes<SVGRectElement>;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<TooltipProps, typeof Tooltip> | null;

  /**
   * Width of the node. Set internally by `Sankey`.
   */
  width?: number;

  /**
   * Event for when the node is clicked.
   */
  onClick?: (event: React.MouseEvent<SVGRectElement>) => void;

  /**
   * Event for when the node has mouse enter.
   */
  onMouseEnter?: (event: React.MouseEvent<SVGRectElement>) => void;

  /**
   * Event for when the node has mouse leave.
   */
  onMouseLeave?: (event: React.MouseEvent<SVGRectElement>) => void;
}

export const SankeyNode: FC<Partial<SankeyNodeProps>> = ({
  active = false,
  animated = true,
  chartWidth,
  label = <SankeyLabel />,
  labelPosition,
  labelPadding,
  tooltip = (
    <Tooltip theme={tooltipTheme} followCursor={true} modifiers={[offset(5)]} />
  ),
  title,
  value,
  className,
  color = DEFAULT_COLOR,
  disabled = false,
  index,
  opacity = (active, disabled) => (active ? 1 : disabled ? 0.2 : 0.9),
  style,
  width,
  x0,
  x1,
  y0,
  y1,
  id,
  sourceLinks,
  targetLinks,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const node = {
    id,
    title,
    color,
    sourceLinks,
    targetLinks,
    value,
    index,
    x0,
    x1,
    y0,
    y1
  };
  const nodeWidth = width || (x1 && x0 && x1 - x0 > 0 ? x1 - x0 : 0);
  const nodeHeight = y1 && y0 && y1 - y0 > 0 ? y1 - y0 : 0;

  const [hovered, setHovered] = useState<boolean>(false);
  const rectRef = useRef<SVGRectElement | null>(null);

  const renderTooltipContent = useCallback(() => {
    return (
      <div className={css.tooltip}>
        <div className={css.tooltipLabel}>{title}</div>
        <div className={css.tooltipValue}>
          {formatValue(value as ChartInternalDataTypes)}
        </div>
      </div>
    );
  }, [title, value]);

  const { pointerOut, pointerOver } = useHoverIntent({
    onPointerOver: (event) => {
      setHovered(true);
      onMouseEnter?.(event as any);
    },
    onPointerOut: (event) => {
      setHovered(false);
      onMouseLeave?.(event as any);
    }
  });

  const ariaLabelData = useMemo(
    () => `${title}: ${formatValue(value as ChartInternalDataTypes)}`,
    [title, value]
  );

  return (
    <Fragment>
      <motion.g
        ref={rectRef}
        tabIndex={0}
        aria-label={ariaLabelData}
        role="graphics-document"
      >
        <motion.rect
          key={`sankey-node-${x0}-${x1}-${y0}-${y1}-${index}`}
          className={classNames(css.node, className)}
          fillOpacity={opacity(active, disabled)}
          style={style}
          width={nodeWidth}
          height={nodeHeight}
          fill={color}
          initial={{
            opacity: 0,
            attrX: x0,
            attrY: y0
          }}
          animate={{
            opacity: 1,
            attrX: x0,
            attrY: y0
          }}
          exit={{
            opacity: 0,
            attrX: x0,
            attrY: y0
          }}
          transition={{
            duration: animated ? 0.1 : 0
          }}
          onClick={onClick}
          onPointerOver={pointerOver}
          onPointerOut={pointerOut}
        />
      </motion.g>
      {label !== null && (
        <CloneElement<SankeyLabelProps>
          active={active}
          element={label}
          disabled={disabled}
          chartWidth={chartWidth}
          nodeWidth={nodeWidth}
          node={node}
          position={labelPosition}
          labelPadding={labelPadding}
        />
      )}
      {!tooltip?.props?.disabled && (
        <CloneElement<TooltipProps>
          content={renderTooltipContent}
          element={tooltip}
          visible={hovered}
          reference={rectRef}
        />
      )}
    </Fragment>
  );
};
