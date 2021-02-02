import React, { Component, Fragment, ReactElement } from 'react';
import {
  LinearAxisTickLabel,
  LinearAxisTickLabelProps
} from './LinearAxisTickLabel';
import {
  LinearAxisTickLine,
  LinearAxisTickLineProps
} from './LinearAxisTickLine';
import { formatValue } from '../../utils/formatting';
import { getTicks, getMaxTicks } from '../../utils/ticks';
import { TimeInterval } from 'd3-time';
import { CloneElement } from 'rdk';
import { LinearAxisProps } from './LinearAxis';
import ellipsize from 'ellipsize';
import { max } from 'd3-array';
import { calculateDimensions } from '../../utils/size';

export interface LinearAxisTickSeriesProps {
  height: number;
  width: number;
  scale: any;
  interval?: number | TimeInterval;
  tickSize: number;
  tickValues: any[];
  orientation: 'horizontal' | 'vertical';
  label: ReactElement<
    LinearAxisTickLabelProps,
    typeof LinearAxisTickLabel
  > | null;
  line: ReactElement<LinearAxisTickLineProps, typeof LinearAxisTickLine> | null;
  axis: LinearAxisProps;
}

interface ProcessedTick {
  text: string;
  fullText: string;
  x: number;
  y: number;
  height: number;
  width: number;
  half: 'start' | 'end' | 'center';
}

export class LinearAxisTickSeries extends Component<LinearAxisTickSeriesProps> {
  static defaultProps: Partial<LinearAxisTickSeriesProps> = {
    line: <LinearAxisTickLine />,
    label: <LinearAxisTickLabel />,
    tickSize: 30
  };

  /**
   * Gets the adjusted scale given offsets.
   */
  getAdjustedScale() {
    const { scale } = this.props;

    if (scale.bandwidth) {
      let offset = scale.bandwidth() / 2;
      if (scale.round()) {
        offset = Math.round(offset);
      }

      return (d) => +scale(d) + offset;
    } else {
      return (d) => +scale(d);
    }
  }

  /**
   * Gets the x/y position for a given tick.
   */
  getPosition(scaledTick: number) {
    const { orientation } = this.props;

    if (orientation === 'horizontal') {
      return { x: scaledTick, y: 0 };
    } else {
      return { x: 0, y: scaledTick };
    }
  }

  /**
   * Gets the dimension (height/width) this axis is calculating on.
   */
  getDimension() {
    const { height, width, orientation } = this.props;
    return orientation === 'vertical' ? height : width;
  }

  /**
   * Calculates the rotation angle that the ticks need to be shifted to.
   * This equation will measure the length of the text in a external canvas
   * object and determine what the longest label is and rotate until they fit.
   */
  getRotationAngle(ticks: any[]): number {
    if (!this.props.label) {
      return 0;
    }

    const label = this.props.label.props;
    const dimension = this.getDimension();
    const maxTicksLength = max(ticks, (tick) => tick.width);
    let angle = 0;

    if (label.rotation) {
      if (label.rotation === true) {
        let baseWidth = maxTicksLength;
        const maxBaseWidth = Math.floor(dimension / ticks.length);

        while (baseWidth > maxBaseWidth && angle > -90) {
          angle -= 30;
          baseWidth = Math.cos(angle * (Math.PI / 180)) * maxTicksLength;
        }
      } else {
        angle = label.rotation;
      }
    }

    return angle;
  }

  /**
   * Gets the formatted label of the tick.
   */
  getLabelFormat(): (label: string) => string {
    const { label, scale } = this.props;

    if (label && label.props.format) {
      return label.props.format;
    } else if (scale.tickFormat) {
      return scale.tickFormat.apply(scale, [5]);
    } else {
      return (v) => formatValue(v);
    }
  }

  /**
   * Gets the ticks given the dimensions and scales and returns
   * the text and position.
   */
  getTicks(): ProcessedTick[] {
    const { scale, tickSize, tickValues, interval, axis, label } = this.props;
    const dimension = this.getDimension();
    const maxTicks = getMaxTicks(tickSize, dimension);
    const ticks = getTicks(scale, tickValues, axis.type, maxTicks, interval);
    const adjustedScale = this.getAdjustedScale();
    const format = this.getLabelFormat();
    const midpoint = dimension / 2;

    return ticks.map((tick) => {
      const fullText = format(tick);
      const scaledTick = adjustedScale(tick);
      const position = this.getPosition(scaledTick);
      const text = ellipsize(fullText, 18);
      const size = label
        ? calculateDimensions(
          text,
          label.props.fontFamily,
          label.props.fontSize.toString()
        )
        : {};

      return {
        ...position,
        ...size,
        text,
        fullText,
        half:
          scaledTick === midpoint
            ? 'center'
            : scaledTick < midpoint
              ? 'start'
              : 'end'
      };
    });
  }

  render() {
    const { label, line, height, width, orientation } = this.props;
    const ticks = this.getTicks();
    const angle = this.getRotationAngle(ticks);

    return (
      <Fragment>
        {ticks.map((tick, i) => (
          <g key={i} transform={`translate(${tick.x}, ${tick.y})`}>
            {line && (
              <CloneElement<LinearAxisTickLineProps>
                element={line}
                height={height}
                width={width}
                orientation={orientation}
              />
            )}
            {label && (
              <CloneElement<LinearAxisTickLabelProps>
                element={label}
                text={tick.text}
                fullText={tick.fullText}
                half={tick.half}
                angle={angle}
                orientation={orientation}
                line={line!}
              />
            )}
          </g>
        ))}
      </Fragment>
    );
  }
}
