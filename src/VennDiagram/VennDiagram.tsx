import React, { FC, Fragment, useCallback } from 'react';
import { ChartContainer, ChartContainerChildProps, ChartProps } from '../common/containers';
import { IVennLayout, layout } from '@upsetjs/venn.js';
import { motion } from 'framer-motion';
import { getColor } from '../common/color';

export interface VennDiagramData {
  key: string[];
  data: number;
}

export interface VennDiagramProps extends ChartProps {
  colorScheme?: string;
  data: VennDiagramData[];
}

export const VennDiagram: FC<VennDiagramProps> = ({
  colorScheme = 'cybertron',
  id, width, height, margins, className, data,
}) => {
  const normalized = data.map(d => ({ sets: d.key, size: d.data }));

  const renderCircle = useCallback((d: IVennLayout<any>, index: number) => {
    const key = d.data.sets.join(' | ');
    const point = { key: d.data.sets, value: d.data.size };
    const color = getColor({
      data,
      colorScheme,
      point,
      index
    });

    return (
      <g key={key}>
        <title>{key}</title>
        <path
          opacity={.5}
          d={d.path}
          fill={color}
        />
        <text x={d.text.x} y={d.text.y}>
          {key}
        </text>
      </g>
    )
  }, [colorScheme]);

  const renderChart = useCallback((containerProps: ChartContainerChildProps) => {
    const layoutData = layout(normalized, {
      height: containerProps.height,
      width: containerProps.width
    });

    return (
      <Fragment>
        {layoutData.map(renderCircle)}
      </Fragment>
    )
  }, [normalized]);

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      center={false}
      className={className}
    >
      {props => renderChart(props)}
    </ChartContainer>
  );
}
