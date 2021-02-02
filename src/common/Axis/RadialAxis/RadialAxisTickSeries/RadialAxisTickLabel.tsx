import React, { PureComponent } from 'react';
import { formatValue } from '../../../utils/formatting';

const rad2deg = (angle: number) => (angle * 180) / Math.PI;

export interface RadialAxisTickLabelProps {
  data: any;
  lineSize: number;
  fill: string;
  fontSize: number;
  rotation: number;
  fontFamily: string;
  index: number;
  padding: number;
  point: any;
  autoRotate: boolean;
  format?: (value: any, index: number) => any | string;
}

export class RadialAxisTickLabel extends PureComponent<RadialAxisTickLabelProps> {
  static defaultProps: Partial<RadialAxisTickLabelProps> = {
    fill: '#71808d',
    fontSize: 11,
    padding: 15,
    fontFamily: 'sans-serif',
    autoRotate: true
  };

  getPosition() {
    const { point, autoRotate, rotation, padding } = this.props;

    let textAnchor;
    let transform;

    if (autoRotate) {
      const l = point >= Math.PI;
      const r = point < 2 * Math.PI;

      // TODO: This centers the text, determine better way later
      if (
        (rotation >= 85 && rotation <= 95) ||
        (rotation <= -85 && rotation >= -95)
      ) {
        textAnchor = 'middle';
      } else if (l && r) {
        textAnchor = 'end';
      } else {
        textAnchor = 'start';
      }

      transform = `rotate(${90 - rad2deg(point)}, ${padding}, 0)`;
    } else {
      const shouldRotate = rotation > 100 && rotation;
      const rotate = shouldRotate ? 180 : 0;
      const translate = shouldRotate ? -30 : 0;
      textAnchor = shouldRotate ? 'end' : 'start';
      transform = `rotate(${rotate}) translate(${translate})`;
    }

    return {
      transform,
      textAnchor
    };
  }

  render() {
    const {
      data,
      fill,
      fontFamily,
      fontSize,
      format,
      lineSize,
      index
    } = this.props;
    const text = format ? format(data, index) : formatValue(data);
    const { transform, textAnchor } = this.getPosition();

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
  }
}
