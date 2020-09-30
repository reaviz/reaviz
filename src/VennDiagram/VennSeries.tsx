import React, { FC, Fragment, useCallback } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { getColor } from '../common/color';
import { VennArc } from './VennArc';
import { VennLabel } from './VennLabel';

export interface VennSeriesProps {
  data: IVennLayout<any>[];
  colorScheme?: string;
}

export const VennSeries: FC<VennSeriesProps> = ({
  data,
  colorScheme = 'cybertron'
}) => {
  const renderSection = useCallback((d: IVennLayout<any>, index: number) => {
    const point = { key: d.data.sets, value: d.data.size };
    const fill = getColor({
      data,
      colorScheme,
      point,
      index
    });

    return (
      <g key={d.data.sets.toString()}>
        <VennArc data={d} fill={fill} />
        <VennLabel data={d} />
      </g>
    );
  }, [colorScheme, data]);

  return (
    <Fragment>
      {data.map(renderSection)}
    </Fragment>
  );
};
