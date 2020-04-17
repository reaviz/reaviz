import React, { PureComponent } from 'react';
import { MaskProps } from './Mask';

interface StripesProps extends MaskProps {
  id?: string;
  fill?: string;
}

export class Stripes extends PureComponent<StripesProps> {
  static defaultProps: Partial<StripesProps> = {};

  render() {
    const { id, fill } = this.props;

    return (
      <pattern
        id={id}
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect className="area-stripe" width="1" height="4" fill={fill} />
      </pattern>
    );
  }
}
