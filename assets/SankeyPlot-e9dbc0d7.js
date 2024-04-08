import{j as e,a as t,F as d}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import{S as s,a as l,b as p}from"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as c}from"./Sankey.story-dd628d9c.js";import{u as a}from"./index-2ef8b458.js";import{M as m,C as h,A as o}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function i(r){const n=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",pre:"pre",code:"code",h3:"h3",a:"a"},a(),r.components);return t(d,{children:[e(m,{title:"Docs/Chart Types/Sankey Plot"}),`
`,e(n.h1,{id:"sankey-chart",children:"Sankey Chart"}),`
`,e(n.hr,{}),`
`,e("br",{}),`
`,e("div",{className:"doc-story",children:e(h,{sourceState:"shown",of:c})}),`
`,e("br",{}),`
`,e(n.p,{children:`Sankey diagrams are a specific type of flow diagram, in which the width of the
arrows is shown proportionally to the flow quantity. They are typically used to
visualize energy or material or cost transfers between processes. They can also visualize
the energy accounts or material flow accounts on a community level. Sankey diagrams put a
visual emphasis on the major transfers or flows within a system. They are helpful in
locating dominant contributions to an overall flow.`}),`
`,e(n.h2,{id:"quick-start",children:"Quick Start"}),`
`,e(n.p,{children:`To create Sankey Chart, import the Sankey, SankeyNode and SankeyLink and then define the nodes and then links.
The chart will automatically configure itself with the default options exposed via props.`}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`import { Sankey, SankeyNode, SankeyLink } from 'reaviz';

const MyChart = () => (
  <Sankey
    height={300}
    width={500}
    nodes={[
      <SankeyNode title="A1" id="1" />,
      <SankeyNode title="A2" id="2" />,
      <SankeyNode title="B1" id="3" />,
      <SankeyNode title="B2" id="4" />
    ]}
    links={[
      <SankeyLink source="1" target="3" value="8" gradient={false} />,
      <SankeyLink source="2" target="4" value="4" gradient={false} />,
      <SankeyLink source="1" target="4" value="2" gradient={false} />
    ]}
  />
);
`})}),`
`,t(n.p,{children:[`As default, the Sankey chart shows the link/flow with gradation based on
the given colorScheme. You can turn off the gradation by passing `,e(n.code,{children:"false"}),`
to SankeyLink component's `,e(n.code,{children:"gradient"})," property (e.g. ",e(n.code,{children:"gradient={false}"}),")."]}),`
`,t(n.p,{children:["To render, the ",e(n.code,{children:"nodes"})," and ",e(n.code,{children:"links"}),` of the Sankey
component are required and `,e(n.code,{children:"colorScheme"}),` is optianal but is recommended to spacify
to make Sankeys easier to interpret.`]}),`
`,t(n.p,{children:["For the ",e(n.code,{children:"nodes"}),", you can pass the node's name through ",e(n.code,{children:"title"})," property of SankeyNode."]}),`
`,t(n.p,{children:["For the edges, SankeyLink's ",e(n.code,{children:"source"}),", ",e(n.code,{children:"target"}),", and ",e(n.code,{children:"value"}),`
properties are all required. For `,e(n.code,{children:"source"})," and ",e(n.code,{children:"target"}),`, you can use
the index of the nodes' array or the node's `,e(n.code,{children:"id"})," if it's assigned."]}),`
`,e(n.h2,{id:"api",children:"API"}),`
`,e(n.h3,{id:"sankey",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Sankey/Sankey.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Sankey"})}),`
`,e(o,{of:s}),`
`,e(n.h3,{id:"sankeylink",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Sankey/SankeyLink/SankeyLink.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"SankeyLink"})}),`
`,e(o,{of:l}),`
`,e(n.h3,{id:"sankeynode",children:e(n.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Sankey/SankeyNode/SankeyNode.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"SankeyNode"})}),`
`,e(o,{of:p}),`
`,e(n.h2,{id:"demo",children:"Demo"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`import React from 'react';
import { Sankey, SankeyNode, SankeyLink } from 'reaviz';

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <Sankey
      height={300}
      width={500}
      nodes={[
        <SankeyNode title="A1" id="1" />,
        <SankeyNode title="A2" id="2" />,
        <SankeyNode title="B1" id="3" />,
        <SankeyNode title="B2" id="4" />
      ]}
      links={[
        <SankeyLink source="1" target="3" value="8" gradient={false} />,
        <SankeyLink source="2" target="4" value="4" gradient={false} />,
        <SankeyLink source="1" target="4" value="2" gradient={false} />
      ]}
    />
  </div>
);
`})})]})}function Ce(r={}){const{wrapper:n}=Object.assign({},a(),r.components);return n?e(n,Object.assign({},r,{children:e(i,r)})):i(r)}export{Ce as default};
