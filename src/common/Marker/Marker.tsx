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
   * Width of the chart. Set internally by Parent.
   */
  width: number;

  /**
   * D3 scale for Y Axis. Set internally by Parent.
   */
  yScale: number;

  /**
   * Parsed data shape. Set internally by Parent.
   */
  data: ChartInternalDataShape[];

  /**
   * Marker Label for the Marker.
   */
  label?: ReactElement<MarkerLabelProps, typeof MarkerLabel> | string | null;
}

export const Marker: FC<Partial<MarkerProps>> = ({
  value,
  strokeWidth = 1,
  color = '#eee',
  width,
  label
}) => {
  const renderMarkerLabel = useCallback(
    () => (
      <>
        {label && (
          <CloneElement<MarkerLabelProps>
            element={label}
            y={value}
            width={width}
          />
        )}
      </>
    ),
    [label, width, value]
  );

  return (
    <svg>
      <g dominantBaseline="central" height={10}>
        <line
          stroke={color}
          strokeWidth={strokeWidth}
          y1={value}
          vectorEffect="non-scaling-stroke"
          y2={value}
          x1="0"
          x2={width}
        />
        {renderMarkerLabel()}
      </g>
    </svg>
  );
};
