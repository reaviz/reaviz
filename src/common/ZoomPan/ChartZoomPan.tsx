import type { FC, PropsWithChildren } from 'react';
import React, { useCallback, useMemo } from 'react';

import type { ChartDataTypes, ChartInternalDataShape } from '@/common/data';

import { getXScale } from '../scales';
import type { ZoomPanEvent } from './ZoomPan';
import { ZoomPan } from './ZoomPan';

export interface ZoomPanChangeEvent {
  domain: [ChartDataTypes, ChartDataTypes];
  isZoomed: boolean;
}

export interface ChartZoomPanProps extends PropsWithChildren {
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
          data,
        });

        const newScale = scale.copy().domain(
          scale
            .range()
            .map((x) => (x - event.x) / event.scale)
            .map(scale.clamp(true).invert, event.x),
        );

        onZoomPan!({
          domain: newScale.domain(),
          isZoomed: event.scale !== 1,
        });
      }
    },
    [axisType, data, onZoomPan, roundDomains, width],
  );

  const zoomOffset = useMemo(() => {
    let zoomOffset = {
      scale: undefined,
      x: undefined,
    } as any;

    if (!disabled && domain) {
      const xScale: any = getXScale({
        width,
        type: axisType,
        roundDomains,
        data,
      });

      let offset = xScale(domain[0]);
      const endOffset = xScale(domain[1]);
      const scale = width / (endOffset - offset);

      // Apply the new scale to the offset so its scaled correctly
      offset = offset * scale;

      zoomOffset = {
        scale: scale,
        x: -offset,
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
