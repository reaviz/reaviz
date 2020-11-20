import React from 'react';
import { render } from '@testing-library/react';
import { PieArc, PieArcLabel, PieArcSeries } from './PieArcSeries';
import { PieChart } from './PieChart';
import { ChartTooltip } from '../common';
import { categoryData } from '../../demo';

it('should allow to render components with only required props', () => {
  // test that are typings are correct and that our components
  // can render when we provide only the required props
  expect(() => {
    render(<PieChart />);
  }).not.toThrow();

  expect(() => {
    render(
      <PieChart
        series={
          <PieArcSeries
            arc={<PieArc tooltip={<ChartTooltip />} />}
            label={<PieArcLabel />}
          />
        }
      />
    );
  }).not.toThrow();
});

it('should render some data without errors', () => {
  expect(() => {
    render(<PieChart width={250} height={350} data={categoryData} />);
  }).not.toThrow();
});
