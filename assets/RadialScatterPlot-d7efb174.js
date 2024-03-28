import{j as t,a as e,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import{R as l,a as c,b as m}from"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as d}from"./RadialScatterPlot.story-48d7a0b2.js";import{u as n}from"./index-2ef8b458.js";import{M as s,C as h,A as o}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function a(i){const r=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},n(),i.components);return e(p,{children:[t(s,{title:"Docs/Chart Types/Radial Scatter Plot"}),`
`,t(r.h1,{id:"radial-scatter-plot",children:"Radial Scatter Plot"}),`
`,t(r.hr,{}),`
`,t("br",{}),`
`,t("div",{className:"doc-story",children:t(h,{sourceState:"shown",of:d})}),`
`,t("br",{}),`
`,t(r.p,{children:`A Radial or Circular Scatter Plot is used for displaying the circular data, which involves the
wrapping of the usual scatter plot around a circle. Each point in the chart is centered at
the middle of the group period with the length of the bar proportional to the frequency in the group.`}),`
`,t(r.p,{children:"Types supported by reaviz:"}),`
`,e(r.ul,{children:[`
`,t(r.li,{children:"Scatter"}),`
`,t(r.li,{children:"Bubble"}),`
`]}),`
`,t(r.h2,{id:"quick-start",children:"Quick Start"}),`
`,e(r.p,{children:["To create a Radial Scatter Plot, use import the ",t(r.code,{children:"RadialScatterPlot"})," and give it ",t(r.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,t(r.code,{children:"props"}),"."]}),`
`,t(r.pre,{children:t(r.code,{className:"language-jsx",children:`import { RadialScatterPlot } from 'reaviz';

const MyChart = () => (
  <RadialScatterPlot
    height={300}
    width={300}
    data={[
      { key: new Date('11/29/2019'), data: 13 },
      { key: new Date('11/30/2019'), data: 13 },
      { key: new Date('12/1/2019'), data: 13 },
    ]}
  />
);
`})}),`
`,t(r.h2,{id:"api",children:"API"}),`
`,t(r.h3,{id:"radialscatterplot",children:t(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialScatterPlot/RadialScatterPlot.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialScatterPlot"})}),`
`,t(o,{of:l}),`
`,t(r.h3,{id:"radialscatterseries",children:t(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialScatterPlot/RadialScatterSeries/RadialScatterSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialScatterSeries"})}),`
`,t(o,{of:c}),`
`,t(r.h3,{id:"radialscatterpoint",children:t(r.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadialScatterPlot/RadialScatterSeries/RadialScatterPoint.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadialScatterPoint"})}),`
`,t(o,{of:m})]})}function Mt(i={}){const{wrapper:r}=Object.assign({},n(),i.components);return r?t(r,Object.assign({},i,{children:t(a,i)})):a(i)}export{Mt as default};
