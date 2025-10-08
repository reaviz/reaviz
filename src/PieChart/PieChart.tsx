import React, { FC, ReactElement, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { PieArcDatum } from 'd3-shape';
import { pie } from 'd3-shape';
import { CloneElement, useId } from 'reablocks';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '@/common/containers';
import { ChartShallowDataShape } from '@/common/data';
import { PieArcSeries, PieArcSeriesProps } from './PieArcSeries';

export type ArcData = PieArcDatum<ChartShallowDataShape>;

export interface PieChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data?: ChartShallowDataShape[];

  /**
   * Whether the chart is disabled.
   */
  disabled?: boolean;

  /**
   * Whether to display labels even if their value has a small display radius.
   */
  displayAllLabels?: boolean;

  /**
   * The series component that renders the arc components.
   */
  series?: ReactElement<PieArcSeriesProps, typeof PieArcSeries>;
}

export const PieChart: FC<PieChartProps> = ({
  id,
  width,
  height,
  className,
  containerClassName,
  displayAllLabels,
  data = [],
  margins = 10,
  series = <PieArcSeries />
}) => {
  const newId = useId(id);

  const internalData = useMemo(() => {
    const pieLayout = pie<void, ChartShallowDataShape>().value(
      (d: ChartShallowDataShape) => Number(d.data)
    );

    // Explode sort doesn't work right...
    if (!series.props.explode) {
      pieLayout.sort(null);
    }

    return pieLayout(data);
  }, [data, series]);

  const renderSeries = useCallback(
    ({ chartWidth, chartHeight }: ChartContainerChildProps) => {
      return (
        <CloneElement<PieArcSeriesProps>
          element={series}
          id={newId}
          data={internalData}
          height={chartHeight}
          width={chartWidth}
          displayAllLabels={displayAllLabels}
        />
      );
    },
    [displayAllLabels, internalData, newId, series]
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
      center={true}
      className={classNames(className)}
    >
      {renderSeries}
    </ChartContainer>
  );
};
