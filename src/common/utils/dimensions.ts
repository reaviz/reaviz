export interface Dimensions {
  xOffset: number;
  yOffset: number;
  height: number;
  width: number;
  chartWidth: number;
  chartHeight: number;
  xMargin: number;
  yMargin: number;
}

export interface DimensionParameter {
  xOffset: number;
  yOffset: number;
  yAxis: any;
  xAxis: any;
  height: number;
  width: number;
  margins: Margins;
}

export type Margins =
  | [number, number]
  | [number, number, number, number]
  | number;

/**
 * Given a margins object, returns the top/left/right/bottom positions.
 */
function parseMargins(margins?: Margins) {
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;

  if (Array.isArray(margins)) {
    if (margins.length === 2) {
      top = margins[0];
      bottom = margins[0];
      left = margins[1];
      right = margins[1];
    } else if (margins.length === 4) {
      top = margins[0];
      right = margins[1];
      bottom = margins[2];
      left = margins[3];
    }
  } else if (margins !== undefined) {
    top = margins;
    right = margins;
    bottom = margins;
    left = margins;
  }

  return {
    top,
    right,
    bottom,
    left
  };
}

/**
 * Calculates the margins for the chart.
 */
function calculateMarginOffsets(
  height: number,
  width: number,
  margins: { left: number; right: number; bottom: number; top: number }
) {
  const { left, right, bottom, top } = margins;
  const newHeight = height - top - bottom;
  const newWidth = width - left - right;

  return {
    height: newHeight,
    width: newWidth
  };
}

/**
 * Calculates the dimensions for the chart.
 */
export function getDimension({
  xOffset,
  yOffset,
  height,
  width,
  margins
}: DimensionParameter | any): Dimensions {
  const parsedMargins = parseMargins(margins);
  const marginDims = calculateMarginOffsets(height, width, parsedMargins);
  const chartWidth = marginDims.width - xOffset;
  const chartHeight = marginDims.height - yOffset;

  return {
    xOffset,
    yOffset,
    height,
    width,
    chartWidth,
    chartHeight,
    xMargin: xOffset + parsedMargins.left,
    yMargin: parsedMargins.top
  };
}
