import{j as e,a as o,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import{B as s,a as p,b as m,c as b}from"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as h}from"./BubbleChart.story-8cc16070.js";import{u as a}from"./index-2ef8b458.js";import{M as c,C as d,A as i}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./sonar-ace0ce62.js";import"./moment-a9aaa855.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function n(t){const r=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",hr:"hr",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),t.components);return o(l,{children:[e(c,{title:"Docs/Chart Types/Bubble Chart"}),`
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
