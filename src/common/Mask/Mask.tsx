import React, { PureComponent } from 'react';

export interface MaskProps {
  id?: string;
  fill?: string;
}

export class Mask extends PureComponent<MaskProps> {
  render() {
    const { id, fill } = this.props;

    return (
      <mask id={id}>
        <rect x="0" y="0" width="100%" height="100%" fill={fill} />
      </mask>
    );
  }
}
