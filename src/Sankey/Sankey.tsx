import React, {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useMemo,
  useState
} from 'react';
import {
  sankey,
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify
} from 'd3-sankey';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '@/common/containers/ChartContainer';
import { CloneElement, useId } from 'reablocks';

import { getColor, ColorSchemeType } from '@/common/color';
import { SankeyNodeProps, SankeyNode } from './SankeyNode';
import { SankeyLinkProps, SankeyLink } from './SankeyLink';
import {
  SankeyNodeExtra,
  SankeyLinkExtra,
  LABEL_PADDING_PERCENT
} from './utils';
import { SankeyLabelPosition } from './SankeyLabel';

const JUSTIFICATION = {
  justify: sankeyJustify,
  center: sankeyCenter,
  left: sankeyLeft,
  right: sankeyRight
};

export type Justification = 'justify' | 'center' | 'left' | 'right';

export type NodeElement = ReactElement<SankeyNodeProps, typeof SankeyNode>;

export type LinkElement = ReactElement<SankeyLinkProps, typeof SankeyLink>;

export interface SankeyProps extends ChartProps {
  /**
   * Whether to animate the enter/update/exit. Set internally by `SankeyNode` and `SankeyLink`.
   */
  animated?: boolean;

  /**
   * Color scheme for the nodes. Set internally by `SankeyNode`.
   */
  colorScheme?: ColorSchemeType;

  /**
   * The node alignment method.
   */
  justification?: Justification;

  /**
   * Width of the node.
   */
  nodeWidth?: number;

  /**
   * Vertical padding between nodes in the same column.
   */
  nodePadding?: number;

  /**
   * Label position.
   */
  labelPosition?: SankeyLabelPosition;

  /**
   * Sort function for the nodes.
   *
   * If sort is specified, sets the node sort method and returns this Sankey generator.
   * If sort is not specified, returns the current node sort method, which defaults
   * to undefined, indicating that vertical order of nodes within each column will
   * be determined automatically by the layout. If sort is null, the order is fixed
   * by the input. Otherwise, the specified sort function determines the order;
   * the function is passed two nodes, and must return a value less than 0 if the
   * first node should be above the second, and a value greater than 0 if the second
   * node should be above the first, or 0 if the order is not specified.
   *
   * Reference: https://github.com/d3/d3-sankey#sankey_nodeSort
   */
  nodeSort?: (a: any, b: any) => number;

  /**
   * Nodes that are rendered.
   */
  nodes: NodeElement[];

  /**
   * Links that are rendered.
   */
  links: LinkElement[];
}

export const Sankey: FC<SankeyProps> = ({
  width,
  height,
  margins,
  className,
  animated = true,
  links,
  justification = 'justify',
  nodeWidth = 15,
  nodePadding = 10,
  labelPosition = 'inside',
  nodeSort,
  colorScheme,
  nodes,
  containerClassName,
  ...rest
}) => {
  const id = useId(rest.id);
  const [activeNodes, setActiveNodes] = useState<SankeyNodeExtra[]>([]);
  const [activeLinks, setActiveLinks] = useState<SankeyLinkExtra[]>([]);

  const getNodeColor = useCallback(
    (node: NodeElement, index: any) => {
      if (colorScheme) {
        return getColor({
          data: nodes,
          colorScheme,
          point: nodes[index],
          index
        });
      } else {
        return node.props.color;
      }
    },
    [colorScheme, nodes]
  );

  const onNodeActive = useCallback((node: SankeyNodeExtra) => {
    const activeNodes: SankeyNodeExtra[] = [node];
    const activeLinks: SankeyLinkExtra[] = [];

    if (node.sourceLinks) {
      activeLinks.push(...node.sourceLinks);
      node.sourceLinks.forEach((sourceLink) => {
        const sourceLinkTarget = sourceLink.target as SankeyNodeExtra;
        if (sourceLinkTarget.index !== node.index) {
          activeNodes.push(sourceLinkTarget);
        }
      });
    }

    if (node.targetLinks) {
      activeLinks.push(...node.targetLinks);
      node.targetLinks.forEach((targetLink) => {
        const targetLinkSource = targetLink.source as SankeyNodeExtra;
        if (targetLinkSource.index !== node.index) {
          activeNodes.push(targetLinkSource);
        }
      });
    }

    setActiveNodes(activeNodes);
    setActiveLinks(activeLinks);
  }, []);

  const onLinkActive = useCallback((link: SankeyLinkExtra) => {
    const activeNodes: SankeyNodeExtra[] = [
      link.source as SankeyNodeExtra,
      link.target as SankeyNodeExtra
    ];
    const activeLinks: SankeyLinkExtra[] = [link];

    setActiveNodes(activeNodes);
    setActiveLinks(activeLinks);
  }, []);

  const onInactive = useCallback(() => {
    setActiveNodes([]);
    setActiveLinks([]);
  }, []);

  const nodeMap = useMemo(() => {
    // Not sure what this is for
    const nodeMap = new Map<string, NodeElement>();
    nodes.forEach((node: any) => node && nodeMap.set(node.props.title, node));

    return nodeMap;
  }, [nodes]);

  const renderNode = useCallback(
    (
      computedNode: SankeyNodeExtra,
      index: number,
      chartWidth: number,
      node?: NodeElement
    ) => {
      const active = activeNodes.some(
        (node) => node.index === computedNode.index
      );
      const disabled = activeNodes.length > 0 && !active;
      const labelPadding =
        labelPosition === 'outside' ? LABEL_PADDING_PERCENT : 0;

      return (
        <CloneElement<SankeyNodeProps>
          element={node}
          key={`node-${index}`}
          active={active}
          animated={animated}
          disabled={disabled}
          chartWidth={chartWidth}
          onMouseEnter={() => onNodeActive(computedNode)}
          onMouseLeave={() => onInactive()}
          labelPosition={labelPosition}
          labelPadding={labelPadding}
          {...computedNode}
        />
      );
    },
    [activeNodes, animated, onInactive, onNodeActive, labelPosition]
  );

  const renderLink = useCallback(
    (computedLink: SankeyLinkExtra, index: number) => {
      const active = activeLinks.some(
        (link) => link.index === computedLink.index
      );
      const disabled = activeLinks.length > 0 && !active;

      return (
        <CloneElement<SankeyLinkProps>
          element={links[index]}
          active={active}
          animated={animated}
          key={`link-${index}`}
          chartId={`sankey-${id}`}
          disabled={disabled}
          {...computedLink}
          onMouseEnter={() => onLinkActive(computedLink)}
          onMouseLeave={() => onInactive()}
        />
      );
    },
    [activeLinks, id, animated, links, onInactive, onLinkActive]
  );

  const getNodesAndLinks = useCallback(
    (chartWidth: number, chartHeight: number) => {
      const labelPadding =
        labelPosition === 'outside' ? LABEL_PADDING_PERCENT : 0;
      const padding = labelPadding * chartWidth;

      const sankeyChart = sankey()
        .extent([
          [1 + padding, 1],
          [chartWidth - padding, chartHeight]
        ])
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .nodeSort(nodeSort)
        .nodeAlign(JUSTIFICATION[justification])
        .nodeId((node: any) => node.id || node.index);

      const nodesCopy: any = nodes.map((node, index) => ({
        id: node.props.id,
        title: node.props.title,
        color: getNodeColor(node, index)
      }));

      const linksCopy = links.map((link) => ({
        source: link.props.source,
        target: link.props.target,
        value: link.props.value
      }));

      const { nodes: sankeyNodes, links: sankeyLinks } = sankeyChart({
        nodes: nodesCopy,
        links: linksCopy
      });

      /*
      // NOTE: Not sure what this is doing
      sankeyNodes.sort((a, b) => {
        const aX0 = a && a.x0 ? a.x0 : 0;
        const aY0 = a && a.y0 ? a.y0 : 0;
        const bX0 = b && b.x0 ? b.x0 : 0;
        const bY0 = b && b.y0 ? b.y0 : 0;
        return aX0 - bX0 || aY0 - bY0;
      });
      */

      return { sankeyNodes, sankeyLinks };
    },
    [
      getNodeColor,
      nodeSort,
      justification,
      links,
      nodePadding,
      nodeWidth,
      nodes,
      labelPosition
    ]
  );

  const renderChart = useCallback(
    ({ id, chartWidth, chartHeight, chartSized }: ChartContainerChildProps) => {
      if (!chartSized) {
        return null;
      }

      const { sankeyNodes, sankeyLinks } = getNodesAndLinks(
        chartWidth,
        chartHeight
      );

      return (
        <Fragment key="group">
          {sankeyLinks.map((link, index) =>
            renderLink(link as SankeyLinkExtra, index)
          )}
          {sankeyNodes.map((node: SankeyNodeExtra, index) =>
            renderNode(node, index, chartWidth, nodeMap.get(node.title))
          )}
        </Fragment>
      );
    },
    [getNodesAndLinks, nodeMap, renderLink, renderNode]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      containerClassName={containerClassName}
      height={height}
      margins={margins}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};
