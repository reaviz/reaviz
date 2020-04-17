import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import ReavizLogo from './assets/reaviz.svg';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import centered from '@storybook/addon-centered/react';
import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
  brandImage: ReavizLogo,
  brandTitle: 'REAVIZ',
  url: 'https://github.com/jask-oss/reaviz'
});

// Customize the UI a bit
addParameters({
  options: {
    theme,
    showPanel: false,
    panelPosition: 'right',
    storySort: (a, b) => {
      if (a[0].includes('docs-')) {
        if (a[0].includes('intro-')) {
          return -1;
        }

        return 0;
      }

      return 1;
    }
  },
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});

// Custom center decorator that supports docs extensions
addDecorator((...args) => {
  const params = (new URL(document.location)).searchParams;
  const isInDockView = params.get('viewMode') === 'docs';

  if (isInDockView) {
    return args[0]();
  }

  return centered(...args);
});

// Add all our decorators
addDecorator(withKnobs);

const loadStories = () => {
  return [
    // Ensure we load Welcome First
    require.context('../docs', true, /Intro.story.mdx/),
    require.context('../docs', true, /GettingStarted.story.mdx/),
    require.context('../docs', true, /Data.story.mdx/),
    require.context('../docs', true, /Developing.story.mdx/),
    require.context('../docs', true, /Why.story.mdx/),
    require.context('../docs/charts', true, /\.story.mdx/),
    require.context('../docs/advanced', true, /\.story.mdx/),
    require.context('../src', true, /\.story\.(js|jsx|ts|tsx|mdx)$/)
  ];
}

configure(loadStories(), module);
