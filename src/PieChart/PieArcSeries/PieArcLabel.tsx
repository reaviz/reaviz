import React, { PureComponent } from 'react';
import { formatValue } from '../../common/utils/formatting';
import { motion } from 'framer-motion';

export interface PieArcLabelProps {
  data: any;
  centroid: any;
  format?: (v) => any;
  fontFill: string;
  fontSize: number;
  fontFamily: string;
  lineStroke: string;
  padding: string;
  position: [number, number];
}

const getTextAnchor = ({ startAngle, endAngle }) =>
  startAngle + (endAngle - startAngle) / 2 < Math.PI ? 'start' : 'end';

export class PieArcLabel extends PureComponent<PieArcLabelProps> {
  static defaultProps: Partial<PieArcLabelProps> = {
    format: undefined,
    lineStroke: 'rgba(127,127,127,0.5)',
    fontFill: '#8F979F',
    fontSize: 11,
    fontFamily: 'sans-serif',
    padding: '.35em'
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
      position
    } = this.props;

    const text = format ? format(data.data) : formatValue(data.data.key);
    const textAnchor = getTextAnchor(data);
    const [posX, posY] = position;

    const innerPoint = centroid(data);

    let breakPoint = [0, 0];
    // whether we should create breakpoint near pie or near label
    const breakPointCondition =
      (posY - innerPoint[1]) * Math.sign(innerPoint[1]) > 0;

    if (breakPointCondition) {
      // extend the line starting from innerPoint till the posY
      let scale = Math.abs(posY / innerPoint[1]) || 1;
      const minScale = 1;
      const maxScale = Math.abs(posX / innerPoint[0]) || 1;

      scale = Math.max(Math.min(maxScale, scale), minScale);

      breakPoint = [innerPoint[0] * scale, posY];
    } else {
      let scale = 0.85;
      const minScale = Math.abs(innerPoint[0] / posX) || 1;
      const maxScale = 1;

      scale = Math.max(Math.min(maxScale, scale), minScale);

      breakPoint = [posX * scale, innerPoint[1]];
    }

    return (
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1
        }}
      >
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
        <polyline
          fill="none"
          stroke={lineStroke}
          points={`0,0,${[innerPoint]},${breakPoint},${position}`}
        />
      </motion.g>
    );
  }
}
