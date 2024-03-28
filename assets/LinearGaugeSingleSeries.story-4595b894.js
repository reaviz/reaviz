import{a as o,j as t}from"./jsx-runtime-86dfebf6.js";import{r as v}from"./index-1b03fe98.js";import{L as e,a as x,b as G,c as L}from"./LinearGauge-413f71f1.js";import"./schemes-b533a310.js";import"./RadialAxis-b01319ed.js";import"./range-163cdb4a.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./index-256d607f.js";import"./frame-a8f3761f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./chroma-699b8ba0.js";import"./SVGVisualElement-f20753d9.js";import"./builder-50dc9f34.js";import"./quantile-93c425ff.js";import"./BarChart-2f79ae09.js";import"./RadialValueMarker-1a9f2906.js";import"./time-988cb4fe.js";import"./functions-234b1417.js";import"./utils-e5e5469a.js";import"./helper-ba8553c0.js";import"./DiscreteLegendEntry-48737638.js";import"./SequentialLegend-13141cc9.js";import"./Count-a38a1947.js";import"./expand-48c2fbf4.js";import"./MarimekkoChart-c430ce4b.js";import"./StackedBarChart-a84c1e1a.js";import"./StackedNormalizedBarChart-66d4f7c3.js";import"./HistogramBarChart-1cddf159.js";const et={title:"Charts/Gauge/Linear/Single-Series",component:e,subcomponents:{LinearGaugeSeries:x,LinearGauge:e,LinearGaugeBar:G,LinearGaugeOuterBar:L}},a=()=>o("div",{style:{textAlign:"center"},children:[t("h2",{style:{color:"white",margin:0},children:"Risk Score"}),t(e,{height:30,width:300,data:{key:"Risk Score",data:80}})]}),i=()=>{const[d,b]=v.useState(300);return o("div",{style:{textAlign:"center"},children:[t("div",{style:{width:d,padding:5,border:"solid 1px red"},children:t(e,{height:20,data:{key:"Risk Score",data:80}})}),t("br",{}),t("button",{type:"button",onClick:()=>b(d===300?150:300),children:"Update Size"})]})},r=()=>t("div",{style:{textAlign:"center"},children:t(e,{height:30,width:300,data:{key:"Risk Score",data:[15,80]}})});r.story={name:"Non-Zero Start"};const n=()=>o("div",{style:{textAlign:"center"},children:[t(e,{height:15,width:300,data:{key:"Step 1",data:[0,15]}}),t("br",{}),t(e,{height:15,width:300,data:{key:"Step 2",data:[15,50]}}),t("br",{}),t(e,{height:15,width:300,data:{key:"Step 3",data:[50,55]}}),t("br",{}),t(e,{height:15,width:300,data:{key:"Step 4",data:[55,100]}})]});var s,p,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`() => <div style={{
  textAlign: 'center'
}}>
    <h2 style={{
    color: 'white',
    margin: 0
  }}>Risk Score</h2>
    <LinearGauge height={30} width={300} data={{
    key: 'Risk Score',
    data: 80
  }} />
  </div>`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var h,m,g;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [width, setWidth] = useState(300);
  return <div style={{
    textAlign: 'center'
  }}>
      <div style={{
      width,
      padding: 5,
      border: 'solid 1px red'
    }}>
        <LinearGauge height={20} data={{
        key: 'Risk Score',
        data: 80
      }} />
      </div>
      <br />
      <button type="button" onClick={() => setWidth(width === 300 ? 150 : 300)}>
        Update Size
      </button>
    </div>;
}`,...(g=(m=i.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var l,u,S;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`() => <div style={{
  textAlign: 'center'
}}>
    <LinearGauge height={30} width={300} data={{
    key: 'Risk Score',
    data: [15, 80]
  }} />
  </div>`,...(S=(u=r.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var y,k,w;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`() => <div style={{
  textAlign: 'center'
}}>
    <LinearGauge height={15} width={300} data={{
    key: 'Step 1',
    data: [0, 15]
  }} />
    <br />
    <LinearGauge height={15} width={300} data={{
    key: 'Step 2',
    data: [15, 50]
  }} />
    <br />
    <LinearGauge height={15} width={300} data={{
    key: 'Step 3',
    data: [50, 55]
  }} />
    <br />
    <LinearGauge height={15} width={300} data={{
    key: 'Step 4',
    data: [55, 100]
  }} />
  </div>`,...(w=(k=n.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};export{i as AutoSize,n as MultipleGauges,r as NonZeroStart,a as Simple,et as default};
