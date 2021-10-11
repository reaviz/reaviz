import { max } from 'd3-array';
import { arc } from 'd3-shape';
import { ArcData } from '../PieChart';

const factor = 1.2;
const midAngle = (d: ArcData) => d.startAngle + (d.endAngle - d.startAngle) / 2;
const labelVisible = (arc: ArcData) =>
  arc.endAngle - arc.startAngle > Math.PI / 30;

function shouldDisplayLabel(displayAllLabels: boolean, arcData: ArcData) {
  return displayAllLabels || labelVisible(arcData);
}

export function calculateOuterRadius(
  outerRadius: number,
  data: ArcData[],
  point: ArcData,
  explode: boolean,
) {
  if (!explode || data === undefined) {
    return outerRadius;
  }

  const maxVal = max(data, (d: ArcData) => d.value);

  return (outerRadius * point.value) / maxVal;
}

export function calculateCentroid(
  data: ArcData[],
  innerRadius: number,
  outerRadius: number,
  explode: boolean
) {
  return (point: ArcData) => {
    const newOuter = calculateOuterRadius(outerRadius, data, point, explode);

    return arc<any, ArcData>()
      .innerRadius(innerRadius)
      .outerRadius(newOuter)
      .centroid(point);
  };
}

export function calculateRadius(
  height,
  width,
  label,
  arcWidth,
  doughnut
) {
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

export function calculateInnerArc(
  data: ArcData[],
  innerRadius: number,
  outerRadius: number,
  cornerRadius: number,
  padAngle: number,
  padRadius: number,
  explode: boolean
) {
  return (point: ArcData) => {
    const newOuter = calculateOuterRadius(outerRadius, data, point, explode);

    return arc<any, ArcData>()
      .innerRadius(innerRadius)
      .outerRadius(newOuter)
      .cornerRadius(cornerRadius)
      .padRadius(padRadius)
      .padAngle(padAngle)(point);
  };
}

export function calculateLabelPositions(
  data: ArcData[],
  outerRadius: number,
  minDistance: number,
  cornerRadius: number,
  padAngle: number,
  padRadius: number,
  displayAllLabels: boolean
): Array<[number, number] | null> {
  const outerArcRadius = outerRadius * factor;
  const outerArc = arc<any, ArcData>()
    .innerRadius(outerArcRadius)
    .outerRadius(outerArcRadius)
    .cornerRadius(cornerRadius)
    .padAngle(padAngle)
    .padRadius(padRadius);

  const positions: Array<[number, number] | null> = data.map((d) => {
    if (!shouldDisplayLabel(displayAllLabels, d)) {
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
