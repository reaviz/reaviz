import React, { FC, PropsWithChildren, ReactElement, useMemo } from 'react';
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
import { getChildComponent } from '@/common/utils';

export interface RadialAxisTickProps extends PropsWithChildren {
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
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
}

export const RadialAxisTick: FC<Partial<RadialAxisTickProps>> = ({
  children,
  scale,
  outerRadius = 0,
  data,
  index,
  padding = 0,
  innerRadius,
  startAngle = 0,
  endAngle = 2 * Math.PI
}) => {
  const line = getChildComponent(
    children,
    RadialAxisTickLine.name,
    <RadialAxisTickLine />
  );
  const label = getChildComponent(
    children,
    RadialAxisTickLabel.name,
    <RadialAxisTickLabel />
  );
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
          // TODO: remove these unused props (require snapshot update)
          startAngle={startAngle}
          endAngle={endAngle}
        />
      )}
    </g>
  );
};
