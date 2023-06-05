import theme from './theme';
import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { hideNoControlsWarning: true },
    actions: { argTypesRegex: '^on.*' },
    docs: {
      theme
    },
    options: {
      storySort: {
        order: ['Docs', ['Intro', 'Getting Started', 'Chart Types', 'Utils', 'Advanced']]
      },
    }
  }
};

export default preview;