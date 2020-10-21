import React, { FC, Fragment, ReactElement, useCallback, useState } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { ColorSchemeType, getColor } from '../common/color';
import { VennArc, VennArcProps } from './VennArc';
import { VennLabel, VennLabelProps } from './VennLabel';
import { motion } from 'framer-motion';
import { CloneElement } from '../common/utils';
import chroma from 'chroma-js';
import { VennOuterLabel, VennOuterLabelProps } from './VennOuterLabel';

export interface VennSeriesProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by venn.js
   */
  data: IVennLayout<any>[];

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Whether the chart is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Label element.
   */
  label?: ReactElement<VennLabelProps, typeof VennLabel> | null;

  /**
   * Label element.
   */
  outerLabel?: ReactElement<VennOuterLabelProps, typeof VennOuterLabel> | null;

  /**
   * Arc element.
   */
  arc?: ReactElement<VennArcProps, typeof VennArc> | null;
}

export const VennSeries: FC<Partial<VennSeriesProps>> = ({
  data,
  id,
  animated = true,
  disabled = false,
  colorScheme = 'cybertron',
  outerLabel = <VennOuterLabel />,
  arc = <VennArc />,
  label = <VennLabel />
}) => {
  const transition = animated ? {} : { type: false, delay: 0 };
  const [actives, setActives] = useState<string[]>([]);

  const onActivate = useCallback((point: string) => {
    setActives(
      data
        .filter(d => d.data?.key.indexOf(point) > -1)
        .map(d => d.data?.key)
    );
  }, [data]);

  const renderArc = useCallback(
    (d: IVennLayout<any>, index: number) => {
      const fill = getColor({
        data,
        colorScheme,
        point: d.data,
        index
      });

      const arcFill = arc.props.fill || fill;
      const active = actives.includes(d.data?.key) ||
        (actives.length > 0 ? null : false);

      const arcStroke = arc.props.stroke ||
        chroma(arcFill).darken(active ? 0.8 : 0.5).hex();

      return (
        <motion.g
          key={d.data?.key}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
        >
          <CloneElement<VennArcProps>
            element={arc}
            id={`arc-${id}-${index}`}
            data={d}
            fill={arcFill}
            stroke={arcStroke}
            disabled={disabled}
            animated={animated}
            active={active}
            onMouseEnter={() => onActivate(d.data?.key)}
            onMouseLeave={() => setActives([])}
          />
        </motion.g>
      );
    },
    [colorScheme, data, arc, animated, actives, onActivate]
  );

  const renderLabel = useCallback(
    (d: IVennLayout<any> & { set?: any }) => (
      <motion.g
        key={d.data?.key}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transition}
      >
        <CloneElement<VennLabelProps>
          element={label}
          data={d}
          animated={animated}
        />
        {d.set && outerLabel && (
          <CloneElement<VennLabelProps>
            element={outerLabel}
            data={d}
            animated={animated}
          />
        )}
      </motion.g>
    ),
    [label, outerLabel, animated]
  );

  return (
    <Fragment>
      {data.map(renderArc)}
      {data.map(renderLabel)}
    </Fragment>
  );
};
