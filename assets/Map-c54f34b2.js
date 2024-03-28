import{j as r,a as e,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./schemes-b533a310.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-0c6c7503.js";import"./StackedNormalizedAreaChart-7727a546.js";import"./BarChart-2f79ae09.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";import"./LineChart-b482db38.js";import{M as m,a as s}from"./MapMarker-503554fe.js";import"./PieChart-233b2bf1.js";import"./SankeyNode-5de0b257.js";import"./ScatterPlot-dcfbd829.js";import"./SonarChart-30708a25.js";import"./RadialAreaChart-4823c4b2.js";import"./RadialBarChart-1c2196c1.js";import"./RadialGauge-17b1f340.js";import"./RadialScatterSeries-0be8ccc6.js";import"./Heatmap-c98eb405.js";import"./CalendarHeatmap-51d9f548.js";import"./LinearGauge-413f71f1.js";import"./VennDiagram-5ece578a.js";import"./BubbleChart-70406dcc.js";import"./TreeMap-fee27725.js";import"./BarList-1db9d8a7.js";import"./Meter-41a90fdb.js";import"./RadarChart-1f81b33d.js";import"./index-49dce664.js";import{Simple as c}from"./Map.story-aa5f866a.js";import{u as a}from"./index-2ef8b458.js";import{M as l,C as d,A as i}from"./index-1df4c13d.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-988cb4fe.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-698f8194.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./area-c6450060.js";import"./helper-ba8553c0.js";import"./quantile-93c425ff.js";import"./index-9494de61.js";import"./builder-50dc9f34.js";import"./expand-48c2fbf4.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-3b4ba920.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./iframe-ba12b0e8.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function n(t){const o=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",ul:"ul",li:"li",code:"code",pre:"pre",h3:"h3",a:"a"},a(),t.components);return e(p,{children:[r(l,{title:"Docs/Chart Types/Map"}),`
`,r(o.h1,{id:"map",children:"Map"}),`
`,r(o.hr,{}),`
`,r("br",{}),`
`,r("div",{className:"doc-story",children:r(d,{sourceState:"shown",of:c})}),`
`,r(o.p,{children:`A Choropleth Map is a thematic map in which areas are shaded or patterned in proportion to
the measurement of the statistical variable being displayed on the map, such as population
density or per-capita income. The choropleth map provides an easy way to visualize how a measurement
varies across a geographic area or it shows the level of variability within a region.`}),`
`,r(o.h2,{id:"quick-start",children:"Quick Start"}),`
`,r(o.p,{children:"To get started with the map chart, you need to add some extra depedencies to your application:"}),`
`,e(o.ul,{children:[`
`,r(o.li,{children:r(o.code,{children:"topojson-client"})}),`
`,r(o.li,{children:r(o.code,{children:"world-atlas"})}),`
`]}),`
`,r(o.p,{children:`Making these extra make it the bundle smaller and gives you more control of what data
you import into your chart.`}),`
`,r(o.pre,{children:r(o.code,{className:"language-jsx",children:`import { Map, MapMarker } from 'reaviz';
import { feature } from 'topojson-client';
import geojson from 'world-atlas/countries-110m.json';

const worldData = feature(geojson, geojson.objects.countries);

const MyChart = () => (
  <Map
    data={worldData}
    height={350}
    width={500}
    markers={[
      <MapMarker coordinates={[-122.490402, 37.786453]} />,
      <MapMarker coordinates={[-58.3816, -34.6037]} />,
      <MapMarker coordinates={[-97.7437, 30.2711]} tooltip="Austin, TX" />
    ]}
  />
);
`})}),`
`,e(o.p,{children:["In the above example, we can pass an array of ",r(o.code,{children:"MapMarkers"}),` which
contain longitude and latitude coordinates for the location. Optionally,
a tooltip can be defined on hover.`]}),`
`,r(o.h2,{id:"api",children:"API"}),`
`,r(o.h3,{id:"map-1",children:r(o.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Map/Map.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Map"})}),`
`,r(i,{of:m}),`
`,r(o.h3,{id:"mapmarker",children:r(o.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/Map/MapMarker.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"MapMarker"})}),`
`,r(i,{of:s}),`
`,r(o.h2,{id:"demo",children:"Demo"}),`
`,r(o.pre,{children:r(o.code,{className:"language-jsx",children:`import React from 'react';
import { Map, MapMarker } from 'reaviz';
import { feature } from 'topojson-client';
import geojson from 'world-atlas/countries-110m.json';

const worldData = feature(geojson, geojson.objects.countries);

export default () => (
  <div style={{ margin: '55px', textAlign: 'center' }}>
    <Map
      data={worldData}
      height={350}
      width={500}
      markers={[
        <MapMarker coordinates={[-122.490402, 37.786453]} />,
        <MapMarker coordinates={[-58.3816, -34.6037]} />,
        <MapMarker coordinates={[-97.7437, 30.2711]} tooltip="Austin, TX" />
      ]}
    />
  </div>
);
`})})]})}function Cr(t={}){const{wrapper:o}=Object.assign({},a(),t.components);return o?r(o,Object.assign({},t,{children:r(n,t)})):n(t)}export{Cr as default};
