/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/test-workerdom.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../a8c/worker-dom/dist/main.mjs":
/*!*********************************************************!*\
  !*** /Users/dan/workspace/a8c/worker-dom/dist/main.mjs ***!
  \*********************************************************/
/*! exports provided: upgradeElement */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upgradeElement", function() { return _; });
let e=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(8);return{execute:(e,t,r)=>(o&&r&&(e=r.transferControlToOffscreen(),n.messageToWorker({12:9,13:[r._index_],38:e},[e])),t+2)}},t=[0,1,2,3,4,5,6,7,8,9,10,11],n=(e,t)=>{t&&"value"in t&&null===t.onchange&&(t.onchange=()=>e.messageToWorker({12:4,40:{7:t._index_,21:t.value}}))},r=e=>Object.values(e).map(e=>[e.identifier,e.screenX,e.screenY,e.clientX,e.clientY,e.pageX,e.pageY,e.target._index_]),s=(e,t,s,o,i)=>{const u=[],a=i.executorsAllowed.includes(4);let c=[window.innerWidth,window.innerHeight];const l=e=>t=>{var n=t.currentTarget;if(n&&"value"in n)n=t.currentTarget,s.messageToWorker({12:4,40:{7:n._index_,21:n.value}});else if("resize"===t.type){const{innerWidth:e,innerHeight:t}=window;if(c[0]===e&&c[1]===t)return;c=[window.innerWidth,window.innerHeight],s.messageToWorker({12:5,40:c})}s.messageToWorker({12:1,39:{7:e,25:t.bubbles,26:t.cancelable,27:t.cancelBubble,28:[t.currentTarget._index_||0],29:t.defaultPrevented,30:t.eventPhase,31:t.isTrusted,32:t.returnValue,13:[t.target._index_||0],33:t.timeStamp,12:t.type,35:"keyCode"in t?t.keyCode:void 0,60:"pageX"in t?t.pageX:void 0,61:"pageY"in t?t.pageY:void 0,65:"offsetX"in t?t.offsetX:void 0,66:"offsetY"in t?t.offsetY:void 0,62:"touches"in t?r(t.touches):void 0,63:"changedTouches"in t?r(t.changedTouches):void 0}})};return{execute(r,o,i){var c=r[o+2];const d=o+4+2*c;if(c=o+4+2*(r[o+3]+c),a&&i)for(let a=o+4;a<c;a+=2)e:{o=i;var h=a<=d,g=e.get(r[a]),f=r[a+1];let c=null!==o.onchange;const m=o&&"value"in o,w="change"===g,v="resize"===g;if(h){if(v&&o===t.baseElement){addEventListener(g,u[f]=l(1));break e}w&&(c=!0,o.onchange=null),o.addEventListener(g,u[f]=l(o._index_))}else{if(v&&o===t.baseElement){removeEventListener(g,u[f]);break e}w&&(c=!1),o.removeEventListener(g,u[f])}m&&!c&&n(s,o)}return c}}},o=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(5);return{execute:(e,t,r)=>(o&&r&&(e=r.getBoundingClientRect(),n.messageToWorker({12:6,13:[r._index_],38:[e.top,e.right,e.bottom,e.left,e.width,e.height]})),t+2)}},i=(e,t,n,r,s)=>{let{getNode:o}=t;const i=s.executorsAllowed.includes(2);return{execute(e,t,n){const r=e[t+4],s=e[t+5];return i&&(0<s&&e.slice(t+6+r,t+6+r+s).forEach(e=>{(e=o(e))&&e.remove()}),0<r&&e.slice(t+6,t+6+r).forEach(r=>{const s=e[t+2];(r=o(r))&&n.insertBefore(r,s&&o(s)||null)})),t+6+r+s}}},u=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(0);return{execute(t,n,r){if(o){const o=e.get(t[n+2]);t=0!==t[n+4]&&e.get(t[n+4]-1)||null,null!=o&&(s.sanitizer?s.sanitizer.mutateAttribute(r,o,t):null==t?r.removeAttribute(o):r.setAttribute(o,t))}return n+5}}},a=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(1);return{execute:(t,n,r)=>(o&&(t=t[n+2])&&(r.textContent=e.get(t)),n+3)}},c=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(3);return{execute(t,n,r){if(o){const o=e.get(t[n+2]);t=1===t[n+3]?1===t[n+4]:0!==t[n+4]&&e.get(t[n+4])||null,o&&null!=t&&(s.sanitizer?s.sanitizer.mutateProperty(r,o,String(t)):r[o]=t)}return n+5}}},l=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(6);let i,u=0;return{execute:(e,t)=>(o&&s.longTask&&(6===e[t]?(u++,i||s.longTask(new Promise(e=>i=e))):7===e[t]&&(u--,i&&0>=u&&(i(),i=null,u=0))),t+2),get active(){return null!==i}}},d=new Float32Array(1),h=new Uint16Array(d.buffer);function g(e,t,n,r,s,o){let i=[];for(let a=0;a<n;a++)switch(e[t++]){case 1:i.push(e[t++]);break;case 2:h[0]=e[t++],h[1]=e[t++],i.push(d[0]);break;case 3:i.push(r.get(e[t++]));break;case 4:var u=e[t++];t=g(e,t,u,r,s,o),i.push(t.args),t=t.offset;break;case 5:if(!o)throw Error("objectContext not provided.");i.push(o.get(e[t++]));break;case 6:u=s.getNode(e[t++]),i.push(u.getContext("2d"));break;case 7:i.push(s.getNode(e[t++]));break;default:throw Error("Cannot deserialize argument.")}return{args:i,offset:t}}let f=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(9);return{execute(n,s){const i=e.get(n[s+1]),u=n[s+2],{offset:a,args:c}=g(n,s+3,1,e,t,r);s=c[0];const{offset:l,args:d}=g(n,a,u,e,t,r);return o&&(!function e(t,n){if(!t)throw Error("Property "+n+" does not exist on "+t+".");let r=Object.getOwnPropertyDescriptor(t,n);return void 0!==r?"set"in r:e(Object.getPrototypeOf(t),n)}(s,i)?s[i](...d):s[i]=d[0]),l}}};let m=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(10);if(!r)throw Error("objectContext is not defined.");return{execute(n,s){const i=e.get(n[s+1]),u=n[s+2],a=n[s+3],{offset:c,args:l}=g(n,s+4,1,e,t,r);s=l[0];const{offset:d,args:h}=g(n,c,a,e,t,r);return o&&"new"!==i&&r.store(u,s[i](...h)),d}}},w=(e,t,n,r,s)=>{const o=s.executorsAllowed.includes(11);return{execute:(e,t,r)=>(o&&r&&self.createImageBitmap(r).then(r=>{n.messageToWorker({12:10,73:e[t+2],38:r},[r])}),t+3)}};class v{constructor(t,n,r,d,h){this.mutationQueue=[],this.pendingMutations=!1,this.syncFlush=()=>{this.mutationQueue.forEach(e=>{let t=0,n=e.length;for(;t<n;){let n=e[t];if(9===n||10===n)t=this.executors[n].execute(e,t);else{let r=this.nodeContext.getNode(e[t+1]);if(!r)break;t=this.executors[n].execute(e,t,r)}}}),this.mutationQueue=[],this.pendingMutations=!1},this.strings=t,this.nodeContext=n,this.sanitizer=d.sanitizer,this.mutationPumpFunction=d.mutationPump;let g=l(t,n,r,h,d);this.executors={2:i(t,n,r,h,d),0:u(t,n,r,h,d),1:a(t,n,r,h,d),3:c(t,n,r,h,d),4:s(t,n,r,h,d),5:o(t,n,r,h,d),6:g,7:g,8:e(t,n,r,h,d),9:f(t,n,r,h,d),10:m(t,n,r,h,d),11:w(t,n,r,h,d)}}mutate(e,t,n,r){this.strings.storeValues(n),this.nodeContext.createNodes(t,this.sanitizer),this.mutationQueue=this.mutationQueue.concat(r),this.pendingMutations||(this.pendingMutations=!0,this.mutationPumpFunction(this.syncFlush,e))}}class x{constructor(e,t){this.createNodes=(e,t)=>{let n=(e=new Uint16Array(e)).length;for(let s=0;s<n;s+=5){if(3===e[s+1])var r=document.createTextNode(this.strings.get(e[s+3]));else if(8===e[s+1])r=document.createComment(this.strings.get(e[s+3]));else if(11===e[s+1])r=document.createDocumentFragment();else if(r=this.strings.get(e[s+2]),r=0!==e[s+4]?document.createElementNS(this.strings.get(e[s+4]),r):document.createElement(r),t&&!t.sanitize(r))continue;this.storeNode(r,e[s])}},this.getNode=e=>(e=this.nodes.get(e))&&"BODY"===e.nodeName?this.baseElement:e,this.storeNodes=e=>{this.storeNode(e,++this.count),e.childNodes.forEach(e=>this.storeNodes(e))},this.count=2,this.strings=e,this.nodes=new Map([[1,t],[2,t]]),this.baseElement=t,t._index_=2,t.childNodes.forEach(e=>this.storeNodes(e))}storeNode(e,t){e._index_=t,this.nodes.set(t,e)}}class p{constructor(){this.strings=[]}get(e){return this.strings[e]||""}store(e){this.strings.push(e)}storeValues(e){e.forEach(this.store.bind(this))}}let b=[8,3];function k(e,t,n){var r=[].slice.call(e.childNodes).filter(n);return r={7:e._index_,11:0,0:e.nodeType,1:t(e.localName||e.nodeName),4:r.map(e=>k(e,t,n)),2:[].map.call(e.attributes||[],e=>[t(e.namespaceURI||"null"),t(e.name),t(e.value)])},null!=e.namespaceURI&&(r[6]=t(e.namespaceURI)),b.includes(e.nodeType)&&null!==e.textContent&&(r[5]=t(e.textContent)),r}class E{constructor(e,t,n,r,s){this.nodeContext=t,this.config=s,t=[];let{skeleton:o,strings:i}=function(e,t){t=t.hydrateFilter||(()=>!0);let n=[],r=new Map;return{skeleton:k(e,e=>{if(r.has(e))return r.get(e);const t=n.length;return r.set(e,t),n.push(e),t},t),strings:n}}(e,s);for(let n in e.style)t.push(n);n="'use strict';"+n+"(function(){var self=this;var window=this;var document=this.document;var localStorage=this.localStorage;var location=this.location;var defaultView=document.defaultView;var Node=defaultView.Node;var Text=defaultView.Text;var Element=defaultView.Element;var HTMLElement=defaultView.HTMLElement;var SVGElement=defaultView.SVGElement;var Document=defaultView.Document;var Event=defaultView.Event;var MutationObserver=defaultView.MutationObserver;function addEventListener(type,handler){return document.addEventListener(type,handler);}function removeEventListener(type,handler){return document.removeEventListener(type,handler);}window.innerWidth="+window.innerWidth+";window.innerHeight="+window.innerHeight+";this.initialize(document,"+JSON.stringify(i)+","+JSON.stringify(o)+","+JSON.stringify(t)+");document[59](window);"+r+"}).call(WorkerThread.workerDOM);//# sourceURL="+encodeURI(s.authorURL),this[55]=new Worker(URL.createObjectURL(new Blob([n]))),s.onCreateWorker&&s.onCreateWorker(e,i,o,t)}get worker(){return this[55]}messageToWorker(e,t){this.config.onSendMessage&&this.config.onSendMessage(e),this.worker.postMessage(e,t)}}class N{constructor(){this.objects=new Map}store(e,t){this.objects.set(e,t)}get(e){let t=this.objects.get(e);if(t)return t;throw Error("Object with id ("+e+") does not exist.")}}let y=[3,2];function T(e,n){return function(e,n,r){let s=new p,o=new N,i=new x(s,n),u=function(e){return Object.assign({},{mutationPump:requestAnimationFrame.bind(null),executorsAllowed:t},e)}(r);return e.then(e=>{let[t,a]=e;if(t&&a&&r.authorURL){e=new E(n,i,t,a,u);let c=new v(s,i,e,u,o);return e.worker.onmessage=e=>{let{data:t}=e;y.includes(t[12])&&(c.mutate(t[54],t[37],t[41],new Uint16Array(t[36])),r.onReceiveMessage)&&r.onReceiveMessage(e)},e.worker}return null})}(Promise.all([fetch(n.domURL).then(e=>e.text()),fetch(n.authorURL).then(e=>e.text())]),e,n)}var _=function(e,t){let n=e.getAttribute("src");return n?T(e,{authorURL:n,domURL:t}):Promise.resolve(null)};
//# sourceMappingURL=main.mjs.map


/***/ }),

/***/ "./src/js/test-workerdom.js":
/*!**********************************!*\
  !*** ./src/js/test-workerdom.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(/*! @ampproject/worker-dom/dist/main.mjs */ "../../a8c/worker-dom/dist/main.mjs");

// TODO: use safe version?

function testWorkerDOM() {
	// let's add a mutation observer for debugging
	var targetNode = document.getElementById('upgrade-me');
	console.warn('mounted remote block', _main.upgradeElement, targetNode);
	var config = { attributes: true, childList: true, subtree: true };
	// Callback function to execute when mutations are observed
	var callback = function callback(mutationsList) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var mutation = _step.value;

				if (mutation.type == 'childList') {
					console.log('A child node has been added or removed.');
				} else if (mutation.type == 'attributes') {
					console.log('The ' + mutation.attributeName + ' attribute was modified.');
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	};

	// Create an observer instance linked to the callback function
	var observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);
	console.warn('added mutation observer');

	// kick off webworker
	// upgradeElement( document.getElementById('upgrade-me'), '/webworker/remote-gutenberg.js' );
	(0, _main.upgradeElement)(targetNode, 'http://remote.localhost:3000/webworker/js/worker.mjs');
	console.warn('upgraded element');
}

window.addEventListener("load", function (event) {
	console.log("All resources finished loading!");
	testWorkerDOM();
});

/***/ })

/******/ });
//# sourceMappingURL=test-workerdom.js.map