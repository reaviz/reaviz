import React, { Component, ReactElement } from 'react';
import {
  LinearAxisTickLine,
  LinearAxisTickLineProps
} from './LinearAxisTickLine';

export interface LinearAxisTickLabelProps {
  text: string;
  fullText: string;
  angle: number;
  orientation: 'horizontal' | 'vertical';
  half: 'start' | 'end' | 'center';
  line: ReactElement<LinearAxisTickLineProps, typeof LinearAxisTickLine>;
  format?: (v) => any;
  fill: string;
  fontSize: number;
  fontFamily: string;
  rotation: boolean | number;
  padding: number | { fromAxis: number; alongAxis: number };
  textAnchor?: 'start' | 'end' | 'middle';
  position: 'start' | 'end' | 'center';
  align: 'start' | 'end' | 'center' | 'inside' | 'outside';
  className?: any;
}

export class LinearAxisTickLabel extends Component<LinearAxisTickLabelProps> {
  static defaultProps: Partial<LinearAxisTickLabelProps> = {
    fill: '#8F979F',
    fontSize: 11,
    fontFamily: 'sans-serif',
    rotation: true,
    padding: 0,
    align: 'center'
  };

  getAlign() {
    const { align, half } = this.props;

    if ((align === 'inside' || align === 'outside') && half === 'center') {
      return 'center';
    }

    if (align === 'inside') {
      return half === 'start' ? 'end' : 'start';
    }

    if (align === 'outside') {
      return half === 'start' ? 'start' : 'end';
    }

    return align;
  }

  getTickLineSpacing() {
    const { line } = this.props;
    if (!line) {
      return [0, 0];
    }

    const size = line.props.size;
    const position = line.props.position;

    if (position === 'start') {
      return [size * -1, 0];
    } else if (position === 'end') {
      return [0, size];
    } else {
      return [size * -0.5, size * 0.5];
    }
  }

  getOffset() {
    const { padding, position, rotation, orientation } = this.props;

    const adjustedPadding =
      typeof padding === 'number'
        ? {
          fromAxis: padding as number,
          alongAxis: padding as number
        }
        : (padding as { fromAxis: number; alongAxis: number });

    const spacing = this.getTickLineSpacing();
    const offset1 =
      position === 'start'
        ? spacing[0] - adjustedPadding.fromAxis
        : position === 'end'
          ? spacing[1] + adjustedPadding.fromAxis
          : 0;

    const align = this.getAlign();
    let offset2 = rotation === true ? -5 : 0;
    offset2 +=
      align === 'center'
        ? 0
        : align === 'start'
          ? -adjustedPadding.alongAxis
          : adjustedPadding.alongAxis;

    const horz = orientation === 'horizontal';
    return {
      [horz ? 'x' : 'y']: offset2,
      [horz ? 'y' : 'x']: offset1
    };
  }

  getTextPosition() {
    const { angle, orientation, position } = this.props;
    let transform = '';
    let textAnchor = '';
    let alignmentBaseline = 'middle' as 'middle' | 'baseline' | 'hanging';

    if (angle !== 0) {
      transform = `rotate(${angle})`;
      textAnchor = 'end';
    } else {
      const align = this.getAlign();
      if (orientation === 'horizontal') {
        textAnchor =
          align === 'center' ? 'middle' : align === 'start' ? 'end' : 'start';
        if (position === 'start') {
          alignmentBaseline = 'baseline';
        } else if (position === 'end') {
          alignmentBaseline = 'hanging';
        }
      } else {
        alignmentBaseline =
          align === 'center'
            ? 'middle'
            : align === 'start'
              ? 'baseline'
              : 'hanging';
        if (position === 'start') {
          textAnchor = 'end';
        } else if (position === 'end') {
          textAnchor = 'start';
        } else {
          textAnchor = 'middle';
        }
      }
    }

    return {
      transform,
      textAnchor: this.props.textAnchor || textAnchor,
      alignmentBaseline
    };
  }

  render() {
    const {
      fill,
      text,
      fullText,
      fontSize,
      fontFamily,
      className
    } = this.props;
    const { x, y } = this.getOffset();
    const textPosition = this.getTextPosition();

    return (
      <g
        transform={`translate(${x}, ${y})`}
        fontSize={fontSize}
        fontFamily={fontFamily}
      >
        <title>{fullText}</title>
        <text {...textPosition} fill={fill} className={className}>
          {text}
        </text>
      </g>
    );
  }
}
