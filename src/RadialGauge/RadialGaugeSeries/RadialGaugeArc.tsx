import React, { Component, ReactElement } from 'react';
import { arc } from 'd3-shape';
import { PieArc } from '../../PieChart';
import { ChartShallowDataShape } from '../../common/data';
import { ChartTooltip, ChartTooltipProps } from '../../common/Tooltip';

export interface RadialGaugeArcProps {
  /**
   * Data set by the `RadialGaugeSeries` component.
   */
  data?: ChartShallowDataShape;

  /**
   * Start angle set by the `RadialGaugeSeries` component.
   */
  startAngle: number;

  /**
   * End angle set by the `RadialGaugeSeries` component.
   */
  endAngle: number;

  /**
   * Outer radius set by the `RadialGaugeSeries` component.
   */
  outerRadius: number;

  /**
   * Color set by the `RadialGaugeSeries` component.
   */
  color: any;

  /**
   * Width set by the `RadialGaugeSeries` component.
   */
  width: number;

  /**
   * Animation set by the `RadialGaugeSeries` component.
   */
  animated: boolean;

  /**
   * Disable the interactions.
   */
  disabled: boolean;

  /**
   * Tooltip component.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Event for when the arc is clicked.
   */
  onClick: (event) => void;

  /**
   * Event for when the arc has mouse enter.
   */
  onMouseEnter: (event) => void;

  /**
   * Event for when the arc has mouse leave.
   */
  onMouseLeave: (event) => void;
}

export class RadialGaugeArc extends Component<RadialGaugeArcProps> {
  static defaultProps: Partial<RadialGaugeArcProps> = {
    width: 5,
    color: '#353d44',
    animated: true,
    disabled: false,
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined,
    tooltip: <ChartTooltip />
  };

  getPaths() {
    const { outerRadius, startAngle, endAngle, width, data } = this.props;

    // Calculate the inner rad based on the width
    // and the outer rad which is height/width / 2
    const innerRadius = outerRadius - width;

    // Center arcs so inner/outer align nicely
    const delta = (outerRadius - innerRadius) / 2;
    const newInnerRad = innerRadius + delta;
    const newOuterRad = outerRadius + delta;

    // Create the arc fn to pass to the pie arc
    const innerArc = arc()
      .innerRadius(newInnerRad)
      .outerRadius(newOuterRad);

    return {
      data: {
        startAngle,
        endAngle,
        // Data must be passed
        data: data || {}
      },
      innerArc
    };
  }

  render() {
    const {
      color,
      animated,
      disabled,
      tooltip,
      onClick,
      onMouseEnter,
      onMouseLeave
    } = this.props;
    const data = this.getPaths();

    return (
      <PieArc
        {...data}
        animated={animated}
        color={color}
        disabled={disabled}
        tooltip={tooltip}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }
}
