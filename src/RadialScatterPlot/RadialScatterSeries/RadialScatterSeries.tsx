import React, { useState, FC, Fragment, ReactElement, useEffect, useCallback } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import {
  RadialScatterPoint,
  RadialScatterPointProps
} from './RadialScatterPoint';
import { CloneElement } from 'rdk';

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
}

export const RadialScatterSeries: FC<Partial<RadialScatterSeriesProps>> = ({
  data,
  point,
  xScale,
  yScale,
  animated,
  activeIds
}) => {
  const [internalActiveIds, setInternalActiveIds] = useState<string[] | null>(activeIds);

  useEffect(() => {
    setInternalActiveIds(activeIds || []);
  }, [activeIds]);

  const onMouseEnter = useCallback(({ value }) => {
    // Only perform this on unmanaged activations
    if (!activeIds) {
      setInternalActiveIds([value.id]);
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    // Only perform this on unmanaged activations
    if (!activeIds) {
      setInternalActiveIds([]);
    }
  }, []);

  const renderPoint = useCallback((d: ChartInternalShallowDataShape, index: number) => {
    let dataId;
    if (d.id) {
      dataId = d.id;
    } else {
      console.warn(
        'No \'id\' property provided for scatter point; provide one via \'id\'.'
      );
    }

    const key = dataId || index;
    const active =
      !(internalActiveIds && internalActiveIds.length) || internalActiveIds.includes(dataId);

    const visible = point.props.visible;
    if (visible && !visible(d, index)) {
      return <Fragment key={key} />;
    }

    return (
      <CloneElement<RadialScatterPointProps>
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
  }, [point, internalActiveIds, xScale, yScale, animated, onMouseEnter, onMouseLeave]);

  return <Fragment>{data.map(renderPoint)}</Fragment>;
};

RadialScatterSeries.defaultProps = {
  point: <RadialScatterPoint />,
  animated: true
};
