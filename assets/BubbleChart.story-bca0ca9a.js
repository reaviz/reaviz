import{j as e,a as V}from"./jsx-runtime-86dfebf6.js";import{B as a,a as r,c as _,b as g}from"./BubbleChart-9604dd9a.js";import{r as q}from"./sonar-ace0ce62.js";import{G as E}from"./schemes-56affe43.js";import{S as H}from"./RadialValueMarker-7b3f8322.js";import"./index-1b03fe98.js";import{r as M}from"./range-163cdb4a.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./index-256d607f.js";import"./frame-a8f3761f.js";import"./RadialAxis-6c2bc59c.js";import"./chroma-699b8ba0.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./Count-a38a1947.js";import"./SVGVisualElement-f20753d9.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./useHoverIntent-9f4f4ce5.js";import"./utils-83ce1bd4.js";import"./invert-4b58fa06.js";import"./index-9494de61.js";import"./constant-7ff63248.js";import"./moment-a9aaa855.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./time-a9784969.js";const J=""+new URL("okta-7a5d272e.svg",import.meta.url).href,Q=""+new URL("aws-54304492.svg",import.meta.url).href,X=""+new URL("twillo-2f3a10dd.svg",import.meta.url).href,Y=""+new URL("sendgrid-9218b920.svg",import.meta.url).href,o=[{key:"AWS",data:100},{key:"SendGrid",data:45},{key:"Okta",data:75},{key:"Twillo",data:25}],ve={title:"Charts/Bubble Chart",component:a,subcomponents:{BubbleSeries:r,BubbleLabel:_,Bubble:g}},i=()=>e(a,{data:o,height:450,width:450,series:e(r,{colorScheme:"cybertron"})}),n=()=>e(a,{data:o,height:450,width:450,series:e(r,{colorScheme:"cybertron",bubble:e(g,{mask:e(H,{})})})}),d=()=>e(a,{data:o,height:450,width:450,series:e(r,{colorScheme:"cybertron",bubble:e(g,{gradient:e(E,{})})})}),m=()=>e(a,{data:o,height:450,width:450,series:e(r,{label:e(_,{format:t=>{const s={AWS:Q,SendGrid:Y,Okta:J,Twillo:X};return V("g",{children:[e("foreignObject",{height:40,width:40,x:-40/2,y:-50/2,children:e("img",{src:s[t.data.key],width:40,height:40})}),e("text",{dy:35,fill:"white",textAnchor:"middle",children:t.data.key})]})}})})}),h=()=>e(a,{data:[{key:"Department of Curtains and Interior Design",data:100},{key:"Fresh Kitchen Pasta Dish and Pizza",data:45},{key:"Short Name",data:25}],height:450,width:450}),c=()=>e(a,{height:450,width:450,series:e(r,{animated:!1}),data:o}),l=()=>{const t=M(15).map(s=>({key:`${s}`,data:q(1,500)}));return e(a,{data:t,height:450,width:450})},p=()=>{const t=M(100).map(s=>({key:`${s+1}`,data:1}));return e(a,{data:t,height:450,width:450})},b=()=>e("div",{style:{width:"70vw",height:"70vh",border:"solid 1px red"},children:e(a,{data:o})});var u,w,S;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:'() => <BubbleChart data={simpleData} height={450} width={450} series={<BubbleSeries colorScheme="cybertron" />} />',...(S=(w=i.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var y,k,B;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:'() => <BubbleChart data={simpleData} height={450} width={450} series={<BubbleSeries colorScheme="cybertron" bubble={<Bubble mask={<Stripes />} />} />} />',...(B=(k=n.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var D,f,C;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:'() => <BubbleChart data={simpleData} height={450} width={450} series={<BubbleSeries colorScheme="cybertron" bubble={<Bubble gradient={<GradientBG />} />} />} />',...(C=(f=d.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var L,x,v;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`() => <BubbleChart data={simpleData} height={450} width={450} series={<BubbleSeries label={<BubbleLabel format={data => {
  const logos = {
    AWS: awsLogo,
    SendGrid: sendgridLogo,
    Okta: oktaLogo,
    Twillo: twilloLogo
  };
  return <g>
                  <foreignObject height={40} width={40} x={-40 / 2} y={-50 / 2}>
                    <img src={logos[data.data.key]} width={40} height={40} />
                  </foreignObject>
                  <text dy={35} fill="white" textAnchor="middle">
                    {data.data.key}
                  </text>
                </g>;
}} />} />} />`,...(v=(x=m.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var G,A,j;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const longData: ChartShallowDataShape[] = [{
    key: 'Department of Curtains and Interior Design',
    data: 100
  }, {
    key: 'Fresh Kitchen Pasta Dish and Pizza',
    data: 45
  }, {
    key: 'Short Name',
    data: 25
  }];
  return <BubbleChart data={longData} height={450} width={450} />;
}`,...(j=(A=h.parameters)==null?void 0:A.docs)==null?void 0:j.source}}};var z,O,N;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:"() => <BubbleChart height={450} width={450} series={<BubbleSeries animated={false} />} data={simpleData} />",...(N=(O=c.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var $,P,R;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const longData: ChartShallowDataShape[] = range(15).map(o => ({
    key: \`\${o}\`,
    data: randomNumber(1, 500)
  }));
  return <BubbleChart data={longData} height={450} width={450} />;
}`,...(R=(P=l.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var T,U,I;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const longData: ChartShallowDataShape[] = range(100).map(o => ({
    key: \`\${o + 1}\`,
    data: 1
  }));
  return <BubbleChart data={longData} height={450} width={450} />;
}`,...(I=(U=p.parameters)==null?void 0:U.docs)==null?void 0:I.source}}};var W,F,K;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`() => <div style={{
  width: '70vw',
  height: '70vh',
  border: 'solid 1px red'
}}>
    <BubbleChart data={simpleData} />
  </div>`,...(K=(F=b.parameters)==null?void 0:F.docs)==null?void 0:K.source}}};export{b as Autosize,d as Gradient,m as Icons,h as LongText,n as Mask,c as NoAnimation,i as Simple,l as VaryingSizes,p as _100Bubbles,ve as default};
