import theme from './theme';
import { Preview } from '@storybook/react';
import formatCode from './utils/formatCode';

import '../src/index.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { hideNoControlsWarning: true },
    actions: { argTypesRegex: '^on.*' },
    docs: {
      source: {
        transform: (src) => formatCode(src)
      },
      theme
    },
    options: {
      storySort: {
        order: ['Docs', ['Intro', 'Getting Started', 'Chart Types', 'Utils', 'Advanced', 'Support']]
      },
    }
  }
};

export default preview;
