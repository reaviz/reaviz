import{j as t,a as o,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import{S as m,a as c,b as l}from"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as s}from"./ScatterPlotLinear.story-8340f7aa.js";import{u as a}from"./index-2ef8b458.js";import{M as h,C as d,A as i}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./sonar-ace0ce62.js";import"./moment-a9aaa855.js";import"./symbol-38c324a2.js";import"./star-2c83a278.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function n(e){const r=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),e.components);return o(p,{children:[t(h,{title:"Docs/Chart Types/Scatter Plot"}),`
`,t(r.h1,{id:"scatter-plot",children:"Scatter Plot"}),`
`,t(r.hr,{}),`
`,t("br",{}),`
`,t("div",{className:"doc-story",children:t(d,{sourceState:"shown",of:s})}),`
`,t("br",{}),`
`,t(r.p,{children:`A scatter plot is a type of mathematical diagram using Cartesian coordinates to
display values for two variables for a set of data. The data is displayed as a collection
of points, each having the value of one variable determining the position on the horizontal
axis and the value of the other variable determining the position on the vertical axis.`}),`
`,t(r.p,{children:"Types supported by reaviz:"}),`
`,o(r.ul,{children:[`
`,t(r.li,{children:"Scatter"}),`
`,t(r.li,{children:"Bubble"}),`
`]}),`
`,t(r.h2,{id:"quick-start",children:"Quick Start"}),`
`,o(r.p,{children:["To create a Bar chart, use import the ",t(r.code,{children:"ScatterPlot"})," and give it ",t(r.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,t(r.code,{children:"props"}),"."]}),`
`,t(r.pre,{children:t(r.code,{className:"language-jsx",children:`import { ScatterPlot } from 'reaviz';

const MyChart = () => (
  <ScatterPlot
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
`,t(r.h2,{id:"api",children:"API"}),`
`,t(r.h3,{id:"scatterplot",children:t(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/ScatterPlot/ScatterPlot.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"ScatterPlot"})}),`
`,t(i,{of:m}),`
`,t(r.h3,{id:"scatterseries",children:t(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/ScatterPlot/ScatterSeries/ScatterSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"ScatterSeries"})}),`
`,t(i,{of:c}),`
`,t(r.h3,{id:"scatterpoint",children:t(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/ScatterPlot/ScatterSeries/ScatterPoint.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"ScatterPoint"})}),`
`,t(i,{of:l}),`
`,t(r.h2,{id:"demo",children:"Demo"}),`
`,t(r.pre,{children:t(r.code,{className:"language-jsx",children:`import React from 'react';
import { ScatterPlot } from 'reaviz';

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
    <ScatterPlot width={350} height={250} data={data} />
  </div>
);
`})})]})}function At(e={}){const{wrapper:r}=Object.assign({},a(),e.components);return r?t(r,Object.assign({},e,{children:t(n,e)})):n(e)}export{At as default};
