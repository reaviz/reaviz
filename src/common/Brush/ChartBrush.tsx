import React, { Component } from 'react';
import bind from 'memoize-bind';
import { BrushConfiguration, Brush } from './Brush';
import { BrushChangeEvent } from './BrushSlice';

export interface ChartBrushProps extends BrushConfiguration {
  scale: any;
  height: number;
  width: number;
  children: any;
}

export class ChartBrush extends Component<ChartBrushProps, {}> {
  static defaultProps: Partial<ChartBrushProps> = {};

  getBrushOffset() {
    let start;
    let end;

    const { disabled, domain, scale } = this.props;
    if (!disabled && domain) {
      start = scale(domain[0]);
      end = scale(domain[1]);
    }

    return { start, end };
  }

  onBrushChange(event: BrushChangeEvent) {
    const { onBrushChange, scale, width } = this.props;

    if (onBrushChange) {
      let domain;

      if (
        event.start !== undefined &&
        event.end !== undefined &&
        (event.start !== 0 || event.end !== width)
      ) {
        const start = scale.invert(event.start);
        const end = scale.invert(event.end);
        domain = [start, end];
      }

      onBrushChange({
        domain
      });
    }
  }

  render() {
    const { scale, height, width, children, ...rest } = this.props;

    return (
      <Brush
        {...rest}
        {...this.getBrushOffset()}
        height={height}
        width={width}
        onBrushChange={bind(this.onBrushChange, this)}
      >
        {children}
      </Brush>
    );
  }
}
