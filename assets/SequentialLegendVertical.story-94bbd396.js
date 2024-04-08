import{j as e}from"./jsx-runtime-86dfebf6.js";import{S as o}from"./SequentialLegend-1647127f.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import{h as g}from"./heatmap-2bd15d7a.js";import"./index-1b03fe98.js";import"./index-256d607f.js";import"./chroma-699b8ba0.js";import"./range-163cdb4a.js";const k={title:"Utils/Legend/Sequential/Vertical"},a=()=>e("div",{style:{height:"250px"},children:e(o,{data:g})}),t=()=>e("div",{style:{height:"250px"},children:e(o,{data:[{key:"Foo",data:5e7},{key:"Bar",data:0}]})}),r=()=>e("div",{style:{height:"250px"},children:e(o,{data:g,colorScheme:["rgb(255, 248, 225)","rgb(255, 111, 0)"]})});var i,s,n;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`() => <div style={{
  height: '250px'
}}>
      <SequentialLegend data={heatmapSimpleData} />
    </div>`,...(n=(s=a.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var d,p,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => <div style={{
  height: '250px'
}}>
      <SequentialLegend data={[{
    key: 'Foo',
    data: 50000000
  }, {
    key: 'Bar',
    data: 0
  }]} />
    </div>`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var c,l,h;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`() => <div style={{
  height: '250px'
}}>
      <SequentialLegend data={heatmapSimpleData} colorScheme={['rgb(255, 248, 225)', 'rgb(255, 111, 0)']} />
    </div>`,...(h=(l=r.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};export{r as CustomColors,t as LongText,a as Simple,k as default};
