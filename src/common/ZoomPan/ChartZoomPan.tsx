import React, { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { ZoomPan, ZoomPanEvent } from './ZoomPan';
import { ChartInternalDataShape, ChartDataTypes } from '@/common/data';
import { getXScale } from '../scales';

export interface ZoomPanChangeEvent {
  domain: [ChartDataTypes, ChartDataTypes];
  isZoomed: boolean;
}

export interface ChartZoomPanProps extends PropsWithChildren {
  /**
   * Data the chart is rendering. Set internally by the parent chart.
   */
  data: ChartInternalDataShape[];

  /**
   * Current zoom domain on the axis being zoomed.
   */
  domain?: [ChartDataTypes, ChartDataTypes];

  /**
   * Type of the axis being zoomed. Set internally by the parent chart.
   */
  axisType: 'value' | 'time' | 'category' | 'duration';

  /**
   * Whether the axis is rounding domains. Set internally by the parent chart.
   */
  roundDomains: boolean;

  /**
   * Height of the zoom-pan area. Set internally by the parent chart.
   */
  height: number;

  /**
   * Width of the zoom-pan area. Set internally by the parent chart.
   */
  width: number;

  /**
   * Current zoom scale factor.
   */
  scale: number;

  /**
   * Current pan offset.
   */
  offset: number;

  /**
   * Whether panning is enabled.
   */
  pannable: boolean;

  /**
   * Whether zooming is enabled.
   */
  zoomable: boolean;

  /**
   * Whether the gestures are disabled.
   */
  disabled?: boolean;

  /**
   * Maximum allowed zoom scale.
   */
  maxZoom: number;

  /**
   * Incremental step applied on zoom gestures.
   */
  zoomStep: number;

  /**
   * Whether to ignore mouse wheel events for zoom.
   */
  disableMouseWheel?: boolean;

  /**
   * Whether a modifier key is required to trigger zoom.
   */
  requireZoomModifier?: boolean;

  /**
   * Fires when the user zooms or pans.
   */
  onZoomPan?: (event: ZoomPanChangeEvent) => void;
}

export const ChartZoomPan: FC<Partial<ChartZoomPanProps>> = ({
  data,
  height,
  children,
  disabled,
  domain,
  width,
  axisType,
  roundDomains,
  onZoomPan = () => undefined,
  ...rest
}) => {
  const onZoomPanHandler = useCallback(
    (event: ZoomPanEvent) => {
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
    },
    [axisType, data, onZoomPan, roundDomains, width]
  );

  const zoomOffset = useMemo(() => {
    let zoomOffset = {
      scale: undefined,
      x: undefined
    } as any;

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
  }, [axisType, data, disabled, domain, roundDomains, width]);

  return (
    <ZoomPan
      {...rest}
      scale={zoomOffset.scale}
      x={zoomOffset.x}
      height={height}
      width={width}
      pannable={zoomOffset.scale > 1}
      onZoomPan={onZoomPanHandler}
    >
      {children}
    </ZoomPan>
  );
};
