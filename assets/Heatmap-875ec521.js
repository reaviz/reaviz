import{j as n,a as r,F as m}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import{H as p,a as d,b as l}from"./Heatmap-e27b243d.js";import{C as s}from"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Basic as c}from"./Heatmap.story-e707eab7.js";import{u as o}from"./index-2ef8b458.js";import{M as h,C as y,A as t}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./heatmap-2bd15d7a.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function i(e){const a=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},o(),e.components);return r(m,{children:[n(h,{title:"Docs/Chart Types/Heatmap"}),`
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
