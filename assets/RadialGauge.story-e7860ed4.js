import{j as e,a as G}from"./jsx-runtime-86dfebf6.js";import{R as a,a as r,b as g,S as Q,d as ae,e as te}from"./RadialGauge-0aea5fca.js";import"./moment-a9aaa855.js";import{c as p,a as re}from"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import{m as ie,G as ne}from"./schemes-56affe43.js";import"./index-1b03fe98.js";import"./helper-26bacd48.js";import"./RadialAxis-6c2bc59c.js";import"./range-163cdb4a.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./index-256d607f.js";import"./frame-a8f3761f.js";import"./chroma-699b8ba0.js";import"./quantile-a1f83f78.js";import"./PieChart-adaf79c6.js";import"./useHoverIntent-9f4f4ce5.js";import"./RadialValueMarker-7b3f8322.js";import"./time-a9784969.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./Count-a38a1947.js";import"./SVGVisualElement-f20753d9.js";import"./index-9494de61.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const Le={title:"Charts/Gauge/Radial"},o=()=>e(a,{data:[{key:"Austin, TX",data:24}],startAngle:0,endAngle:Math.PI*2,height:300,width:300,minValue:0,maxValue:100,series:e(r,{arcWidth:10,colorScheme:["#418AD7"]})}),s=()=>e(a,{data:[{key:"Austin, TX",data:24}],width:350,height:350,series:e(r,{outerArc:e(g,{fill:"gray",animated:!1})})}),c=()=>e(a,{data:[{key:"Austin, TX",data:24}],height:300,width:300,series:e(r,{outerArc:e(g,{disabled:!0,animated:!1}),innerArc:e(g,{cornerRadius:12.5}),arcWidth:25,colorScheme:["#38e52c"]})}),d=()=>{const i=ie(p,A=>A.data),S=["#CE003E","#DF8D03","#00ECB1","#9FA9B1"];return e(a,{data:p,startAngle:0,endAngle:Math.PI*2,height:300,width:700,minValue:0,maxValue:i,series:e(r,{colorScheme:S})})},l=()=>e(a,{data:p,width:350,height:350,series:e(r,{minGaugeWidth:150})}),m=()=>{const i=["#CE003E","#DF8D03","#00ECB1","#9FA9B1"];return e(a,{data:p,startAngle:0,endAngle:Math.PI*2,height:300,width:700,minValue:0,maxValue:[10,20,30,40],series:e(Q,{arcPadding:.1,fillFactor:.3,colorScheme:i,label:e(ae,{label:"Security Threats"}),descriptionLabel:e(te,{label:"Last 12 months"})})})},oe=({width:i,height:S,data:A,colorSchemaType:U})=>{const f="#948d62",F={"Third Party":"#DF8D03",Malware:"#993FFF",DLP:"#D9C0FF",IDS:"#00FFC7"},Y=ee=>{const y=ee.key;return typeof y=="string"&&F[y]?F[y]:f},Z=["#c42656","#03df2f","#6747b4","#ccd016"];let n;switch(U){case"handlerFn":n=Y;break;case"array":n=Z;break;default:n=f}const $=G("text",{x:"0",y:-20,textAnchor:"middle",alignmentBaseline:"middle",children:[e("tspan",{x:"0",fontSize:16,fontWeight:700,fill:"#E9E9E9",children:"Hours Complete"}),e("tspan",{x:"0",dy:"1.2em",fontSize:32,fontWeight:800,fill:"#FFFFFF",children:"67%"}),G("tspan",{x:"0",dy:"1.5em",fontSize:14,fill:"#c2b0e7",children:[e("tspan",{fontWeight:"bold",fill:"#00E5AF",children:"↑ 4%"}),"from last week"]})]});return e(a,{data:A,startAngle:0,endAngle:Math.PI*2,height:S,width:i,minValue:0,maxValue:[50,26,100],series:e(Q,{arcPadding:.5,fillFactor:.3,colorScheme:n,descriptionLabel:$})})},t=oe.bind({});t.args={width:700,height:300,data:re,maxValue:void 0,colorSchemaType:"handlerFn"};t.argTypes={width:{control:{type:"number",min:300,max:700,step:10}},height:{control:{type:"number",min:300,max:700,step:10}},data:{type:"object"},maxValue:{type:"number"},colorSchemaType:{control:"inline-radio",options:["handlerFn","array","string"]}};const h=()=>e("div",{style:{width:250,height:250,border:"solid 1px red"},children:e(a,{data:[{key:"Austin, TX",data:24}]})}),u=()=>e(a,{height:300,width:700,data:[{key:"Austin, TX",data:24}],series:e(r,{arcWidth:15,innerArc:e(g,{cornerRadius:12.5,gradient:e(ne,{})})})});var R,b,k;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`() => <RadialGauge data={[{
  key: 'Austin, TX',
  data: 24
}]} startAngle={0} endAngle={Math.PI * 2} height={300} width={300} minValue={0} maxValue={100} series={<RadialGaugeSeries arcWidth={10} colorScheme={['#418AD7']} />} />`,...(k=(b=o.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var x,D,w;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`() => <RadialGauge data={[{
  key: 'Austin, TX',
  data: 24
}]} width={350} height={350} series={<RadialGaugeSeries outerArc={<RadialGaugeArc fill="gray" animated={false} />} />} />`,...(w=(D=s.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var C,E,V;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`() => <RadialGauge data={[{
  key: 'Austin, TX',
  data: 24
}]} height={300} width={300} series={<RadialGaugeSeries outerArc={<RadialGaugeArc disabled={true} animated={false} />} innerArc={<RadialGaugeArc cornerRadius={12.5} />} arcWidth={25} colorScheme={['#38e52c']} />} />`,...(V=(E=c.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var T,P,W;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const maxValue = max(categoryData, d => (d.data as number));
  const colorScheme: string[] = ['#CE003E', '#DF8D03', '#00ECB1', '#9FA9B1'];
  return <RadialGauge data={categoryData} startAngle={0} endAngle={Math.PI * 2} height={300} width={700} minValue={0} maxValue={maxValue} series={<RadialGaugeSeries colorScheme={colorScheme} />} />;
}`,...(W=(P=d.parameters)==null?void 0:P.docs)==null?void 0:W.source}}};var L,M,B;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:"() => <RadialGauge data={categoryData} width={350} height={350} series={<RadialGaugeSeries minGaugeWidth={150} />} />",...(B=(M=l.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var I,X,z;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const colorScheme: string[] = ['#CE003E', '#DF8D03', '#00ECB1', '#9FA9B1'];
  return <RadialGauge data={categoryData} startAngle={0} endAngle={Math.PI * 2} height={300} width={700} minValue={0} maxValue={[10, 20, 30, 40]} series={<StackedRadialGaugeSeries arcPadding={0.1} fillFactor={0.3} colorScheme={colorScheme} label={<StackedRadialGaugeValueLabel label="Security Threats" />} descriptionLabel={<StackedRadialGaugeDescriptionLabel label="Last 12 months" />} />} />;
}`,...(z=(X=m.parameters)==null?void 0:X.docs)==null?void 0:z.source}}};var H,j,v;t.parameters={...t.parameters,docs:{...(H=t.parameters)==null?void 0:H.docs,source:{originalSource:`({
  width,
  height,
  data,
  colorSchemaType
}) => {
  const defaultColor = '#948d62';
  const customColorScheme: Record<string, string> = {
    'Third Party': '#DF8D03',
    Malware: '#993FFF',
    DLP: '#D9C0FF',
    IDS: '#00FFC7'
  };
  const colorSchemeHandler = (data: ChartDataShape) => {
    const key = data.key;
    if (typeof key === 'string' && customColorScheme[key]) {
      return customColorScheme[key];
    }
    return defaultColor;
  };
  const colorSchemeArr: string[] = ['#c42656', '#03df2f', '#6747b4', '#ccd016'];
  let colorSchema: ColorSchemeType;
  switch (colorSchemaType) {
    case 'handlerFn':
      colorSchema = colorSchemeHandler;
      break;
    case 'array':
      colorSchema = colorSchemeArr;
      break;
    default:
      colorSchema = defaultColor;
  }
  const descriptionElement = <text x="0" y={-20} textAnchor="middle" alignmentBaseline="middle">
      <tspan x="0" fontSize={16} fontWeight={700} fill="#E9E9E9">
        Hours Complete
      </tspan>
      <tspan x="0" dy="1.2em" fontSize={32} fontWeight={800} fill="#FFFFFF">
        67%
      </tspan>
      <tspan x="0" dy="1.5em" fontSize={14} fill="#c2b0e7">
        <tspan fontWeight="bold" fill="#00E5AF">
          ↑ 4%
        </tspan>
        from last week
      </tspan>
    </text>;
  return <RadialGauge data={data} startAngle={0} endAngle={Math.PI * 2} height={height} width={width} minValue={0} maxValue={[50, 26, 100]} series={<StackedRadialGaugeSeries arcPadding={0.5} fillFactor={0.3} colorScheme={colorSchema} descriptionLabel={descriptionElement} />} />;
}`,...(v=(j=t.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var _,q,J;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`() => <div style={{
  width: 250,
  height: 250,
  border: 'solid 1px red'
}}>
    <RadialGauge data={[{
    key: 'Austin, TX',
    data: 24
  }]} />
  </div>`,...(J=(q=h.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var K,N,O;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`() => <RadialGauge height={300} width={700} data={[{
  key: 'Austin, TX',
  data: 24
}]} series={<RadialGaugeSeries arcWidth={15} innerArc={<RadialGaugeArc cornerRadius={12.5} gradient={<Gradient />} />} />} />`,...(O=(N=u.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};export{h as Autosize,c as CustomArc,s as FilledArc,t as GaugeStacked,d as Multi,l as MultiLine,o as Single,m as Stacked,u as WithGradient,Le as default};
