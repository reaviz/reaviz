export interface Node {
  id?: string;
  x: number;
  y: number;
  value?: any;
  count?: number;
  size?: number;
}

export interface Link {
  id?: string;
  source: Node;
  target: Node;
  value?: any;
  color?: string;
}

export interface Axis {
  label: string;
  attribute: string;
}
