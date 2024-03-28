import{j as r,a as i,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import{A as h,a as m,b as s,L as l,P as c}from"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as d}from"./AreaChartSingleSeries.story-5fc7c9df.js";import{M as f,C as u,A as a}from"./index-1df4c13d.js";import{u as o}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function n(t){const e=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},o(),t.components);return i(p,{children:[r(f,{title:"Docs/Chart Types/Area Chart"}),`
`,r(e.h1,{id:"area-chart",children:"Area Chart"}),`
`,r(e.hr,{}),`
`,r("br",{}),`
`,r("div",{className:"doc-story",children:r(u,{sourceState:"shown",of:d})}),`
`,r("br",{}),`
`,r(e.p,{children:`An Area Chart or area graph are basically a line graph with the area
below the lined filled with colors or textures. Like line graphs area charts are
used to represent the development of quantitative values over a time period. It can also be used
to compare two or more categories and is similar to the Stacked Area Chart.`}),`
`,r(e.p,{children:"Area charts often used to show overall trends over time rather than specific values."}),`
`,r(e.p,{children:"Types supported by reaviz:"}),`
`,i(e.ul,{children:[`
`,r(e.li,{children:"Single Series"}),`
`,r(e.li,{children:"Multi Series"}),`
`,r(e.li,{children:"Stacked"}),`
`,r(e.li,{children:"Stacked Normalized"}),`
`]}),`
`,r(e.h2,{id:"quick-start",children:"Quick Start"}),`
`,i(e.p,{children:["To create a area chart, use import the ",r(e.code,{children:"AreaChart"})," and give it ",r(e.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,r(e.code,{children:"props"}),"."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`import { AreaChart } from 'reaviz';

const MyChart = () => (
  <AreaChart
    height={300}
    width={300}
    data={[
      { key: new Date('11/29/2019'), data: 13 },
      { key: new Date('11/30/2019'), data: 13 },
      { key: new Date('12/1/2019'), data: 13 },
    ]}
  />
);
`})}),`
`,r(e.h2,{id:"api",children:"API"}),`
`,r(e.h3,{id:"areachart",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/AreaChart/AreaChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"AreaChart"})}),`
`,r(a,{of:h}),`
`,r(e.h3,{id:"areaseries",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/AreaChart/AreaSeries/AreaSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"AreaSeries"})}),`
`,r(a,{of:m}),`
`,r(e.h3,{id:"area",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/AreaChart/AreaSeries/Area.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Area"})}),`
`,r(a,{of:s}),`
`,r(e.h3,{id:"line",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/AreaChart/AreaSeries/Line.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Line"})}),`
`,r(a,{of:l}),`
`,r(e.h3,{id:"pointseries",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/AreaChart/AreaSeries/PointSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"PointSeries"})}),`
`,r(a,{of:c}),`
`,r(e.h2,{id:"demo",children:"Demo"}),`
`,r(e.pre,{children:r(e.code,{className:"language-js",children:`import React from 'react';
import { AreaChart } from 'reaviz';

export const data = [
  {
    key: new Date('11/29/2019'),
    data: 10
  },
  {
    key: new Date('11/30/2019'),
    data: 14
  },
  {
    key: new Date('12/01/2019'),
    data: 5
  },
  {
    key: new Date('12/02/2019'),
    data: 18
  }
];

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <AreaChart width={350} height={250} data={data} />
  </div>
);
`})})]})}function Lr(t={}){const{wrapper:e}=Object.assign({},o(),t.components);return e?r(e,Object.assign({},t,{children:r(n,t)})):n(t)}export{Lr as default};
