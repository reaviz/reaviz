import { useState } from 'react';
import chroma from 'chroma-js';
import { Sankey } from './Sankey';
import { SankeyNode } from './SankeyNode';
import { SankeyLink } from './SankeyLink';
import {
  sankeyNodes,
  sankeyLinks,
  simpleSankeyNodes,
  simpleSankeyLinks
} from 'reaviz-data-utils';
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
  tags: ['snapshot'],
  title: 'Charts/Sankey Plot',
  component: Sankey,
  subcomponents: {
    SankeyNode,
    SankeyLink,
    SankeyLabel
  }
};

export const Simple = () => (
  <Sankey
    id="simple"
    colorScheme="Spectral"
    height={300}
    width={550}
    nodeWidth={5}
    labelPosition="outside"
    nodes={simpleSankeyNodes.map((node, i) => (
      <SankeyNode
        key={`node-${i}`}
        {...node}
        label={<SankeyLabel />}
        onClick={() => onNodeClick(node.title)}
      />
    ))}
    links={simpleSankeyLinks.map((link, i) => (
      <SankeyLink key={`link-${i}`} {...link} />
    ))}
  />
);

export const LabelsInsideContainer = () => (
  <div style={{ border: 'solid 1px red' }}>
    <Sankey
      id="labels-inside-container"
      height={300}
      width={550}
      colorScheme="Spectral"
      labelPosition="outside"
      nodes={simpleSankeyNodes.map((node, i) => (
        <SankeyNode
          key={`node-${i}`}
          {...node}
          label={<SankeyLabel ellipsis="none" />}
          onClick={() => onNodeClick(node.title)}
        />
      ))}
      links={simpleSankeyLinks.map((link, i) => (
        <SankeyLink key={`link-${i}`} {...link} />
      ))}
    />
  </div>
);

export const FitLongLabels = () => (
  <div style={{ border: 'solid 1px red' }}>
    <Sankey
      id="fit-long-labels"
      height={300}
      width={550}
      colorScheme="Spectral"
      labelPosition="outside"
      nodes={simpleSankeyNodes.map((node, i) => (
        <SankeyNode
          key={`node-${i}`}
          {...node}
          title={node?.title.repeat(5)}
          label={<SankeyLabel ellipsis="auto" />}
          onClick={() => onNodeClick(node.title)}
        />
      ))}
      links={simpleSankeyLinks.map((link, i) => (
        <SankeyLink key={`link-${i}`} {...link} />
      ))}
    />
  </div>
);

export const Filtering = () => <DemoStory />;

export const Multilevels = () => (
  <Sankey
    id="multilevels"
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
      id="autosize"
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

export const Justification = () => (
  <Sankey
    id="justification"
    colorScheme={colorScheme}
    height={600}
    width={964}
    justification="left"
    nodes={sankeyNodes.map((node, i) => (
      <SankeyNode key={`node-${i}`} {...node} />
    ))}
    links={sankeyLinks.map((link, i) => (
      <SankeyLink key={`link-${i}`} {...link} />
    ))}
  />
);

const DemoStory = () => {
  const [filtered, setFiltered] = useState(false);
  const [state, setState] = useState({
    nodes: [...simpleSankeyNodes],
    links: [...simpleSankeyLinks]
  });

  const onClick = (node) => {
    const { links } = state;

    if (filtered) {
      setFiltered(false);
      setState({
        nodes: simpleSankeyNodes,
        links: simpleSankeyLinks
      });
    } else {
      setFiltered(true);
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
      id="filtering"
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
