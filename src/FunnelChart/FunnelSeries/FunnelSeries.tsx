import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { CloneElement } from 'reablocks';
import type { MouseEvent } from 'react';
import React, { useCallback, useMemo } from 'react';

import type { ChartShallowDataShape } from '@/common';
import { getClosestContinousScalePoint, getPositionForTarget } from '@/common';
import type { ClickEvent } from '@/common/types';

import type { FunnelArcProps } from './FunnelArc';
import { FUNNEL_ARC_DEFAULT_PROPS, FunnelArc } from './FunnelArc';
import type { FunnelAxisProps } from './FunnelAxis';
import { FunnelAxis } from './FunnelAxis';

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
  arc = <FunnelArc />,
  axis = <FunnelAxis />,
  height,
  width,
  onSegmentClick
}) => {
  const arcProps = useMemo(
    () => ({ ...FUNNEL_ARC_DEFAULT_PROPS, ...(arc?.props ?? {}) }),
    [arc?.props]
  );

  // Calculate the funnel data on mount and when data changes
  const getScales = useCallback(
    (height: number, width: number) => {
      const yScale = scaleLinear()
        .domain([
          -max(data, ({ data }) => data as number),
          max(data, ({ data }) => data as number)
        ])
        .nice()
        .range([height, 0]);

      const xScale = scaleLinear().domain([0, data.length]).range([0, width]);

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
    },
    [data]
  );

  const { datas, halfOffset } = useMemo(() => {
    // The 'layered' variant is actually just a series of funnel charts
    // laid on top of each other to create the effect of a layered funnel.
    if (arcProps.variant === 'layered') {
      const offset = height / 4;
      const halfOffset = offset / 2;

      return {
        halfOffset,
        datas: [
          { data, ...getScales(height, width) },
          { data, ...getScales(height - offset, width) },
          { data, ...getScales(height - offset * 2, width) }
        ]
      };
    } else {
      return {
        halfOffset: 0,
        datas: [{ data, ...getScales(height, width) }]
      };
    }
  }, [data, arcProps, height, width, getScales]);

  const handleSegmentClick = useCallback(
    (e: MouseEvent) => {
      if (onSegmentClick) {
        const { xScale, data } = datas[0];
        const { clientX, clientY, target } = e;
        const position = getPositionForTarget({ target, clientX, clientY });
        const value = getClosestContinousScalePoint({
          pos: position.x,
          scale: xScale,
          data,
          attr: 'i'
        });

        onSegmentClick({
          value: { key: value.key, data: value.data },
          nativeEvent: e
        });
      }
    },
    [datas, onSegmentClick]
  );

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
