import{j as e,a as i,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import{F as s,a as m,b as h,c as p,d as c,e as u}from"./index-49dce664.js";import{Basic as d}from"./FunnelChart.story-84abdde4.js";import{u as a}from"./index-2ef8b458.js";import{M as f,C as F,A as t}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(r){const n=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},a(),r.components);return i(l,{children:[e(f,{title:"Docs/Chart Types/Funnel Chart"}),`
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
