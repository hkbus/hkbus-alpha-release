import{k as b,g as F}from"./index-B5N-jUy8.js";var k="Expected a function",E=NaN,M="[object Symbol]",N=/^\s+|\s+$/g,A=/^[-+]0x[0-9a-f]+$/i,B=/^0b[01]+$/i,R=/^0o[0-7]+$/i,_=parseInt,D=typeof b=="object"&&b&&b.Object===Object&&b,G=typeof self=="object"&&self&&self.Object===Object&&self,P=D||G||Function("return this")(),H=Object.prototype,U=H.toString,X=Math.max,q=Math.min,v=function(){return P.Date.now()};function z(e,n,r){var f,a,m,u,i,c,s=0,h=!1,l=!1,j=!0;if(typeof e!="function")throw new TypeError(k);n=S(n)||0,y(r)&&(h=!!r.leading,l="maxWait"in r,m=l?X(S(r.maxWait)||0,n):m,j="trailing"in r?!!r.trailing:j);function p(t){var o=f,d=a;return f=a=void 0,s=t,u=e.apply(d,o),u}function C(t){return s=t,i=setTimeout(g,n),h?p(t):u}function L(t){var o=t-c,d=t-s,O=n-o;return l?q(O,m-d):O}function x(t){var o=t-c,d=t-s;return c===void 0||o>=n||o<0||l&&d>=m}function g(){var t=v();if(x(t))return I(t);i=setTimeout(g,L(t))}function I(t){return i=void 0,j&&f?p(t):(f=a=void 0,u)}function W(){i!==void 0&&clearTimeout(i),s=0,f=c=a=i=void 0}function $(){return i===void 0?u:I(v())}function T(){var t=v(),o=x(t);if(f=arguments,a=this,c=t,o){if(i===void 0)return C(c);if(l)return i=setTimeout(g,n),p(c)}return i===void 0&&(i=setTimeout(g,n)),u}return T.cancel=W,T.flush=$,T}function J(e,n,r){var f=!0,a=!0;if(typeof e!="function")throw new TypeError(k);return y(r)&&(f="leading"in r?!!r.leading:f,a="trailing"in r?!!r.trailing:a),z(e,n,{leading:f,maxWait:n,trailing:a})}function y(e){var n=typeof e;return!!e&&(n=="object"||n=="function")}function K(e){return!!e&&typeof e=="object"}function Q(e){return typeof e=="symbol"||K(e)&&U.call(e)==M}function S(e){if(typeof e=="number")return e;if(Q(e))return E;if(y(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=y(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=e.replace(N,"");var r=B.test(e);return r||R.test(e)?_(e.slice(2),r?2:8):A.test(e)?E:+e}var V=J;const Z=F(V);export{Z as t};
