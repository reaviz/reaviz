import React, {
  PropsWithChildren,
  FC,
  useRef,
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Pan,
  PanMoveEvent,
  PanStartEvent,
  PanEndEvent,
  PanCancelEvent
} from '@/common/Gestures/Pan';
import { Zoom, ZoomEvent } from '@/common/Gestures/Zoom';
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
  /**
   * Height of the area.
   *
   * @default 0
   */
  height: number;

  /**
   * Width of the area.
   *
   * @default 0
   */
  width: number;

  /**
   * Current zoom scale factor.
   *
   * @default 1
   */
  scale: number;

  /**
   * Current x translation.
   *
   * @default 0
   */
  x: number;

  /**
   * Current y translation.
   *
   * @default 0
   */
  y: number;

  /**
   * Whether panning is enabled.
   *
   * @default true
   */
  pannable: boolean;

  /**
   * Whether zooming is enabled.
   *
   * @default true
   */
  zoomable: boolean;

  /**
   * Whether the gestures are disabled.
   */
  disabled?: boolean;

  /**
   * Maximum allowed zoom scale.
   *
   * @default 10
   */
  maxZoom: number;

  /**
   * Minimum allowed zoom scale.
   *
   * @default 0
   */
  minZoom: number;

  /**
   * Incremental step applied on zoom gestures.
   *
   * @default 0.1
   */
  zoomStep: number;

  /**
   * Whether panning is constrained to the chart bounds.
   *
   * @default true
   */
  constrain: boolean;

  /**
   * Whether panning works anywhere on the page.
   *
   * @default true
   */
  globalPanning: boolean;

  /**
   * Whether to ignore mouse wheel events for zoom.
   */
  disableMouseWheel?: boolean;

  /**
   * Whether a modifier key is required to trigger zoom.
   */
  requireZoomModifier?: boolean;

  onZoomPan: (event: ZoomPanEvent) => void;
  onZoom: (event: ZoomEvent) => void;
  onZoomEnd: () => void;
  onPanStart: (event: PanStartEvent) => void;
  onPanMove: (event: PanMoveEvent) => void;
  onPanEnd: (event: PanEndEvent) => void;
  onPanCancel: (event: PanCancelEvent) => void;
}

export const ZoomPan: FC<Partial<ZoomPanProps>> = ({
  height = 0,
  width = 0,
  children,
  disabled,
  pannable = true,
  maxZoom = 10,
  minZoom = 0,
  zoomable = true,
  scale = 1,
  x = 0,
  y = 0,
  disableMouseWheel,
  constrain = true,
  zoomStep = 0.1,
  onPanCancel = () => undefined,
  requireZoomModifier,
  globalPanning = true,
  onPanStart = () => undefined,
  onZoomPan = () => undefined,
  onPanMove = () => undefined,
  onPanEnd = () => undefined,
  onZoom = () => undefined,
  onZoomEnd = () => undefined
}) => {
  const zoomRef = useRef<Zoom>();
  const panRef = useRef<Pan>();
  const [isZooming, setIsZooming] = useState<boolean>();
  const [isPanning, setIsPanning] = useState<boolean>();
  const [matrix, setMatrix] = useState<any>(identity());

  useEffect(() => {
    const newMatrix = transform(
      fromDefinition([
        { type: 'translate', tx: x, ty: y },
        { type: 'scale', sx: scale, sy: scale }
      ])
    );

    if (!isEqual(newMatrix, matrix)) {
      setMatrix(newMatrix);
    }
  }, [x, y, scale, matrix]);

  const onPanStartHandler = useCallback(
    (event: PanStartEvent) => {
      setIsPanning(true);
      onPanStart(event);
    },
    [onPanStart]
  );

  const onPanMoveHandler = useCallback(
    (event: PanMoveEvent) => {
      onZoomPan({
        scale: scale,
        x: event.x,
        y: event.y,
        type: 'pan',
        nativeEvent: event.nativeEvent
      });

      onPanMove(event);
    },
    [onPanMove, onZoomPan, scale]
  );

  const onPanEndHandler = useCallback(
    (event: PanEndEvent) => {
      setIsPanning(false);
      onPanEnd(event);
    },
    [onPanEnd]
  );

  const onZoomHandler = useCallback(
    (event: ZoomEvent) => {
      onZoomPan({
        x: event.x,
        y: event.y,
        scale: event.scale,
        nativeEvent: event.nativeEvent,
        type: 'zoom'
      });
      onZoom(event);
    },
    [onZoom, onZoomPan]
  );

  const onZoomEndHandler = useCallback(() => {
    setIsZooming(false);
    onZoomEnd();
  }, [onZoomEnd]);

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
      onPanStart={onPanStartHandler}
      onPanMove={onPanMoveHandler}
      onPanEnd={onPanEndHandler}
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
        onZoom={onZoomHandler}
        onZoomEnd={onZoomEndHandler}
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
