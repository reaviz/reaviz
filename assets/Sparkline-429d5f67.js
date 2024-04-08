import{j as r,a as t,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import{S as l,a as h,B as m,A as s}from"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Line as c}from"./SparklineChart.story-fc5d03ea.js";import{u as o}from"./index-2ef8b458.js";import{M as d,C as f,A as e}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function a(n){const i=Object.assign({h1:"h1",hr:"hr",p:"p",strong:"strong",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},o(),n.components);return t(p,{children:[r(d,{title:"Docs/Chart Types/Sparkline"}),`
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
