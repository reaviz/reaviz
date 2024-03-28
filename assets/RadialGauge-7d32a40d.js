import{j as a,a as t,F as n}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import{R as d,a as s,S as p,b as m,c,d as u,e as g,f as h}from"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Single as b}from"./RadialGauge.story-4ed1c3e8.js";import{u as l}from"./index-2ef8b458.js";import{M as f,C as R,A as r}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(i){const e=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},l(),i.components);return t(n,{children:[a(f,{title:"Docs/Chart Types/Radial Gauge"}),`
`,a(e.h1,{id:"radial-gauge",children:"Radial Gauge"}),`
`,a(e.hr,{}),`
`,a("br",{}),`
`,a("div",{className:"doc-story",children:a(R,{sourceState:"shown",of:b})}),`
`,a("br",{}),`
`,a(e.p,{children:"Radial Gauge uses a radial scale to display a specific data point using a dial over a radial scale with defined limits."}),`
`,a(e.h2,{id:"quick-start",children:"Quick Start"}),`
`,t(e.p,{children:["To create a Radial Gauge, use import the ",a(e.code,{children:"RadialGauge"})," and give it ",a(e.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,a(e.code,{children:"props"}),"."]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`import { RadialGauge } from 'reaviz';

const MyChart = () => (
  <RadialGauge
    height={300}
    width={300}
    data={[{ key: 'Austin, TX', data: 24 }]}
  />
);
`})}),`
`,a(e.p,{children:`In this example, we only pass one data object, however, we can pass multiples and it will
distribute the values across them.`}),`
`,a(e.h2,{id:"api",children:"API"}),`
`,a(e.h3,{id:"radialgauge",children:a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialGauge/RadialGauge.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialGauge"})}),`
`,a(r,{of:d}),`
`,a(e.h3,{id:"radialgaugeseries",children:a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialGauge/RadialGaugeSeries/RadialGaugeSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialGaugeSeries"})}),`
`,a(r,{of:s}),`
`,a(e.h3,{id:"stackedradialgaugeseries",children:a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialGauge/StackedRadialGaugeSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"StackedRadialGaugeSeries"})}),`
`,a(r,{of:p}),`
`,a(e.h3,{id:"radialgaugearc",children:a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialGauge/RadialGaugeSeries/RadialGaugeArc.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialGaugeArc"})}),`
`,a(r,{of:m}),`
`,a(e.h3,{id:"radialgaugelabel",children:a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialGauge/RadialGaugeSeries/RadialGaugeLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialGaugeLabel"})}),`
`,a(r,{of:c}),`
`,a(e.h3,{id:"stackedradialgaugevaluelabel",children:a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialGauge/RadialGaugeSeries/StackedRadialGaugeValueLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"StackedRadialGaugeValueLabel"})}),`
`,a(r,{of:u}),`
`,a(e.h3,{id:"stackedradialgaugedescriptionlabel",children:a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialGauge/RadialGaugeSeries/StackedRadialGaugeDescriptionLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"StackedRadialGaugeDescriptionLabel"})}),`
`,a(r,{of:g}),`
`,a(e.h3,{id:"radialgaugevaluelabel",children:a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialGauge/RadialGaugeSeries/RadialGaugeValueLabel.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialGaugeValueLabel"})}),`
`,a(r,{of:h})]})}function Ta(i={}){const{wrapper:e}=Object.assign({},l(),i.components);return e?a(e,Object.assign({},i,{children:a(o,i)})):o(i)}export{Ta as default};
