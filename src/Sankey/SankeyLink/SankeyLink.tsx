import React, { Component, Fragment, createRef, ReactElement } from 'react';
import bind from 'memoize-bind';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { sankeyLinkHorizontal } from 'd3-sankey';
import { CloneElement } from 'rdk';
import { formatValue } from '../../common/utils/formatting';
import { Tooltip, TooltipProps } from 'realayers';
import { NodeExtra, Node, Link, DEFAULT_COLOR } from '../utils';
import css from './SankeyLink.module.css';

export interface SankeyLinkProps extends Link {
  /**
   * Whether the element is active or not. Set internally by `Sankey`.
   */
  active: boolean;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Id of Sankey chart. Set internally by `Sankey`.
   */
  chartId: string;

  /**
   * CSS class to apply.
   */
  className?: string;

  /**
   * Whether the node is disabled. Set internally by `Sankey`.
   */
  disabled: boolean;

  /**
   * Whether to use gradient or not.
   */
  gradient?: boolean;

  /**
   * Opacity callback for the link.
   */
  opacity: (active: boolean, disabled: boolean) => number;

  /**
   * CSS styles to apply.
   */
  style?: object;

  /**
   * Tooltip element.
   */
  tooltip: ReactElement<TooltipProps, typeof Tooltip>;

  /**
   * Width of the link. Set internally by `Sankey`.
   */
  width: number;

  /**
   * Event for when the link is clicked.
   */
  onClick: (event: React.MouseEvent<SVGPathElement>) => void;

  /**
   * Event for when the link has mouse enter.
   */
  onMouseEnter: (event: React.MouseEvent<SVGPathElement>) => void;

  /**
   * Event for when the link has mouse leave.
   */
  onMouseLeave: (event: React.MouseEvent<SVGPathElement>) => void;
}

interface SankeyLinkState {
  hovered?: boolean;
}

export class SankeyLink extends Component<SankeyLinkProps, SankeyLinkState> {
  static defaultProps: Partial<SankeyLinkProps> = {
    active: false,
    animated: true,
    color: DEFAULT_COLOR,
    disabled: false,
    gradient: true,
    opacity: (active, disabled) => (active ? 0.5 : disabled ? 0.1 : 0.35),
    tooltip: (
      <Tooltip
        followCursor={true}
        modifiers={{
          offset: {
            offset: '0, 5px'
          }
        }}
      />
    ),
    width: 0,
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  link = createRef<SVGPathElement>();
  state: SankeyLinkState = {};

  getEnter() {
    const path = sankeyLinkHorizontal();
    const d = path(this.getLink()) as string;
    const strokeWidth = Math.max(1, this.props.width);
    return { d, strokeWidth };
  }

  getExit() {
    const path = sankeyLinkHorizontal();
    const d = path({ ...this.getLink(), width: 0 }) as string;
    return { d, strokeWidth: 0 };
  }

  getLink() {
    const { index, value, y0, y1, source, target, width } = this.props;
    return { index, y0, y1, value, width, source, target };
  }

  getStroke() {
    const { color, index, gradient, chartId } = this.props;
    return gradient ? `url(#${chartId}-gradient-${index})` : color;
  }

  onMouseEnter(event: React.MouseEvent<SVGPathElement>) {
    this.setState({ hovered: true });
    this.props.onMouseEnter(event);
  }

  onMouseLeave(event: React.MouseEvent<SVGPathElement>) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(event);
  }

  renderLink() {
    const { active, className, disabled, index, opacity, style, onClick } =
      this.props;
    const enterProps = this.getEnter();
    const exitProps = this.getExit();

    return (
      <g ref={this.link}>
        <motion.path
          key={`sankey-link-${enterProps.d}-${index}`}
          className={classNames(css.link, className)}
          style={style}
          initial={exitProps}
          animate={enterProps}
          exit={exitProps}
          transition={{
            duration: 0.5
          }}
          stroke={this.getStroke()}
          strokeOpacity={opacity(active, disabled)}
          onClick={onClick}
          onMouseEnter={bind(this.onMouseEnter, this)}
          onMouseLeave={bind(this.onMouseLeave, this)}
        />
      </g>
    );
  }

  renderTooltipContent() {
    const { source, target, value } = this.props;

    return (
      <div className={css.tooltip}>
        <div className={css.tooltipLabel}>
          {`${(source as NodeExtra).title} → ${(target as NodeExtra).title}`}
        </div>
        <div className={css.tooltipValue}>{formatValue(value)}</div>
      </div>
    );
  }

  render() {
    const { gradient, index, source, target, tooltip, chartId } = this.props;
    const linkSource = source as Node;
    const linkTarget = target as Node;

    return (
      <Fragment>
        {gradient && (
          <linearGradient
            id={`${chartId}-gradient-${index}`}
            gradientUnits="userSpaceOnUse"
            x1={linkSource.x1}
            x2={linkTarget.x0}
          >
            <stop offset="0%" stopColor={linkSource.color} />
            <stop offset="100%" stopColor={linkTarget.color} />
          </linearGradient>
        )}
        {this.renderLink()}
        {!tooltip.props.disabled && (
          <CloneElement<TooltipProps>
            content={this.renderTooltipContent.bind(this)}
            element={tooltip}
            visible={this.state.hovered}
            reference={this.link}
          />
        )}
      </Fragment>
    );
  }
}
