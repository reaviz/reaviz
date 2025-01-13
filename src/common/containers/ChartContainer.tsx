import React, {
  FC,
  useCallback,
  useState,
  useMemo,
  PropsWithChildren
} from 'react';
import { Margins, getDimension } from '@/common/utils/dimensions';
import { useResizeObserver } from '@/common/utils/useResizeObserver';
import { useId } from 'reablocks';
import { LinearAxisDimensionChanged } from '@/common/Axis';
import classNames from 'classnames';
import { ChartContextProps, ChartProvider } from './ChartContext';
import css from './ChartContainer.module.css';

export interface ChartProps extends PropsWithChildren {
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
  style?: React.StyleHTMLAttributes<SVGSVGElement>;

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

export type ChartContainerChildProps = ChartContextProps;

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
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(0);
  const [ref, { width, height }] = useResizeObserver<HTMLDivElement>();

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
      ref={ref}
      style={{ height: styleHeight, width: styleWidth }}
      className={classNames(containerClassName, css.container)}
      {...rest}
    >
      <ChartProvider value={childProps}>
        {height > 0 && width > 0 && (
          <svg
            width={width}
            height={height}
            className={classNames(css.svg, className)}
            style={style}
            tabIndex={0}
          >
            <g transform={`translate(${translateX}, ${translateY})`}>
              {children(childProps)}
            </g>
          </svg>
        )}
      </ChartProvider>
    </div>
  );
};
