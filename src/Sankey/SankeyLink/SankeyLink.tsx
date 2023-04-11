import React, {
  Fragment,
  ReactElement,
  useCallback,
  useState,
  useMemo,
  useRef,
  FC
} from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { sankeyLinkHorizontal } from 'd3-sankey';
import { CloneElement } from 'rdk';
import { formatValue } from '../../common/utils/formatting';
import { Tooltip, TooltipProps } from 'reablocks';
import { NodeExtra, Node, Link, DEFAULT_COLOR } from '../utils';
import css from './SankeyLink.module.css';

export interface SankeyLinkProps extends Link {
  /**
   * Whether the element is active or not. Set internally by `Sankey`.
   */
  active: boolean;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Id of Sankey chart. Set internally by `Sankey`.
   */
  chartId: string;

  /**
   * CSS class to apply.
   */
  className?: string;

  /**
   * Whether the node is disabled. Set internally by `Sankey`.
   */
  disabled: boolean;

  /**
   * Whether to use gradient or not.
   */
  gradient?: boolean;

  /**
   * Opacity callback for the link.
   */
  opacity: (active: boolean, disabled: boolean) => number;

  /**
   * CSS styles to apply.
   */
  style?: object;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;

  /**
   * Width of the link. Set internally by `Sankey`.
   */
  width: number;

  /**
   * Event for when the link is clicked.
   */
  onClick?: (event: React.MouseEvent<SVGPathElement>) => void;

  /**
   * Event for when the link has mouse enter.
   */
  onMouseEnter?: (event: React.MouseEvent<SVGPathElement>) => void;

  /**
   * Event for when the link has mouse leave.
   */
  onMouseLeave?: (event: React.MouseEvent<SVGPathElement>) => void;
}

export const SankeyLink: FC<Partial<SankeyLinkProps>> = ({
  gradient,
  index,
  source,
  target,
  tooltip,
  chartId,
  value,
  active,
  className,
  disabled,
  opacity,
  style,
  width,
  color,
  y0,
  y1,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const linkSource = source as Node;
  const linkTarget = target as Node;

  const [hovered, setHovered] = useState<boolean>(false);
  const linkRef = useRef<SVGPathElement | null>(null);

  const getLink = useCallback(() => {
    return { index, y0, y1, value, width, source, target };
  }, [index, source, target, value, width, y0, y1]);

  const stroke = useMemo(() => {
    if (gradient) {
      return `url(#${chartId}-gradient-${index})`;
    } else if (color) {
      return color;
    }

    return DEFAULT_COLOR;
  }, [chartId, gradient, index, color]);

  const enterProps = useMemo(() => {
    const path = sankeyLinkHorizontal();
    const d = path(getLink()) as string;
    const strokeWidth = Math.max(1, width);
    return { d, strokeWidth };
  }, [getLink, width]);

  const exitProps = useMemo(() => {
    const path = sankeyLinkHorizontal();
    const d = path({ ...getLink(), width: 0 }) as string;
    return { d, strokeWidth: 0 };
  }, [getLink]);

  const renderTooltipContent = useCallback(() => {
    return (
      <div className={css.tooltip}>
        <div className={css.tooltipLabel}>
          {`${(source as NodeExtra).title} → ${(target as NodeExtra).title}`}
        </div>
        <div className={css.tooltipValue}>{formatValue(value)}</div>
      </div>
    );
  }, [source, target, value]);

  return (
    <Fragment>
      {gradient && (
        <linearGradient
          id={`${chartId}-gradient-${index}`}
          gradientUnits="userSpaceOnUse"
          x1={linkSource.x1}
          x2={linkTarget.x0}
        >
          <stop offset="0%" stopColor={linkSource.color} />
          <stop offset="100%" stopColor={linkTarget.color} />
        </linearGradient>
      )}
      <g ref={linkRef}>
        <motion.path
          key={`sankey-link-${enterProps.d}-${index}`}
          className={classNames(css.link, className)}
          style={style}
          initial={exitProps}
          animate={enterProps}
          exit={exitProps}
          transition={{
            duration: 0.5
          }}
          stroke={stroke}
          strokeOpacity={opacity(active, disabled)}
          onClick={onClick}
          onMouseEnter={(event: React.MouseEvent<SVGPathElement>) => {
            setHovered(true);
            onMouseEnter?.(event);
          }}
          onMouseLeave={(event: React.MouseEvent<SVGPathElement>) => {
            setHovered(false);
            onMouseLeave?.(event);
          }}
        />
      </g>
      {!tooltip?.props?.disabled && (
        <CloneElement<TooltipProps>
          content={renderTooltipContent}
          element={tooltip}
          visible={hovered}
          reference={linkRef}
        />
      )}
    </Fragment>
  );
};

SankeyLink.defaultProps = {
  active: false,
  animated: true,
  disabled: false,
  gradient: true,
  opacity: (active, disabled) => (active ? 0.5 : disabled ? 0.1 : 0.35),
  tooltip: (
    <Tooltip
      followCursor={true}
      modifiers={{
        offset: {
          offset: '0, 5px'
        }
      }}
    />
  ),
  width: 0
};
