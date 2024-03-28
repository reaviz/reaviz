import{j as e,a as t,F as d}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import{S as s,a as l,b as p}from"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as c}from"./Sankey.story-c2b0c817.js";import{u as a}from"./index-2ef8b458.js";import{M as m,C as h,A as o}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function i(r){const n=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",pre:"pre",code:"code",h3:"h3",a:"a"},a(),r.components);return t(d,{children:[e(m,{title:"Docs/Chart Types/Sankey Plot"}),`
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
