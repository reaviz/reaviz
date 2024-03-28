import{j as e,a as o,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import{T as m,a as s,b as c,c as h}from"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as l}from"./TreeMap.story-7012f486.js";import{u as n}from"./index-2ef8b458.js";import{M as d,C as f,A as a}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./sonar-ace0ce62.js";import"./moment-a9aaa855.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function i(t){const r=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},n(),t.components);return o(p,{children:[e(d,{title:"Docs/Chart Types/TreeMap"}),`
`,e(r.h1,{id:"treemap",children:"TreeMap"}),`
`,e(r.hr,{}),`
`,e("br",{}),`
`,e("div",{className:"doc-story",children:e(f,{sourceState:"shown",of:l})}),`
`,e("br",{}),`
`,e(r.p,{children:`Treemaps display hierarchical data as a set of nested rectangles.
Each branch of the tree is given a rectangle, which is then tiled with smaller rectangles
representing sub-branches. A leaf node’s rectangle has an area proportional to a specified
dimension on the data and often colored to show a separate dimension of the data.`}),`
`,e(r.h2,{id:"quick-start",children:"Quick Start"}),`
`,o(r.p,{children:["To create a treemap chart, use import the ",e(r.code,{children:"TreeMap"})," and give it ",e(r.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,e(r.code,{children:"props"}),"."]}),`
`,e(r.pre,{children:e(r.code,{className:"language-jsx",children:`import { TreeMap } from 'reaviz';

const MyChart = () => (
  <TreeMap
    height={400}
    width={400}
    data={[
      { key: 'AWS', data: 100 },
      { key: 'SendGrid', data: 45 },
      { key: 'Okta', data: 75 },
      { key: 'Twillo', data: 25 }
    ]}
  />
);
`})}),`
`,e(r.h2,{id:"api",children:"API"}),`
`,e(r.h3,{id:"treemap-1",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/TreeMap/TreeMap.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"TreeMap"})}),`
`,e(a,{of:m}),`
`,e(r.h3,{id:"treemapseries",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/TreeMap/TreeMapSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"TreeMapSeries"})}),`
`,e(a,{of:s}),`
`,e(r.h3,{id:"treemaplabel",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/TreeMap/TreeMapLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"TreeMapLabel"})}),`
`,e(a,{of:c}),`
`,e(r.h3,{id:"treemaprect",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/TreeMap/TreeMapRect.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"TreeMapRect"})}),`
`,e(a,{of:h}),`
`,e(r.h2,{id:"demo",children:"Demo"}),`
`,e(r.pre,{children:e(r.code,{className:"language-js",children:`import React from 'react';
import { TreeMap } from 'reaviz';

const data = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <TreeMap width={400} height={400} data={data} />
  </div>
);
`})})]})}function _e(t={}){const{wrapper:r}=Object.assign({},n(),t.components);return r?e(r,Object.assign({},t,{children:e(i,t)})):i(t)}export{_e as default};
