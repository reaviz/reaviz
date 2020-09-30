import theme from './theme';

export const parameters = {
  layout: 'centered',
  options: {
    storySort: (a, b) => {
      if (a[0].includes('docs-')) {
        if (a[0].includes('intro-')) {
          return -1;
        }
      }

      return a - b;
    }
  },
  docs: {
    theme
  }
};
