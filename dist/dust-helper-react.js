(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom/server"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom/server"], factory);
	else if(typeof exports === 'object')
		exports["DustHelperReact"] = factory(require("react"), require("react-dom/server"));
	else
		root["DustHelperReact"] = factory(root["React"], root["ReactDOMServer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = dustHelperReact;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(1);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * All require paths for AMD are assumed to be relative to the `baseUrl` configured
 * with RequireJS. If the user has passed a relative path for server-side rendering,
 * this will strip the relative part from the path.
 * 
 * @param   {String} componentPath
 * @returns {String}
 */
function createAmdComponentPath(componentPath) {
  if (componentPath.match(/^\.\//) !== null) {
    return componentPath.slice(2);
  }

  return componentPath;
}

/**
 * Resolve a path for CommonJS.
 * 
 * @param {String}   componentDir
 * @param {String}   componentPath
 * @returns {String}
 */
function createCommonJsComponentPath(componentDir, componentPath) {
  if (componentPath.match(/^\.\//) !== null) {
    return componentDir + '/' + componentPath.slice(2);
  }

  return componentPath;
}

/**
 * Attempt to load a component from a require path.
 *
 * @param  {Object}  options 
 * @param  {String}  componentPath A path to require the component.
 * @return {Promise}
 */
function loadModule(options, componentPath) {
  var requireFn = options.requireFn,
      globalContext = options.globalContext,
      componentDir = options.componentDir;


  return new Promise(function (resolve, reject) {
    try {
      // AMD
      if (typeof globalContext.define === 'function' && globalContext.define.amd) {
        return requireFn(createAmdComponentPath(componentPath), function (module) {
          resolve(module);
        });
      }

      if (typeof componentDir !== 'string') {
        throw new Error('options.componentDir must be a string when rendering server-side');
      }

      // CommonJS
      var module = requireFn(createCommonJsComponentPath(componentDir, componentPath));
      resolve(module);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Write a failure message to the dust output.
 *
 * @param  {String} message
 * @param  {Object} chunk
 * @param  {Object} params
 * @return {Object}
 */
function writeFailureMessage(message, chunk, params) {
  console.error(message);

  var errorDiv = '\n    <div><!-- dust-react: ' + message + ' - params: ' + JSON.stringify(params) + ' --></div>\n  ';

  return chunk.map(function (innerChunk) {
    return innerChunk.write(errorDiv).end();
  });
}

/**
 * Create a dust helper for rendering React components.
 *
 * @param  {Object}   options
 * @param  {Function} options.requireFn The require function based on the environment for your dust template.
 * @param  {Object}   options.globalContext The global context object (`global` in Node.js, `window` in the browser)
 * @param  {[String]} options.componentDir An absolute path to the component directory for server-side rendering.
 * @return {Function} The dust-react helper.
 */
function dustHelperReact(options) {
  var requireFn = options.requireFn,
      globalContext = options.globalContext,
      componentDir = options.componentDir;


  if (typeof requireFn !== 'function') {
    throw new Error('dust-react: options.requireFn must be a function');
  }

  if ((typeof globalContext === 'undefined' ? 'undefined' : _typeof(globalContext)) !== 'object') {
    throw new Error('dust-react: options.globalContext must be an object');
  }

  return function (chunk, context, bodies, params) {
    var component = params.component,
        namedExport = params.namedExport;


    delete params.component;
    delete params.namedExport;

    if (typeof component !== 'string') {
      return writeFailureMessage('"component" is a required parameter and must be a string', chunk, params);
    }

    var props = params.props || Object.assign({}, params);
    var loadedModulePromise = loadModule(options, component);

    return chunk.map(function (innerChunk) {
      return loadedModulePromise.then(function (module) {
        var ExportedComponent = void 0;

        if (namedExport) {
          ExportedComponent = module[namedExport];
        } else {
          ExportedComponent = module.default || module;
        }

        var renderedComponent = _server2.default.renderToString(_react2.default.createElement(ExportedComponent, props));
        return innerChunk.write(renderedComponent).end();
      }).catch(function (err) {
        return innerChunk.write('dust-react: ' + err.message).end();
      });
    });
  };
}

/***/ }
/******/ ])
});
;