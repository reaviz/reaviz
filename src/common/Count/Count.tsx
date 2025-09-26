import type { FC } from 'react';
import React from 'react';

import type { CountInputs } from './useCount';
import { useCount } from './useCount';

export interface CountProps extends CountInputs {
  className?: string;
}

export const Count: FC<CountProps> = ({ className, ...rest }) => {
  const ref = useCount(rest);
  return <span ref={ref} className={className} />;
};
