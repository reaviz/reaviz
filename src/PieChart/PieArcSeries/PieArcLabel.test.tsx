import React from 'react';
import { render, screen } from '@testing-library/react';
import { PieArcLabel } from './PieArcLabel';
import { ArcData } from '../PieChart';

const data: ArcData = {
  data: {
    key: 'foo',
    data: 1
  },
  value: 1,
  index: 0,
  startAngle: 0,
  endAngle: 1,
  padAngle: 0
};

const outerRadius = 10;
const position: [number, number] = [20, -40];
const centroid = (): [number, number] => [30, -30];

it('should render simple text', () => {
  render(
    <svg>
      <PieArcLabel
        data={data}
        position={position}
        centroid={centroid}
        outerRadius={outerRadius}
      />
    </svg>
  );

  expect(screen.getAllByText('foo')).toHaveLength(2);
});

it('should use format if provided', () => {
  const newLabel = 'newLabel';
  const format = jest.fn(() => newLabel);

  render(
    <svg>
      <PieArcLabel
        data={data}
        position={position}
        centroid={centroid}
        format={format}
        outerRadius={outerRadius}
      />
    </svg>
  );

  expect(screen.getAllByText(newLabel)).toHaveLength(2);

  expect(format).toBeCalledWith({
    data: 1,
    key: 'foo',
    textAnchor: 'start'
  });
});

it('should render custom label', () => {
  const newLabel = 'newLabel';
  const format = jest.fn(() => <button>{newLabel}</button>);

  render(
    <svg>
      <PieArcLabel
        data={data}
        position={position}
        centroid={centroid}
        format={format}
        outerRadius={outerRadius}
      />
    </svg>
  );

  expect(screen.getByRole('button', { name: newLabel })).toBeInTheDocument();
});
