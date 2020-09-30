import { scaleLinear } from 'd3-scale';
import { ChartInternalNestedDataShape } from '../data';
import { uniqueBy } from '../utils/array';

interface MariemkoScaleData {
  data: ChartInternalNestedDataShape[];
  width: number;
  valueScale: any;
  padding: number;
}

/**
 * Get a linear scale for the mariemko chart.
 */
export const getMarimekkoScale = (width: number, roundDomains: boolean) => {
  const scale = scaleLinear().rangeRound([0, width]);
  return roundDomains ? scale.nice() : scale;
};

/**
 * Builds a fake scale function to get a group scale for a marimekko value scale.
 */
export const getMarimekkoGroupScale = ({
  data,
  width,
  valueScale,
  padding
}: MariemkoScaleData) => {
  const domain = uniqueBy<ChartInternalNestedDataShape>(data, (d) => d.key);
  const barCount = data.length;
  const widthMinusPadding = width - padding * (barCount - 1);
  const xMultiplier = widthMinusPadding / width;

  // Given a data series, find the x0/x1 for it.
  const getXRange = (series) => {
    const [val] = series.data;
    const x0 = valueScale(val.x0);
    const x1 = valueScale(val.x1);
    return { x0, x1 };
  };

  const scale: any = (arg) => {
    let result = 0;
    const index = data.findIndex((d) => d.key === arg);
    const series = data[index];

    if (series && series.data && series.data.length) {
      const { x1, x0 } = getXRange(series);
      result = (x1 - x0) / 2 + x0;

      if (padding) {
        result = result * xMultiplier + index * padding;
      }
    }

    return result;
  };

  scale.range = () => [0, width];
  scale.domain = () => domain;

  // Special invert function for marimekko
  scale.mariemkoInvert = (offset: number) => {
    let found;

    for (let i = 0; i < domain.length; i++) {
      const attr = domain[i];
      const series = data[i];
      const { x1, x0 } = getXRange(series);

      if (offset >= x0 - padding / 2 && offset <= x1 - padding / 2) {
        found = attr;
        break;
      }
    }

    return found;
  };

  return scale;
};
