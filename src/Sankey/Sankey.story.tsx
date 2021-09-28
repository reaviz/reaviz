import React, { useState } from 'react';
import chroma from 'chroma-js';
import { Sankey } from './Sankey';
import { SankeyNode } from './SankeyNode';
import { SankeyLink } from './SankeyLink';
import {
  sankeyNodes,
  sankeyLinks,
  simpleSankeyNodes,
  simpleSankeyLinks
} from '../../demo';
import { select, object, number } from '@storybook/addon-knobs';
import { schemes } from '../common/color';
import { SankeyLabel } from './SankeyLabel';

const colorScheme = chroma
  .scale([
    '2b908f',
    '90ee7e',
    'f45b5b',
    '7798BF',
    'aaeeee',
    'ff0066',
    'eeaaee',
    '55BF3B',
    'DF5353',
    '7798BF',
    'aaeeee'
  ])
  .mode('lch')
  .colors(sankeyNodes.length);

const onNodeClick = (title: string) => window.alert(`${title} is clicked`);

export default {
  title: 'Charts/Sankey Plot',
  component: Sankey,
  subcomponents: {
    SankeyNode,
    SankeyLink,
    SankeyLabel
  }
};

export const Simple = () => {
  const height = number('Height', 300);
  const width = number('Width', 550);
  const color = select('Color Scheme', schemes, 'Spectral');
  const nodes = object('Nodes', simpleSankeyNodes);
  const links = object('Links', simpleSankeyLinks);

  return (
    <Sankey
      colorScheme={color}
      height={height}
      width={width}
      nodes={nodes.map((node, i) => (
        <SankeyNode
          key={`node-${i}`}
          {...node}
          onClick={() => onNodeClick(node.title)}
        />
      ))}
      links={links.map((link, i) => (
        <SankeyLink key={`link-${i}`} {...link} />
      ))}
    />
  );
};

export const Filtering = () => <DemoStory />;

export const Multilevels = () => (
  <Sankey
    colorScheme={colorScheme}
    height={600}
    width={964}
    nodes={sankeyNodes.map((node, i) => (
      <SankeyNode key={`node-${i}`} {...node} />
    ))}
    links={sankeyLinks.map((link, i) => (
      <SankeyLink key={`link-${i}`} {...link} />
    ))}
  />
);

export const Autosize = () => (
  <div style={{ width: '80vw', height: '65vh', border: 'solid 1px red' }}>
    <Sankey
      colorScheme={colorScheme}
      nodes={sankeyNodes.map((node, i) => (
        <SankeyNode key={`node-${i}`} {...node} />
      ))}
      links={sankeyLinks.map((link, i) => (
        <SankeyLink key={`link-${i}`} {...link} />
      ))}
    />
  </div>
);

export const Justification = () => {
  const justification = select(
    'Alignments',
    {
      Left: 'left',
      Center: 'center',
      Right: 'right',
      Justified: 'justify'
    },
    'left'
  );

  return (
    <Sankey
      colorScheme={colorScheme}
      height={600}
      width={964}
      justification={justification}
      nodes={sankeyNodes.map((node, i) => (
        <SankeyNode key={`node-${i}`} {...node} />
      ))}
      links={sankeyLinks.map((link, i) => (
        <SankeyLink key={`link-${i}`} {...link} />
      ))}
    />
  );
};

let filtered = false;
const DemoStory = () => {
  const [state, setState] = useState({
    nodes: [...simpleSankeyNodes],
    links: [...simpleSankeyLinks]
  });

  const onClick = (node) => {
    const { links } = state;

    if (filtered) {
      filtered = false;
      setState({
        nodes: simpleSankeyNodes,
        links: simpleSankeyLinks
      });
    } else {
      filtered = true;
      setState({
        nodes: [
          node,
          ...links
            .filter((n) => n.source === node.id)
            .map((n) => simpleSankeyNodes.find((nn) => nn.id === n.target))
        ],
        links: links.filter((l) => l.source === node.id)
      });
    }
  };

  return (
    <Sankey
      colorScheme={colorScheme}
      height={300}
      width={500}
      nodes={state.nodes.map((node, i) => (
        <SankeyNode key={`node-${i}`} {...node} onClick={() => onClick(node)} />
      ))}
      links={state.links.map((link, i) => (
        <SankeyLink key={`link-${i}`} {...link} />
      ))}
    />
  );
};
