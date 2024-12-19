import React, {
  FC,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
import { arc } from 'd3-shape';
import { getAriaLabel } from '@/common/utils/formatting';
import { motion } from 'framer-motion';
import { ChartTooltip, ChartTooltipProps } from '@/common/Tooltip';
import { CloneElement } from 'reablocks';
import { useHoverIntent } from '@/common/utils/useHoverIntent';
import { Gradient, GradientProps } from '@/common/Gradient';
import chroma from 'chroma-js';
import { useInterpolate } from './useInterpolate';

export interface SunburstArcProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * Radius of the chart. Set internally by `SunburstChart`.
   */
  radius: number;

  /**
   * The internal data object built by d3
   */
  data: any;

  /**
   * Fill color for the arc.
   */
  fill: string;

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Cursor for the element.
   */
  cursor?: string;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Gradient shades for the bar.
   */
  gradient?: ReactElement<GradientProps, typeof Gradient> | null;

  /**
   * The onClick handler for the arc.
   */
  onClick?: (event: React.MouseEvent, data: any) => void;

  /**
   * Event for when the arc has mouse enter.
   */
  onMouseEnter?: (event, data) => void;

  /**
   * Event for when the arc has mouse leave.
   */
  onMouseLeave?: (event, data) => void;
}

export const SunburstArc: FC<Partial<SunburstArcProps>> = ({
  id,
  radius,
  fill,
  data,
  cursor = 'pointer',
  tooltip = <ChartTooltip />,
  animated,
  gradient,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const [internalActive, setInternalActive] = useState<boolean>(false);
  const arcRef = useRef<any | null>(null);

  const getPath = useCallback(
    (item) => {
      return arc()
        .startAngle((d: any) => d.x0)
        .endAngle((d: any) => d.x1)
        .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius / 2)
        .innerRadius((d: any) => d.y0)
        .outerRadius((d: any) => d.y1 - 1)(item);
    },
    [radius]
  );

  const p = data.parent || { x0: 0, x1: 0, y0: 0, y1: 0 };
  const initial = getPath({
    x0: ((data.x0 - p.x0) / (p.x1 - p.x0)) * 2 * Math.PI,
    x1: ((data.x1 - p.x0) / (p.x1 - p.x0)) * 2 * Math.PI,
    y0: 0,
    y1: 0
  });
  const animate = getPath(data);
  const ariaLabelData = getAriaLabel(data.data);

  const { pointerOut, pointerOver } = useHoverIntent({
    onPointerOver: (event) => {
      setInternalActive(true);
      onMouseEnter?.(event, data);
    },
    onPointerOut: (event) => {
      setInternalActive(false);
      onMouseLeave?.(event, data);
    }
  });

  const tooltipLabel = useMemo(() => {
    const getKey = (node): string[] => {
      if (!node.parent) {
        return [];
      }
      return [...getKey(node.parent), node.data.key];
    };
    return getKey(data).join(' → ');
  }, [data]);

  const tooltipData = useMemo(
    () => ({ y: data.value, x: tooltipLabel }),
    [data, tooltipLabel]
  );

  const currentFill = useMemo(
    () => (internalActive ? chroma(fill).brighten(0.5).hex() : fill),
    [fill, internalActive]
  );

  const pathFill = gradient ? `url(#gradient-${id})` : currentFill;

  const { transition, d } = useInterpolate({
    animated,
    path: animate,
    initial
  });

  return (
    <g
      ref={arcRef}
      tabIndex={0}
      aria-label={ariaLabelData}
      role="graphics-document"
    >
      <motion.path
        id={id}
        fill={pathFill}
        d={d}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        role="graphics-symbol"
        tabIndex={0}
        style={{ cursor }}
        transition={transition}
        aria-label={ariaLabelData}
        onClick={(event) => onClick?.(event, data)}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
      />
      {gradient && (
        <CloneElement<GradientProps>
          element={gradient}
          id={`gradient-${id}`}
          direction="vertical"
          color={currentFill}
        />
      )}
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!internalActive}
          reference={arcRef}
          value={tooltipData}
        />
      )}
    </g>
  );
};
