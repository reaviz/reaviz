import{j as e,a as o,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import{D as p,a,b as d}from"./DiscreteLegendEntry-48737638.js";import{S as c}from"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as h}from"./DiscreteLegendVertical.story-04c9a4b1.js";import{Simple as g}from"./SequentialLegendHorizontal.story-c9b7baa3.js";import{u as m}from"./index-2ef8b458.js";import{M as u,C as n,A as i}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./heatmap-2bd15d7a.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function s(t){const r=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",h3:"h3",h4:"h4",a:"a"},m(),t.components);return o(l,{children:[e(u,{title:"Docs/Utils/Legends"}),`
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
