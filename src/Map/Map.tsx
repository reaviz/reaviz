import React, { Fragment, ReactElement, FC, useCallback } from 'react';
import { geoMercator, geoPath, GeoProjection, GeoPath } from 'd3-geo';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers/ChartContainer';
import { CloneElement } from 'rdk';
import { MapMarkerProps, MapMarker } from './MapMarker';
import { motion } from 'framer-motion';

type MarkerElement = ReactElement<MapMarkerProps, typeof MapMarker>;

interface MapProps extends ChartProps {
  markers?: MarkerElement[];
  data: any;
  fill?: string;
}

export const Map: FC<MapProps> = ({
  id,
  width,
  height,
  margins,
  className,
  containerClassName,
  markers,
  data,
  fill
}) => {
  const getProjection = useCallback(
    ({ chartWidth, chartHeight }: ChartContainerChildProps) =>
      geoMercator().fitSize([chartWidth, chartHeight], data).center([0, 35]),
    [data]
  );

  const renderMarker = useCallback(
    (marker: MarkerElement, index: number, projection: GeoProjection) => {
      const position = projection(marker.props.coordinates);

      if (!position) {
        console.warn(
          `Position for ${marker.props.coordinates.toString()} not found.`
        );
        return null;
      }

      return (
        <CloneElement<MapMarkerProps>
          element={marker}
          cx={position[0]}
          cy={position[1]}
          index={index}
        />
      );
    },
    []
  );

  const renderCountry = useCallback(
    (point, index: number, path: GeoPath) => {
      // Exclude ATA
      if (point.id === '010') {
        return null;
      }

      return <path key={`path-${index}`} d={path(point)!} fill={fill} />;
    },
    [fill]
  );

  const renderChart = useCallback(
    (containerProps: ChartContainerChildProps) => {
      if (!data) {
        return null;
      }

      const projection = getProjection(containerProps);
      const path = geoPath().projection(projection);

      return (
        <motion.g
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
        >
          {data.features.map((point, index) =>
            renderCountry(point, index, path)
          )}
          {markers &&
            markers.map((marker, index) => (
              <Fragment key={`marker-${index}`}>
                {renderMarker(marker, index, projection)}
              </Fragment>
            ))}
        </motion.g>
      );
    },
    [data, getProjection, markers, renderCountry, renderMarker]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      containerClassName={containerClassName}
      xAxisVisible={false}
      yAxisVisible={false}
      className={className}
    >
      {(props) => renderChart(props)}
    </ChartContainer>
  );
};

Map.defaultProps = {
  fill: 'rgba(255, 255, 255, 0.3)'
};
