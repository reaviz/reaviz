<p align="center">
  <img width="650" src="docs/assets/logo.png">
  <br />
  Data visualization library for React
  <br /><br />
  <a href="https://github.com/reaviz/reaviz/workflows/build/">
    <img src="https://github.com/reaviz/reaviz/workflows/build/badge.svg?branch=master" />
  </a>
  <a href="https://npm.im/reaviz">
    <img src="https://img.shields.io/npm/v/reaviz.svg" />
  </a>
  <a href="https://npm.im/reaviz">
    <img src="https://badgen.net/npm/dw/reaviz" />
  </a>
  <a href="https://github.com/reaviz/reaviz/blob/master/LICENSE">
    <img src="https://badgen.now.sh/badge/license/apache2" />
  </a>
  <a href="https://bundlephobia.com/result?p=reaviz">
    <img src="https://badgen.net/bundlephobia/minzip/reaviz">
  </a>
  <a href="https://discord.gg/tt8wGExq35">
    <img src="https://img.shields.io/discord/773948315037073409?label=discord">
  </a>
  <a href="https://opencollective.com/reaviz">
    <img alt="Open Collective backers and sponsors" src="https://img.shields.io/opencollective/all/reaviz?label=backers">
  </a>
</p>

---

REAVIZ is a modular chart component library that leverages
React natively for rendering the components while using D3js under the
hood for calculations. The library provides an easy way to get started
creating charts without sacrificing customization ability.

If you are looking for workflow/diagram graphs, checkout [reaflow](https://reaflow.dev).

If you are looking for webgl-based network graphs, checkout [reagraph](https://reagraph.dev).

## 🚀 Quick Links

- Checkout the [demos](https://reaviz.io)
- Learn more in the [docs](https://reaviz.io?path=/docs/docs-intro--page)
- Explore the library on [Chroma](https://www.chromatic.com/library?appId=5eb04da4d1d2d10022dc9c73)
- Learn about updates from the [changelog](CHANGELOG.md)

## ✨ Features

Chart types include:

- Bar Chart
  - Single Series Vertical / Horizontal
  - Multi Series Vertical / Horizontal
  - Stacked Vertical / Horizontal
  - Stacked Normalized Vertical / Horizontal
  - Stacked Diverging Vertical / Horizontal
  - Marimekko
  - Radial
  - Sparkline
  - Waterfall
- Line Chart
  - Single Series
  - Multi Series
  - Stacked
  - Stacked Normalized
  - Radial
  - Sparklines
- Area Chart
  - Single Series
  - Multi Series
  - Stacked
  - Stacked Normalized
  - Radial
  - Sparklines
- Scatter Chart
  - Linear
  - Radial
- Pie Chart
  - Standard
  - Exploded
  - Donut Chart
- Sankey chart
- Hive Plot
- Gauge
  - Radial
  - Linear
  - Stacked Radial
- Map Chart
- Heatmap
  - Standard
  - Year Calendar
  - Month Calendar
- Venn Diagram
  - Standard
  - Euler
  - Fixed Euler
- Bubble Chart
- Treemap

Additional features:

- Legend
  - Discrete
  - Sequential
- Axis
  - Linear
  - Radial
  - Advanced Label Positioning
- Gestures
  - Pinch
  - Pan
  - Zoom
  - Move
- Tooltip
  - Single Value
  - Grouped Values
- Line/Area Series Symbols
- Animations Enter/Update/Exit
- Brush
- Patterns
- Gradients
- Grid Lines
- Mark Lines
- BigInt Support
- Auto Sizing
- Bar Guidelines
- Range Lines
- Animated Counts
- SSR

## 📦 Install

To use reaviz in your project, install it via npm/yarn:

```
npm i reaviz --save
```

then import a chart type into your JSX element:

```jsx
import { BarChart } from 'reaviz';

const data = [
  { key: 'IDS', data: 14 },
  { key: 'Malware', data: 5 },
  { key: 'DLP', data: 18 }
];

const App = () => <BarChart width={350} height={250} data={data} />;
```

Checkout this [demo live](https://codesandbox.io/embed/m7rl2z1989) or
visit the [demos page](https://reaviz.github.io/reaviz/) to learn more!

## 🔭 Development

If you want to run REAVIZ locally, its super easy!

- Clone the repository
- `yarn install`
- `yarn start`
- Browser opens to Storybook page

## ❤️ Contributors

Thanks to all our contributors!

<a href="https://github.com/reaviz/reaviz/graphs/contributors"><img src="https://opencollective.com/reaviz/contributors.svg?width=890" /></a>
