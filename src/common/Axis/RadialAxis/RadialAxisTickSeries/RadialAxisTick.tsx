import React, { FC, ReactElement } from 'react';
import {
  RadialAxisTickLineProps,
  RadialAxisTickLine
} from './RadialAxisTickLine';
import {
  RadialAxisTickLabelProps,
  RadialAxisTickLabel
} from './RadialAxisTickLabel';
import { CloneElement } from 'rdk';

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
}

export const RadialAxisTick: FC<Partial<RadialAxisTickProps>> = ({
  line,
  label,
  scale,
  outerRadius,
  data,
  index,
  padding,
  innerRadius
}) => {
  const point = scale(data);
  const rotation = (point * 180) / Math.PI - 90;
  const transform = `rotate(${rotation}) translate(${outerRadius + padding},0)`;
  const lineSize = line ? line.props.size : 0;

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
        />
      )}
    </g>
  );
};

RadialAxisTick.defaultProps = {
  outerRadius: 0,
  padding: 0,
  line: <RadialAxisTickLine />,
  label: <RadialAxisTickLabel />
};
