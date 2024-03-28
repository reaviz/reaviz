import{j as r,a as t,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import{S as l,a as h,B as m,A as s}from"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Line as c}from"./SparklineChart.story-3c3eb841.js";import{u as o}from"./index-2ef8b458.js";import{M as d,C as f,A as e}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function a(n){const i=Object.assign({h1:"h1",hr:"hr",p:"p",strong:"strong",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},o(),n.components);return t(p,{children:[r(d,{title:"Docs/Chart Types/Sparkline"}),`
`,r(i.h1,{id:"sparkline",children:"Sparkline"}),`
`,r(i.hr,{}),`
`,r("br",{}),`
`,r("div",{className:"doc-story",children:r(f,{sourceState:"shown",of:c})}),`
`,t(i.p,{children:[r(i.strong,{children:"Sparkline:"}),`
A Sparkline is a small, condensed, and simplified line chart, providing a snapshot of data trends within a compact space without axes or labels.`]}),`
`,t(i.ul,{children:[`
`,r(i.li,{children:"Offers a concise visualization of data trends or variations within a small area, often within text or tables."}),`
`,r(i.li,{children:"Designed for quick and immediate data trend comprehension without specific data points or labels."}),`
`,r(i.li,{children:"Ideal for presenting patterns, changes, or trends at a glance within limited space."}),`
`,r(i.li,{children:"Doesn't contain axes or labels, emphasizing the trend's visual representation in a minimalist format."}),`
`]}),`
`,r(i.p,{children:"Types supported in reaviz:"}),`
`,t(i.ul,{children:[`
`,r(i.li,{children:"Line"}),`
`,r(i.li,{children:"Area"}),`
`,r(i.li,{children:"Bar"}),`
`,r(i.li,{children:"Sonar"}),`
`]}),`
`,r(i.h2,{id:"quick-start",children:"Quick Start"}),`
`,t(i.p,{children:["To create a Sparkline, import the chart of your choice ",r(i.code,{children:"SparklineChart"}),", ",r(i.code,{children:"AreaSparklineChart"}),", ",r(i.code,{children:"BarSparklineChart"})," or ",r(i.code,{children:"SonarChart"}),` and
provide th data. The chart will automatically configure itself with the default options exposed via `,r(i.code,{children:"props"}),"."]}),`
`,r(i.pre,{children:r(i.code,{className:"language-jsx",children:`import { SparklineChart } from 'reaviz';

const MyChart = () => (
  <SparklineChart data={[
  {
    id: '50',
    key: new Date('2020-01-13T08:00:00.000Z'),
    data: 16
  },
  {
    id: '49',
    key: new Date('2020-01-14T08:00:00.000Z'),
    data: 44
  },
  {
    id: '48',
    key: new Date('2020-01-15T08:00:00.000Z'),
    data: 12
  },
  {
    id: '47',
    key: new Date('2020-01-16T08:00:00.000Z'),
    data: 26
  },
  {
    id: '46',
    key: new Date('2020-01-17T08:00:00.000Z'),
    data: 41
  }]}/>
);
`})}),`
`,r(i.h2,{id:"api",children:"API"}),`
`,r(i.h3,{id:"sparkline-chart",children:r(i.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/SparklineChart/SparklineChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Sparkline Chart"})}),`
`,r(e,{of:l}),`
`,r(i.h3,{id:"sonar-chart",children:r(i.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/SonarChart/SonarChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Sonar Chart"})}),`
`,r(e,{of:h}),`
`,r(i.h3,{id:"barsparkline-chart",children:r(i.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/BarSparklineChart/BarSparklineChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"BarSparkline Chart"})}),`
`,r(e,{of:m}),`
`,r(i.h3,{id:"areasparkline-chart",children:r(i.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/AreaSparklineChart/AreaSparklineChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"AreaSparkline Chart"})}),`
`,r(e,{of:s})]})}function Br(n={}){const{wrapper:i}=Object.assign({},o(),n.components);return i?r(i,Object.assign({},n,{children:r(a,n)})):a(n)}export{Br as default};
