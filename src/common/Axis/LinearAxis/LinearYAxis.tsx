import React, { FC, useMemo } from 'react';
import {
  LinearAxisTickLabelProps,
  LinearAxisTickLabel,
  LINEAR_AXIS_TICK_LABEL_DEFAULT_PROPS
} from './LinearAxisTickLabel';
import {
  LinearAxisTickLineProps,
  LinearAxisTickLine,
  LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS
} from './LinearAxisTickLine';
import {
  LinearAxisTickSeriesProps,
  LinearAxisTickSeries,
  LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS
} from './LinearAxisTickSeries';
import {
  LinearAxisProps,
  LinearAxis,
  LINEAR_AXIS_DEFAULT_PROPS
} from './LinearAxis';
import { mergeDefaultProps } from '@/common/utils';

export const LinearYAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => (
  <LinearAxisTickLabel
    {...mergeDefaultProps(LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS, props)}
  />
);
export const LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS = {
  ...LINEAR_AXIS_TICK_LABEL_DEFAULT_PROPS,
  rotation: false,
  position: 'start',
  align: 'center'
} as Partial<LinearAxisTickLabelProps>;

export const LinearYAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => (
  <LinearAxisTickLine
    {...mergeDefaultProps(LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS, props)}
  />
);
export const LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS = {
  ...LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS,
  position: 'start'
} as Partial<LinearAxisTickLineProps>;

export const LinearYAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => {
  const yTickSeriesProps = mergeDefaultProps(
    LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS,
    props
  );

  return (
    <LinearAxisTickSeries
      {...yTickSeriesProps}
      line={
        yTickSeriesProps?.line ? (
          <LinearYAxisTickLine
            {...mergeDefaultProps(
              LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
              props?.line?.props
            )}
          />
        ) : null
      }
      label={
        yTickSeriesProps?.label ? (
          <LinearYAxisTickLabel
            {...mergeDefaultProps(
              LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
              props?.label?.props
            )}
          />
        ) : null
      }
    />
  );
};
export const LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS = {
  ...LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS,
  tickSize: 30,
  line: <LinearYAxisTickLine {...LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS} />,
  label: <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
};

export const LinearYAxis: FC<Partial<LinearAxisProps>> = (props) => {
  const yAxisProps = useMemo(
    () => mergeDefaultProps(LINEAR_Y_AXIS_DEFAULT_PROPS, props),
    [props]
  );

  return (
    <LinearAxis
      {...yAxisProps}
      tickSeries={
        yAxisProps.tickSeries && (
          <LinearYAxisTickSeries
            {...mergeDefaultProps(
              LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS,
              yAxisProps?.tickSeries?.props
            )}
          />
        )
      }
    />
  );
};
export const LINEAR_Y_AXIS_DEFAULT_PROPS = {
  ...LINEAR_AXIS_DEFAULT_PROPS,
  orientation: 'vertical',
  scaled: false,
  roundDomains: false,
  type: 'value',
  position: 'start',
  tickSeries: <LinearYAxisTickSeries />
} as Partial<LinearAxisProps>;
