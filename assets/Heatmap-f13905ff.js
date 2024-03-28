import{j as n,a as r,F as m}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import{H as p,a as d,b as l}from"./Heatmap-c98eb405.js";import{C as s}from"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Basic as c}from"./Heatmap.story-5335ad19.js";import{u as o}from"./index-2ef8b458.js";import{M as h,C as y,A as t}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./heatmap-2bd15d7a.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function i(e){const a=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},o(),e.components);return r(m,{children:[n(h,{title:"Docs/Chart Types/Heatmap"}),`
`,n(a.h1,{id:"heatmap",children:"Heatmap"}),`
`,n(a.hr,{}),`
`,n("br",{}),`
`,n("div",{className:"doc-story",children:n(y,{sourceState:"shown",of:c})}),`
`,n("br",{}),`
`,n(a.p,{children:`A heat map is a data visualization type where the individual values
contained in a matrix through variations in coloring. The term “Heat map” was
originally introduced by software designer Cormac Kinney in 1991 to describe a 2D
display depicting real time financial market information even though similar
visualizations have existed for over a century.`}),`
`,n(a.p,{children:`Heat maps are useful for visualizing variance across multiple
variables to display patterns in correlations.`}),`
`,n(a.p,{children:"Types supported by reaviz:"}),`
`,r(a.ul,{children:[`
`,n(a.li,{children:"Heatmap"}),`
`,n(a.li,{children:"Calendar Heatmap"}),`
`]}),`
`,n(a.h2,{id:"quick-start",children:"Quick Start"}),`
`,r(a.p,{children:["To create a Heatmap, use import the ",n(a.code,{children:"Heatmap"})," and give it ",n(a.code,{children:"data"}),`. The chart
will automatically configure itself with the default options exposed via `,n(a.code,{children:"props"}),"."]}),`
`,n(a.pre,{children:n(a.code,{className:"language-jsx",children:`import { Heatmap } from 'reaviz';

const data = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML',
        data: 0
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 150
      }
    ]
  },
  {
    key: 'Discovery',
    data: [
      {
        key: 'XML',
        data: 100
      },
      {
        key: 'JSON',
        data: 34
      },
      {
        key: 'HTTPS',
        data: 0
      }
    ]
  }
];

const MyChart = () => (
  <Heatmap
    height={350}
    width={350}
    data={data}
  />
);
`})}),`
`,n(a.h2,{id:"api",children:"API"}),`
`,n(a.h3,{id:"heatmap-1",children:n(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Heatmap/Heatmap.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Heatmap"})}),`
`,n(t,{of:p}),`
`,n(a.h3,{id:"calendarheatmap",children:n(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Heatmap/CalendarHeatmap.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"CalendarHeatmap"})}),`
`,n(t,{of:s}),`
`,n(a.h3,{id:"heatmapseries",children:n(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Heatmap/HeatmapSeries/HeatmapSeries.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"HeatmapSeries"})}),`
`,n(t,{of:d}),`
`,n(a.h3,{id:"heatmapcell",children:n(a.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Heatmap/HeatmapSeries/HeatmapCell.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"HeatmapCell"})}),`
`,n(t,{of:l}),`
`,n(a.h2,{id:"demo",children:"Demo"}),`
`,n(a.pre,{children:n(a.code,{className:"language-jsx",children:`import React from 'react';
import { Heatmap } from 'reaviz';

const data = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML',
        data: 0
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 150
      },
      {
        key: 'SSH',
        data: 112
      }
    ]
  },
  {
    key: 'Discovery',
    data: [
      {
        key: 'XML',
        data: 100
      },
      {
        key: 'JSON',
        data: 34
      },
      {
        key: 'HTTPS',
        data: 0
      },
      {
        key: 'SSH',
        data: 111
      }
    ]
  },
  {
    key: 'Exploitation',
    data: [
      {
        key: 'XML',
        data: 70
      },
      {
        key: 'JSON',
        data: 1
      },
      {
        key: 'HTTPS',
        data: 110
      },
      {
        key: 'SSH',
        data: 115
      }
    ]
  },
  {
    key: 'Threat Intelligence',
    data: [
      {
        key: 'XML',
        data: 1
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 200
      },
      {
        key: 'SSH',
        data: 160
      }
    ]
  },
  {
    key: 'Breach',
    data: [
      {
        key: 'XML',
        data: 5
      },
      {
        key: 'JSON',
        data: 10
      },
      {
        key: 'HTTPS',
        data: 152
      },
      {
        key: 'SSH',
        data: 20
      }
    ]
  }
];

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <Heatmap
      height={250}
      width={400}
      data={data}
    />
  </div>
);
`})})]})}function Xn(e={}){const{wrapper:a}=Object.assign({},o(),e.components);return a?n(a,Object.assign({},e,{children:n(i,e)})):i(e)}export{Xn as default};
