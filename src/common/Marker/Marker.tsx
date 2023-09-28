import React, { FC, ReactElement, useCallback } from 'react';
import { MarkerLabel, MarkerLabelProps } from '../MarkerLabel';
import { CloneElement } from 'rdk';
import { ChartInternalDataShape } from '../data';

export interface MarkerProps {
  /**
   * Placement of the marker on the graph with respect to the dataset.
   */
  value: number;

  /**
   * Color of the marker.
   */
  color: string;

  /**
   * Size of the marker.
   */
  strokeWidth: number;

  /**
   * Width of the chart. Set internally by Chart.
   */
  width: number;

  /**
   * Width of the chart. Set internally by Chart.
   */
  height?: number;

  /**
   * Parsed data shape. Set internally by Chart.
   */
  data: ChartInternalDataShape[];

  /**
   * Marker Label for the Marker.
   */
  label?: ReactElement<MarkerLabelProps, typeof MarkerLabel> | string | null;

  /**
   * Changing direction of the marker to match horizontal graphs. Set internally by Chart.
   */
  horizontal?: boolean;

  /**
   * D3 scale for X Axis. Set internally by Chart.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by Chart.
   */
  yScale: any;
}

export const Marker: FC<Partial<MarkerProps>> = ({
  value,
  strokeWidth = 1,
  color = '#eee',
  width,
  label,
  horizontal,
  height,
  data,
  yScale,
  xScale
}) => {
  const renderMarkerLabel = useCallback(
    () => (
      <>
        {label && (
          <CloneElement<MarkerLabelProps>
            element={label}
            height={value}
            yScale={yScale}
            xScale={xScale}
            width={width}
            horizontal={horizontal}
          />
        )}
      </>
    ),
    [label, width, value, horizontal, xScale, yScale]
  );

  const directionProps = {
    x1: horizontal ? xScale(value) : 0,
    x2: horizontal ? xScale(value) : width,
    y1: horizontal ? 0 : yScale(value),
    y2: horizontal ? height : yScale(value)
  };

  return (
    <svg>
      <g dominantBaseline="central">
        <line
          stroke={color}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          {...directionProps}
        />
        {renderMarkerLabel()}
      </g>
    </svg>
  );
};
