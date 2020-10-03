const { resolve } = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const codesandbox = require('remark-codesandbox');
const reavizCodesandboxTemplatePackageJSON = require('../docs/tools/templates/reaviz-codesandbox-template/package.json');

module.exports = {
  stories: ['../src/**/*.story.tsx', '../docs/**/*.story.mdx'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true
        }
      }
    },
    '@storybook/addon-google-analytics',
    '@storybook/addon-knobs',
    '@storybook/addon-docs/preset'
  ],
  webpackFinal: (config) => {
    const mdxRule = config.module.rules.find((rule) =>
      rule.test.test('.story.mdx')
    );

    const {
      options: { remarkPlugins }
    } = mdxRule.use.find(
      ({ loader }) => loader === require.resolve('@mdx-js/loader')
    );

    remarkPlugins.push([
      codesandbox,
      {
        mode: 'iframe',
        query: {
          fontsize: 14
        },
        customTemplates: {
          reaviz: {
            extends: `file:${resolve(
              __dirname,
              '../docs/tools/templates/reaviz-codesandbox-template'
            )}`,
            entry: 'src/App.js'
          },
          'reaviz-map': {
            extends: 'reaviz',
            files: {
              'package.json': {
                content: {
                  ...reavizCodesandboxTemplatePackageJSON,
                  dependencies: {
                    ...reavizCodesandboxTemplatePackageJSON.dependencies,
                    'topojson-client': 'latest',
                    'world-atlas': 'latest'
                  }
                }
              }
            }
          }
        },
        autoDeploy: true
      }
    ]);

    return config;
  }
};
