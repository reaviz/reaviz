module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-nested'),
    require('postcss-preset-env')({ stage: 1 }),
    require('autoprefixer')
  ]
};
