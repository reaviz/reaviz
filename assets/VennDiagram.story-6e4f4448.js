import{j as e}from"./jsx-runtime-86dfebf6.js";import{V as a,a as t,b as r,d as V,c as S}from"./VennDiagram-9e018c06.js";import{G as ue,s as Ae}from"./schemes-56affe43.js";import"./RadialAxis-6c2bc59c.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import{S as we}from"./RadialValueMarker-7b3f8322.js";import{S as Be}from"./symbol-31118762.js";import{s as be}from"./star-24381329.js";import"./index-1b03fe98.js";import"./helper-26bacd48.js";import"./chroma-699b8ba0.js";import"./quantile-a1f83f78.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./useHoverIntent-9f4f4ce5.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./Count-a38a1947.js";import"./SVGVisualElement-f20753d9.js";import"./utils-83ce1bd4.js";import"./invert-4b58fa06.js";import"./index-9494de61.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./time-a9784969.js";const Se=Be().type(be).size(50)(),Re={title:"Charts/Venn Diagram",component:a,subcomponents:{VennSeries:t,VennArc:r,VennOuterLabel:V,VennLabel:S}},d=()=>e(a,{height:450,width:450,data:[{key:["A"],data:12},{key:["B"],data:12},{key:["A","B"],data:2}],series:e(t,{colorScheme:"cybertron",arc:e(r,{strokeWidth:3,gradient:e(ue,{})}),label:e(S,{labelType:"key",showAll:!1})})}),c=()=>e(a,{type:"euler",height:450,width:450,data:[{key:["A"],data:4},{key:["B"],data:1},{key:["A","B"],data:1}]}),h=()=>e(a,{type:"starEuler",height:450,width:450,data:D,series:e(t,{colorScheme:["#868686"],arc:e(r,{strokeWidth:1,stroke:"#fff",gradient:e(ue,{})}),label:e(S,{labelType:"value",showAll:!0,fill:"#fff"}),outerLabel:e(V,{fill:"#fff"})})}),l=()=>e(a,{type:"starEuler",height:450,width:450,data:D,series:e(t,{colorScheme:["#eee"],label:e(S,{labelType:"value",showAll:!0}),outerLabel:e(V,{format:n=>{const s=n.set.align!=="start"?-25:0,fe=n.set.verticalAlign!=="top"?-50/2:0;return e("foreignObject",{height:50,width:50,x:s,y:fe,children:e("svg",{height:50,width:50,viewBox:"-7 -7 25 25",children:e("path",{d:Se,style:{fill:"lime",stroke:"purple",strokeWidth:1.5}})})})}})})}),m=()=>e(a,{height:450,width:450,data:[{key:["A"],data:4},{key:["B"],data:1},{key:["A","B"],data:1}],series:e(t,{selections:["A|B","B"],arc:e(r,{stroke:(n,i,o,s)=>s?"blue":o?"green":"white"})})}),y=()=>e(a,{height:450,width:450,type:"starEuler",data:D,series:e(t,{colorScheme:(n,i)=>i%2?"white":"grey",arc:e(r,{stroke:(n,i,o,s)=>s?"blue":o?"green":"white"})})}),k=()=>e(a,{height:450,width:450,data:[{key:["A"],data:50},{key:["B"],data:12},{key:["A","B"],data:5}]}),p=()=>e(a,{height:250,width:250,data:[{key:["Department of Defense"],data:50},{key:["Office of President"],data:50},{key:["Department of Defense","Office of President"],data:25}]}),g=()=>e(a,{height:450,width:450,data:[{key:["A"],data:12},{key:["B"],data:12},{key:["C"],data:12},{key:["D"],data:12},{key:["A","B"],data:2},{key:["B","C"],data:2},{key:["A","C"],data:5},{key:["A","B","C"],data:10},{key:["B","D"],data:1},{key:["D","A"],data:1},{key:["D","A","B"],data:1}],series:e(t,{colorScheme:["#2d60e8"]})}),u=()=>e(a,{height:450,width:450,data:[{key:["A"],data:22},{key:["B"],data:12},{key:["C"],data:13},{key:["D"],data:22}]}),f=()=>e(a,{height:450,width:450,series:e(t,{arc:e(r,{mask:e(we,{}),strokeWidth:1,initialOpacity:.9,activeOpacity:1})}),data:[{key:["A"],data:12},{key:["B"],data:12},{key:["A","B"],data:2}]}),A=()=>e(a,{height:450,width:450,series:e(t,{arc:e(r,{strokeWidth:5,fill:"transparent",stroke:Ae.cybertron[0]})}),data:[{key:["A"],data:12},{key:["B"],data:12},{key:["A","B"],data:2}]}),w=()=>e(a,{height:450,width:450,series:e(t,{label:null,arc:e(r,{strokeWidth:5})}),data:[{key:["A"],data:12},{key:["B"],data:12}]}),B=()=>e(a,{height:450,width:450,series:e(t,{animated:!1}),data:[{key:["A"],data:12},{key:["B"],data:12},{key:["A","B"],data:2}]}),b=()=>e("div",{style:{width:"50vw",height:"50vh",border:"solid 1px red"},children:e(a,{data:[{key:["A"],data:12},{key:["B"],data:12},{key:["A","B"],data:2}]})}),D=[{key:["manageengine","meraki"],data:150},{key:["manageengine","active directory","sophos","meraki"],data:91},{key:["manageengine"],data:202},{key:["sophos"],data:219},{key:["manageengine","active directory","meraki"],data:95},{key:["manageengine","sophos"],data:175},{key:["manageengine","sophos","meraki"],data:140},{key:["active directory","sophos"],data:113},{key:["sophos","meraki"],data:150},{key:["gsuite"],data:449},{key:["gsuite","meraki"],data:189},{key:["meraki"],data:850},{key:["manageengine","active directory"],data:109},{key:["active directory"],data:224},{key:["active directory","meraki"],data:98},{key:["active directory","sophos","meraki"],data:94},{key:["manageengine","active directory","sophos"],data:103}];var v,x,L;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} data={[{
  key: ['A'],
  data: 12
}, {
  key: ['B'],
  data: 12
}, {
  key: ['A', 'B'],
  data: 2
}]} series={<VennSeries colorScheme="cybertron" arc={<VennArc strokeWidth={3} gradient={<Gradient />} />} label={<VennLabel labelType="key" showAll={false} />} />} />`,...(L=(x=d.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var O,C,W;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`() => <VennDiagram type="euler" height={450} width={450} data={[{
  key: ['A'],
  data: 4
}, {
  key: ['B'],
  data: 1
}, {
  key: ['A', 'B'],
  data: 1
}]} />`,...(W=(C=c.parameters)==null?void 0:C.docs)==null?void 0:W.source}}};var E,P,T;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`() => <VennDiagram type="starEuler" height={450} width={450} data={eulerData} series={<VennSeries colorScheme={['#868686']} arc={<VennArc strokeWidth={1} stroke={'#fff'} gradient={<Gradient />} />} label={<VennLabel labelType={'value'} showAll={true} fill={'#fff'} />} outerLabel={<VennOuterLabel fill={'#fff'} />} />} />`,...(T=(P=h.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var j,_,G;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`() => <VennDiagram type="starEuler" height={450} width={450} data={eulerData} series={<VennSeries colorScheme={['#eee']} label={<VennLabel labelType="value" showAll={true} />} outerLabel={<VennOuterLabel format={data => {
  // set some static height/width expectations
  const height = 50;
  const width = 50;

  // Calculate some offsets based on size of your element
  const offsetX = data.set.align !== 'start' ? -width / 2 : 0;
  const offsetY = data.set.verticalAlign !== 'top' ? -height / 2 : 0;

  // Pass a foreign object
  return <foreignObject height={height} width={width} x={offsetX} y={offsetY}>
                  <svg height={height} width={width} viewBox="-7 -7 25 25">
                    <path d={starPath} style={{
        fill: 'lime',
        stroke: 'purple',
        strokeWidth: 1.5
      }} />
                  </svg>
                </foreignObject>;
}} />} />} />`,...(G=(_=l.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var N,z,I;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} data={[{
  key: ['A'],
  data: 4
}, {
  key: ['B'],
  data: 1
}, {
  key: ['A', 'B'],
  data: 1
}]} series={<VennSeries selections={['A|B', 'B']} arc={<VennArc stroke={(_data, _index, active, hovered) => {
  if (hovered) {
    return 'blue';
  } else if (active) {
    return 'green';
  }
  return 'white';
}} />} />} />`,...(I=(z=m.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var X,Y,M;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} type="starEuler" data={eulerData} series={<VennSeries colorScheme={(data, index) => {
  return index % 2 ? 'white' : 'grey';
}} arc={<VennArc stroke={(data, index, active, hovered) => {
  if (hovered) {
    return 'blue';
  } else if (active) {
    return 'green';
  }
  return 'white';
}} />} />} />`,...(M=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:M.source}}};var F,$,q;k.parameters={...k.parameters,docs:{...(F=k.parameters)==null?void 0:F.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} data={[{
  key: ['A'],
  data: 50
}, {
  key: ['B'],
  data: 12
}, {
  key: ['A', 'B'],
  data: 5
}]} />`,...(q=($=k.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var H,J,K;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`() => <VennDiagram height={250} width={250} data={[{
  key: ['Department of Defense'],
  data: 50
}, {
  key: ['Office of President'],
  data: 50
}, {
  key: ['Department of Defense', 'Office of President'],
  data: 25
}]} />`,...(K=(J=p.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,R,U;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} data={[{
  key: ['A'],
  data: 12
}, {
  key: ['B'],
  data: 12
}, {
  key: ['C'],
  data: 12
}, {
  key: ['D'],
  data: 12
}, {
  key: ['A', 'B'],
  data: 2
}, {
  key: ['B', 'C'],
  data: 2
}, {
  key: ['A', 'C'],
  data: 5
}, {
  key: ['A', 'B', 'C'],
  data: 10
}, {
  key: ['B', 'D'],
  data: 1
}, {
  key: ['D', 'A'],
  data: 1
}, {
  key: ['D', 'A', 'B'],
  data: 1
}]} series={<VennSeries colorScheme={['#2d60e8']} />} />`,...(U=(R=g.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var Z,ee,ae;u.parameters={...u.parameters,docs:{...(Z=u.parameters)==null?void 0:Z.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} data={[{
  key: ['A'],
  data: 22
}, {
  key: ['B'],
  data: 12
}, {
  key: ['C'],
  data: 13
}, {
  key: ['D'],
  data: 22
}]} />`,...(ae=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var te,re,ne;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} series={<VennSeries arc={<VennArc mask={<Stripes />} strokeWidth={1} initialOpacity={0.9} activeOpacity={1} />} />} data={[{
  key: ['A'],
  data: 12
}, {
  key: ['B'],
  data: 12
}, {
  key: ['A', 'B'],
  data: 2
}]} />`,...(ne=(re=f.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var se,ie,oe;A.parameters={...A.parameters,docs:{...(se=A.parameters)==null?void 0:se.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} series={<VennSeries arc={<VennArc strokeWidth={5} fill="transparent" stroke={schemes.cybertron[0]} />} />} data={[{
  key: ['A'],
  data: 12
}, {
  key: ['B'],
  data: 12
}, {
  key: ['A', 'B'],
  data: 2
}]} />`,...(oe=(ie=A.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var de,ce,he;w.parameters={...w.parameters,docs:{...(de=w.parameters)==null?void 0:de.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} series={<VennSeries label={null} arc={<VennArc strokeWidth={5} />} />} data={[{
  key: ['A'],
  data: 12
}, {
  key: ['B'],
  data: 12
}]} />`,...(he=(ce=w.parameters)==null?void 0:ce.docs)==null?void 0:he.source}}};var le,me,ye;B.parameters={...B.parameters,docs:{...(le=B.parameters)==null?void 0:le.docs,source:{originalSource:`() => <VennDiagram height={450} width={450} series={<VennSeries animated={false} />} data={[{
  key: ['A'],
  data: 12
}, {
  key: ['B'],
  data: 12
}, {
  key: ['A', 'B'],
  data: 2
}]} />`,...(ye=(me=B.parameters)==null?void 0:me.docs)==null?void 0:ye.source}}};var ke,pe,ge;b.parameters={...b.parameters,docs:{...(ke=b.parameters)==null?void 0:ke.docs,source:{originalSource:`() => <div style={{
  width: '50vw',
  height: '50vh',
  border: 'solid 1px red'
}}>
    <VennDiagram data={[{
    key: ['A'],
    data: 12
  }, {
    key: ['B'],
    data: 12
  }, {
    key: ['A', 'B'],
    data: 2
  }]} />
  </div>`,...(ge=(pe=b.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};export{b as Autosize,y as CustomColors,c as Euler,l as LabelIcons,k as LargeOffsets,p as LongText,g as ManyIntersections,f as Mask,B as NoAnimation,A as NoFill,u as NoIntersections,w as NoLabel,m as Selections,d as Simple,h as StarEuler,Re as default};
