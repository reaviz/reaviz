import{j as e,a as H}from"./jsx-runtime-86dfebf6.js";import{H as r,a as m,b as L}from"./Heatmap-c98eb405.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import{h as t}from"./heatmap-2bd15d7a.js";import{S as b}from"./SequentialLegend-13141cc9.js";import{g as k,b as w,c as Y,d as B}from"./RadialValueMarker-1a9f2906.js";import"./RadialAxis-b01319ed.js";import"./index-1b03fe98.js";import"./schemes-b533a310.js";import"./range-163cdb4a.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./index-256d607f.js";import"./frame-a8f3761f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./chroma-699b8ba0.js";import"./SVGVisualElement-f20753d9.js";import"./builder-50dc9f34.js";import"./quantile-93c425ff.js";import"./functions-234b1417.js";import"./useHoverIntent-9f4f4ce5.js";import"./DiscreteLegendEntry-48737638.js";import"./Count-a38a1947.js";import"./helper-ba8553c0.js";import"./time-988cb4fe.js";const ae={title:"Charts/Heatmap/Simple",component:r,subcomponents:{HeatmapSeries:m,HeatmapCell:L}},i=()=>e(r,{height:250,width:400,data:t,series:e(m,{colorScheme:"OrRd"})}),a=()=>H("div",{style:{display:"flex",height:"250px"},children:[e(r,{height:250,width:400,data:t}),e(b,{data:t,style:{height:"165px",marginLeft:"10px"}})]});a.story={name:"Basic + Legend"};const s=()=>{const A=k({type:"category",height:190,data:[{key:"Before",data:0,y:"Before"},{key:"After",data:0,y:"After"}]});return e(r,{height:250,width:400,margins:0,data:t,secondaryAxis:[e(w,{type:"category",scale:A,axisLine:null,position:"end",tickSeries:e(Y,{line:null,label:e(B,{padding:10,position:"end"})})})]})},o=()=>e(r,{height:230,width:230,data:t,series:e(m,{cell:e(L,{symbol:()=>e("circle",{r:14,transform:"translate(14, 14)"})}),colorScheme:"OrRd"})});var p,n,c;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:'() => <Heatmap height={250} width={400} data={heatmapSimpleData} series={<HeatmapSeries colorScheme="OrRd" />} />',...(c=(n=i.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var l,d,h;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  height: '250px'
}}>
    <Heatmap height={250} width={400} data={heatmapSimpleData} />
    <SequentialLegend data={heatmapSimpleData} style={{
    height: '165px',
    marginLeft: '10px'
  }} />
  </div>`,...(h=(d=a.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var g,y,S;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const scale = getYScale({
    type: 'category',
    height: 190,
    data: [{
      key: 'Before',
      data: 0,
      y: 'Before'
    }, {
      key: 'After',
      data: 0,
      y: 'After'
    }]
  });
  return <Heatmap height={250} width={400} margins={0} data={heatmapSimpleData} secondaryAxis={[<LinearYAxis type="category" scale={scale} axisLine={null} position="end" tickSeries={<LinearYAxisTickSeries line={null} label={<LinearYAxisTickLabel padding={10} position="end" />} />} />]} />;
}`,...(S=(y=s.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var u,x,f;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`() => <Heatmap height={230} width={230} data={heatmapSimpleData} series={<HeatmapSeries cell={<HeatmapCell symbol={() => <circle r={14} transform={'translate(14, 14)'} />} />} colorScheme="OrRd" />} />`,...(f=(x=o.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};export{i as Basic,a as BasicLegend,s as MultiAxis,o as Symbols,ae as default};
