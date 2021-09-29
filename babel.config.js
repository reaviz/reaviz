module.exports = function(api) {
  api.cache.forever();

  return {
    presets: [
      ['@babel/preset-env', {
        targets: {
          esmodules: true
        }
      }],
      '@babel/preset-react',
      ['@babel/typescript', { isTSX: true, allExtensions: true }]
    ],
    plugins: []
  };
};
