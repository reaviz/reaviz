import React, { FC } from 'react';
import { ChartShallowDataShape } from '../../../common/data';
import { calculateDimensions, formatValue } from '../../../common/utils';
import { motion } from 'framer-motion';

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
   * Positioning for the labels.
   */
  position?: 'top' | 'center' | 'bottom';

  /**
   * Whether to show the value of the data.
   */
  showValue?: boolean;

  /**
   * Whether to always show the label or not.
   */
  alwaysShowLabel?: boolean;
}

export const FunnelAxisLabel: FC<Partial<FunnelAxisLabelProps>> = ({
  data,
  index,
  xScale,
  yScale,
  fontFamily,
  padding,
  fontSize,
  fill,
  className,
  position,
  showValue,
  alwaysShowLabel
}) => {
  const x = xScale(index) + padding;
  const [height] = yScale.range();
  const y = height / 2 + padding;
  const label = data.key as string;
  const nextOffset = xScale(index + 1);
  const width = (nextOffset ? nextOffset - xScale(index) : 0) - padding;
  const size = calculateDimensions(label, fontFamily, fontSize);

  // If the labels don't fit, just hide them
  if (!alwaysShowLabel && size.width > width) {
    return null;
  }

  let transform: string;
  switch (position) {
  case 'top':
    transform = `translate(${x}, ${fontSize * 3})`; // fontSize * 3 is to account for the total height of the label
    break;
  case 'center':
    transform = `translate(${x}, ${y})`;
    break;
  case 'bottom':
    transform = `translate(${x}, ${height - padding})`;
    break;
  }

  return (
    <motion.g
      transform={transform}
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
        {/* text wrapping isn't supported with svg's, so this split allows user to pass in a label with line breaks */}
        {label.split('\n').map((line, index) => (
          <tspan key={index} x="0" dy={`${index === 0 ? 0 : 1}em`}>
            {line}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
};

FunnelAxisLabel.defaultProps = {
  fontSize: 13,
  padding: 10,
  fontFamily: 'sans-serif',
  fill: '#fff',
  position: 'center',
  showValue: true,
  alwaysShowLabel: false
};
