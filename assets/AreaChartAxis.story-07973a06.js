import{j as i}from"./jsx-runtime-86dfebf6.js";import"./index-1b03fe98.js";import"./chroma-699b8ba0.js";import"./moment-a9aaa855.js";import{s as g}from"./sonar-ace0ce62.js";import{A as s,a as h,b as u,L as k,P as S,S as b,c as f}from"./AreaChart-0c6c7503.js";import{j as T,L as n,a as o,k as l,b as r,g as X,c as p,d as c}from"./RadialValueMarker-1a9f2906.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./ScatterPlot-dcfbd829.js";import"./builder-50dc9f34.js";import"./RadialAxis-b01319ed.js";import"./quantile-93c425ff.js";import"./schemes-b533a310.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./functions-234b1417.js";import"./helper-ba8553c0.js";import"./index-9494de61.js";import"./utils-e5e5469a.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./Count-a38a1947.js";import"./interpolation-698f8194.js";import"./area-c6450060.js";import"./expand-48c2fbf4.js";import"./time-988cb4fe.js";const ti={title:"Charts/Area Chart/Axis",component:s,subcomponents:{AreaSeries:h,Area:u,Line:k,PointSeries:S,StackedAreaSeries:b,StackedNormalizedAreaSeries:f}},e=()=>{const t=T({type:"category",width:450,data:[{key:"Before",data:0,x:"Before"},{key:"After",data:0,x:"After"}]});return i(s,{width:450,height:200,margins:0,data:g,xAxis:i(n,{type:"time",orientation:"horizontal",position:"end",axisLine:null,tickSeries:i(o,{line:null,label:i(l,{padding:5,position:"end"})})}),secondaryAxis:[i(n,{type:"category",orientation:"horizontal",position:"start",scale:t,axisLine:null,tickSeries:i(o,{line:null,label:i(l,{padding:20,position:"start"})})})],yAxis:i(r,{type:"value",axisLine:null})})};e.story={name:"Top + Bottom Axis"};const a=()=>{const t=X({type:"category",height:200,data:[{key:"Low",data:0,y:"Low"},{key:"High",data:0,y:"High"}]});return i(s,{width:450,height:200,margins:0,data:g,yAxis:i(r,{position:"end",axisLine:null,tickSeries:i(p,{line:null,label:i(c,{padding:5,position:"end"})})}),secondaryAxis:[i(r,{type:"category",position:"start",axisLine:null,scale:t,tickSeries:i(p,{line:null,label:i(c,{padding:20,position:"start",rotation:270,align:"start"})})})],xAxis:i(n,{type:"time",axisLine:null})})};a.story={name:"Left + Right Axis"};var d,x,m;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const scale = getXScale({
    type: 'category',
    width: 450,
    data: [{
      key: 'Before',
      data: 0,
      x: 'Before'
    }, {
      key: 'After',
      data: 0,
      x: 'After'
    }]
  });
  return <AreaChart width={450} height={200} margins={0} data={singleDateData} xAxis={<LinearXAxis type="time" orientation="horizontal" position="end" axisLine={null} tickSeries={<LinearXAxisTickSeries line={null} label={<LinearXAxisTickLabel padding={5} position="end" />} />} />} secondaryAxis={[<LinearXAxis type="category" orientation="horizontal" position="start" scale={scale} axisLine={null} tickSeries={<LinearXAxisTickSeries line={null} label={<LinearXAxisTickLabel padding={20} position="start" />} />} />]} yAxis={<LinearYAxis type="value" axisLine={null} />} />;
}`,...(m=(x=e.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var A,L,y;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const scale = getYScale({
    type: 'category',
    height: 200,
    data: [{
      key: 'Low',
      data: 0,
      y: 'Low'
    }, {
      key: 'High',
      data: 0,
      y: 'High'
    }]
  });
  return <AreaChart width={450} height={200} margins={0} data={singleDateData} yAxis={<LinearYAxis position="end" axisLine={null} tickSeries={<LinearYAxisTickSeries line={null} label={<LinearYAxisTickLabel padding={5} position="end" />} />} />} secondaryAxis={[<LinearYAxis type="category" position="start" axisLine={null} scale={scale} tickSeries={<LinearYAxisTickSeries line={null} label={<LinearYAxisTickLabel padding={20} position="start" rotation={270} align="start" />} />} />]} xAxis={<LinearXAxis type="time" axisLine={null} />} />;
}`,...(y=(L=a.parameters)==null?void 0:L.docs)==null?void 0:y.source}}};export{a as LeftRightAxis,e as TopBottomAxis,ti as default};
