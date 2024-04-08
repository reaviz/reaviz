import{j as a,a as o,F as I}from"./jsx-runtime-86dfebf6.js";import"./chunk-HLWAVYOI-b2f906ac.js";import{M as z}from"./index-68ff4ed5.js";import{r as _}from"./index-1b03fe98.js";import"./RadialValueMarker-7b3f8322.js";import{s as k,l as C,R as N,e as M,z as j,f as E,g as L,h as P}from"./RadialAxis-6c2bc59c.js";import{i as O,g as v,j as W,h as F,R as U,a as x}from"./schemes-56affe43.js";import{u as G}from"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import{r as D}from"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import"./AreaChart-a3475e62.js";import"./StackedNormalizedAreaChart-e4db09db.js";import"./BarChart-9c825fb0.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";import"./LineChart-ad7cee98.js";import"./MapMarker-af661fbc.js";import"./PieChart-adaf79c6.js";import"./SankeyNode-27b523e1.js";import"./ScatterPlot-34d242f9.js";import"./SonarChart-69706e7d.js";import{a as V,c as H,b as X}from"./RadialAreaChart-e9b440d8.js";import{a as q,b as Y,c as $}from"./RadialBarChart-dde3dd46.js";import"./RadialGauge-0aea5fca.js";import{a as Z,b as J}from"./RadialScatterSeries-0f44c4ff.js";import"./Heatmap-e27b243d.js";import"./CalendarHeatmap-a468c797.js";import"./LinearGauge-908fb904.js";import"./VennDiagram-9e018c06.js";import"./BubbleChart-9604dd9a.js";import"./TreeMap-e284a39e.js";import"./BarList-62d02c67.js";import"./Meter-269e75e5.js";import"./RadarChart-3565b8f6.js";import"./index-6ed4b00b.js";import{a as K}from"./builder-9833ba7e.js";import{g as Q}from"./radial-c0f800e2.js";import{r as ee}from"./sonar-ace0ce62.js";import{h as ae}from"./moment-a9aaa855.js";import{b as te}from"./time-a9784969.js";import{S as ne}from"./symbol-31118762.js";import{u as A}from"./index-2ef8b458.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./react-18-5df836b6.js";import"./index-6fd5a17b.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./rdk-0beed5d4.js";import"./frame-a8f3761f.js";import"./index-f6b105ee.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./index-9494de61.js";import"./expand-7b65a05b.js";import"./useHoverIntent-9f4f4ce5.js";import"./invert-4b58fa06.js";import"./constant-7ff63248.js";const g=k(3),re={draw(t,e){const r=-k(e/(g*3));t.moveTo(0,r*2),t.lineTo(-g*r,-r),t.lineTo(g*r,-r),t.closePath()}},ie=t=>t/Math.PI*180-90,b=12,T=25,oe=ae().startOf("day"),R=()=>D(48).map(t=>({id:`${new Date().getTime()}-${t})}`,key:oe.clone().add(1*t,"hour").toDate(),data:ee(1,100)})),p=(t,e,r)=>{const s=C().domain([0,b]).range([T,r]),n=s.ticks(b);return{innerRadius:s(n[t]),outerRadius:s(n[e])}},f=(t,e=0,r=0,s=!1,n)=>{const d=K(t);let c;s?(n=n||O(d,"x"),c=te().range([0,2*Math.PI]).domain(n)):(n=n||G(d,l=>l.x),c=v().range([0,2*Math.PI]).domain(n));const m=W({data:d,scaled:!1});return{yScale:Q(r,e,m),xScale:c,data:d}},se=()=>o("g",{transform:"translate(-12, -12)",children:[a("line",{fill:"#fff",x1:"0",x2:"25",y1:"0",y2:"25",style:{strokeWidth:1,stroke:"#fff"}}),a("line",{fill:"#fff",x1:"25",x2:"0",y1:"0",y2:"25",style:{strokeWidth:1,stroke:"#fff"}})]}),y=({count:t=4,outerRad:e,innerRad:r})=>{const s=D(t),n=C().range([r,e]),d=v().domain(s).range([Math.PI/t,(2+1/t)*Math.PI]);return s.map(c=>{const m=ie(d(c)),[l,i]=n.range();return a("line",{stroke:"#054856",transform:`rotate(${m})`,x1:l,x2:i,pointerEvents:"none"},c)})},de=({radius:t,data:e})=>{const{innerRadius:r,outerRadius:s}=p(4,4,t),{yScale:n,xScale:d,data:c}=f(e,s,r,!1);return a(Z,{id:"radar-scatter",data:c,xScale:d,yScale:n,point:a(J,{symbol:m=>{let l=0;m.value>=80?l=200:m.value>=50?l=100:m.value>=40&&(l=50);const i=ne().type(re).size(l)();return a("path",{d:i,fill:"#CB003E",stroke:"#EF0954",strokeWidth:"1"})}})})},ce=({height:t,width:e,radius:r,data:s})=>{const{innerRadius:n,outerRadius:d}=p(9,12,r),{yScale:c,xScale:m,data:l}=f(s,d,n,!1);return a(q,{id:"radar-bars",colorScheme:["#016691"],data:l,xScale:m,yScale:c,innerRadius:n,width:e,height:t,bar:a(Y,{gradient:!1,guide:a($,{opacity:.2,fill:"#016691"})})})},le=({height:t,width:e,radius:r,data:s})=>{const{innerRadius:n,outerRadius:d}=p(6,8,r),{yScale:c,xScale:m,data:l}=f(s,d,n,!0);return a(V,{id:"radar-area",data:l,xScale:m,yScale:c,height:t,width:e,outerRadius:d,innerRadius:n,colorScheme:["#1E5DC8"],line:a(H,{strokeWidth:1}),area:a(X,{gradient:a(U,{stops:[a(x,{offset:"40%",stopOpacity:.5},1),a(x,{offset:"10%",stopOpacity:.1},2)]})})})},S=({margins:t=10,axisPadding:e=5,areaData:r=[],barData:s=[],scatterData:n=[]})=>{const d=i=>{const{innerRadius:h}=p(1,1,i);return a(y,{count:25,innerRad:h-e,outerRad:h})},c=i=>{const{innerRadius:h}=p(2,2,i);return a(y,{innerRad:h-e,outerRad:h+e})},m=i=>{const{innerRadius:h}=p(3,3,i),u=i+t;return a(y,{innerRad:h,outerRad:u})},l=(i,h)=>{const{xScale:u}=f(r,void 0,void 0,!0);return a(N,{height:i,width:h,innerRadius:T,xScale:u,arcs:a(M,{count:b,arc:a(j,{stroke:"#054366",strokeDasharray:B=>[1,3,6,9,12].includes(B)?"none":"1,3"})}),ticks:a(E,{count:24,tick:a(L,{line:a(P,{position:"outside"})})})})};return a(F,{id:"radar",width:500,height:500,margins:t,xAxisVisible:!1,yAxisVisible:!1,center:!0,children:({chartWidth:i,chartHeight:h})=>{const u=Math.min(i,h)/2;return o(_.Fragment,{children:[l(h,i),m(u),c(u),d(u),a(ce,{height:h,width:i,radius:u,data:s}),a(le,{height:h,width:i,radius:u,data:r}),a(de,{radius:u,data:n}),a(se,{})]})}})};try{S.displayName="Radar",S.__docgenInfo={description:"",displayName:"Radar",props:{}}}catch{}function w(t){const e=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",a:"a",h3:"h3",img:"img",pre:"pre"},A(),t.components);return o(I,{children:[a(z,{title:"Docs/Advanced/Custom Charts"}),`
`,a(e.h1,{id:"custom-charts",children:"Custom Charts"}),`
`,a(e.p,{children:"REAVIZ is extremely flexible and allows you to create custom charts."}),`
`,o(e.p,{children:["Almost all of the chart types allow you to pass ",a(e.code,{children:"JSX"}),` elements in the props; this allows you
to customize every aspect of each element. Additionally, you can mix charts and their child components
together to make combination charts.`]}),`
`,a(e.h2,{id:"radar-chart-example",children:"Radar Chart Example"}),`
`,a(e.p,{children:`The Radar chart was the primary driver behind creating REAVIZ. This chart combines
multiple chart types to create a new visualization. Its a great example of how to leverage
various chart internal components to create new chart types.`}),`
`,a("div",{style:{background:"#06133B",display:"flex",justifyContent:"center",padding:50},children:a(S,{scatterData:R(),barData:R(),areaData:R()})}),`
`,o(e.p,{children:[`This chart is more than just pretty, it served as a central element for cyber-security analysts to
identify trends and threats. For more information on the chart and design
itself, checkout: `,a(e.a,{href:"https://medium.com/@harlanelam/from-dashboard-to-hud-how-jask-reimagined-the-security-analyst-user-experience-fcbe69ffab29",target:"_blank",rel:"nofollow noopener noreferrer",children:"From Dashboard to HUD: How JASK reimagined the security analyst user experience"}),`
by the amazing designer `,a(e.a,{href:"https://dribbble.com/harlanelam",target:"_blank",rel:"nofollow noopener noreferrer",children:"Harlan Elam"}),`. The chart was rewritten
and visually tweaked from Harlan's original design for demonstration purposes.`]}),`
`,a(e.h3,{id:"breaking-it-down",children:"Breaking it Down"}),`
`,a(e.p,{children:"Before we start with the code, let's break this chart down to its core elements."}),`
`,a(e.p,{children:a(e.img,{src:"https://raw.githubusercontent.com/reaviz/reaviz/master/docs/advanced/breakdown.png",alt:"breakdown"})}),`
`,a(e.p,{children:`While the chart looks pretty intense, its actually not that crazy. The chart is made up of 3 different
chart types: scatter, bar, and area. Additionally there is some decorative elements that are pretty simple
svg lines.`}),`
`,a(e.h3,{id:"code-tutorial",children:"Code Tutorial"}),`
`,o(e.p,{children:["Now that we understand the general structure of the chart type, we can walk through the ",a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/docs/advanced/Radar.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"code"}),`
for this chart now.`]}),`
`,o(e.p,{children:["All of the charts in REAVIZ start with the ",a(e.code,{children:"ChartContainer"}),` component. This component deals
with measuring sizes and creating the root svg element for us. Below is a minimal example
of how to configure the `,a(e.code,{children:"ChartContainer"})," component."]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<ChartContainer
  id="radar"
  width={500}
  height={500}
  margins={margins}
  xAxisVisible={false}
  yAxisVisible={false}
  center={true}
>
  {({ chartWidth, chartHeight }) => {
    const rad = Math.min(chartWidth, chartHeight) / 2;
    return (
      <Fragment>
        {renderAxis(chartHeight, chartWidth)}
        {renderOuterLines(rad)}
        {renderSideLines(rad)}
        {renderInnerLines(rad)}
        <RadarBarChart height={chartHeight} width={chartWidth} radius={rad} data={barData} />
        <RadarAreaChart height={chartHeight} width={chartWidth} radius={rad} data={areaData} />
        <RadarScatterPlot radius={rad} data={scatterData} />
        <InnerX />
      </Fragment>
    );
  }}
</ChartContainer>
`})}),`
`,o(e.p,{children:["Inside the ",a(e.code,{children:"ChartContainer"}),` component, there is a callback that gives
us the chart dimensions. We use this to calculate the radius of the chart
and then tee up the `,a(e.code,{children:"RadarBarChart"}),", ",a(e.code,{children:"RadarAreaChart"})," and ",a(e.code,{children:"RadarScatterPlot"}),` along
with a few visual components for axises and decoration.`]}),`
`,o(e.p,{children:["Let's take a look at the first component ",a(e.code,{children:"RadarBarChart"}),"."]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`const RadarBarChart = ({
  height,
  width,
  radius,
  data
}) => {
  const { innerRadius, outerRadius } = getRadius(9, 12, radius);
  const { yScale, xScale, data: barData } = buildScale(
    data,
    outerRadius,
    innerRadius,
    false
  );

  // The \`RadialBarSeries\` is a internal component used by the \`RadialBarChart\`.
  // These components are exposed so you can compose them in ways like this.
  return (
    <RadialBarSeries
      id="radar-bars"
      colorScheme={["#016691"]}
      data={barData}
      xScale={xScale}
      yScale={yScale}
      innerRadius={innerRadius}
      width={width}
      height={height}
      bar={
        <RadialBar
          gradient={false}
          guide={
            <RadialGuideBar
              opacity={0.2}
              fill="#016691"
            />
          }
        />
      }
    />
  );
};
`})}),`
`,o(e.p,{children:["This chart uses the ",a(e.code,{children:"RadialBarSeries"}),` component to render the bars. We modify the
positions and appearence of those `,a(e.code,{children:"RadialBar"}),` components by building a custom scale.
The `,a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/docs/advanced/radarUtils.ts",target:"_blank",rel:"nofollow noopener noreferrer",children:"buildScale"}),`
function takes the data and returns scales and a modified data object that the bar chart can understand.
This function is relatively simple and used in all the child chart components:`]}),`
`,a(e.pre,{children:a(e.code,{className:"language-ts",children:`export const buildScale = (
  initialData = [],
  outerRad = 0,
  innerRad = 0,
  isTime = false,
  xDomain
) => {
  const data = buildShallowChartData(initialData);

  // If we are dealing with time, we need to use the \`scaleTime\`
  // scale provided by d3, otherwise lets use the \`scaleBand\`.
  let xScale;
  if (isTime) {
    xDomain = (xDomain || extent(data, 'x'));
    xScale = scaleTime().range([0, 2 * Math.PI]).domain(xDomain);
  } else {
    xDomain = (xDomain || uniqueBy(data, d => d.x));
    xScale = scaleBand().range([0, 2 * Math.PI]).domain(xDomain);
  }

  const yDomain = getYDomain({ data, scaled: false });

  return {
    yScale: getRadialYScale(innerRad, outerRad, yDomain),
    xScale,
    data
  };
};
`})}),`
`,o(e.p,{children:["These charts also use a function called ",a(e.code,{children:"getRadius"}),` to determine
render positions:`]}),`
`,a(e.pre,{children:a(e.code,{className:"language-ts",children:`export const getRadius = (startIdx, endIdx, rad) => {
  // Leveraging the d3 \`scaleLinear\` to determine the radius.
  const scale = scaleLinear().domain([0, ARC_COUNT]).range([INNER_RADIUS, rad]);
  const arcs = scale.ticks(ARC_COUNT);

  return {
    innerRadius: scale(arcs[startIdx]),
    outerRadius: scale(arcs[endIdx])
  };
};
`})}),`
`,o(e.p,{children:["These function are mainly leveraging the ",a(e.code,{children:"d3-scale"}),` library to build the scales
and data all the charts expect.`]}),`
`,o(e.p,{children:["The next chart in the series is ",a(e.code,{children:"RadarAreaChart"}),"."]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`const RadarAreaChart = ({
  height,
  width,
  radius,
  data
}) => {
  const { innerRadius, outerRadius } = getRadius(6, 8, radius);
  const { yScale, xScale, data: areaData } = buildScale(
    data,
    outerRadius,
    innerRadius,
    true
  );

  return (
    <RadialAreaSeries
      id="radar-area"
      data={areaData}
      xScale={xScale}
      yScale={yScale}
      height={height}
      width={width}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      colorScheme={["#1E5DC8"]}
      line={<RadialLine strokeWidth={1} />}
      area={
        <RadialArea
          gradient={
            <RadialGradient
              stops={[
                <GradientStop key={1} offset="40%" stopOpacity={0.5} />,
                <GradientStop key={2} offset="10%" stopOpacity={0.1} />
              ]}
            />
          }
        />
      }
    />
  );
};
`})}),`
`,o(e.p,{children:["Similar to the ",a(e.code,{children:"RadarBarChart"})," component, this chart uses the ",a(e.code,{children:"RadialAreaSeries"}),`
which is internally used by `,a(e.code,{children:"RadialAreaChart"}),"."]}),`
`,o(e.p,{children:["Moving the last chart in this series, we have the ",a(e.code,{children:"RadialScatterSeries"}),` and
as you can imagine, similar to the other charts we utilize the `,a(e.code,{children:"RadialScatterSeries"}),`
from the interal `,a(e.code,{children:"RadialScatterPlot"})," component."]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`const RadarScatterPlot = ({
  radius,
  data
}) => {
  const { innerRadius, outerRadius } = getRadius(4, 4, radius);
  const { yScale, xScale, data: scatterData } = buildScale(
    data,
    outerRadius,
    innerRadius,
    false
  );
  return (
    <RadialScatterSeries
      id="radar-scatter"
      data={scatterData}
      xScale={xScale}
      yScale={yScale}
      point={
        <RadialScatterPoint
          symbol={point => {
            let size = 0;
            if (point.value >= 80) {
              size = 200;
            } else if (point.value >= 50) {
              size = 100;
            } else if (point.value >= 40) {
              size = 50;
            }

            const d = (symbol()
              .type(symbolTriangle)
              .size(size))();

            return (
              <path
                d={d}
                fill="#CB003E"
                stroke="#EF0954"
                strokeWidth="1"
              />
            );
          }}
        />
      }
    />
  );
};
`})}),`
`,o(e.p,{children:["The ",a(e.code,{children:"RadarScatterPlot"}),` uses a custom callback to render a triange symbol ( d3-shape code ).
We use the value of the point to determine the size of the symbol.`]}),`
`,a(e.h3,{id:"wrapping-up",children:"Wrapping Up"}),`
`,o(e.p,{children:[`And thats it! This example shows you how you can mix and match
various different charts to build truley unique visualizations.
You can see all the code `,a(e.a,{href:"https://github.com/reaviz/reaviz/blob/master/docs/advanced/Radar.tsx",target:"_blank",rel:"nofollow noopener noreferrer",children:"here"}),"."]})]})}function Aa(t={}){const{wrapper:e}=Object.assign({},A(),t.components);return e?a(e,Object.assign({},t,{children:a(w,t)})):w(t)}export{Aa as default};
