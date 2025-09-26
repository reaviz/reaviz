import type { SankeyLink, SankeyNode } from 'd3-sankey';

export interface NodeExtra {
  /**
   * ID of the node. If not provided, the node's index will be used.
   */
  id?: string;

  /**
   * Title of the node.
   */
  title: string;

  /**
   * Color of the node.
   */
  color?: string;
}

export interface LinkExtra {
  /**
   * Color of the link.
   */
  color?: string;
}

export type SankeyNodeExtra = SankeyNode<NodeExtra, LinkExtra>;

export type SankeyLinkExtra = SankeyLink<NodeExtra, LinkExtra>;

export const DEFAULT_COLOR = 'rgba(255, 255, 255, 0.2)';

export const LABEL_PADDING_PERCENT = 0.1;
