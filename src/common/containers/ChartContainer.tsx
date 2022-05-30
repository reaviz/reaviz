import React, { FC, useCallback, useState, useMemo } from 'react';
import { Dimensions, Margins, getDimension } from '../utils/dimensions';
import useDimensions from 'react-cool-dimensions';
import { useId } from 'rdk';
import { LinearAxisDimensionChanged } from '../Axis';

export interface ChartProps {
  /**
   * Id of the chart.
   */
  id?: string;

  /**
   * Width of the chart. If not provided will autosize.
   */
  width?: number;

  /**
   * Height of the chart. If not provided will autosize.
   */
  height?: number;

  /**
   * Margins for the chart.
   */
  margins?: Margins;

  /**
   * Classnames for the chart.
   */
  className?: string;

  /**
   * Classnames for the chart.
   */
  containerClassName?: string;

  /**
   * Additional css styles.
   */
  style?: React.StyleHTMLAttributes<SVGAElement>;

  /**
   * Center the chart. Used mainly internally.
   */
  center?: boolean;

  /**
   * Center chart on X Axis only. Used mainly internally.
   */
  centerX?: boolean;

  /**
   * Center chart on Y Axis only. Used mainly internally.
   */
  centerY?: boolean;
}

export interface ChartContainerProps extends ChartProps {
  /**
   * Internal property to identify if the xAxis is visible.
   */
  xAxisVisible?: boolean;

  /**
   * Internal property to identify if the xAxis is visible.
   */
  yAxisVisible?: boolean;

  /**
   * Children elements to recieve the calculated props.
   */
  children: (props: ChartContainerChildProps) => any;
}

export interface ChartContainerChildProps extends Dimensions {
  id: string;
  chartSized?: boolean;
  yAxisSized?: boolean;
  xAxisSized?: boolean;
  updateAxes: (
    orientation: 'horizontal' | 'vertical',
    event: LinearAxisDimensionChanged
  ) => void;
}

export const ChartContainer: FC<ChartContainerProps> = ({
  className,
  children,
  center,
  centerX,
  centerY,
  style,
  margins,
  containerClassName,
  xAxisVisible,
  yAxisVisible,
  id,
  ...rest
}) => {
  const curId = useId(id);
  const [xAxisSized, setXAxisSized] = useState<boolean>(false);
  const [yAxisSized, setYAxisSized] = useState<boolean>(false);
  const [xOffset, setYOffset] = useState<number>(0);
  const [yOffset, setXOffset] = useState<number>(0);
  const { observe, width, height } = useDimensions<HTMLDivElement>();

  const chartSized = useMemo(() => {
    if (!height || !width) {
      return false;
    }

    // TODO: @amcdnl refactor this to account for 0-2 axises on x/y
    if (xAxisVisible && !xAxisSized) {
      return false;
    }

    if (yAxisVisible && !yAxisSized) {
      return false;
    }

    return true;
  }, [height, width, xAxisSized, xAxisVisible, yAxisVisible, yAxisSized]);

  const onUpdateAxes = useCallback(
    (
      orientation: 'horizontal' | 'vertical',
      event: LinearAxisDimensionChanged
    ) => {
      if (orientation === 'horizontal') {
        setXAxisSized(true);
      } else {
        setYAxisSized(true);
      }

      if (event.height) {
        setYOffset(event.height);
      }

      if (event.width) {
        setXOffset(event.width);
      }
    },
    []
  );

  const childProps: ChartContainerChildProps = useMemo(
    () => ({
      chartSized,
      id: curId,
      updateAxes: onUpdateAxes,
      yAxisSized,
      xAxisSized,
      ...getDimension({
        margins,
        height,
        width,
        yOffset,
        xOffset
      })
    }),
    [
      chartSized,
      curId,
      onUpdateAxes,
      yAxisSized,
      xAxisSized,
      margins,
      height,
      width,
      yOffset,
      xOffset
    ]
  );

  const translateX = center || centerX ? width / 2 : childProps.xMargin;
  const translateY = center || centerY ? height / 2 : childProps.yMargin;

  const styleHeight =
    rest.height !== undefined && rest.height !== null ? rest.height : '100%';
  const styleWidth =
    rest.width !== undefined && rest.width !== null ? rest.width : '100%';

  return (
    <div
      ref={observe}
      style={{ height: styleHeight, width: styleWidth }}
      className={containerClassName}
    >
      {height > 0 && width > 0 && (
        <svg width={width} height={height} className={className} style={style}>
          <g transform={`translate(${translateX}, ${translateY})`}>
            {children(childProps)}
          </g>
        </svg>
      )}
    </div>
  );
};
