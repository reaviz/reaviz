import '../src/index.css';

import type { Preview } from '@storybook/react';

import theme from './theme';
import formatCode from './utils/formatCode';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { hideNoControlsWarning: true },
    actions: { argTypesRegex: '^on.*' },
    docs: {
      source: {
        transform: (src) => formatCode(src),
      },
      theme,
    },
    options: {
      storySort: {
        order: [
          'Docs',
          [
            'Intro',
            'Getting Started',
            'Chart Types',
            'Utils',
            'Advanced',
            'Support',
          ],
        ],
      },
    },
  },
};

export default preview;
