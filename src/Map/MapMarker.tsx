import React, { Fragment, useRef, useState, FC, useMemo } from 'react';
import { Tooltip } from 'reablocks';
import { motion } from 'motion/react';
import css from './MapMarker.module.css';
import { tooltipTheme } from '@/common';
import { offset } from '@floating-ui/dom';

export interface MapMarkerProps {
  coordinates: [number, number];
  index: number;
  cy?: number;
  cx?: number;
  size?: number;
  tooltip?: any;
  onClick?: () => void;
}

export const MapMarker: FC<Partial<MapMarkerProps>> = ({
  size = 3,
  index,
  tooltip,
  cx,
  cy,
  onClick = () => undefined
}) => {
  const ref = useRef<SVGCircleElement | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const ariaLabelData = useMemo(
    () => (typeof tooltip === 'string' ? tooltip : 'map marker'),
    [tooltip]
  );

  return (
    <Fragment>
      <motion.circle
        initial={{
          opacity: 0,
          scale: 0.02
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          delay: index! * 0.3
        }}
        ref={ref}
        className={css.marker}
        cx={cx}
        cy={cy}
        r={size}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={onClick}
        tabIndex={0}
        aria-label={ariaLabelData}
        role="graphics-document"
      />
      {tooltip && (
        <Tooltip
          theme={tooltipTheme}
          visible={active}
          reference={ref}
          modifiers={[offset({ mainAxis: 0, crossAxis: 3 })]}
          content={tooltip}
        />
      )}
    </Fragment>
  );
};
