import type { Meta, StoryObj } from '@storybook/react';

import { schemes } from '../common/color';
import type { ChartShallowDataShape } from '../common/data';
import { WordCloud } from './WordCloud';

const meta: Meta<typeof WordCloud> = {
  title: 'Charts/Word Cloud',
  component: WordCloud,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof WordCloud>;

const sampleData: ChartShallowDataShape[] = [
  { key: 'React', data: 100 },
  { key: 'JavaScript', data: 85 },
  { key: 'TypeScript', data: 80 },
  { key: 'D3.js', data: 75 },
  { key: 'HTML', data: 70 },
  { key: 'CSS', data: 65 },
  { key: 'Node.js', data: 60 },
  { key: 'GraphQL', data: 55 },
  { key: 'Python', data: 50 },
  { key: 'Java', data: 45 },
  { key: 'Docker', data: 40 },
  { key: 'Kubernetes', data: 35 },
  { key: 'AWS', data: 30 },
  { key: 'Git', data: 25 },
  { key: 'Redux', data: 20 }
];

export const Basic: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    colorScheme: schemes.cybertron
  }
};

export const CustomColors: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    colorScheme: ['white']
  }
};

export const NoRotation: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    rotations: 0,
    colorScheme: schemes.cybertron
  }
};

export const CustomFontSize: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    fontSizeRange: [20, 80],
    colorScheme: schemes.cybertron
  }
};
