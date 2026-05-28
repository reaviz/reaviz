import React, { FC, ReactElement } from 'react';
import {
  LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisTickLine,
  LinearAxisTickLineProps
} from './LinearAxisTickLine';
import { mergeDefaultProps } from '@/common/utils';
import classNames from 'classnames';
import css from './LinearAxisTickLabel.module.css';

export interface LinearAxisTickLabelProps {
  /**
   * Text content (possibly ellipsized) for the label. Set internally by `LinearAxisTickSeries`.
   */
  text: string;

  /**
   * Original, unellipsized text for the label. Set internally by `LinearAxisTickSeries`.
   */
  fullText: string;

  /**
   * The raw data value for this tick (e.g., Date object, number, string).
   */
  data: any;

  /**
   * Rotation angle of the label in degrees. Set internally by `LinearAxisTickSeries`.
   */
  angle: number;

  /**
   * Orientation of the axis. Set internally by `LinearAxisTickSeries`.
   */
  orientation: 'horizontal' | 'vertical';

  /**
   * Which half of the axis this label belongs to. Set internally by `LinearAxisTickSeries`.
   */
  half: 'start' | 'end' | 'center';

  /**
   * The companion tick line element. Set internally by `LinearAxisTickSeries`.
   */
  line: ReactElement<LinearAxisTickLineProps, typeof LinearAxisTickLine>;

  /**
   * Custom formatter for the label value.
   */
  format?: (v) => any;
  /**
   * Format tooltip title on hover label.
   */
  formatTooltip?: (value: any) => any | string;

  /**
   * Text fill color.
   *
   * @default '#8F979F'
   */
  fill: string;

  /**
   * Font size of the label.
   *
   * @default 11
   */
  fontSize: number;

  /**
   * Font family of the label.
   *
   * @default 'sans-serif'
   */
  fontFamily: string;

  /**
   * Whether to rotate the label.
   *
   * @default true
   */
  rotation: boolean | number;

  /**
   * Padding between the axis and the label.
   *
   * @default 5
   */
  padding: number | { fromAxis: number; alongAxis: number };

  /**
   * Optional override for the text anchor.
   */
  textAnchor?: 'start' | 'end' | 'middle';

  /**
   * Position of the label relative to the tick.
   */
  position: 'start' | 'end' | 'center';

  /**
   * Alignment of the label relative to the axis.
   *
   * @default 'center'
   */
  align: 'start' | 'end' | 'center' | 'inside' | 'outside';

  /**
   * CSS class to apply.
   */
  className?: string;

  /**
   * Click handler for the label.
   */
  onClick?: (event: React.MouseEvent<SVGGElement>, data: any) => void;
}

export const LinearAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => {
  const {
    text,
    fullText,
    data,
    angle,
    orientation,
    half,
    line,
    textAnchor,
    position,
    className,
    fill,
    fontSize,
    fontFamily,
    rotation,
    padding,
    formatTooltip,
    align,
    onClick
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
    if (!line) {
      return [0, 0];
    }

    const lineProps = { ...LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS, ...line.props };
    const size = lineProps.size ?? 3;
    const position = lineProps.position ?? 'center';

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
      textAnchor: (textAnchor || newtextAnchor) as
        | 'start'
        | 'end'
        | 'middle'
        | 'inherit',
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
      className={classNames({
        [css.clickable]: !!onClick
      })}
      onClick={(event) => onClick?.(event, data)}
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
