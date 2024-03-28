import{j as r,a as o,F as m}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import{B as p,a as s}from"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as c}from"./BarList.story-9258431f.js";import{u as n}from"./index-2ef8b458.js";import{M as l,C as d,A as e}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function a(i){const t=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},n(),i.components);return o(m,{children:[r(l,{title:"Docs/Chart Types/Bar List"}),`
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
