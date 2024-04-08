import{j as n,a as o,F as l}from"./jsx-runtime-86dfebf6.js";import"./blocks-2646952b.js";import{u as r}from"./index-2ef8b458.js";import{M as a}from"./index-68ff4ed5.js";import"./index-1b03fe98.js";import"./iframe-a351bda7.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function i(t){const e=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",code:"code"},r(),t.components);return o(l,{children:[n(a,{title:"Docs/Getting Started/Developing"}),`
`,n(e.h1,{id:"developing",children:"Developing"}),`
`,n(e.p,{children:"If you want to run the project locally, its really easy!"}),`
`,n(e.p,{children:`The project uses Storybook for its demos and development
environment. To run it locally:`}),`
`,o(e.ul,{children:[`
`,n(e.li,{children:"Clone repo"}),`
`,n(e.li,{children:n(e.code,{children:"yarn install"})}),`
`,n(e.li,{children:n(e.code,{children:"yarn start"})}),`
`]}),`
`,n(e.p,{children:`Once started the browser will open to the storybook url.
From here you can tweak the charts and see them build
and reload in real time.`}),`
`,o(e.p,{children:[`We use Rollup to build and package for distribution.
You can run this by doing `,n(e.code,{children:"yarn build"}),` and it will
create a `,n(e.code,{children:"dist"}),` folder with the type definitions, bundled
javascript and css files.`]})]})}function w(t={}){const{wrapper:e}=Object.assign({},r(),t.components);return e?n(e,Object.assign({},t,{children:n(i,t)})):i(t)}export{w as default};
