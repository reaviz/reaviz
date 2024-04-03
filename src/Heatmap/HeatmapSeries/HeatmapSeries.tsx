import React, { FC, ReactElement, Fragment } from 'react';
import { HeatmapCell, HeatmapCellProps } from './HeatmapCell';
import { CloneElement } from 'rdk';
import { ColorSchemeType } from '../../common/color';
import { ChartInternalNestedDataShape } from '../../common/data';
import {
  ColorSchemeStyleArray,
  createColorSchemeValueScales,
  getColorSchemeStyles
} from '../../common/color/helper';

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
  colorScheme: ColorSchemeType | ColorSchemeStyleArray;

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

  /**
   * Selected cell(s) in active state
   */
  selections?: any;
}

export const HeatmapSeries: FC<Partial<HeatmapSeriesProps>> = ({
  animated,
  emptyColor,
  colorScheme,
  cell: cellElement,
  xScale,
  yScale,
  data,
  id,
  selections
}) => {
  const valueScales = createColorSchemeValueScales(
    data,
    colorScheme,
    emptyColor,
    selections
  );
  const height = yScale.bandwidth();
  const width = xScale.bandwidth();
  const cellCount = [...yScale.domain(), ...xScale.domain()].length;

  const renderCell = ({
    row,
    cell,
    rowIndex,
    cellIndex,
    width,
    height,
    cellCount
  }) => {
    const x = xScale(row.key);
    const y = yScale(cell.x);
    const style = getColorSchemeStyles(cell, valueScales);

    return (
      <CloneElement<HeatmapCellProps>
        key={`${id}-${rowIndex}-${cellIndex}`}
        element={cellElement}
        animated={animated}
        cellIndex={rowIndex + cellIndex}
        cellCount={cellCount}
        x={x}
        y={y}
        fill={style?.fill}
        stroke={style?.stroke}
        width={width}
        height={height}
        data={cell}
        style={style}
      />
    );
  };

  return (
    <Fragment>
      {data.map((row, rowIndex) =>
        row.data.map((cell, cellIndex) =>
          renderCell({
            height,
            width,
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
};

HeatmapSeries.defaultProps = {
  padding: 0.1,
  animated: true,
  emptyColor: 'rgba(200,200,200,0.08)',
  colorScheme: ['rgba(28, 107, 86, 0.5)', '#2da283'],
  cell: <HeatmapCell />
};
