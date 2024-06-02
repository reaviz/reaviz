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
  cursor,
  arc: arcComponent,
  label,
  tooltip,
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
        .padRadius(radius * 1.5)
        .innerRadius((d: any) => d.y0 * radius)
        .outerRadius((d: any) => Math.max(d.y0 * radius, d.y1 * radius - 1))(
          item
        );
    },
    [radius]
  );

  const initial = getPath({
    x0: data.x0, //Math.max(0, Math.min(1, (data.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
    x1: data.x1, //Math.max(0, Math.min(1, (data.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
    y0: data.y0, //Math.max(0, data.y0 - p.depth),
    y1: 0 //Math.max(0, data.y1 - p.depth)
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

  const fillId = gradient ? `gradient-${id}` : fill;

  return (
    <g
      ref={arcRef}
      tabIndex={0}
      aria-label={ariaLabelData}
      role="graphics-document"
    >
      <motion.path
        id={id}
        fill={fillId}
        d={initial}
        initial={{ d: initial, opacity: 0 }}
        animate={{ d: animate, opacity: 1 }}
        role="graphics-symbol"
        tabIndex={0}
        style={{ cursor }}
        aria-label={ariaLabelData}
        onClick={(event) => onClick?.(event, data)}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
      />
      {gradient && (
        <CloneElement<GradientProps>
          element={gradient}
          id={`gradient-${id}`}
          direction="horizontal"
          color={fill}
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

SunburstArc.defaultProps = {
  cursor: 'pointer',
  tooltip: <ChartTooltip />
};
