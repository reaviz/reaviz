import{j as e,a as o,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import{T as m,a as s,b as c,c as h}from"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as l}from"./TreeMap.story-3287f97a.js";import{u as n}from"./index-2ef8b458.js";import{M as d,C as f,A as a}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./sonar-ace0ce62.js";import"./moment-a9aaa855.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function i(t){const r=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},n(),t.components);return o(p,{children:[e(d,{title:"Docs/Chart Types/TreeMap"}),`
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
