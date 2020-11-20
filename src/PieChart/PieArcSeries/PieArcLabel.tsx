import React, { PureComponent } from 'react';
import { motion } from 'framer-motion';
import { arc } from 'd3-shape';
import type { ArcData } from '../PieChart';
import type { ChartInternalDataTypes } from '../../common/data/types';
import { formatValue } from '../../common/utils/formatting';
import { findBreakPoint } from './findBreakPoint';

export interface PieArcLabelProps {
  data: ArcData;
  centroid: (d: ArcData) => [number, number];
  format?: (
    // have added any because not sure whether this change won't be breaking
    v: any & ArcData['data'] & { textAnchor: 'start' | 'end' }
  ) => React.ReactNode;
  fontFill: string;
  fontSize: number;
  outerRadius: number;
  fontFamily: string;
  lineStroke: string;
  padding: string;
  position: [number, number];
  width?: number;
  height?: number;
}

const getTextAnchor = ({ startAngle, endAngle }: ArcData) =>
  // we could also use the sign of position[0]
  startAngle + (endAngle - startAngle) / 2 < Math.PI ? 'start' : 'end';

export class PieArcLabel extends PureComponent<PieArcLabelProps> {
  static defaultProps: Partial<PieArcLabelProps> = {
    format: undefined,
    lineStroke: 'rgba(127,127,127,0.5)',
    fontFill: '#8F979F',
    fontSize: 11,
    fontFamily: 'sans-serif',
    padding: '.35em',
    height: 11
  };

  render() {
    const {
      centroid,
      data,
      lineStroke,
      padding,
      fontSize,
      fontFill,
      format,
      fontFamily,
      position,
      outerRadius,
      width,
      height
    } = this.props;

    const textAnchor = getTextAnchor(data);
    const text: React.ReactNode = format
      ? format({ ...data.data, textAnchor })
      : formatValue(data.data.key as ChartInternalDataTypes);
    const [posX, posY] = position;
    // we want to have at least some pixels of straight line (margin)
    // from pie section till we start to change line direction
    const minRadius = outerRadius + 4;

    const startPoint = centroid(data);
    const innerPoint = arc<ArcData>()
      .innerRadius(minRadius)
      .outerRadius(minRadius)
      .centroid(data);
    const breakPoint = findBreakPoint(innerPoint, position);

    return (
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1
        }}
      >
        {typeof text === 'string' ? (
          <>
            <title>{text}</title>
            <text
              dy={padding}
              fill={fontFill}
              fontSize={fontSize}
              fontFamily={fontFamily}
              textAnchor={textAnchor}
              style={{
                shapeRendering: 'crispEdges',
                transform: `translate3d(${posX}px,${posY}px, 0)`
              }}
            >
              {text}
            </text>
          </>
        ) : (
          <foreignObject
            width={width}
            height={height}
            style={{
              transform: `translate3d(${
                textAnchor === 'start' ? posX : posX - width
              }px,${posY - height / 2}px, 0)`,
              color: fontFill,
              fontFamily,
              fontSize
            }}
          >
            {text}
          </foreignObject>
        )}
        <polyline
          fill="none"
          stroke={lineStroke}
          points={`${startPoint},${innerPoint},${breakPoint},${position}`}
        />
      </motion.g>
    );
  }
}
