import React, { FC } from 'react';
import { CountInputs, useCount } from './useCount';

export interface CountProps extends CountInputs {
  /**
   * CSS class to apply to the counter element.
   */
  className?: string;
}

export const Count: FC<CountProps> = ({ className, ...rest }) => {
  const ref = useCount(rest);
  return <span ref={ref} className={className} />;
};
