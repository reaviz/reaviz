import{j as r,a as o,F as m}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import{B as p,a as s}from"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as c}from"./BarList.story-e1b7e48e.js";import{u as n}from"./index-2ef8b458.js";import{M as l,C as d,A as e}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function a(i){const t=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},n(),i.components);return o(m,{children:[r(l,{title:"Docs/Chart Types/Bar List"}),`
`,r(t.h1,{id:"bar-list",children:"Bar List"}),`
`,r(t.hr,{}),`
`,r("br",{}),`
`,r("div",{className:"doc-story",children:r(d,{sourceState:"shown",of:c})}),`
`,r("br",{}),`
`,r(t.p,{children:"Horizontal bars with a label."}),`
`,r(t.h2,{id:"quick-start",children:"Quick Start"}),`
`,o(t.p,{children:["To create a Bar List, use import the ",r(t.code,{children:"BarList"})," and give it ",r(t.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,r(t.code,{children:"props"}),"."]}),`
`,r(t.pre,{children:r(t.code,{className:"language-jsx",children:`import { BarList } from 'reaviz';

const MyChart = () => (
  <BarList
    data={[
      { key: 'DLP', data: 13 },
      { key: 'SIEM', data: 2 },
      { key: 'Endpoint', data: 7 }
    ]}
  />
);
`})}),`
`,r(t.h2,{id:"api",children:"API"}),`
`,r(t.h3,{id:"barlist",children:r(t.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BarList/BarList.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BarList"})}),`
`,r(e,{of:p}),`
`,r(t.h3,{id:"barlistseries",children:r(t.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BarList/BarListSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BarListSeries"})}),`
`,r(e,{of:s}),`
`,r(t.h2,{id:"demo",children:"Demo"}),`
`,r(t.pre,{children:r(t.code,{className:"language-jsx",children:`import React from 'react';
import { BarList } from 'reaviz';

export const data = [
  { key: 'Vulnerability Patch', data: 50 },
  { key: 'Critical Failure', data: 25 },
  { key: 'Physical Intrusion', data: 5 },
  { key: 'Phishing Attempts', data: 100 }
];

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <BarList
      style={{ width: 350 }}
      data={data}
    />
  </div>
);
`})})]})}function Cr(i={}){const{wrapper:t}=Object.assign({},n(),i.components);return t?r(t,Object.assign({},i,{children:r(a,i)})):a(i)}export{Cr as default};
