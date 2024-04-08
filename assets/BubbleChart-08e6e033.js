import{j as e,a as o,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import{B as s,a as p,b as m,c as b}from"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as h}from"./BubbleChart.story-bca0ca9a.js";import{u as a}from"./index-2ef8b458.js";import{M as c,C as d,A as i}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./sonar-ace0ce62.js";import"./moment-a9aaa855.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function n(t){const r=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",hr:"hr",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),t.components);return o(l,{children:[e(c,{title:"Docs/Chart Types/Bubble Chart"}),`
`,e(r.h1,{id:"bubble-chart",children:"Bubble Chart"}),`
`,e("div",{className:"doc-story",children:e(d,{sourceState:"shown",sourceState:"shown",of:h})}),`
`,e(r.p,{children:"A Bubble chart visualizes data using circles ('bubbles') where the size represents a numerical value, allowing comparison of multiple data points across two axes."}),`
`,o(r.ul,{children:[`
`,e(r.li,{children:"Depicts three dimensions of data using x and y coordinates for positioning and bubble size for value."}),`
`,e(r.li,{children:"Best suited for showcasing relationships and comparisons between items, especially in scientific and statistical data."}),`
`,e(r.li,{children:"Offers the ability to represent diverse datasets by incorporating multiple bubble sizes and colors."}),`
`,e(r.li,{children:"Enables a clear visual analysis of data points with varying values, revealing patterns and correlations."}),`
`]}),`
`,e(r.hr,{}),`
`,e(r.h2,{id:"quick-start",children:"Quick Start"}),`
`,o(r.p,{children:["To create a bubble chart, use import the ",e(r.code,{children:"BubbleChart"})," and give it ",e(r.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,e(r.code,{children:"props"}),"."]}),`
`,e(r.pre,{children:e(r.code,{className:"language-jsx",children:`import { BubbleChart } from 'reaviz';

const MyChart = () => (
  <BubbleChart
    height={300}
    width={300}
    data={[
      { key: 'AWS', data: 13 },
      { key: 'SendGrid', data: 2 },
      { key: 'Okta', data: 15 }
    ]}
  />
);
`})}),`
`,e(r.h2,{id:"api",children:"API"}),`
`,e(r.h3,{id:"bubblechart",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BubbleChart/BubbleChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BubbleChart"})}),`
`,e(i,{of:s}),`
`,e(r.h3,{id:"bubbleseries",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BubbleChart/BubbleSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BubbleSeries"})}),`
`,e(i,{of:p}),`
`,e(r.h3,{id:"bubble",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BubbleChart/Bubble.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Bubble"})}),`
`,e(i,{of:m}),`
`,e(r.h3,{id:"bubblelabel",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BubbleChart/BubbleLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BubbleLabel"})}),`
`,e(i,{of:b}),`
`,e(r.h2,{id:"demo",children:"Demo"}),`
`,e(r.pre,{children:e(r.code,{className:"language-js",children:`import React from 'react';
import { BubbleChart } from 'reaviz';

const data = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <BubbleChart
      data={data}
      height={450}
      width={450}
    />
  </div>
);
`})})]})}function De(t={}){const{wrapper:r}=Object.assign({},a(),t.components);return r?e(r,Object.assign({},t,{children:e(n,t)})):n(t)}export{De as default};
