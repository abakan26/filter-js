!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,"a",(function(){return i}));var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.elements=t}var t,n,o;return t=e,(n=[{key:"on",value:function(e,t){return this.elements.forEach((function(n){return n.addEventListener(e,t)})),this}},{key:"each",value:function(e){return this.elements.forEach((function(t){return e(t)})),this}},{key:"find",value:function(t){return new e(this.elements.reduce((function(e,n,r,o){return e.concat(i(n.querySelectorAll(t)).elements)}),[]))}},{key:"add",value:function(e){return this.each((function(t){return t.classList.add(e)})),this}},{key:"remove",value:function(e){return this.each((function(t){return t.classList.remove(e)})),this}},{key:"toggle",value:function(e){return this.each((function(t){return t.classList.toggle(e)})),this}},{key:"checked",value:function(e){return this.elements.forEach((function(t){return t.checked=e})),this}},{key:"hide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:300;return this.animate((function(e,t){var n=1-e;t.style.opacity=n.toString(),1===e&&(t.style.display="none")}),e),this}},{key:"show",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:300;return this.animate((function(e,t){t.style.display="",t.style.opacity=e.toString()}),e),this}},{key:"attr",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return""===t?this.elements[0].getAttribute(e):(this.elements[0].setAttribute(e,t),this)}},{key:"css",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this.each((function(n){return n.style[e]=t})),this}},{key:"animate",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;function n(e){var t=e.timing,n=e.draw,r=e.duration,o=performance.now();requestAnimationFrame((function e(i){var u=(i-o)/r;u>1&&(u=1);var c=t(u);n(c),u<1&&requestAnimationFrame(e)}))}this.each((function(r){return n({timing:function(e){return e},draw:function(t){e(t,r)},duration:t})}))}}])&&r(t.prototype,n),o&&r(t,o),e}();function i(e){var t=[];return"string"==typeof e?document.querySelectorAll(e).forEach((function(e){return t.push(e)})):e instanceof NodeList?e.forEach((function(e){return t.push(e)})):e instanceof Element?t.push(e):e instanceof o&&(t=e.elements),new o(t)}},,,function(e,t,n){"use strict";n.r(t);var r=n(0);n(4);window.addEventListener("load",(function(){var e=Object(r.a)("#back-to-top");e.on("click",(function(t){t.preventDefault(),e.hide();var n=window.pageYOffset||document.documentElement.scrollTop,o=n;return console.log("start_position",n),Object(r.a)(document.body).animate((function(e,t){!1;var r=o-n*(1-e);window.scrollBy(0,-r),o=window.pageYOffset||document.documentElement.scrollTop,console.log(r)}),3e3),!1}));window.addEventListener("scroll",(function(){}))}))},function(e,t,n){}]);