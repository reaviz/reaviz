import React, {
  Fragment,
  ReactElement,
  useCallback,
  useState,
  useMemo,
  useRef,
  FC
} from 'react';
import { offset } from '@floating-ui/dom';
import classNames from 'classnames';
import { motion } from 'motion/react';
import { sankeyLinkHorizontal } from 'd3-sankey';
import { CloneElement } from 'reablocks';
import { formatValue } from '@/common/utils/formatting';
import { Tooltip, TooltipProps } from 'reablocks';
import {
  NodeExtra,
  SankeyNodeExtra,
  SankeyLinkExtra,
  DEFAULT_COLOR
} from '@/Sankey/utils';
import css from './SankeyLink.module.css';
import { useHoverIntent } from '@/common/utils/useHoverIntent';
import { tooltipTheme } from '@/common';

export interface SankeyLinkProps extends SankeyLinkExtra {
  /**
   * Color of the link.
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
  tooltip?: ReactElement<TooltipProps, typeof Tooltip> | null;

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
  gradient = true,
  index,
  source,
  target,
  tooltip = (
    <Tooltip theme={tooltipTheme} followCursor={true} modifiers={[offset(5)]} />
  ),
  chartId,
  value,
  active = false,
  animated = true,
  className,
  disabled = false,
  opacity = (active, disabled) => (active ? 0.5 : disabled ? 0.1 : 0.35),
  style,
  width = 0,
  color,
  y0,
  y1,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const linkSource = source as SankeyNodeExtra;
  const linkTarget = target as SankeyNodeExtra;

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
    () =>
      `${(source as NodeExtra).title} → ${
        (target as NodeExtra).title
      }: ${formatValue(value)}`,
    [source, target, value]
  );

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
            duration: animated ? 0.5 : 0
          }}
          stroke={stroke}
          strokeOpacity={opacity(active, disabled)}
          onClick={onClick}
          onPointerOver={pointerOver}
          onPointerOut={pointerOut}
          aria-label={ariaLabelData}
          role="graphics-document"
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
