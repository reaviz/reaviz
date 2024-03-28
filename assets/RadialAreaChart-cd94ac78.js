import{j as r,a as t,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import{R as p,a as m,b as s,c as d,d as h}from"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as c}from"./RadialAreaChart.story-ffb390cc.js";import{u as n}from"./index-2ef8b458.js";import{M as f,C as R,A as i}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(e){const a=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},n(),e.components);return t(l,{children:[r(f,{title:"Docs/Chart Types/Radial Area Chart"}),`
`,r(a.h1,{id:"radial-area-chart",children:"Radial Area Chart"}),`
`,r(a.hr,{}),`
`,r("br",{}),`
`,r("div",{className:"doc-story",children:r(R,{sourceState:"shown",of:c})}),`
`,r("br",{}),`
`,r(a.p,{children:`Radial Area Chart is a variation of Area Chart. An area chart displays graphically quantitive data.
It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.
Whereas area charts are used to represent cumulated totals using numbers or percentages over time, Radial Area Chart can
be also used to display categories instead.`}),`
`,r(a.h2,{id:"quick-start",children:"Quick Start"}),`
`,t(a.p,{children:["To create a Radial Area chart, use import the ",r(a.code,{children:"RadialAreaChart"})," and give it ",r(a.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,r(a.code,{children:"props"}),"."]}),`
`,r(a.pre,{children:r(a.code,{className:"language-jsx",children:`import { RadialAreaChart } from 'reaviz';

const MyChart = () => (
  <RadialAreaChart
    height={300}
    width={300}
    data={[
      { key: new Date('11/29/2019'), data: 3 },
      { key: new Date('11/30/2019'), data: 11 },
      { key: new Date('12/1/2019'), data: 6 }
    ]}
  />
);
`})}),`
`,r(a.h2,{id:"api",children:"API"}),`
`,r(a.h3,{id:"radialareachart",children:r(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialAreaChart/RadialAreaChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialAreaChart"})}),`
`,r(i,{of:p}),`
`,r(a.h3,{id:"radialareaseries",children:r(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialAreaChart/RadialAreaSeries/RadialAreaSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialAreaSeries"})}),`
`,r(i,{of:m}),`
`,r(a.h3,{id:"radialarea",children:r(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialAreaChart/RadialAreaSeries/RadialArea.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialArea"})}),`
`,r(i,{of:s}),`
`,r(a.h3,{id:"radialline",children:r(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialAreaChart/RadialAreaSeries/RadialLine.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialLine"})}),`
`,r(i,{of:d}),`
`,r(a.h3,{id:"radialpointseries",children:r(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialAreaChart/RadialAreaSeries/RadialPointSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialPointSeries"})}),`
`,r(i,{of:h})]})}function Tr(e={}){const{wrapper:a}=Object.assign({},n(),e.components);return a?r(a,Object.assign({},e,{children:r(o,e)})):o(e)}export{Tr as default};
