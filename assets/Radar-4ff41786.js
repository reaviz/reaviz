import{j as r,a as i,F as e}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import{R as m}from"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Filled as p}from"./RadarChart.story-32b5f896.js";import{u as n}from"./index-2ef8b458.js";import{M as d,C as h,A as s}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function a(o){const t=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",a:"a"},n(),o.components);return i(e,{children:[r(d,{title:"Docs/Chart Types/Radar"}),`
`,r(t.h1,{id:"radar",children:"Radar"}),`
`,r(t.hr,{}),`
`,r("br",{}),`
`,r("div",{className:"doc-story",children:r(h,{sourceState:"shown",of:p})}),`
`,r(t.p,{children:`A radar chart is a graphical method of displaying multivariate
data in the form of a two-dimensional chart of three or more quantitative
variables represented on axes starting from the same point. The relative
position and angle of the axes is typically uninformative.`}),`
`,r(t.h2,{id:"quick-start",children:"Quick Start"}),`
`,i(t.p,{children:["To create a radar, use import the ",r(t.code,{children:"RadarChart"})," and give it ",r(t.code,{children:"value"})," point."]}),`
`,r(t.pre,{children:r(t.code,{className:"language-jsx",children:`import { RadarChart } from 'reaviz';

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
  <RadarChart data={data} height={450} width={450} />
);
`})}),`
`,r(t.h2,{id:"api",children:"API"}),`
`,r(t.h3,{id:"radarchart",children:r(t.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/RadarChart/RadarChart.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadarChart"})}),`
`,r(s,{of:m})]})}function wr(o={}){const{wrapper:t}=Object.assign({},n(),o.components);return t?r(t,Object.assign({},o,{children:r(a,o)})):a(o)}export{wr as default};
