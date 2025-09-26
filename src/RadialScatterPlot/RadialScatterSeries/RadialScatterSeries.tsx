import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { identifier } from 'safe-identifier';

import type { RadialValueMarker, RadialValueMarkerProps } from '@/common';
import type { ChartInternalShallowDataShape } from '@/common/data';

import type { RadialScatterPointProps } from './RadialScatterPoint';
import {
  RADIAL_SCATTER_POINT_DEFAULT_PROPS,
  RadialScatterPoint,
} from './RadialScatterPoint';

export interface RadialScatterSeriesProps {
  /**
   * Point that is rendered.
   */
  point: ReactElement<RadialScatterPointProps, typeof RadialScatterPoint>;

  /**
   * D3 scale for X Axis. Set internally by `RadialScatterPlot`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialScatterPlot`.
   */
  yScale: any;

  /**
   * Parsed data shape. Set internally by `RadialScatterPlot`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * Id set internally by `RadialScatterPlot`.
   */
  id: string;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Active element ids to highlight.
   */
  activeIds?: string[];

  /**
   * When to show the point.
   */
  show: boolean;

  /**
   * Value markers line for the chart.
   */
  valueMarkers:
    | ReactElement<RadialValueMarkerProps, typeof RadialValueMarker>[]
    | null;
}

export const RadialScatterSeries: FC<Partial<RadialScatterSeriesProps>> = ({
  data,
  point = <RadialScatterPoint />,
  xScale,
  yScale,
  animated = true,
  activeIds,
  show = true,
  valueMarkers,
}) => {
  const pointProps = useMemo(
    () => ({ ...RADIAL_SCATTER_POINT_DEFAULT_PROPS, ...(point?.props ?? {}) }),
    [point?.props],
  );
  const [internalActiveIds, setInternalActiveIds] = useState<string[] | null>(
    activeIds,
  );

  useEffect(() => {
    setInternalActiveIds(activeIds || []);
  }, [activeIds]);

  const onMouseEnter = useCallback(
    ({ value }) => {
      // Only perform this on unmanaged activations
      if (!activeIds) {
        setInternalActiveIds([value.id]);
      }
    },
    [activeIds],
  );

  const onMouseLeave = useCallback(() => {
    // Only perform this on unmanaged activations
    if (!activeIds) {
      setInternalActiveIds([]);
    }
  }, [activeIds]);

  const isVisible = useCallback(() => show, [show]);

  const renderPoint = useCallback(
    (d: ChartInternalShallowDataShape, index: number) => {
      let dataId;
      if (d.id) {
        dataId = d.id;
      } else {
        console.warn(
          "No 'id' property provided for scatter point; provide one via 'id'.",
        );
      }

      const key = identifier(`${dataId || index}`);
      const active =
        !(internalActiveIds && internalActiveIds.length) ||
        internalActiveIds.includes(dataId);

      const pointVisible = pointProps?.visible;

      return (
        <CloneElement<RadialScatterPointProps>
          /* Trick to pass isVisible callback, directly cannot be passed when point is a cloned element already */
          {...(pointVisible ? {} : { visible: isVisible })}
          element={point}
          key={key}
          data={d}
          index={index}
          active={active}
          xScale={xScale}
          yScale={yScale}
          animated={animated}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      );
    },
    [
      isVisible,
      point,
      pointProps,
      internalActiveIds,
      xScale,
      yScale,
      animated,
      onMouseEnter,
      onMouseLeave,
    ],
  );

  const renderValueMarkers = useCallback(
    () => (
      <>
        {valueMarkers?.length &&
          valueMarkers.map((marker) => (
            <CloneElement<RadialValueMarkerProps>
              key={marker.key}
              element={marker}
              value={yScale(marker.props.value)}
            />
          ))}
      </>
    ),
    [valueMarkers, yScale],
  );

  return (
    <Fragment>
      {renderValueMarkers()}
      {data.map(renderPoint)}
    </Fragment>
  );
};
