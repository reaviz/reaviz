import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, join, basename, extname } from 'path';

const SITE_URL = 'https://reaviz.dev';

/**
 * Chart types with their URL slugs and short descriptions.
 */
const CHARTS = [
  ['AreaChart', 'area-chart', 'Single/multi-series area charts with stacking and interpolation'],
  ['BarChart', 'bar-chart', 'Vertical/horizontal, grouped, stacked, waterfall, marimekko, histogram'],
  ['BarList', 'bar-list', 'Simple horizontal bar lists for rankings'],
  ['BubbleChart', 'bubble-chart', 'Scatter-based bubble visualizations'],
  ['FunnelChart', 'funnel-chart', 'Conversion funnel visualizations'],
  ['Heatmap', 'heatmap', 'Calendar and matrix heatmaps'],
  ['LineChart', 'line-chart', 'Single/multi-series line charts'],
  ['LinearGauge', 'linear-gauge', 'Linear gauge/progress indicators'],
  ['Map', 'map', 'Geographic map visualizations'],
  ['Meter', 'meter', 'Meter/progress visualizations'],
  ['PieChart', 'pie-chart', 'Pie and donut charts'],
  ['RadarChart', 'radar', 'Radar/spider charts'],
  ['RadialAreaChart', 'radial-area-chart', 'Radial area visualizations'],
  ['RadialBarChart', 'radial-bar-chart', 'Radial/circular bar charts'],
  ['RadialGauge', 'radial-gauge', 'Radial gauge indicators'],
  ['RadialScatterPlot', 'radial-scatter-plot', 'Polar scatter plots'],
  ['Sankey', 'sankey-plot', 'Flow/sankey diagrams'],
  ['ScatterPlot', 'scatter-plot', 'Scatter/bubble plots'],
  ['Sparkline', 'spark-line', 'Inline sparkline charts'],
  ['SunburstChart', 'sunburst-chart', 'Hierarchical sunburst visualizations'],
  ['TreeMap', 'tree-map', 'Hierarchical treemap visualizations'],
  ['VennDiagram', 'venn-diagram', 'Set intersection diagrams'],
  ['WordCloud', 'word-cloud', 'Word/tag cloud visualizations']
];

const UTILS = [
  ['Axis', 'axis', 'Axis configuration and customization'],
  ['Brush', 'brush', 'Selection brush for zooming'],
  ['Gridlines', 'grid-lines', 'Chart gridlines'],
  ['Legends', 'legends', 'Chart legends'],
  ['Tooltips', 'tooltips', 'Tooltip customization'],
  ['Zoom Pan', 'zoom-pan', 'Zoom and pan controls'],
  ['Gradient', 'gradient', 'SVG gradient fills'],
  ['Glow', 'glow', 'Glow effects'],
  ['Mark Line', 'mark-line', 'Reference/threshold lines'],
  ['Mask', 'mask', 'SVG masking and patterns'],
  ['Value Marker', 'value-marker', 'Value annotation markers'],
  ['Count', 'count', 'Animated count displays']
];

const BLOCKS = [
  ['Area Chart Blocks', 'area-chart', 'Ready-to-use area chart compositions'],
  ['Bar Chart Blocks', 'bar-chart', 'Ready-to-use bar chart compositions'],
  ['Funnel Chart Blocks', 'funnel-chart', 'Ready-to-use funnel compositions'],
  ['Heatmap Blocks', 'heatmap', 'Ready-to-use heatmap compositions'],
  ['Scatter Plot Blocks', 'scatter-plot', 'Ready-to-use scatter compositions']
];

/**
 * Recursively find all .tsx files in a directory (excluding stories and tests).
 */
function findComponentFiles(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory() && entry !== 'node_modules' && entry !== 'dist') {
        results.push(...findComponentFiles(fullPath));
      } else if (
        stat.isFile() &&
        entry.endsWith('.tsx') &&
        !entry.includes('.story.') &&
        !entry.includes('.test.')
      ) {
        results.push(fullPath);
      }
    }
  } catch {
    // ignore errors
  }
  return results;
}

/**
 * Extract props interface and JSDoc comments from a component file.
 */
function extractProps(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const interfaceRegex = /export interface (\w+Props)\s*(?:extends\s+[\w<>,\s]+)?\s*\{([\s\S]*?)^\}/m;
    const match = content.match(interfaceRegex);
    if (match) {
      return {
        name: match[1],
        body: match[0]
      };
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Extract the first story example from a story file.
 */
function extractFirstStory(chartDir) {
  try {
    const entries = readdirSync(chartDir);
    const storyFile = entries.find(
      (e) => e.endsWith('.story.tsx') && !e.includes('Multi')
    ) || entries.find((e) => e.endsWith('.story.tsx'));

    if (!storyFile) return null;

    const content = readFileSync(join(chartDir, storyFile), 'utf-8');

    // Try to find the first exported const that returns JSX
    const exportRegex = /export const \w+ = \(\) => \(([\s\S]*?)\);/;
    const match = content.match(exportRegex);
    if (match) {
      return match[1].trim();
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Generate the concise llms.txt index file.
 */
function generateLlmsTxt() {
  let output = `# REAVIZ

> A modular, enterprise-grade data visualization library for React built on D3. 22+ chart types with native React rendering, Motion animations, full customization via JSX props, and accessibility support. Apache-2.0 licensed.

- Built on D3 for calculations, React for rendering — not a wrapper
- Every chart element accepts JSX props for deep customization
- Ships with 50+ pre-built Blocks (composable chart patterns)
- Motion-powered animations out of the box
- Supports TypeScript natively
- Install: \`npm i reaviz\`
- Compared to recharts/nivo: reaviz offers more chart variety (sankey, heatmap, venn, radial gauges, treemap, sunburst, word cloud) with lower-level customization access

## Docs

- [Getting Started](${SITE_URL}/docs/getting-started/setup): Installation and basic setup
- [Why REAVIZ](${SITE_URL}/docs/getting-started/why): Comparison and rationale
- [Data Shapes](${SITE_URL}/docs/getting-started/data): How to structure data for charts
- [Custom Charts](${SITE_URL}/docs/getting-started/custom-charts): Building custom visualizations
- [Colors](${SITE_URL}/docs/getting-started/colors): Color scheme configuration
- [Developing](${SITE_URL}/docs/getting-started/developing): Local development guide
- [Migration](${SITE_URL}/docs/getting-started/migration): Migration guide for major versions

## Charts
`;

  for (const [name, slug, desc] of CHARTS) {
    output += `- [${name.replace(/([A-Z])/g, ' $1').trim()}](${SITE_URL}/docs/charts/${slug}): ${desc}\n`;
  }

  output += `\n## Utils\n`;
  for (const [name, slug, desc] of UTILS) {
    output += `- [${name}](${SITE_URL}/docs/utils/${slug}): ${desc}\n`;
  }

  output += `\n## Blocks\n`;
  output += `- [Blocks Introduction](${SITE_URL}/blocks): Pre-built composable chart patterns\n`;
  for (const [name, slug, desc] of BLOCKS) {
    output += `- [${name}](${SITE_URL}/blocks/charts/${slug}): ${desc}\n`;
  }

  output += `
## Related Libraries

- [Reagraph](https://reagraph.dev): Network graph visualizations for React (WebGL)
- [Reaflow](https://reaflow.dev): Workflow and diagram editor for React
- [Reablocks](https://reablocks.dev): Tailwind-based React component library
- [Reachat](https://reachat.dev): LLM/Chat UI components for React

## Links

- [GitHub](https://github.com/reaviz/reaviz)
- [npm](https://www.npmjs.com/package/reaviz)
- [Storybook](https://storybook.reaviz.dev)
- [Changelog](${SITE_URL}/docs/changelog)
- [Support](${SITE_URL}/docs/support)
`;

  return output;
}

/**
 * Generate the comprehensive llms-full.txt file.
 * Reads from the existing hand-crafted file if available,
 * or builds a basic version from source.
 */
function generateLlmsFullTxt() {
  const existingPath = resolve('public', 'llms-full.txt');
  try {
    const existing = readFileSync(existingPath, 'utf-8');
    if (existing.length > 1000) {
      console.log('Using existing llms-full.txt (hand-crafted version)');
      return existing;
    }
  } catch {
    // File doesn't exist yet, generate from scratch
  }

  // Fallback: generate a basic version from source code
  let output = generateLlmsTxt();
  output += '\n---\n\n';
  output += '## Component Props Reference\n\n';

  const srcDir = resolve('src');
  for (const [name, slug] of CHARTS) {
    const chartDir = join(srcDir, name);
    try {
      statSync(chartDir);
    } catch {
      continue;
    }

    const files = findComponentFiles(chartDir);
    const mainFile = files.find(
      (f) => basename(f) === `${name}.tsx`
    );

    if (mainFile) {
      const props = extractProps(mainFile);
      if (props) {
        output += `### ${name}\n\n`;
        output += '```typescript\n';
        output += props.body + '\n';
        output += '```\n\n';
      }
    }
  }

  return output;
}

// Main
const llmsTxt = generateLlmsTxt();
const llmsFullTxt = generateLlmsFullTxt();

writeFileSync(resolve('public', 'llms.txt'), llmsTxt);
console.log('Generated public/llms.txt');

writeFileSync(resolve('public', 'llms-full.txt'), llmsFullTxt);
console.log('Generated public/llms-full.txt');
