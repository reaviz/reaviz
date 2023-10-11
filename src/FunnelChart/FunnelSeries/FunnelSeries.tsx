import React, { MouseEvent, useCallback, useMemo } from 'react';
import { FunnelArc } from './FunnelArc';
import { CloneElement } from 'rdk';
import { FunnelArcProps } from './FunnelArc';
import { FunnelAxis, FunnelAxisProps } from './FunnelAxis';
import { ChartShallowDataShape, getClosestPoint, getPositionForTarget } from '../../common';
import { ClickEvent } from '../../common/types';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

export interface FunnelSeriesProps {
  /**
   * Parsed data shape. Set internally by `FunnelChart`.
   */
  data: ChartShallowDataShape[];

  /**
   * Id of the funnel chart. Set internally by `FunnelChart`.
   */
  id: string;

  /**
   * The arc component that renders the funnel shape.
   */
  arc: React.ReactElement<FunnelArcProps, typeof FunnelArc>;

  /**
   * The axis component that renders the funnel axis.
   */
  axis: React.ReactElement<FunnelAxisProps, typeof FunnelAxis>;

  /**
   * Height of the chart. Set internally by `FunnelChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `FunnelChart`.
   */
  width: number;

  /**
   * Event for when a segment is clicked.
   */
  onSegmentClick?: (e: ClickEvent) => void;
}

export const FunnelSeries: React.FC<Partial<FunnelSeriesProps>> = ({
  data,
  id,
  arc,
  axis,
  height,
  width,
  onSegmentClick,
}) => {
  // Calculate the funnel data on mount and when data changes
  const getScales = useCallback((height: number, width: number) => {
    const yScale = scaleLinear()
      .domain([
        -max(data, ({ data }) => data),
        max(data, ({ data }) => data)
      ])
      .nice()
      .range([height, 0]);

    const xScale = scaleLinear()
      .domain([0, data.length])
      .range([0, width]);

    const transformedData = data.map((d, i) => ({
      ...d,
      key: d.key,
      x: xScale(i),
      i
    }));

    return {
      data: transformedData,
      yScale,
      xScale
    };
  }, [data]);

  const { datas, halfOffset } = useMemo(() => {
    // The 'layered' variant is actually just a series of funnel charts
    // laid on top of each other to create the effect of a layered funnel.
    if (arc.props.variant === 'layered') {
      const offset = height / 4;
      const halfOffset = offset / 2;

      return {
        halfOffset,
        datas: [
          { data, ...getScales(height, width) },
          { data, ...getScales(height - offset, width) },
          { data, ...getScales(height - (offset * 2), width) }
        ]
      };
    } else {
      return {
        halfOffset: 0,
        datas: [
          { data, ...getScales(height, width) }
        ]
      };
    }
  }, [data, arc, height, width, getScales]);

  const handleSegmentClick = useCallback((e: MouseEvent) => {
    if (onSegmentClick) {
      const { xScale, data } = datas[0];
      const { clientX, clientY, target } = e;
      const position = getPositionForTarget({ target, clientX, clientY });
      const value = getClosestPoint(position.x, xScale, data, 'i');

      onSegmentClick({
        value: { key: value.key, data: value.data },
        nativeEvent: e
      });
    }
  }, [datas, onSegmentClick]);

  return (
    <>
      {datas.map((d, i) => (
        <g
          key={i}
          style={{ transform: `translate(0, ${i * halfOffset}px)` }}
          onClick={handleSegmentClick}
        >
          <CloneElement<FunnelArcProps>
            element={arc}
            {...d}
            id={`${id}-arc-${i}`}
            index={i}
          />
        </g>
      ))}
      <CloneElement<FunnelAxisProps>
        element={axis}
        data={data}
        xScale={datas[0].xScale}
        yScale={datas[0].yScale}
      />
    </>
  );
};

FunnelSeries.defaultProps = {
  arc: <FunnelArc />,
  axis: <FunnelAxis />
};

