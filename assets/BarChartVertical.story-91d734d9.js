import{j as a,a as ua}from"./jsx-runtime-86dfebf6.js";import{r as f}from"./index-1b03fe98.js";import{B as e,a as r,b as s,c as na,G as Sa}from"./BarChart-9c825fb0.js";import"./moment-a9aaa855.js";import{c as o,l as ha,n as Ba}from"./category-b5cb91f4.js";import"./sonar-ace0ce62.js";import{s as D}from"./schemes-56affe43.js";import"./RadialAxis-6c2bc59c.js";import{r as Ca}from"./range-163cdb4a.js";import"./index-256d607f.js";import{c as wa}from"./chroma-699b8ba0.js";import{S as Da}from"./RadialValueMarker-7b3f8322.js";import"./functions-234b1417.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./frame-a8f3761f.js";import"./utils-83ce1bd4.js";import"./helper-26bacd48.js";import"./quantile-a1f83f78.js";import"./DiscreteLegendEntry-49610185.js";import"./SequentialLegend-1647127f.js";import"./Count-a38a1947.js";import"./SVGVisualElement-f20753d9.js";import"./builder-9833ba7e.js";import"./expand-7b65a05b.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";import"./time-a9784969.js";const Ra={title:"Charts/Bar Chart/Vertical/Single Series",component:e,subcomponents:{BarSeries:r,Bar:s,BarLabel:na,GuideBar:Sa}},d=()=>a(e,{width:400,height:350,data:o,series:a(r,{colorScheme:D[0],padding:.1,bar:a(s,{})})}),n=()=>a(e,{width:350,height:250,data:o,series:a(r,{bar:a(s,{style:t=>{if(t.key==="DLP")return console.log("Style callback...",t),{fill:"blue"}}})})}),h=()=>a(e,{width:350,height:350,data:ha,series:a(r,{colorScheme:D[0]})}),m=()=>a(e,{width:350,height:250,data:o,series:a(r,{bar:a(s,{mask:a(Da,{})})})}),p=()=>a(e,{width:350,height:250,data:o,series:a(r,{colorScheme:(t,c)=>c%2?"#418AD7":"#ACB7C9"})}),l=()=>a(e,{width:350,height:250,data:o,series:a(r,{bar:a(s,{label:a(na,{position:"top"})})})}),g=()=>a(e,{width:350,height:250,series:a(r,{bar:a(s,{width:5})}),data:o}),u=()=>{const[t,c]=f.useState([...ha]),ma=()=>{const la=Math.floor(Math.random()*4)+1,b=[...t];let y=0;for(;y<=la;){const ga=Math.floor(Math.random()*t.length);b[ga].data=Math.floor(Math.random()*91)+10,y++}c(b)},pa=()=>{c([...t].reverse())};return ua(f.Fragment,{children:[a(e,{width:350,height:350,data:t,series:a(r,{colorScheme:wa.scale(["ACB7C9","418AD7"]).colors(t.length)})}),a("br",{}),a("button",{onClick:ma,children:"Update"}),a("button",{onClick:pa,children:"Sort"})]})},S=()=>a("div",{style:{width:"50vw",height:"50vh",border:"solid 1px red"},children:a(e,{data:o})}),B=()=>Ca(15).map(t=>a("div",{style:{width:"250px",height:"250px",border:"solid 1px green",margin:"25px",display:"inline-block"},children:a(e,{data:o})},t)),C=()=>a(e,{width:350,height:250,data:o,series:a(r,{animated:!1})}),w=()=>a(e,{width:350,height:350,data:o,series:a(r,{type:"waterfall",colorScheme:D[0]})}),i=()=>a(e,{width:350,height:250,data:Ba,series:a(r,{colorScheme:D[0]})});i.story={name:"Non-Zero"};var x,k,v;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:"() => <BarChart width={400} height={350} data={categoryData} series={<BarSeries colorScheme={schemes[0]} padding={0.1} bar={<Bar />} />} />",...(v=(k=d.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var M,A,L;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`() => <BarChart width={350} height={250} data={categoryData} series={<BarSeries bar={<Bar style={data => {
  if (data.key === 'DLP') {
    console.log('Style callback...', data);
    return {
      fill: 'blue'
    };
  }
}} />} />} />`,...(L=(A=n.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var Z,j,F;h.parameters={...h.parameters,docs:{...(Z=h.parameters)==null?void 0:Z.docs,source:{originalSource:"() => <BarChart width={350} height={350} data={largeCategoryData} series={<BarSeries colorScheme={schemes[0]} />} />",...(F=(j=h.parameters)==null?void 0:j.docs)==null?void 0:F.source}}};var I,N,P;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:"() => <BarChart width={350} height={250} data={categoryData} series={<BarSeries bar={<Bar mask={<Stripes />} />} />} />",...(P=(N=m.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var U,_,G;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:"() => <BarChart width={350} height={250} data={categoryData} series={<BarSeries colorScheme={(_data, index) => index % 2 ? '#418AD7' : '#ACB7C9'} />} />",...(G=(_=p.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var V,W,z;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:"() => <BarChart width={350} height={250} data={categoryData} series={<BarSeries bar={<Bar label={<BarLabel position={'top'} />} />} />} />",...(z=(W=l.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var E,q,H;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:"() => <BarChart width={350} height={250} series={<BarSeries bar={<Bar width={5} />} />} data={categoryData} />",...(H=(q=g.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};var J,K,O;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const [data, setData] = useState([...largeCategoryData]);
  const updateData = () => {
    const updateCount = Math.floor(Math.random() * 4) + 1;
    const newData = [...data];
    let idx = 0;
    while (idx <= updateCount) {
      const updateIndex = Math.floor(Math.random() * data.length);
      newData[updateIndex].data = Math.floor(Math.random() * 91) + 10;
      idx++;
    }
    setData(newData);
  };
  const sortData = () => {
    setData([...data].reverse());
  };
  return <Fragment>
      <BarChart width={350} height={350} data={data} series={<BarSeries colorScheme={chroma.scale(['ACB7C9', '418AD7']).colors(data.length)} />} />
      <br />
      <button onClick={updateData}>Update</button>
      <button onClick={sortData}>Sort</button>
    </Fragment>;
}`,...(O=(K=u.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};var Q,R,T;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`() => <div style={{
  width: '50vw',
  height: '50vh',
  border: 'solid 1px red'
}}>
    <BarChart data={categoryData} />
  </div>`,...(T=(R=S.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var X,Y,$;B.parameters={...B.parameters,docs:{...(X=B.parameters)==null?void 0:X.docs,source:{originalSource:`() => range(15).map(i => <div key={i} style={{
  width: '250px',
  height: '250px',
  border: 'solid 1px green',
  margin: '25px',
  display: 'inline-block'
}}>
      <BarChart data={categoryData} />
    </div>)`,...($=(Y=B.parameters)==null?void 0:Y.docs)==null?void 0:$.source}}};var aa,ea,ra;C.parameters={...C.parameters,docs:{...(aa=C.parameters)==null?void 0:aa.docs,source:{originalSource:"() => <BarChart width={350} height={250} data={categoryData} series={<BarSeries animated={false} />} />",...(ra=(ea=C.parameters)==null?void 0:ea.docs)==null?void 0:ra.source}}};var ta,oa,sa;w.parameters={...w.parameters,docs:{...(ta=w.parameters)==null?void 0:ta.docs,source:{originalSource:'() => <BarChart width={350} height={350} data={categoryData} series={<BarSeries type="waterfall" colorScheme={schemes[0]} />} />',...(sa=(oa=w.parameters)==null?void 0:oa.docs)==null?void 0:sa.source}}};var ia,ca,da;i.parameters={...i.parameters,docs:{...(ia=i.parameters)==null?void 0:ia.docs,source:{originalSource:"() => <BarChart width={350} height={250} data={nonZeroCategoryData} series={<BarSeries colorScheme={schemes[0]} />} />",...(da=(ca=i.parameters)==null?void 0:ca.docs)==null?void 0:da.source}}};export{S as Autosize,g as CustomBarWidth,p as CustomColors,n as CustomStyle,l as Labels,h as LargeDataset,u as LiveUpdating,m as Mask,C as NoAnimation,i as NonZero,B as Performance,d as Simple,w as Waterfall,Ra as default};
