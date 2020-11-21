import React, { Component, Fragment, ReactElement } from 'react';
import { max } from 'd3-array';
import { arc } from 'd3-shape';
import { CloneElement } from 'rdk';
import memoize from 'memoize-one';
import { ArcData } from '../PieChart';
import { PieArc, PieArcProps } from './PieArc';
import { PieArcLabel, PieArcLabelProps } from './PieArcLabel';
import { getColor, ColorSchemeType } from '../../common/color';

export interface PieArcSeriesProps {
  animated: boolean;
  outerRadius: number;
  innerRadius: number;
  padAngle: number;
  padRadius: number;
  cornerRadius: number;
  data: ArcData[];
  arcWidth: number;

  doughnut: boolean;
  explode: boolean;
  displayAllLabels: boolean;
  label?: ReactElement<PieArcLabelProps, typeof PieArcLabel> | null;
  arc: ReactElement<PieArcProps, typeof PieArc>;
  colorScheme: ColorSchemeType;
  height: number;
  width: number;
}

const factor = 1.2;
const midAngle = (d: ArcData) => d.startAngle + (d.endAngle - d.startAngle) / 2;
const labelVisible = (arc: ArcData) =>
  arc.endAngle - arc.startAngle > Math.PI / 30;

export class PieArcSeries extends Component<PieArcSeriesProps> {
  static defaultProps: Partial<PieArcSeriesProps> = {
    animated: true,
    colorScheme: 'cybertron',
    innerRadius: 0,
    cornerRadius: 0,
    padAngle: 0,
    padRadius: 0,
    explode: false,
    displayAllLabels: false,
    arcWidth: 0.25,
    label: <PieArcLabel />,
    arc: <PieArc />
  };

  calculateRadius() {
    const { doughnut, arcWidth, label, width, height } = this.props;
    const minDimension = Math.min(width, height);

    let outerRadius = minDimension / 2;
    let labelWidth = 0;

    if (label) {
      labelWidth = label.props.width;

      if (labelWidth) {
        const outerArcRadius = width / 2 - labelWidth;

        outerRadius = Math.min(outerArcRadius / factor, height / 2);
      } else {
        outerRadius = minDimension / 3;
        labelWidth = width / 2 - outerRadius * factor;
      }
    }

    const innerRadius = doughnut ? outerRadius * (1 - arcWidth) : 0;

    return {
      outerRadius,
      innerRadius,
      labelWidth
    };
  }

  shouldDisplayLabel(arcData: ArcData) {
    const { displayAllLabels } = this.props;

    return displayAllLabels || labelVisible(arcData);
  }

  /**
   * @param data
   * @param outerRadius - an outerRadius of the pie
   * @param minDistance - minimal vertical distance between adjacent labels
   */
  calculateLabelPositions = memoize(
    (
      data: ArcData[],
      outerRadius: number,
      minDistance: number,
      cornerRadius: number,
      padAngle: number,
      padRadius: number
    ): Array<[number, number] | null> => {
      const outerArcRadius = outerRadius * factor;
      const outerArc = arc<any, ArcData>()
        .innerRadius(outerArcRadius)
        .outerRadius(outerArcRadius)
        .cornerRadius(cornerRadius)
        .padAngle(padAngle)
        .padRadius(padRadius);

      const positions: Array<[number, number] | null> = data.map((d) => {
        if (!this.shouldDisplayLabel(d)) {
          return null;
        }

        const pos = outerArc.centroid(d);

        // reposition the labels to the left/right from outerArc centroid
        // so that all labels won't collide with pie
        // when we will vertically reposition them
        pos[0] = outerArcRadius * (midAngle(d) < Math.PI ? 1 : -1);

        return pos;
      });

      for (let i = 0; i < data.length - 1; i++) {
        if (!positions[i]) {
          continue;
        }

        const [aPosX, aPosY] = positions[i];

        for (let j = i + 1; j < data.length; j++) {
          if (!positions[j]) {
            continue;
          }

          const [bPosX, bPosY] = positions[j];

          // if they're on the same side (both with - or + sign)
          if (bPosX * aPosX > 0) {
            // if they're overlapping
            const overlap = minDistance - Math.abs(bPosY - aPosY);

            if (overlap > 0) {
              // push the second up or down
              positions[j][1] += Math.sign(bPosX) * overlap;
            }
          }
        }
      }

      return positions;
    }
  );

  innerArc(
    innerRadius: number,
    outerRadius: number,
    cornerRadius: number,
    padAngle: number,
    padRadius
  ) {
    return (point: ArcData) => {
      const newOuter = this.calculateOuterRadius(outerRadius, point);

      return arc<any, ArcData>()
        .innerRadius(innerRadius)
        .outerRadius(newOuter)
        .cornerRadius(cornerRadius)
        .padRadius(padRadius)
        .padAngle(padAngle)(point);
    };
  }

  calculateOuterRadius(outerRadius: number, point: ArcData) {
    const { explode, data } = this.props;

    if (!explode || data === undefined) {
      return outerRadius;
    }

    const maxVal = max(data, (d: ArcData) => d.value);

    return (outerRadius * point.value) / maxVal;
  }

  centroid(innerRadius: number, outerRadius: number) {
    return (data: ArcData) => {
      const newOuter = this.calculateOuterRadius(outerRadius, data);

      return arc<any, ArcData>()
        .innerRadius(innerRadius)
        .outerRadius(newOuter)
        .centroid(data);
    };
  }

  render() {
    const {
      animated,
      cornerRadius,
      padAngle,
      padRadius,
      label,
      arc,
      data
    } = this.props;

    const { outerRadius, innerRadius, labelWidth } = this.calculateRadius();
    const innerArc = this.innerArc(
      innerRadius,
      outerRadius,
      cornerRadius,
      padAngle,
      padRadius
    );
    const positions = label
      ? this.calculateLabelPositions(
        data,
        outerRadius,
        // 4 is for vertical margins between labels
        label.props.height + 4,
        cornerRadius,
        padAngle,
        padRadius
      )
      : [];
    const centroid = this.centroid(innerRadius, outerRadius);

    return (
      <Fragment>
        {data.map((arcData, index) => (
          <Fragment key={arcData.data.key.toString()}>
            {positions[index] && (
              <CloneElement<PieArcLabelProps>
                element={label}
                data={arcData}
                centroid={centroid}
                outerRadius={outerRadius}
                width={labelWidth}
                position={positions[index]}
              />
            )}
            <CloneElement<PieArcProps>
              element={arc}
              data={arcData}
              animated={animated}
              arc={innerArc}
              color={getColor({
                data: this.props.data,
                colorScheme: this.props.colorScheme,
                point: arcData.data,
                index
              })}
            />
          </Fragment>
        ))}
      </Fragment>
    );
  }
}
