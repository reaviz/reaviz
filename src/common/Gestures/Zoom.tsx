import React, { Component, createRef } from 'react';
import { toggleTextSelection } from '../utils/selection';
import {
  getPointFromMatrix,
  isZoomLevelGoingOutOfBounds
} from '../utils/position';
import { getTouchPoints } from './pinchUtils';
import {
  scale,
  smoothMatrix,
  transform,
  translate,
  applyToPoint,
  inverse
} from 'transformation-matrix';

interface ZoomGestureProps {
  disabled?: boolean;
  maxZoom: number;
  minZoom: number;
  scaleFactor: number;
  scale: number;
  matrix: any;
  x: number;
  y: number;
  style?: any;
  disableMouseWheel?: boolean;
  requireZoomModifier?: boolean;
  onZoom: (event: ZoomEvent) => void;
  onZoomEnd: () => void;
}

export interface ZoomEvent {
  scale: number;
  x: number;
  y: number;
  nativeEvent: any;
}

export class Zoom extends Component<ZoomGestureProps> {
  static defaultProps: Partial<ZoomGestureProps> = {
    x: 0,
    y: 0,
    scale: 1,
    scaleFactor: 0.1,
    minZoom: 1,
    maxZoom: 10
  };

  firstTouch: any;
  lastDistance: any;
  timeout: any;
  childRef = createRef<SVGGElement>();
  rqf: any;

  componentDidMount() {
    const { disabled, disableMouseWheel } = this.props;

    const ref = this.childRef.current;
    if (!disabled && ref) {
      if (!disableMouseWheel) {
        ref.addEventListener('mousewheel', this.onMouseWheel, {
          passive: false
        });
      }

      ref.addEventListener('touchstart', this.onTouchStart, { passive: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    cancelAnimationFrame(this.rqf);
    clearTimeout(this.timeout);

    const ref = this.childRef.current;
    if (ref) {
      ref.removeEventListener('mousewheel', this.onMouseWheel);
      ref.removeEventListener('touchstart', this.onTouchStart);
    }

    toggleTextSelection(true);
  }

  getStep(delta: number) {
    const { scaleFactor } = this.props;
    return -delta > 0 ? scaleFactor + 1 : 1 - scaleFactor;
  }

  scale(x: number, y: number, step: number, nativeEvent) {
    const { minZoom, maxZoom, onZoom, matrix } = this.props;

    const outside = isZoomLevelGoingOutOfBounds(
      {
        d: matrix.a,
        scaleFactorMin: minZoom,
        scaleFactorMax: maxZoom
      },
      step
    );

    if (!outside) {
      const newMatrix = smoothMatrix(
        transform(
          matrix,
          translate(x, y),
          scale(step, step),
          translate(-x, -y)
        ),
        100
      );

      this.rqf = requestAnimationFrame(() => {
        onZoom({
          scale: newMatrix.a,
          x: newMatrix.e,
          y: newMatrix.f,
          nativeEvent
        });
      });
    }

    return outside;
  }

  onMouseWheel = (event) => {
    const {
      disableMouseWheel,
      requireZoomModifier,
      matrix,
      onZoomEnd
    } = this.props;

    if (disableMouseWheel) {
      return false;
    }

    const hasModifier = event.metaKey || event.ctrlKey;
    if (requireZoomModifier && !hasModifier) {
      return false;
    }

    event.preventDefault();
    event.stopPropagation();

    const point = getPointFromMatrix(event, matrix);
    if (point) {
      const { x, y } = point as { x: number; y: number };
      const step = this.getStep(event.deltaY);

      this.scale(x, y, step, event);

      // Do small timeout to 'guess' when its done zooming
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => onZoomEnd(), 500);
    }
  };

  onTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      event.preventDefault();
      event.stopPropagation();
      toggleTextSelection(false);

      this.firstTouch = getTouchPoints(event, this.childRef.current);
      this.lastDistance = this.firstTouch.distance;

      window.addEventListener('touchmove', this.onTouchMove);
      window.addEventListener('touchend', this.onTouchEnd);
    }
  };

  onTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      event.preventDefault();
      event.stopPropagation();

      const { distance } = getTouchPoints(event, this.childRef.current);
      const distanceFactor = distance / this.lastDistance;

      const point = applyToPoint(inverse(this.props.matrix), {
        x: this.firstTouch.midpoint.x,
        y: this.firstTouch.midpoint.y
      }) as { x: number; y: number };

      if (point.x && point.y) {
        const outside = this.scale(point.x, point.y, distanceFactor, event);

        if (!outside) {
          this.lastDistance = distance;
        }
      }
    }
  };

  onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    toggleTextSelection(true);
    this.props.onZoomEnd();
  };

  render() {
    const { style, children } = this.props;
    return (
      <g ref={this.childRef} style={style}>
        {children}
      </g>
    );
  }
}
