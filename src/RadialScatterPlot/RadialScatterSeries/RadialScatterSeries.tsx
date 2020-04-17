import React, { Component, Fragment, ReactElement } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import {
  RadialScatterPoint,
  RadialScatterPointProps
} from './RadialScatterPoint';
import { CloneElement } from '../../common/utils/children';
import bind from 'memoize-bind';

export interface RadialScatterSeriesProps {
  /**
   * Point that is rendered.
   */
  point: ReactElement<RadialScatterPointProps, typeof RadialScatterPoint>;

  /**
   * D3 scale for X Axis. Set internally by `RadialScatterPlot`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialScatterPlot`.
   */
  yScale: any;

  /**
   * Parsed data shape. Set internally by `RadialScatterPlot`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * Id set internally by `RadialScatterPlot`.
   */
  id: string;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Active element ids to highlight.
   */
  activeIds?: string[];
}

interface RadialScatterSeriesState {
  activeIds: string[];
}

export class RadialScatterSeries extends Component<
  RadialScatterSeriesProps,
  RadialScatterSeriesState
> {
  static defaultProps: Partial<RadialScatterSeriesProps> = {
    point: <RadialScatterPoint />,
    animated: true
  };

  state: RadialScatterSeriesState = {
    activeIds: []
  };

  onMouseEnter({ value }) {
    // Only perform this on unmanaged activations
    if (!this.props.activeIds) {
      this.setState({
        activeIds: [value.id]
      });
    }
  }

  onMouseLeave() {
    // Only perform this on unmanaged activations
    if (!this.props.activeIds) {
      this.setState({
        activeIds: []
      });
    }
  }

  renderPoint(data: ChartInternalShallowDataShape, index: number) {
    const { point, xScale, yScale, animated } = this.props;

    let dataId;
    if (data.id) {
      dataId = data.id;
    } else {
      console.warn(
        `No 'id' property provided for scatter point; provide one via 'id'.`
      );
    }

    const key = dataId || index;
    const activeIds = this.props.activeIds || this.state.activeIds;
    const active =
      !(activeIds && activeIds.length) || activeIds.includes(dataId);

    const visible = point.props.visible;
    if (visible && !visible(data, index)) {
      return <Fragment key={key} />;
    }

    return (
      <CloneElement<RadialScatterPointProps>
        element={point}
        key={key}
        data={data}
        index={index}
        active={active}
        xScale={xScale}
        yScale={yScale}
        animated={animated}
        onMouseEnter={bind(this.onMouseEnter, this)}
        onMouseLeave={bind(this.onMouseLeave, this)}
      />
    );
  }

  render() {
    const { data } = this.props;

    return <Fragment>{data.map((d, i) => this.renderPoint(d, i))}</Fragment>;
  }
}
