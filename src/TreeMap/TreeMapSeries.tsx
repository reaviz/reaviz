import { motion } from 'framer-motion';
import { CloneElement } from 'rdk';
import React, { FC, Fragment, ReactElement } from 'react';
import { ColorSchemeType, getColor } from '../common/color';
import { TreeMapLabel, TreeMapLabelProps } from './TreeMapLabel';
import { TreeMapRect, TreeMapRectProps } from './TreeMapRect';



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

  rect?: ReactElement<TreeMapRectProps, typeof TreeMapRect>;

  label?: ReactElement<TreeMapLabelProps, typeof TreeMapLabel>;
}

export const TreeMapSeries: FC<Partial<TreeMapSeriesProps>> = ({
  id,
  data,
  colorScheme = 'cybertron',
  animated = true,
  rect = <TreeMapRect />,
  label = <TreeMapLabel />
}) => {
  const transition = animated ? {} : { type: false, delay: 0 };

  const renderItem = (item: any, index: number) => {
    const fill = getColor({
      data,
      colorScheme,
      point: item.data,
      index
    });

    return (
      <motion.g
        key={item.data.key}
        initial={{
          scale: .5,
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
        />
      </motion.g>
    );
  };

  return (
    <Fragment>
      {data.map((d, index) => renderItem(d, index))}
    </Fragment>
  );
};
