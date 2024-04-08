import{j as e,a as i,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import{F as s,a as m,b as h,c as p,d as c,e as u}from"./index-6ed4b00b.js";import{Basic as d}from"./FunnelChart.story-21d8cbf7.js";import{u as a}from"./index-2ef8b458.js";import{M as f,C as F,A as t}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(r){const n=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),r.components);return i(l,{children:[e(f,{title:"Docs/Chart Types/Funnel Chart"}),`
`,e(n.h1,{id:"funnel-chart",children:"Funnel Chart"}),`
`,e(n.hr,{}),`
`,e("br",{}),`
`,e("div",{className:"doc-story",children:e(F,{of:d})}),`
`,e(n.p,{children:`A funnel chart is used to show streamlined data; each slice in the
funnel represents a process that has filtered out data. The last funnel
bears the value that is the final result of the entire procedure.`}),`
`,e(n.h2,{id:"quick-start",children:"Quick Start"}),`
`,i(n.p,{children:["To create a funnel chart, use import the ",e(n.code,{children:"FunnelChart"})," and give it some ",e(n.code,{children:"data"}),"."]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`import { FunnelChart } from 'reaviz';

const data = [
  {
    data: 1000,
    key: 'Visited Site'
  },
  {
    data: 900,
    key: 'Added to Cart'
  },
  {
    data: 600,
    key: 'Initiated Checkout'
  },
  {
    data: 400,
    key: 'Completed Purchase'
  }
];

const MyChart = () => (
  <FunnelChart data={data} height={450} width={450} />
);
`})}),`
`,e(n.h2,{id:"api",children:"API"}),`
`,e(n.h3,{id:"funnelchart",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/FunnelChart/FunnelChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"FunnelChart"})}),`
`,e(t,{of:s}),`
`,e(n.h3,{id:"funnelseries",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/FunnelChart/FunnelSeries/FunnelSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"FunnelSeries"})}),`
`,e(t,{of:m}),`
`,e(n.h3,{id:"funnelarc",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/FunnelChart/FunnelSeries/FunnelArc.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"FunnelArc"})}),`
`,e(t,{of:h}),`
`,e(n.h3,{id:"funnelaxis",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/FunnelChart/FunnelSeries/FunnelAxis/FunnelAxis.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"FunnelAxis"})}),`
`,e(t,{of:p}),`
`,e(n.h3,{id:"funnelaxislabel",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/FunnelChart/FunnelSeries/FunnelAxis/FunnelAxisLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"FunnelAxisLabel"})}),`
`,e(t,{of:c}),`
`,e(n.h3,{id:"funnelaxisline",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/FunnelChart/FunnelSeries/FunnelAxis/FunnelAxisLine.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"FunnelAxisLine"})}),`
`,e(t,{of:u})]})}function Le(r={}){const{wrapper:n}=Object.assign({},a(),r.components);return n?e(n,Object.assign({},r,{children:e(o,r)})):o(r)}export{Le as default};
