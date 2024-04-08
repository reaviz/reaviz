import{j as a,a as t,F as h}from"./jsx-runtime-86dfebf6.js";import"./chunk-HLWAVYOI-b2f906ac.js";import{M as d,C as r}from"./index-68ff4ed5.js";import{Simple as s}from"./BarChartVertical.story-91d734d9.js";import{Simple as l}from"./BarChartVerticalMultiSeries.story-5e895721.js";import{u as o}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./react-18-5df836b6.js";import"./index-6fd5a17b.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./BarChart-9c825fb0.js";import"./index-256d607f.js";import"./RadialValueMarker-7b3f8322.js";import"./range-163cdb4a.js";import"./RadialAxis-6c2bc59c.js";import"./rdk-0beed5d4.js";import"./frame-a8f3761f.js";import"./schemes-56affe43.js";import"./index-f6b105ee.js";import"./chroma-699b8ba0.js";import"./SVGVisualElement-f20753d9.js";import"./time-a9784969.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./Count-a38a1947.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./binned-b046df83.js";function i(n){const e=Object.assign({h1:"h1",p:"p",code:"code",ul:"ul",li:"li",pre:"pre",a:"a",h2:"h2"},o(),n.components);return t(h,{children:[a(d,{title:"Docs/Getting Started/Data Shapes"}),`
`,a(e.h1,{id:"data-shapes",children:"Data Shapes"}),`
`,t(e.p,{children:["The majority of the chart's in REAVIZ have a ",a(e.code,{children:"data"}),` property that they
use to render off of. This data shape comes is a generic `,a(e.code,{children:"ChartDataShape"}),` that
implements two different formats depending on the chart.`]}),`
`,t(e.ul,{children:[`
`,t(e.li,{children:[a(e.code,{children:"ChartShallowDataShape"}),": Single-series charts like a simple Bar Chart or Area Chart."]}),`
`,t(e.li,{children:[a(e.code,{children:"ChartNestedDataShape"}),": Multi-series charts like Stacked Area, Grouped Bar Charts, etc."]}),`
`]}),`
`,t(e.p,{children:["Each of the data types define a ",a(e.code,{children:"key"})," and ",a(e.code,{children:"data"}),` property. Depending on the type
the `,a(e.code,{children:"data"}),` property might be a raw data type or a nested shape. This raw Data
type is called `,a(e.code,{children:"ChartDataTypes"}),":"]}),`
`,a(e.pre,{children:a(e.code,{className:"language-js",children:`type ChartDataTypes = number | string | Date | bigInt.BigInteger;
`})}),`
`,t(e.p,{children:["Reference: ",a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/common/data/types.ts",target:"_blank",rel:"nofollow noopener noreferrer",children:"src/common/data/types.ts"}),"."]}),`
`,a(e.h2,{id:"chartshallowdatashape",children:a(e.code,{children:"ChartShallowDataShape"})}),`
`,a(e.p,{children:"The shallow data shape is used for single-series charts."}),`
`,a(e.pre,{children:a(e.code,{className:"language-js",children:`interface ChartShallowDataShape {
  // The key for the data point. Typically this might be a x-axis value.
  key: ChartDataTypes;

  // The data to render. Typically this might be a y-axis value.
  data: ChartDataTypes;

  // Additional metadata to pass to be used for tooltips/etc
  metadata?: any;
}
`})}),`
`,t(e.p,{children:["If we were to implement this in a ",a(e.code,{children:"BarChart"})," it might look something like this:"]}),`
`,a(e.pre,{children:a(e.code,{className:"language-js",children:`const data = [
  { key: 'DLP', data: 13 },
  { key: 'SIEM', data: 2 },
  { key: 'Endpoint', data: 7 }
]
`})}),`
`,a("br",{}),`
`,a(r,{of:s}),`
`,a("br",{}),`
`,a(e.h2,{id:"chartnesteddatashape",children:a(e.code,{children:"ChartNestedDataShape"})}),`
`,t(e.p,{children:["The shallow data shape is used for multi-series charts. Unlike the ",a(e.code,{children:"ChartShallowDataShape"}),`
the `,a(e.code,{children:"data"})," attribute on the type is a nested ",a(e.code,{children:"ChartShallowDataShape<ChartDataTypes>[]"}),"."]}),`
`,a(e.pre,{children:a(e.code,{className:"language-js",children:`export interface ChartNestedDataShape {
  // The key for the data point. Typically used as the x-axis value.
  key: ChartDataTypes;

  // A series of data to render. Typically used as the x+y axis values.
  data: ChartShallowDataShape<ChartDataTypes>[];

  // Additional metadata to pass to be used for tooltips/etc
  metadata?: any;
}
`})}),`
`,t(e.p,{children:["If we were to implement this in a ",a(e.code,{children:"BarChart"})," it might look something like:"]}),`
`,a(e.pre,{children:a(e.code,{className:"language-js",children:`const data = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML',
        data: 100
      },
      {
        key: 'JSON',
        data: 120
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
        data: 120
      }
    ]
  }
]
`})}),`
`,t(e.p,{children:["In this example, our x-axis would show ",a(e.code,{children:"Lateral Movement"})," and ",a(e.code,{children:"Discovery"}),` and then
a group of bar would contain `,a(e.code,{children:"XML"})," and ",a(e.code,{children:"JSON"})," with their respective values."]}),`
`,a("br",{}),`
`,a(r,{of:l}),`
`,a("br",{})]})}function ee(n={}){const{wrapper:e}=Object.assign({},o(),n.components);return e?a(e,Object.assign({},n,{children:a(i,n)})):i(n)}export{ee as default};
