import React, { useCallback, FC } from 'react';
import cloud from 'd3-cloud';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { getColor, schemes } from '@/common/color';
import { ChartShallowDataShape } from '@/common/data';
import {
  ChartProps,
  ChartContainer,
  ChartContextProps
} from '@/common/containers';
import { WordCloudLabel } from './WordCloudLabel';

export interface WordCloudProps extends ChartProps {
  /**
   * Data to render in the word cloud.
   * The 'key' represents the word and 'data' represents its frequency/weight.
   */
  data: ChartShallowDataShape[];

  /**
   * Font size range [min, max].
   */
  fontSizeRange?: [number, number];

  /**
   * Font family to use.
   */
  fontFamily?: string;

  /**
   * Padding between words.
   */
  padding?: number;

  /**
   * Rotation angles for words.
   */
  rotationAngles?: [number, number];

  /**
   * Number of possible rotations.
   */
  rotations?: number;

  /**
   * Custom color scheme for words.
   */
  colorScheme?: string[];

  /**
   * Event triggered when a word is clicked.
   */
  onLabelClick?: (event: React.MouseEvent, data: ChartShallowDataShape) => void;

  /**
   * Mouse enter handler.
   */
  onLabelMouseEnter?: (
    event: React.PointerEvent,
    data: ChartShallowDataShape
  ) => void;

  /**
   * Mouse leave handler.
   */
  onLabelMouseLeave?: (
    event: React.PointerEvent,
    data: ChartShallowDataShape
  ) => void;
}

export const WordCloud: FC<Partial<WordCloudProps>> = ({
  data = [],
  width,
  height,
  fontSizeRange = [12, 50],
  fontFamily = 'Arial',
  padding = 3,
  rotationAngles = [-30, 30],
  rotations = 2,
  colorScheme = schemes.cybertron,
  onLabelClick,
  onLabelMouseEnter,
  onLabelMouseLeave,
  margins,
  className,
  containerClassName
}) => {
  const buildData = useCallback(
    (chartWidth: number, chartHeight: number) => {
      // Create scales
      const sizeScale = scaleLinear()
        .domain([0, max(data, (d) => Number(d.data)) || 0])
        .range(fontSizeRange);

      // Create layout
      const layout = cloud()
        .size([chartWidth, chartHeight])
        .words(
          data.map((d, index) => ({
            text: String(d.key),
            size: sizeScale(Number(d.data)),
            color: getColor({
              colorScheme,
              index,
              point: d,
              data
            }),
            data: d
          }))
        )
        .padding(padding)
        .font(fontFamily)
        .fontSize((d) => d.size)
        .rotate(() =>
          rotations > 0
            ? (Math.floor(Math.random() * rotations) *
                (rotationAngles[1] - rotationAngles[0])) /
                (rotations - 1) +
              rotationAngles[0]
            : 0
        );

      layout.start();
      const words = layout.words();
      return words;
    },
    [
      colorScheme,
      data,
      fontFamily,
      fontSizeRange,
      padding,
      rotationAngles,
      rotations
    ]
  );

  const renderChart = useCallback(
    ({ chartHeight, chartWidth }: ChartContextProps) => {
      const words = buildData(chartWidth, chartHeight);

      return words.map((word: any, i) => (
        <WordCloudLabel
          key={`${word.text}-${i}`}
          text={word.text}
          fontSize={word.size}
          fontFamily={fontFamily}
          fill={word.color}
          x={word.x || 0}
          y={word.y || 0}
          rotate={word.rotate || 0}
          data={word.data}
          onClick={onLabelClick}
          onMouseEnter={onLabelMouseEnter}
          onMouseLeave={onLabelMouseLeave}
        />
      ));
    },
    [buildData, fontFamily, onLabelClick, onLabelMouseEnter, onLabelMouseLeave]
  );

  return (
    <ChartContainer
      width={width}
      height={height}
      margins={margins}
      className={className}
      containerClassName={containerClassName}
      center={true}
    >
      {renderChart}
    </ChartContainer>
  );
};
