const { resolve } = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const codesandbox = require('remark-codesandbox');
const reavizCodesandboxTemplatePackageJSON = require('../docs/tools/templates/reaviz-codesandbox-template/package.json');

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
  ],
  webpackFinal: (config) => {
    /*
    config.module.rules.push({
      test: /\.story\.mdx$/,
      exclude: [/node_modules/],
      include: [
        resolve(__dirname, '../src'),
        resolve(__dirname, '../docs'),
        resolve(__dirname, '../demo')
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-react-jsx']
          }
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
            remarkPlugins: [
              [
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
              ]
            ]
          }
        }
      ]
    });
    */

    return config;
  }
};
