import{a as o,j as t}from"./jsx-runtime-86dfebf6.js";import{r as v}from"./index-1b03fe98.js";import{L as e,a as x,b as G,c as L}from"./LinearGauge-908fb904.js";import"./schemes-56affe43.js";import"./RadialAxis-6c2bc59c.js";import"./range-163cdb4a.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./index-256d607f.js";import"./frame-a8f3761f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./chroma-699b8ba0.js";import"./SVGVisualElement-f20753d9.js";import"./builder-9833ba7e.js";import"./quantile-a1f83f78.js";import"./BarChart-9c825fb0.js";import"./RadialValueMarker-7b3f8322.js";import"./time-a9784969.js";import"./functions-234b1417.js";import"./utils-83ce1bd4.js";import"./helper-26bacd48.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./Count-a38a1947.js";import"./expand-7b65a05b.js";import"./MarimekkoChart-d265de4f.js";import"./StackedBarChart-f620755a.js";import"./StackedNormalizedBarChart-67a599d9.js";import"./HistogramBarChart-3a034dc5.js";const et={title:"Charts/Gauge/Linear/Single-Series",component:e,subcomponents:{LinearGaugeSeries:x,LinearGauge:e,LinearGaugeBar:G,LinearGaugeOuterBar:L}},a=()=>o("div",{style:{textAlign:"center"},children:[t("h2",{style:{color:"white",margin:0},children:"Risk Score"}),t(e,{height:30,width:300,data:{key:"Risk Score",data:80}})]}),i=()=>{const[d,b]=v.useState(300);return o("div",{style:{textAlign:"center"},children:[t("div",{style:{width:d,padding:5,border:"solid 1px red"},children:t(e,{height:20,data:{key:"Risk Score",data:80}})}),t("br",{}),t("button",{type:"button",onClick:()=>b(d===300?150:300),children:"Update Size"})]})},r=()=>t("div",{style:{textAlign:"center"},children:t(e,{height:30,width:300,data:{key:"Risk Score",data:[15,80]}})});r.story={name:"Non-Zero Start"};const n=()=>o("div",{style:{textAlign:"center"},children:[t(e,{height:15,width:300,data:{key:"Step 1",data:[0,15]}}),t("br",{}),t(e,{height:15,width:300,data:{key:"Step 2",data:[15,50]}}),t("br",{}),t(e,{height:15,width:300,data:{key:"Step 3",data:[50,55]}}),t("br",{}),t(e,{height:15,width:300,data:{key:"Step 4",data:[55,100]}})]});var s,p,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`() => <div style={{
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
