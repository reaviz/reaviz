import { FC } from 'react';

export interface SunburstArcLabelProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: any;

  /**
   * Fill color for the arc.
   */
  fill: string;
}

export const SunburstArcLabel: FC<SunburstArcLabelProps> = ({}) => {
  return null;
};
