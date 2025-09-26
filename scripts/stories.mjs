import fg from 'fast-glob';
import fs from 'fs';
import { rewritePaths } from 'typescript-rewrite-paths';
/**
 * Replace all the paths in the stories from `./Block` to `reaviz`
 */
function replacePaths() {
  // Grep all the stories
  const files = fg.sync(['dist/stories/*.tsx', 'dist/blocks/*.tsx']);

  files.forEach((file) => {
    const code = fs.readFileSync(file, { encoding: 'utf-8' });

    const output = rewritePaths(code, (path) => {
      if (
        path.startsWith('./') ||
        path.startsWith('../') ||
        path.startsWith('@/') ||
        path.startsWith('@demo')
      ) {
        console.info(`Replacing ${path} with reaviz`);
        return 'reaviz';
      }

      return path;
    });

    fs.writeFileSync(file, output);
  });
}

replacePaths();
