import React from 'react';
import { VennDiagram } from './VennDiagram';
import { number, object, color, select, boolean } from '@storybook/addon-knobs';
import { schemes } from '../common/color';
import { VennSeries } from './VennSeries';
import { VennArc } from './VennArc';
import { Stripes } from '../common/Mask';
import { VennLabel } from './VennLabel';
import { Gradient } from '../common/Gradient';
import { VennOuterLabel } from './VennOuterLabel';
import { symbol, symbolStar } from 'd3-shape';

// Make a static star path for demos
const starPath = symbol().type(symbolStar).size(50)();

export default {
  title: 'Charts/Venn Diagram',
  component: VennDiagram,
  subcomponents: {
    VennSeries,
    VennArc,
    VennOuterLabel,
    VennLabel
  }
};

export const Simple = () => {
  const height = number('Height', 450);
  const width = number('Width', 450);
  const showAll = boolean('Show All Labels', false);
  const showValues = boolean('Show Values', false);
  const scheme = select('Color Scheme', schemes, 'cybertron');
  const strokeWidth = number('Stroke Width', 3);
  const stroke = color('Stroke', schemes.cybertron[0]);
  const gradient = boolean('Gradient', false);

  const data = object('Data', [
    { key: ['A'], data: 12 },
    { key: ['B'], data: 12 },
    { key: ['A', 'B'], data: 2 }
  ]);

  return (
    <VennDiagram
      height={height}
      width={width}
      data={data}
      series={
        <VennSeries
          colorScheme={scheme}
          arc={
            <VennArc
              strokeWidth={strokeWidth}
              stroke={stroke}
              gradient={gradient ? <Gradient /> : null}
            />
          }
          label={
            <VennLabel
              labelType={showValues ? 'value' : 'key'}
              showAll={showAll}
            />
          }
        />
      }
    />
  );
};

export const Euler = () => {
  const type = boolean('Euler', true);
  const data = object('Data', [
    { key: ['A'], data: 4 },
    { key: ['B'], data: 1 },
    { key: ['A', 'B'], data: 1 }
  ]);

  return (
    <VennDiagram
      type={type ? 'euler' : 'venn'}
      height={450}
      width={450}
      data={data}
    />
  );
};

export const StarEuler = () => {
  const showValues = boolean('Show Value Labels', true);
  const size = boolean('Show 5', true);
  const showOuterLabel = boolean('Show Outer Label', true);
  const strokeWidth = number('Stroke Width', 1);
  const fill = color('Fill', '#868686');
  const labelFill = color('Label Fill', '#fff');
  const outerLabelFill = color('Outer Label Fill', '#fff');
  const stroke = color('Stroke', '#fff');
  const gradient = boolean('Gradient', true);
  const data = object('Data', eulerData);
  const next = size ? data : data.filter((d) => !d.key.includes('sophos'));

  return (
    <VennDiagram
      type="starEuler"
      height={450}
      width={450}
      data={next}
      series={
        <VennSeries
          colorScheme={[fill]}
          arc={
            <VennArc
              strokeWidth={strokeWidth}
              stroke={stroke}
              gradient={gradient ? <Gradient /> : null}
            />
          }
          label={
            <VennLabel
              labelType={showValues ? 'value' : 'key'}
              showAll={true}
              fill={labelFill}
            />
          }
          outerLabel={
            showOuterLabel ? <VennOuterLabel fill={outerLabelFill} /> : null
          }
        />
      }
    />
  );
};

export const LabelIcons = () => (
  <VennDiagram
    type="starEuler"
    height={450}
    width={450}
    data={eulerData}
    series={
      <VennSeries
        colorScheme={['#eee']}
        label={<VennLabel labelType="value" showAll={true} />}
        outerLabel={
          <VennOuterLabel
            format={(data) => {
              // set some static height/width expectations
              const height = 50;
              const width = 50;

              // Calculate some offsets based on size of your element
              const offsetX = data.set.align !== 'start' ? -width / 2 : 0;
              const offsetY =
                data.set.verticalAlign !== 'top' ? -height / 2 : 0;

              // Pass a foreign object
              return (
                <foreignObject
                  height={height}
                  width={width}
                  x={offsetX}
                  y={offsetY}
                >
                  <svg height={height} width={width} viewBox="-7 -7 25 25">
                    <path
                      d={starPath}
                      style={{
                        fill: 'lime',
                        stroke: 'purple',
                        strokeWidth: 1.5
                      }}
                    />
                  </svg>
                </foreignObject>
              );
            }}
          />
        }
      />
    }
  />
);

export const Selections = () => {
  const selections = object('Selections', ['A|B', 'B']);
  const data = object('Data', [
    { key: ['A'], data: 4 },
    { key: ['B'], data: 1 },
    { key: ['A', 'B'], data: 1 }
  ]);

  return (
    <VennDiagram
      height={450}
      width={450}
      data={data}
      series={
        <VennSeries
          selections={selections}
          arc={
            <VennArc
              stroke={(_data, _index, active, hovered) => {
                if (hovered) {
                  return 'blue';
                } else if (active) {
                  return 'green';
                }
                return 'white';
              }}
            />
          }
        />
      }
    />
  );
};

export const CustomColors = () => (
  <VennDiagram
    height={450}
    width={450}
    type="starEuler"
    data={eulerData}
    series={
      <VennSeries
        colorScheme={(data, index) => {
          return index % 2 ? 'white' : 'grey';
        }}
        arc={
          <VennArc
            stroke={(data, index, active, hovered) => {
              if (hovered) {
                return 'blue';
              } else if (active) {
                return 'green';
              }
              return 'white';
            }}
          />
        }
      />
    }
  />
);

export const LargeOffsets = () => (
  <VennDiagram
    height={450}
    width={450}
    data={[
      { key: ['A'], data: 50 },
      { key: ['B'], data: 12 },
      { key: ['A', 'B'], data: 5 }
    ]}
  />
);

export const LongText = () => (
  <VennDiagram
    height={250}
    width={250}
    data={[
      { key: ['Department of Defense'], data: 50 },
      { key: ['Office of President'], data: 50 },
      { key: ['Department of Defense', 'Office of President'], data: 25 }
    ]}
  />
);

export const ManyIntersections = () => (
  <VennDiagram
    height={450}
    width={450}
    data={[
      { key: ['A'], data: 12 },
      { key: ['B'], data: 12 },
      { key: ['C'], data: 12 },
      { key: ['D'], data: 12 },
      { key: ['A', 'B'], data: 2 },
      { key: ['B', 'C'], data: 2 },
      { key: ['A', 'C'], data: 5 },
      { key: ['A', 'B', 'C'], data: 10 },
      { key: ['B', 'D'], data: 1 },
      { key: ['D', 'A'], data: 1 },
      { key: ['D', 'A', 'B'], data: 1 }
    ]}
    series={<VennSeries colorScheme={['#2d60e8']} />}
  />
);

export const NoIntersections = () => (
  <VennDiagram
    height={450}
    width={450}
    data={[
      { key: ['A'], data: 22 },
      { key: ['B'], data: 12 },
      { key: ['C'], data: 13 },
      { key: ['D'], data: 22 }
    ]}
  />
);

export const Mask = () => (
  <VennDiagram
    height={450}
    width={450}
    series={
      <VennSeries
        arc={
          <VennArc
            mask={<Stripes />}
            strokeWidth={1}
            initialOpacity={0.9}
            activeOpacity={1}
          />
        }
      />
    }
    data={[
      { key: ['A'], data: 12 },
      { key: ['B'], data: 12 },
      { key: ['A', 'B'], data: 2 }
    ]}
  />
);

export const NoFill = () => (
  <VennDiagram
    height={450}
    width={450}
    series={
      <VennSeries
        arc={
          <VennArc
            strokeWidth={5}
            fill="transparent"
            stroke={schemes.cybertron[0]}
          />
        }
      />
    }
    data={[
      { key: ['A'], data: 12 },
      { key: ['B'], data: 12 },
      { key: ['A', 'B'], data: 2 }
    ]}
  />
);

export const NoAnimation = () => (
  <VennDiagram
    height={450}
    width={450}
    series={<VennSeries animated={false} />}
    data={[
      { key: ['A'], data: 12 },
      { key: ['B'], data: 12 },
      { key: ['A', 'B'], data: 2 }
    ]}
  />
);

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <VennDiagram
      data={[
        { key: ['A'], data: 12 },
        { key: ['B'], data: 12 },
        { key: ['A', 'B'], data: 2 }
      ]}
    />
  </div>
);

const eulerData = [
  {
    key: ['manageengine', 'meraki'],
    data: 150
  },
  {
    key: ['manageengine', 'active directory', 'sophos', 'meraki'],
    data: 91
  },
  {
    key: ['manageengine'],
    data: 202
  },
  {
    key: ['sophos'],
    data: 219
  },
  {
    key: ['manageengine', 'active directory', 'meraki'],
    data: 95
  },
  {
    key: ['manageengine', 'sophos'],
    data: 175
  },
  {
    key: ['manageengine', 'sophos', 'meraki'],
    data: 140
  },
  {
    key: ['active directory', 'sophos'],
    data: 113
  },
  {
    key: ['sophos', 'meraki'],
    data: 150
  },
  {
    key: ['gsuite'],
    data: 449
  },
  {
    key: ['gsuite', 'meraki'],
    data: 189
  },
  {
    key: ['meraki'],
    data: 850
  },
  {
    key: ['manageengine', 'active directory'],
    data: 109
  },
  {
    key: ['active directory'],
    data: 224
  },
  {
    key: ['active directory', 'meraki'],
    data: 98
  },
  {
    key: ['active directory', 'sophos', 'meraki'],
    data: 94
  },
  {
    key: ['manageengine', 'active directory', 'sophos'],
    data: 103
  }
];
