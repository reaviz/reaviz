import type { FC } from 'react';
import React from 'react';

export interface GradientStopProps {
  offset: number | string;
  stopOpacity: number | string;
  color?: string;
}

export const GradientStop: FC<Partial<GradientStopProps>> = ({
  color,
  offset,
  stopOpacity = 1,
}) => <stop offset={offset} stopOpacity={stopOpacity} stopColor={color} />;
