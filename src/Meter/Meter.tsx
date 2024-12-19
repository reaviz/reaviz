import React, { FC, ReactElement } from 'react';
import { scaleLinear } from 'd3-scale';
import classNames from 'classnames';
import { MeterColumn, MeterColumnProps } from './MeterColumn';
import { CloneElement } from 'reablocks';
import css from './Meter.module.css';

export interface MeterProps {
  /**
   * The value of the meter.
   */
  value: number;

  /**
   * The minimum value of the meter.
   */
  min?: number;

  /**
   * The maximum value of the meter.
   */
  max?: number;

  /**
   * The number of columns to display.
   */
  columns?: number;

  /**
   * Additional class names to apply.
   */
  className?: string;

  /**
   * The gap between columns.
   */
  gap?: number;

  /**
   * Additional styles to apply.
   */
  style?: React.CSSProperties;

  /**
   * The column to render.
   */
  column: ReactElement<MeterColumnProps, typeof MeterColumn> | null;
}

export const Meter: FC<Partial<MeterProps>> = ({
  min = 0,
  max = 100,
  className,
  column = <MeterColumn />,
  gap = 15,
  style = {},
  value,
  columns = 10
}) => {
  const scale = scaleLinear().domain([min, max]).range([0, 100]);
  const cols = scale.ticks(columns);

  return (
    <div
      className={classNames(css.container, className)}
      style={{ gap: `${gap}px`, ...style }}
    >
      {cols.map((index) => (
        <CloneElement<MeterColumnProps>
          element={column}
          key={index}
          count={cols.length}
          index={index}
          scale={scale}
          value={value}
        />
      ))}
    </div>
  );
};
