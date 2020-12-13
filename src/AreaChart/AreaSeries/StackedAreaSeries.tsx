import React, { FC } from 'react';
import {
  AreaSeriesProps,
  AreaSeries,
  AriaSeriesDefaultProps
} from './AreaSeries';
import { CloneElement } from 'rdk';
import { PointSeriesProps } from './PointSeries';
import { ScatterPointProps } from '../../ScatterPlot';

export const StackedAreaSeries: FC<Partial<AreaSeriesProps>> = ({
  colorScheme = AriaSeriesDefaultProps.colorScheme,
  animated = AriaSeriesDefaultProps.animated,
  interpolation = AriaSeriesDefaultProps.interpolation,
  line = AriaSeriesDefaultProps.line,
  area = AriaSeriesDefaultProps.area,
  markLine = AriaSeriesDefaultProps.markLine,
  tooltip = AriaSeriesDefaultProps.tooltip,
  symbols = AriaSeriesDefaultProps.symbols,
  type = 'stacked',
  ...rest
}) => {
  return (
    <AreaSeries
      {...rest}
      type="stacked"
      symbols={
        symbols && (
          <CloneElement<PointSeriesProps>
            element={symbols}
            {...symbols?.props}
            point={
              <CloneElement<ScatterPointProps>
                element={symbols?.props?.point}
                {...symbols?.props?.point?.props}
                tooltip={null}
              />
            }
          />
        )
      }
    />
  );
};

// import React, { Component } from 'react';
// import { AreaSeriesProps, AreaSeries } from './AreaSeries';
// import { CloneElement } from 'rdk';
// import { PointSeriesProps } from './PointSeries';
// import { ScatterPointProps } from '../../ScatterPlot';

// export class StackedAreaSeries extends Component<AreaSeriesProps, {}> {
//   static defaultProps: Partial<AreaSeriesProps> = {
//     ...AreaSeries.defaultProps,
//     type: 'stacked'
//   };

//   render() {
//     const { type, symbols, ...rest } = this.props;

//     return (
//       <AreaSeries
//         {...rest}
//         type="stacked"
//         symbols={
//           symbols && (
//             <CloneElement<PointSeriesProps>
//               element={symbols}
//               {...symbols.props}
//               point={
//                 <CloneElement<ScatterPointProps>
//                   element={symbols.props.point}
//                   {...symbols.props.point.props}
//                   tooltip={null}
//                 />
//               }
//             />
//           )
//         }
//       />
//     );
//   }
// }
