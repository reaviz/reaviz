import React, { FC, Fragment } from 'react';
import { getDegrees } from '../../common/utils/math';
import css from './HiveAxis.module.css';

interface HiveAxisProps {
  angle: (...args: any[]) => any;
  color: (...args: any[]) => any;
  radius: any;
  index: number;
}
export const HiveAxis: FC<Partial<HiveAxisProps>> = ({
  radius,
  index,
  angle,
  color
}) => {
  const [axisStart, axisEnd] = radius.range();
  const axisLength = axisEnd - axisStart;

  return (
    <Fragment>
      <line
        className={css.axis}
        style={{ stroke: color(index) }}
        transform={`rotate(${getDegrees(angle(index))})`}
        x1={axisStart}
        x2={axisEnd}
      />
      <line
        className={css.axis}
        style={{ stroke: color(index) }}
        transform={`rotate(${getDegrees(angle(index)) + 90})`}
        x1={-axisLength / 20}
        x2={axisLength / 20}
        y1={-axisEnd}
        y2={-axisEnd}
      />
      <line
        className={css.axis}
        style={{ stroke: color(index) }}
        transform={`rotate(${getDegrees(angle(index)) + 90})`}
        x1={-axisStart / 3}
        x2={0}
        y1={axisStart * -0.8}
        y2={axisStart * -1}
      />
      <line
        className={css.axis}
        style={{ stroke: color(index) }}
        transform={`rotate(${getDegrees(angle(index)) + 90})`}
        x1={0}
        x2={axisStart / 3}
        y1={-axisStart}
        y2={axisStart * -0.8}
      />
    </Fragment>
  );
};
