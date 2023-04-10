import React, {
  Component,
  Fragment,
  createRef,
  ReactElement,
  useCallback,
  FC,
  useState,
  useRef
} from 'react';
import bind from 'memoize-bind';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ChartInternalDataTypes } from '../../common/data';
import { CloneElement } from 'rdk';
import { formatValue } from '../../common/utils/formatting';
import { Tooltip, TooltipProps } from 'reablocks';
import { SankeyLabel, SankeyLabelProps } from '../SankeyLabel';
import { Node, DEFAULT_COLOR } from '../utils';
import css from './SankeyNode.module.css';

export interface SankeyNodeProps extends Node {
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
   * Opacity callback for the node.
   */
  opacity: (active: boolean, disabled: boolean) => number;

  /**
   * Whether to show the label or not.
   */
  showLabel: boolean;

  /**
   * CSS styles to apply.
   */
  style?: object;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;

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

export const SankeyNode: FC<SankeyNodeProps> = ({
  active,
  chartWidth,
  label,
  tooltip,
  showLabel,
  title,
  value,
  className,
  color,
  disabled,
  index,
  opacity,
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

  const [hovered, setHovered] = useState<boolean>(false);
  const rectRef = useRef<SVGRectElement | null>(null);

  const renderNode = useCallback(() => {
    const nodeWidth = width || (x1 && x0 && x1 - x0 > 0 ? x1 - x0 : 0);
    const nodeHeight = y1 && y0 && y1 - y0 > 0 ? y1 - y0 : 0;

    return (
      <motion.g ref={rectRef}>
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
            duration: 0.1
          }}
          onClick={onClick}
          onMouseEnter={(event) => {
            setHovered(true);
            onMouseEnter?.(event);
          }}
          onMouseLeave={(event) => {
            setHovered(false);
            onMouseLeave?.(event);
          }}
        />
      </motion.g>
    );
  }, []);

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

  return (
    <Fragment>
      {renderNode()}
      {showLabel && (
        <CloneElement<SankeyLabelProps>
          active={active}
          element={label}
          chartWidth={chartWidth}
          node={node}
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

SankeyNode.defaultProps = {
  active: false,
  animated: true,
  color: DEFAULT_COLOR,
  disabled: false,
  label: <SankeyLabel />,
  opacity: (active, disabled) => (active ? 1 : disabled ? 0.2 : 0.9),
  showLabel: true,
  tooltip: (
    <Tooltip
      followCursor={true}
      modifiers={{
        offset: {
          offset: '0, 5px'
        }
      }}
    />
  )
};
