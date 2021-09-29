import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss-modules';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import json from '@rollup/plugin-json';
import bundleSize from 'rollup-plugin-bundle-size';

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'reaviz'
      },
      {
        file: pkg.main,
        format: 'cjs',
        name: 'reaviz'
      },
      {
        file: pkg.module,
        format: 'esm'
      }
    ],
    plugins: [
      external({
        includeDependencies: true
      }),
      postcss({
        // extract: true,
        modules: true,
        // writeDefinitions: true,
        plugins: [
          require('postcss-nested'),
          require('postcss-preset-env')({ stage: 1 }),
          require('autoprefixer')
        ]
      }),
      typescript({
        clean: true,
        exclude: [
          '*.scss',
          '*.css',
          '*.test.js',
          '*.test.ts',
          '*.test.tsx',
          '*.d.ts',
          '**/*.d.ts',
          '**/*.story.tsx'
        ]
      }),
      json(),
      resolve({
        browser: true
      }),
      commonjs(),
      sourceMaps(),
      bundleSize()
    ]
  }
];
