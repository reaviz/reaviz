import React, {
  ReactElement,
  useState,
  FC,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import chroma from 'chroma-js';
import { ChartTooltip, ChartTooltipProps } from '../../../common/Tooltip';
import { CloneElement } from '../../../common/utils/children';
import { DEFAULT_TRANSITION } from '../../../common/Motion';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';

export interface PieArcProps {
  data: any;
  innerArc: any;
  color: any;
  animated?: boolean;
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;
  cursor?: string;
  disabled?: boolean;
  onClick?: (e) => void;
  onMouseEnter?: (e) => void;
  onMouseLeave?: (e) => void;
}

export const PieArc: FC<Partial<PieArcProps>> = ({
  color,
  data,
  innerArc,
  cursor = 'initial',
  animated = true,
  disabled = false,
  onClick = () => undefined,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined,
  tooltip = <ChartTooltip />,
}) => {
  const arcRef = useRef<SVGPathElement | null>(null);
  const prevEnter = useRef<any | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const fill = useMemo(() => (active ? chroma(color).brighten(0.5) : color), [
    color,
    active,
  ]);

  const exit = useMemo(() => {
    const startAngle = data.startAngle;
    const endAngle = animated ? startAngle : data.endAngle;

    return {
      ...data,
      startAngle,
      endAngle,
    };
  }, [data, animated]);

  const transition = useMemo(
    () =>
      animated
        ? { ...DEFAULT_TRANSITION }
        : {
            delay: 0,
          },
    [animated]
  );

  // Cache the previous for transition use later
  const previousEnter = prevEnter.current
    ? { ...prevEnter.current }
    : undefined;
  prevEnter.current = { ...data };

  const d = useMotionValue('');
  const prevPath = useMotionValue(exit);
  const spring = useSpring(prevPath, {
    ...DEFAULT_TRANSITION,
    from: 0,
    to: 1,
  });

  useEffect(() => {
    const from = previousEnter || prevPath.get();
    const interpolator = interpolate(from, data);
    const unsub = spring.onChange((v) => d.set(innerArc(interpolator(v))));
    prevPath.set(data);
    return unsub;
  }, [innerArc, data]);

  return (
    <g ref={arcRef}>
      <motion.path
        transition={transition}
        d={d}
        style={{ cursor }}
        fill={fill}
        onMouseEnter={(event) => {
          if (!disabled) {
            setActive(true);
            onMouseEnter({
              value: data.data,
              nativeEvent: event,
            });
          }
        }}
        onMouseLeave={(event) => {
          if (!disabled) {
            setActive(false);
            onMouseLeave({
              value: data.data,
              nativeEvent: event,
            });
          }
        }}
        onClick={(event) => {
          if (!disabled) {
            onClick({
              value: data.data,
              nativeEvent: event,
            });
          }
        }}
      />
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!active}
          reference={arcRef}
          value={{ y: data.data.data, x: data.data.key }}
        />
      )}
    </g>
  );
};
