import{j as r,a as i,F as m}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import{V as p,a as l,b as s,c,d as h}from"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as d}from"./VennDiagram.story-99c481da.js";import{u as a}from"./index-2ef8b458.js";import{M as g,C as f,A as t}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./symbol-38c324a2.js";import"./star-2c83a278.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(n){const e=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),n.components);return i(m,{children:[r(g,{title:"Docs/Chart Types/Venn Diagram"}),`
`,r(e.h1,{id:"venn-diagram",children:"Venn Diagram"}),`
`,r(e.hr,{}),`
`,r("div",{className:"doc-story",children:r(f,{sourceState:"shown",of:d})}),`
`,r(e.p,{children:`A Venn diagram or set diagram is a diagram that shows all possible logical relations
between a finite collection of sets.`}),`
`,r(e.p,{children:"The chart supports 3 layout types:"}),`
`,i(e.ul,{children:[`
`,r(e.li,{children:"Venn"}),`
`,r(e.li,{children:"Euler"}),`
`,r(e.li,{children:"Star Euler"}),`
`]}),`
`,r(e.h2,{id:"quick-start",children:"Quick Start"}),`
`,i(e.p,{children:["To create a venn diagram, import the ",r(e.code,{children:"VennDiagram"})," and give it ",r(e.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,r(e.code,{children:"props"}),"."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`import { VennDiagram } from 'reaviz';

const MyChart = () => (
  <VennDiagram
    height={300}
    width={300}
    data={[
      { key: ['A'], data: 12 },
      { key: ['B'], data: 12 },
      { key: ['A', 'B'], data: 2 }
    ]}
  />
);
`})}),`
`,i(e.p,{children:["One important aspect to realize here is the ",r(e.code,{children:"key"}),` property
is a array of intersections. It can have one to N number
of relationships.`]}),`
`,r(e.h2,{id:"api",children:"API"}),`
`,r(e.h3,{id:"venndiagram",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/VennDiagram/VennDiagram.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"VennDiagram"})}),`
`,r(t,{of:p}),`
`,r(e.h3,{id:"vennseries",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/VennDiagram/VennSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"VennSeries"})}),`
`,r(t,{of:l}),`
`,r(e.h3,{id:"vennarc",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/VennDiagram/VennArc.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"VennArc"})}),`
`,r(t,{of:s}),`
`,r(e.h3,{id:"vennlabel",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/VennDiagram/VennLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"VennLabel"})}),`
`,r(t,{of:c}),`
`,r(e.h3,{id:"vennouterlabel",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/VennDiagram/VennOuterLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"VennOuterLabel"})}),`
`,r(t,{of:h}),`
`,r(e.h2,{id:"demo",children:"Demo"}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`import React from 'react';
import { VennDiagram } from 'reaviz';

export const data = [
  { key: ['A'], data: 12 },
  { key: ['B'], data: 12 },
  { key: ['A', 'B'], data: 2 }
];

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <VennDiagram width={450} height={450} data={data} />
  </div>
);
`})})]})}function Or(n={}){const{wrapper:e}=Object.assign({},a(),n.components);return e?r(e,Object.assign({},n,{children:r(o,n)})):o(n)}export{Or as default};
