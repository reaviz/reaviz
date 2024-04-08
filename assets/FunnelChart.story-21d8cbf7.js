import{j as e}from"./jsx-runtime-86dfebf6.js";import"./RadialValueMarker-7b3f8322.js";import"./RadialAxis-6c2bc59c.js";import{T as D}from"./schemes-56affe43.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./range-163cdb4a.js";import"./index-256d607f.js";import"./Count-a38a1947.js";import{F as a,b as i,c as h,d as p,e as N,a as t}from"./index-6ed4b00b.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./time-a9784969.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./SVGVisualElement-f20753d9.js";import"./interpolation-4baac368.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./utils-83ce1bd4.js";import"./area-a8b9ef93.js";const oe={title:"Charts/Funnel Chart",component:a,subcomponents:{FunnelArc:i,FunnelAxis:h,FunnelAxisLabel:p,FunnelAxisLine:N,FunnelSeries:t}},M=l=>e(a,{...l}),r=M.bind({});r.args={height:300,width:500,data:[{key:"Visited Site",data:1e3},{key:"Added to Cart",data:900},{key:"Initiated Checkout",data:600},{key:"Purchased",data:400}]};const d=M.bind({});d.args={height:300,width:500,data:[{key:"Visited Site",data:15e3},{key:"Added to Cart",data:12e3},{key:"Initiated Checkout",data:11e3},{key:"Purchased",data:6e3},{key:"Subscribed",data:5e3},{key:"Became a Member",data:3e3},{key:"Upgraded to Premium",data:1e3},{key:"Became a VIP",data:900}],series:e(t,{arc:e(i,{tooltip:e(D,{})}),onSegmentClick:l=>console.log(l)})};const n=()=>e(a,{height:300,width:500,series:e(t,{arc:e(i,{interpolation:"step"})}),interpolation:"curveBasis",data:[{key:"Visited Site",data:1e3},{key:"Added to Cart",data:900},{key:"Initiated Checkout",data:600},{key:"Purchased",data:400}]}),s=()=>e("div",{style:{width:"90vw",height:"90vh",border:"solid 1px red"},children:e(a,{data:[{key:"Visited Site",data:1e3},{key:"Added to Cart",data:900},{key:"Initiated Checkout",data:600},{key:"Purchased",data:400}]})}),o=()=>e(a,{height:400,width:800,data:[{key:"Visited Site",data:1e3},{key:"Added to Cart",data:900},{key:"Initiated Checkout",data:600},{key:"Purchased",data:400}],series:e(t,{arc:e(i,{variant:"layered",colorScheme:["#013027","#047662","#06B899"],gradient:null})})}),c=()=>e(a,{height:300,width:500,series:e(t,{axis:e(h,{label:e(p,{position:"bottom"})})}),data:[{key:"Visited Site",data:1e3},{key:"Added to Cart",data:900},{key:"Initiated Checkout",data:600},{key:"Purchased",data:400}]}),u=()=>e(a,{height:300,width:500,series:e(t,{arc:e(i,{tooltip:e(D,{})}),axis:e(h,{label:e(p,{showValue:!1})})}),data:[{key:"Visited Site",data:1e3},{key:"Added to Cart",data:900},{key:"Initiated Checkout",data:600},{key:"Purchased",data:400}]});var m,k,y;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:"args => <FunnelChart {...args} />",...(y=(k=r.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var C,g,S;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:"args => <FunnelChart {...args} />",...(S=(g=d.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var F,A,b;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`() => <FunnelChart height={300} width={500} series={<FunnelSeries arc={<FunnelArc interpolation='step' />} />} interpolation="curveBasis" data={[{
  key: 'Visited Site',
  data: 1000
}, {
  key: 'Added to Cart',
  data: 900
}, {
  key: 'Initiated Checkout',
  data: 600
}, {
  key: 'Purchased',
  data: 400
}]} />`,...(b=(A=n.parameters)==null?void 0:A.docs)==null?void 0:b.source}}};var w,V,x;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  width: '90vw',
  height: '90vh',
  border: 'solid 1px red'
}}>
    <FunnelChart data={[{
    key: 'Visited Site',
    data: 1000
  }, {
    key: 'Added to Cart',
    data: 900
  }, {
    key: 'Initiated Checkout',
    data: 600
  }, {
    key: 'Purchased',
    data: 400
  }]} />
  </div>`,...(x=(V=s.parameters)==null?void 0:V.docs)==null?void 0:x.source}}};var P,I,v;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`() => <FunnelChart height={400} width={800} data={[{
  key: 'Visited Site',
  data: 1000
}, {
  key: 'Added to Cart',
  data: 900
}, {
  key: 'Initiated Checkout',
  data: 600
}, {
  key: 'Purchased',
  data: 400
}]} series={<FunnelSeries arc={<FunnelArc variant="layered" colorScheme={['#013027', '#047662', '#06B899']} gradient={null} />} />} />`,...(v=(I=o.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var B,L,f;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`() => <FunnelChart height={300} width={500} series={<FunnelSeries axis={<FunnelAxis label={<FunnelAxisLabel position="bottom" />} />} />} data={[{
  key: 'Visited Site',
  data: 1000
}, {
  key: 'Added to Cart',
  data: 900
}, {
  key: 'Initiated Checkout',
  data: 600
}, {
  key: 'Purchased',
  data: 400
}]} />`,...(f=(L=c.parameters)==null?void 0:L.docs)==null?void 0:f.source}}};var T,j,z;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`() => <FunnelChart height={300} width={500} series={<FunnelSeries arc={<FunnelArc tooltip={<TooltipArea />} />} axis={<FunnelAxis label={<FunnelAxisLabel showValue={false} />} />} />} data={[{
  key: 'Visited Site',
  data: 1000
}, {
  key: 'Added to Cart',
  data: 900
}, {
  key: 'Initiated Checkout',
  data: 600
}, {
  key: 'Purchased',
  data: 400
}]} />`,...(z=(j=u.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};export{s as Autosize,r as Basic,n as Interpolation,c as LabelPosition,d as LargeDataset,o as Layered,u as NoValue,oe as default};
