import React, {
  FC,
  ReactElement,
  useRef,
  useState,
  Fragment,
  useMemo
} from 'react';
import { motion } from 'framer-motion';
import chroma from 'chroma-js';
import { ChartTooltip, ChartTooltipProps } from '@/common/Tooltip';
import { CloneElement } from 'reablocks';
import { DEFAULT_TRANSITION } from '@/common/Motion';
import { useHoverIntent } from '@/common/utils/useHoverIntent';
import { getAriaLabel } from '@/common';

export interface TreeMapRectProps {
  /**
   * The internal data object built by d3
   */
  data: any;

  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * Fill for the rect.
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
   * Event for when the arc is clicked.
   */
  onClick?: (event, data) => void;

  /**
   * Event for when the arc has mouse enter.
   */
  onMouseEnter?: (event, data) => void;

  /**
   * Event for when the arc has mouse leave.
   */
  onMouseLeave?: (event, data) => void;
}

export const TreeMapRect: FC<Partial<TreeMapRectProps>> = ({
  data,
  fill,
  animated,
  cursor = 'pointer',
  tooltip = <ChartTooltip />,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const [internalActive, setInternalActive] = useState<boolean>(false);
  const rectRef = useRef<any | null>(null);
  const transition = animated ? DEFAULT_TRANSITION : { type: false, delay: 0 };
  const currentFill = internalActive ? chroma(fill).darken(0.8).hex() : fill;

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
  const ariaLabelData = useMemo(() => getAriaLabel(tooltipData), [tooltipData]);

  return (
    <Fragment>
      <motion.rect
        ref={rectRef}
        initial={{
          fill: currentFill,
          width: data.x1 - data.x0,
          height: data.y1 - data.y0
        }}
        animate={{
          fill: currentFill,
          width: data.x1 - data.x0,
          height: data.y1 - data.y0
        }}
        style={{ cursor }}
        transition={transition}
        onClick={(event) => {
          onClick?.(event, data);
        }}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        tabIndex={0}
        aria-label={ariaLabelData}
        role="graphics-document"
      />
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!internalActive}
          reference={rectRef}
          value={tooltipData}
        />
      )}
    </Fragment>
  );
};
