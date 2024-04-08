import{j as a}from"./jsx-runtime-86dfebf6.js";import{R as c,f as m,g as h,i as p}from"./RadialAxis-6c2bc59c.js";import{h as d}from"./moment-a9aaa855.js";import{r as x,e as g}from"./range-163cdb4a.js";import{b as f}from"./time-a9784969.js";import"./index-1b03fe98.js";import"./rdk-0beed5d4.js";import"./index-6fd5a17b.js";import"./index-256d607f.js";import"./frame-a8f3761f.js";const k=(()=>{const t=d().subtract(1,"day").startOf("day"),n=x(13).map(s=>({key:t.clone().add(s,"hour").toDate()})),l=g(n,s=>s.key);return f().range([0,2*Math.PI]).domain(l)})(),D={title:"Utils/Axis/Radial"},i=()=>a("div",{style:{padding:"10px"},children:a("svg",{width:600,height:600,children:a("g",{transform:"translate(300, 300)",children:a(c,{height:600,width:600,innerRadius:10,xScale:k,ticks:a(m,{tick:a(h,{label:a(p,{format:t=>d(t).format("h a")})})})})})})});var e,r,o;i.parameters={...i.parameters,docs:{...(e=i.parameters)==null?void 0:e.docs,source:{originalSource:`() => <div style={{
  padding: '10px'
}}>
    <svg width={600} height={600}>
      <g transform="translate(300, 300)">
        <RadialAxis height={600} width={600} innerRadius={10} xScale={xScale} ticks={<RadialAxisTickSeries tick={<RadialAxisTick label={<RadialAxisTickLabel format={d => moment(d).format('h a')} />} />} />} />
      </g>
    </svg>
  </div>`,...(o=(r=i.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};export{i as Simple,D as default};
