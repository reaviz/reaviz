import React, { FC, useRef, ReactElement, useState } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { ChartTooltip, ChartTooltipProps } from '../common/Tooltip';
import { CloneElement } from '../common/utils';

export interface VennArcProps {
  fill: string;
  data: IVennLayout<any>;
  disabled?: boolean;
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;
  onClick?: (e) => void;
  onMouseEnter?: (e) => void;
  onMouseLeave?: (e) => void;
}

export const VennArc: FC<Partial<VennArcProps>> = ({
  data,
  fill,
  disabled,
  tooltip = <ChartTooltip />,
  onClick = () => undefined,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined
}) => {
  const arcRef = useRef<any | null>(null);
  const [active, setActive] = useState<boolean>(false);

  return (
    <g
      onMouseEnter={(event) => {
        if (!disabled) {
          setActive(true);
          onMouseEnter({
            value: data.data,
            nativeEvent: event
          });
        }
      }}
      onMouseLeave={(event) => {
        if (!disabled) {
          setActive(false);
          onMouseLeave({
            value: data.data,
            nativeEvent: event
          });
        }
      }}
      onClick={(event) => {
        if (!disabled) {
          onClick({
            value: data.data,
            nativeEvent: event
          });
        }
      }}
    >
      <path ref={arcRef} opacity={0.5} d={data.path} fill={fill} />
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!active}
          reference={arcRef}
          value={{ y: data.data.size, x: data.data.sets.join(' | ') }}
        />
      )}
    </g>
  );
};
