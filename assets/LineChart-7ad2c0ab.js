import{j as t,a as i,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import{L as m,a as s}from"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as h}from"./LineChartSingleSeries.story-dd289db2.js";import{u as a}from"./index-2ef8b458.js";import{M as l,C as d,A as n}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(e){const r=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),e.components);return i(p,{children:[t(l,{title:"Docs/Chart Types/Line Chart"}),`
`,t(r.h1,{id:"line-chart",children:"Line Chart"}),`
`,t(r.hr,{}),`
`,t("div",{className:"doc-story",children:t(d,{sourceState:"shown",of:h})}),`
`,t(r.p,{children:`A Line chart depicts data using points connected by lines, emphasizing trends and changes over a continuous set of values,
typically along an x-axis and a y-axis.`}),`
`,i(r.ul,{children:[`
`,t(r.li,{children:"Shows trends, changes, or relationships over time or continuous data points."}),`
`,t(r.li,{children:"Ideal for visualizing data sets with many data points and identifying patterns or trends."}),`
`,t(r.li,{children:"Offers a clear representation of fluctuating data or comparisons between multiple sets."}),`
`,t(r.li,{children:"Allows easy interpretation of data points and their relationships through the line's path."}),`
`]}),`
`,t(r.p,{children:"Types supported by reaviz:"}),`
`,i(r.ul,{children:[`
`,t(r.li,{children:"Single Series"}),`
`,t(r.li,{children:"Multi Series"}),`
`,t(r.li,{children:"Radial"}),`
`]}),`
`,t(r.h2,{id:"quick-start",children:"Quick Start"}),`
`,i(r.p,{children:["To create a line chart, use import the ",t(r.code,{children:"LineChart"})," and give it ",t(r.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,t(r.code,{children:"props"}),"."]}),`
`,t(r.pre,{children:t(r.code,{className:"language-jsx",children:`import { LineChart } from 'reaviz';

const MyChart = () => (
  <LineChart
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
`,t(r.h3,{id:"linechart",children:t(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/AreaChart/AreaChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"LineChart"})}),`
`,t(n,{of:m}),`
`,t(r.h3,{id:"lineseries",children:t(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/AreaChart/AreaSeries/AreaSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"LineSeries"})}),`
`,t(n,{of:s}),`
`,t(r.h2,{id:"demo",children:"Demo"}),`
`,t(r.pre,{children:t(r.code,{className:"language-js",children:`import React from 'react';
import { LineChart } from 'reaviz';

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
    <LineChart width={350} height={250} data={data} />
  </div>
);
`})})]})}function zt(e={}){const{wrapper:r}=Object.assign({},a(),e.components);return r?t(r,Object.assign({},e,{children:t(o,e)})):o(e)}export{zt as default};
