import{j as e}from"./jsx-runtime-86dfebf6.js";import{S as r}from"./SequentialLegend-1647127f.js";import"./moment-a9aaa855.js";import"./sonar-ace0ce62.js";import{h as u}from"./heatmap-2bd15d7a.js";import"./index-1b03fe98.js";import"./index-256d607f.js";import"./chroma-699b8ba0.js";import"./range-163cdb4a.js";const b={title:"Utils/Legend/Sequential/Horizontal"},t=()=>e("div",{style:{width:"250px"},children:e(r,{data:u,orientation:"horizontal"})}),a=()=>e("div",{style:{width:"250px"},children:e(r,{orientation:"horizontal",data:[{key:"Foo",data:5e7},{key:"Bar",data:0}]})}),o=()=>e("div",{style:{width:"250px"},children:e(r,{data:u,orientation:"horizontal",colorScheme:["rgb(255, 248, 225)","rgb(255, 111, 0)"]})});var i,n,s;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`() => <div style={{
  width: '250px'
}}>
      <SequentialLegend data={heatmapSimpleData} orientation="horizontal" />
    </div>`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var d,l,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`() => <div style={{
  width: '250px'
}}>
      <SequentialLegend orientation="horizontal" data={[{
    key: 'Foo',
    data: 50000000
  }, {
    key: 'Bar',
    data: 0
  }]} />
    </div>`,...(p=(l=a.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var m,c,h;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => <div style={{
  width: '250px'
}}>
      <SequentialLegend data={heatmapSimpleData} orientation="horizontal" colorScheme={['rgb(255, 248, 225)', 'rgb(255, 111, 0)']} />
    </div>`,...(h=(c=o.parameters)==null?void 0:c.docs)==null?void 0:h.source}}};export{t as Simple,o as _CustomColors,a as _LongText,b as default};
