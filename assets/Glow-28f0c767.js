import{j as o,a as n,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import{BarGlow as a,ScatterGlow as s,BubbleGlow as l,AreaGlow as h,LineGlow as c}from"./Glow.story-4727a9f6.js";import{u as m}from"./index-2ef8b458.js";import{M as d,C as i}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./ScatterPlot-dcfbd829.js";import"./index-256d607f.js";import"./builder-50dc9f34.js";import"./chroma-699b8ba0.js";import"./RadialAxis-b01319ed.js";import"./range-163cdb4a.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./quantile-93c425ff.js";import"./schemes-b533a310.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./RadialValueMarker-1a9f2906.js";import"./time-988cb4fe.js";import"./functions-234b1417.js";import"./helper-ba8553c0.js";import"./index-9494de61.js";import"./utils-e5e5469a.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./Count-a38a1947.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./BarChart-2f79ae09.js";import"./expand-48c2fbf4.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./BubbleChart-70406dcc.js";import"./useHoverIntent-9f4f4ce5.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./AreaChart-0c6c7503.js";import"./interpolation-698f8194.js";import"./area-c6450060.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./LineChart-b482db38.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function e(r){const t=Object.assign({h1:"h1",hr:"hr",p:"p",code:"code",h2:"h2",pre:"pre"},m(),r.components);return n(p,{children:[o(d,{title:"Docs/Utils/Glow"}),`
`,o(t.h1,{id:"glow",children:"Glow"}),`
`,o(t.hr,{}),`
`,n(t.p,{children:[`Add a glow to various charts. This is passed as a prop at the level of the component rendered within the series.
For example, if you want to add a glow to a bar chart, you would add the glow prop to the `,o(t.code,{children:"Bar"})," component."]}),`
`,o(t.h2,{id:"usage",children:"Usage"}),`
`,o(i,{of:a}),`
`,o(i,{of:s}),`
`,o(i,{of:l}),`
`,o(i,{of:h}),`
`,o(i,{of:c}),`
`,o(t.h2,{id:"api",children:"API"}),`
`,o(t.pre,{children:o(t.code,{className:"language-ts",children:`interface Glow {
  /**
   * The color of the glow.
   */
  color?: string;

  /**
   * The x offset of the glow.
   */
  x?: number;

  /**
   * The y offset of the glow.
   */
  y?: number;

  /**
   * The blur radius of the glow.
   */
  blur?: number;
}
`})})]})}function co(r={}){const{wrapper:t}=Object.assign({},m(),r.components);return t?o(t,Object.assign({},r,{children:o(e,r)})):e(r)}export{co as default};
