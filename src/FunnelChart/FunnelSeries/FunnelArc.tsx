import React, { FC, ReactElement, useMemo } from 'react';
import { ChartShallowDataShape } from '../../common/data';
import { area } from 'd3-shape';
import { InterpolationTypes, getAriaLabel, interpolate } from '../../common/utils';
import { ColorSchemeType, getColor, schemes } from '../../common/color';
import { Gradient, GradientProps, GradientStop } from '../../common/Gradient';
import { CloneElement } from 'rdk';
import { motion } from 'framer-motion';
import {
  ChartTooltip,
  TooltipArea,
  TooltipAreaProps,
  TooltipTemplate
} from '../../common/Tooltip';
import { Glow } from '../../common';
import { generateGlowStyles } from '../../common/Glow/utils';

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
   * Opacity of the funnel arc.
   */
  opacity?: number;

  /**
   * Index of the funnel arc. Set internally by `FunnelChart`.
   */
  index?: number;

  /**
   * The chart funnel style to use.
   */
  variant?: 'default' | 'layered';

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

  /**
   * Glow styling for the arc.
   */
  glow?: Glow;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea>;
}

export const FunnelArc: FC<Partial<FunnelArcProps>> = ({
  data,
  id,
  xScale,
  opacity,
  index,
  variant,
  yScale,
  interpolation,
  colorScheme,
  gradient,
  glow,
  tooltip
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
    domain: [0, 1, 2, 3],
    colorScheme,
    key: index
  });

  const fillTop = gradient ? `url(#gradient-${id}-top)` : fillColor;
  const fillBottom = gradient ? `url(#gradient-${id}-bottom)` : fillColor;

  const [height] = yScale.range();
  const [_, width] = xScale.range();

  const ariaLabelData = useMemo(() => getAriaLabel(data), [data]);

  return (
    <CloneElement<TooltipAreaProps>
      element={tooltip}
      xScale={xScale}
      yScale={yScale}
      data={data as any}
      height={height}
      width={width}
      tooltip={
        <ChartTooltip
          followCursor
          content={(data, color) => {
            const value = {
              x: data.key,
              y: data.data,
              value: data.data,
            };

            return <TooltipTemplate value={value} color={color} />;
          }}
        />
      }
    >
      <g
        pointerEvents={tooltip ? 'none' : 'auto'}
        style={generateGlowStyles({ glow })}
        aria-label={ariaLabelData}
        role="graphics-document"
      >
        <motion.path
          d={areaGenerator(internalData as any[])}
          fill={fillTop}
          stroke="none"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity
          }}
        />
        <motion.path
          d={areaMirrorGenerator(internalData as any[])}
          fill={fillBottom}
          stroke="none"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity
          }}
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
    </CloneElement>
  );
};

FunnelArc.defaultProps = {
  gradient: (
    <Gradient
      direction="horizontal"
      stops={[
        <GradientStop offset="0%" stopOpacity={1} key="stop" />,
        <GradientStop offset="80%" stopOpacity={0.5} key="start" />
      ]}
    />
  ),
  interpolation: 'smooth',
  colorScheme: schemes.cybertron[0],
  animated: true,
  variant: 'default',
  opacity: 1,
  tooltip: null
};
