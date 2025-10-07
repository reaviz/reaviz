import type { FC } from 'react';
import React, { useMemo } from 'react';

import { mergeDefaultProps } from '@/common/utils';

import type { LinearAxisProps } from './LinearAxis';
import { LINEAR_AXIS_DEFAULT_PROPS, LinearAxis } from './LinearAxis';
import type { LinearAxisTickLabelProps } from './LinearAxisTickLabel';
import {
  LINEAR_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LinearAxisTickLabel
} from './LinearAxisTickLabel';
import type { LinearAxisTickLineProps } from './LinearAxisTickLine';
import {
  LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisTickLine
} from './LinearAxisTickLine';
import type { LinearAxisTickSeriesProps } from './LinearAxisTickSeries';
import {
  LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS,
  LinearAxisTickSeries
} from './LinearAxisTickSeries';

export const LinearXAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => (
  <LinearAxisTickLabel
    {...mergeDefaultProps(LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS, props)}
  />
);
export const LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS = {
  ...LINEAR_AXIS_TICK_LABEL_DEFAULT_PROPS,
  rotation: true,
  position: 'end',
  align: 'center'
} as Partial<LinearAxisTickLabelProps>;

export const LinearXAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => (
  <LinearAxisTickLine
    {...mergeDefaultProps(LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS, props)}
  />
);
export const LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS = {
  ...LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS,
  position: 'end'
} as Partial<LinearAxisTickLineProps>;

export const LinearXAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => {
  const xTickSeriesProps = mergeDefaultProps(
    LINEAR_X_AXIS_TICK_SERIES_DEFAULT_PROPS,
    props
  );

  return (
    <LinearAxisTickSeries
      {...xTickSeriesProps}
      line={
        xTickSeriesProps?.line ? (
          <LinearXAxisTickLine
            {...mergeDefaultProps(
              LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
              props?.line?.props
            )}
          />
        ) : null
      }
      label={
        xTickSeriesProps?.label ? (
          <LinearXAxisTickLabel
            {...mergeDefaultProps(
              LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS,
              props?.label?.props
            )}
          />
        ) : null
      }
    />
  );
};
export const LINEAR_X_AXIS_TICK_SERIES_DEFAULT_PROPS = {
  ...LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS,
  tickSize: 75,
  line: <LinearXAxisTickLine {...LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS} />,
  label: <LinearXAxisTickLabel {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS} />
};

export const LinearXAxis: FC<Partial<LinearAxisProps>> = (props) => {
  const xAxisProps = useMemo(
    () => mergeDefaultProps(LINEAR_X_AXIS_DEFAULT_PROPS, props),
    [props]
  );

  return (
    <LinearAxis
      {...xAxisProps}
      tickSeries={
        xAxisProps.tickSeries && (
          <LinearXAxisTickSeries
            {...mergeDefaultProps(
              LINEAR_X_AXIS_TICK_SERIES_DEFAULT_PROPS,
              xAxisProps?.tickSeries?.props
            )}
          />
        )
      }
    />
  );
};
export const LINEAR_X_AXIS_DEFAULT_PROPS = {
  ...LINEAR_AXIS_DEFAULT_PROPS,
  position: 'end',
  roundDomains: false,
  scaled: false,
  type: 'value',
  orientation: 'horizontal',
  tickSeries: <LinearXAxisTickSeries />
} as Partial<LinearAxisProps>;
