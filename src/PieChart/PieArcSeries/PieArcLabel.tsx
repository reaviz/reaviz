import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { arc } from 'd3-shape';
import { ArcData } from '../PieChart';
import { ChartInternalDataTypes } from '../../common/data/types';
import { formatValue } from '../../common/utils/formatting';
import { findBreakPoint } from './findBreakPoint';

export interface PieArcLabelProps {
  /**
   * Data set by the parent component
   */
  data: ArcData;

  /**
   * A function returning the centroid of the corresponding `PieArc`
   * @param d PieArcDatum
   */
  centroid: (d: ArcData) => [number, number];

  /**
   * A Formatting function for the label value
   * @param v The label value
   */
  format?: (
    // have added any because not sure whether this change won't be breaking
    v: any & ArcData['data'] & { textAnchor: 'start' | 'end' }
  ) => React.ReactNode;

  /**
   * FontFill color
   */
  fontFill: string;

  /**
   * FontSize
   */
  fontSize: number;

  /**
   * FontFamily
   */
  fontFamily: string;

  /**
   * Line stroke of the label connector
   */
  lineStroke: string;

  /**
   * Outer radius of the corresponding `PieArc`
   */
  outerRadius: number;

  /**
   * y Padding of the label
   */
  padding: string;

  /**
   * The label position set by the parent component
   */
  position: [number, number];

  /**
   * Width of the label
   */
  width?: number;

  /**
   * Height of the label
   */
  height?: number;
}

const getTextAnchor = ({ startAngle, endAngle }: ArcData) =>
  // we could also use the sign of position[0]
  startAngle + (endAngle - startAngle) / 2 < Math.PI ? 'start' : 'end';

export const PieArcLabel: FC<Partial<PieArcLabelProps>> = ({
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
}) => {
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
};

PieArcLabel.defaultProps = {
  format: undefined,
  lineStroke: 'rgba(127,127,127,0.5)',
  fontFill: '#8F979F',
  fontSize: 11,
  fontFamily: 'sans-serif',
  padding: '.35em',
  height: 11
};
