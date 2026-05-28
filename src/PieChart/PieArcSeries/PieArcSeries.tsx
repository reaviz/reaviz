import React, { FC, Fragment, ReactElement, useMemo } from 'react';
import { CloneElement } from 'reablocks';
import { ArcData } from '@/PieChart';
import { PieArc, PieArcProps } from './PieArc';
import {
  PIE_ARC_LABEL_DEFAULT_PROPS,
  PieArcLabel,
  PieArcLabelProps
} from './PieArcLabel';
import { getColor, ColorSchemeType } from '@/common/color';
import {
  calculateCentroid,
  calculateInnerArc,
  calculateLabelPositions,
  calculateRadius
} from './radiusUtils';
import { identifier } from 'safe-identifier';
import { mergeDefaultProps } from '@/common';

export interface PieArcSeriesProps {
  /**
   * Unique id for the series.
   */
  id?: string;

  /**
   * Animated set by the `PieArc` components.
   *
   * @default true
   */
  animated: boolean;

  /**
   * Outer radius set by the parent component.
   */
  outerRadius: number;

  /**
   * Inner radius set by the parent component.
   *
   * @default 0
   */
  innerRadius: number;

  /**
   * Pad Angle between adjacent arcs, see https://github.com/d3/d3-shape#arc_padAngle
   *
   * @default 0
   */
  padAngle: number;

  /**
   * Pad Radius between adjacent arcs, see https://github.com/d3/d3-shape#arc_padRadius
   *
   * @default 0
   */
  padRadius: number;

  /**
   * Corner Radius of the arcs, see https://github.com/d3/d3-shape#arc_cornerRadius
   *
   * @default 0
   */
  cornerRadius: number;

  /**
   * Data set by the parent component.
   */
  data: ArcData[];

  /**
   * Width of the arc
   *
   * @default 0.25
   */
  arcWidth: number;

  /**
   * Doughnut, render as a donut shape
   */
  doughnut: boolean;

  /**
   * Explode: OuterRadius will be adjusted by the data property
   *
   * @default false
   */
  explode: boolean;

  /**
   * Display all labels shows labels even if there is little space
   *
   * @default false
   */
  displayAllLabels: boolean;

  /**
   * Label component
   *
   * @default `<PieArcLabel />`
   */
  label?: ReactElement<PieArcLabelProps, typeof PieArcLabel> | null;

  /**
   * Arc Component
   *
   * @default `<PieArc />`
   */
  arc: ReactElement<PieArcProps, typeof PieArc>;

  /**
   * Color scheme
   *
   * @default 'cybertron'
   */
  colorScheme: ColorSchemeType;

  /**
   * Height set by the parent component
   */
  height: number;

  /**
   * Width set by the parent component
   */
  width: number;
}

export const PieArcSeries: FC<Partial<PieArcSeriesProps>> = (props) => {
  const {
    doughnut,
    arcWidth,
    label,
    colorScheme,
    width,
    displayAllLabels,
    height,
    explode,
    id,
    animated,
    cornerRadius,
    padAngle,
    padRadius,
    arc,
    data
  } = mergeDefaultProps(PIE_ARC_SERIES_DEFAULT_PROPS, props);

  const labelProps = useMemo(
    () => ({ ...PIE_ARC_LABEL_DEFAULT_PROPS, ...label?.props }),
    [label]
  );

  const { outerRadius, innerRadius, labelWidth } = calculateRadius(
    height,
    width,
    label,
    arcWidth,
    doughnut
  );

  const innerArc = calculateInnerArc(
    data,
    innerRadius,
    outerRadius,
    cornerRadius,
    padAngle,
    padRadius,
    explode
  );

  const positions = label
    ? calculateLabelPositions(
        data,
        outerRadius,
        // 4 is for vertical margins between labels
        labelProps.height + 4,
        cornerRadius,
        padAngle,
        padRadius,
        displayAllLabels
      )
    : [];

  const centroid = calculateCentroid(data, innerRadius, outerRadius, explode);

  function renderItem(arcData: ArcData, index: number) {
    const safeKey = identifier(arcData.data.key.toString());
    const color = getColor({
      data,
      colorScheme,
      point: arcData.data,
      index
    });

    return (
      <Fragment key={safeKey}>
        {positions[index] && (
          <CloneElement<PieArcLabelProps>
            element={label}
            data={arcData}
            centroid={centroid}
            outerRadius={outerRadius}
            width={labelWidth}
            position={positions[index]}
          />
        )}
        <CloneElement<PieArcProps>
          id={`${id}-arc-${safeKey}`}
          data={arcData}
          animated={animated}
          arc={innerArc}
          color={color}
          element={arc}
        />
      </Fragment>
    );
  }

  return <>{data.map(renderItem)}</>;
};

export const PIE_ARC_SERIES_DEFAULT_PROPS = {
  animated: true,
  colorScheme: 'cybertron',
  innerRadius: 0,
  cornerRadius: 0,
  padAngle: 0,
  padRadius: 0,
  explode: false,
  displayAllLabels: false,
  arcWidth: 0.25,
  label: <PieArcLabel />,
  arc: <PieArc />
};
