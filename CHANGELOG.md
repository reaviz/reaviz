# 16.0.12 - 9/30/25
- [fix] Fix generating key for ScatterSeries points #302

# 16.0.11 - 9/30/25
- [fix] Fix PieArc path initial value

# 16.0.10 - 9/26/25
- [fix] Add ellipsisLength property to LinearAxisTickSeries component #301

# 16.0.9 - 9/11/25
- [fix] Update reablocks to fix Pie arc override functionality

# 16.0.7 - 8/11/25
- [fix] Fix the flickering of the calendar heatmap when changing tickSize prop

# 16.0.6 - 7/31/25
- [improvement] Add ability to pass custom styles of the path to PieArc component #293

# 16.0.5 - 7/17/25
- [fix] Remove default props for RadialBarSeries and RadialBar

# 16.0.4 - 3/26/25
- [improvement] Add ability to change pointer event for Area #287

# 16.0.3 - 2/14/25
- [improvement] Update reablocks and motion

# 16.0.2 - 1/21/25

- [chore] Update venn.js dependency #283

# 16.0.1 - 1/16/25

- [improvement] Motion upgrade #282

# 16.0.0 - 1/14/25

- [improvement] Updates to get rid of using deprecated default props

# 15.19.1 - 1/13/25

- [fix] fix export of word cloud

# 15.19.0 - 12/23/24

- [feature] word cloud

# 15.18.5 - 8/2/24

- [fix] Fix tooltip blinking #243

# 15.18.4 - 7/24/24

- [fix] Fix HeatmapCalendar not showing all data #238

# 15.18.3 - 6/13/24

- [chore] Add JSDocs for GuideBar #235

# 15.18.2 - 6/13/24

- [fix] fix tooltip position issue after scroll related reablocks #234

# 15.18.1 - 6/12/24

- [chore] fix old depedency for resize observer

# 15.18.0 - 6/12/24

- [improvement] update reablocks [popper.js to floating-ui]

# 15.17.4 - 6/12/24

- [fix] test using cjs for resize observer for webpack

# 15.17.3 - 6/7/24

- [fix] fix resize not working on SSR

# 15.17.2 - 6/5/24

- [fix] improve sunburst sizing

# 15.17.1 - 6/4/24

- [feature] Add more light funnel blocks #231

# 15.17.0 - 6/3/24

- [feature] reaviz blocks!

# 15.16.0 - 6/3/24

- [feature] Sunburst chart #225
- [chore] expanded `NestedDataShape` to allow for infinite nesting

# 15.15.7 - 5/31/24

- [improvement] update lib to generate docs #228
- [chore] use date-fns instead moment #227

# 15.15.6 - 5/30/24

- [chore] extract demo data to separate repo #226

# 15.15.5 - 5/29/24

- [fix] fix paths for types

# 15.15.4 - 5/29/24

- [chore] upgrade deps
- [chore] publish stories and docs
- [chore] repath files

# 15.15.3 - 5/9/24

- [feature] add format title on hover label #218

# 15.15.2 - 4/22/24

- [fix] Upgrade reablocks #220

# 15.15.1 - 4/22/24

- [fix] Update reablocks #217
- [chore] Replace rdk #215
- [chore] Upgrade reablocks #214

# 15.15.0 - 4/8/24

- [feature] added vertical line support for charts #212
- [fix] fix labels off by `5px` in some scenarios #213

# 15.14.0 - 4/2/24

- [feature] Add opacity to glow #210

# 15.13.1 - 4/2/24

- [improvement] Improve bar glow #209

# 15.13.0 - 4/1/24

- [feature] Add SequentialLegend gradient element styling #208
- [fix] Fix heatmap cell styling #207

# 15.12.0 - 3/28/24

- [feature] Add custom symbols for heatmap cells #206
- [fix] Fix bar charts visual regression #205

# 15.11.0 - 3/26/24

- [feature] Add Line glow #204
- [improvement] Improve multi-series area chart glow #203

# 15.10.0 - 3/26/24

- [feature] Add glow to area chart #202

# 15.9.5 - 3/26/24

- [fix] Fix bar chart tooltip hover accuracy #201

# 15.9.4 - 3/26/24

- [feature] #198 Separate textProps for RadialAxisTickLabel text properties

# 15.9.2 - 3/25/24

- [feature] add support format for bubble chart

# 15.9.1 - 3/13/24

- [fix] fix bubble chart with icons

# 15.9.0 - 3/5/24

- [feature] add support for categorical data in radial scatter

# 15.8.1 - 2/28/24

- [chore] update deps

# 15.8.0 - 2/27/24

- [feature] add value markers for linear/radial line/area/bar/scatter #193

# 15.7.2 - 2/22/24

- [fix] Hide axis until chart became visible to avoid blinking #191

# 15.7.1 - 2/15/24

- [fix] Fix disappearing points on hover #189

# 15.7.0 - 2/5/24

- [feature] Gradient support for Line chart #186

# 15.6.2 - 1/22/24

- [fix] fix sankey on light mode
- [chore] upgrade depedencies

# 15.6.1 - 1/22/24

- [fix] improve default outline
- [chore] upgrade depedencies
- [chore] improve some area chart demos

# 15.6.0 - 12/29/23

- [feature] Accessibility features for Line/Area/Radial charts #184

# 15.5.0 - 12/29/23

- [chore] Added posthog
- [feature] Accessibility features #182 #183

# 15.4.0 - 12/20/23

- [feature] Heatmap: Add colorScheme callback function support #181

# 15.3.0 - 12/19/23

- [fix] Fix pie chart animation #180
- [feature] Add stroke and glow to Heatmaps #179

# 15.2.1 - 12/15/23

- [chore] upgrade reablocks and rdk

# 15.2.0 - 12/14/23

- [chore] upgrade framer-motion to latest
- [fix] fix pie chart initial animation
- [fix] fix radial bar chart delay
- [fix] fix animation jumping issue

# 15.1.1 - 12/12/23

- [fix] Fix venn diagram label fill #177

# 15.1.0 - 12/12/23

- [feature] Add venn diagram glow #176

# 15.0.0 - 12/12/23

- [BREAKING] Add funnel chart glow #175

To migrate to 15.x you will need to replace all usage of the `Glow` component with the `Glow` interface. See the updated API documentation in storybook for more details.

# 14.15.4 - 12/8/23

- [fix] Fix bubble chart styling props #174

# 14.15.3 - 12/8/23

- [feature] Add radial gradients #173

# 14.15.2 - 12/6/23

- [feature] RadialGauge min/max value array support #172

# 14.15.1 - 12/5/23

- [fix] Fix jittering chart animations when updating data quickly #171

# 14.15.0 - 11/27/23

- [feature] Add ability to build Stacked arcs for StackedRadialGaugeSeries #169

# 14.14.5 - 10/27/23

- [fix] fix RadialChartAxisLabel autoRotate and alignment logic

# 14.14.4 - 10/17/23

- [fix] long FunnelChart labels crashing UI #158

# 14.14.3 - 10/17/23

- [feature] Add positioning and conditional display to FunnelChart labels #157

# 14.14.2 = 10/12/23

- [fix] Get FunnelChart click to work without a tooltip #155
- [fix] radial tick callback fix #156

# 14.14.1 = 10/12/23

- [feature] Radial Axis Tick Series: Callback with index for tick element #154

# 14.14.0 - 10/11/23

- [feature] funnel chart tooltips #149
- [feature] funnel chart click event handler #149
- [fix] fix area chart animation too fast #151
- [fix] fix radial bar chart animation too fast #151
- [fix] increase default inner radius on radial bar charts #153

# 14.13.0 - 10/4/23

- [feature] Multiseries support in Radial Bar Charts #148

# 14.12.0 - 10/3/23

- [feature] Custom angles in Radial Bar Chart #147

# 14.11.1 - 9/28/23

- [fix] Fix null tooltip ref #144

# 14.11.0 - 9/28/23

- [feature] Generic Radial chart for all start and end angles with open/closed curve options #144
- [chore] upgrade reablocks

# 14.10.1 - 9/20/23

- [fix] fix errors related to types with fc conversion
- [fix] fix ids not being passed down for gauges

# 14.10.0 - 9/18/23

- [feature] add gradient to pie, donut and radial gauge
- [fix] fix padding on axis #140
- [chore] more fc conversions #138 #137
- [chore] upgrade storybook

# 14.9.8 - 9/7/23

- [chore] convert linear axis to fc

# 14.9.7 - 8/18/23

- [improvement] add node sort option to sankey #47

# 14.9.6 - 8/15/23

- [chore] upgrade dpes
- [chore] move to npm over yarn

# 14.9.5 - 7/17/23

- [fix] Sankey: labels should fit within the total width #133

# 14.9.4 - 7/12/23

- [fix] TreepMapLabel: Update nowrap label width #134

# 14.9.3 - 7/12/23

- [fix] Calculate TreeMapLabel width based on nowrap value #132

# 14.9.2 - 7/10/23

- [feature] Barlist support for percentage values #131

# 14.9.1 - 7/3/23

- [fix] fix typescript exports

# 14.9.0 - 7/3/23

- [feature] add `layered` as `variant` for Funnel Charts
- [feature] opacity animation on funnel charts
- [fix] hide first axis line on funnel charts

# 14.8.0 - 7/3/23

- [feature] Glow filters for Bar, Scatter and Bubble
- [chore] Improve docs on gradient/masks
- [chore] update deps

# 14.7.4 - 6/14/23

- [chore] change calculateSize from canvas to dom measuring

# 14.7.3 - 6/14/23

- [chore] rewrite calculateSize for webpack :()

# 14.7.2 - 6/14/23

- [chore] improve build output

# 14.7.1 - 6/13/23

- [chore] improving funnel imports

# 14.7.0 - 6/12/23

- [feature] funnel chart

# 14.6.1 - 6/7/23

- [fix] fix exports
- [chore] upgrade some deps

# 14.6.0 - 6/5/23

- [chore] migrate to vite library
- [chore] upgrade storybook
- [chore] upgrade major dep

# 14.5.0 - 5/26/23

- [feature] Add optional supporting text field for Stacked Gauge #122

# 14.4.5 - 5/17/23

- [fix] better handle undefined rects

# 14.4.4 - 5/17/23

- [fix] fix textcontent check in count

# 14.4.3 - 5/17/23

- [fix] add null check to `useCount` hook
- [feature] add prefix/suffix to Count component

# 14.4.2 - 5/1/23

- [fix] fix wrapping in treemap not working as expected
- [fix] fix treemap dupe ids

# 14.4.1 - 5/1/23

- [feature] add label positions to treemap
- [feature] add padding options to treemap

# 14.4.0 - 4/30/23

- [feature] Nested Tree map #119

# 14.3.1 - 4/27/23

- [fix] add hover intent for venn/sankey/pie/heatmap/bubble
- [fix] fix pie chart hover jumping

# 14.3.0 - 4/27/23

- [feature] add `useChart` hook for accessing chart props
- [fix] export scales

# 14.2.5 - 4/21/23

- [fix] fix format type

# 14.2.4 - 4/21/23

- [feature] add `format` callback to sankey labels

# 14.2.3 - 4/21/23

- [fix] improve types for sankey nodes/links

# 14.2.2 - 4/18/23

- [fix] improve sankey tooltip type

# 14.2.1 - 4/16/23

- [feature] add shortcut method for Radar Chart #116

# 14.2.0 - 4/16/23

- [feature] Meter #117

# 14.1.0 - 4/16/23

- [feature] Radar Chart #116

# 14.0.16- 4/14/23

- [fix] CalendarHeatMap crashing with empty data #115

# 14.0.15- 4/14/23

- [chore] upgrade reablocks

# 14.0.13/14.0.14 - 4/13/23

- [chore] upgrade reablocks / rdk

# 14.0.12 - 4/11/23

- [fix] fix sankey labels not highlighting correctly
- [fix] improve sankey highlighting
- [chore] export sankey types better

# 14.0.11 - 4/11/23

- [improvement] sankey opacity on initial render fix
- [chore] upgrade reablocks

# 14.0.10 - 4/10/23

- [improvement] add ability to use link colors on links

# 14.0.9 - 4/10/23

- [improvement] added ability to set node label position
- [chore] convert sankey to fc

# 14.0.8 - 4/10/23

- [fix] fix sankey tooltip not accepting null

# 14.0.7 - 4/10/23

- [fix] upgrade rdk/reablocks

# 14.0.6 - 3/22/23

- [fix] Bar List All zeros #114

# 14.0.5 - 3/19/23

- [improvement] add bar list sorting
- [improvement] add bar list label formatting

# 14.0.4 - 3/19/23

- [improvement] add bar list label positioning

# 14.0.3 - 2/20/23

- [fix] Tooltip missing colors in Line/Area Series #113

# 14.0.1/14.0.2 - 1/31/23

- [chore] upgrade reablocks

# 14.0.0 - 1/31/23

- [BREAKING] removed hive plot
- [BREAKING] rename CSS variables to align with other standards ( deprecated but will be removed in next major release )
- [chore] migrate from realayers to reablocks
- [chore] upgraded framer-motion to v8

To migrate to 14.x, you will need to rename your CSS variables. Here is
what they look like today:

```css
--color-background:

rgb
(
51
,
51
,
51
)
;
--color-on-background: #fff

;

--color-tooltip:

rgba
(
0
,
5
,
11
,
0.9
)
;
--color-on-tooltip: #fff

;

--color-handle-fill: #2c343a

;
--color-handle-stroke: #67c2e4

;
--color-handle-drag-fill: transparent

;
--color-handle-dots: #67c2e4

;
--color-handle-line: #67c2e4

;
```

Here is what they need to be renamed to:

```css
--tooltip-background:

rgba
(
0
,
5
,
11
,
0.9
)
;
--tooltip-color: #fff

;
--tooltip-border-radius:

5
px

;
--tooltip-spacing:

5
px

;

--chart-background:

rgb
(
51
,
51
,
51
)
;
--chart-color: #fff

;

--chart-handle-fill: #2c343a

;
--chart-handle-stroke: #67c2e4

;
--chart-handle-drag-fill: transparent

;
--chart-handle-dots: #67c2e4

;
--chart-handle-line: #67c2e4

;
```

# 13.3.2 - 11/30/22

- [fix] ignore onMoveStart and onMove if brush is disabled #100

# 13.3.1 - 11/30/22

- [fix] fix disabled brush crashing when clicking on bar #99

# 13.3.0 - 11/21/22

- [chore] upgrade framer-motion
- [chore] upgrade rdk
- [chore] upgrade realayers

# 13.2.1 - 11/15/22

- [feature] bar list label improvements and formatting

# 13.2.0 - 11/14/22

- [feature] bar list component

# 13.1.14 - 11/08/22

- [improvement] add ability to pass natural-earth projection to map #90

# 13.1.13 - 10/14/22

- [fix] Disabled based on aggregated data #93
- [fix] fix storybook mdxjs failing

# 13.1.12 - 10/11/22

- [fix] revert esm fix #89
- [chore] upgrade storybook

# 13.1.11 - 10/11/22

- [fix] Fix esm output #89
- [fix] improve wrapText() and added a treemap example with long label texts #91

# 13.1.10 - 9/29/22

- [fix] Fix esm import #87
- [chore] upgrade rdk/realayers

# 13.1.9 - 9/21/22

- [fix] Fix CalendarHeatmap series prop not passed into Heatmap #85

# 13.1.8 - 8/30/22

- [fix] Fix the x and y offset for chartContainer #84

# 13.1.7 - 8/28/22

- [fix] Fix bar chart brush on categorical scales #83

# 13.1.6 - 8/1/22

- [fix] fix `BarLabel` props not partial
- [fix] remove knobs from heatmap stories due to errors
- [fix] fix rx/ry not being passed to heatmap cells
- [style] update padding from 0.1 to 0.3 on heatmaps
- [chore] upgrade realayers

# 13.1.5 - 7/20/22

- [fix] fix transform-matrix nested type build error #79

# 13.1.4- 6/15/22

- [improvement] add ability to pass fill to radial gauge arc
- [improvement] make radial gauge arc outer component for easier use
- [chore] cleanup radial gauge folder structure

# 13.1.3- 5/30/22

- [fix] passdown container classname
- [chore] migrate radial bar chart to fc

# 13.1.2 - 5/30/22

- [feature] add ability to pass className to chart container
- [chore] improve style and classname types for chart container

# 13.1.1 - 5/12/22

- [feature] add classname to count

# 13.1.0 - 5/12/22

- [feature] add new count component and remove countup

# 13.0.11 - 5/10/22

- [chore] bump rdk / realayers

# 13.0.10 - 5/9/22

- [fix] fix rounding bug in svg bars - https://github.com/framer/motion/issues/1513

# 13.0.9 - 4/25/22

- [fix] Area graph with single value fills available area #69

# 13.0.8 - 4/13/22

- [fix] fix multi dimensional bar charts throwing dupe key
- [chore] improve linear gauge memo usage
- [chore] update framer-motion
- [chore] fix issue with circle offset going in circles 😂

# 13.0.7 - 4/12/22

- [fix] fix metadata not transposed to stack data

# 13.0.6 - 4/12/22

- [fix] linear gauge outer bar not nullable

# 13.0.5 - 4/11/22

- [chore] migrate gridlines to fc
- [feature] add classname to grid stripe and grid line
- [fix] move dash array to prop vs css

# 13.0.4 - 4/7/22

- [fix] lock calculate-size due to errors

# 13.0.3 - 4/7/22

- [fix] improve legend padding and migrate to fc

# 13.0.2 - 4/7/22

- [fix] improve radial gauge padding issues

# 13.0.1 - 4/6/22

- [chore] fix framer-motion imports
- [chore] bump rdk/realayers

# 13.0.0 - 4/4/22

- [chore] upgrade react
- [chore] upgrade framer-motion

# 12.2.1 - 3/30/22

- [fix] use strokeWidth prop for line element #68
- [chore] migrate LinearAxisLine to FC

# 12.2.0 - 2/28/22

- [chore] migrate line components to fc
- [chore] migreate area components to fc

# 12.1.0 - 1/4/21

- [chore] migrate bar chart components to fc

# 12.0.0 - 1/3/21

- [BREAKING] CSS Variable updates for Tooltip. `--color-on-tooltip` is used instead of `--color-on-background`.
- [BREAKING] CSS variable updates for Brush. Updated CSS variables for brush.

```
--color-handle-fill: #2c343a;
--color-handle-stroke: #67c2e4;
--color-handle-drag-fill: transparent;
--color-handle-dots: #67c2e4;
--color-handle-line: #67c2e4;
```

- [chore] migrate `BarChart` to fc
- [chore] add hook eslint rules

# 11.1.2 - 11/3/21

- [chore] update deps
- [fix] revert countup es modules
- [chore] migrate Radial Scatter Plot to fc
- [chore] migrate Scatter Plot to fc
- [chore] migrate Pie Chart to fc
- [chore] migrate Linear Gauge to fc
- [chore] migrate Radial Gauge to fc
- [chore] migrate Venn Diagram default props
- [chore] migrate Heatmap default props
- [chore] migrate TreeMap default props
- [chore] migrate Sparkline to default props
- [chore] migrate ChartTooltip to default props
- [chore] migrate Mask to fc
- [chore] migrate Stripes to fc

# 11.1.1- 9/28/21

- [improvement] add color inversion to Venn and Bubble charts
- [fix] handle non-hex colors better in inversion
- [fix] darken colors just a bit to try and normalize to same color
- [fix] apply default transition to bubble chart
- [fix] apply default transition to treemap chart
- [fix] fix bubble label and arc not getting animated props
- [fix] apply default transition to venn diagram
- [docs] add components to storybook CSF docs

# 11.1.0 - 9/27/21

- [feature] treemap chart
- [improvement] enhance wrap text fn to account for height + paddings

# 11.0.3 - 9/22/21

- [chore] update rdk and realayers

# 11.0.2 - 9/21/21

- [chore] update rdk and realayers

# 11.0.1 - 9/21/21

- [chore] update realayers for better tooltips
- [chore] csf storybook conversion

# 11.0.0 - 9/17/21

- [BREAKING] 10.4.1 introduced d3-\* modules with have ESM. You now need to have ESM module compilation. See https://github.com/reaviz/reaviz/issues/48
- [fix] fix venn diagram number label errors
- [fix] fix area series empty array errors

# 10.4.4 - 9/10/21

- [chore] revert esnext build target

# 10.4.3 - 9/10/21

- [chore] npm outage retry

# 10.4.2 - 9/10/21

- [fix] bar charts throw `95640 Error: rect attribute height: Expected length, "NaNpx".`

# 10.4.1 - 9/8/21

- [chore] upgrade deps
- [chore] refactor heatmap series to FC

# 10.4.0 - 8/9/21

- [feature] add ability to customize bubble chart labels
- [fix] improve alignment of bubbles

# 10.3.1 - 7/9/21

- [chore] update rdk/realayers

# 10.3.0 - 6/18/21

- [feature] add gradient/mask to bubble chart

# 10.2.2

- [chore] upgrade realayer/rdk/deps

# 10.2.1

- [fix] fix missing export

# 10.2.0

- [feature] bubble chart

# 10.1.0

- [chore] upgrade realayer/rdk/deps

# 10.0.0

- [breaking] remove rounded corners from bar chart
- [fix] fix bar chart render issues
- [chore] migrate hivepolot to fc
- [chore] fix heatmap type issue
- [chore] update depedencies

# 9.5.5 - 1/22/21

- [chore] Fix peer depedency issue with framer-motion

# 9.5.4 - 12/18/2020

- [chore] Upgrade deps
- [chore] Cleanup deps

# 9.5.3 - 12/17/2020

- [Chore] Upgrade realayers and rdk

# 9.5.2 - 12/17/2020

- [Chore] Upgrade realayers and rdk
- [Chore] Nuke scss

# 9.5.1 - 11/30/20

- [Fix] Chart renders incorrectly when using StackedAreaChart with brush and zoom #21

# 9.5.0 - 11/23/20

- [Feature] Custom arcs in pie charts #22

# 9.4.3 - 11/20/20

- [Fix] Fix type issues

# 9.4.2 - 11/20/20

- [Fix] Fix type issues

# 9.4.1 - 11/20/20

- [Fix] Fix missing exports #19

# 9.4.0 - 11/20/20

- [Feature] Pie Chart Icons #10
- [Feature] Stacked Radial Gauge #18

# 9.3.14 - 11/14/20

- [Fix] Upgrade RDK for tooltip pointer events fix

# 9.3.13 - 11/4/20

- [Chore] Upgrade rdk and use clone element from rdk

# 9.3.12 - 11/2/20

- [Fix] Fix selections in venn not working correctly
- [Fix] Invalid keys being passed to arcs

# 9.3.11 - 11/2/20

- [Fix] Improve label icon positions in arc

# 9.3.10 - 11/2/20

- [Feature] Improve venn labels on star euler
- [Fix] Fix venn not matching w/ labels w/ spaces
- [Chore] Upgrade realayers

# 9.3.9 - 10/29/20

- [Feature] Add ability to pass elements as labels for outer labels of venn arc

# 9.3.8 - 10/29/20

- [Fix] Improve venn arc animations
- [Fix] Fix duplicate keys for selections in venn arcs

# 9.3.4/5/6/7 - 10/28/20

- [Fix] Improve venn arc layering

# 9.3.3 - 10/28/20

- [Feature] Add ability to pass managed selection states

# 9.3.2 - 10/27/20

- [Fix] Fix pie chart label lines #14

# 9.3.1 - 10/27/20

- [Fix] Improve arc/text positioning on active in venn diagram
- [Fix] Improve polyline coords calculation for PieArcLabel #12
- [Chore] Tweak default GridStripe default color to match better
- [Chore] FC Migrations ( Gridline, GridStripe )

# 9.3.0 - 10/22/20

- [Feature] Add custom colors for venn strokes
- [Feature] Custom label formatting for venn labels
- [Chore] Github Actions > CircleCI

# 9.2.11 - 10/21/20

- [Fix] Fix missing export of new label type

# 9.2.10 - 10/21/20

- [Feature] Add outer labels to star euler
- [Chore] Upgrade depedencies

# 9.2.9 - 10/21/20

- [Feature] Improve active/inactive/initial state options for venns
- [Chore] More FC migrations

# 9.2.8 - 10/20/20

- [Feature] Improve storybook stories for venn/euler
- [Feature] Hover on slice selects all similar slices
- [Fix] Fix star euler not laying out data correctly

# 9.2.7 - 10/19/20

- [Fix] Gradients not showing correct colors in venn arc
- [Chore] Move gradient to fc

# 9.2.6 - 10/19/20

- [Fix] Improve label position in venns

# 9.2.5 - 10/19/20

- [Feature] Add gradient to venns
- [Fix] Improve active opacity on venns

# 9.2.4 - 10/19/20

= [Fix] Fix star euler with complex data

# 9.2.3 - 10/19/20

= [Enhancement] Star euler non-matches now show value

# 9.2.2 - 10/19/20

- [Fix] Fix star euler not applying data correctly to layout

# 9.2.1 - 10/15/20

- [Fix] Fix stroke not passing through on arc of venn diagram

# 9.2.0 - 10/15/20

- [Feature] Star Euler Diagram
- [Feature] Add Venn Diagram Label Value Type

# 9.1.2 - 10/9/20

- [Fix] Fix sankey diagram links
- [Fix] Improve error handling of venn diagram
- [Chore] Refactor pie arc code
- [Chore] Upgrade depedencies

# 9.1.1 - 10/6/20

- [Feature] Euler Diagrams
- [Feature] Add show all labels for Venns
- [Fix] Make text labels always on top in Venns
- [Fix] Improve animation speed

# 9.0.2 - 10/5/20

- [Fix] Fix tooltip not moving with window scroll
- [Chore] Upgrade depedencies

# 9.0.1 - 10/1/20

- [Feature] Enable text wrapping on venn diagram
- [Bug] Fix text overlap on venn diagram

# 9.0.0 - 9/29/20

- [BREAKING] Rename CSS variables to be more specific
- [Feature] Venn Diagram
- [Bug] Fix flashing 0 on load
- [Bug] Fix broken bar chart brust story
- [Chore] Upgrade depedencies

# 8.3.0 - 9/16/20

- [Chore] Move Tooltip to shared library called realayers

# 8.2.0 - 8/23/20

- [Fix] Remove sizeme since its using deprecated APIs
- [Chore] Updated RDK

# 8.1.8 - 6/23/20

- [Bug] Fix docs not having styling
- [Chore] Upgrade framer-motion

# 8.1.7 - 6/21/20

- [Perf] Improve isEqual by moving to react-fast-compare
- [Chore] Upgrade transformation-matrix

# 8.1.6 - 6/20/20

- [Bug] Fix bar chart sort not animating
- [Bug] Fix type issues post upgrade of deps
- [Bug] Fix guide bar bug related to motion upgrade
- [Bug] Fix heatmap bug related to motion upgrade
- [Bug] Fix sankey bug related to motion upgrade

# 8.1.4/5 - 6/19/20

- [Chore] Upgrade to latest deps

# 8.1.3 - 5/4/20

- [Fix] Fix empty area charts blowing up

# 8.1.0 - 4/2/20

- [Feature] Add ability to use categorical scales with radial area/line chart
- [Fix] Fix non-zero errors in linear bar charts
- [Fix] Fix exceptions in pie chart
- [Fix] Fix exceptions in radial bar chart
- [Fix] Fix pie non-animated not working
- [Chore] Lots of FC Migration
- [Chore] Lots of dep upgrades

# 8.0.9 - 3/31/20

- [Chore] Upgrade RDK to latest

# 8.0.8 - 3/30/20

- [Fix] Add pointer events none to sankey tooltip
- [Chore] Upgrade RDK to latest

# 8.0.7 - 3/30/20

- [Chore] Upgrade RDK to latest

# 8.0.6 - 3/23/20

- [Chore] Upgrade RDK to latest

# 8.0.5 - 3/23/20

- [Chore] Upgrade RDK to latest

# 8.0.4 - 3/23/20

- [Chore] Upgrade RDK to latest

# 8.0.3 - 3/19/20

- [Chore] Upgrade RDK to latest

# 8.0.2 - 2/11/20

- [Fix] Fix bar charts https://github.com/framer/motion/issues/384

# 8.0.1 - 2/6/20

- [Chore] Upgrade deps

# 8.0.0 - 1/29/20

- [Breaking] Remove auto-binning from bar charts #118

# 7.2.3 - 1/15/20

- [Fix] Hover returns color object #76

# 7.2.2 - 12/2/19

- [Fix] Lock `is-equal` dep due to errors

# 7.2.1 - 12/2/19

- [Feature] Add `displayAllLabels` to `PieChart` component
- [Fix] Improve performance of `Tooltip`
- [Chore] Move more components to `FC`
- [Chore] Bump depepdencies

# 7.2.0 - 11/18/19

- [Feature] Add ability to have tooltip only show up on bar hover
- [Fix] Fix linear guage tooltip not working correctly

# 7.1.0 - 11/18/19

- [Feature] Guide Bar for Radial Bar Charts
- [Feature] Guide Bar for Linear Bar Charts
- [Feature] Add ability to pass `minHeight` to `Bar` component
- [Feature] Add `SonarChart` component and improve demo
- [Fix] Fix bug with not passing `metadata` in stacked charts
- [Fix] Increase `TooltipArea` padding by `5px`
- [Chore] Bump depepdencies
- [Chore] Move `Tooltip` to `FC`

# 7.0.2 - 11/14/19

- [Fix] Fix marmekko tooltip issue
- [Fix] Temp remove tooltip from linear gauge
- [Fix] Type issues and loops for clone element
- [Fix] Type issues with sparklines

# 7.0.1 - 11/14/19

- [Fix] Fix type issue with Babel TypeScript

# 7.0.0 - 11/14/19

- [BREAKING] Move `BarChart` to use `TooltipArea` vs `Tooltip` on each bar.
- [BREAKING] Created new `HistogramBarChart` to wrap common features of histograms
- [Feature] Add support for horizontal charts in `TooltipArea`
- [Feature] Added `onMouseMove` to `Bar` component

# 6.0.0 - 11/12/19

- [BREAKING] Move `RadialBarChart` to use `TooltipArea` vs `Tooltip` on each bar.
- [Fix] Default `RadialBarChart` to one color
- [Perf] Improve performance of `TooltipArea` data parsing using memoization
- [Chore] Remove unused state value from `RadialAreaSeries`
- [Docs] Add docs to `Tooltip`, `TooltipArea`, `TooltipTemplate`, `RadialPointSeries`

# 5.3.5 - 11/12/19

- [Fix] Fix area ponts not matching area color
- [Chore] Upgrade depedencies

# 5.3.4 - 10/31/19

- [Fix] Remove moment depedency for smaller size
- [Fix] Fix first/last padding on legend entries
- [Fix] Add ability to pass title attribute to legend entries
- [Fix] Update node-sass for Node 13
- [Fix] Update RDK which locks framer-motion

# 5.3.3 - 10/29/19

- [Fix] Lock `framer-motion` due to bugs with latest

# 5.3.2 - 10/29/19

- [Fix] Fix some import issues with new charts

# 5.3.1 - 10/29/19

- [Feature] Single-series linear gauge chart
- [Feature] Multi-series linear gauge chart
- [Feature] Add `strokeDasharray` to `Gridlines`
- [Fix] Allow placement passing for `Bar` components on `Tooltip`
- [Fix] Update some of the radial gauge components to `PureComponent`
- [Style] Tweak font size of legend entry

# 5.2.1 - 10/11/19

- [Fix] Fix some circular dep issues with new `BarLabel` component
- [Chore] Improve types for docs

# 5.2.0 - 10/10/19

- [Feature] Add bar labels
- [Fix] Tooltips for horizontal bar charts wrong
- [Fix] No delay for line charts line draw animations

# 5.1.1/2 - 10/8/19

- [WARNING] Renamed internal property `type` on `RangeLines` to `position`
- [Fix] Make Diverging Bar Chart animations come from center
- [Chore] Start Adding Docs with Sandboxes
- [Chore] Update deps

# 5.1.0 - 10/7/19

- [Feature] Add ability to pass secondary x/y axis to bar/area/scatter/line/heat
- [Feature] Add ability to pass in data to map and decouple it from build
- [Chore] Start adding new docs

# 5.0.2 - 10/3/19

- [Fix] Fix Map causing app crash [Issue #94](https://github.com/reaviz/reaviz/issues/94)
- [Fix] Fix Reaviz giving missing declaration file error after version update [Issue #95](https://github.com/reaviz/reaviz/issues/95)

# 5.0.1 - 10/3/19

- [Chore] Update depedencies
- [Chore] Minor TypeScript strict fixes
- [Chore] Add storybook title addon
- [Chore] More storybook improvements

# 5.0.0 - 10/1/19

- [BREAKING] Remove need to import CSS manually
- [BREAKING] Normalize `getColor` internal method and various code cleanups around that
- [Feature] Add color brewer schemes
- [Feature] Animate fill/size of scatter plot points
- [Fix] Fix BarSeries to generate the key in the same way as the id so that no duplicated keys are generated
- [Fix] Fixed Bar to use the color of rangeLines when it's provided
- [Fix] Fix overflow issue with storybook stories
- [Fix] Fix radial scatter plot story colors not working
- [Chore] Enhance storybook stories to allow color scheme selection
- [Chore] Bump RDK

# 4.2.1 - 9/30/19

- [Feature] Add ability to pass `rx`/`ry` to bars
- [Feature] Add ability to pass `minGaugeWidth` to Radial Gauge charts
- [Fix] Fix fill not transitioning
- [Chore] Improve bar/area/pie/line/heatmap/sankey demos

# 4.2.0 - 9/27/19

- [Feature] Updated `BarSeries` to be able to accept more than one `Bar` component for `Bar` customization
- [Fix] Fix gridlines not showing first lines when line is in middle
- [Fix] Fix diverging bar chart range lines not positioned correctly on negative axis
- [Fix] Fix diverging bar chart positive bar issue #91
- [Chore] Add storybook docs plugin
- [Chore] Add more storybook demos
- [Chore] Remove centered plugin in favor of custom solution that works with storybook docs
- [Chore] Update depedencies

# 4.1.0

- [Chore] Remove `react-transition-group` in favor of `framer-motion`
- [Chore] Update `rdk`

# 4.0.2

- [Fix] Improve performance on scatter points

# 4.0.1

- [Fix] Fix memory leaks in spring handlers
- [Fix] Fix line chart behind one change
- [Chore] Minor TypeScript strict fixes

# 4.0.0

- [BREAKING] Migrate from `react-pose` to `framer-motion`
- [BREAKING] Remove `decay` due to buggy behaviors
- [Fix] Fix update causing pie slices to resort
- [Fix] Fix for panning not working when not initial enabled

# 3.0.11

- [Fix] Fix diverging bar chart 0 bug
- [Chore] Bump RDK

# 3.0.10

- [Chore] Bump RDK

# 3.0.9

- [Chore] Shed lodash depedency

# 3.0.8

- [Chore] Add CJS and UMD build targets

# 3.0.7

- [Fix] Fix overlapping gridlines with axis lines
- [Fix] Fix document reference for NextJS

# 3.0.4 - 3.0.6

- [Fix] Fix navigator reference for NextJS

# 3.0.3

- [Fix] Improve some types

# 3.0.2

- [Fix] Various code style and lint fixes

# 3.0.1

- [Fix] Fix `transparent` throwing hover error
- [Fix] Fix calendar heatmap not working when start date is not start of year
- [Fix] Don't show tooltip for transparent heatmap cells

# 3.0.0

- [BREAKING] Update `meta` property on `ChartData` type to `metadata`
- [BREAKING] Update `TooltipArea` namespace to just `Tooltip`
- [BREAKING] Remove internal `getGroupDomain` and `getDeepGroupDomain` in favor of `uniqueBy`
- [BREAKING] Rename internal exports `gradients` and `masks` to just `Gradient` and `Mask`
- [Feature] Year Calendar Heatmaps
- [Feature] Month Calendar Heatmaps
- [Feature] Add ability to pass empty heatmap colors
- [Feature] Add ability to pass empty heatmap color
- [Feature] Expose `cell` in `series` of heatmap
- [Feature] Add ability to pass style/class callbacks to heatmap `cell`
- [Feature] Add sequential legend
- [Feature] Add hover effect to heatmaps
- [Fix] Update domain ranges to `range` from `rangeRound` in heatmap
- [Fix] Tweak tooltip offsets for heatmaps
- [Fix] Fix `meta` for deep values not being passed correctly
- [Fix] Update `LinearAxisProps`'s `domain` to accept n number of domains
- [Chore] Bump depedencies
- [Chore] Rename all the files that are `tsx` but don't need to be to `ts`

# 2.9.5 - 2.9.2

- [Fix] Fix wrong element selector for `globalPanning` determination

# 2.9.1

- [Feature] Add `globalPanning` to `Pan` and `ZoomPan` to disable panning on all elements

# 2.9.0

- [Feature] Heatmaps
- [Feature] Propogate `nativeEvent` in ZoomPan

# 2.8.0

- [Feature] Diverging Stacked Bar Chart #82
- [Fix] Horz stacked bar chart color getter
- [Fix] Horz stacked bar chart demo tooltips
- [Fix] Fix stacked bar chart custom bar widths
- [Fix] Fix bug with waterfall chart and colors
- [Fix] Added RDK CSS to demos
- [Chore] Add prettier/lint-staged and pretty the files

# 2.7.1

- [Fix] Revert transformation-matrix to `2.0.3` from `2.1.0` due to position issue

# 2.7.0

- [Feature] Add ability to explode pie charts

# 2.6.5

- [Fix] Fix area/line not pulling colors correctly

# 2.6.4

- [Fix] Radial axis not generating correctly
- [Fix] RDK css reference not working correctly
- [Fix] Fix TypeScript null reference exceptions

# 2.6.3

- [Fix] Fix sankey and radial charts color regression #77

# 2.6.2

- [Fix] Fix regression with area chart in 2.6.1 color fn

# 2.6.1

- [Fix] Make multi-series color works correctly
  = [Fix] Fix horz aligned legend spacing
- [Chore] Remove unneeded depedencies

# 2.6.0

- [Improvement] Add ability to have style/className callbacks

# 2.5.0

- [Improvement] Improve date axis scaling
- [Fix] Remove un-needed post-processing tick code
- [Fix] Make sankey node text ignore mouse events
- [Fix] Improve font size calculations and ellipsis
- [Chore] Update depedencies
- [Chore] Setup auto deploys on circle

# 2.4.10

- [Fix] Fix lots of options in line/area overflowing screen
- [Fix] Include rdk overlay css by default
- [Chore] Misc code cleanup and pure component transitions

# 2.4.9

- [Fix] Fix bar chart having dupe ids

# 2.4.8

- [Fix] Fix bar chart brush always enabled

# 2.4.7

- [Fix] Fix pie chart line overlap with slice
- [Fix] Improve spacing on pie chart labels

# 2.4.6

- [Fix] Fix pie chart label overlap
- [Fix] Fix tooltip lag appear delay

# 2.4.5

- [Fix] Timeout null ref issues on move/brush/pan/zoom

# 2.4.4

- [Fix] Remove deprecated type

# 2.4.3

- [Fix] Add missing type to `ChartZoomPan` class

# 2.4.2

- [Fix] Fix invalid logic on wheel

# 2.4.1

- [Feature] Add ability to pass styles to SVG container

# 2.4.0

- [Feature] Add ability to require modifier before using mouse wheel for zoom
- [Fix] Fix touch memory leak
- [Fix] Fix passive event errors on wheel

# 2.3.1

- [Fix] Fix tooltip flicker

# 2.3.0

- [Feature] Expose pan/zoom events from `ZoomPan`
- [Chore] Bump depedencies due to security

# 2.2.3

- [Fix] Fix `getParentSVG` blowing up when mouse goes outside of SVG element

# 2.2.2

- [Fix] Fix `zoomStep` not being passed down in `ZoomPan`

# 2.2.1

- [Fix] Fix decay not working w/ y values
- [Fix] Fix area chart points showing tooltip on hover

# 2.2.0

- [Fix] Fix containing not working when set false
- [Fix] Completely refactor zoom/panning
- [Fix] Fix tooltip hiding when clicking
- [Fix] Update RDK for tooltip fixes

# 2.1.0

- [Feature] Add ability to pan and zoom on x/y
- [Feature] Add ability to pass min zoom
- [Feature] Expose event type from pan/zoom
- [Feature] Add ability to pan outside of a pan area
- [Fix] Fix gauge label alignment

# 2.0.1

- [Feature] Add a new duration axis type which calculates better ticks #49
- [Fix] Export radial charts from root #51
- [Fix] Fix sankey `onClick` wrong element #53
- [Fix] Fix radial bars not updating sometimes
- [Fix] Ensure pass down options to arc label
- [Fix] Add click events to radial gauge label
- [Fix] Remove tooltip from radial area point

# 2.0.0

- [Feature] Radial Gauge Chart
- [Feature] Horizontal Bar Charts
- [Feature] Add waterfall bar charts
- [Feature] Adds ability to specify tick values and intervals in radial axis
- [Feature] Add ability to pass masks to bar charts
- [Feature] Add ability to change legend label orientation
- [Feature] Add non-zero offset data for bar charts
- [Feature] Add non-zero offset data for area charts
- [BREAKING] Add `grouped` type to Bar/Area chart types for multi-series data points - [Migration](https://github.com/reaviz/reaviz/pull/48)
- [BREAKING] Refactor Gradient API - [Migration](https://github.com/reaviz/reaviz/pull/39)
- [BREAKING] Refactor Pattern API to Masks - [Migration](https://github.com/reaviz/reaviz/pull/47)
- [Fix] Fix a bug with gradient LinearAxisLines not working in Firefox #40
- [Fix] Implements custom tweening for radial bar chart because of errors
- [Fix] Abstracts tick methods and uses in radial axis
- [Fix] Updates radial bar to use start domain vs 0
- [Fix] Updates radial line/area to use start domain vs 0
- [Fix] Updates radial scatter to use start domain vs 0
- [Fix] Updates linear to use start domain vs 0
- [Fix] Remove legend font/svg formatting
- [Fix] Fix Tooltip not passing `className` downwards
- [Fix] Remove unused `formatter` prop from `TooltipArea`
- [Fix] Fix scatter point not passing `className` downward
- [Fix] Fix modifiers getting overidden in bar props

# 1.2.0

- [Feature] Refactored Circle Series on Line/Area to use Scatter
- [Fix] Fixed stacked area circles not having correct colors
- [Chore] Improved Docs
- [Chore] Bumped RDK version

# 1.1.0

- [Feature] Radial Bar Chart
- [Feature] Radial Line Chart
- [Feature] Radial Area Chart
- [Feature] Radial Scatter Chart
- [Feature] Tooltip Area supports Radial Configuration
- [Feature] Radial Gradient
- [Feature] Radial Circle Series
- [Improvement] Various Radial Axis Improvements
- [Fix] Fixed SankeyNode/Link to use opacity instead of color when disabled
- [Chore] TypeScript config tweaks
- [Chore] Adds story source support

# 1.0.2

- [Fix] Sankey Chart Fix Negative node height: When the chart is resized to smaller than the original chart size, the node height gets negative, which is then passed to "rect" and causes an error.
- [Fix] Sankey Chart Increased node width: When the node is hovered multiple times, the react-pose's rect translates the x position wrongly and causes the node wider.
- [Fix] Sankey Chart Fix Sankey chart's non-visible links #3
- [Chore] Add jsnext and module entry points #5

# 1.0.1

- Bump docs

# 1.0.0

- Initial Release
