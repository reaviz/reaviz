import { buildShallowChartData, ChartInternalShallowDataShape, ChartShallowDataShape, extent, getYDomain, uniqueBy } from '../../src/index';
import { scaleLinear, scaleBand, scaleTime } from 'd3-scale';
import { range } from 'd3-array';
import { getRadialYScale } from '../../src/common/scales';
import { randomNumber } from '../../demo';
import moment from 'moment';

export const ARC_COUNT = 12;
export const INNER_RADIUS = 25;

const startDate = moment().startOf('day');
export const generateData = () =>
  range(48).map(i => ({
      // Dont do this, its for demo purposes
      id: `${new Date().getTime()}-${i})}`,
      key: startDate.clone().add(1 * i, 'hour').toDate(),
      data: randomNumber(1, 100)
    }));

export const getRadius = (
  startIdx: number,
  endIdx: number,
  rad: number
) => {
  const scale = scaleLinear()
    .domain([0, ARC_COUNT])
    .range([INNER_RADIUS, rad]);

  const arcs = scale.ticks(ARC_COUNT);
  return {
    innerRadius: scale(arcs[startIdx]),
    outerRadius: scale(arcs[endIdx])
  };
};

export const buildScale = (
  initialData: ChartShallowDataShape[],
  outerRad = 0,
  innerRad = 0,
  isTime = false,
  xDomain?: [Date, Date]
) => {
  const data = buildShallowChartData(
    initialData
  ) as ChartInternalShallowDataShape[];

  let xScale;
  if (isTime) {
    xDomain = (xDomain || extent(data, 'x')) as [Date, Date];

    xScale = scaleTime()
      .range([0, 2 * Math.PI])
      // @ts-ignore
      .domain(xDomain);
  } else {
    xDomain = (xDomain ||
      uniqueBy<ChartInternalShallowDataShape>(data, d => d.x)) as [
      Date,
      Date
    ];

    xScale = scaleBand()
      .range([0, 2 * Math.PI])
      // @ts-ignore
      .domain(xDomain);
  }

  const yDomain = getYDomain({ data, scaled: false });

  return {
    yScale: getRadialYScale(innerRad, outerRad, yDomain),
    xScale,
    data
  };
};
