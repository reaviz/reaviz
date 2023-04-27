import React, { FC } from 'react';
import css from './Marker.module.css';

export interface MarkerProps {
  width: number;
  pointY?: number;
  strokeColor: string;
  strokeWidth: number;
  textColor : string,
  fontSize:number,
  label:string,
  data:any[]
}

export const Marker: FC<Partial<MarkerProps>> = ({
  pointY = 10,
  width,
  strokeWidth = 2,
  strokeColor = 'red',
  textColor = 'red',
  fontSize = 11,
  label = "Some Label",
  data
}) => {
  let max = 0
  data.forEach((element) => {
     if(!max)
      max = element.value
     if(element.value >= max)
      max = element.value
  });
  
  let cos = (max / 100) * 100
  let topPoint = ((max - pointY) * 10) + 2
  return <g transform={`translate(0, ${topPoint})`}>
            <line strokeWidth={strokeWidth} stroke={strokeColor} x1="0" x2={width} y1="0" y2="0"></line>
            <g transform={`translate(${width - (label.length * 6)}, 5)`}>
              <text fontSize={fontSize}  alignmentBaseline="hanging" fill={textColor}>{label}</text>
            </g>
          </g>
}
