/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig(({ mode }) =>
  mode === 'library'
    ? {
      plugins: [
        svgrPlugin(),
        cssInjectedByJsPlugin(),
        react(),
        dts({
          insertTypesEntry: true,
          compilerOptions: { rootDir: 'src' },
          include: ['src']
        }),
        checker({
          typescript: true
        }),
        viteStaticCopy({
          targets: [
            {
              src: 'src/**/*.story.tsx',
              dest: 'stories/',
              // static-copy v4 preserves dir structure by default; keep the
              // published flat layout that ./stories/* exports and stories.cjs rely on
              rename: { stripBase: true }
            },
            {
              src: 'blocks/*.story.tsx',
              dest: 'blocks/',
              rename: { stripBase: true }
            }
          ]
        })
      ],
      test: {
        globals: true,
        environment: 'jsdom'
      },
      resolve: {
        tsconfigPaths: true,
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      build: {
        minify: false,
        // not covered by minify:false — vite 8 would otherwise minify CSS via Lightning CSS
        cssMinify: false,
        sourcemap: true,
        copyPublicDir: false,
        lib: {
          entry: resolve('src', 'index.ts'),
          fileName: 'index',
          formats: ['es']
        },
        rollupOptions: {
          plugins: [
            external({
              includeDependencies: true
            })
          ]
        }
      }
    }
    : {
      plugins: [
        svgrPlugin(),
        react(),
        checker({
          typescript: true
        })
      ],
      test: {
        globals: true,
        environment: 'jsdom'
      },
      resolve: {
        tsconfigPaths: true
      }
    }
);
