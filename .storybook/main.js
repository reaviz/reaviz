module.exports = {
  stories: [
    '../src/**/*.story.tsx',
    '../docs/**/*.story.mdx'
  ],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true
        }
      }
    },
    '@storybook/addon-docs/preset'
  ]
};
