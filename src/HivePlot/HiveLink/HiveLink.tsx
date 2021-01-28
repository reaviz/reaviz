import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import { hiveLayout } from './hiveLayout';
import { Link } from '../types';
import css from './HiveLink.module.css';

interface HiveLinkProps {
  angle: (...args: any[]) => any;
  radius: (...args: any[]) => any;
  color: (...args: any[]) => any | string;
  link: Link;
  active?: boolean;
  onMouseOver: (...args: any[]) => any;
  onMouseOut: (...args: any[]) => any;
}
export const HiveLink: FC<Partial<HiveLinkProps>> = ({
  angle,
  radius,
  link,
  color,
  active,
  onMouseOver,
  onMouseOut
}) => {
  const prepareData = () => {
    const hive = hiveLayout();

    return {
      hiveAngle: hive.angle((d) => angle(d.x)),
      hiveRadius: hive.radius((d) => radius(d.y))
    };
  };

  const { hiveAngle, hiveRadius } = useMemo(() => prepareData(), [
    angle,
    radius
  ]);
  const stroke = typeof color === 'string' ? color : color(link.source.x);

  return (
    <path
      className={classNames(css.link, {
        [css.inactive]: !active
      })}
      d={`${hiveAngle(link)} ${hiveRadius(link)}`}
      stroke={stroke}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
};
