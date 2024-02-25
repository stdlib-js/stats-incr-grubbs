// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@v0.2.1-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@v0.2.1-esm/index.mjs";import{isPrimitive as e}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@v0.2.1-esm/index.mjs";import{isPrimitive as s}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@v0.2.1-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-minmax@v0.2.1-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-meanstdev@v0.2.1-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-property@v0.2.1-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-accessor@v0.2.1-esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-max@v0.2.1-esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-sqrt@v0.2.1-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-roundn@v0.2.1-esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-t-quantile@v0.2.0-esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.2.1-esm/index.mjs";import{isPrimitive as v}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@v0.2.0-esm/index.mjs";import{isPrimitive as c}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-string@v0.2.1-esm/index.mjs";import{isPrimitive as j}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nonnegative-integer@v0.2.1-esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nan@v0.2.1-esm/index.mjs";function u(){var u,g,b,x,w,y,T,E,H,N,P;if(x={init:100,alpha:.05,alternative:"two-sided",digits:4,decision:!0},arguments.length&&(w=function(e,s){if(!t(s))return new TypeError(h("1HN2V",s));if(i(s,"alpha")){if(e.alpha=s.alpha,!v(e.alpha)||f(e.alpha))return new TypeError(h("1HN8P","alpha",e.alpha));if(e.alpha<0||e.alpha>1)return new RangeError(h("1HN8V","alpha",e.alpha))}return i(s,"alternative")&&(e.alternative=s.alternative,!c(e.alternative))?new TypeError(h("1HN2W","alternative",e.alternative)):i(s,"init")&&(e.init=s.init,!j(e.init))?new TypeError(h("1HN2t","init",e.init)):null}(x,arguments[0]),w))throw w;return l(g={},"rejected",(function(){return P>E})),a(g,"alpha",x.alpha),l(g,"criticalValue",(function(){return E})),l(g,"statistic",(function(){return P})),l(g,"df",(function(){return H})),l(g,"mean",(function(){return T[0]})),l(g,"sd",(function(){return T[1]})),l(g,"min",(function(){return y[0]})),l(g,"max",(function(){return y[1]})),a(g,"alt",x.alternative),a(g,"method","Grubbs' Test"),a(g,"print",(function(n){var r,a,l;if(a=x.digits,r=x.decision,arguments.length>0){if(!t(n))throw new TypeError(h("1HN47",n));if(i(n,"digits")){if(!e(n.digits))throw new TypeError(h("1HN3P","digits",n.digits));a=n.digits}if(i(n,"decision")){if(!s(n.decision))throw new TypeError(h("1HN2o","decision",n.decision));r=n.decision}}l="",l+=g.method,l+="\n\n",l+="Alternative hypothesis: ","max"===x.alternative?l+="The maximum value ("+y[1]+") is an outlier":"min"===x.alternative?l+="The minimum value ("+y[0]+") is an outlier":(l+="The ",l+=T[0]-y[0]>y[1]-T[0]?"minimum value ("+y[0]+")":"maximum value ("+y[1]+")",l+=" is an outlier");l+="\n\n",l+="    criticalValue: "+o(E,-a)+"\n",l+="    statistic: "+o(P,-a)+"\n",l+="    df: "+H+"\n",l+="\n",r&&(l+="Test Decision: ",l+=P>E?"Reject null in favor of alternative at "+100*x.alpha+"% significance level":"Fail to reject null in favor of alternative at "+100*x.alpha+"% significance level",l+="\n");return l})),N=0,H=0,P=0,E=0,b=n(y=[0,0]),u=r(T=[0,0]),function(i){var t,e,s;if(0===arguments.length)return N<x.init||H<=0?null:g;if(N+=1,u(i),b(i),H=N-2,N<x.init||H<=0)return null;"min"===x.alternative?(P=(T[0]-y[0])/T[1],t=x.alpha/N):"max"===x.alternative?(P=(y[1]-T[0])/T[1],t=x.alpha/N):(e=m(T[0]-y[0],y[1]-T[0]),P=e/T[1],t=x.alpha/(2*N));return s=p(1-t,H),E=(N-1)*s/d(N*(H+s*s)),g}}export{u as default};
//# sourceMappingURL=index.mjs.map
