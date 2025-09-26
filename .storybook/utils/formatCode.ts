import * as typescriptParser from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';

export const formatCode = (src) => {
  const options = {
    parser: 'typescript',
    plugins: [typescriptParser],
    tabWidth: 2,
  };
  return prettier.format(src, options);
};

export default formatCode;
