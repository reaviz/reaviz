import React, { FC, useCallback } from 'react';
import { ChartShallowDataShape } from '@/common/data';
import { calculateDimensions, formatValue, wrapText } from '@/common/utils';
import { motion } from 'motion/react';

export interface FunnelAxisLabelProps {
  /**
   * Data object for the label. Set internally by `FunnelAxis`.
   */
  data: ChartShallowDataShape;

  /**
   * Index of the label. Set internally by `FunnelAxis`.
   */
  index: number;

  /**
   * Color of the text.
   */
  fill: string;

  /**
   * Font size of the text.
   */
  fontSize: number;

  /**
   * Font family of the text.
   */
  fontFamily: string;

  /**
   * Padding of the label.
   */
  padding?: number;

  /**
   * Class name to apply to the text.
   */
  className?: string;

  /**
   * xScale for the funnel. Set internally by `FunnelAxis`.
   */
  xScale: any;

  /**
   * yScale for the funnel. Set internally by `FunnelAxis`.
   */
  yScale: any;

  /**
   * Positioning of the label.
   */
  position?: 'top' | 'middle' | 'bottom';

  /**
   * Whether to show the value of the data.
   * Defaults to `true`.
   */
  showValue?: boolean;

  /**
   * Visibility of the label.
   */
  labelVisibility?: 'auto' | 'always';
}

export const FunnelAxisLabel: FC<Partial<FunnelAxisLabelProps>> = ({
  data,
  index,
  xScale,
  yScale,
  fontFamily = 'sans-serif',
  padding = 10,
  fontSize = 13,
  fill = '#fff',
  className,
  position = 'middle',
  showValue = true,
  labelVisibility = 'auto'
}) => {
  const x = xScale(index) + padding;
  const [height] = yScale.range();
  const y = height / 2 + padding;
  const label = data.key as string;
  const nextOffset = xScale(index + 1);
  const width = (nextOffset ? nextOffset - xScale(index) : 0) - padding;
  const size = calculateDimensions(label, fontFamily, fontSize);
  const text = wrapText({
    key: label,
    size,
    paddingY: padding,
    paddingX: padding,
    width,
    height,
    fontFamily,
    fontSize,
    visibility: labelVisibility
  });

  const getTransformString = useCallback(() => {
    let transform: string;

    switch (position) {
    case 'top':
      transform = `translate(${x}, ${fontSize * 3})`; // fontSize * 3 is to account for the total height of the label
      break;
    case 'middle':
      transform = `translate(${x}, ${y})`;
      break;
    case 'bottom':
      {
        // If the text is wrapping, we need to account for the height of all the lines
        const textWrapHeight = Array.isArray(text)
          ? text.slice(1).reduce((acc, curr) => acc + curr.props.dy, 0) // Don't include first line's dy in order to align properly
          : 0;
        transform = `translate(${x}, ${height - padding - textWrapHeight})`;
      }
      break;
    }

    return transform;
  }, [position, x, fontSize, y, text, height, padding]);

  // If the labels don't fit, just hide them
  if (labelVisibility !== 'always' && size.width > width) {
    return null;
  }

  return (
    <motion.g
      transform={getTransformString()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {showValue && (
        <text
          pointerEvents="none"
          fill={fill}
          y={-(fontSize + padding)}
          className={className}
          dominantBaseline="middle"
          fontFamily={fontFamily}
          fontSize={fontSize * 2}
        >
          {formatValue(data.data as any)}
        </text>
      )}
      <text
        pointerEvents="none"
        fill={fill}
        className={className}
        dominantBaseline="middle"
        fontFamily={fontFamily}
        fontSize={fontSize}
      >
        {text}
      </text>
    </motion.g>
  );
};
