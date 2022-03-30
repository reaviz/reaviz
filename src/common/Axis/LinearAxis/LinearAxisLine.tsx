import React, { Fragment, FC, ReactElement } from 'react';
import { GradientProps, Gradient } from '../../Gradient';
import { CloneElement, useId } from 'rdk';

export interface LinearAxisLineProps {
  height: number;
  width: number;
  strokeColor?: string;
  strokeWidth: number;
  strokeGradient: ReactElement<GradientProps, typeof Gradient> | null;
  scale: any;
  orientation: 'horizontal' | 'vertical';
  className?: any;
}

export const LinearAxisLine: FC<Partial<LinearAxisLineProps>> = ({
  strokeColor,
  strokeWidth,
  strokeGradient,
  scale,
  orientation,
  className
}) => {
  const id = useId();
  const [range0, range1] = scale.range();

  return (
    <Fragment>
      <line
        className={className}
        x1={orientation === 'vertical' ? 0 : range0}
        // Workaround for a Chrome/Firefox bug where it won't render gradients for straight lines
        x2={orientation === 'vertical' ? 0.00001 : range1}
        y1={orientation === 'vertical' ? range0 : 0}
        y2={orientation === 'vertical' ? range1 : 0.00001}
        strokeWidth={strokeWidth}
        stroke={strokeGradient ? `url(#axis-gradient-${id})` : strokeColor}
      />
      {strokeGradient && (
        <CloneElement<GradientProps>
          element={strokeGradient}
          id={`axis-gradient-${id}`}
        />
      )}
    </Fragment>
  );
};

LinearAxisLine.defaultProps = {
  strokeColor: '#8F979F',
  strokeWidth: 1
};
