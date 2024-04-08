import{j as i}from"./jsx-runtime-86dfebf6.js";import"./index-1b03fe98.js";import{S as r,a as A,b as S}from"./ScatterPlot-34d242f9.js";import{s as u}from"./sonar-ace0ce62.js";import"./moment-a9aaa855.js";import{j as h,L as n,a as o,k as l,b as s,g as k,c as p,d as c}from"./RadialValueMarker-7b3f8322.js";import"./index-256d607f.js";import"./builder-9833ba7e.js";import"./chroma-699b8ba0.js";import"./RadialAxis-6c2bc59c.js";import"./range-163cdb4a.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./quantile-a1f83f78.js";import"./schemes-56affe43.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./functions-234b1417.js";import"./helper-26bacd48.js";import"./index-9494de61.js";import"./utils-83ce1bd4.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./Count-a38a1947.js";import"./time-a9784969.js";const U={title:"Charts/Scatter Plot/Axis",component:r,subcomponents:{ScatterSeries:A,ScatterPoint:S}},e=()=>{const a=h({type:"category",width:450,data:[{key:"Before",data:0,x:"Before"},{key:"After",data:0,x:"After"}],isMultiSeries:!1,isDiverging:!0});return i(r,{width:450,height:200,margins:0,data:u,xAxis:i(n,{type:"time",orientation:"horizontal",position:"end",axisLine:null,tickSeries:i(o,{line:null,label:i(l,{padding:5,position:"end"})})}),secondaryAxis:[i(n,{type:"category",orientation:"horizontal",position:"start",scale:a,axisLine:null,tickSeries:i(o,{line:null,label:i(l,{padding:20,position:"start"})})})],yAxis:i(s,{type:"value",axisLine:null})})};e.story={name:"Top + Bottom Axis"};const t=()=>{const a=k({type:"category",height:200,data:[{key:"Low",data:0,y:"Low"},{key:"High",data:0,y:"High"}],isMultiSeries:!1,isDiverging:!0});return i(r,{width:450,height:200,margins:0,data:u,yAxis:i(s,{position:"end",axisLine:null,tickSeries:i(p,{line:null,label:i(c,{padding:5,position:"end"})})}),secondaryAxis:[i(s,{type:"category",position:"start",axisLine:null,scale:a,tickSeries:i(p,{line:null,label:i(c,{padding:20,position:"start",rotation:270,align:"start"})})})],xAxis:i(n,{type:"time",axisLine:null})})};t.story={name:"Left + Right Axis"};var x,d,m;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
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
    }],
    isMultiSeries: false,
    isDiverging: true
  });
  return <ScatterPlot width={450} height={200} margins={0} data={singleDateData} xAxis={<LinearXAxis type="time" orientation="horizontal" position="end" axisLine={null} tickSeries={<LinearXAxisTickSeries line={null} label={<LinearXAxisTickLabel padding={5} position="end" />} />} />} secondaryAxis={[<LinearXAxis type="category" orientation="horizontal" position="start" scale={scale} axisLine={null} tickSeries={<LinearXAxisTickSeries line={null} label={<LinearXAxisTickLabel padding={20} position="start" />} />} />]} yAxis={<LinearYAxis type="value" axisLine={null} />} />;
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var g,y,L;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
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
    }],
    isMultiSeries: false,
    isDiverging: true
  });
  return <ScatterPlot width={450} height={200} margins={0} data={singleDateData} yAxis={<LinearYAxis position="end" axisLine={null} tickSeries={<LinearYAxisTickSeries line={null} label={<LinearYAxisTickLabel padding={5} position="end" />} />} />} secondaryAxis={[<LinearYAxis type="category" position="start" axisLine={null} scale={scale} tickSeries={<LinearYAxisTickSeries line={null} label={<LinearYAxisTickLabel padding={20} position="start" rotation={270} align="start" />} />} />]} xAxis={<LinearXAxis type="time" axisLine={null} />} />;
}`,...(L=(y=t.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};export{t as LeftRightAxis,e as TopBottomAxis,U as default};
