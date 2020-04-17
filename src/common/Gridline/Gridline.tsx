import React, { PureComponent } from 'react';
import css from './Gridline.module.scss';

export interface GridlineProps {
  /**
   * Height of the line set by the `GridlineSeries`.
   */
  height: number;

  /**
   * Width of the line set by the `GridlineSeries`.
   */
  width: number;

  /**
   * Direction set by the `GridlineSeries`.
   */
  direction: 'all' | 'x' | 'y';

  /**
   * D3 Scale set by `GridlineSeries`.
   */
  scale: any;

  /**
   * SVG Stroke Width Property.
   */
  strokeWidth: number;

  /**
   * SVG Stroke Color Property.
   */
  strokeColor: string;

  /**
   * Data point for the position set by the `GridlineSeries`.
   */
  data: number;

  /**
   * Index set by the `GridlineSeries`.
   */
  index: number;

  /**
   * SVG Stroke Dash Array Property.
   */
  strokeDasharray: string;
}

export class Gridline extends PureComponent<GridlineProps> {
  static defaultProps: Partial<GridlineProps> = {
    strokeWidth: 1,
    direction: 'all',
    strokeColor: 'rgba(153, 153, 153, 0.5)'
  };

  getCoords() {
    const {
      direction,
      data,
      height,
      width,
      scale,
      strokeWidth,
      strokeColor,
      strokeDasharray
    } = this.props;
    const pos = scale(data);

    if (direction === 'x') {
      return {
        x1: pos,
        x2: pos,
        y1: 0,
        y2: height,
        fill: 'none',
        stroke: strokeColor,
        strokeDasharray,
        strokeWidth
      };
    } else {
      return {
        y1: pos,
        y2: pos,
        x1: 0,
        x2: width,
        fill: 'none',
        stroke: strokeColor,
        strokeDasharray,
        strokeWidth
      };
    }
  }

  render() {
    const coords = this.getCoords();
    return <line className={css.gridLine} {...coords} />;
  }
}
