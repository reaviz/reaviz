import React, { FC } from 'react';
import { CountInputs, useCount } from './useCount';

export interface CountProps extends CountInputs {
  className?: string;
}

export const Count: FC<CountProps> = ({ className, ...rest }) => {
  const ref = useCount(rest);
  return <span ref={ref} className={className} />;
};

Count.defaultProps = {
  from: 0,
  duration: 1,
  delay: 0,
  localize: true,
  decimalPlaces: 0
};
