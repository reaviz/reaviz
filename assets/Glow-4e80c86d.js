import{j as o,a as i,F as m}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import{BarGlow as a,ScatterGlow as s,BubbleGlow as l,AreaGlow as h,LineGlow as c}from"./Glow.story-4b2809e2.js";import{u as p}from"./index-2ef8b458.js";import{M as d,C as n}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./ScatterPlot-34d242f9.js";import"./index-256d607f.js";import"./builder-9833ba7e.js";import"./chroma-699b8ba0.js";import"./RadialAxis-6c2bc59c.js";import"./range-163cdb4a.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./quantile-a1f83f78.js";import"./schemes-56affe43.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./RadialValueMarker-7b3f8322.js";import"./time-a9784969.js";import"./functions-234b1417.js";import"./helper-26bacd48.js";import"./index-9494de61.js";import"./utils-83ce1bd4.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./Count-a38a1947.js";import"./moment-a9aaa855.js";import"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import"./BarChart-9c825fb0.js";import"./expand-7b65a05b.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./BubbleChart-9604dd9a.js";import"./useHoverIntent-9f4f4ce5.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./AreaChart-a3475e62.js";import"./interpolation-4baac368.js";import"./area-a8b9ef93.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./LineChart-ad7cee98.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function e(r){const t=Object.assign({h1:"h1",hr:"hr",p:"p",code:"code",h2:"h2",pre:"pre"},p(),r.components);return i(m,{children:[o(d,{title:"Docs/Utils/Glow"}),`
`,o(t.h1,{id:"glow",children:"Glow"}),`
`,o(t.hr,{}),`
`,i(t.p,{children:[`Add a glow to various charts. This is passed as a prop at the level of the component rendered within the series.
For example, if you want to add a glow to a bar chart, you would add the glow prop to the `,o(t.code,{children:"Bar"})," component."]}),`
`,o(t.h2,{id:"usage",children:"Usage"}),`
`,o(n,{of:a}),`
`,o(n,{of:s}),`
`,o(n,{of:l}),`
`,o(n,{of:h}),`
`,o(n,{of:c}),`
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

  /**
   * The opacity of the glow.
   */
  opacity?: number;
}
`})})]})}function co(r={}){const{wrapper:t}=Object.assign({},p(),r.components);return t?o(t,Object.assign({},r,{children:o(e,r)})):e(r)}export{co as default};
