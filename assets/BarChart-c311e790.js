import{j as r,a as i,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import{B as h,a as s,b as p,R as c,c as m}from"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as d}from"./BarChartVertical.story-91d734d9.js";import{u as o}from"./index-2ef8b458.js";import{M as g,C as f,A as a}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function n(t){const e=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},o(),t.components);return i(l,{children:[r(g,{title:"Docs/Chart Types/Bar Chart"}),`
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
