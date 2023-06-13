import React, { FC, ReactElement } from 'react';
import { ChartShallowDataShape } from '../common/data';
import { area } from 'd3-shape';
import { InterpolationTypes, interpolate } from '../common/utils';
import { ColorSchemeType, getColor, schemes } from '../common/color';
import { Gradient, GradientProps, GradientStop } from '../common/Gradient';
import { CloneElement } from 'rdk';

export interface FunnelArcProps {
  /**
   * Unique identifier for the arc. Set internally by `FunnelChart`.
   */
  id: string;

  /**
   * Data to render the funnel. Set internally by `FunnelChart`.
   */
  data: ChartShallowDataShape[];

  /**
   * xScale for the funnel. Set internally by `FunnelChart`.
   */
  xScale: any;

  /**
   * yScale for the funnel. Set internally by `FunnelChart`.
   */
  yScale: any;

  /**
   * Interpolation for the area. Set internally by `AreaSeries`.
   */
  interpolation: InterpolationTypes;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Gradient to apply to the area.
   */
  gradient: ReactElement<GradientProps, typeof Gradient> | null;
}

export const FunnelArc: FC<Partial<FunnelArcProps>> = ({
  data,
  id,
  xScale,
  yScale,
  interpolation,
  colorScheme,
  gradient
}) => {
  // Note: Need to append the last section
  const internalData = [...data, data[data.length - 1]];

  const areaGenerator = area()
    .curve(interpolate(interpolation))
    .x((_d, i) => xScale(i))
    .y0(yScale(0))
    .y1(({ data }: any) => yScale(data));

  const areaMirrorGenerator = area()
    .curve(interpolate(interpolation))
    .x((_d, i) => xScale(i))
    .y0(yScale(0))
    .y1(({ data }: any) => yScale(-data));

  const fillColor = getColor({
    data,
    colorScheme,
    key: 0
  });

  const fillTop = gradient ? `url(#gradient-${id}-top)` : fillColor;
  const fillBottom = gradient ? `url(#gradient-${id}-bottom)` : fillColor;

  return (
    <g pointerEvents="none">
      <path
        d={areaGenerator(internalData as any[])}
        fill={fillTop}
        stroke="none"
      />
      <path
        d={areaMirrorGenerator(internalData as any[])}
        fill={fillBottom}
        stroke="none"
      />
      {gradient && (
        <>
          <CloneElement<GradientProps>
            element={gradient}
            id={`gradient-${id}-top`}
            color={fillColor}
          />
          <CloneElement<GradientProps>
            element={gradient}
            id={`gradient-${id}-bottom`}
            color={fillColor}
          />
        </>
      )}
    </g>
  );
};

FunnelArc.defaultProps = {
  gradient: (
    <Gradient
      direction="horizontal"
      stops={[
        <GradientStop offset="0%" stopOpacity={1} key="stop" />,
        <GradientStop offset="80%" stopOpacity={0.5} key="start" />,
      ]}
    />
  ),
  interpolation: 'smooth',
  colorScheme: schemes.cybertron[0],
  animated: true
};
