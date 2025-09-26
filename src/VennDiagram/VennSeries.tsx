import type { IVennLayout } from '@upsetjs/venn.js';
import chroma from 'chroma-js';
import invert from 'invert-color';
import { motion } from 'motion/react';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { identifier } from 'safe-identifier';

import type { ColorSchemeType } from '@/common/color';
import { getColor } from '@/common/color';
import { DEFAULT_TRANSITION } from '@/common/Motion';

import type { VennArcProps } from './VennArc';
import { VennArc } from './VennArc';
import type { VennLabelProps } from './VennLabel';
import { VennLabel } from './VennLabel';
import type { VennOuterLabelProps } from './VennOuterLabel';
import { VennOuterLabel } from './VennOuterLabel';

export interface VennSeriesProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * Active managed selections.
   */
  selections?: string[];

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
  selections,
  animated = true,
  disabled = false,
  colorScheme = 'cybertron',
  outerLabel = <VennOuterLabel />,
  arc = <VennArc />,
  label = <VennLabel />,
}) => {
  const transition = animated
    ? DEFAULT_TRANSITION
    : { type: false as const, delay: 0 };
  const [actives, setActives] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  const onActivate = useCallback(
    (point: string) => {
      setHovered(point);

      setActives(
        data
          .filter((d) => d.data?.key.indexOf(point) > -1)
          .map((d) => d.data?.key),
      );
    },
    [data],
  );

  const renderArc = useCallback(
    (d: IVennLayout<any> & { set?: any }, index: number) => {
      // Get the colors of the fill
      const fill = getColor({
        data,
        colorScheme,
        point: d.data,
        index,
      });

      const textFill = fill
        ? invert(chroma(fill).darken(0.5).hex(), true)
        : 'white';

      const arcFill = arc.props.fill || fill;

      const key = d?.data?.key;
      const safeKey = identifier(d.data?.key);
      const isSelected = selections?.includes(key);

      // Get the state of the arc
      const isHovered = hovered === key || isSelected;
      const isActive =
        isSelected ||
        actives.includes(key) ||
        (actives.length > 0 ? null : false);

      const getStrokeColor = () => {
        if (typeof arc.props.stroke === 'function') {
          return arc.props.stroke(data, index, isActive, isHovered);
        }
        if (arc.props.stroke !== undefined) {
          return arc.props.stroke;
        }

        // fallback to fill (determined by colorScheme) if stroke is undefined
        return fill;
      };

      const stroke = getStrokeColor();

      const arcStroke =
        stroke ||
        chroma(arcFill)
          .darken(isActive ? 0.8 : 0.5)
          .hex();

      return (
        <Fragment key={safeKey}>
          <CloneElement<VennArcProps>
            element={arc}
            id={`${id}-${safeKey}`}
            data={d}
            fill={arcFill}
            stroke={arcStroke}
            disabled={disabled}
            animated={animated}
            active={isActive}
            onMouseEnter={() => onActivate(key)}
            onMouseLeave={() => {
              setActives([]);
              setHovered(null);
            }}
          />
          {label && (
            <CloneElement<VennLabelProps>
              element={label}
              data={d}
              id={`${id}-${safeKey}`}
              active={isActive}
              animated={animated}
              fill={textFill}
              {...label.props}
            />
          )}
          {d.set && outerLabel && (
            <CloneElement<VennLabelProps>
              element={outerLabel}
              data={d}
              animated={animated}
            />
          )}
        </Fragment>
      );
    },
    [
      data,
      colorScheme,
      arc,
      selections,
      hovered,
      actives,
      id,
      disabled,
      animated,
      label,
      outerLabel,
      onActivate,
    ],
  );

  const topArcs = useMemo(() => {
    const result = [];

    if (actives.length > 0) {
      result.push(...actives.filter((s) => s !== hovered));
    }

    if (selections?.length) {
      result.push(
        ...selections.filter((s) => !actives.includes(s) && s !== hovered),
      );
    }

    if (hovered) {
      result.push(hovered);
    }

    return result;
  }, [hovered, actives, selections]);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition}
    >
      {data.map(renderArc)}
      {topArcs.length > 0 &&
        topArcs.map((a) => (
          <use
            key={a}
            xlinkHref={`#${id}-${a}-arc`}
            style={{ pointerEvents: 'none' }}
          />
        ))}
      {data.map((d, index) => (
        <use
          key={index}
          xlinkHref={`#${id}-${identifier(d.data?.key)}-text`}
          style={{ pointerEvents: 'none' }}
        />
      ))}
    </motion.g>
  );
};
