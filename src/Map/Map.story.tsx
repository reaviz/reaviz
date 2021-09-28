import React from 'react';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { feature } from 'topojson-client';
import geojson from 'world-atlas/countries-110m.json';

// Using 'countries' is less performant than 'land' but we want to be able
// to filter and disect on specific shapes
const worldData = feature(geojson as any, geojson.objects.countries as any);

export default {
  title: 'Charts/Map',
  component: Map as any,
  subcomponents: {
    MapMarker
  }
};

export const Simple = () => <Map data={worldData} height={350} width={500} />;

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <Map data={worldData} />
  </div>
);

export const Markers = () => (
  <Map
    data={worldData}
    height={350}
    width={500}
    markers={[
      <MapMarker coordinates={[-122.490402, 37.786453]} tooltip="Somewhere" />,
      <MapMarker coordinates={[-58.3816, -34.6037]} tooltip="Somewhere Else" />,
      <MapMarker coordinates={[-97.7437, 30.2711]} tooltip="Austin, TX" />
    ]}
  />
);
