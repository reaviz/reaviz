import type { FC } from 'react';
import React from 'react';

import type { RadialGaugeArcProps } from './RadialGaugeArc';
import { RadialGaugeArc } from './RadialGaugeArc';

export const RadialGaugeOuterArc: FC<Partial<RadialGaugeArcProps>> = (
  props
) => <RadialGaugeArc animated={false} disabled={true} {...props} />;
