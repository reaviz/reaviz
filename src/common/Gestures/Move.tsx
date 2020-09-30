import React, { Component, Children, cloneElement } from 'react';
import { toggleTextSelection } from '../utils/selection';

interface MoveProps {
  cursor?: string;
  disabled?: boolean;
  preventRightClick: boolean;
  disableText: boolean;
  threshold: number;
  onMoveStart: (event) => void;
  onMove: (event) => void;
  onMoveCancel: (event) => void;
  onMoveEnd: (event) => void;
}

export class Move extends Component<MoveProps> {
  static defaultProps: Partial<MoveProps> = {
    preventRightClick: true,
    disableText: true,
    threshold: 0,
    onMoveStart: () => undefined,
    onMove: () => undefined,
    onMoveEnd: () => undefined,
    onMoveCancel: () => undefined
  };

  started = false;
  deltaX = 0;
  deltaY = 0;
  prevXPosition = 0;
  prevYPosition = 0;
  rqf: any;

  componentWillUnmount() {
    cancelAnimationFrame(this.rqf);
    this.disposeHandlers();
  }

  disposeHandlers() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    this.setCursor(false);
    this.disableText(true);
  }

  disableText(shouldDisable: boolean) {
    if (this.props.disableText) {
      toggleTextSelection(shouldDisable);
    }
  }

  setCursor(set: boolean) {
    let { cursor } = this.props;

    if (cursor) {
      if (!set) {
        cursor = 'inherit';
      }

      document.body.style['cursor'] = cursor;
    }
  }

  checkThreshold() {
    const { threshold } = this.props;

    return (
      !this.started &&
      (Math.abs(this.deltaX) > threshold || Math.abs(this.deltaY) > threshold)
    );
  }

  getTouchCoords(event) {
    const { clientX, clientY } = event.touches[0];
    return {
      clientX,
      clientY
    };
  }

  onMouseDown(event: React.MouseEvent) {
    const { preventRightClick, disabled } = this.props;

    const shouldCancel = event.nativeEvent.which === 3 && preventRightClick;
    if (shouldCancel || disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.started = false;

    // Always bind event so we cancel movement even if no action was taken
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { movementX, movementY } = event;
    this.deltaX = this.deltaX + movementX;
    this.deltaY = this.deltaY + movementY;

    if (this.checkThreshold()) {
      this.disableText(true);
      this.setCursor(true);

      this.deltaX = 0;
      this.deltaY = 0;
      this.started = true;

      this.props.onMoveStart({
        nativeEvent: event,
        type: 'mouse'
      });
    } else {
      this.rqf = requestAnimationFrame(() => {
        this.props.onMove({
          nativeEvent: event,
          type: 'mouse',
          x: movementX,
          y: movementY
        });
      });
    }
  };

  onMouseUp = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.disposeHandlers();

    if (this.started) {
      this.props.onMoveEnd({
        nativeEvent: event,
        type: 'mouse'
      });
    } else {
      this.props.onMoveCancel({
        nativeEvent: event,
        type: 'mouse'
      });
    }
  };

  onTouchStart(event: React.TouchEvent) {
    const { disabled } = this.props;

    if (disabled || event.touches.length !== 1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.started = false;
    this.prevXPosition = event.touches[0].clientX;
    this.prevYPosition = event.touches[0].clientY;

    // Always bind event so we cancel movement even if no action was taken
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Calculate delta from previous position and current
    const { clientX, clientY } = this.getTouchCoords(event);
    const deltaX = clientX - this.prevXPosition;
    const deltaY = clientY - this.prevYPosition;

    // Track the delta
    this.deltaX = this.deltaX + deltaX;
    this.deltaY = this.deltaY + deltaY;

    if (this.checkThreshold()) {
      this.disableText(true);
      this.setCursor(true);

      this.deltaX = 0;
      this.deltaY = 0;
      this.started = true;

      this.props.onMoveStart({
        // TODO: Come back and clean this up...
        nativeEvent: {
          ...event,
          clientX,
          clientY
        },
        type: 'touch'
      });
    } else {
      this.rqf = requestAnimationFrame(() => {
        this.props.onMove({
          // TODO: Come back and clean this up...
          nativeEvent: {
            ...event,
            clientX,
            clientY
          },
          type: 'touch',
          x: deltaX,
          y: deltaY
        });
      });
    }

    this.prevXPosition = clientX;
    this.prevYPosition = clientY;
  };

  onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.disposeHandlers();

    if (this.started) {
      this.props.onMoveEnd({
        nativeEvent: event,
        type: 'touch'
      });
    } else {
      this.props.onMoveCancel({
        nativeEvent: event,
        type: 'touch'
      });
    }
  };

  render() {
    return Children.map(this.props.children, (child: any) =>
      cloneElement(child, {
        ...child.props,
        onMouseDown: (e) => {
          this.onMouseDown(e);
          if (child.props.onMouseDown) {
            child.props.onMouseDown(e);
          }
        },
        onTouchStart: (e) => {
          this.onTouchStart(e);
          if (child.props.onTouchStart) {
            child.props.onTouchStart(e);
          }
        }
      })
    );
  }
}
