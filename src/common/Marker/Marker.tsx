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
   * Width of the chart. Set internally by Graph.
   */
  width: number;

  /**
   * Width of the chart. Set internally by Graph.
   */
  height?: number;

  /**
   * D3 scale for Y Axis. Set internally by Graph.
   */
  yScale: number;

  /**
   * Parsed data shape. Set internally by Graph.
   */
  data: ChartInternalDataShape[];

  /**
   * Marker Label for the Marker.
   */
  label?: ReactElement<MarkerLabelProps, typeof MarkerLabel> | string | null;

  /**
   * Changing direction of the marker to match horizontal graphs. Set internally by Graph.
   */
  horizontal?: boolean;
}

export const Marker: FC<Partial<MarkerProps>> = ({
  value,
  strokeWidth = 1,
  color = '#eee',
  width,
  label,
  horizontal,
  height
}) => {
  const renderMarkerLabel = useCallback(
    () => (
      <>
        {label && (
          <CloneElement<MarkerLabelProps>
            element={label}
            height={value}
            width={width}
            horizontal={horizontal}
          />
        )}
      </>
    ),
    [label, width, value, horizontal]
  );

  const directionProps = {
    x1: horizontal ? value : 0,
    x2: horizontal ? value : width,
    y1: horizontal ? 0 : value,
    y2: horizontal ? height : value
  };

  console.log(value);

  return (
    <svg>
      <g dominantBaseline="central" height={10}>
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
