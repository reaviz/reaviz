import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../docs/**/*.mdx',
    '../src/**/*.story.tsx',
    '../blocks/**/*.story.tsx'
  ],

  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};

export default config;
