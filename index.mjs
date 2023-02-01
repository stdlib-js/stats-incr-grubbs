// Copyright (c) 2023 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@esm/index.mjs";import{isPrimitive as e}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@esm/index.mjs";import{isPrimitive as s}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-minmax@esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-meanstdev@esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-copy@esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-property@esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-accessor@esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-max@esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-sqrt@esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-roundn@esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-t-quantile@esm/index.mjs";import c from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.0.2-esm/index.mjs";import{isPrimitive as j}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@esm/index.mjs";import{isPrimitive as u}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-string@esm/index.mjs";import{isPrimitive as v}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nonnegative-integer@esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nan@esm/index.mjs";function g(e,s){if(!t(s))return new TypeError(c("0da2h",s));if(i(s,"alpha")){if(e.alpha=s.alpha,!j(e.alpha)||f(e.alpha))return new TypeError(c("0da8h","alpha",e.alpha));if(e.alpha<0||e.alpha>1)return new RangeError(c("invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%f`.","alpha",e.alpha))}return i(s,"alternative")&&(e.alternative=s.alternative,!u(e.alternative))?new TypeError(c("0da2i","alternative",e.alternative)):i(s,"init")&&(e.init=s.init,!v(e.init))?new TypeError(c("0da35","init",e.init)):null}var b={init:100,alpha:.05,alternative:"two-sided",digits:4,decision:!0};function x(){var j,u,v,f,x,w,y,T,E,P,q;if(f=a(b),arguments.length&&(x=g(f,arguments[0])))throw x;return d(u={},"rejected",V),l(u,"alpha",f.alpha),d(u,"criticalValue",A),d(u,"statistic",D),d(u,"df",F),d(u,"mean",G),d(u,"sd",K),d(u,"min",O),d(u,"max",k),l(u,"alt",f.alternative),l(u,"method","Grubbs' Test"),l(u,"print",z),P=0,E=0,q=0,T=0,v=n(w=[0,0]),j=r(y=[0,0]),R;function R(i){var t,e,s;return 0===arguments.length?P<f.init||E<=0?null:u:(P+=1,j(i),v(i),E=P-2,P<f.init||E<=0?null:("min"===f.alternative?(q=(y[0]-w[0])/y[1],t=f.alpha/P):"max"===f.alternative?(q=(w[1]-y[0])/y[1],t=f.alpha/P):(e=m(y[0]-w[0],w[1]-y[0]),q=e/y[1],t=f.alpha/(2*P)),s=h(1-t,E),T=(P-1)*s/o(P*(E+s*s)),u))}function V(){return q>T}function A(){return T}function D(){return q}function F(){return E}function G(){return y[0]}function K(){return y[1]}function O(){return w[0]}function k(){return w[1]}function z(n){var r,a,l;if(a=f.digits,r=f.decision,arguments.length>0){if(!t(n))throw new TypeError(c("0da4K",n));if(i(n,"digits")){if(!e(n.digits))throw new TypeError(c("0da3b","digits",n.digits));a=n.digits}if(i(n,"decision")){if(!s(n.decision))throw new TypeError(c("0da30","decision",n.decision));r=n.decision}}return l="",l+=u.method,l+="\n\n",l+="Alternative hypothesis: ","max"===f.alternative?l+="The maximum value ("+w[1]+") is an outlier":"min"===f.alternative?l+="The minimum value ("+w[0]+") is an outlier":(l+="The ",y[0]-w[0]>w[1]-y[0]?l+="minimum value ("+w[0]+")":l+="maximum value ("+w[1]+")",l+=" is an outlier"),l+="\n\n",l+="    criticalValue: "+p(T,-a)+"\n",l+="    statistic: "+p(q,-a)+"\n",l+="    df: "+E+"\n",l+="\n",r&&(l+="Test Decision: ",l+=q>T?"Reject null in favor of alternative at "+100*f.alpha+"% significance level":"Fail to reject null in favor of alternative at "+100*f.alpha+"% significance level",l+="\n"),l}}export{x as default};
//# sourceMappingURL=index.mjs.map