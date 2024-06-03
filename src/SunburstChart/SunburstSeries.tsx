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
   * Height of the chart. Set internally by `SunburstChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `SunburstChart`.
   */
  width: number;

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
  height,
  width,
  colorScheme,
  animated,
  arc,
  label
}) => {
  const radius = Math.min(width, height) / 6;

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

      // Note: in the future this will probably need to be
      // expanded to handle multiple levels
      const itemId = item.parent
        ? `${item.parent.data.key}-${item.data.key}`
        : `${item.data.key}`;

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
    [animated, arc, getFill, id, label, radius]
  );

  return <>{data.map(renderItem)}</>;
};

SunburstSeries.defaultProps = {
  colorScheme: 'unify8Colors',
  animated: true,
  arc: <SunburstArc />,
  label: <SunburstArcLabel />
};
