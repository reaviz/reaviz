import React, {
  useState,
  FC,
  Fragment,
  ReactElement,
  useEffect,
  useCallback
} from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import {
  RadialScatterPoint,
  RadialScatterPointProps
} from './RadialScatterPoint';
import { CloneElement } from 'rdk';
import { identifier } from 'safe-identifier';

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
}

export const RadialScatterSeries: FC<Partial<RadialScatterSeriesProps>> = ({
  data,
  point,
  xScale,
  yScale,
  animated,
  activeIds,
  show = true
}) => {
  const [internalActiveIds, setInternalActiveIds] = useState<string[] | null>(
    activeIds
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
    [activeIds]
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
          'No \'id\' property provided for scatter point; provide one via \'id\'.'
        );
      }

      const key = identifier(`${dataId || index}`);
      const active =
        !(internalActiveIds && internalActiveIds.length) ||
        internalActiveIds.includes(dataId);

      const pointVisible = point.props?.visible;

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
      internalActiveIds,
      xScale,
      yScale,
      animated,
      onMouseEnter,
      onMouseLeave
    ]
  );

  return <Fragment>{data.map(renderPoint)}</Fragment>;
};

RadialScatterSeries.defaultProps = {
  point: <RadialScatterPoint />,
  animated: true
};
