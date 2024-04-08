import React, { FC, Fragment, useMemo } from 'react';
import { ChartInternalShallowDataShape } from '../../common';
export interface ScatterAreaProps {
  /**
   * The starting position of the area.
   */
  startPosition: {
    x: any;
    y: any;
  };

  /**
   * The ending position of the area.
   */
  endPosition: {
    x: any;
    y: any;
  };

  /**
   * The fill color of the area.
   */
  color?: string;

  /**
   * The color of the border of the area.
   */
  borderColor?: string;

  /**
   * The width of the border of the area.
   */
  borderWidth?: number;

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
  data: ChartInternalShallowDataShape;
}

export const ScatterArea: FC<Partial<ScatterAreaProps>> = ({
  startPosition,
  endPosition,
  xScale,
  yScale,
  borderColor,
  borderWidth,
  color
}) => {
  const startPositionScaled = useMemo(() => {
    return {
      x: xScale(startPosition.x),
      y: yScale(startPosition.y)
    };
  }, [startPosition, xScale, yScale]);

  const endPositionScaled = useMemo(() => {
    return {
      x: xScale(endPosition.x),
      y: yScale(endPosition.y)
    };
  }, [endPosition, xScale, yScale]);

  const width = useMemo(
    () => Math.abs(endPositionScaled.x - startPositionScaled.x),
    [endPositionScaled.x, startPositionScaled.x]
  );
  const height = useMemo(
    () => Math.abs(endPositionScaled.y - startPositionScaled.y),
    [endPositionScaled.y, startPositionScaled.y]
  );
  const x = useMemo(
    () => Math.min(startPositionScaled.x, endPositionScaled.x),
    [startPositionScaled.x, endPositionScaled.x]
  );
  const y = useMemo(
    () => Math.min(startPositionScaled.y, endPositionScaled.y),
    [startPositionScaled.y, endPositionScaled.y]
  );

  return (
    <Fragment>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
    </Fragment>
  );
};
