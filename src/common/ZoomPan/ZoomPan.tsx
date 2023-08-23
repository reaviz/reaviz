import React, { PropsWithChildren, FC, useRef, useState, useEffect } from 'react';
import bind from 'memoize-bind';
import {
  Pan,
  PanMoveEvent,
  PanStartEvent,
  PanEndEvent,
  PanCancelEvent
} from '../Gestures/Pan';
import { Zoom, ZoomEvent } from '../Gestures/Zoom';
import {
  identity,
  fromObject,
  fromDefinition,
  transform
} from 'transformation-matrix';
import isEqual from 'react-fast-compare';

export interface ZoomPanEvent {
  scale: number;
  x: number;
  y: number;
  type: 'zoom' | 'pan';
  nativeEvent: any;
}

export interface ZoomPanProps extends PropsWithChildren {
  height: number;
  width: number;
  scale: number;
  x: number;
  y: number;
  pannable: boolean;
  zoomable: boolean;
  disabled?: boolean;
  maxZoom: number;
  minZoom: number;
  zoomStep: number;
  constrain: boolean;
  globalPanning: boolean;
  disableMouseWheel?: boolean;
  requireZoomModifier?: boolean;
  onZoomPan: (event: ZoomPanEvent) => void;
  onZoom: (event: ZoomEvent) => void;
  onZoomEnd: () => void;
  onPanStart: (event: PanStartEvent) => void;
  onPanMove: (event: PanMoveEvent) => void;
  onPanEnd: (event: PanEndEvent) => void;
  onPanCancel: (event: PanCancelEvent) => void;
}

export const ZoomPan: FC<ZoomPanProps> = ({
  height,
  width,
  children,
  disabled,
  pannable,
  maxZoom,
  minZoom,
  zoomable,
  scale,
  x,
  y,
  disableMouseWheel,
  constrain,
  zoomStep,
  onPanCancel,
  requireZoomModifier,
  globalPanning,
  onPanStart,
  onZoomPan,
  onPanMove,
  onPanEnd,
  onZoom,
  onZoomEnd
}) =>  {
  const zoomRef = useRef<Zoom>();
  const panRef = useRef<Pan>();
  const [isZooming, setIsZooming] = useState<boolean>();
  const [isPanning, setIsPanning] = useState<boolean>();
  const [matrix, setMatrix] = useState<any>(identity());

  useEffect(() => {
    const newMatrix = transform(
      fromDefinition([
        { type: 'translate', tx: x, ty: y },
        { type: 'scale', sx: scale, sy: scale },
      ])
    );

    if (!isEqual(newMatrix, matrix)) {
      setMatrix(newMatrix);
    }
  }, [x, y, scale, matrix]);


  const onPanStartHandler = (event: PanStartEvent) => {
    setIsPanning(true);
    onPanStart(event);
  };

  const onPanMoveHandler = (event: PanMoveEvent) => {
    onZoomPan({
      scale: scale,
      x: event.x,
      y: event.y,
      type: 'pan',
      nativeEvent: event.nativeEvent
    });

    onPanMove(event);
  };

  const onPanEndHandler = (event: PanEndEvent) => {
    setIsPanning(false);
    onPanEnd(event);
  };

  const onZoomHandler = (event: ZoomEvent) => {
    onZoomPan({
      x: event.x,
      y: event.y,
      scale: event.scale,
      nativeEvent: event.nativeEvent,
      type: 'zoom'
    });
    onZoom(event);
  };

  const onZoomEndHandler = () => {
    setIsZooming(false);
    onZoomEnd();
  };

  const cursor = pannable ? 'move' : 'auto';
  const selection = isZooming || isPanning ? 'none' : 'auto';
  const matrixObj = fromObject(matrix);

  return (
    <Pan
      x={x}
      y={y}
      scale={scale}
      matrix={matrixObj}
      constrain={constrain}
      height={height}
      width={width}
      disabled={!pannable || disabled}
      ref={panRef}
      globalPanning={globalPanning}
      onPanStart={bind(onPanStartHandler)}
      onPanMove={bind(onPanMoveHandler)}
      onPanEnd={bind(onPanEndHandler)}
      onPanCancel={onPanCancel}
    >
      <Zoom
        ref={zoomRef}
        disabled={!zoomable || disabled}
        scaleFactor={zoomStep}
        disableMouseWheel={disableMouseWheel}
        maxZoom={maxZoom}
        minZoom={minZoom}
        scale={scale}
        x={x}
        y={y}
        style={{ cursor }}
        requireZoomModifier={requireZoomModifier}
        matrix={matrix}
        onZoom={bind(onZoomHandler)}
        onZoomEnd={bind(onZoomEndHandler)}
      >
        {!disabled && (
          <rect
            height={height}
            width={width}
            opacity={0}
            className="pan-container"
          />
        )}
        <g
          style={{
            pointerEvents: selection,
            userSelect: selection
          }}
        >
          {children}
        </g>
      </Zoom>
    </Pan>
  );
};

ZoomPan.defaultProps = {
  maxZoom: 10,
  minZoom: 0,
  zoomStep: 0.1,
  pannable: true,
  zoomable: true,
  constrain: true,
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  scale: 1,
  globalPanning: true,
  onPanStart: () => undefined,
  onPanMove: () => undefined,
  onPanEnd: () => undefined,
  onPanCancel: () => undefined,
  onZoom: () => undefined,
  onZoomEnd: () => undefined
};
