import { LinearAxisProps } from './LinearAxis';

/**
 * Returns whether the axis has a visual element or not.
 */
export const isAxisVisible = (axis: LinearAxisProps) =>
  !!axis.tickSeries.props.label || !!axis.tickSeries.props.line;
