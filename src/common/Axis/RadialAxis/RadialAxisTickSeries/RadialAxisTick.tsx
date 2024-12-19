import React, { FC, ReactElement, useMemo } from 'react';
import {
  RadialAxisTickLineProps,
  RadialAxisTickLine,
  RADIAL_AXIS_TICK_LINE_DEFAULT_PROPS
} from './RadialAxisTickLine';
import {
  RadialAxisTickLabelProps,
  RadialAxisTickLabel
} from './RadialAxisTickLabel';
import { CloneElement } from 'reablocks';

export interface RadialAxisTickProps {
  /**
   * Scale to use for the tick.
   */
  scale: any;

  /**
   * Outer radius of the arc.
   */
  outerRadius: number;

  /**
   * Inner radius of the arc.
   */
  innerRadius: number;

  /**
   * Padding between the tick and the label.
   */
  padding: number;

  /**
   * Data to render.
   */
  data: any;

  /**
   * Index of the tick.
   */
  index: number;

  /**
   * Line element to render.
   */
  line: ReactElement<RadialAxisTickLineProps, typeof RadialAxisTickLine> | null;

  /**
   * Label element to render.
   */
  label: ReactElement<
    RadialAxisTickLabelProps,
    typeof RadialAxisTickLabel
  > | null;

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
}

export const RadialAxisTick: FC<Partial<RadialAxisTickProps>> = ({
  line = <RadialAxisTickLine />,
  label = <RadialAxisTickLabel />,
  scale,
  outerRadius = 0,
  data,
  index,
  padding = 0,
  innerRadius,
  startAngle = 0,
  endAngle = 2 * Math.PI
}) => {
  const lineProps = useMemo(
    () => ({ ...RADIAL_AXIS_TICK_LINE_DEFAULT_PROPS, ...(line?.props ?? {}) }),
    [line?.props]
  );
  const point = scale(data);
  const rotation = (point * 180) / Math.PI - 90;
  const transform = `rotate(${rotation}) translate(${outerRadius + padding},0)`;
  const lineSize = line ? lineProps.size : 0;

  return (
    <g transform={transform}>
      {line && (
        <CloneElement<RadialAxisTickLineProps>
          element={line}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        />
      )}
      {label && (
        <CloneElement<RadialAxisTickLabelProps>
          element={label}
          index={index}
          point={point}
          rotation={rotation}
          lineSize={lineSize}
          data={data}
          startAngle={startAngle}
          endAngle={endAngle}
        />
      )}
    </g>
  );
};
