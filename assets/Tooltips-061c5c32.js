import{j as t,a as e,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import{T as p,b as m}from"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import"./RadialAreaChart-e9b440d8.js";import"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{u as a}from"./index-2ef8b458.js";import{M as s,A as i}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./radial-c0f800e2.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function r(n){const o=Object.assign({h1:"h1",hr:"hr",p:"p",ul:"ul",li:"li",code:"code",h2:"h2",h3:"h3",pre:"pre",h4:"h4",a:"a"},a(),n.components);return e(l,{children:[t(s,{title:"Docs/Utils/Tooltips"}),`
`,t(o.h1,{id:"tooltips",children:"Tooltips"}),`
`,t(o.hr,{}),`
`,t(o.p,{children:"REAVIZ has two types of tooltips:"}),`
`,e(o.ul,{children:[`
`,e(o.li,{children:[t(o.code,{children:"TooltipArea"})," - Tooltip positioning based on position calculations of data."]}),`
`,e(o.li,{children:[t(o.code,{children:"Tooltip"})," - Tooltip positioning based on element anchors."]}),`
`]}),`
`,t(o.h2,{id:"tooltip-area",children:"Tooltip Area"}),`
`,t(o.p,{children:"The tooltip area component is useful for when:"}),`
`,e(o.ul,{children:[`
`,t(o.li,{children:"Dealing with multi-series charts (bar/line/area)"}),`
`,t(o.li,{children:"Dealing with time series data (line/area)"}),`
`,t(o.li,{children:"Dealing with difficult to hit points (small bar chart lines)"}),`
`]}),`
`,t(o.h3,{id:"example",children:"Example"}),`
`,t(o.p,{children:"The Sonar Chart is a good example of a custom tooltip area:"}),`
`,t(o.pre,{children:t(o.code,{className:"language-jsx",children:`<StackedBarSeries
  type="stackedDiverging"
  tooltip={
    <TooltipArea
      tooltip={
        <ChartTooltip
          followCursor={true}
          modifiers={{
            offset: '5px, 5px'
          }}
          content={(data, color) => (
            <TooltipTemplate
              color={color}
              value={{
                x: formatValue(data.x),
                y: \`\${formatValue(Math.abs(data.data[0].y))}\`
              }}
            />
          )}
        />
      }
    />
  }
/>
`})}),`
`,e(o.p,{children:["In the example above, the component recieves a custom ",t(o.code,{children:"TooltipArea"}),` where it overrides
the `,t(o.code,{children:"tooltip"})," property passing its own ",t(o.code,{children:"content"}),"."]}),`
`,t(o.h3,{id:"api",children:"API"}),`
`,t(o.h4,{id:"tooltiparea",children:t(o.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/common/Tooltip/TooltipArea.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"TooltipArea"})}),`
`,t(i,{of:p}),`
`,t(o.h2,{id:"charttooltip",children:"ChartTooltip"}),`
`,t(o.p,{children:`The tooltip component is used for simple position relative to a element. This is ideal
for most charts.`}),`
`,t(o.h3,{id:"example-1",children:"Example"}),`
`,t(o.p,{children:"The Calendar Heatmap is a good example of custom tooltip:"}),`
`,t(o.pre,{children:t(o.code,{className:"language-jsx",children:`<HeatmapCell
  tooltip={
    <ChartTooltip
      content={d =>
        \`\${formatValue(d.data.metadata.date)} ∙ \${formatValue(
          d.data.value
        )}\`
      }
    />
  }
/>
`})}),`
`,t(o.p,{children:"In this example above, the component overrides the tooltip to format the date for a Calendar format."}),`
`,t(o.h3,{id:"api-1",children:"API"}),`
`,t(o.h4,{id:"tooltip",children:t(o.a,{href:"https://github.com/reaviz/reaviz/blob/master/src/common/Tooltip/ChartTooltip.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"Tooltip"})}),`
`,t(i,{of:m}),`
`,t(o.h2,{id:"custom-tooltips",children:"Custom Tooltips"}),`
`,e(o.p,{children:[`You can also override tooltips and handle them yourself manually. Below is an example
of overriding the `,t(o.code,{children:"onMouseEnter"})," and ",t(o.code,{children:"onMouseLeave"})," in the ",t(o.code,{children:"VennDiagram"}),` component to
handle displaying what would be in the tooltip in a custom panel below the chart.`]}),`
`,t(o.pre,{children:t(o.code,{className:"language-jsx",children:`const Venn = () => {
  const [active, setActive] = useState<any | null>(null);

  return (
    <>
      <VennDiagram
        type="starEuler"
        data={data}
        height={275}
        series={
          <VennSeries
            arc={
              <VennArc
                onMouseEnter={({ value }) => {
                  setActive(\`\${value.sets.join(' & ')} - \${value.size.toLocaleString()}\`);
                }}
                onMouseLeave={() => setActive(null)}
              />
            }
          />
        }
      />
      {active !== null && (
        <p>{active}</p>
      )}
    </>
  );
};
`})})]})}function yo(n={}){const{wrapper:o}=Object.assign({},a(),n.components);return o?t(o,Object.assign({},n,{children:t(r,n)})):r(n)}export{yo as default};
