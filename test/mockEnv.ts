import '@testing-library/jest-dom';
import { ResizeObserver } from '@juggle/resize-observer';

if (!('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver;
}
