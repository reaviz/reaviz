import type { FC, PropsWithChildren } from 'react';
import React, { useCallback } from 'react';

import type { BrushConfiguration } from './Brush';
import { Brush } from './Brush';
import type { BrushChangeEvent } from './BrushSlice';

export interface ChartBrushProps extends BrushConfiguration, PropsWithChildren {
  scale: any;
  height: number;
  width: number;
  children: any;
}

export const ChartBrush: FC<Partial<ChartBrushProps>> = (props) => {
  const { disabled, domain, scale, onBrushChange, width, children } = props;

  const getBrushOffset = useCallback(() => {
    let start;
    let end;

    if (!disabled && domain) {
      start = scale(domain[0]);
      end = scale(domain[1]);
    }

    return { start, end };
  }, [disabled, domain, scale]);

  const onBrushChangeHandler = useCallback(
    (event: BrushChangeEvent) => {
      if (onBrushChange) {
        let domain;

        if (
          event.start !== undefined &&
          event.end !== undefined &&
          (event.start !== 0 || event.end !== width)
        ) {
          if (scale.invert) {
            const start = scale.invert(event.start);
            const end = scale.invert(event.end);
            domain = [start, end];
          } else {
            // invert scaleBend
            const band = scale.step();
            const start = Math.ceil((event.start - band / 2) / band);
            const end = Math.ceil((event.end - band / 2) / band);

            domain = [scale.domain()[start], scale.domain()[end]];
          }
        }

        onBrushChange({
          domain,
        });
      }
    },
    [onBrushChange, scale, width],
  );

  return (
    <Brush
      {...props}
      {...getBrushOffset()}
      onBrushChange={onBrushChangeHandler}
    >
      {children}
    </Brush>
  );
};
