import React, { Component, ReactElement } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { CloneElement } from '../../common/utils';
import {
  ScatterPoint,
  ScatterSeries,
  ScatterPointProps
} from '../../ScatterPlot';
import css from './PointSeries.module.scss';
import isEqual from 'is-equal';

export interface PointSeriesProps {
  animated: boolean;
  color: any;
  activeValues?: any;
  data: ChartInternalShallowDataShape[];
  yScale: any;
  xScale: any;
  id: string;
  height: number;
  width: number;
  show: boolean | 'hover' | 'first' | 'last';
  point: ReactElement<ScatterPointProps, typeof ScatterPoint>;
  index: number;
}

export class PointSeries extends Component<PointSeriesProps> {
  static defaultProps: Partial<PointSeriesProps> = {
    show: 'hover',
    point: <ScatterPoint />
  };

  isVisible(point: ChartInternalShallowDataShape, index: number) {
    const { show, activeValues, data } = this.props;
    const isActive = activeValues && point && isEqual(activeValues.x, point.x);

    if (show === 'hover') {
      return isActive;
    } else if (show === 'first') {
      if (activeValues) {
        return isActive;
      } else {
        return index === 0;
      }
    } else if (show === 'last') {
      if (activeValues) {
        return isActive;
      } else {
        return index === data.length - 1;
      }
    }

    return show;
  }

  render() {
    const {
      data,
      xScale,
      yScale,
      animated,
      point,
      color,
      height,
      width,
      id
    } = this.props;

    return (
      <ScatterSeries
        height={height}
        width={width}
        id={id}
        animated={animated}
        data={data}
        xScale={xScale}
        yScale={yScale}
        point={
          <CloneElement<ScatterPointProps>
            element={point}
            color={color}
            className={css.point}
            size={4}
            tooltip={null}
            visible={this.isVisible.bind(this)}
          />
        }
      />
    );
  }
}
