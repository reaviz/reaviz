import React, { Component } from 'react';
import { AreaSeriesProps, AreaSeries } from './AreaSeries';
import { formatValue } from '../../common/utils/formatting';
import {
  TooltipTemplate,
  TooltipArea,
  ChartTooltip
} from '../../common/Tooltip';
import { CloneElement } from '../../common/utils/children';
import { PointSeriesProps } from './PointSeries';
import { ScatterPointProps } from '../../ScatterPlot';

export class StackedNormalizedAreaSeries extends Component<AreaSeriesProps> {
  static defaultProps: Partial<AreaSeriesProps> = {
    ...AreaSeries.defaultProps,
    type: 'stackedNormalized',
    tooltip: (
      <TooltipArea
        tooltip={
          <ChartTooltip
            content={(series, color) => {
              if (!series) {
                return null;
              }

              const value = {
                ...series,
                data: series.data.map(d => ({
                  ...d,
                  value: `${formatValue(d.value)} ∙ ${formatValue(
                    Math.floor((d.y1 - d.y0) * 100)
                  )}%`
                }))
              };

              return <TooltipTemplate color={color} value={value} />;
            }}
          />
        }
      />
    )
  };

  render() {
    const { type, symbols, ...rest } = this.props;

    return (
      <AreaSeries
        {...rest}
        type="stackedNormalized"
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
