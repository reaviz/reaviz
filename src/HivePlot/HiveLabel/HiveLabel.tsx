import React, { FC, useMemo } from 'react';
import css from './HiveLabel.module.css';

const degrees = (radians: number) => {
  const res = (radians / Math.PI) * 180;
  return res > 90 ? res + 180 : res;
};

const translate = (d: number, outerRadius: number, padding: number) =>
  d > 90 ? outerRadius + 8 + padding : -(outerRadius + padding);

interface HiveLabelProps {
  index: number;
  text: string;
  label: any;
  outerRadius: number;
  angle: (...args: any[]) => any;
}
export const HiveLabel: FC<Partial<HiveLabelProps>> = ({
  index,
  text,
  angle,
  outerRadius,
  label
}) => {
  const transform = useMemo(() => degrees(angle(index)), [angle, index]);

  return (
    <text
      dy={translate(transform, outerRadius, label.padding)}
      className={css.label}
      strokeWidth="0.01"
      textAnchor="middle"
      transform={`rotate(${transform})`}
    >
      {text}
    </text>
  );
};
