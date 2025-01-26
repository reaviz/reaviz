import React, { FC, ReactElement } from 'react';
import {
  LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisTickLine,
  LinearAxisTickLineProps
} from './LinearAxisTickLine';
import { mergeDefaultProps } from '@/common/utils';

export interface LinearAxisTickLabelProps {
  text: string;
  fullText: string;
  angle: number;
  orientation: 'horizontal' | 'vertical';
  half: 'start' | 'end' | 'center';
  // line: ReactElement<LinearAxisTickLineProps, typeof LinearAxisTickLine>;
  lineSize?: number;
  linePosition?: 'start' | 'end' | 'center';
  format?: (v) => any;
  /**
   * Format tooltip title on hover label.
   */
  formatTooltip?: (value: any) => any | string;
  fill: string;
  fontSize: number;
  fontFamily: string;
  rotation: boolean | number;
  padding: number | { fromAxis: number; alongAxis: number };
  textAnchor?: 'start' | 'end' | 'middle';
  position: 'start' | 'end' | 'center';
  align: 'start' | 'end' | 'center' | 'inside' | 'outside';
  className?: string;
}

export const LinearAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => {
  const {
    text,
    fullText,
    angle,
    orientation,
    half,
    // line,
    lineSize,
    linePosition,
    textAnchor,
    position,
    className,
    fill,
    fontSize,
    fontFamily,
    rotation,
    padding,
    formatTooltip,
    align
  } = mergeDefaultProps(LINEAR_AXIS_TICK_LABEL_DEFAULT_PROPS, props);

  function getAlign() {
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

  // bug in this function - spacing is NA
  function getTickLineSpacing() {
    if (!lineSize && !linePosition) {
      return [0, 0];
    }

    const size = lineSize ?? 3;
    const position = linePosition ?? 'center';

    if (position === 'start') {
      return [size * -1, 0];
    } else if (position === 'end') {
      return [0, size];
    } else {
      return [size * -0.5, size * 0.5];
    }
  }

  function getOffset() {
    const adjustedPadding =
      typeof padding === 'number'
        ? { fromAxis: padding, alongAxis: padding }
        : padding;

    const spacing = getTickLineSpacing();
    const offset1 =
      position === 'start'
        ? spacing[0] - adjustedPadding.fromAxis
        : position === 'end'
          ? spacing[1] + adjustedPadding.fromAxis
          : 0;

    const align = getAlign();
    let offset2 = 0;
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

  function getTextPosition() {
    let transform = '';
    let newtextAnchor = '';
    let alignmentBaseline = 'middle' as 'middle' | 'baseline' | 'hanging';

    if (angle !== 0) {
      transform = `rotate(${angle})`;
      newtextAnchor = 'end';
    } else {
      const align = getAlign();
      if (orientation === 'horizontal') {
        newtextAnchor =
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
          newtextAnchor = 'end';
        } else if (position === 'end') {
          newtextAnchor = 'start';
        } else {
          newtextAnchor = 'middle';
        }
      }
    }

    return {
      transform,
      textAnchor: textAnchor || newtextAnchor,
      alignmentBaseline
    };
  }

  const { x, y } = getOffset();
  const textPosition = getTextPosition();
  const titleHover =
    typeof formatTooltip === 'function' ? formatTooltip(fullText) : fullText;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      fontSize={fontSize}
      fontFamily={fontFamily}
    >
      <title>{titleHover}</title>
      <text {...textPosition} fill={fill} className={className}>
        {text}
      </text>
    </g>
  );
};

export const LINEAR_AXIS_TICK_LABEL_DEFAULT_PROPS: Partial<LinearAxisTickLabelProps> =
  {
    fill: '#8F979F',
    fontSize: 11,
    fontFamily: 'sans-serif',
    rotation: true,
    padding: 5,
    align: 'center'
  };
