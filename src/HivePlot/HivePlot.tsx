import React, { Fragment, Component } from 'react';
import bind from 'memoize-bind';
import { scaleOrdinal, scaleLinear, scalePoint } from 'd3-scale';
import { range } from 'd3-array';
import { Tooltip } from '../common/Tooltip';
import { Placement } from 'rdk';
import { ResizeContainer } from '../common/containers/ResizeContainer';
import { HiveNode } from './HiveNode';
import { HiveAxis } from './HiveAxis';
import { HiveLink } from './HiveLink';
import { HiveLabel } from './HiveLabel';
import { HiveTooltip } from './HiveTooltip';
import { Node, Link, Axis } from './types';
import classNames from 'classnames';

interface NodeEventData {
  nativeEvent: any;
  node: Node;
  links: Link[];
}

interface LinkEventData {
  nativeEvent: any;
  link: Link;
}

export interface HivePlotProps {
  axis: Axis[];
  nodes: Node[];
  links: Link[];
  activeIds?: string[];
  disabled?: boolean;
  label: {
    show: boolean;
    padding?: number;
  };
  width?: number;
  height?: number;
  innerRadius: number;
  className?: any;
  onNodeClick: (data: NodeEventData) => void;
  onNodeMouseOver: (data: NodeEventData) => void;
  onLinkMouseOver: (data: LinkEventData) => void;
  onNodeMouseOut: (data: NodeEventData) => void;
  onLinkMouseOut: (data: LinkEventData) => void;
  tooltip: {
    show: boolean;
    placement: Placement;
    formatter: (
      axis: Axis[],
      nodes: Node[],
      link?: Link,
      node?: Node
    ) => React.ReactNode;
  };
  colorScheme: {
    axis: string[];
    domain: string[];
  };
}

interface HivePlotState {
  tooltipReference?: EventTarget | null;
  nodeTooltipData?: Node;
  linkTooltipData?: Link;
  active?: { [k: string]: boolean };
  height?: number;
  width?: number;
}

export class HivePlot extends Component<HivePlotProps, HivePlotState> {
  static defaultProps = {
    innerRadius: 20,
    disabled: false,
    axis: [],
    nodes: [],
    links: [],
    label: {
      show: true,
      padding: 10
    },
    activeIds: [],
    onNodeClick: () => undefined,
    onNodeMouseOver: () => undefined,
    onNodeMouseOut: () => undefined,
    onLinkMouseOver: () => undefined,
    onLinkMouseOut: () => undefined,
    tooltip: {
      show: true,
      placement: 'top',
      formatter: attr => attr.value
    },
    colorScheme: {
      axis: ['#b1b2b6'],
      domain: ['#b1b2b6']
    }
  };

  state: HivePlotState = {};

  onNodeMouseOver(node: Node, event: MouseEvent) {
    const { links, nodes, onNodeMouseOver, disabled } = this.props;
    if (!disabled) {
      const activeNodeIndex = nodes.indexOf(node);
      const activeNodes = {};

      for (const link of links) {
        const { source, target } = link;
        if (source.value === node.value || target.value === node.value) {
          const next = target.value === node.value ? source : target;
          const idx = nodes.indexOf(next);
          activeNodes[`node-${idx}`] = true;
        }
      }

      this.setState({
        tooltipReference: event.target,
        nodeTooltipData: node,
        active: {
          [`node-${activeNodeIndex}`]: true,
          ...activeNodes,
          ...links.reduce((accumulator, link, i) => {
            if (
              link.source.value === node.value ||
              link.target.value === node.value
            ) {
              accumulator[`link-${i}`] = true;
            }
            return accumulator;
          }, {})
        }
      });
    }

    onNodeMouseOver({
      nativeEvent: event,
      node,
      links: this.getLinksForNode(node)
    });
  }

  onLinkMouseOver(link: Link, event: MouseEvent) {
    const { onLinkMouseOver, disabled } = this.props;
    if (!disabled) {
      this.setState({
        tooltipReference: event.target,
        linkTooltipData: link
      });
      this.activateLink(link);
    }

    onLinkMouseOver({
      nativeEvent: event,
      link
    });
  }

  activateLink(link: Link) {
    const { nodes, links } = this.props;
    const activeLinkIndex = links.indexOf(link);
    const activeLinksMap = {
      [`link-${activeLinkIndex}`]: true
    };

    const activeLinks = [
      link,
      ...this.activateAdjacentLinks(links, link.target, activeLinksMap)
    ];
    this.setState({
      active: {
        ...activeLinksMap,
        ...nodes.reduce((accumulator, node, i) => {
          for (const activeLink of activeLinks) {
            const { source, target } = activeLink;
            if (node === source || node === target) {
              accumulator[`node-${i}`] = true;
            }
          }
          return accumulator;
        }, {})
      }
    });
  }

  activateAdjacentLinks(links: Link[], target: Node, accumulator: {}) {
    const activeLinks: any[] = [];

    links.forEach((childLink, index) => {
      if (target === childLink.source) {
        if (!accumulator[`link-${index}`]) {
          accumulator[`link-${index}`] = true;
          activeLinks.push(
            childLink,
            ...this.activateAdjacentLinks(links, childLink.target, accumulator)
          );
        }
      }
    });

    return activeLinks;
  }

  onNodeMouseOut(node: Node, event: MouseEvent) {
    const { onNodeMouseOut } = this.props;
    this.resetActive();
    onNodeMouseOut({
      nativeEvent: event,
      node,
      links: this.getLinksForNode(node)
    });
  }

  onLinkMouseOut(link: Link, event: MouseEvent) {
    const { onLinkMouseOut } = this.props;
    this.resetActive();
    onLinkMouseOut({
      nativeEvent: event,
      link
    });
  }

  onNodeClick(node: Node, event: MouseEvent) {
    const { disabled } = this.props;
    if (!disabled) {
      const { onNodeClick } = this.props;
      onNodeClick({
        nativeEvent: event,
        node,
        links: this.getLinksForNode(node)
      });
    }
  }

  getLinksForNode(node: Node): Link[] {
    const { links } = this.props;
    return links.filter(
      link =>
        link.source.value === node.value || link.target.value === node.value
    );
  }

  resetActive() {
    this.setState({
      active: undefined,
      linkTooltipData: undefined,
      nodeTooltipData: undefined,
      tooltipReference: undefined
    });
  }

  prepareData({ dimension, innerRadius, colorScheme, axis, label }) {
    let outerRadius = dimension / 2;
    if (label.show) {
      outerRadius = outerRadius - (10 + label.padding);
    }

    return {
      angle: scalePoint()
        .domain(range(axis.length + 1) as any)
        .range([0, 2 * Math.PI]),
      radius: scaleLinear().range([innerRadius, outerRadius]),
      axisColor: scaleOrdinal(colorScheme.axis).domain(range(20) as any),
      domainColor: scaleOrdinal(colorScheme.domain).domain(range(20) as any),
      outerRadius
    };
  }

  onSize({ height, width }) {
    this.setState(prev => ({
      height: height || prev.height,
      width: width || prev.width
    }));
  }

  getDimensions() {
    const height = this.props.height || this.state.height || 0;
    const width = this.props.width || this.state.width || 0;

    return {
      height,
      width
    };
  }

  renderAxis({ angle, radius, axisColor, outerRadius }) {
    const { axis, label } = this.props;

    return (
      <Fragment>
        {axis.map((a, i) => (
          <g key={`axis-${a.attribute}`}>
            <HiveAxis
              angle={angle}
              index={i}
              color={axisColor}
              radius={radius}
            />
            {label.show && (
              <HiveLabel
                index={i}
                text={a.label}
                label={label}
                outerRadius={outerRadius}
                angle={angle}
              />
            )}
          </g>
        ))}
      </Fragment>
    );
  }

  isActive(nodeOrLink: Node | Link, index: number, type: 'node' | 'link') {
    const { activeIds } = this.props;
    const { active } = this.state;
    // If no there is nothing active, then everything is active.
    if (!active && !activeIds!.length) {
      return true;
    }

    // If this node is active because it is being hovered
    if (active && active[`${type}-${index}`]) {
      return true;
    }
    // If the ID matches one of the active IDs passed in the props
    if (
      !!activeIds!.length &&
      !!nodeOrLink.id &&
      activeIds!.includes(nodeOrLink.id)
    ) {
      return true;
    }
    return false;
  }

  renderLinks({ angle, radius, domainColor }) {
    const { links } = this.props;
    return (
      <Fragment>
        {links.map((link, i) => {
          return (
            <HiveLink
              key={`${link.value}-${i}`}
              color={link.color || domainColor}
              active={this.isActive(link, i, 'link')}
              angle={angle}
              radius={radius}
              link={link}
              onMouseOver={bind(this.onLinkMouseOver, this, link)}
              onMouseOut={bind(this.onLinkMouseOut, this, link)}
            />
          );
        })}
      </Fragment>
    );
  }

  renderNodes({ angle, radius, domainColor }) {
    const { nodes, disabled } = this.props;
    return (
      <Fragment>
        {nodes.map((node, i) => (
          <HiveNode
            node={node}
            key={`${node.value}-${i}`}
            active={this.isActive(node, i, 'node')}
            color={domainColor}
            radius={radius}
            angle={angle}
            disabled={disabled}
            onMouseOver={bind(this.onNodeMouseOver, this, node)}
            onMouseOut={bind(this.onNodeMouseOut, this, node)}
            onClick={bind(this.onNodeClick, this, node)}
          />
        ))}
      </Fragment>
    );
  }

  renderTooltip() {
    const { tooltip, disabled, axis, nodes } = this.props;
    const {
      active,
      tooltipReference,
      linkTooltipData: link,
      nodeTooltipData: node
    } = this.state;

    const { formatter, placement, show } = tooltip;
    return (
      <Fragment>
        {!disabled && show && (
          <Tooltip
            visible={!!active}
            reference={tooltipReference}
            placement={placement}
            content={() =>
              formatter(axis, nodes, link, node) ||
              (node ? (
                <HiveTooltip node={node} nodes={nodes} axis={axis} />
              ) : null)
            }
          />
        )}
      </Fragment>
    );
  }

  render() {
    const { innerRadius, axis, colorScheme, label, className } = this.props;
    const { height, width } = this.getDimensions();
    const data = this.prepareData({
      dimension: Math.min(height, width),
      innerRadius,
      colorScheme,
      axis,
      label
    });

    return (
      <ResizeContainer
        onSize={bind(this.onSize, this)}
        height={this.props.height}
        width={this.props.width}
      >
        {height && width && (
          <Fragment>
            <svg
              width={width}
              height={height}
              className={classNames(className)}
            >
              <g
                transform={`translate(${width / 2}, ${height / 2 +
                  innerRadius})`}
              >
                {this.renderAxis(data)}
                {this.renderLinks(data)}
                {this.renderNodes(data)}
              </g>
            </svg>
            {this.renderTooltip()}
          </Fragment>
        )}
      </ResizeContainer>
    );
  }
}
