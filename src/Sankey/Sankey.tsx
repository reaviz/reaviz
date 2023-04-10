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
} from '../common/containers/ChartContainer';
import { CloneElement, useId } from 'rdk';

import { getColor, ColorSchemeType } from '../common/color';
import { SankeyNodeProps, SankeyNode } from './SankeyNode';
import { SankeyLinkProps, SankeyLink } from './SankeyLink';
import { Node, Link } from './utils';

const JUSTIFICATION = {
  justify: sankeyJustify,
  center: sankeyCenter,
  left: sankeyLeft,
  right: sankeyRight
};

type Justification = 'justify' | 'center' | 'left' | 'right';
type NodeElement = ReactElement<SankeyNodeProps, typeof SankeyNode>;

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
   * Nodes that are rendered.
   */
  nodes: NodeElement[];

  /**
   * Links that are rendered.
   */
  links: ReactElement<SankeyLinkProps, typeof SankeyLink>[];
}

export const Sankey: FC<SankeyProps> = ({
  width,
  height,
  margins,
  className,
  animated,
  links,
  justification,
  nodeWidth,
  nodePadding,
  colorScheme,
  nodes,
  containerClassName,
  ...rest
}) => {
  const id = useId(rest.id);
  const [activeNodes, setActiveNodes] = useState<Node[]>([]);
  const [activeLinks, setActiveLinks] = useState<Link[]>([]);

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

  const onNodeActive = useCallback((node: Node) => {
    const activeNodes: Node[] = [node];
    const activeLinks: Link[] = [];

    if (node.sourceLinks) {
      activeLinks.push(...node.sourceLinks);
      node.sourceLinks.forEach((sourceLink) => {
        const sourceLinkTarget = sourceLink.target as Node;
        if (sourceLinkTarget.index !== node.index) {
          activeNodes.push(sourceLinkTarget);
        }
      });
    }

    if (node.targetLinks) {
      activeLinks.push(...node.targetLinks);
      node.targetLinks.forEach((targetLink) => {
        const targetLinkSource = targetLink.source as Node;
        if (targetLinkSource.index !== node.index) {
          activeNodes.push(targetLinkSource);
        }
      });
    }

    setActiveNodes(activeNodes);
    setActiveLinks(activeLinks);
  }, []);

  const onLinkActive = useCallback((link: Link) => {
    const activeNodes: Node[] = [link.source as Node, link.target as Node];
    const activeLinks: Link[] = [link];

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
      computedNode: Node,
      index: number,
      chartWidth: number,
      node?: NodeElement
    ) => {
      const active = activeNodes.some(
        (node) => node.index === computedNode.index
      );
      const disabled = activeNodes.length > 0 && !active;

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
          {...computedNode}
        />
      );
    },
    [activeNodes, animated, onInactive, onNodeActive]
  );

  const renderLink = useCallback(
    (computedLink: Link, index: number) => {
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
      const sankeyChart = sankey()
        .extent([
          [1, 1],
          [chartWidth, chartHeight]
        ])
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
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
    [getNodeColor, justification, links, nodePadding, nodeWidth, nodes]
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
          {sankeyLinks.map((link, index) => renderLink(link as Link, index))}
          {sankeyNodes.map((node: Node, index) =>
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

Sankey.defaultProps = {
  animated: true,
  justification: 'justify',
  nodeWidth: 15,
  nodePadding: 10
};
