import React, { FC, Fragment, ReactElement, useCallback } from 'react';
import { ColorSchemeType, getColor } from '@/common/color';
import chroma from 'chroma-js';
import { SunburstArc, SunburstArcProps } from './SunburstArc';
import { SunburstArcLabel, SunburstArcLabelProps } from './SunburstArcLabel';
import { CloneElement } from 'reablocks';
import { identifier } from 'safe-identifier';

export interface SunburstSeriesProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: any[];

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Radius of the chart. Set internally by `SunburstChart`.
   */
  radius: number;

  /**
   * Padding angle between arcs in radians. Defaults to 0.005.
   */
  padAngle?: number;

  /**
   * The arc component to render.
   */
  arc?: ReactElement<SunburstArcProps, typeof SunburstArc>;

  /**
   * The arc label component to render.
   */
  label?: ReactElement<SunburstArcLabelProps, typeof SunburstArcLabel>;
}

export const SunburstSeries: FC<Partial<SunburstSeriesProps>> = ({
  id,
  data,
  radius,
  colorScheme = 'cybertron',
  animated = true,
  padAngle,
  arc = <SunburstArc />,
  label = <SunburstArcLabel />
}) => {
  const getFill = useCallback(
    (item: any, index: number) => {
      // Get the parent most item for the color start
      let parent = item;
      while (parent.depth > 1) {
        parent = parent.parent;
      }

      let fill = getColor({
        data,
        colorScheme,
        point: parent.data,
        index
      });

      // darken the color based on the depth
      fill = chroma(fill)
        .darken((item.depth - 1) * 0.5)
        .hex();

      return fill;
    },
    [colorScheme, data]
  );

  const renderItem = useCallback(
    (item: any, index: number) => {
      const fill = getFill(item, index);

      // // Handle getting the item id recursively
      const getItemId = (item: any): string => {
        if (item.parent) {
          return `${getItemId(item.parent)}-${item.data.key}`;
        }
        return `${item.data.key}`;
      };

      const itemId = getItemId(item);
      const safeKey = identifier(itemId);

      return (
        <Fragment key={safeKey}>
          <CloneElement<SunburstArcProps>
            element={arc}
            id={`${id}-${safeKey}-arc`}
            fill={fill}
            radius={radius}
            animated={animated}
            data={item}
            padAngle={padAngle}
          />
          <CloneElement<SunburstArcLabelProps>
            element={label}
            id={`${id}-${safeKey}-label`}
            fill={fill}
            data={item}
            radius={radius}
            animated={animated}
          />
        </Fragment>
      );
    },
    [animated, arc, getFill, id, label, radius, padAngle]
  );

  return <>{data.map(renderItem)}</>;
};
