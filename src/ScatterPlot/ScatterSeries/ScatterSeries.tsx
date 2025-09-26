import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment, useCallback } from 'react';
import { identifier } from 'safe-identifier';

import type { LinearValueMarker, LinearValueMarkerProps } from '@/common';
import type { ChartInternalShallowDataShape } from '@/common/data';

import type { ScatterPointProps } from './ScatterPoint';
import { ScatterPoint } from './ScatterPoint';

export interface ScatterSeriesProps {
  /**
   * Point that is rendered.
   */
  point: ReactElement<ScatterPointProps, typeof ScatterPoint>;

  /**
   * D3 scale for X Axis. Set internally by `ScatterPlot`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `ScatterPlot`.
   */
  yScale: any;

  /**
   * Parsed data shape. Set internally by `ScatterPlot`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * Id set internally by `ScatterPlot`.
   */
  id: string;

  /**
   * Height of the chart. Set internally by `ScatterPlot`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `ScatterPlot`.
   */
  width: number;

  /**
   * Whether the chart has been zoomed or not. Set internally by `ScatterPlot`.
   */
  isZoomed: boolean;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Active element ids to highlight.
   */
  activeIds?: string[];

  /**
   * Value markers line for the chart.
   */
  valueMarkers:
    | ReactElement<LinearValueMarkerProps, typeof LinearValueMarker>[]
    | null;
}

// For bubble charts, often symbols exceed the area
// and we want to add a little bit of padding to prevent clipping
const PADDING = 25;
const HALF_PADDING = PADDING / 2;

export const ScatterSeries: FC<Partial<ScatterSeriesProps>> = ({
  data,
  height,
  width,
  id,
  isZoomed,
  activeIds,
  point = <ScatterPoint />,
  valueMarkers,
  xScale,
  yScale,
  ...rest
}) => {
  const renderPoint = useCallback(
    (pointData: ChartInternalShallowDataShape, index: number) => {
      let pointId;
      if (pointData.id) {
        pointId = pointData.id;
      }

      const key = identifier(`${pointId || index}`);
      const active =
        !(activeIds && activeIds.length) || activeIds.includes(pointId);

      return (
        <CloneElement<ScatterPointProps>
          element={point}
          key={key}
          xScale={xScale}
          yScale={yScale}
          {...rest}
          id={id}
          data={pointData}
          index={index}
          active={active}
        />
      );
    },
    [activeIds, point, xScale, yScale, rest, id],
  );

  const renderValueMarkers = useCallback(
    () => (
      <>
        {valueMarkers?.length &&
          valueMarkers.map((marker) => {
            const isVertical = marker?.props?.direction === 'vertical';
            const size = isVertical ? height : width;
            const value = isVertical
              ? xScale(marker.props.value)
              : yScale(marker.props.value);
            return (
              <CloneElement<LinearValueMarkerProps>
                key={marker.key}
                element={marker}
                size={size}
                value={value}
              />
            );
          })}
      </>
    ),
    [height, valueMarkers, width, xScale, yScale],
  );

  return (
    <Fragment>
      <defs>
        <clipPath id={`${id}-path`}>
          <rect
            width={isZoomed ? width : width! + PADDING}
            height={height! + PADDING}
            x={isZoomed ? 0 : -HALF_PADDING}
            y={-HALF_PADDING}
          />
        </clipPath>
      </defs>
      {renderValueMarkers()}
      <g clipPath={`url(#${id}-path)`}>{data!.map(renderPoint)}</g>
    </Fragment>
  );
};
