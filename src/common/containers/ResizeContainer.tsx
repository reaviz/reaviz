import React, { Fragment, PureComponent, ReactNode } from 'react';
import { withSize } from 'react-sizeme';

export interface ResizeEvent {
  height: number;
  width: number;
}

interface ResizeContainerProps {
  children: ReactNode;
  onSize: (event: ResizeEvent) => void;
  height?: number;
  width?: number;
}

const ResizeInner = props => <Fragment>{props.children}</Fragment>;

export class ResizeContainer extends PureComponent<ResizeContainerProps> {
  SizeMe: any;

  constructor(props: ResizeContainerProps) {
    super(props);

    if (this.shouldAutosize()) {
      this.SizeMe = withSize({
        monitorHeight: !props.height,
        monitorWidth: !props.width,
        refreshMode: 'debounce'
      })(ResizeInner);
    }
  }

  shouldAutosize() {
    return !this.props.height || !this.props.width;
  }

  render() {
    const { SizeMe } = this;
    const { children, onSize } = this.props;
    const shouldAutosize = this.shouldAutosize();

    return (
      <Fragment>
        {shouldAutosize && (
          <SizeMe onSize={onSize}>
            <div style={{ height: '100%', width: '100%' }}>{children}</div>
          </SizeMe>
        )}
        {!shouldAutosize && children}
      </Fragment>
    );
  }
}
