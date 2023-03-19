import React, { FC, useCallback } from 'react';
import {
  ChartInternalDataTypes,
  ChartShallowDataShape,
  ColorSchemeType,
  DEFAULT_TRANSITION,
  formatValue,
  getColor
} from '../common';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import css from './BarListSeries.module.css';

export type BarListLabelPosition = 'none' | 'top' | 'start' | 'end' | 'bottom';

export interface BarListSeriesProps {
  /**
   * Data for the chart.
   */
  data?: ChartShallowDataShape[];

  /**
   * Color scheme for the chart.
   */
  colorScheme?: ColorSchemeType;

  /**
   * The label position.
   */
  labelPosition?: BarListLabelPosition;

  /**
   * The value position.
   */
  valuePosition?: BarListLabelPosition;

  /**
   * The bar item class name.
   */
  itemClassName?: string;

  /**
   * Label css class name.
   */
  labelClassName?: string;

  /**
   * Label value class name.
   */
  valueClassName?: string;

  /**
   * Bar component class name.
   */
  barClassName?: string;

  /**
   * Bar container class name.
   */
  outerBarClassName?: string;

  /**
   * Custom value format
   */
  valueFormat?: (data: ChartInternalDataTypes, index: number) => string;

  /**
   * Item was clicked.
   */
  onItemClick?: (data: ChartShallowDataShape) => void;

  /**
   * Item had mouse enter.
   */
  onItemMouseEnter?: (data: ChartShallowDataShape) => void;

  /**
   * Item had mouse leave.
   */
  onItemMouseLeave?: (data: ChartShallowDataShape) => void;
}

export const BarListSeries: FC<Partial<BarListSeriesProps>> = ({
  data,
  colorScheme,
  itemClassName,
  labelClassName,
  outerBarClassName,
  valueClassName,
  barClassName,
  labelPosition,
  valuePosition,
  valueFormat,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave
}) => {
  const renderBar = useCallback(
    (item, index) => {
      const fill = getColor({
        data,
        colorScheme,
        point: item.data,
        index
      });

      return (
        <div className={classNames(css.outerBar, outerBarClassName)}>
          <motion.div
            transition={DEFAULT_TRANSITION}
            className={classNames(css.bar, barClassName)}
            initial={{ width: '0%' }}
            animate={{ width: `${item.data}%` }}
            style={{ background: fill }}
          />
        </div>
      );
    },
    [barClassName, outerBarClassName, colorScheme, data]
  );

  return (
    <>
      {data.map((d, i) => {
        const valueLabel = valueFormat
          ? valueFormat(d.metadata.value, i)
          : formatValue(d.metadata.value);

        return (
          <div
            key={d.key as string}
            role="listitem"
            className={classNames(css.item, itemClassName, {
              [css.clickable]: onItemClick,
              [css.valueBottom]: valuePosition === 'bottom',
              [css.valueStart]: valuePosition === 'start',
              [css.valueEnd]: valuePosition === 'end',
              [css.valueNone]: valuePosition === 'none',
              [css.labelBottom]: labelPosition === 'bottom',
              [css.labelTop]: labelPosition === 'top',
              [css.labelStart]: labelPosition === 'start',
              [css.labelEnd]: labelPosition === 'end',
              [css.labelNone]: labelPosition === 'none'
            })}
            onMouseEnter={() => onItemMouseEnter?.(d)}
            onMouseLeave={() => onItemMouseLeave?.(d)}
            onClick={() => onItemClick?.(d)}
          >
            <label className={classNames(css.label, labelClassName)}>
              {d.key as string}
            </label>
            {renderBar(d, i)}
            <label
              title={valueLabel}
              className={classNames(css.valueLabel, valueClassName)}
            >
              <small>{valueLabel}</small>
            </label>
          </div>
        );
      })}
    </>
  );
};

BarListSeries.defaultProps = {
  colorScheme: 'cybertron',
  labelPosition: 'top',
  valuePosition: 'none'
};
