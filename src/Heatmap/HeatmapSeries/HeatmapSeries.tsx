import React, { Component, Fragment, ReactElement } from 'react';
import { HeatmapCell, HeatmapCellProps } from './HeatmapCell';
import { scaleQuantile } from 'd3-scale';
import { uniqueBy } from '../../common/utils/array';
import { extent, sum } from 'd3-array';
import { CloneElement } from '../../common/utils/children';
import memoize from 'memoize-one';
import { ColorSchemeType, getColor } from '../../common/color';
import { ChartInternalNestedDataShape } from '../../common/data';

export interface HeatmapSeriesProps {
  /**
   * Padding between cells.
   */
  padding: number;

  /**
   * Id set by `Heatmap`.
   */
  id: string;

  /**
   * Parsed data set by `Heatmap`.
   */
  data: ChartInternalNestedDataShape[];

  /**
   * D3 scale for X Axis. Set internally by `Heatmap`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `Heatmap`.
   */
  yScale: any;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Color for the empty cell of the chart.
   */
  emptyColor: string;

  /**
   * Whether the chart is animated or not.
   */
  animated: boolean;

  /**
   * Cell component that will be rendered.
   */
  cell: ReactElement<HeatmapCellProps, typeof HeatmapCell>;
}

export class HeatmapSeries extends Component<HeatmapSeriesProps> {
  static defaultProps: Partial<HeatmapSeriesProps> = {
    padding: 0.1,
    animated: true,
    emptyColor: 'rgba(200,200,200,0.08)',
    colorScheme: ['rgba(28, 107, 86, 0.5)', '#2da283'],
    cell: <HeatmapCell />
  };

  getValueScale = memoize((data, colorScheme, emptyColor) => {
    const valueDomain = extent(uniqueBy(data, d => d.data, d => d.value));

    return point => {
      // For 0 values, lets show a placeholder fill
      if (point === undefined || point === null) {
        return emptyColor;
      }

      return getColor({
        scale: scaleQuantile,
        domain: valueDomain,
        key: point,
        colorScheme
      });
    };
  });

  renderCell({
    row,
    cell,
    rowIndex,
    cellIndex,
    valueScale,
    width,
    height,
    cellCount
  }) {
    const { xScale, yScale, id, animated, cell: cellElement } = this.props;

    const x = xScale(row.key);
    const y = yScale(cell.x);
    const fill = valueScale(cell.value);

    return (
      <CloneElement<HeatmapCellProps>
        key={`${id}-${rowIndex}-${cellIndex}`}
        element={cellElement}
        animated={animated}
        cellIndex={rowIndex + cellIndex}
        cellCount={cellCount}
        x={x}
        y={y}
        fill={fill}
        width={width}
        height={height}
        data={cell}
      />
    );
  }

  render() {
    const { xScale, yScale, data, colorScheme, emptyColor } = this.props;

    const valueScale = this.getValueScale(data, colorScheme, emptyColor);
    const height = yScale.bandwidth();
    const width = xScale.bandwidth();
    const cellCount = sum([...yScale.domain(), ...xScale.domain()]);

    return (
      <Fragment>
        {data.map((row, rowIndex) =>
          row.data.map((cell, cellIndex) =>
            this.renderCell({
              height,
              width,
              valueScale,
              cellCount,
              row,
              cell,
              rowIndex,
              cellIndex
            })
          )
        )}
      </Fragment>
    );
  }
}
