import{j as r,a as i,F as m}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import{V as p,a as l,b as s,c,d as h}from"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as d}from"./VennDiagram.story-6e4f4448.js";import{u as a}from"./index-2ef8b458.js";import{M as g,C as f,A as t}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./symbol-31118762.js";import"./star-24381329.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(n){const e=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),n.components);return i(m,{children:[r(g,{title:"Docs/Chart Types/Venn Diagram"}),`
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
