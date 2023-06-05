import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../docs/**/*.mdx',
    '../src/**/*.story.tsx'
  ],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
};

export default config;
