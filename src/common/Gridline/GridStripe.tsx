import React, { PureComponent } from 'react';
import css from './GridStripe.module.scss';

export interface GridStripeProps {
  /**
   * Position set by the `GridlineSeries`.
   */
  position: 'horizontal' | 'vertical';

  /**
   * Stripe fill color.
   */
  fill: string;

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
   * Data point for the position set by the `GridlineSeries`.
   */
  data: number;

  /**
   * Index set by the `GridlineSeries`.
   */
  index: number;
}

export class GridStripe extends PureComponent<GridStripeProps> {
  static defaultProps: Partial<GridStripeProps> = {
    fill: '#2a3138'
  };

  getCoords() {
    const { position, data, height, width, scale, fill, index } = this.props;
    const pos = scale(data);
    const stripeFill = index % 2 ? 'none' : fill;
    const dim = scale.bandwidth();

    if (position === 'vertical') {
      return {
        y: 0,
        x: pos,
        height: height,
        width: dim,
        fill: stripeFill
      };
    } else {
      return {
        y: pos,
        x: 0,
        height: dim,
        width,
        fill: stripeFill
      };
    }
  }

  render() {
    const coords = this.getCoords();
    return <rect className={css.gridStripe} {...coords} />;
  }
}
