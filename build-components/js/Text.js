!function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=e,t.c=o,t.p="/",t(0)}([function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),u=o(3),c=r(u),s=o(2),p=r(s);o(1);var f=function(e){function t(){return n(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),l(t,[{key:"render",value:function(){var e="Text";return this.props.small&&(e+=" small"),this.props.medium&&(e+=" medium"),this.props.large&&(e+=" large"),this.props.huge&&(e+=" huge"),this.props.crazy&&(e+=" crazy"),c.default.createElement("div",{className:e,onClick:function(){return console.log("something magical")}},this.props.children)}}]),t}(u.Component);f.propTypes={children:p.default.string,small:p.default.bool,medium:p.default.bool,large:p.default.bool,huge:p.default.bool},f.defaultProps={children:"hello world",small:!0,medium:!1,large:!1,huge:!1},window.AudiReact=window.AudiReact||{},t.default=window.AudiReact.Text=f},function(e,t){e.exports="data:application/octet-stream;base64,Ly8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4="},function(e,t){e.exports=PropTypes},function(e,t){e.exports=React}]);