import{j as n,a as r,F as o}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import{u as l}from"./index-2ef8b458.js";import{M as a}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function t(i){const e=Object.assign({h1:"h1",h2:"h2",p:"p",a:"a",ul:"ul",li:"li",code:"code",pre:"pre"},l(),i.components);return r(o,{children:[n(a,{title:"Docs/Getting Started/Quick Start"}),`
`,n(e.h1,{id:"getting-started",children:"Getting Started"}),`
`,n(e.h2,{id:"installing",children:"Installing"}),`
`,r(e.p,{children:["You can install REAVIZ with ",n(e.a,{href:"https://www.npmjs.com/package/reaviz",target:"_blank",rel:"nofollow noopener noreferrer",children:"NPM"})," or Yarn."]}),`
`,r(e.ul,{children:[`
`,r(e.li,{children:["NPM: ",n(e.code,{children:"npm install reaviz --save"})]}),`
`,r(e.li,{children:["YARN: ",n(e.code,{children:"yarn add reaviz"})]}),`
`]}),`
`,n(e.h2,{id:"configuration",children:"Configuration"}),`
`,r(e.p,{children:[`To customize various elements in the charts,
we use `,n(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables",target:"_blank",rel:"nofollow noopener noreferrer",children:"CSS Variables"}),`.
This gives you fine grain control over the styles
that is native to the browser. The color variables are:`]}),`
`,r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"--tooltip-background"})}),`
`,n(e.li,{children:n(e.code,{children:"--tooltip-color"})}),`
`,n(e.li,{children:n(e.code,{children:"--tooltip-border-radius"})}),`
`,n(e.li,{children:n(e.code,{children:"--tooltip-spacing"})}),`
`,n(e.li,{children:n(e.code,{children:"--chart-background"})}),`
`,n(e.li,{children:n(e.code,{children:"--chart-color"})}),`
`,n(e.li,{children:n(e.code,{children:"--chart-handle-fill"})}),`
`,n(e.li,{children:n(e.code,{children:"--chart-handle-stroke"})}),`
`,n(e.li,{children:n(e.code,{children:"--chart-handle-drag-fill"})}),`
`,n(e.li,{children:n(e.code,{children:"--chart-handle-dots"})}),`
`,n(e.li,{children:n(e.code,{children:"--chart-handle-line"})}),`
`]}),`
`,n(e.p,{children:`These names are based on the Google Material design spec. These variables
are not setup when you install the project automatically but if you want
some sensible defaults here is what we use in the Storybook demo:`}),`
`,n(e.pre,{children:n(e.code,{className:"language-html",children:`<style>
  body {
  --tooltip-background: rgba(0,5,11,0.9);
  --tooltip-color: #fff;
  --tooltip-border-radius: 5px;
  --tooltip-spacing: 5px;

  --chart-background: rgb(51, 51, 51);
  --chart-color: #fff;

  --chart-handle-fill: #2c343a;
  --chart-handle-stroke: #67c2e4;
  --chart-handle-drag-fill: transparent;
  --chart-handle-dots: #67c2e4;
  --chart-handle-line: #67c2e4;
  }
</style>
`})}),`
`,n(e.h2,{id:"compatibility",children:"Compatibility"}),`
`,n(e.p,{children:"REAVIZ is compatible with React v16+ and works with ReactDOM. React Native is not supported at this time."})]})}function y(i={}){const{wrapper:e}=Object.assign({},l(),i.components);return e?n(e,Object.assign({},i,{children:n(t,i)})):t(i)}export{y as default};
