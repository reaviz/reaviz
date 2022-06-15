import React, { FC } from 'react';
import { RadialGaugeArc, RadialGaugeArcProps } from './RadialGaugeArc';

export const RadialGaugeOuterArc: FC<Partial<RadialGaugeArcProps>> = (
  props
) => <RadialGaugeArc {...props} />;

RadialGaugeOuterArc.defaultProps = {
  animated: false,
  disabled: true
};
