import React, { Component, ReactElement } from 'react';
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
  scale: any;
  outerRadius: number;
  innerRadius: number;
  padding: number;
  data: any;
  index: number;
  line: ReactElement<RadialAxisTickLineProps, typeof RadialAxisTickLine> | null;
  label: ReactElement<
    RadialAxisTickLabelProps,
    typeof RadialAxisTickLabel
  > | null;
}

export class RadialAxisTick extends Component<RadialAxisTickProps> {
  static defaultProps: Partial<RadialAxisTickProps> = {
    outerRadius: 0,
    padding: 0,
    line: <RadialAxisTickLine />,
    label: <RadialAxisTickLabel />
  };

  render() {
    const {
      line,
      label,
      scale,
      outerRadius,
      data,
      index,
      padding,
      innerRadius
    } = this.props;
    const point = scale(data);
    const rotation = (point * 180) / Math.PI - 90;
    const transform = `rotate(${rotation}) translate(${
      outerRadius + padding
    },0)`;
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
  }
}
