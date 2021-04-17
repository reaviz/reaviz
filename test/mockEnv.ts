import '@testing-library/jest-dom';

// very simple mock for Resize Observer
// needed for `react-cool-dimensions` package
class ResizeObserver {
  observe() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
}

window['ResizeObserver'] = ResizeObserver;
window['ResizeObserverEntry'] = () => {};
