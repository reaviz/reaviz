import{j as e,a as o,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import{D as p,a,b as d}from"./DiscreteLegendEntry-49610185.js";import{S as c}from"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as h}from"./DiscreteLegendVertical.story-c6472c66.js";import{Simple as g}from"./SequentialLegendHorizontal.story-8817b2af.js";import{u as m}from"./index-2ef8b458.js";import{M as u,C as n,A as i}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./heatmap-2bd15d7a.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function s(t){const r=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",h3:"h3",h4:"h4",a:"a"},m(),t.components);return o(l,{children:[e(u,{title:"Docs/Utils/Legends"}),`
`,e(r.h1,{id:"legends",children:"Legends"}),`
`,e(r.hr,{}),`
`,e(r.p,{children:"REAVIZ supports two different types of legends:"}),`
`,o(r.ul,{children:[`
`,e(r.li,{children:"Discrete"}),`
`,e(r.li,{children:"Sequential"}),`
`]}),`
`,e(r.p,{children:`Out of the box, none of the charts include legends because we want to
keep the library as modular as possible.`}),`
`,e(r.h2,{id:"discrete-legend",children:"Discrete Legend"}),`
`,e(r.p,{children:`The discrete legend is useful for categorical charts such as bar charts.
This legend supports supports both vertical and horizontal layout. Below is a simple example of a
discrete legend that has four different labels.`}),`
`,e(n,{sourceState:"shown",of:h}),`
`,e(r.h3,{id:"api",children:"API"}),`
`,e(r.h4,{id:"discretelegend",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/common/legends/DiscreteLegend/DiscreteLegend.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"DiscreteLegend"})}),`
`,e(i,{of:p}),`
`,e(r.h4,{id:"discretelegendentry",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/common/legends/DiscreteLegend/DiscreteLegendEntry.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"DiscreteLegendEntry"})}),`
`,e(i,{of:a}),`
`,e(r.h4,{id:"discretelegendsymbol",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/common/legends/DiscreteLegend/DiscreteLegendSymbol.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"DiscreteLegendSymbol"})}),`
`,e(i,{of:d}),`
`,e(r.h2,{id:"sequential-legend",children:"Sequential Legend"}),`
`,e(r.p,{children:`The sequential legend is useful for categorical charts such as heatmaps.
This legend supports supports both vertical and horizontal layout. Below is a simple
example of a sequential legend:`}),`
`,e(n,{sourceState:"shown",of:g}),`
`,e(r.h3,{id:"api-1",children:"API"}),`
`,e(r.h4,{id:"sequentiallegend",children:e(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/common/legends/SequentialLegend/SequentialLegend.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"SequentialLegend"})}),`
`,e(i,{of:c})]})}function Te(t={}){const{wrapper:r}=Object.assign({},m(),t.components);return r?e(r,Object.assign({},t,{children:e(s,t)})):s(t)}export{Te as default};
