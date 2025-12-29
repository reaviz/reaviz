# CLAUDE.md - AI Assistant Guide for REAVIZ

## Project Overview

REAVIZ is a modular React charting library that uses D3.js for calculations and React for rendering. It provides a composable API for building data visualizations with features like animations, tooltips, legends, and accessibility support.

- **Repository**: https://github.com/reaviz/reaviz
- **License**: Apache-2.0
- **Node Version**: >=22
- **Package Manager**: npm (>=10.8.2)

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Development (Storybook)
npm start                  # Start Storybook dev server on port 9009

# Build
npm run build              # Full build (JS + docs)
npm run build:js           # Build library only (Vite)
npm run build-storybook    # Build Storybook static site

# Testing
npm test                   # Run tests with Vitest (watch mode)
npm run test:ci            # Run tests with coverage
npm run test-storybook     # Run Storybook visual tests

# Linting & Formatting
npm run lint               # Run ESLint
npm run lint:fix           # Run ESLint with auto-fix
npm run prettier           # Format code with Prettier
npm run ts:check           # TypeScript type checking
```

## Project Structure

```
reaviz/
├── src/                    # Source code
│   ├── index.ts            # Main exports
│   ├── common/             # Shared components and utilities
│   │   ├── Axis/           # Linear and Radial axis components
│   │   ├── Brush/          # Brush selection component
│   │   ├── containers/     # Chart container components
│   │   ├── data/           # Data transformation utilities
│   │   ├── Gradient/       # SVG gradient components
│   │   ├── Gridline/       # Grid line components
│   │   ├── legends/        # Legend components
│   │   ├── Mask/           # SVG mask/pattern components
│   │   ├── Motion/         # Animation utilities
│   │   ├── scales/         # D3 scale utilities
│   │   ├── Tooltip/        # Tooltip components
│   │   ├── utils/          # General utilities
│   │   └── ZoomPan/        # Pan/zoom gesture handling
│   │
│   └── [ChartType]/        # Individual chart implementations
│       ├── ChartType.tsx         # Main chart component
│       ├── ChartType.module.css  # Component styles
│       ├── ChartType*.story.tsx  # Storybook stories
│       ├── [SubComponents]/      # Chart-specific sub-components
│       └── index.ts              # Barrel exports
│
├── blocks/                 # Pre-built chart compositions
├── docs/                   # MDX documentation for Storybook
├── test/                   # Test utilities and mocks
├── scripts/                # Build scripts
└── .storybook/             # Storybook configuration
```

## Chart Types Available

- **AreaChart** - Single/multi-series area charts with stacking
- **BarChart** - Vertical/horizontal bars, grouped, stacked, waterfall, Marimekko
- **BarList** - Simple horizontal bar list component
- **BubbleChart** - Bubble/scatter with size dimension
- **FunnelChart** - Funnel visualization
- **Heatmap** - Standard and calendar heatmaps
- **LineChart** - Single/multi-series line charts
- **LinearGauge** - Linear gauge visualization
- **Map** - Geographic map charts
- **Meter** - Simple meter/progress component
- **PieChart** - Pie and donut charts
- **RadarChart** - Spider/radar charts
- **RadialAreaChart** - Radial area charts
- **RadialBarChart** - Radial bar charts
- **RadialGauge** - Radial gauge visualization
- **RadialScatterPlot** - Radial scatter plots
- **Sankey** - Sankey flow diagrams
- **ScatterPlot** - Scatter plot charts
- **Sparkline** - Compact inline charts
- **SunburstChart** - Hierarchical sunburst
- **TreeMap** - Hierarchical treemap
- **VennDiagram** - Venn and Euler diagrams
- **WordCloud** - Word cloud visualization

## Code Conventions

### Component Architecture

1. **Functional Components**: All components use React functional components with hooks
2. **TypeScript**: Full TypeScript with explicit prop interfaces
3. **Props Pattern**: Components define a Props interface (e.g., `BarChartProps`) extending base types
4. **Default Props**: Use `mergeDefaultProps()` utility with a `*_DEFAULT_PROPS` constant

```tsx
// Standard component structure
export interface BarChartProps extends ChartProps {
  data: ChartDataShape[];
  series: ReactElement<BarSeriesProps, typeof BarSeries>;
  // ... other props with JSDoc comments
}

export const BarChart: FC<Partial<BarChartProps>> = (props) => {
  const { data, series, ... } = mergeDefaultProps(BAR_CHART_DEFAULT_PROPS, props);
  // Component implementation
};

const BAR_CHART_DEFAULT_PROPS = {
  data: [],
  series: <BarSeries />,
  // ... defaults
};
```

### Import Conventions

- Use `@/` path alias for `src/` imports (configured in tsconfig.json)
- Prefer named exports over default exports
- Use barrel exports (`index.ts`) for each module

```tsx
import { BarSeries, Bar, BarLabel } from '@/BarChart/BarSeries';
import { ChartContainer } from '@/common/containers/ChartContainer';
```

### Styling

- **CSS Modules**: Use `*.module.css` files for component styles
- **Type Declarations**: Create `*.module.css.d.ts` files for CSS module types
- **Class Composition**: Use `classnames` package for conditional classes
- **CSS Variables**: Use CSS custom properties for theming (e.g., `--color-background`)

```tsx
import css from './BarChart.module.css';
import classNames from 'classnames';

className={classNames(css.barChart, className, css[seriesProps.type])}
```

### Animation

- Use **Motion** (motion/react) for animations
- Import `DEFAULT_TRANSITION` from `@/common/Motion`
- Support `animated` prop to enable/disable animations

### JSDoc Comments

Document all public props with JSDoc comments:

```tsx
/**
 * Data the chart will receive to render.
 */
data: ChartDataShape[];

/**
 * D3 scale for X Axis. Set internally by `BarChart`.
 */
xScale: any;
```

## Story File Conventions

Stories use Storybook v9 with CSF format:

```tsx
// BarChartVertical.story.tsx
import { BarChart } from './BarChart';
import { categoryData } from 'reaviz-data-utils';

export default {
  tags: ['snapshot'],  // Enable visual regression tests
  title: 'Charts/Bar Chart/Vertical/Single Series',
  component: BarChart,
  subcomponents: { BarSeries, Bar, BarLabel }
};

export const Simple = () => (
  <BarChart width={400} height={350} data={categoryData} />
);

export const CustomStyle = () => (
  // Story implementation
);
```

- **Title**: Use hierarchical path format (`Charts/Bar Chart/Vertical/Single Series`)
- **Data**: Import sample data from `reaviz-data-utils` package
- **Tags**: Add `['snapshot']` for visual regression testing

## Testing Conventions

- **Test Framework**: Vitest with jsdom environment
- **Test Files**: `*.test.ts` or `*.test.tsx` in same directory as source
- **Snapshots**: Store in `__snapshots__/` directory
- **Visual Tests**: Storybook test-runner for visual regression

```typescript
// Example test structure
import { describe, it, expect } from 'vitest';
import { formatValue } from './formatting';

describe('formatValue', () => {
  it('should format numbers correctly', () => {
    expect(formatValue(1000)).toBe('1K');
  });
});
```

## Key Dependencies

### Core Libraries
- **React** (>=16) - UI rendering
- **D3.js modules** - Scales, shapes, calculations (d3-scale, d3-shape, d3-hierarchy, etc.)
- **Motion** (motion/react) - Animations

### Utilities
- **chroma-js** - Color manipulation
- **classnames** - CSS class composition
- **reablocks** - Component utilities (CloneElement)
- **reaviz-data-utils** - Sample data and data utilities

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/build.yml`) runs:
1. Install dependencies
2. Lint (`npm run lint`)
3. Build production (`npm run build`)
4. Build Storybook (`npm run build-storybook`)
5. Test with coverage (`npm run test:ci`)

## Common Patterns

### CloneElement Pattern

Use `CloneElement` from `reablocks` to pass props to child elements:

```tsx
<CloneElement<BarSeriesProps>
  element={series}
  id={`bar-series-${id}`}
  data={aggregatedData}
  height={chartHeight}
  width={chartWidth}
/>
```

### Scale Generation

Scales are generated using utilities in `@/common/scales`:

```tsx
import { getXScale, getYScale } from '@/common/scales';

const xScale = getXScale({ width, type, data, padding, domain });
const yScale = getYScale({ height, type, data, domain });
```

### Data Transformation

Transform data using utilities in `@/common/data`:

```tsx
import {
  buildBarStackData,
  buildShallowChartData,
  buildNestedChartData
} from '@/common/data';
```

## Formatting Standards

- **Prettier**: Single quotes, semicolons, no trailing commas, 80 char width
- **ESLint**: React/hooks rules, TypeScript parser
- **Line Endings**: Unix (LF)
- **Indentation**: 2 spaces

## Adding a New Chart Type

1. Create directory `src/NewChart/`
2. Create main component `NewChart.tsx` with props interface
3. Create barrel export `index.ts`
4. Add CSS module `NewChart.module.css` if needed
5. Create stories `NewChart.story.tsx`
6. Export from `src/index.ts`
7. Add tests if applicable

## Important Notes for AI Assistants

1. **Path Alias**: Always use `@/` for imports from `src/`
2. **Exports**: All new public APIs must be exported from the chart's `index.ts` and from `src/index.ts`
3. **Props**: All props should have JSDoc documentation
4. **Defaults**: Use the `*_DEFAULT_PROPS` pattern with `mergeDefaultProps()`
5. **Stories**: Include at least one basic story for visual documentation
6. **Type Safety**: Avoid `any` types where possible; use proper TypeScript interfaces
7. **Animations**: Respect the `animated` prop pattern for enabling/disabling animations
8. **Accessibility**: Include proper ARIA labels and roles where applicable
