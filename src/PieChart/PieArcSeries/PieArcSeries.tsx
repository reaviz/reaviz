import React, { Component, Fragment, ReactElement } from 'react';
import { PieArc, PieArcProps } from './PieArc';
import { arc } from 'd3-shape';
import { PieArcLabel, PieArcLabelProps } from './PieArcLabel';
import { CloneElement } from '../../common/utils/children';
import { getColor, ColorSchemeType } from '../../common/color';
import { max } from 'd3-array';

export interface PieArcSeriesProps {
  animated: boolean;
  outerRadius: number;
  innerRadius: number;
  data: any;
  arcWidth: number;
  doughnut: boolean;
  explode: boolean;
  displayAllLabels: boolean;
  height: number;
  width: number;
  label?: ReactElement<PieArcLabelProps, typeof PieArcLabel> | null;
  arc: ReactElement<PieArcProps, typeof PieArc>;
  colorScheme: ColorSchemeType;
}

const factor = 1.2;
const midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2;
const labelVisible = arc => arc.endAngle - arc.startAngle > Math.PI / 30;

export class PieArcSeries extends Component<PieArcSeriesProps> {
  static defaultProps: Partial<PieArcSeriesProps> = {
    animated: true,
    colorScheme: 'cybertron',
    innerRadius: 0,
    explode: false,
    displayAllLabels: false,
    arcWidth: 0.25,
    label: <PieArcLabel />,
    arc: <PieArc />
  };

  calculateRadius() {
    const { doughnut, arcWidth, label, width, height } = this.props;

    const outerRadius = Math.min(width, height) / (label ? 3 : 2);
    const innerRadius = doughnut ? outerRadius * (1 - arcWidth) : 0;

    return {
      outerRadius,
      innerRadius
    };
  }

  shouldDisplayLabel(arcData) {
    const { displayAllLabels } = this.props

    return displayAllLabels || labelVisible(arcData)
  }

  calculateLabelPositions(outerArc, outerRadius) {
    const { label, data } = this.props;

    const positions = data.map(d => {
      const pos = outerArc.centroid(d);
      pos[0] = factor * outerRadius * (midAngle(d) < Math.PI ? 1 : -1);
      return pos;
    });

    if (label) {
      const minDistance = 15;

      for (let i = 0; i < data.length - 1; i++) {
        const a = data[i];
        if (!this.shouldDisplayLabel(a)) {
          continue;
        }

        const [aPosX, aPosY] = positions[i];

        for (let j = i + 1; j < data.length; j++) {
          const b = data[j];
          if (!this.shouldDisplayLabel(b)) {
            continue;
          }

          // if they're on the same side
          const [bPosX, bPosY] = positions[j];
          if (bPosX * aPosX > 0) {
            // if they're overlapping
            const o = minDistance - Math.abs(bPosY - aPosY);
            if (o > 0) {
              // push the second up or down
              positions[j][1] += Math.sign(bPosX) * o;
            }
          }
        }
      }
    }

    return positions;
  }

  innerArc(innerRadius: number, outerRadius: number) {
    return point => {
      const newOuter = this.calculateOuterRadius(outerRadius, point);
      return arc()
        .innerRadius(innerRadius)
        .outerRadius(newOuter)(point);
    };
  }

  calculateOuterRadius(outerRadius, point) {
    const { explode, data } = this.props;

    if (!explode) {
      return outerRadius;
    }

    const maxVal = max(data, d => d.value);

    let newOuter = outerRadius;
    if (explode && data !== undefined) {
      newOuter = (outerRadius * point.value) / maxVal;
    }

    return newOuter;
  }

  centroid(innerRadius: number, outerRadius: number) {
    return data => {
      const newOuter = this.calculateOuterRadius(outerRadius, data);

      return arc()
        .innerRadius(innerRadius)
        .outerRadius(newOuter)
        .centroid(data);
    };
  }

  outerArc(outerRadius: number) {
    return arc()
      .innerRadius(outerRadius * factor)
      .outerRadius(outerRadius * factor);
  }

  render() {
    const { animated, label, arc, data } = this.props;

    const { outerRadius, innerRadius } = this.calculateRadius();
    const innerArc = this.innerArc(innerRadius, outerRadius);
    const outerArc = this.outerArc(outerRadius);
    const positions = this.calculateLabelPositions(outerArc, outerRadius);
    const centroid = this.centroid(innerRadius, outerRadius);

    return (
      <Fragment>
        {data.map((arcData: any, index: number) => (
          <Fragment key={arcData.data.key.toString()}>
            {label && this.shouldDisplayLabel(arcData) && (
              <CloneElement<PieArcLabelProps>
                element={label}
                data={arcData}
                centroid={centroid}
                position={positions[index]}
              />
            )}
            <CloneElement<PieArcProps>
              element={arc}
              data={arcData}
              animated={animated}
              innerArc={innerArc}
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
