/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './.storybook/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './blocks/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
