import React, { FC, Fragment, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { HierarchyCircularNode } from 'd3-hierarchy';
import { ColorSchemeType, getColor } from '../common/color';
import { Bubble, BubbleProps } from './Bubble';
import { BubbleLabel, BubbleLabelProps } from './BubbleLabel';
import { CloneElement } from 'rdk';
import invert from 'invert-color';
import chroma from 'chroma-js';
import { DEFAULT_TRANSITION } from '../common/Motion';

export interface BubbleSeriesProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: HierarchyCircularNode<any>[];

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Bubble element.
   */
  bubble?: ReactElement<BubbleProps, typeof Bubble>;

  /**
   * Label element.
   */
  label?: ReactElement<BubbleLabelProps, typeof BubbleLabel>;
}

export const BubbleSeries: FC<Partial<BubbleSeriesProps>> = ({
  id,
  data,
  colorScheme = 'cybertron',
  animated = true,
  bubble = <Bubble />,
  label = <BubbleLabel />
}) => {
  const transition = animated ? DEFAULT_TRANSITION : { type: false, delay: 0 };

  const renderBubble = (item, index) => {
    const fill = getColor({
      data,
      colorScheme,
      point: item.data,
      index
    });

    const textFill = fill
      ? invert(chroma(fill).darken(0.5).hex(), true)
      : 'white';

    return (
      <motion.g
        key={(item.data as any).key}
        initial={{
          scale: 0.5,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={transition}
      >
        <CloneElement<BubbleProps>
          element={bubble}
          id={`${id}-bubble`}
          animated={animated}
          data={item}
          fill={fill}
        />
        <CloneElement<BubbleLabelProps>
          element={label}
          id={`${id}-label`}
          animated={animated}
          data={item}
          fill={textFill}
        />
      </motion.g>
    );
  };

  return <Fragment>{data.map(renderBubble)}</Fragment>;
};
