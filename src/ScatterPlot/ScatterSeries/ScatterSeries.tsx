import React, { useCallback, Fragment, ReactElement, FC } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { CloneElement } from 'rdk';
import { ScatterPoint, ScatterPointProps } from './ScatterPoint';

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
  point,
  ...rest
}) => {
  const renderPoint = useCallback(
    (pointData: ChartInternalShallowDataShape, index: number) => {
      let pointId;
      if (pointData.id) {
        pointId = pointData.id;
      }

      const key = pointId || index;
      const active =
        !(activeIds && activeIds.length) || activeIds.includes(pointId);

      const visible = point.props.visible;
      if (visible && !visible(pointData, index)) {
        return <Fragment key={key} />;
      }

      return (
        <CloneElement<ScatterPointProps>
          element={point}
          key={key}
          {...rest}
          id={id}
          data={pointData}
          index={index}
          active={active}
        />
      );
    },
    [point, id, rest, activeIds]
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
      <g clipPath={`url(#${id}-path)`}>{data!.map(renderPoint)}</g>
    </Fragment>
  );
};

ScatterSeries.defaultProps = {
  point: <ScatterPoint />
};
