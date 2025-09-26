import { ResizeObserver, ResizeObserverEntry } from '@juggle/resize-observer';

if (!('ResizeObserver' in window)) {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
  // @ts-ignore
  window.ResizeObserverEntry = ResizeObserverEntry;
}
