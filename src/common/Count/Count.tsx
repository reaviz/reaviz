import React, { FC } from 'react';
import { CountProps, useCount } from './useCount';

export const Count: FC<CountProps> = (props) => {
  const ref = useCount(props);
  return <span ref={ref} />;
};

Count.defaultProps = {
  from: 0,
  duration: 1,
  delay: 0,
  localize: true,
  decimalPlaces: 0
};
