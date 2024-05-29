import { readFileSync, writeFileSync } from 'fs';
import fg from 'fast-glob';
import { resolve } from 'path';
import { parse, builtinResolvers } from 'react-docgen';

const {
  ChainResolver,
  FindAllDefinitionsResolver,
  FindAnnotatedDefinitionsResolver,
} = builtinResolvers;

const resolver = new ChainResolver(
  [new FindAnnotatedDefinitionsResolver(), new FindAllDefinitionsResolver()],
  { chainingLogic: ChainResolver.Logic.ALL },
);

const defaultPlugins = [
  'jsx',
  'asyncDoExpressions',
  'decimal',
  'decorators',
  'decoratorAutoAccessors',
  'destructuringPrivate',
  'doExpressions',
  'explicitResourceManagement',
  'exportDefaultFrom',
  'functionBind',
  'functionSent',
  'importAssertions',
  'importReflection',
  'moduleBlocks',
  'partialApplication',
  ['pipelineOperator', { proposal: 'minimal' }],
  'recordAndTuple',
  'regexpUnicodeSets',
  'throwExpressions',
];

/**
 * Builds the doc types.
 */
function buildDocs() {
  const files = fg.sync('src/**/!(*.story).tsx');

  const result = [];
  let count = 0;
  let fail = 0;

  files.forEach((file) => {
    console.log('Reading', file);

    try {
      const code = readFileSync(file, { encoding: 'utf-8' });
      const documentation = parse(code, {
        // Stolen from website
        // https://github.com/reactjs/react-docgen/blob/main/packages/website/src/components/playground/Playground.tsx#L85
        resolver,
        babelOptions: {
          babelrc: false,
          babelrcRoots: false,
          configFile: false,
          filename: 'playground.js',
          parserOpts: {
            plugins: [...defaultPlugins, 'typescript'],
          },
        }
      });
      if (documentation) {
        result.push(...documentation);
        count++;
      }
    } catch (e) {
      fail++;
      console.error('Error reading', file, e);
    }
  });

  const fileName = resolve('dist', 'docs.json');
  writeFileSync(fileName, JSON.stringify(result, null, 2));

  console.info('Docs created!', fileName);
  console.info('Failed:', fail);
  console.info('Total Doc:', count);
}

buildDocs();
