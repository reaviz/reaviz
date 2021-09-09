import '@testing-library/jest-dom';
import { ResizeObserverEntry, ResizeObserver } from '@juggle/resize-observer';

if (!('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver;
  // @ts-ignore
  window.ResizeObserverEntry = ResizeObserverEntry;
}
