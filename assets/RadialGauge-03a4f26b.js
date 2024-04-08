import{j as a,a as t,F as n}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import{R as d,a as s,S as p,b as m,c,d as u,e as g,f as h}from"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Single as b}from"./RadialGauge.story-e7860ed4.js";import{u as l}from"./index-2ef8b458.js";import{M as f,C as R,A as r}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(i){const e=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},l(),i.components);return t(n,{children:[a(f,{title:"Docs/Chart Types/Radial Gauge"}),`
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
