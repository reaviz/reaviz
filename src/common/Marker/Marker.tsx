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
   * Changing direction of the marker, vertical being down-up, default is left-right horizontal. Set internally by Chart.
   */
  vertical?: boolean;

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
  vertical,
  height,
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
            vertical={vertical}
          />
        )}
      </>
    ),
    [label, width, value, vertical, xScale, yScale]
  );

  const directionProps = {
    x1: vertical ? xScale(value) : 0,
    x2: vertical ? xScale(value) : width,
    y1: vertical ? 0 : yScale(value),
    y2: vertical ? height : yScale(value)
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
