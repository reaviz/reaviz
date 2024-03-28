import{j as r,a as i,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import{B as h,a as s,b as p,R as c,c as m}from"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as d}from"./BarChartVertical.story-5139bc4b.js";import{u as o}from"./index-2ef8b458.js";import{M as g,C as f,A as a}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function n(t){const e=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},o(),t.components);return i(l,{children:[r(g,{title:"Docs/Chart Types/Bar Chart"}),`
`,r(e.h1,{id:"bar-chart",children:"Bar Chart"}),`
`,r(e.hr,{}),`
`,r("br",{}),`
`,r("div",{className:"doc-story",children:r(f,{sourceState:"shown",of:d})}),`
`,r("br",{}),`
`,r(e.p,{children:`A bar chart is a chart with rectangular bars with lengths proportional to the
values that they represent. One axis of the chart shows the specific categories being compared,
and the other axis represents a discrete value.`}),`
`,r(e.p,{children:`Bar charts provide a visual presentation of categorical data.
Categorical data is a grouping of data into discrete groups, such as months of the year,
age group, shoe sizes, and animals. These categories are usually qualitative.
Bars on the chart may be arranged in any order. Bar charts are useful for comparisons and trend over time.`}),`
`,r(e.p,{children:"Types supported by reaviz:"}),`
`,i(e.ul,{children:[`
`,r(e.li,{children:"Single Series Vertical / Horizontal"}),`
`,r(e.li,{children:"Multi Series Vertical / Horizontal"}),`
`,r(e.li,{children:"Stacked Vertical / Horizontal"}),`
`,r(e.li,{children:"Stacked Normalized Vertical / Horizontal"}),`
`,r(e.li,{children:"Stacked Diverging Vertical / Horizontal"}),`
`,r(e.li,{children:"Marimekko"}),`
`,r(e.li,{children:"Sparkline"}),`
`,r(e.li,{children:"Waterfall"}),`
`,r(e.li,{children:"Histograms"}),`
`]}),`
`,r(e.h2,{id:"quick-start",children:"Quick Start"}),`
`,i(e.p,{children:["To create a Bar chart, use import the ",r(e.code,{children:"BarChart"})," and give it ",r(e.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,r(e.code,{children:"props"}),"."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`import { BarChart } from 'reaviz';

const MyChart = () => (
  <BarChart
    height={300}
    width={300}
    data={[
      { key: 'DLP', data: 13 },
      { key: 'SIEM', data: 2 },
      { key: 'Endpoint', data: 7 }
    ]}
  />
);
`})}),`
`,r(e.h2,{id:"api",children:"API"}),`
`,r(e.h3,{id:"barchart",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BarChart/BarChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BarChart"})}),`
`,r(a,{of:h}),`
`,r(e.h3,{id:"barseries",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BarChart/BarSeries/BarSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BarSeries"})}),`
`,r(a,{of:s}),`
`,r(e.h3,{id:"bar",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BarChart/BarSeries/Bar.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Bar"})}),`
`,r(a,{of:p}),`
`,r(e.h3,{id:"rangelines",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BarChart/BarSeries/RangeLines.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RangeLines"})}),`
`,r(a,{of:c}),`
`,r(e.h3,{id:"barlabel",children:r(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BarChart/BarSeries/BarLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BarLabel"})}),`
`,r(a,{of:m}),`
`,r(e.h2,{id:"demo",children:"Demo"}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`import React from 'react';
import { BarChart } from 'reaviz';

export const data = [
  {
    key: 'Phishing Attack',
    data: 10
  },
  {
    key: 'IDS',
    data: 14
  },
  {
    key: 'Malware',
    data: 5
  },
  {
    key: 'DLP',
    data: 18
  }
];

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <BarChart width={350} height={250} data={data} />
  </div>
);
`})})]})}function Ar(t={}){const{wrapper:e}=Object.assign({},o(),t.components);return e?r(e,Object.assign({},t,{children:r(n,t)})):n(t)}export{Ar as default};
