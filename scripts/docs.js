import { writeFileSync } from 'fs';
import fg from 'fast-glob';
import { resolve } from 'path';
import docgen from 'react-docgen-typescript';

/**
 * Builds the doc types.
 */
function buildDocs() {
  const files = fg.sync('src/**/!(*.story).tsx');

  const result = [];
  let count = 0;
  let fail = 0;

  const options = {
    savePropValueAsString: true
  };
  const tsConfigParser = docgen.withCustomConfig('./tsconfig.json', options);

  files.forEach((file) => {
    console.log('Reading', file);

    try {
      const documentation = tsConfigParser.parse(file, options);
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
