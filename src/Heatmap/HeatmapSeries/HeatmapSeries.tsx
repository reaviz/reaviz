import React, { FC, ReactElement, Fragment } from 'react';
import { HeatmapCell, HeatmapCellProps } from './HeatmapCell';
import { scaleQuantile } from 'd3-scale';
import { uniqueBy } from '../../common/utils/array';
import { extent } from 'd3-array';
import { CloneElement } from 'rdk';
import { ColorSchemeType, getColor } from '../../common/color';
import { ChartInternalNestedDataShape } from '../../common/data';
import { Glow } from '../../common';
import { generateGlowStyles } from '../../common/Glow/utils';

export type HeatmapColorSchemeItem = {
  fill: string;
  stroke?: string;
  glow?: Glow;
};

export type HeatmapColorScheme = HeatmapColorSchemeItem[];

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
  colorScheme: ColorSchemeType | HeatmapColorScheme;

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

const getValueScale = (data, colorScheme: ColorSchemeType, emptyColor) => {
  const valueDomain = extent(
    uniqueBy(
      data,
      (d) => d.data,
      (d) => d.value
    )
  );

  return (point) => {
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
};

const buildColorSchemeFromHeatmapScheme = (
  colorScheme: ColorSchemeType | HeatmapColorScheme,
  colorSchemeProperty: keyof HeatmapColorSchemeItem
): ColorSchemeType => {
  if (!Array.isArray(colorScheme)) {
    return colorScheme;
  }

  const newColorScheme = colorScheme.map(
    (schemeItem: string | HeatmapColorSchemeItem) => {
      if (colorSchemeProperty === 'glow') {
        return generateGlowStyles({ glow: schemeItem?.[colorSchemeProperty] })
          ?.filter;
      } else if (typeof schemeItem === 'object') {
        return schemeItem?.[colorSchemeProperty] || schemeItem?.fill; // use fill if no stroke in the color scheme
      }

      return schemeItem;
    }
  );

  return newColorScheme;
};

const getHeatmapValueScales = (
  data,
  colorScheme: ColorSchemeType | HeatmapColorScheme,
  emptyColor: string
) => {
  const getColorSchemeForProperty = (
    colorSchemeProperty: keyof HeatmapColorSchemeItem
  ) =>
    Array.isArray(colorScheme)
      ? buildColorSchemeFromHeatmapScheme(colorScheme, colorSchemeProperty)
      : colorScheme;

  return {
    fillValueScale: getValueScale(
      data,
      getColorSchemeForProperty('fill'),
      emptyColor
    ),
    strokeValueScale: getValueScale(
      data,
      getColorSchemeForProperty('stroke'),
      emptyColor
    ),
    glowValueScale: getValueScale(
      data,
      getColorSchemeForProperty('glow'),
      emptyColor
    )
  };
};

export const HeatmapSeries: FC<Partial<HeatmapSeriesProps>> = ({
  animated,
  emptyColor,
  colorScheme,
  cell: cellElement,
  xScale,
  yScale,
  data,
  id
}) => {
  const { fillValueScale, strokeValueScale, glowValueScale } =
    getHeatmapValueScales(data, colorScheme, emptyColor);

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
    const fill = fillValueScale(cell.value);
    const stroke = strokeValueScale(cell.value);
    const glowFilter = glowValueScale(cell.value);

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
        stroke={stroke}
        filter={glowFilter}
        width={width}
        height={height}
        data={cell}
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
