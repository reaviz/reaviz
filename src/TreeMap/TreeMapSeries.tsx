import React, { FC, Fragment, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { CloneElement } from 'rdk';
import { ColorSchemeType, getColor } from '../common/color';
import { TreeMapLabel, TreeMapLabelProps } from './TreeMapLabel';
import { TreeMapRect, TreeMapRectProps } from './TreeMapRect';
import invert from 'invert-color';
import chroma from 'chroma-js';
import { DEFAULT_TRANSITION } from '../common/Motion';

export interface TreeMapSeriesProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: any[];

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Rect element to be rendered.
   */
  rect?: ReactElement<TreeMapRectProps, typeof TreeMapRect>;

  /**
   * Label element to be rendered.
   */
  label?: ReactElement<TreeMapLabelProps, typeof TreeMapLabel>;
}

export const TreeMapSeries: FC<Partial<TreeMapSeriesProps>> = ({
  id,
  data,
  colorScheme,
  animated,
  rect,
  label
}) => {
  const transition = animated ? DEFAULT_TRANSITION : { type: false, delay: 0 };

  const renderItem = (item: any, index: number) => {
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
        key={item.data.key}
        initial={{
          scale: 0.5,
          opacity: 0,
          x: item.x0,
          y: item.y0
        }}
        animate={{
          scale: 1,
          opacity: 1,
          x: item.x0,
          y: item.y0
        }}
        transition={transition}
      >
        <CloneElement<TreeMapRectProps>
          element={rect}
          id={`${id}-rect`}
          animated={animated}
          data={item}
          fill={fill}
        />
        <CloneElement<TreeMapLabelProps>
          element={label}
          id={`${id}-label`}
          data={item}
          fill={textFill}
        />
      </motion.g>
    );
  };

  return <Fragment>{data.map((d, index) => renderItem(d, index))}</Fragment>;
};

TreeMapSeries.defaultProps = {
  colorScheme: 'cybertron',
  animated: true,
  rect: <TreeMapRect />,
  label: <TreeMapLabel />
};
