import React, { Component } from 'react';
import bind from 'memoize-bind';
import { ZoomPan, ZoomPanEvent } from './ZoomPan';
import { ChartInternalDataShape, ChartDataTypes } from '../data';
import { getXScale } from '../scales';

export interface ZoomPanChangeEvent {
  domain: [ChartDataTypes, ChartDataTypes];
  isZoomed: boolean;
}

export interface ChartZoomPanProps {
  data: ChartInternalDataShape[];
  domain?: [ChartDataTypes, ChartDataTypes];
  axisType: 'value' | 'time' | 'category' | 'duration';
  roundDomains: boolean;
  height: number;
  width: number;
  scale: number;
  offset: number;
  pannable: boolean;
  zoomable: boolean;
  disabled?: boolean;
  maxZoom: number;
  zoomStep: number;
  disableMouseWheel?: boolean;
  requireZoomModifier?: boolean;
  onZoomPan?: (event: ZoomPanChangeEvent) => void;
}

export class ChartZoomPan extends Component<ChartZoomPanProps> {
  static defaultProps: Partial<ChartZoomPanProps> = {
    onZoomPan: () => undefined
  };

  onZoomPan(event: ZoomPanEvent) {
    const { width, data, axisType, roundDomains, onZoomPan } = this.props;
    const can =
      event.type === 'zoom' || (event.type === 'pan' && event.scale > 1);

    if (can) {
      const scale: any = getXScale({
        width: width,
        type: axisType,
        roundDomains,
        data
      });

      const newScale = scale.copy().domain(
        scale
          .range()
          .map((x) => (x - event.x) / event.scale)
          .map(scale.clamp(true).invert, event.x)
      );

      onZoomPan!({
        domain: newScale.domain(),
        isZoomed: event.scale !== 1
      });
    }
  }

  getOffset() {
    let zoomOffset = {
      scale: undefined,
      x: undefined
    } as any;

    const {
      disabled,
      domain,
      width,
      data,
      axisType,
      roundDomains
    } = this.props;

    if (!disabled && domain) {
      const xScale: any = getXScale({
        width,
        type: axisType,
        roundDomains,
        data
      });

      let offset = xScale(domain[0]);
      const endOffset = xScale(domain[1]);
      const scale = width / (endOffset - offset);

      // Apply the new scale to the offset so its scaled correctly
      offset = offset * scale;

      zoomOffset = {
        scale: scale,
        x: -offset
      };
    }

    return zoomOffset;
  }

  render() {
    const { data, height, children, width, onZoomPan, ...rest } = this.props;
    const { scale, x } = this.getOffset();

    return (
      <ZoomPan
        {...rest}
        scale={scale}
        x={x}
        height={height}
        width={width}
        pannable={scale > 1}
        onZoomPan={bind(this.onZoomPan, this)}
      >
        {children}
      </ZoomPan>
    );
  }
}
