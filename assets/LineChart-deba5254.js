import{j as t,a as i,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import{L as m,a as s}from"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as h}from"./LineChartSingleSeries.story-b1e42699.js";import{u as a}from"./index-2ef8b458.js";import{M as l,C as d,A as n}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(e){const r=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),e.components);return i(p,{children:[t(l,{title:"Docs/Chart Types/Line Chart"}),`
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
