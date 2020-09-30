import React, { Component } from 'react';
import { AreaSeriesProps, AreaSeries } from './AreaSeries';
import { CloneElement } from '../../common/utils';
import { PointSeriesProps } from './PointSeries';
import { ScatterPointProps } from '../../ScatterPlot';

export class StackedAreaSeries extends Component<AreaSeriesProps, {}> {
  static defaultProps: Partial<AreaSeriesProps> = {
    ...AreaSeries.defaultProps,
    type: 'stacked'
  };

  render() {
    const { type, symbols, ...rest } = this.props;

    return (
      <AreaSeries
        {...rest}
        type="stacked"
        symbols={
          symbols && (
            <CloneElement<PointSeriesProps>
              element={symbols}
              {...symbols.props}
              point={
                <CloneElement<ScatterPointProps>
                  element={symbols.props.point}
                  {...symbols.props.point.props}
                  tooltip={null}
                />
              }
            />
          )
        }
      />
    );
  }
}
