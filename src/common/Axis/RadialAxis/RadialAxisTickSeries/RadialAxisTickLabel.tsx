import React, { FC, useMemo } from 'react';
import { formatValue } from '../../../utils/formatting';

const rad2deg = (angle: number) => (angle * 180) / Math.PI;

export interface RadialAxisTickLabelProps {
  /**
   * Data to render.
   */
  data: any;

  /**
   * Size of the line.
   */
  lineSize: number;

  /**
   * Color of the text.
   */
  fill: string;

  /**
   * Font size of the text.
   */
  fontSize: number;

  /**
   * Rotation of the text.
   */
  rotation: number;

  /**
   * Font family of the text.
   */
  fontFamily: string;

  /**
   * Index of the tick.
   */
  index: number;

  /**
   * Padding of the tick.
   */
  padding: number;

  /**
   * Point of the tick.
   */
  point: any;

  /**
   * Auto rotate the text.
   */
  autoRotate: boolean;

  /**
   * Format of the label.
   */
  format?: (value: any, index: number) => any | string;

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
}

export const RadialAxisTickLabel: FC<Partial<RadialAxisTickLabelProps>> = ({
  point,
  autoRotate,
  rotation,
  padding,
  data,
  fill,
  fontFamily,
  fontSize,
  format,
  lineSize,
  index,
  startAngle,
  endAngle
}) => {
 
  const range = Math.abs(endAngle - startAngle);
  const isFullCircle = Math.abs(range) >= 2 * Math.PI;
  const rotationFactor = isFullCircle || (range < Math.PI) ? 1 : (Math.PI/range);

  const { transform, textAnchor } = useMemo(() => {
    let textAnchor;
    let transform;

    if (autoRotate) {
      const l = point >= Math.PI;
      const r = point < (rotationFactor * Math.PI);

      // TODO: This centers the text, determine better way later
      if (
        (rotation >= (85/rotationFactor) && rotation <= (95/rotationFactor)) ||
        (rotation <= (-85/rotationFactor) && rotation >= (-95/rotationFactor))
      ) {
        textAnchor = 'middle';
      } else if (l && r) {
        textAnchor = 'end';
      } else {
        textAnchor = 'start';
      }

      transform = `rotate(${(rotationFactor*90) - rad2deg(point)}, ${rotationFactor*padding}, 0)`;
    } else {
      const shouldRotate = rotation && (rotation > 100 || rotation < -100 );
      const rotate = shouldRotate ? 180 : 0;
      const translate = shouldRotate ? -30 : 0;
      textAnchor = shouldRotate ? 'end' : 'start';
      transform = `rotate(${rotate}) translate(${translate})`;
    }

    return {
      transform,
      textAnchor
    };
  }, [autoRotate, padding, point, rotation, rotationFactor]);

  const text = format ? format(data, index) : formatValue(data);

  return (
    <g transform={transform}>
      <title>{text}</title>
      <text
        dy="0.35em"
        x={lineSize + 5}
        textAnchor={textAnchor}
        fill={fill}
        fontFamily={fontFamily}
        fontSize={fontSize}
      >
        {text}
      </text>
    </g>
  );
};

RadialAxisTickLabel.defaultProps = {
  fill: '#71808d',
  fontSize: 11,
  padding: 15,
  fontFamily: 'sans-serif',
  autoRotate: true,
  startAngle: 0,
  endAngle: 2 * Math.PI
};
