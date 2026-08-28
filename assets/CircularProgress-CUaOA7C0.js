import{m as N,I,a$ as D,J as v,f as n,q as o,b0 as M,r as U,L as w,p as z,j as g,h as E,l as F}from"./index-ChCm7ZGl.js";function K(r){return N("MuiCircularProgress",r)}I("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const L=["className","color","disableShrink","size","style","thickness","value","variant"];let l=r=>r,P,b,S,$;const t=44,W=D(P||(P=l`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),q=D(b||(b=l`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),B=r=>{const{classes:e,variant:s,color:a,disableShrink:d}=r,u={root:["root",s,`color${n(a)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,d&&"circleDisableShrink"]};return F(u,K,e)},G=v("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.root,e[s.variant],e[`color${n(s.color)}`]]}})(({ownerState:r,theme:e})=>o({display:"inline-block"},r.variant==="determinate"&&{transition:e.transitions.create("transform")},r.color!=="inherit"&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&M(S||(S=l`
      animation: ${0} 1.4s linear infinite;
    `),W)),J=v("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),T=v("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.circle,e[`circle${n(s.variant)}`],s.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>o({stroke:"currentColor"},r.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&M($||($=l`
      animation: ${0} 1.4s ease-in-out infinite;
    `),q)),V=U.forwardRef(function(e,s){const a=w({props:e,name:"MuiCircularProgress"}),{className:d,color:u="primary",disableShrink:R=!1,size:m=40,style:_,thickness:i=3.6,value:h=0,variant:k="indeterminate"}=a,j=z(a,L),c=o({},a,{color:u,disableShrink:R,size:m,thickness:i,value:h,variant:k}),p=B(c),f={},x={},C={};if(k==="determinate"){const y=2*Math.PI*((t-i)/2);f.strokeDasharray=y.toFixed(3),C["aria-valuenow"]=Math.round(h),f.strokeDashoffset=`${((100-h)/100*y).toFixed(3)}px`,x.transform="rotate(-90deg)"}return g.jsx(G,o({className:E(p.root,d),style:o({width:m,height:m},x,_),ownerState:c,ref:s,role:"progressbar"},C,j,{children:g.jsx(J,{className:p.svg,ownerState:c,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:g.jsx(T,{className:p.circle,style:f,ownerState:c,cx:t,cy:t,r:(t-i)/2,fill:"none",strokeWidth:i})})}))}),A=V;export{A as C};
