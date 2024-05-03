import React, { FC, SVGTextElementAttributes, useMemo } from 'react';
import { formatValue } from '../../../utils/formatting';

const rad2deg = (angle: number) => (angle * 180) / Math.PI;

export interface RadialAxisTickLabelProps
  extends Omit<SVGTextElementAttributes<SVGTextElement>, 'format'> {
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
   * Format tooltip title on hover label.
   */
  formatTooltip?: (value: any, index: number) => any | string;
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
  formatTooltip,
  ...rest
}) => {
  const { transform, textAnchor } = useMemo(() => {
    let textAnchor;
    let transform;

    if (autoRotate) {
      // TODO: This centers the text, determine better way later
      if (
        (rotation >= 85 && rotation <= 95) ||
        (rotation <= -85 && rotation >= -95) ||
        (rotation >= 265 && rotation <= 275) ||
        (rotation <= -265 && rotation >= -275)
      ) {
        textAnchor = 'middle';
      } else if (
        (rotation < -85 && rotation > -265) ||
        (rotation > 95 && rotation < 265)
      ) {
        textAnchor = 'end';
      } else {
        textAnchor = 'start';
      }

      transform = `rotate(${90 - rad2deg(point)}, ${padding}, 0)`;
    } else {
      const shouldRotate = rotation && (rotation > 100 || rotation < -100);
      const rotate = shouldRotate ? 180 : 0;
      const translate = shouldRotate ? -30 : 0;
      textAnchor = shouldRotate ? 'end' : 'start';
      transform = `rotate(${rotate}) translate(${translate})`;
    }

    return {
      transform,
      textAnchor
    };
  }, [autoRotate, padding, point, rotation]);

  const text = format ? format(data, index) : formatValue(data);
  const titleHover = formatTooltip ? formatTooltip(data, index) : text;

  return (
    <g transform={transform}>
      <title>{titleHover}</title>
      <text
        dy="0.35em"
        x={lineSize + 5}
        textAnchor={textAnchor}
        fill={fill}
        fontFamily={fontFamily}
        fontSize={fontSize}
        {...rest}
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
