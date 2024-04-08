import{j as r,a as e,F as p}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import{M as m,a as s}from"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{Simple as c}from"./Map.story-4a9c5dbc.js";import{u as a}from"./index-2ef8b458.js";import{M as l,C as d,A as i}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function n(t){const o=Object.assign({h1:"h1",hr:"hr",p:"p",h2:"h2",ul:"ul",li:"li",code:"code",pre:"pre",h3:"h3",a:"a"},a(),t.components);return e(p,{children:[r(l,{title:"Docs/Chart Types/Map"}),`
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
