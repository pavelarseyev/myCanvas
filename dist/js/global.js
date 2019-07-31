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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 130);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(18);
var hide = __webpack_require__(11);
var redefine = __webpack_require__(12);
var ctx = __webpack_require__(19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(47)('wks');
var uid = __webpack_require__(33);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(21);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(94);
var toPrimitive = __webpack_require__(23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(32);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var has = __webpack_require__(14);
var SRC = __webpack_require__(33)('src');
var $toString = __webpack_require__(134);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(18).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48);
var defined = __webpack_require__(24);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(49);
var createDesc = __webpack_require__(32);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(94);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(69)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(18);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(19);
var IObject = __webpack_require__(48);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var asc = __webpack_require__(85);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(7)) {
  var LIBRARY = __webpack_require__(29);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(62);
  var $buffer = __webpack_require__(93);
  var ctx = __webpack_require__(19);
  var anInstance = __webpack_require__(39);
  var propertyDesc = __webpack_require__(32);
  var hide = __webpack_require__(11);
  var redefineAll = __webpack_require__(41);
  var toInteger = __webpack_require__(21);
  var toLength = __webpack_require__(6);
  var toIndex = __webpack_require__(122);
  var toAbsoluteIndex = __webpack_require__(35);
  var toPrimitive = __webpack_require__(23);
  var has = __webpack_require__(14);
  var classof = __webpack_require__(44);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(82);
  var create = __webpack_require__(36);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(37).f;
  var getIterFn = __webpack_require__(84);
  var uid = __webpack_require__(33);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(52);
  var speciesConstructor = __webpack_require__(51);
  var ArrayIterators = __webpack_require__(87);
  var Iterators = __webpack_require__(46);
  var $iterDetect = __webpack_require__(57);
  var setSpecies = __webpack_require__(38);
  var arrayFill = __webpack_require__(86);
  var arrayCopyWithin = __webpack_require__(111);
  var $DP = __webpack_require__(8);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(117);
var $export = __webpack_require__(0);
var shared = __webpack_require__(47)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(120))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(33)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(11)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(96);
var enumBugKeys = __webpack_require__(70);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(97);
var enumBugKeys = __webpack_require__(70);
var IE_PROTO = __webpack_require__(69)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(67)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(71).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(96);
var hiddenKeys = __webpack_require__(70).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var call = __webpack_require__(109);
var isArrayIter = __webpack_require__(82);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(6);
var getIterFn = __webpack_require__(84);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(12);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(73);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(18);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(29) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(6);
var toAbsoluteIndex = __webpack_require__(35);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var defined = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(20);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(44);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(113);
var redefine = __webpack_require__(12);
var hide = __webpack_require__(11);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var wks = __webpack_require__(5);
var regexpExec = __webpack_require__(88);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var redefineAll = __webpack_require__(41);
var meta = __webpack_require__(30);
var forOf = __webpack_require__(40);
var anInstance = __webpack_require__(39);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(57);
var setToStringTag = __webpack_require__(43);
var inheritIfRequired = __webpack_require__(74);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var uid = __webpack_require__(33);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(29) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(19);
var forOf = __webpack_require__(40);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(18);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(95);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(47)('keys');
var uid = __webpack_require__(33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(19)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(72).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(21);
var defined = __webpack_require__(24);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(46);
var $iterCreate = __webpack_require__(79);
var setToStringTag = __webpack_require__(43);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(32);
var setToStringTag = __webpack_require__(43);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(56);
var defined = __webpack_require__(24);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(46);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(32);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(44);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(46);
module.exports = __webpack_require__(18).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(223);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(6);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(31);
var step = __webpack_require__(112);
var Iterators = __webpack_require__(46);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(78)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(50);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(55)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var invoke = __webpack_require__(102);
var html = __webpack_require__(71);
var cel = __webpack_require__(67);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(20)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(90).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(20)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(7);
var LIBRARY = __webpack_require__(29);
var $typed = __webpack_require__(62);
var hide = __webpack_require__(11);
var redefineAll = __webpack_require__(41);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(39);
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(6);
var toIndex = __webpack_require__(122);
var gOPN = __webpack_require__(37).f;
var dP = __webpack_require__(8).f;
var arrayFill = __webpack_require__(86);
var setToStringTag = __webpack_require__(43);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(67)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(52)(false);
var IE_PROTO = __webpack_require__(69)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(34);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(7);
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(53);
var pIE = __webpack_require__(49);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(102);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 102 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(45).trim;
var ws = __webpack_require__(73);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(45).trim;

module.exports = 1 / $parseFloat(__webpack_require__(73) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(20);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 107 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(76);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(48);
var toLength = __webpack_require__(6);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(6);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(88);
__webpack_require__(0)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(50)
});


/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(92);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(118);
var validate = __webpack_require__(42);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(61)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(41);
var ctx = __webpack_require__(19);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var $iterDefine = __webpack_require__(78);
var step = __webpack_require__(112);
var setSpecies = __webpack_require__(38);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(30).fastKey;
var validate = __webpack_require__(42);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(118);
var validate = __webpack_require__(42);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(61)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(12);
var meta = __webpack_require__(30);
var assign = __webpack_require__(99);
var weak = __webpack_require__(121);
var isObject = __webpack_require__(4);
var validate = __webpack_require__(42);
var NATIVE_WEAK_MAP = __webpack_require__(42);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(61)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(41);
var getWeak = __webpack_require__(30).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(14);
var validate = __webpack_require__(42);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(6);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(37);
var gOPS = __webpack_require__(53);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(54);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(6);
var ctx = __webpack_require__(19);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(6);
var repeat = __webpack_require__(75);
var defined = __webpack_require__(24);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var getKeys = __webpack_require__(34);
var toIObject = __webpack_require__(15);
var isEnum = __webpack_require__(49).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(44);
var from = __webpack_require__(128);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(40);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_binder__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_module__ = __webpack_require__(334);





Object(__WEBPACK_IMPORTED_MODULE_1__libs_binder__["a" /* binder */])({
    bounds: {
        "html": [__WEBPACK_IMPORTED_MODULE_2__modules_module__["a" /* p5training */]]
    },
    runTests: false
});

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(132);

__webpack_require__(329);

__webpack_require__(330);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)))

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(87);
__webpack_require__(237);
__webpack_require__(113);
__webpack_require__(238);
__webpack_require__(114);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(117);
__webpack_require__(119);
__webpack_require__(120);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
module.exports = __webpack_require__(18);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var META = __webpack_require__(30).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(47);
var setToStringTag = __webpack_require__(43);
var uid = __webpack_require__(33);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(95);
var wksDefine = __webpack_require__(68);
var enumKeys = __webpack_require__(135);
var isArray = __webpack_require__(54);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toObject = __webpack_require__(9);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(23);
var createDesc = __webpack_require__(32);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(98);
var $GOPD = __webpack_require__(16);
var $GOPS = __webpack_require__(53);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(34);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(49).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(47)('native-function-to-string', Function.toString);


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(53);
var pIE = __webpack_require__(49);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(97) });


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(15);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(34);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(98).f;
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(30).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(30).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(30).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(99) });


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(100) });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(72).set });


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(44);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(12)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(101) });


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(103);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(104);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(14);
var cof = __webpack_require__(20);
var inheritIfRequired = __webpack_require__(74);
var toPrimitive = __webpack_require__(23);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(37).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(8).f;
var $trim = __webpack_require__(45).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(12)(global, NUMBER, $Number);
}


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(21);
var aNumberValue = __webpack_require__(105);
var repeat = __webpack_require__(75);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(105);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(106) });


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(106);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(104);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(103);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(107);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(76);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(77);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(108) });


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(107) });


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(76) });


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(77);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(77);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(35);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(6);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(45)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(55)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(78)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(55)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(80);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(81)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(80);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(81)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(75)
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(80);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(81)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(13)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(13)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(13)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(13)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(13)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(13)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(13)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(13)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(13)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(13)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(13)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(13)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(13)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(212);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(12)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(11)(proto, TO_PRIMITIVE, __webpack_require__(215));


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(23);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(54) });


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(19);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(109);
var isArrayIter = __webpack_require__(82);
var toLength = __webpack_require__(6);
var createProperty = __webpack_require__(83);
var getIterFn = __webpack_require__(84);

$export($export.S + $export.F * !__webpack_require__(57)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(83);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(48) != Object || !__webpack_require__(22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(71);
var cof = __webpack_require__(20);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(6);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(54);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(110);

$export($export.P + $export.F * !__webpack_require__(22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(110);

$export($export.P + $export.F * !__webpack_require__(22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(52)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(6);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(111) });

__webpack_require__(31)('copyWithin');


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(86) });

__webpack_require__(31)('fill');


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(31)(KEY);


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(31)(KEY);


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Array');


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(74);
var dP = __webpack_require__(8).f;
var gOPN = __webpack_require__(37).f;
var isRegExp = __webpack_require__(56);
var $flags = __webpack_require__(50);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(12)(global, 'RegExp', $RegExp);
}

__webpack_require__(38)('RegExp');


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(114);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(50);
var DESCRIPTORS = __webpack_require__(7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(12)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toLength = __webpack_require__(6);
var advanceStringIndex = __webpack_require__(89);
var regExpExec = __webpack_require__(58);

// @@match logic
__webpack_require__(59)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var toInteger = __webpack_require__(21);
var advanceStringIndex = __webpack_require__(89);
var regExpExec = __webpack_require__(58);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(59)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var sameValue = __webpack_require__(100);
var regExpExec = __webpack_require__(58);

// @@search logic
__webpack_require__(59)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(56);
var anObject = __webpack_require__(1);
var speciesConstructor = __webpack_require__(51);
var advanceStringIndex = __webpack_require__(89);
var toLength = __webpack_require__(6);
var callRegExpExec = __webpack_require__(58);
var regexpExec = __webpack_require__(88);
var fails = __webpack_require__(3);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(59)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var global = __webpack_require__(2);
var ctx = __webpack_require__(19);
var classof = __webpack_require__(44);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var speciesConstructor = __webpack_require__(51);
var task = __webpack_require__(90).set;
var microtask = __webpack_require__(91)();
var newPromiseCapabilityModule = __webpack_require__(92);
var perform = __webpack_require__(115);
var userAgent = __webpack_require__(60);
var promiseResolve = __webpack_require__(116);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(43)($Promise, PROMISE);
__webpack_require__(38)(PROMISE);
Wrapper = __webpack_require__(18)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(57)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(121);
var validate = __webpack_require__(42);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(61)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(62);
var buffer = __webpack_require__(93);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(6);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(51);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(38)(ARRAY_BUFFER);


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(62).ABV, {
  DataView: __webpack_require__(93).DataView
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(36);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(101);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(8);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(23);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(79)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(123) });


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(8);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(32);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(72);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(52)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(31)('includes');


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(124);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(85);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(31)('flatMap');


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(124);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var toInteger = __webpack_require__(21);
var arraySpeciesCreate = __webpack_require__(85);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(31)('flatten');


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(55)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(125);
var userAgent = __webpack_require__(60);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(125);
var userAgent = __webpack_require__(60);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(45)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(45)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var toLength = __webpack_require__(6);
var isRegExp = __webpack_require__(56);
var getFlags = __webpack_require__(50);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(79)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68)('asyncIterator');


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68)('observable');


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(123);
var toIObject = __webpack_require__(15);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(83);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(126)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(126)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(63), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(63), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(63), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(63), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(127)('Map') });


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(127)('Set') });


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(64)('Map');


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(64)('Set');


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(64)('WeakMap');


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(64)('WeakSet');


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(65)('Map');


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(65)('Set');


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(65)('WeakMap');


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(65)('WeakSet');


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(20);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(129);
var fround = __webpack_require__(108);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(129) });


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(18);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(51);
var promiseResolve = __webpack_require__(116);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(92);
var perform = __webpack_require__(115);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(119);
var from = __webpack_require__(128);
var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(91)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(18);
var microtask = __webpack_require__(91)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(39);
var redefineAll = __webpack_require__(41);
var hide = __webpack_require__(11);
var forOf = __webpack_require__(40);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(38)('Observable');


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(60);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(90);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(87);
var getKeys = __webpack_require__(34);
var redefine = __webpack_require__(12);
var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(46);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)))

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(331);
module.exports = __webpack_require__(18).RegExp.escape;


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(332)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 332 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 333 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = binder;
/* unused harmony export fwa */
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// v.2.2

function binder(_ref) {
    var bounds = _ref.bounds,
        runTests = _ref.runTests;

    var t0 = void 0,
        t1 = void 0;
    if (runTests) t0 = performance.now();
    // polyfill for ".matches()" method
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector;
    }
    // gather all selectors in array
    var selectorsToFind = Object.keys(bounds);
    // find selectors in document
    var foundElements = [].concat(_toConsumableArray(document.querySelectorAll(selectorsToFind.join(","))));
    // filter bounds for not founded selectors
    var filteredBounds = {};

    var _loop = function _loop(key) {
        if (foundElements.some(function (element) {
            return element.matches(key);
        })) {
            filteredBounds[key] = bounds[key];
        } else {
            if (runTests) console.log("- " + key + " was not found");
        }
    };

    for (var key in bounds) {
        _loop(key);
    }
    // gather all modules in one object
    var mergedModules = {};
    for (var bound in filteredBounds) {
        var module = filteredBounds[bound];
        var nature = Object.prototype.toString.call(module);
        if (nature === "[object Array]") {
            module.forEach(function (script) {
                if (Object.prototype.toString.call(script) === "[object Function]") {
                    mergedModules[script.name] = script;
                    mergedModules[script.name]();
                } else {
                    mergedModules = Object.assign(mergedModules, script);
                }
            });
        } else if (nature === "[object Object]") {
            if (module.f !== undefined) {
                var _mergedModules;

                // call function with arguments
                mergedModules[module.f.name] = module.f;
                (_mergedModules = mergedModules)[module.f.name].apply(_mergedModules, _toConsumableArray(module.a));
            } else {
                // or just merge object
                mergedModules = Object.assign(mergedModules, module);
            }
        } else if (nature === "[object Function]") {
            mergedModules[module.name] = module;
            mergedModules[module.name]();
        } else {
            console.log("! unsupported format: ", module);
        }
    }
    if (runTests) console.log("binderResultObject: ", mergedModules);
    if (runTests) t1 = performance.now();
    if (runTests) console.log("Binder html parsing took " + (t1 - t0) + " milliseconds.");
}

// for function with arguments
var fwa = function fwa() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return { f: args.shift(), a: args };
};

/***/ }),
/* 334 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = p5training;
/* unused harmony export canvas */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simplex_noise__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simplex_noise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_simplex_noise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p5_lib_p5_min__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p5_lib_p5_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_p5_lib_p5_min__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





function randNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function constrain(x, min, max) {
    return x < min ? min : x > max ? max : x;
}

function p5training() {
    //3D Waves with WEBGL
    /*let cols, rows;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let scl = 250;
    let w = width * 4.4;
    let h = height * 6.4;
     let flying = 0;
     let terrain = [];
     let s = (sk) => {
         sk.setup = () => {
            sk.createCanvas(width, height, sk.WEBGL).parent("main");
             cols = w / scl;
            rows = h / scl;
             for (let x = 0; x < cols; x++) {
                terrain[x] = [];
                 for (let y = 0; y < rows; y++) {
                    terrain[x][y] = 0;
                }
            }
        };
         sk.mousePressed = () => {
         };
          sk.draw = () => {
            flying -= 0.01;
            let yoff = -flying;
             for (let y = 0; y < rows; y++) {
                let xoff = flying;
                 for (let x = 0; x < cols; x++) {
                    terrain[x][y] = sk.map(sk.noise(xoff, yoff), 0, 1, -360, 360);
                    xoff += 0.1;
                }
                 yoff += 0.1;
            }
             sk.background(0, 0);
            sk.translate(0, 50, -50);
            sk.rotateX(sk.PI / 3);
            sk.noStroke();
            let color = 120;
             sk.translate(-w / 2, -h / 2);
             for (let y = 0; y < rows; y++) {
                color += y;
                 sk.fill(color);
                 sk.beginShape(sk.TRIANGLE_STRIP);
                 for (let x = 0; x < cols; x++) {
                    sk.vertex(x * scl, y * scl, terrain[x][y]);
                    sk.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
                }
                 sk.endShape();
            }
        };
    };*/

    //Bounding letters

    var font = void 0;
    var allPoints = [];
    var secondWord = [];
    var p5 = __WEBPACK_IMPORTED_MODULE_1_p5_lib_p5_min__;
    var width = void 0,
        height = void 0;
    var canvas = void 0;
    var figureRect = void 0;

    var Point = function () {
        function Point(x, y, r, c, p) {
            _classCallCheck(this, Point);

            this.pos = p.createVector(p.random(width), p.random(height));

            this.target = p.createVector(x, y);

            this.vel = p5.Vector.random2D();

            this.acc = p.createVector();

            this.r = r;
            this.color = c;
            this.p = p;
            this.maxspeed = 10;
            this.maxforce = 4;
        }

        _createClass(Point, [{
            key: "behaviors",
            value: function behaviors() {
                var arrive = this.arrive(this.target);
                this.applyForce(arrive);
            }
        }, {
            key: "mousemovebehavior",
            value: function mousemovebehavior() {
                var p = this.p;
                var mouse = p.createVector(p.mouseX, p.mouseY);
                var flee = this.flee(mouse);

                flee.mult(35);
                this.applyForce(flee);
            }
        }, {
            key: "applyForce",
            value: function applyForce(f) {
                this.acc.add(f);
            }
        }, {
            key: "update",
            value: function update() {
                this.pos.add(this.vel);
                this.vel.add(this.acc);
                this.acc.mult(0);
            }
        }, {
            key: "show",
            value: function show() {
                var p = this.p;

                p.stroke(this.color);
                p.strokeWeight(this.r);
                p.point(this.pos.x, this.pos.y);
            }
        }, {
            key: "arrive",
            value: function arrive(target) {

                var desired = p5.Vector.sub(target, this.pos);

                var d = desired.mag();

                var speed = this.maxspeed;

                if (d < 100) {
                    speed = this.p.map(d, 0, 100, 0, this.maxspeed);
                }

                desired.setMag(speed);

                var steer = p5.Vector.sub(desired, this.vel);

                steer.limit(this.maxforce);

                return steer;
            }
        }, {
            key: "flee",
            value: function flee(target) {
                var desired = p5.Vector.sub(target, this.pos);

                var d = desired.mag();

                if (d < 100) {
                    desired.setMag(this.speed);
                    desired.mult(-1);

                    var steer = p5.Vector.sub(desired, this.vel);

                    steer.limit(this.maxforce);

                    return steer;
                } else {
                    return this.p.createVector(0, 0);
                }
            }
        }]);

        return Point;
    }();

    var s = function s(p) {

        p.preload = function () {
            font = p.loadFont("../fonts/FiraCode-Bold.otf");
        };

        p.setup = function () {
            width = window.innerWidth;
            height = window.innerHeight;

            canvas = p.createCanvas(width, height).parent("main");

            figureRect = font.textBounds("BIGDRoP", 0, 200, 192);
            var left = (width - figureRect.w) / 2;

            var points = font.textToPoints("BIGDR  ", left, 200, 192, { sampleFactor: 0.7 });
            var pointP = font.textToPoints("      P", left, 200, 192, { sampleFactor: 0.7 });
            var pointO = font.textToPoints("     o ", left, 200, 192, { sampleFactor: 0.7 }).map(function (obj) {
                return { alpha: obj.alpha, x: obj.x + 7, y: obj.y + 40 };
            });

            allPoints = points.concat(pointP).concat(pointO);

            for (var i = 0; i < allPoints.length; i++) {
                var color = [];
                var r = 0;

                if (i < allPoints.length - pointO.length) {
                    color = [255, 255, 255];
                    r = 3;
                } else {
                    color = [255, 255, 0];
                    r = 4;
                }

                allPoints[i] = new Point(allPoints[i].x, allPoints[i].y, r, color, p);
            }

            secondWord = font.textToPoints("BIGDEAL", left, 200, 192, { sampleFactor: 0.7 });

            for (var _i = 0; _i < secondWord.length; _i++) {
                secondWord[_i] = new Point(secondWord[_i].x, secondWord[_i].y, 3, 255, p);
            }
        };

        p.mouseMoved = function () {
            for (var i = 0; i < allPoints.length; i++) {
                allPoints[i].mousemovebehavior();
            }
        };

        p.windowResized = function () {
            // p.resizeCanvas(window.innerWidth, window.innerHeight);
        };

        p.draw = function () {
            p.background(49);

            for (var i = 0; i < allPoints.length; i++) {
                allPoints[i].behaviors();
                allPoints[i].update();
                allPoints[i].show();
            }
        };

        p.mouseClicked = function () {
            for (var i = 0; i < allPoints.length; i++) {
                if (secondWord[i].target) {
                    allPoints[i].target = secondWord[i].target;
                }

                allPoints[i].vel = p.createVector(p.random(-50, 50), p.random(0, 45));
            }
        };
    };

    var lib = new __WEBPACK_IMPORTED_MODULE_1_p5_lib_p5_min__(s);
}

function canvas() {
    /*let a = 10;
    let b = 100;
    let time = 0;
     let simplex = new SimplexNoise();
     let main = document.querySelector(".main");
    // let canvas = document.createElement("canvas");
    let canvas = document.querySelector("canvas");
    // let ctx = canvas.getContext("2d");
    let width;
    let height;
    let count = 7000;
    let mouseX = 0;
    let mouseY = 0;
    let scroll = 0;
     // main.appendChild(canvas);
     let x = 0;
    let y = 0;
     class Walker {
        constructor(x, y, r, color, ctx, width, height, countX, countY) {
            this.x = x || 0;
            this.y = y || 0;
            this.r = r;
            this.color = color || "rgb(68,68,68)";
            this.width = width;
            this.height = height;
            this.ctx = ctx;
            this.step = this.r * 2;
            this.path = [];
            this.allow = true;
            this.particleWidth = width / countX;
            this.particleHeight = height / countY;
             this.render = () => {
                // this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                if (this.allow) {
                     this.walk();
                    this.display();
                     window.requestAnimationFrame(this.render);
                }
            };
             this.render();
        }
         walk() {
            let number = Math.floor(randNumber(0, 100));
             // this.path.push(this.y, this.x);
             if (number > 0 && number <= 25) {
                if (this.y + this.step < this.height) {
                    this.y += this.step;
                    // this.y += Math.sin(this.x) * this.step;
                    // this.x += Math.cos(this.y) * this.step;
                }
            }
             if (number > 25 && number <= 50) {
                if (this.x - this.step >= 0) {
                    this.x -= this.step;
                    // this.x -= Math.cos(this.y) * this.step;
                    // this.y -= Math.sin(this.x) * this.step;
                }
             }
             if (number > 50 && number <= 75) {
                if (this.y - this.step >= 0) {
                    this.y -= this.step;
                    // this.y -= Math.sin(this.x) * this.step;
                    // this.x -= Math.cos(this.y) * this.step;
                }
             }
             if (number > 75 && number <= 100) {
                if (this.x + this.step < this.width) {
                    this.x += this.step;
                    // this.x += Math.sin(this.y) * this.step;
                    // this.y += Math.sin(this.x) * this.step;
                }
            }
         }
         display() {
             // this.ctx.clearRect(this.prevX - this.r - 1, this.prevY - this.r -1, this.step+2, this.step+2);
            this.ctx.lineWidth = 1;
            // this.ctx.strokeStyle = this.color;
            this.ctx.strokeStyle = "rgba(0,0,0, .3)";
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            let check = Math.random();
            if (check <= 0.5) {
                //circle
                this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            } else {
                //rectangle
                this.ctx.rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
            }
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.closePath();
        }
         stop() {
            this.allow = false;
        }
         play() {
            this.allow = true;
            this.render();
        }
         delete() {
         }
    }
     class Equalizer {
        constructor(width, height, ctx) {
         }
      }
     window.addEventListener("resize", function () {
        setWidth(this);
    });
     $(window).on("mousemove", function(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
     $(window).on("scroll", function() {
        scroll = $(this).scrollTop();
    });
     window.addEventListener("load", function () {
        setWidth(this);
         // Walker
        /!*
         *
         *
         x = canvas.offsetWidth / 2;
         y = canvas.offsetHeight / 2;
         var myWalker;
         for (let i = 0; i < 150; i++) {
             let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
             /!* let x = Math.random() * canvas.width;
             let y = Math.random() * canvas.height;*!/
             let x = canvas.width/2;
             let y = canvas.height/2;
              // myWalker = new Walker(x, y, 10, color, ctx, canvas.width, canvas.height);
              console.log(myWalker);
         }*!/
         //Equalizer
        /!*function draw(){
            ctx.clearRect(0,0,width,height);
             ctx.beginPath();
             for(let i = 0; i < count; i++){
                // ctx.fillStyle = `rgb(${Math.random()*255},${Math.random()*55 + 128},${Math.random() * 55 + 200})`;
                 // let value2d = simplex.noise3D(width/count * i,  time/100, time) * (0.5 - 0.001) + 0.001;
                let value2d = simplex.noise3D(width/count * i, mouseX/1000, mouseY/1000); /!** (0.5 - 0.001) + 0.001*!/;
                 let lineheight = value2d * height;
                 ctx.fillRect(width/count * i, height / 2 - (lineheight/2), width/count*2, lineheight);
            }
            ctx.fill();
            ctx.closePath();
        }
         function render(){
            draw();
             time += 0.001;
            window.requestAnimationFrame(render);
        }
         render();*!/
         //??
       /!* function draw(){
            // ctx.clearRect(0,0,width,height);
             ctx.beginPath();
             let value2d = simplex.noise2D(mouseX/100, mouseY/100); /!** (0.5 - 0.001) + 0.001;*!/
            let second2d = simplex.noise2D(mouseY/100, mouseX/100); /!** (0.5 - 0.001) + 0.001;*!/
             let lineheight = value2d * (100-20) + 20;
            console.log(lineheight);
             ctx.fillRect(mouseX, mouseY, second2d, lineheight);
             ctx.fill();
            ctx.closePath();
        }
         function render(){
            draw();
             time += 0.001;
            window.requestAnimationFrame(render);
        }*!/
        //bg fog
        /!*let parts = 1000;
        let size = 25;
        // let x, y;
         ctx.strokeWidth = 1;
         function draw(){
            ctx.clearRect(0,0,width,height);
             for(let i = 0; i < parts; i++){
                let value = constrain(simplex.noise3D(i*time, -i*time, time/100), 0.01, 0.1);
                ctx.fillStyle = `rgba(0,0,0, ${value})`;
                ctx.fillRect(Math.random() * width, Math.random() * height, size, size);
            }
        }
         function render(){
            draw();
             time += 0.01;
            window.requestAnimationFrame(render);
        }*!/
          //triangled plain
    });*/

    function setWidth(window) {
        /*canvas.width = window.innerWidth - 2;
        canvas.height = window.innerHeight - 2;
        width = canvas.width;
        height = canvas.height;*/
    }

    function randNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function constrain(x, min, max) {
        return x < min ? min : x > max ? max : x;
    }
}

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.


 Copyright (c) 2018 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function() {
  'use strict';

  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  var F3 = 1.0 / 3.0;
  var G3 = 1.0 / 6.0;
  var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
  var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;

  function SimplexNoise(randomOrSeed) {
    var random;
    if (typeof randomOrSeed == 'function') {
      random = randomOrSeed;
    }
    else if (randomOrSeed) {
      random = alea(randomOrSeed);
    } else {
      random = Math.random;
    }
    this.p = buildPermutationTable(random);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (var i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }

  }
  SimplexNoise.prototype = {
    grad3: new Float32Array([1, 1, 0,
      -1, 1, 0,
      1, -1, 0,

      -1, -1, 0,
      1, 0, 1,
      -1, 0, 1,

      1, 0, -1,
      -1, 0, -1,
      0, 1, 1,

      0, -1, 1,
      0, 1, -1,
      0, -1, -1]),
    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
      0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
      1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
      -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
      1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
      -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
      1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
      -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
    noise2D: function(xin, yin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0 = 0; // Noise contributions from the three corners
      var n1 = 0;
      var n2 = 0;
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin) * F2; // Hairy factor for 2D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var t = (i + j) * G2;
      var X0 = i - t; // Unskew the cell origin back to (x,y) space
      var Y0 = j - t;
      var x0 = xin - X0; // The x,y distances from the cell origin
      var y0 = yin - Y0;
      // For the 2D case, the simplex shape is an equilateral triangle.
      // Determine which simplex we are in.
      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      else {
        i1 = 0;
        j1 = 1;
      } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
      // c = (3-sqrt(3))/6
      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
      var y1 = y0 - j1 + G2;
      var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
      var y2 = y0 - 1.0 + 2.0 * G2;
      // Work out the hashed gradient indices of the three simplex corners
      var ii = i & 255;
      var jj = j & 255;
      // Calculate the contribution from the three corners
      var t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 >= 0) {
        var gi0 = permMod12[ii + perm[jj]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
      }
      var t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 >= 0) {
        var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
      }
      var t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 >= 0) {
        var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].
      return 70.0 * (n0 + n1 + n2);
    },
    // 3D simplex noise
    noise3D: function(xin, yin, zin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0, n1, n2, n3; // Noise contributions from the four corners
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var k = Math.floor(zin + s);
      var t = (i + j + k) * G3;
      var X0 = i - t; // Unskew the cell origin back to (x,y,z) space
      var Y0 = j - t;
      var Z0 = k - t;
      var x0 = xin - X0; // The x,y,z distances from the cell origin
      var y0 = yin - Y0;
      var z0 = zin - Z0;
      // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
      // Determine which simplex we are in.
      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
      if (x0 >= y0) {
        if (y0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // X Y Z order
        else if (x0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } // X Z Y order
        else {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } // Z X Y order
      }
      else { // x0<y0
        if (y0 < z0) {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Z Y X order
        else if (x0 < z0) {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Y Z X order
        else {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // Y X Z order
      }
      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
      // c = 1/6.
      var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
      var y1 = y0 - j1 + G3;
      var z1 = z0 - k1 + G3;
      var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
      var y2 = y0 - j2 + 2.0 * G3;
      var z2 = z0 - k2 + 2.0 * G3;
      var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
      var y3 = y0 - 1.0 + 3.0 * G3;
      var z3 = z0 - 1.0 + 3.0 * G3;
      // Work out the hashed gradient indices of the four simplex corners
      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      // Calculate the contribution from the four corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 < 0) n0 = 0.0;
      else {
        var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 < 0) n1 = 0.0;
      else {
        var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t2 < 0) n2 = 0.0;
      else {
        var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 < 0) n3 = 0.0;
      else {
        var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
        t3 *= t3;
        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to stay just inside [-1,1]
      return 32.0 * (n0 + n1 + n2 + n3);
    },
    // 4D simplex noise, better simplex rank ordering method 2012-03-09
    noise4D: function(x, y, z, w) {
      var perm = this.perm;
      var grad4 = this.grad4;

      var n0, n1, n2, n3, n4; // Noise contributions from the five corners
      // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
      var s = (x + y + z + w) * F4; // Factor for 4D skewing
      var i = Math.floor(x + s);
      var j = Math.floor(y + s);
      var k = Math.floor(z + s);
      var l = Math.floor(w + s);
      var t = (i + j + k + l) * G4; // Factor for 4D unskewing
      var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
      var Y0 = j - t;
      var Z0 = k - t;
      var W0 = l - t;
      var x0 = x - X0; // The x,y,z,w distances from the cell origin
      var y0 = y - Y0;
      var z0 = z - Z0;
      var w0 = w - W0;
      // For the 4D case, the simplex is a 4D shape I won't even try to describe.
      // To find out which of the 24 possible simplices we're in, we need to
      // determine the magnitude ordering of x0, y0, z0 and w0.
      // Six pair-wise comparisons are performed between each possible pair
      // of the four coordinates, and the results are used to rank the numbers.
      var rankx = 0;
      var ranky = 0;
      var rankz = 0;
      var rankw = 0;
      if (x0 > y0) rankx++;
      else ranky++;
      if (x0 > z0) rankx++;
      else rankz++;
      if (x0 > w0) rankx++;
      else rankw++;
      if (y0 > z0) ranky++;
      else rankz++;
      if (y0 > w0) ranky++;
      else rankw++;
      if (z0 > w0) rankz++;
      else rankw++;
      var i1, j1, k1, l1; // The integer offsets for the second simplex corner
      var i2, j2, k2, l2; // The integer offsets for the third simplex corner
      var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
      // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
      // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
      // impossible. Only the 24 indices which have non-zero entries make any sense.
      // We use a thresholding to set the coordinates in turn from the largest magnitude.
      // Rank 3 denotes the largest coordinate.
      i1 = rankx >= 3 ? 1 : 0;
      j1 = ranky >= 3 ? 1 : 0;
      k1 = rankz >= 3 ? 1 : 0;
      l1 = rankw >= 3 ? 1 : 0;
      // Rank 2 denotes the second largest coordinate.
      i2 = rankx >= 2 ? 1 : 0;
      j2 = ranky >= 2 ? 1 : 0;
      k2 = rankz >= 2 ? 1 : 0;
      l2 = rankw >= 2 ? 1 : 0;
      // Rank 1 denotes the second smallest coordinate.
      i3 = rankx >= 1 ? 1 : 0;
      j3 = ranky >= 1 ? 1 : 0;
      k3 = rankz >= 1 ? 1 : 0;
      l3 = rankw >= 1 ? 1 : 0;
      // The fifth corner has all coordinate offsets = 1, so no need to compute that.
      var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
      var y1 = y0 - j1 + G4;
      var z1 = z0 - k1 + G4;
      var w1 = w0 - l1 + G4;
      var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
      var y2 = y0 - j2 + 2.0 * G4;
      var z2 = z0 - k2 + 2.0 * G4;
      var w2 = w0 - l2 + 2.0 * G4;
      var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
      var y3 = y0 - j3 + 3.0 * G4;
      var z3 = z0 - k3 + 3.0 * G4;
      var w3 = w0 - l3 + 3.0 * G4;
      var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
      var y4 = y0 - 1.0 + 4.0 * G4;
      var z4 = z0 - 1.0 + 4.0 * G4;
      var w4 = w0 - 1.0 + 4.0 * G4;
      // Work out the hashed gradient indices of the five simplex corners
      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      var ll = l & 255;
      // Calculate the contribution from the five corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
      if (t0 < 0) n0 = 0.0;
      else {
        var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
        t0 *= t0;
        n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
      if (t1 < 0) n1 = 0.0;
      else {
        var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
        t1 *= t1;
        n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
      if (t2 < 0) n2 = 0.0;
      else {
        var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
        t2 *= t2;
        n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
      if (t3 < 0) n3 = 0.0;
      else {
        var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
        t3 *= t3;
        n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
      }
      var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
      if (t4 < 0) n4 = 0.0;
      else {
        var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
        t4 *= t4;
        n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
      }
      // Sum up and scale the result to cover the range [-1,1]
      return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }
  };

  function buildPermutationTable(random) {
    var i;
    var p = new Uint8Array(256);
    for (i = 0; i < 256; i++) {
      p[i] = i;
    }
    for (i = 0; i < 255; i++) {
      var r = i + ~~(random() * (256 - i));
      var aux = p[i];
      p[i] = p[r];
      p[r] = aux;
    }
    return p;
  }
  SimplexNoise._buildPermutationTable = buildPermutationTable;

  function alea() {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    var mash = masher();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < arguments.length; i++) {
      s0 -= mash(arguments[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(arguments[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(arguments[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;
    return function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
  }
  function masher() {
    var n = 0xefc8249d;
    return function(data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
  }

  // amd
  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {return SimplexNoise;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  // common js
  if (true) exports.SimplexNoise = SimplexNoise;
  // browser
  else if (typeof window !== 'undefined') window.SimplexNoise = SimplexNoise;
  // nodejs
  if (true) {
    module.exports = SimplexNoise;
  }

})();


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*! p5.js v0.9.0 July 01, 2019 */

!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).p5=e()}}(function(){return function o(a,s,h){function l(t,e){if(!s[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return require(t,!0);if(u)return u(t,!0);var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}var n=s[t]={exports:{}};a[t][0].call(n.exports,function(e){return l(a[t][1][e]||e)},n,n.exports,o,a,s,h)}return s[t].exports}for(var u="function"==typeof require&&require,e=0;e<h.length;e++)l(h[e]);return l}({1:[function(e,t,r){"use strict";r.byteLength=function(e){var t=d(e),r=t[0],i=t[1];return 3*(r+i)/4-i},r.toByteArray=function(e){for(var t,r=d(e),i=r[0],n=r[1],o=new p((l=i,u=n,3*(l+u)/4-u)),a=0,s=0<n?i-4:i,h=0;h<s;h+=4)t=c[e.charCodeAt(h)]<<18|c[e.charCodeAt(h+1)]<<12|c[e.charCodeAt(h+2)]<<6|c[e.charCodeAt(h+3)],o[a++]=t>>16&255,o[a++]=t>>8&255,o[a++]=255&t;var l,u;2===n&&(t=c[e.charCodeAt(h)]<<2|c[e.charCodeAt(h+1)]>>4,o[a++]=255&t);1===n&&(t=c[e.charCodeAt(h)]<<10|c[e.charCodeAt(h+1)]<<4|c[e.charCodeAt(h+2)]>>2,o[a++]=t>>8&255,o[a++]=255&t);return o},r.fromByteArray=function(e){for(var t,r=e.length,i=r%3,n=[],o=0,a=r-i;o<a;o+=16383)n.push(h(e,o,a<o+16383?a:o+16383));1===i?(t=e[r-1],n.push(s[t>>2]+s[t<<4&63]+"==")):2===i&&(t=(e[r-2]<<8)+e[r-1],n.push(s[t>>10]+s[t>>4&63]+s[t<<2&63]+"="));return n.join("")};for(var s=[],c=[],p="undefined"!=typeof Uint8Array?Uint8Array:Array,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=0,o=i.length;n<o;++n)s[n]=i[n],c[i.charCodeAt(n)]=n;function d(e){var t=e.length;if(0<t%4)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");return-1===r&&(r=t),[r,r===t?0:4-r%4]}function h(e,t,r){for(var i,n,o=[],a=t;a<r;a+=3)i=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]),o.push(s[(n=i)>>18&63]+s[n>>12&63]+s[n>>6&63]+s[63&n]);return o.join("")}c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63},{}],2:[function(e,t,r){},{}],3:[function(e,t,r){"use strict";var i=e("base64-js"),o=e("ieee754");r.Buffer=c,r.SlowBuffer=function(e){+e!=e&&(e=0);return c.alloc(+e)},r.INSPECT_MAX_BYTES=50;var n=2147483647;function a(e){if(n<e)throw new RangeError('The value "'+e+'" is invalid for option "size"');var t=new Uint8Array(e);return t.__proto__=c.prototype,t}function c(e,t,r){if("number"!=typeof e)return s(e,t,r);if("string"==typeof t)throw new TypeError('The "string" argument must be of type string. Received type number');return l(e)}function s(e,t,r){if("string"==typeof e)return function(e,t){"string"==typeof t&&""!==t||(t="utf8");if(!c.isEncoding(t))throw new TypeError("Unknown encoding: "+t);var r=0|d(e,t),i=a(r),n=i.write(e,t);n!==r&&(i=i.slice(0,n));return i}(e,t);if(ArrayBuffer.isView(e))return u(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(O(e,ArrayBuffer)||e&&O(e.buffer,ArrayBuffer))return function(e,t,r){if(t<0||e.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw new RangeError('"length" is outside of buffer bounds');var i;i=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r);return i.__proto__=c.prototype,i}(e,t,r);if("number"==typeof e)throw new TypeError('The "value" argument must not be of type number. Received type number');var i=e.valueOf&&e.valueOf();if(null!=i&&i!==e)return c.from(i,t,r);var n=function(e){if(c.isBuffer(e)){var t=0|p(e.length),r=a(t);return 0===r.length||e.copy(r,0,0,t),r}if(void 0!==e.length)return"number"!=typeof e.length||B(e.length)?a(0):u(e);if("Buffer"===e.type&&Array.isArray(e.data))return u(e.data)}(e);if(n)return n;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return c.from(e[Symbol.toPrimitive]("string"),t,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function h(e){if("number"!=typeof e)throw new TypeError('"size" argument must be of type number');if(e<0)throw new RangeError('The value "'+e+'" is invalid for option "size"')}function l(e){return h(e),a(e<0?0:0|p(e))}function u(e){for(var t=e.length<0?0:0|p(e.length),r=a(t),i=0;i<t;i+=1)r[i]=255&e[i];return r}function p(e){if(n<=e)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n.toString(16)+" bytes");return 0|e}function d(e,t){if(c.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||O(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,i=2<arguments.length&&!0===arguments[2];if(!i&&0===r)return 0;for(var n=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return k(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return A(e).length;default:if(n)return i?-1:k(e).length;t=(""+t).toLowerCase(),n=!0}}function f(e,t,r){var i=e[t];e[t]=e[r],e[r]=i}function m(e,t,r,i,n){if(0===e.length)return-1;if("string"==typeof r?(i=r,r=0):2147483647<r?r=2147483647:r<-2147483648&&(r=-2147483648),B(r=+r)&&(r=n?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(n)return-1;r=e.length-1}else if(r<0){if(!n)return-1;r=0}if("string"==typeof t&&(t=c.from(t,i)),c.isBuffer(t))return 0===t.length?-1:v(e,t,r,i,n);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?n?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):v(e,[t],r,i,n);throw new TypeError("val must be string, number or Buffer")}function v(e,t,r,i,n){var o,a=1,s=e.length,h=t.length;if(void 0!==i&&("ucs2"===(i=String(i).toLowerCase())||"ucs-2"===i||"utf16le"===i||"utf-16le"===i)){if(e.length<2||t.length<2)return-1;s/=a=2,h/=2,r/=2}function l(e,t){return 1===a?e[t]:e.readUInt16BE(t*a)}if(n){var u=-1;for(o=r;o<s;o++)if(l(e,o)===l(t,-1===u?0:o-u)){if(-1===u&&(u=o),o-u+1===h)return u*a}else-1!==u&&(o-=o-u),u=-1}else for(s<r+h&&(r=s-h),o=r;0<=o;o--){for(var c=!0,p=0;p<h;p++)if(l(e,o+p)!==l(t,p)){c=!1;break}if(c)return o}return-1}function g(e,t,r,i){r=Number(r)||0;var n=e.length-r;i?n<(i=Number(i))&&(i=n):i=n;var o=t.length;o/2<i&&(i=o/2);for(var a=0;a<i;++a){var s=parseInt(t.substr(2*a,2),16);if(B(s))return a;e[r+a]=s}return a}function y(e,t,r,i){return U(function(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(t),e,r,i)}function b(e,t,r){return 0===t&&r===e.length?i.fromByteArray(e):i.fromByteArray(e.slice(t,r))}function _(e,t,r){r=Math.min(e.length,r);for(var i=[],n=t;n<r;){var o,a,s,h,l=e[n],u=null,c=239<l?4:223<l?3:191<l?2:1;if(n+c<=r)switch(c){case 1:l<128&&(u=l);break;case 2:128==(192&(o=e[n+1]))&&127<(h=(31&l)<<6|63&o)&&(u=h);break;case 3:o=e[n+1],a=e[n+2],128==(192&o)&&128==(192&a)&&2047<(h=(15&l)<<12|(63&o)<<6|63&a)&&(h<55296||57343<h)&&(u=h);break;case 4:o=e[n+1],a=e[n+2],s=e[n+3],128==(192&o)&&128==(192&a)&&128==(192&s)&&65535<(h=(15&l)<<18|(63&o)<<12|(63&a)<<6|63&s)&&h<1114112&&(u=h)}null===u?(u=65533,c=1):65535<u&&(u-=65536,i.push(u>>>10&1023|55296),u=56320|1023&u),i.push(u),n+=c}return function(e){var t=e.length;if(t<=x)return String.fromCharCode.apply(String,e);var r="",i=0;for(;i<t;)r+=String.fromCharCode.apply(String,e.slice(i,i+=x));return r}(i)}r.kMaxLength=n,(c.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(e){return!1}}())||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(c.prototype,"parent",{enumerable:!0,get:function(){if(c.isBuffer(this))return this.buffer}}),Object.defineProperty(c.prototype,"offset",{enumerable:!0,get:function(){if(c.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&c[Symbol.species]===c&&Object.defineProperty(c,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),c.poolSize=8192,c.from=function(e,t,r){return s(e,t,r)},c.prototype.__proto__=Uint8Array.prototype,c.__proto__=Uint8Array,c.alloc=function(e,t,r){return n=t,o=r,h(i=e),i<=0?a(i):void 0!==n?"string"==typeof o?a(i).fill(n,o):a(i).fill(n):a(i);var i,n,o},c.allocUnsafe=function(e){return l(e)},c.allocUnsafeSlow=function(e){return l(e)},c.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==c.prototype},c.compare=function(e,t){if(O(e,Uint8Array)&&(e=c.from(e,e.offset,e.byteLength)),O(t,Uint8Array)&&(t=c.from(t,t.offset,t.byteLength)),!c.isBuffer(e)||!c.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;for(var r=e.length,i=t.length,n=0,o=Math.min(r,i);n<o;++n)if(e[n]!==t[n]){r=e[n],i=t[n];break}return r<i?-1:i<r?1:0},c.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},c.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return c.alloc(0);var r;if(void 0===t)for(r=t=0;r<e.length;++r)t+=e[r].length;var i=c.allocUnsafe(t),n=0;for(r=0;r<e.length;++r){var o=e[r];if(O(o,Uint8Array)&&(o=c.from(o)),!c.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(i,n),n+=o.length}return i},c.byteLength=d,c.prototype._isBuffer=!0,c.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)f(this,t,t+1);return this},c.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)f(this,t,t+3),f(this,t+1,t+2);return this},c.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)f(this,t,t+7),f(this,t+1,t+6),f(this,t+2,t+5),f(this,t+3,t+4);return this},c.prototype.toLocaleString=c.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?_(this,0,e):function(e,t,r){var i=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return T(this,t,r);case"utf8":case"utf-8":return _(this,t,r);case"ascii":return w(this,t,r);case"latin1":case"binary":return S(this,t,r);case"base64":return b(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return M(this,t,r);default:if(i)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),i=!0}}.apply(this,arguments)},c.prototype.equals=function(e){if(!c.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===c.compare(this,e)},c.prototype.inspect=function(){var e="",t=r.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},c.prototype.compare=function(e,t,r,i,n){if(O(e,Uint8Array)&&(e=c.from(e,e.offset,e.byteLength)),!c.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===i&&(i=0),void 0===n&&(n=this.length),t<0||r>e.length||i<0||n>this.length)throw new RangeError("out of range index");if(n<=i&&r<=t)return 0;if(n<=i)return-1;if(r<=t)return 1;if(this===e)return 0;for(var o=(n>>>=0)-(i>>>=0),a=(r>>>=0)-(t>>>=0),s=Math.min(o,a),h=this.slice(i,n),l=e.slice(t,r),u=0;u<s;++u)if(h[u]!==l[u]){o=h[u],a=l[u];break}return o<a?-1:a<o?1:0},c.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},c.prototype.indexOf=function(e,t,r){return m(this,e,t,r,!0)},c.prototype.lastIndexOf=function(e,t,r){return m(this,e,t,r,!1)},c.prototype.write=function(e,t,r,i){if(void 0===t)i="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)i=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===i&&(i="utf8")):(i=r,r=void 0)}var n=this.length-t;if((void 0===r||n<r)&&(r=n),0<e.length&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");i||(i="utf8");for(var o,a,s,h,l,u,c,p,d,f=!1;;)switch(i){case"hex":return g(this,e,t,r);case"utf8":case"utf-8":return p=t,d=r,U(k(e,(c=this).length-p),c,p,d);case"ascii":return y(this,e,t,r);case"latin1":case"binary":return y(this,e,t,r);case"base64":return h=this,l=t,u=r,U(A(e),h,l,u);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return a=t,s=r,U(function(e,t){for(var r,i,n,o=[],a=0;a<e.length&&!((t-=2)<0);++a)r=e.charCodeAt(a),i=r>>8,n=r%256,o.push(n),o.push(i);return o}(e,(o=this).length-a),o,a,s);default:if(f)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),f=!0}},c.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var x=4096;function w(e,t,r){var i="";r=Math.min(e.length,r);for(var n=t;n<r;++n)i+=String.fromCharCode(127&e[n]);return i}function S(e,t,r){var i="";r=Math.min(e.length,r);for(var n=t;n<r;++n)i+=String.fromCharCode(e[n]);return i}function T(e,t,r){var i=e.length;(!t||t<0)&&(t=0),(!r||r<0||i<r)&&(r=i);for(var n="",o=t;o<r;++o)n+=I(e[o]);return n}function M(e,t,r){for(var i=e.slice(t,r),n="",o=0;o<i.length;o+=2)n+=String.fromCharCode(i[o]+256*i[o+1]);return n}function E(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(r<e+t)throw new RangeError("Trying to access beyond buffer length")}function C(e,t,r,i,n,o){if(!c.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(n<t||t<o)throw new RangeError('"value" argument is out of bounds');if(r+i>e.length)throw new RangeError("Index out of range")}function R(e,t,r,i,n,o){if(r+i>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function L(e,t,r,i,n){return t=+t,r>>>=0,n||R(e,0,r,4),o.write(e,t,r,i,23,4),r+4}function D(e,t,r,i,n){return t=+t,r>>>=0,n||R(e,0,r,8),o.write(e,t,r,i,52,8),r+8}c.prototype.slice=function(e,t){var r=this.length;(e=~~e)<0?(e+=r)<0&&(e=0):r<e&&(e=r),(t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):r<t&&(t=r),t<e&&(t=e);var i=this.subarray(e,t);return i.__proto__=c.prototype,i},c.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||E(e,t,this.length);for(var i=this[e],n=1,o=0;++o<t&&(n*=256);)i+=this[e+o]*n;return i},c.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||E(e,t,this.length);for(var i=this[e+--t],n=1;0<t&&(n*=256);)i+=this[e+--t]*n;return i},c.prototype.readUInt8=function(e,t){return e>>>=0,t||E(e,1,this.length),this[e]},c.prototype.readUInt16LE=function(e,t){return e>>>=0,t||E(e,2,this.length),this[e]|this[e+1]<<8},c.prototype.readUInt16BE=function(e,t){return e>>>=0,t||E(e,2,this.length),this[e]<<8|this[e+1]},c.prototype.readUInt32LE=function(e,t){return e>>>=0,t||E(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},c.prototype.readUInt32BE=function(e,t){return e>>>=0,t||E(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},c.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||E(e,t,this.length);for(var i=this[e],n=1,o=0;++o<t&&(n*=256);)i+=this[e+o]*n;return(n*=128)<=i&&(i-=Math.pow(2,8*t)),i},c.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||E(e,t,this.length);for(var i=t,n=1,o=this[e+--i];0<i&&(n*=256);)o+=this[e+--i]*n;return(n*=128)<=o&&(o-=Math.pow(2,8*t)),o},c.prototype.readInt8=function(e,t){return e>>>=0,t||E(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},c.prototype.readInt16LE=function(e,t){e>>>=0,t||E(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},c.prototype.readInt16BE=function(e,t){e>>>=0,t||E(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},c.prototype.readInt32LE=function(e,t){return e>>>=0,t||E(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},c.prototype.readInt32BE=function(e,t){return e>>>=0,t||E(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},c.prototype.readFloatLE=function(e,t){return e>>>=0,t||E(e,4,this.length),o.read(this,e,!0,23,4)},c.prototype.readFloatBE=function(e,t){return e>>>=0,t||E(e,4,this.length),o.read(this,e,!1,23,4)},c.prototype.readDoubleLE=function(e,t){return e>>>=0,t||E(e,8,this.length),o.read(this,e,!0,52,8)},c.prototype.readDoubleBE=function(e,t){return e>>>=0,t||E(e,8,this.length),o.read(this,e,!1,52,8)},c.prototype.writeUIntLE=function(e,t,r,i){(e=+e,t>>>=0,r>>>=0,i)||C(this,e,t,r,Math.pow(2,8*r)-1,0);var n=1,o=0;for(this[t]=255&e;++o<r&&(n*=256);)this[t+o]=e/n&255;return t+r},c.prototype.writeUIntBE=function(e,t,r,i){(e=+e,t>>>=0,r>>>=0,i)||C(this,e,t,r,Math.pow(2,8*r)-1,0);var n=r-1,o=1;for(this[t+n]=255&e;0<=--n&&(o*=256);)this[t+n]=e/o&255;return t+r},c.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,1,255,0),this[t]=255&e,t+1},c.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},c.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},c.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},c.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},c.prototype.writeIntLE=function(e,t,r,i){if(e=+e,t>>>=0,!i){var n=Math.pow(2,8*r-1);C(this,e,t,r,n-1,-n)}var o=0,a=1,s=0;for(this[t]=255&e;++o<r&&(a*=256);)e<0&&0===s&&0!==this[t+o-1]&&(s=1),this[t+o]=(e/a>>0)-s&255;return t+r},c.prototype.writeIntBE=function(e,t,r,i){if(e=+e,t>>>=0,!i){var n=Math.pow(2,8*r-1);C(this,e,t,r,n-1,-n)}var o=r-1,a=1,s=0;for(this[t+o]=255&e;0<=--o&&(a*=256);)e<0&&0===s&&0!==this[t+o+1]&&(s=1),this[t+o]=(e/a>>0)-s&255;return t+r},c.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},c.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},c.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},c.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},c.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||C(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},c.prototype.writeFloatLE=function(e,t,r){return L(this,e,t,!0,r)},c.prototype.writeFloatBE=function(e,t,r){return L(this,e,t,!1,r)},c.prototype.writeDoubleLE=function(e,t,r){return D(this,e,t,!0,r)},c.prototype.writeDoubleBE=function(e,t,r){return D(this,e,t,!1,r)},c.prototype.copy=function(e,t,r,i){if(!c.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),i||0===i||(i=this.length),t>=e.length&&(t=e.length),t||(t=0),0<i&&i<r&&(i=r),i===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(i<0)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),e.length-t<i-r&&(i=e.length-t+r);var n=i-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(t,r,i);else if(this===e&&r<t&&t<i)for(var o=n-1;0<=o;--o)e[o+t]=this[o+r];else Uint8Array.prototype.set.call(e,this.subarray(r,i),t);return n},c.prototype.fill=function(e,t,r,i){if("string"==typeof e){if("string"==typeof t?(i=t,t=0,r=this.length):"string"==typeof r&&(i=r,r=this.length),void 0!==i&&"string"!=typeof i)throw new TypeError("encoding must be a string");if("string"==typeof i&&!c.isEncoding(i))throw new TypeError("Unknown encoding: "+i);if(1===e.length){var n=e.charCodeAt(0);("utf8"===i&&n<128||"latin1"===i)&&(e=n)}}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;var o;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{var a=c.isBuffer(e)?e:c.from(e,i),s=a.length;if(0===s)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(o=0;o<r-t;++o)this[o+t]=a[o%s]}return this};var P=/[^+/0-9A-Za-z-_]/g;function I(e){return e<16?"0"+e.toString(16):e.toString(16)}function k(e,t){var r;t=t||1/0;for(var i=e.length,n=null,o=[],a=0;a<i;++a){if(55295<(r=e.charCodeAt(a))&&r<57344){if(!n){if(56319<r){-1<(t-=3)&&o.push(239,191,189);continue}if(a+1===i){-1<(t-=3)&&o.push(239,191,189);continue}n=r;continue}if(r<56320){-1<(t-=3)&&o.push(239,191,189),n=r;continue}r=65536+(n-55296<<10|r-56320)}else n&&-1<(t-=3)&&o.push(239,191,189);if(n=null,r<128){if((t-=1)<0)break;o.push(r)}else if(r<2048){if((t-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function A(e){return i.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(P,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function U(e,t,r,i){for(var n=0;n<i&&!(n+r>=t.length||n>=e.length);++n)t[n+r]=e[n];return n}function O(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}function B(e){return e!=e}},{"base64-js":1,ieee754:7}],4:[function(z,r,i){(function(F,V){var e,t;e=this,t=function(){"use strict";function l(e){return"function"==typeof e}var r=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},i=0,t=void 0,n=void 0,s=function(e,t){p[i]=e,p[i+1]=t,2===(i+=2)&&(n?n(d):y())};var e="undefined"!=typeof window?window:void 0,o=e||{},a=o.MutationObserver||o.WebKitMutationObserver,h="undefined"==typeof self&&void 0!==F&&"[object process]"==={}.toString.call(F),u="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function c(){var e=setTimeout;return function(){return e(d,1)}}var p=new Array(1e3);function d(){for(var e=0;e<i;e+=2){(0,p[e])(p[e+1]),p[e]=void 0,p[e+1]=void 0}i=0}var f,m,v,g,y=void 0;function b(e,t){var r=this,i=new this.constructor(w);void 0===i[x]&&B(i);var n=r._state;if(n){var o=arguments[n-1];s(function(){return U(n,i,o,r._result)})}else k(r,i,e,t);return i}function _(e){if(e&&"object"==typeof e&&e.constructor===this)return e;var t=new this(w);return L(t,e),t}y=h?function(){return F.nextTick(d)}:a?(m=0,v=new a(d),g=document.createTextNode(""),v.observe(g,{characterData:!0}),function(){g.data=m=++m%2}):u?((f=new MessageChannel).port1.onmessage=d,function(){return f.port2.postMessage(0)}):void 0===e&&"function"==typeof z?function(){try{var e=Function("return this")().require("vertx");return void 0!==(t=e.runOnLoop||e.runOnContext)?function(){t(d)}:c()}catch(e){return c()}}():c();var x=Math.random().toString(36).substring(2);function w(){}var S=void 0,T=1,M=2,E={error:null};function C(e){try{return e.then}catch(e){return E.error=e,E}}function R(e,t,r){var i,n,o,a;t.constructor===e.constructor&&r===b&&t.constructor.resolve===_?(o=e,(a=t)._state===T?P(o,a._result):a._state===M?I(o,a._result):k(a,void 0,function(e){return L(o,e)},function(e){return I(o,e)})):r===E?(I(e,E.error),E.error=null):void 0===r?P(e,t):l(r)?(i=t,n=r,s(function(t){var r=!1,e=function(e,t,r,i){try{e.call(t,r,i)}catch(e){return e}}(n,i,function(e){r||(r=!0,i!==e?L(t,e):P(t,e))},function(e){r||(r=!0,I(t,e))},t._label);!r&&e&&(r=!0,I(t,e))},e)):P(e,t)}function L(e,t){var r,i;e===t?I(e,new TypeError("You cannot resolve a promise with itself")):(i=typeof(r=t),null===r||"object"!==i&&"function"!==i?P(e,t):R(e,t,C(t)))}function D(e){e._onerror&&e._onerror(e._result),A(e)}function P(e,t){e._state===S&&(e._result=t,e._state=T,0!==e._subscribers.length&&s(A,e))}function I(e,t){e._state===S&&(e._state=M,e._result=t,s(D,e))}function k(e,t,r,i){var n=e._subscribers,o=n.length;e._onerror=null,n[o]=t,n[o+T]=r,n[o+M]=i,0===o&&e._state&&s(A,e)}function A(e){var t=e._subscribers,r=e._state;if(0!==t.length){for(var i=void 0,n=void 0,o=e._result,a=0;a<t.length;a+=3)i=t[a],n=t[a+r],i?U(r,i,n,o):n(o);e._subscribers.length=0}}function U(e,t,r,i){var n=l(r),o=void 0,a=void 0,s=void 0,h=void 0;if(n){if((o=function(e,t){try{return e(t)}catch(e){return E.error=e,E}}(r,i))===E?(h=!0,a=o.error,o.error=null):s=!0,t===o)return void I(t,new TypeError("A promises callback cannot return that same promise."))}else o=i,s=!0;t._state!==S||(n&&s?L(t,o):h?I(t,a):e===T?P(t,o):e===M&&I(t,o))}var O=0;function B(e){e[x]=O++,e._state=void 0,e._result=void 0,e._subscribers=[]}var N=function(){function e(e,t){this._instanceConstructor=e,this.promise=new e(w),this.promise[x]||B(this.promise),r(t)?(this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?P(this.promise,this._result):(this.length=this.length||0,this._enumerate(t),0===this._remaining&&P(this.promise,this._result))):I(this.promise,new Error("Array Methods must be provided an Array"))}return e.prototype._enumerate=function(e){for(var t=0;this._state===S&&t<e.length;t++)this._eachEntry(e[t],t)},e.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,i=r.resolve;if(i===_){var n=C(t);if(n===b&&t._state!==S)this._settledAt(t._state,e,t._result);else if("function"!=typeof n)this._remaining--,this._result[e]=t;else if(r===G){var o=new r(w);R(o,t,n),this._willSettleAt(o,e)}else this._willSettleAt(new r(function(e){return e(t)}),e)}else this._willSettleAt(i(t),e)},e.prototype._settledAt=function(e,t,r){var i=this.promise;i._state===S&&(this._remaining--,e===M?I(i,r):this._result[t]=r),0===this._remaining&&P(i,this._result)},e.prototype._willSettleAt=function(e,t){var r=this;k(e,void 0,function(e){return r._settledAt(T,t,e)},function(e){return r._settledAt(M,t,e)})},e}();var G=function(){function t(e){this[x]=O++,this._result=this._state=void 0,this._subscribers=[],w!==e&&("function"!=typeof e&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof t?function(t,e){try{e(function(e){L(t,e)},function(e){I(t,e)})}catch(e){I(t,e)}}(this,e):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return t.prototype.catch=function(e){return this.then(null,e)},t.prototype.finally=function(t){var r=this.constructor;return l(t)?this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})}):this.then(t,t)},t}();return G.prototype.then=b,G.all=function(e){return new N(this,e).promise},G.race=function(n){var o=this;return r(n)?new o(function(e,t){for(var r=n.length,i=0;i<r;i++)o.resolve(n[i]).then(e,t)}):new o(function(e,t){return t(new TypeError("You must pass an array to race."))})},G.resolve=_,G.reject=function(e){var t=new this(w);return I(t,e),t},G._setScheduler=function(e){n=e},G._setAsap=function(e){s=e},G._asap=s,G.polyfill=function(){var e=void 0;if(void 0!==V)e=V;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var t=e.Promise;if(t){var r=null;try{r=Object.prototype.toString.call(t.resolve())}catch(e){}if("[object Promise]"===r&&!t.cast)return}e.Promise=G},G.Promise=G},"object"==typeof i&&void 0!==r?r.exports=t():e.ES6Promise=t()}).call(this,z("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:10}],5:[function(e,i,n){!function(e,t){if(void 0!==n&&void 0!==i)t(n,i);else{var r={exports:{}};t(r.exports,r),e.fetchJsonp=r.exports}}(this,function(e,t){"use strict";var r=5e3,i="callback";function c(t){try{delete window[t]}catch(e){window[t]=void 0}}function p(e){var t=document.getElementById(e);t&&document.getElementsByTagName("head")[0].removeChild(t)}t.exports=function(o){var a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=o,h=a.timeout||r,l=a.jsonpCallback||i,u=void 0;return new Promise(function(t,e){var r=a.jsonpCallbackFunction||"jsonp_"+Date.now()+"_"+Math.ceil(1e5*Math.random()),i=l+"_"+r;window[r]=function(e){t({ok:!0,json:function(){return Promise.resolve(e)}}),u&&clearTimeout(u),p(i),c(r)},s+=-1===s.indexOf("?")?"?":"&";var n=document.createElement("script");n.setAttribute("src",""+s+l+"="+r),a.charset&&n.setAttribute("charset",a.charset),n.id=i,document.getElementsByTagName("head")[0].appendChild(n),u=setTimeout(function(){e(new Error("JSONP request to "+o+" timed out")),c(r),p(i),window[r]=function(){c(r)}},h),n.onerror=function(){e(new Error("JSONP request to "+o+" failed")),c(r),p(i),u&&clearTimeout(u)}})}})},{}],6:[function(e,t,r){var i=i||function(s){"use strict";if(!(void 0===s||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=s.document,h=function(){return s.URL||s.webkitURL||s},l=e.createElementNS("http://www.w3.org/1999/xhtml","a"),u="download"in l,c=/constructor/i.test(s.HTMLElement)||s.safari,p=/CriOS\/[\d]+/.test(navigator.userAgent),d=function(e){(s.setImmediate||s.setTimeout)(function(){throw e},0)},f=function(e){setTimeout(function(){"string"==typeof e?h().revokeObjectURL(e):e.remove()},4e4)},m=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},i=function(e,r,t){t||(e=m(e));var i,n=this,o="application/octet-stream"===e.type,a=function(){!function(e,t,r){for(var i=(t=[].concat(t)).length;i--;){var n=e["on"+t[i]];if("function"==typeof n)try{n.call(e,r||e)}catch(e){d(e)}}}(n,"writestart progress write writeend".split(" "))};if(n.readyState=n.INIT,u)return i=h().createObjectURL(e),void setTimeout(function(){var e,t;l.href=i,l.download=r,e=l,t=new MouseEvent("click"),e.dispatchEvent(t),a(),f(i),n.readyState=n.DONE});!function(){if((p||o&&c)&&s.FileReader){var t=new FileReader;return t.onloadend=function(){var e=p?t.result:t.result.replace(/^data:[^;]*;/,"data:attachment/file;");s.open(e,"_blank")||(s.location.href=e),e=void 0,n.readyState=n.DONE,a()},t.readAsDataURL(e),n.readyState=n.INIT}i||(i=h().createObjectURL(e)),o?s.location.href=i:s.open(i,"_blank")||(s.location.href=i);n.readyState=n.DONE,a(),f(i)}()},t=i.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,r){return t=t||e.name||"download",r||(e=m(e)),navigator.msSaveOrOpenBlob(e,t)}:(t.abort=function(){},t.readyState=t.INIT=0,t.WRITING=1,t.DONE=2,t.error=t.onwritestart=t.onprogress=t.onwrite=t.onabort=t.onerror=t.onwriteend=null,function(e,t,r){return new i(e,t||e.name||"download",r)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);void 0!==t&&t.exports&&(t.exports.saveAs=i)},{}],7:[function(e,t,r){r.read=function(e,t,r,i,n){var o,a,s=8*n-i-1,h=(1<<s)-1,l=h>>1,u=-7,c=r?n-1:0,p=r?-1:1,d=e[t+c];for(c+=p,o=d&(1<<-u)-1,d>>=-u,u+=s;0<u;o=256*o+e[t+c],c+=p,u-=8);for(a=o&(1<<-u)-1,o>>=-u,u+=i;0<u;a=256*a+e[t+c],c+=p,u-=8);if(0===o)o=1-l;else{if(o===h)return a?NaN:1/0*(d?-1:1);a+=Math.pow(2,i),o-=l}return(d?-1:1)*a*Math.pow(2,o-i)},r.write=function(e,t,r,i,n,o){var a,s,h,l=8*o-n-1,u=(1<<l)-1,c=u>>1,p=23===n?Math.pow(2,-24)-Math.pow(2,-77):0,d=i?0:o-1,f=i?1:-1,m=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(s=isNaN(t)?1:0,a=u):(a=Math.floor(Math.log(t)/Math.LN2),t*(h=Math.pow(2,-a))<1&&(a--,h*=2),2<=(t+=1<=a+c?p/h:p*Math.pow(2,1-c))*h&&(a++,h/=2),u<=a+c?(s=0,a=u):1<=a+c?(s=(t*h-1)*Math.pow(2,n),a+=c):(s=t*Math.pow(2,c-1)*Math.pow(2,n),a=0));8<=n;e[r+d]=255&s,d+=f,s/=256,n-=8);for(a=a<<n|s,l+=n;0<l;e[r+d]=255&a,d+=f,a/=256,l-=8);e[r+d-f]|=128*m}},{}],8:[function(e,t,r){"use strict";var i;function v(e,t){return e.b===t.b&&e.a===t.a}function g(e,t){return e.b<t.b||e.b===t.b&&e.a<=t.a}function y(e,t,r){var i=t.b-e.b,n=r.b-t.b;return 0<i+n?i<n?t.a-e.a+i/(i+n)*(e.a-r.a):t.a-r.a+n/(i+n)*(r.a-e.a):0}function b(e,t,r){var i=t.b-e.b,n=r.b-t.b;return 0<i+n?(t.a-r.a)*i+(t.a-e.a)*n:0}function _(e,t){return e.a<t.a||e.a===t.a&&e.b<=t.b}function x(e,t,r){var i=t.a-e.a,n=r.a-t.a;return 0<i+n?i<n?t.b-e.b+i/(i+n)*(e.b-r.b):t.b-r.b+n/(i+n)*(r.b-e.b):0}function w(e,t,r){var i=t.a-e.a,n=r.a-t.a;return 0<i+n?(t.b-r.b)*i+(t.b-e.b)*n:0}function S(e,t,r,i){return(e=e<0?0:e)<=(r=r<0?0:r)?0===r?(t+i)/2:t+e/(e+r)*(i-t):i+r/(e+r)*(t-i)}function a(e){var t=o(e.b);return n(t,e.c),n(t.b,e.c),s(t,e.a),t}function T(e,t){var r=!1,i=!1;e!==t&&(t.a!==e.a&&(i=!0,m(t.a,e.a)),t.d!==e.d&&(r=!0,h(t.d,e.d)),d(t,e),i||(n(t,e.a),e.a.c=e),r||(s(t,e.d),e.d.a=e))}function c(e){var t=e.b,r=!1;e.d!==e.b.d&&(r=!0,h(e.d,e.b.d)),e.c===e?m(e.a,null):(e.b.d.a=J(e),e.a.c=e.c,d(e,J(e)),r||s(e,e.d)),t.c===t?(m(t.a,null),h(t.d,null)):(e.d.a=J(t),t.a.c=t.c,d(t,J(t))),f(e)}function M(e){var t=o(e),r=t.b;return d(t,e.e),t.a=e.b.a,n(r,t.a),t.d=r.d=e.d,t=t.b,d(e.b,J(e.b)),d(e.b,t),e.b.a=t.a,t.b.a.c=t.b,t.b.d=e.b.d,t.f=e.f,t.b.f=e.b.f,t}function p(e,t){var r=!1,i=o(e),n=i.b;return t.d!==e.d&&(r=!0,h(t.d,e.d)),d(i,e.e),d(n,t),i.a=e.b.a,n.a=t.a,i.d=n.d=e.d,e.d.a=n,r||s(i,e.d),i}function o(e){var t=new K,r=new K,i=e.b.h;return(((r.h=i).b.h=t).h=e).b.h=r,t.b=r,((t.c=t).e=r).b=t,(r.c=r).e=t}function d(e,t){var r=e.c,i=t.c;r.b.e=t,(i.b.e=e).c=i,t.c=r}function n(e,t){var r=t.f,i=new ee(t,r);for(r.e=i,r=(t.f=i).c=e;r.a=i,(r=r.c)!==e;);}function s(e,t){var r=t.d,i=new Q(t,r);for(r.b=i,(t.d=i).a=e,i.c=t.c,r=e;r.d=i,(r=r.e)!==e;);}function f(e){var t=e.h;e=e.b.h,(t.b.h=e).b.h=t}function m(e,t){for(var r=e.c,i=r;i.a=t,(i=i.c)!==r;);r=e.f,((i=e.e).f=r).e=i}function h(e,t){for(var r=e.a,i=r;i.d=t,(i=i.e)!==r;);r=e.d,((i=e.b).d=r).b=i}function E(e){var t=0;return Math.abs(e[1])>Math.abs(e[0])&&(t=1),Math.abs(e[2])>Math.abs(e[t])&&(t=2),t}var C=4e150;function R(e,t){e.f+=t.f,e.b.f+=t.b.f}function l(e,t,r){return e=e.a,t=t.a,r=r.a,t.b.a===e?r.b.a===e?g(t.a,r.a)?b(r.b.a,t.a,r.a)<=0:0<=b(t.b.a,r.a,t.a):b(r.b.a,e,r.a)<=0:r.b.a===e?0<=b(t.b.a,e,t.a):(t=y(t.b.a,e,t.a),(e=y(r.b.a,e,r.a))<=t)}function L(e){e.a.i=null;var t=e.e;t.a.c=t.c,t.c.a=t.a,e.e=null}function u(e,t){c(e.a),e.c=!1,(e.a=t).i=e}function D(e){for(var t=e.a.a;(e=pe(e)).a.a===t;);return e.c&&(u(e,t=p(ce(e).a.b,e.a.e)),e=pe(e)),e}function P(e,t,r){var i=new ue;return i.a=r,i.e=X(e.f,t.e,i),r.i=i}function I(e,t){switch(e.s){case 100130:return 0!=(1&t);case 100131:return 0!==t;case 100132:return 0<t;case 100133:return t<0;case 100134:return 2<=t||t<=-2}return!1}function k(e){var t=e.a,r=t.d;r.c=e.d,r.a=t,L(e)}function A(e,t,r){for(t=(e=t).a;e!==r;){e.c=!1;var i=ce(e),n=i.a;if(n.a!==t.a){if(!i.c){k(e);break}u(i,n=p(t.c.b,n.b))}t.c!==n&&(T(J(n),n),T(t,n)),k(e),t=i.a,e=i}return t}function U(e,t,r,i,n,o){for(var a=!0;P(e,t,r.b),(r=r.c)!==i;);for(null===n&&(n=ce(t).a.b.c);(r=(i=ce(t)).a.b).a===n.a;)r.c!==n&&(T(J(r),r),T(J(n),r)),i.f=t.f-r.f,i.d=I(e,i.f),t.b=!0,!a&&G(e,t)&&(R(r,n),L(t),c(n)),a=!1,t=i,n=r;t.b=!0,o&&V(e,t)}function O(e,t,r,i,n){var o=[t.g[0],t.g[1],t.g[2]];t.d=null,t.d=e.o&&e.o(o,r,i,e.c)||null,null===t.d&&(n?e.n||(Z(e,100156),e.n=!0):t.d=r[0])}function B(e,t,r){var i=[null,null,null,null];i[0]=t.a.d,i[1]=r.a.d,O(e,t.a,i,[.5,.5,0,0],!1),T(t,r)}function N(e,t,r,i,n){var o=Math.abs(t.b-e.b)+Math.abs(t.a-e.a),a=Math.abs(r.b-e.b)+Math.abs(r.a-e.a),s=n+1;i[n]=.5*a/(o+a),i[s]=.5*o/(o+a),e.g[0]+=i[n]*t.g[0]+i[s]*r.g[0],e.g[1]+=i[n]*t.g[1]+i[s]*r.g[1],e.g[2]+=i[n]*t.g[2]+i[s]*r.g[2]}function G(e,t){var r=ce(t),i=t.a,n=r.a;if(g(i.a,n.a)){if(0<b(n.b.a,i.a,n.a))return!1;if(v(i.a,n.a)){if(i.a!==n.a){r=e.e;var o=i.a.h;if(0<=o){var a=(r=r.b).d,s=r.e,h=r.c,l=h[o];a[l]=a[r.a],(h[a[l]]=l)<=--r.a&&(l<=1?he(r,l):g(s[a[l>>1]],s[a[l]])?he(r,l):le(r,l)),s[o]=null,h[o]=r.b,r.b=o}else for(r.c[-(o+1)]=null;0<r.a&&null===r.c[r.d[r.a-1]];)--r.a;B(e,J(n),i)}}else M(n.b),T(i,J(n)),t.b=r.b=!0}else{if(b(i.b.a,n.a,i.a)<0)return!1;pe(t).b=t.b=!0,M(i.b),T(J(n),i)}return!0}function F(e,t){var r=ce(t),i=t.a,n=r.a,o=i.a,a=n.a,s=i.b.a,h=n.b.a,l=new ee;if(b(s,e.a,o),b(h,e.a,a),o===a||Math.min(o.a,s.a)>Math.max(a.a,h.a))return!1;if(g(o,a)){if(0<b(h,o,a))return!1}else if(b(s,a,o)<0)return!1;var u,c,p=s,d=o,f=h,m=a;if(g(p,d)||(u=p,p=d,d=u),g(f,m)||(u=f,f=m,m=u),g(p,f)||(u=p,p=f,f=u,u=d,d=m,m=u),g(f,d)?g(d,m)?((u=y(p,f,d))+(c=y(f,d,m))<0&&(u=-u,c=-c),l.b=S(u,f.b,c,d.b)):((u=b(p,f,d))+(c=-b(p,m,d))<0&&(u=-u,c=-c),l.b=S(u,f.b,c,m.b)):l.b=(f.b+d.b)/2,_(p,d)||(u=p,p=d,d=u),_(f,m)||(u=f,f=m,m=u),_(p,f)||(u=p,p=f,f=u,u=d,d=m,m=u),_(f,d)?_(d,m)?((u=x(p,f,d))+(c=x(f,d,m))<0&&(u=-u,c=-c),l.a=S(u,f.a,c,d.a)):((u=w(p,f,d))+(c=-w(p,m,d))<0&&(u=-u,c=-c),l.a=S(u,f.a,c,m.a)):l.a=(f.a+d.a)/2,g(l,e.a)&&(l.b=e.a.b,l.a=e.a.a),g(p=g(o,a)?o:a,l)&&(l.b=p.b,l.a=p.a),v(l,o)||v(l,a))return G(e,t),!1;if(!v(s,e.a)&&0<=b(s,e.a,l)||!v(h,e.a)&&b(h,e.a,l)<=0){if(h===e.a)return M(i.b),T(n.b,i),i=ce(t=D(t)).a,A(e,ce(t),r),U(e,t,J(i),i,i,!0),!0;if(s!==e.a)return 0<=b(s,e.a,l)&&(pe(t).b=t.b=!0,M(i.b),i.a.b=e.a.b,i.a.a=e.a.a),b(h,e.a,l)<=0&&(t.b=r.b=!0,M(n.b),n.a.b=e.a.b,n.a.a=e.a.a),!1;for(M(n.b),T(i.e,J(n)),a=(o=r=t).a.b.a;(o=pe(o)).a.b.a===a;);return o=ce(t=o).a.b.c,r.a=J(n),U(e,t,(n=A(e,r,null)).c,i.b.c,o,!0),!0}return M(i.b),M(n.b),T(J(n),i),i.a.b=l.b,i.a.a=l.a,i.a.h=re(e.e,i.a),i=i.a,n=[0,0,0,0],l=[o.d,s.d,a.d,h.d],i.g[0]=i.g[1]=i.g[2]=0,N(i,o,s,n,0),N(i,a,h,n,2),O(e,i,l,n,!0),pe(t).b=t.b=r.b=!0,!1}function V(e,t){for(var r=ce(t);;){for(;r.b;)r=ce(t=r);if(!t.b&&(null===(t=pe(r=t))||!t.b))break;t.b=!1;var i,n=t.a,o=r.a;if(i=n.b.a!==o.b.a)e:{var a=ce(i=t),s=i.a,h=a.a,l=void 0;if(g(s.b.a,h.b.a)){if(b(s.b.a,h.b.a,s.a)<0){i=!1;break e}pe(i).b=i.b=!0,l=M(s),T(h.b,l),l.d.c=i.d}else{if(0<b(h.b.a,s.b.a,h.a)){i=!1;break e}i.b=a.b=!0,l=M(h),T(s.e,h.b),l.b.d.c=i.d}i=!0}if(i&&(r.c?(L(r),c(o),o=(r=ce(t)).a):t.c&&(L(t),c(n),n=(t=pe(r)).a)),n.a!==o.a)if(n.b.a===o.b.a||t.c||r.c||n.b.a!==e.a&&o.b.a!==e.a)G(e,t);else if(F(e,t))break;n.a===o.a&&n.b.a===o.b.a&&(R(o,n),L(t),c(n),t=pe(r))}}function z(e,t){for(var r=(e.a=t).c;null===r.i;)if((r=r.c)===t.c){r=e;var i=t;(a=new ue).a=i.c.b;for(var n=(h=r.f).a;null!==(n=n.a).b&&!h.c(h.b,a,n.b););var o=ce(h=n.b),a=h.a;n=o.a;if(0===b(a.b.a,i,a.a))v((a=h.a).a,i)||v(a.b.a,i)||(M(a.b),h.c&&(c(a.c),h.c=!1),T(i.c,a),z(r,i));else{var s=g(n.b.a,a.b.a)?h:o;o=void 0;h.d||s.c?(o=s===h?p(i.c.b,a.e):p(n.b.c.b,i.c).b,s.c?u(s,o):((h=P(a=r,h,o)).f=pe(h).f+h.a.f,h.d=I(a,h.f)),z(r,i)):U(r,h,i.c,i.c,null,!0)}return}if(h=(a=ce(r=D(r.i))).a,(a=A(e,a,null)).c===h){a=(h=a).c,n=ce(r),o=r.a,s=n.a;var h,l=!1;o.b.a!==s.b.a&&F(e,r),v(o.a,e.a)&&(T(J(a),o),a=ce(r=D(r)).a,A(e,ce(r),n),l=!0),v(s.a,e.a)&&(T(h,J(s)),h=A(e,n,null),l=!0),l?U(e,r,h.c,a,a,!0):(i=g(s.a,o.a)?J(s):o,U(e,r,i=p(h.c.b,i),i.c,i.c,!1),i.b.i.c=!0,V(e,r))}else U(e,r,a.c,h,h,!0)}function H(e,t){var r=new ue,i=a(e.b);i.a.b=C,i.a.a=t,i.b.a.b=-C,i.b.a.a=t,e.a=i.b.a,r.a=i,r.f=0,r.d=!1,r.c=!1,r.h=!0,r.b=!1,i=X(i=e.f,i.a,r),r.e=i}function j(e){this.a=new W,this.b=e,this.c=l}function X(e,t,r){for(;null!==(t=t.c).b&&!e.c(e.b,t.b,r););return e=new W(r,t.a,t),t.a.c=e,t.a=e}function W(e,t,r){this.b=e||null,this.a=t||this,this.c=r||this}function q(){this.d=0,this.p=this.b=this.q=null,this.j=[0,0,0],this.s=100130,this.n=!1,this.o=this.a=this.e=this.f=null,this.m=!1,this.c=this.r=this.i=this.k=this.l=this.h=null}function Y(e,t){if(e.d!==t)for(;e.d!==t;)if(e.d<t)switch(e.d){case 0:Z(e,100151),e.u(null);break;case 1:Z(e,100152),e.t()}else switch(e.d){case 2:Z(e,100154),e.v();break;case 1:Z(e,100153),e.w()}}function Z(e,t){e.p&&e.p(t,e.c)}function Q(e,t){this.b=e||this,this.d=t||this,this.a=null,this.c=!1}function K(){(this.h=this).i=this.d=this.a=this.e=this.c=this.b=null,this.f=0}function J(e){return e.b.e}function $(){this.c=new ee,this.a=new Q,this.b=new K,this.d=new K,this.b.b=this.d,this.d.b=this.b}function ee(e,t){this.e=e||this,this.f=t||this,this.d=this.c=null,this.g=[0,0,0],this.h=this.a=this.b=0}function te(){this.c=[],this.d=null,this.a=0,this.e=!1,this.b=new ne}function re(e,t){if(e.e){var r,i=e.b,n=++i.a;return 2*n>i.f&&(i.f*=2,i.c=oe(i.c,i.f+1)),0===i.b?r=n:(r=i.b,i.b=i.c[i.b]),i.e[r]=t,i.c[r]=n,i.d[n]=r,i.h&&le(i,n),r}return i=e.a++,e.c[i]=t,-(i+1)}function ie(e){if(0===e.a)return se(e.b);var t=e.c[e.d[e.a-1]];if(0!==e.b.a&&g(ae(e.b),t))return se(e.b);for(;--e.a,0<e.a&&null===e.c[e.d[e.a-1]];);return t}function ne(){this.d=oe([0],33),this.e=[null,null],this.c=[0,0],this.a=0,this.f=32,this.b=0,this.h=!1,this.d[1]=1}function oe(e,t){for(var r=Array(t),i=0;i<e.length;i++)r[i]=e[i];for(;i<t;i++)r[i]=0;return r}function ae(e){return e.e[e.d[1]]}function se(e){var t=e.d,r=e.e,i=e.c,n=t[1],o=r[n];return 0<e.a&&(t[1]=t[e.a],i[t[1]]=1,r[n]=null,i[n]=e.b,e.b=n,0<--e.a&&he(e,1)),o}function he(e,t){for(var r=e.d,i=e.e,n=e.c,o=t,a=r[o];;){var s=o<<1;s<e.a&&g(i[r[s+1]],i[r[s]])&&(s+=1);var h=r[s];if(s>e.a||g(i[a],i[h])){n[r[o]=a]=o;break}n[r[o]=h]=o,o=s}}function le(e,t){for(var r=e.d,i=e.e,n=e.c,o=t,a=r[o];;){var s=o>>1,h=r[s];if(0===s||g(i[h],i[a])){n[r[o]=a]=o;break}n[r[o]=h]=o,o=s}}function ue(){this.e=this.a=null,this.f=0,this.c=this.b=this.h=this.d=!1}function ce(e){return e.e.c.b}function pe(e){return e.e.a.b}(i=q.prototype).x=function(){Y(this,0)},i.B=function(e,t){switch(e){case 100142:return;case 100140:switch(t){case 100130:case 100131:case 100132:case 100133:case 100134:return void(this.s=t)}break;case 100141:return void(this.m=!!t);default:return void Z(this,100900)}Z(this,100901)},i.y=function(e){switch(e){case 100142:return 0;case 100140:return this.s;case 100141:return this.m;default:Z(this,100900)}return!1},i.A=function(e,t,r){this.j[0]=e,this.j[1]=t,this.j[2]=r},i.z=function(e,t){var r=t||null;switch(e){case 100100:case 100106:this.h=r;break;case 100104:case 100110:this.l=r;break;case 100101:case 100107:this.k=r;break;case 100102:case 100108:this.i=r;break;case 100103:case 100109:this.p=r;break;case 100105:case 100111:this.o=r;break;case 100112:this.r=r;break;default:Z(this,100900)}},i.C=function(e,t){var r=!1,i=[0,0,0];Y(this,2);for(var n=0;n<3;++n){var o=e[n];o<-1e150&&(o=-1e150,r=!0),1e150<o&&(o=1e150,r=!0),i[n]=o}r&&Z(this,100155),null===(r=this.q)?T(r=a(this.b),r.b):(M(r),r=r.e),r.a.d=t,r.a.g[0]=i[0],r.a.g[1]=i[1],r.a.g[2]=i[2],r.f=1,r.b.f=-1,this.q=r},i.u=function(e){Y(this,0),this.d=1,this.b=new $,this.c=e},i.t=function(){Y(this,1),this.d=2,this.q=null},i.v=function(){Y(this,2),this.d=1},i.w=function(){Y(this,1),this.d=0;var e,t,r=!1,i=[h=this.j[0],n=this.j[1],a=this.j[2]];if(0===h&&0===n&&0===a){for(var n=[-2e150,-2e150,-2e150],o=[2e150,2e150,2e150],a=[],s=[],h=(r=this.b.c).e;h!==r;h=h.e)for(var l=0;l<3;++l){var u=h.g[l];u<o[l]&&(o[l]=u,s[l]=h),u>n[l]&&(n[l]=u,a[l]=h)}if(h=0,n[1]-o[1]>n[0]-o[0]&&(h=1),n[2]-o[2]>n[h]-o[h]&&(h=2),o[h]>=n[h])i[0]=0,i[1]=0,i[2]=1;else{for(n=0,o=s[h],a=a[h],s=[0,0,0],o=[o.g[0]-a.g[0],o.g[1]-a.g[1],o.g[2]-a.g[2]],l=[0,0,0],h=r.e;h!==r;h=h.e)l[0]=h.g[0]-a.g[0],l[1]=h.g[1]-a.g[1],l[2]=h.g[2]-a.g[2],s[0]=o[1]*l[2]-o[2]*l[1],s[1]=o[2]*l[0]-o[0]*l[2],s[2]=o[0]*l[1]-o[1]*l[0],n<(u=s[0]*s[0]+s[1]*s[1]+s[2]*s[2])&&(n=u,i[0]=s[0],i[1]=s[1],i[2]=s[2]);n<=0&&(i[0]=i[1]=i[2]=0,i[E(o)]=1)}r=!0}for(s=E(i),h=this.b.c,n=(s+1)%3,a=(s+2)%3,s=0<i[s]?1:-1,i=h.e;i!==h;i=i.e)i.b=i.g[n],i.a=s*i.g[a];if(r){for(i=0,h=(r=this.b.a).b;h!==r;h=h.b)if(!((n=h.a).f<=0))for(;i+=(n.a.b-n.b.a.b)*(n.a.a+n.b.a.a),(n=n.e)!==h.a;);if(i<0)for(r=(i=this.b.c).e;r!==i;r=r.e)r.a=-r.a}for(this.n=!1,h=(i=this.b.b).h;h!==i;h=r)r=h.h,n=h.e,v(h.a,h.b.a)&&h.e.e!==h&&(B(this,n,h),c(h),n=(h=n).e),n.e===h&&(n!==h&&(n!==r&&n!==r.b||(r=r.h),c(n)),h!==r&&h!==r.b||(r=r.h),c(h));for(this.e=i=new te,h=(r=this.b.c).e;h!==r;h=h.e)h.h=re(i,h);for(function(e){e.d=[];for(var t=0;t<e.a;t++)e.d[t]=t;e.d.sort((r=e.c,function(e,t){return g(r[e],r[t])?1:-1})),e.e=!0,function(e){for(var t=e.a;1<=t;--t)he(e,t);e.h=!0}(e.b);var r}(i),this.f=new j(this),H(this,-C),H(this,C);null!==(i=ie(this.e));){for(;;){e:if(h=this.e,0===h.a)r=ae(h.b);else if(r=h.c[h.d[h.a-1]],0!==h.b.a&&(h=ae(h.b),g(h,r))){r=h;break e}if(null===r||!v(r,i))break;r=ie(this.e),B(this,i.c,r.c)}z(this,i)}for(this.a=this.f.a.a.b.a.a,i=0;null!==(r=this.f.a.a.b);)r.h||++i,L(r);for(this.f=null,(i=this.e).b=null,i.d=null,this.e=i.c=null,h=(i=this.b).a.b;h!==i.a;h=r)r=h.b,(h=h.a).e.e===h&&(R(h.c,h),c(h));if(!this.n){if(i=this.b,this.m)for(h=i.b.h;h!==i.b;h=r)r=h.h,h.b.d.c!==h.d.c?h.f=h.d.c?1:-1:c(h);else for(h=i.a.b;h!==i.a;h=r)if(r=h.b,h.c){for(h=h.a;g(h.b.a,h.a);h=h.c.b);for(;g(h.a,h.b.a);h=h.e);for(n=h.c.b,a=void 0;h.e!==n;)if(g(h.b.a,n.a)){for(;n.e!==h&&(g((t=n.e).b.a,t.a)||b(n.a,n.b.a,n.e.b.a)<=0);)n=(a=p(n.e,n)).b;n=n.c.b}else{for(;n.e!==h&&(g((e=h.c.b).a,e.b.a)||0<=b(h.b.a,h.a,h.c.b.a));)h=(a=p(h,h.c.b)).b;h=h.e}for(;n.e.e!==h;)n=(a=p(n.e,n)).b}if(this.h||this.i||this.k||this.l)if(this.m){for(r=(i=this.b).a.b;r!==i.a;r=r.b)if(r.c){for(this.h&&this.h(2,this.c),h=r.a;this.k&&this.k(h.a.d,this.c),(h=h.e)!==r.a;);this.i&&this.i(this.c)}}else{for(i=this.b,r=!!this.l,h=!1,n=-1,a=i.a.d;a!==i.a;a=a.d)if(a.c)for(h||(this.h&&this.h(4,this.c),h=!0),s=a.a;r&&(n!==(o=s.b.d.c?0:1)&&(n=o,this.l&&this.l(!!n,this.c))),this.k&&this.k(s.a.d,this.c),(s=s.e)!==a.a;);h&&this.i&&this.i(this.c)}if(this.r){for(h=(i=this.b).a.b;h!==i.a;h=r)if(r=h.b,!h.c){for(a=(n=h.a).e,s=void 0;a=(s=a).e,(s.d=null)===s.b.d&&(s.c===s?m(s.a,null):(s.a.c=s.c,d(s,J(s))),(o=s.b).c===o?m(o.a,null):(o.a.c=o.c,d(o,J(o))),f(s)),s!==n;);n=h.d,((h=h.b).d=n).b=h}return this.r(this.b),void(this.c=this.b=null)}}this.b=this.c=null},this.libtess={GluTesselator:q,windingRule:{GLU_TESS_WINDING_ODD:100130,GLU_TESS_WINDING_NONZERO:100131,GLU_TESS_WINDING_POSITIVE:100132,GLU_TESS_WINDING_NEGATIVE:100133,GLU_TESS_WINDING_ABS_GEQ_TWO:100134},primitiveType:{GL_LINE_LOOP:2,GL_TRIANGLES:4,GL_TRIANGLE_STRIP:5,GL_TRIANGLE_FAN:6},errorType:{GLU_TESS_MISSING_BEGIN_POLYGON:100151,GLU_TESS_MISSING_END_POLYGON:100153,GLU_TESS_MISSING_BEGIN_CONTOUR:100152,GLU_TESS_MISSING_END_CONTOUR:100154,GLU_TESS_COORD_TOO_LARGE:100155,GLU_TESS_NEED_COMBINE_CALLBACK:100156},gluEnum:{GLU_TESS_MESH:100112,GLU_TESS_TOLERANCE:100142,GLU_TESS_WINDING_RULE:100140,GLU_TESS_BOUNDARY_ONLY:100141,GLU_INVALID_ENUM:100900,GLU_INVALID_VALUE:100901,GLU_TESS_BEGIN:100100,GLU_TESS_VERTEX:100101,GLU_TESS_END:100102,GLU_TESS_ERROR:100103,GLU_TESS_EDGE_FLAG:100104,GLU_TESS_COMBINE:100105,GLU_TESS_BEGIN_DATA:100106,GLU_TESS_VERTEX_DATA:100107,GLU_TESS_END_DATA:100108,GLU_TESS_ERROR_DATA:100109,GLU_TESS_EDGE_FLAG_DATA:100110,GLU_TESS_COMBINE_DATA:100111}},q.prototype.gluDeleteTess=q.prototype.x,q.prototype.gluTessProperty=q.prototype.B,q.prototype.gluGetTessProperty=q.prototype.y,q.prototype.gluTessNormal=q.prototype.A,q.prototype.gluTessCallback=q.prototype.z,q.prototype.gluTessVertex=q.prototype.C,q.prototype.gluTessBeginPolygon=q.prototype.u,q.prototype.gluTessBeginContour=q.prototype.t,q.prototype.gluTessEndContour=q.prototype.v,q.prototype.gluTessEndPolygon=q.prototype.w,void 0!==t&&(t.exports=this.libtess)},{}],9:[function(Vr,t,r){(function(Fr){var e;e=this,function(M){"use strict";var e,t;String.prototype.codePointAt||(e=function(){try{var e={},t=Object.defineProperty,r=t(e,e,e)&&t}catch(e){}return r}(),t=function(e){if(null==this)throw TypeError();var t=String(this),r=t.length,i=e?Number(e):0;if(i!=i&&(i=0),!(i<0||r<=i)){var n,o=t.charCodeAt(i);return 55296<=o&&o<=56319&&i+1<r&&56320<=(n=t.charCodeAt(i+1))&&n<=57343?1024*(o-55296)+n-56320+65536:o}},e?e(String.prototype,"codePointAt",{value:t,configurable:!0,writable:!0}):String.prototype.codePointAt=t);var h=0,o=-3;function r(){this.table=new Uint16Array(16),this.trans=new Uint16Array(288)}function a(e,t){this.source=e,this.sourceIndex=0,this.tag=0,this.bitcount=0,this.dest=t,this.destLen=0,this.ltree=new r,this.dtree=new r}var s=new r,l=new r,u=new Uint8Array(30),c=new Uint16Array(30),p=new Uint8Array(30),d=new Uint16Array(30),f=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),m=new r,v=new Uint8Array(320);function i(e,t,r,i){var n,o;for(n=0;n<r;++n)e[n]=0;for(n=0;n<30-r;++n)e[n+r]=n/r|0;for(o=i,n=0;n<30;++n)t[n]=o,o+=1<<e[n]}var g=new Uint16Array(16);function y(e,t,r,i){var n,o;for(n=0;n<16;++n)e.table[n]=0;for(n=0;n<i;++n)e.table[t[r+n]]++;for(n=o=e.table[0]=0;n<16;++n)g[n]=o,o+=e.table[n];for(n=0;n<i;++n)t[r+n]&&(e.trans[g[t[r+n]]++]=n)}function b(e){e.bitcount--||(e.tag=e.source[e.sourceIndex++],e.bitcount=7);var t=1&e.tag;return e.tag>>>=1,t}function _(e,t,r){if(!t)return r;for(;e.bitcount<24;)e.tag|=e.source[e.sourceIndex++]<<e.bitcount,e.bitcount+=8;var i=e.tag&65535>>>16-t;return e.tag>>>=t,e.bitcount-=t,i+r}function x(e,t){for(;e.bitcount<24;)e.tag|=e.source[e.sourceIndex++]<<e.bitcount,e.bitcount+=8;for(var r=0,i=0,n=0,o=e.tag;i=2*i+(1&o),o>>>=1,++n,r+=t.table[n],0<=(i-=t.table[n]););return e.tag=o,e.bitcount-=n,t.trans[r+i]}function w(e,t,r){var i,n,o,a,s,h;for(i=_(e,5,257),n=_(e,5,1),o=_(e,4,4),a=0;a<19;++a)v[a]=0;for(a=0;a<o;++a){var l=_(e,3,0);v[f[a]]=l}for(y(m,v,0,19),s=0;s<i+n;){var u=x(e,m);switch(u){case 16:var c=v[s-1];for(h=_(e,2,3);h;--h)v[s++]=c;break;case 17:for(h=_(e,3,3);h;--h)v[s++]=0;break;case 18:for(h=_(e,7,11);h;--h)v[s++]=0;break;default:v[s++]=u}}y(t,v,0,i),y(r,v,i,n)}function S(e,t,r){for(;;){var i,n,o,a,s=x(e,t);if(256===s)return h;if(s<256)e.dest[e.destLen++]=s;else for(i=_(e,u[s-=257],c[s]),n=x(e,r),a=o=e.destLen-_(e,p[n],d[n]);a<o+i;++a)e.dest[e.destLen++]=e.dest[a]}}function T(e){for(var t,r;8<e.bitcount;)e.sourceIndex--,e.bitcount-=8;if((t=256*(t=e.source[e.sourceIndex+1])+e.source[e.sourceIndex])!==(65535&~(256*e.source[e.sourceIndex+3]+e.source[e.sourceIndex+2])))return o;for(e.sourceIndex+=4,r=t;r;--r)e.dest[e.destLen++]=e.source[e.sourceIndex++];return e.bitcount=0,h}!function(e,t){var r;for(r=0;r<7;++r)e.table[r]=0;for(e.table[7]=24,e.table[8]=152,e.table[9]=112,r=0;r<24;++r)e.trans[r]=256+r;for(r=0;r<144;++r)e.trans[24+r]=r;for(r=0;r<8;++r)e.trans[168+r]=280+r;for(r=0;r<112;++r)e.trans[176+r]=144+r;for(r=0;r<5;++r)t.table[r]=0;for(t.table[5]=32,r=0;r<32;++r)t.trans[r]=r}(s,l),i(u,c,4,3),i(p,d,2,1),u[28]=0,c[28]=258;var n=function(e,t){var r,i,n=new a(e,t);do{switch(r=b(n),_(n,2,0)){case 0:i=T(n);break;case 1:i=S(n,s,l);break;case 2:w(n,n.ltree,n.dtree),i=S(n,n.ltree,n.dtree);break;default:i=o}if(i!==h)throw new Error("Data error")}while(!r);return n.destLen<n.dest.length?"function"==typeof n.dest.slice?n.dest.slice(0,n.destLen):n.dest.subarray(0,n.destLen):n.dest};function E(e,t,r,i,n){return Math.pow(1-n,3)*e+3*Math.pow(1-n,2)*n*t+3*(1-n)*Math.pow(n,2)*r+Math.pow(n,3)*i}function C(){this.x1=Number.NaN,this.y1=Number.NaN,this.x2=Number.NaN,this.y2=Number.NaN}function U(){this.commands=[],this.fill="black",this.stroke=null,this.strokeWidth=1}function R(e){throw new Error(e)}function L(e,t){e||R(t)}C.prototype.isEmpty=function(){return isNaN(this.x1)||isNaN(this.y1)||isNaN(this.x2)||isNaN(this.y2)},C.prototype.addPoint=function(e,t){"number"==typeof e&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=e,this.x2=e),e<this.x1&&(this.x1=e),e>this.x2&&(this.x2=e)),"number"==typeof t&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=t,this.y2=t),t<this.y1&&(this.y1=t),t>this.y2&&(this.y2=t))},C.prototype.addX=function(e){this.addPoint(e,null)},C.prototype.addY=function(e){this.addPoint(null,e)},C.prototype.addBezier=function(e,t,r,i,n,o,a,s){var h=this,l=[e,t],u=[r,i],c=[n,o],p=[a,s];this.addPoint(e,t),this.addPoint(a,s);for(var d=0;d<=1;d++){var f=6*l[d]-12*u[d]+6*c[d],m=-3*l[d]+9*u[d]-9*c[d]+3*p[d],v=3*u[d]-3*l[d];if(0!==m){var g=Math.pow(f,2)-4*v*m;if(!(g<0)){var y=(-f+Math.sqrt(g))/(2*m);0<y&&y<1&&(0===d&&h.addX(E(l[d],u[d],c[d],p[d],y)),1===d&&h.addY(E(l[d],u[d],c[d],p[d],y)));var b=(-f-Math.sqrt(g))/(2*m);0<b&&b<1&&(0===d&&h.addX(E(l[d],u[d],c[d],p[d],b)),1===d&&h.addY(E(l[d],u[d],c[d],p[d],b)))}}else{if(0===f)continue;var _=-v/f;0<_&&_<1&&(0===d&&h.addX(E(l[d],u[d],c[d],p[d],_)),1===d&&h.addY(E(l[d],u[d],c[d],p[d],_)))}}},C.prototype.addQuad=function(e,t,r,i,n,o){var a=e+2/3*(r-e),s=t+2/3*(i-t),h=a+1/3*(n-e),l=s+1/3*(o-t);this.addBezier(e,t,a,s,h,l,n,o)},U.prototype.moveTo=function(e,t){this.commands.push({type:"M",x:e,y:t})},U.prototype.lineTo=function(e,t){this.commands.push({type:"L",x:e,y:t})},U.prototype.curveTo=U.prototype.bezierCurveTo=function(e,t,r,i,n,o){this.commands.push({type:"C",x1:e,y1:t,x2:r,y2:i,x:n,y:o})},U.prototype.quadTo=U.prototype.quadraticCurveTo=function(e,t,r,i){this.commands.push({type:"Q",x1:e,y1:t,x:r,y:i})},U.prototype.close=U.prototype.closePath=function(){this.commands.push({type:"Z"})},U.prototype.extend=function(e){if(e.commands)e=e.commands;else if(e instanceof C){var t=e;return this.moveTo(t.x1,t.y1),this.lineTo(t.x2,t.y1),this.lineTo(t.x2,t.y2),this.lineTo(t.x1,t.y2),void this.close()}Array.prototype.push.apply(this.commands,e)},U.prototype.getBoundingBox=function(){for(var e=new C,t=0,r=0,i=0,n=0,o=0;o<this.commands.length;o++){var a=this.commands[o];switch(a.type){case"M":e.addPoint(a.x,a.y),t=i=a.x,r=n=a.y;break;case"L":e.addPoint(a.x,a.y),i=a.x,n=a.y;break;case"Q":e.addQuad(i,n,a.x1,a.y1,a.x,a.y),i=a.x,n=a.y;break;case"C":e.addBezier(i,n,a.x1,a.y1,a.x2,a.y2,a.x,a.y),i=a.x,n=a.y;break;case"Z":i=t,n=r;break;default:throw new Error("Unexpected path command "+a.type)}}return e.isEmpty()&&e.addPoint(0,0),e},U.prototype.draw=function(e){e.beginPath();for(var t=0;t<this.commands.length;t+=1){var r=this.commands[t];"M"===r.type?e.moveTo(r.x,r.y):"L"===r.type?e.lineTo(r.x,r.y):"C"===r.type?e.bezierCurveTo(r.x1,r.y1,r.x2,r.y2,r.x,r.y):"Q"===r.type?e.quadraticCurveTo(r.x1,r.y1,r.x,r.y):"Z"===r.type&&e.closePath()}this.fill&&(e.fillStyle=this.fill,e.fill()),this.stroke&&(e.strokeStyle=this.stroke,e.lineWidth=this.strokeWidth,e.stroke())},U.prototype.toPathData=function(o){function e(){for(var e,t=arguments,r="",i=0;i<arguments.length;i+=1){var n=t[i];0<=n&&0<i&&(r+=" "),r+=(e=n,Math.round(e)===e?""+Math.round(e):e.toFixed(o))}return r}o=void 0!==o?o:2;for(var t="",r=0;r<this.commands.length;r+=1){var i=this.commands[r];"M"===i.type?t+="M"+e(i.x,i.y):"L"===i.type?t+="L"+e(i.x,i.y):"C"===i.type?t+="C"+e(i.x1,i.y1,i.x2,i.y2,i.x,i.y):"Q"===i.type?t+="Q"+e(i.x1,i.y1,i.x,i.y):"Z"===i.type&&(t+="Z")}return t},U.prototype.toSVG=function(e){var t='<path d="';return t+=this.toPathData(e),t+='"',this.fill&&"black"!==this.fill&&(null===this.fill?t+=' fill="none"':t+=' fill="'+this.fill+'"'),this.stroke&&(t+=' stroke="'+this.stroke+'" stroke-width="'+this.strokeWidth+'"'),t+="/>"},U.prototype.toDOMElement=function(e){var t=this.toPathData(e),r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",t),r};var D={fail:R,argument:L,assert:L},P=2147483648,I={},k={},A={};function O(e){return function(){return e}}k.BYTE=function(e){return D.argument(0<=e&&e<=255,"Byte value should be between 0 and 255."),[e]},A.BYTE=O(1),k.CHAR=function(e){return[e.charCodeAt(0)]},A.CHAR=O(1),k.CHARARRAY=function(e){for(var t=[],r=0;r<e.length;r+=1)t[r]=e.charCodeAt(r);return t},A.CHARARRAY=function(e){return e.length},k.USHORT=function(e){return[e>>8&255,255&e]},A.USHORT=O(2),k.SHORT=function(e){return 32768<=e&&(e=-(65536-e)),[e>>8&255,255&e]},A.SHORT=O(2),k.UINT24=function(e){return[e>>16&255,e>>8&255,255&e]},A.UINT24=O(3),k.ULONG=function(e){return[e>>24&255,e>>16&255,e>>8&255,255&e]},A.ULONG=O(4),k.LONG=function(e){return P<=e&&(e=-(2*P-e)),[e>>24&255,e>>16&255,e>>8&255,255&e]},A.LONG=O(4),k.FIXED=k.ULONG,A.FIXED=A.ULONG,k.FWORD=k.SHORT,A.FWORD=A.SHORT,k.UFWORD=k.USHORT,A.UFWORD=A.USHORT,k.LONGDATETIME=function(e){return[0,0,0,0,e>>24&255,e>>16&255,e>>8&255,255&e]},A.LONGDATETIME=O(8),k.TAG=function(e){return D.argument(4===e.length,"Tag should be exactly 4 ASCII characters."),[e.charCodeAt(0),e.charCodeAt(1),e.charCodeAt(2),e.charCodeAt(3)]},A.TAG=O(4),k.Card8=k.BYTE,A.Card8=A.BYTE,k.Card16=k.USHORT,A.Card16=A.USHORT,k.OffSize=k.BYTE,A.OffSize=A.BYTE,k.SID=k.USHORT,A.SID=A.USHORT,k.NUMBER=function(e){return-107<=e&&e<=107?[e+139]:108<=e&&e<=1131?[247+((e-=108)>>8),255&e]:-1131<=e&&e<=-108?[251+((e=-e-108)>>8),255&e]:-32768<=e&&e<=32767?k.NUMBER16(e):k.NUMBER32(e)},A.NUMBER=function(e){return k.NUMBER(e).length},k.NUMBER16=function(e){return[28,e>>8&255,255&e]},A.NUMBER16=O(3),k.NUMBER32=function(e){return[29,e>>24&255,e>>16&255,e>>8&255,255&e]},A.NUMBER32=O(5),k.REAL=function(e){var t=e.toString(),r=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(t);if(r){var i=parseFloat("1e"+((r[2]?+r[2]:0)+r[1].length));t=(Math.round(e*i)/i).toString()}for(var n="",o=0,a=t.length;o<a;o+=1){var s=t[o];n+="e"===s?"-"===t[++o]?"c":"b":"."===s?"a":"-"===s?"e":s}for(var h=[30],l=0,u=(n+=1&n.length?"f":"ff").length;l<u;l+=2)h.push(parseInt(n.substr(l,2),16));return h},A.REAL=function(e){return k.REAL(e).length},k.NAME=k.CHARARRAY,A.NAME=A.CHARARRAY,k.STRING=k.CHARARRAY,A.STRING=A.CHARARRAY,I.UTF8=function(e,t,r){for(var i=[],n=r,o=0;o<n;o++,t+=1)i[o]=e.getUint8(t);return String.fromCharCode.apply(null,i)},I.UTF16=function(e,t,r){for(var i=[],n=r/2,o=0;o<n;o++,t+=2)i[o]=e.getUint16(t);return String.fromCharCode.apply(null,i)},k.UTF16=function(e){for(var t=[],r=0;r<e.length;r+=1){var i=e.charCodeAt(r);t[t.length]=i>>8&255,t[t.length]=255&i}return t},A.UTF16=function(e){return 2*e.length};var B={"x-mac-croatian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ","x-mac-cyrillic":"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю","x-mac-gaelic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ","x-mac-greek":"Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­","x-mac-icelandic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-inuit":"ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł","x-mac-ce":"ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",macintosh:"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-romanian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-turkish":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ"};I.MACSTRING=function(e,t,r,i){var n=B[i];if(void 0!==n){for(var o="",a=0;a<r;a++){var s=e.getUint8(t+a);o+=s<=127?String.fromCharCode(s):n[127&s]}return o}};var N,G="function"==typeof WeakMap&&new WeakMap;function F(e){return-128<=e&&e<=127}function V(e,t,r){for(var i=0,n=e.length;t<n&&i<64&&0===e[t];)++t,++i;return r.push(128|i-1),t}function z(e,t,r){for(var i=0,n=e.length,o=t;o<n&&i<64;){var a=e[o];if(!F(a))break;if(0===a&&o+1<n&&0===e[o+1])break;++o,++i}r.push(i-1);for(var s=t;s<o;++s)r.push(e[s]+256&255);return o}function H(e,t,r){for(var i=0,n=e.length,o=t;o<n&&i<64;){var a=e[o];if(0===a)break;if(F(a)&&o+1<n&&F(e[o+1]))break;++o,++i}r.push(64|i-1);for(var s=t;s<o;++s){var h=e[s];r.push(h+65536>>8&255,h+256&255)}return o}k.MACSTRING=function(e,t){var r=function(e){if(!N)for(var t in N={},B)N[t]=new String(t);var r=N[e];if(void 0!==r){if(G){var i=G.get(r);if(void 0!==i)return i}var n=B[e];if(void 0!==n){for(var o={},a=0;a<n.length;a++)o[n.charCodeAt(a)]=a+128;return G&&G.set(r,o),o}}}(t);if(void 0!==r){for(var i=[],n=0;n<e.length;n++){var o=e.charCodeAt(n);if(128<=o&&void 0===(o=r[o]))return;i[n]=o}return i}},A.MACSTRING=function(e,t){var r=k.MACSTRING(e,t);return void 0!==r?r.length:0},k.VARDELTAS=function(e){for(var t=0,r=[];t<e.length;){var i=e[t];t=0===i?V(e,t,r):-128<=i&&i<=127?z(e,t,r):H(e,t,r)}return r},k.INDEX=function(e){for(var t=1,r=[t],i=[],n=0;n<e.length;n+=1){var o=k.OBJECT(e[n]);Array.prototype.push.apply(i,o),t+=o.length,r.push(t)}if(0===i.length)return[0,0];for(var a=[],s=1+Math.floor(Math.log(t)/Math.log(2))/8|0,h=[void 0,k.BYTE,k.USHORT,k.UINT24,k.ULONG][s],l=0;l<r.length;l+=1){var u=h(r[l]);Array.prototype.push.apply(a,u)}return Array.prototype.concat(k.Card16(e.length),k.OffSize(s),a,i)},A.INDEX=function(e){return k.INDEX(e).length},k.DICT=function(e){for(var t=[],r=Object.keys(e),i=r.length,n=0;n<i;n+=1){var o=parseInt(r[n],0),a=e[o];t=(t=t.concat(k.OPERAND(a.value,a.type))).concat(k.OPERATOR(o))}return t},A.DICT=function(e){return k.DICT(e).length},k.OPERATOR=function(e){return e<1200?[e]:[12,e-1200]},k.OPERAND=function(e,t){var r=[];if(Array.isArray(t))for(var i=0;i<t.length;i+=1)D.argument(e.length===t.length,"Not enough arguments given for type"+t),r=r.concat(k.OPERAND(e[i],t[i]));else if("SID"===t)r=r.concat(k.NUMBER(e));else if("offset"===t)r=r.concat(k.NUMBER32(e));else if("number"===t)r=r.concat(k.NUMBER(e));else{if("real"!==t)throw new Error("Unknown operand type "+t);r=r.concat(k.REAL(e))}return r},k.OP=k.BYTE,A.OP=A.BYTE;var j="function"==typeof WeakMap&&new WeakMap;function X(e,t,r){for(var i=0;i<t.length;i+=1){var n=t[i];this[n.name]=n.value}if(this.tableName=e,this.fields=t,r)for(var o=Object.keys(r),a=0;a<o.length;a+=1){var s=o[a],h=r[s];void 0!==this[s]&&(this[s]=h)}}function W(e,t,r){void 0===r&&(r=t.length);var i=new Array(t.length+1);i[0]={name:e+"Count",type:"USHORT",value:r};for(var n=0;n<t.length;n++)i[n+1]={name:e+n,type:"USHORT",value:t[n]};return i}function q(e,t,r){var i=t.length,n=new Array(i+1);n[0]={name:e+"Count",type:"USHORT",value:i};for(var o=0;o<i;o++)n[o+1]={name:e+o,type:"TABLE",value:r(t[o],o)};return n}function Y(e,t,r){var i=t.length,n=[];n[0]={name:e+"Count",type:"USHORT",value:i};for(var o=0;o<i;o++)n=n.concat(r(t[o],o));return n}function Z(e){1===e.format?X.call(this,"coverageTable",[{name:"coverageFormat",type:"USHORT",value:1}].concat(W("glyph",e.glyphs))):D.assert(!1,"Can't create coverage table format 2 yet.")}function Q(e){X.call(this,"scriptListTable",Y("scriptRecord",e,function(e,t){var r=e.script,i=r.defaultLangSys;return D.assert(!!i,"Unable to write GSUB: script "+e.tag+" has no default language system."),[{name:"scriptTag"+t,type:"TAG",value:e.tag},{name:"script"+t,type:"TABLE",value:new X("scriptTable",[{name:"defaultLangSys",type:"TABLE",value:new X("defaultLangSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:i.reqFeatureIndex}].concat(W("featureIndex",i.featureIndexes)))}].concat(Y("langSys",r.langSysRecords,function(e,t){var r=e.langSys;return[{name:"langSysTag"+t,type:"TAG",value:e.tag},{name:"langSys"+t,type:"TABLE",value:new X("langSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:r.reqFeatureIndex}].concat(W("featureIndex",r.featureIndexes)))}]})))}]}))}function K(e){X.call(this,"featureListTable",Y("featureRecord",e,function(e,t){var r=e.feature;return[{name:"featureTag"+t,type:"TAG",value:e.tag},{name:"feature"+t,type:"TABLE",value:new X("featureTable",[{name:"featureParams",type:"USHORT",value:r.featureParams}].concat(W("lookupListIndex",r.lookupListIndexes)))}]}))}function J(e,r){X.call(this,"lookupListTable",q("lookup",e,function(e){var t=r[e.lookupType];return D.assert(!!t,"Unable to write GSUB lookup type "+e.lookupType+" tables."),new X("lookupTable",[{name:"lookupType",type:"USHORT",value:e.lookupType},{name:"lookupFlag",type:"USHORT",value:e.lookupFlag}].concat(q("subtable",e.subtables,t)))}))}k.CHARSTRING=function(e){if(j){var t=j.get(e);if(void 0!==t)return t}for(var r=[],i=e.length,n=0;n<i;n+=1){var o=e[n];r=r.concat(k[o.type](o.value))}return j&&j.set(e,r),r},A.CHARSTRING=function(e){return k.CHARSTRING(e).length},k.OBJECT=function(e){var t=k[e.type];return D.argument(void 0!==t,"No encoding function for type "+e.type),t(e.value)},A.OBJECT=function(e){var t=A[e.type];return D.argument(void 0!==t,"No sizeOf function for type "+e.type),t(e.value)},k.TABLE=function(e){for(var t=[],r=e.fields.length,i=[],n=[],o=0;o<r;o+=1){var a=e.fields[o],s=k[a.type];D.argument(void 0!==s,"No encoding function for field type "+a.type+" ("+a.name+")");var h=e[a.name];void 0===h&&(h=a.value);var l=s(h);"TABLE"===a.type?(n.push(t.length),t=t.concat([0,0]),i.push(l)):t=t.concat(l)}for(var u=0;u<i.length;u+=1){var c=n[u],p=t.length;D.argument(p<65536,"Table "+e.tableName+" too big."),t[c]=p>>8,t[c+1]=255&p,t=t.concat(i[u])}return t},A.TABLE=function(e){for(var t=0,r=e.fields.length,i=0;i<r;i+=1){var n=e.fields[i],o=A[n.type];D.argument(void 0!==o,"No sizeOf function for field type "+n.type+" ("+n.name+")");var a=e[n.name];void 0===a&&(a=n.value),t+=o(a),"TABLE"===n.type&&(t+=2)}return t},k.RECORD=k.TABLE,A.RECORD=A.TABLE,k.LITERAL=function(e){return e},A.LITERAL=function(e){return e.length},X.prototype.encode=function(){return k.TABLE(this)},X.prototype.sizeOf=function(){return A.TABLE(this)};var $={Table:X,Record:X,Coverage:(Z.prototype=Object.create(X.prototype)).constructor=Z,ScriptList:(Q.prototype=Object.create(X.prototype)).constructor=Q,FeatureList:(K.prototype=Object.create(X.prototype)).constructor=K,LookupList:(J.prototype=Object.create(X.prototype)).constructor=J,ushortList:W,tableList:q,recordList:Y};function ee(e,t){return e.getUint8(t)}function te(e,t){return e.getUint16(t,!1)}function re(e,t){return e.getUint32(t,!1)}function ie(e,t){return e.getInt16(t,!1)+e.getUint16(t+2,!1)/65535}var ne={byte:1,uShort:2,short:2,uLong:4,fixed:4,longDateTime:8,tag:4};function oe(e,t){this.data=e,this.offset=t,this.relativeOffset=0}oe.prototype.parseByte=function(){var e=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,e},oe.prototype.parseChar=function(){var e=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,e},oe.prototype.parseCard8=oe.prototype.parseByte,oe.prototype.parseCard16=oe.prototype.parseUShort=function(){var e=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,e},oe.prototype.parseSID=oe.prototype.parseUShort,oe.prototype.parseOffset16=oe.prototype.parseUShort,oe.prototype.parseShort=function(){var e=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,e},oe.prototype.parseF2Dot14=function(){var e=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,e},oe.prototype.parseOffset32=oe.prototype.parseULong=function(){var e=re(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,e},oe.prototype.parseFixed=function(){var e=ie(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,e},oe.prototype.parseString=function(e){var t=this.data,r=this.offset+this.relativeOffset,i="";this.relativeOffset+=e;for(var n=0;n<e;n++)i+=String.fromCharCode(t.getUint8(r+n));return i},oe.prototype.parseTag=function(){return this.parseString(4)},oe.prototype.parseLongDateTime=function(){var e=re(this.data,this.offset+this.relativeOffset+4);return e-=2082844800,this.relativeOffset+=8,e},oe.prototype.parseVersion=function(e){var t=te(this.data,this.offset+this.relativeOffset),r=te(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,void 0===e&&(e=4096),t+r/e/10},oe.prototype.skip=function(e,t){void 0===t&&(t=1),this.relativeOffset+=ne[e]*t},oe.prototype.parseULongList=function(e){void 0===e&&(e=this.parseULong());for(var t=new Array(e),r=this.data,i=this.offset+this.relativeOffset,n=0;n<e;n++)t[n]=r.getUint32(i),i+=4;return this.relativeOffset+=4*e,t},oe.prototype.parseOffset16List=oe.prototype.parseUShortList=function(e){void 0===e&&(e=this.parseUShort());for(var t=new Array(e),r=this.data,i=this.offset+this.relativeOffset,n=0;n<e;n++)t[n]=r.getUint16(i),i+=2;return this.relativeOffset+=2*e,t},oe.prototype.parseShortList=function(e){for(var t=new Array(e),r=this.data,i=this.offset+this.relativeOffset,n=0;n<e;n++)t[n]=r.getInt16(i),i+=2;return this.relativeOffset+=2*e,t},oe.prototype.parseByteList=function(e){for(var t=new Array(e),r=this.data,i=this.offset+this.relativeOffset,n=0;n<e;n++)t[n]=r.getUint8(i++);return this.relativeOffset+=e,t},oe.prototype.parseList=function(e,t){t||(t=e,e=this.parseUShort());for(var r=new Array(e),i=0;i<e;i++)r[i]=t.call(this);return r},oe.prototype.parseList32=function(e,t){t||(t=e,e=this.parseULong());for(var r=new Array(e),i=0;i<e;i++)r[i]=t.call(this);return r},oe.prototype.parseRecordList=function(e,t){t||(t=e,e=this.parseUShort());for(var r=new Array(e),i=Object.keys(t),n=0;n<e;n++){for(var o={},a=0;a<i.length;a++){var s=i[a],h=t[s];o[s]=h.call(this)}r[n]=o}return r},oe.prototype.parseRecordList32=function(e,t){t||(t=e,e=this.parseULong());for(var r=new Array(e),i=Object.keys(t),n=0;n<e;n++){for(var o={},a=0;a<i.length;a++){var s=i[a],h=t[s];o[s]=h.call(this)}r[n]=o}return r},oe.prototype.parseStruct=function(e){if("function"==typeof e)return e.call(this);for(var t=Object.keys(e),r={},i=0;i<t.length;i++){var n=t[i],o=e[n];r[n]=o.call(this)}return r},oe.prototype.parseValueRecord=function(e){if(void 0===e&&(e=this.parseUShort()),0!==e){var t={};return 1&e&&(t.xPlacement=this.parseShort()),2&e&&(t.yPlacement=this.parseShort()),4&e&&(t.xAdvance=this.parseShort()),8&e&&(t.yAdvance=this.parseShort()),16&e&&(t.xPlaDevice=void 0,this.parseShort()),32&e&&(t.yPlaDevice=void 0,this.parseShort()),64&e&&(t.xAdvDevice=void 0,this.parseShort()),128&e&&(t.yAdvDevice=void 0,this.parseShort()),t}},oe.prototype.parseValueRecordList=function(){for(var e=this.parseUShort(),t=this.parseUShort(),r=new Array(t),i=0;i<t;i++)r[i]=this.parseValueRecord(e);return r},oe.prototype.parsePointer=function(e){var t=this.parseOffset16();if(0<t)return new oe(this.data,this.offset+t).parseStruct(e)},oe.prototype.parsePointer32=function(e){var t=this.parseOffset32();if(0<t)return new oe(this.data,this.offset+t).parseStruct(e)},oe.prototype.parseListOfLists=function(e){for(var t=this,r=this.parseOffset16List(),i=r.length,n=this.relativeOffset,o=new Array(i),a=0;a<i;a++){var s=r[a];if(0!==s)if(t.relativeOffset=s,e){for(var h=t.parseOffset16List(),l=new Array(h.length),u=0;u<h.length;u++)t.relativeOffset=s+h[u],l[u]=e.call(t);o[a]=l}else o[a]=t.parseUShortList();else o[a]=void 0}return this.relativeOffset=n,o},oe.prototype.parseCoverage=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort(),r=this.parseUShort();if(1===t)return{format:1,glyphs:this.parseUShortList(r)};if(2!==t)throw new Error("0x"+e.toString(16)+": Coverage format must be 1 or 2.");for(var i=new Array(r),n=0;n<r;n++)i[n]={start:this.parseUShort(),end:this.parseUShort(),index:this.parseUShort()};return{format:2,ranges:i}},oe.prototype.parseClassDef=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(1===t)return{format:1,startGlyph:this.parseUShort(),classes:this.parseUShortList()};if(2===t)return{format:2,ranges:this.parseRecordList({start:oe.uShort,end:oe.uShort,classId:oe.uShort})};throw new Error("0x"+e.toString(16)+": ClassDef format must be 1 or 2.")},oe.list=function(e,t){return function(){return this.parseList(e,t)}},oe.list32=function(e,t){return function(){return this.parseList32(e,t)}},oe.recordList=function(e,t){return function(){return this.parseRecordList(e,t)}},oe.recordList32=function(e,t){return function(){return this.parseRecordList32(e,t)}},oe.pointer=function(e){return function(){return this.parsePointer(e)}},oe.pointer32=function(e){return function(){return this.parsePointer32(e)}},oe.tag=oe.prototype.parseTag,oe.byte=oe.prototype.parseByte,oe.uShort=oe.offset16=oe.prototype.parseUShort,oe.uShortList=oe.prototype.parseUShortList,oe.uLong=oe.offset32=oe.prototype.parseULong,oe.uLongList=oe.prototype.parseULongList,oe.struct=oe.prototype.parseStruct,oe.coverage=oe.prototype.parseCoverage,oe.classDef=oe.prototype.parseClassDef;var ae={reserved:oe.uShort,reqFeatureIndex:oe.uShort,featureIndexes:oe.uShortList};oe.prototype.parseScriptList=function(){return this.parsePointer(oe.recordList({tag:oe.tag,script:oe.pointer({defaultLangSys:oe.pointer(ae),langSysRecords:oe.recordList({tag:oe.tag,langSys:oe.pointer(ae)})})}))||[]},oe.prototype.parseFeatureList=function(){return this.parsePointer(oe.recordList({tag:oe.tag,feature:oe.pointer({featureParams:oe.offset16,lookupListIndexes:oe.uShortList})}))||[]},oe.prototype.parseLookupList=function(i){return this.parsePointer(oe.list(oe.pointer(function(){var e=this.parseUShort();D.argument(1<=e&&e<=9,"GPOS/GSUB lookup type "+e+" unknown.");var t=this.parseUShort(),r=16&t;return{lookupType:e,lookupFlag:t,subtables:this.parseList(oe.pointer(i[e])),markFilteringSet:r?this.parseUShort():void 0}})))||[]},oe.prototype.parseFeatureVariationsList=function(){return this.parsePointer32(function(){var e=this.parseUShort(),t=this.parseUShort();return D.argument(1===e&&t<1,"GPOS/GSUB feature variations table unknown."),this.parseRecordList32({conditionSetOffset:oe.offset32,featureTableSubstitutionOffset:oe.offset32})})||[]};var se={getByte:ee,getCard8:ee,getUShort:te,getCard16:te,getShort:function(e,t){return e.getInt16(t,!1)},getULong:re,getFixed:ie,getTag:function(e,t){for(var r="",i=t;i<t+4;i+=1)r+=String.fromCharCode(e.getInt8(i));return r},getOffset:function(e,t,r){for(var i=0,n=0;n<r;n+=1)i<<=8,i+=e.getUint8(t+n);return i},getBytes:function(e,t,r){for(var i=[],n=t;n<r;n+=1)i.push(e.getUint8(n));return i},bytesToString:function(e){for(var t="",r=0;r<e.length;r+=1)t+=String.fromCharCode(e[r]);return t},Parser:oe};var he={parse:function(e,t){var r={};r.version=se.getUShort(e,t),D.argument(0===r.version,"cmap table version should be 0."),r.numTables=se.getUShort(e,t+2);for(var i=-1,n=r.numTables-1;0<=n;n-=1){var o=se.getUShort(e,t+4+8*n),a=se.getUShort(e,t+4+8*n+2);if(3===o&&(0===a||1===a||10===a)||0===o&&(0===a||1===a||2===a||3===a||4===a)){i=se.getULong(e,t+4+8*n+4);break}}if(-1===i)throw new Error("No valid cmap sub-tables found.");var s=new se.Parser(e,t+i);if(r.format=s.parseUShort(),12===r.format)!function(e,t){var r;t.parseUShort(),e.length=t.parseULong(),e.language=t.parseULong(),e.groupCount=r=t.parseULong(),e.glyphIndexMap={};for(var i=0;i<r;i+=1)for(var n=t.parseULong(),o=t.parseULong(),a=t.parseULong(),s=n;s<=o;s+=1)e.glyphIndexMap[s]=a,a++}(r,s);else{if(4!==r.format)throw new Error("Only format 4 and 12 cmap tables are supported (found format "+r.format+").");!function(e,t,r,i,n){var o;e.length=t.parseUShort(),e.language=t.parseUShort(),e.segCount=o=t.parseUShort()>>1,t.skip("uShort",3),e.glyphIndexMap={};for(var a=new se.Parser(r,i+n+14),s=new se.Parser(r,i+n+16+2*o),h=new se.Parser(r,i+n+16+4*o),l=new se.Parser(r,i+n+16+6*o),u=i+n+16+8*o,c=0;c<o-1;c+=1)for(var p=void 0,d=a.parseUShort(),f=s.parseUShort(),m=h.parseShort(),v=l.parseUShort(),g=f;g<=d;g+=1)0!==v?(u=l.offset+l.relativeOffset-2,u+=v,u+=2*(g-f),0!==(p=se.getUShort(r,u))&&(p=p+m&65535)):p=g+m&65535,e.glyphIndexMap[g]=p}(r,s,e,t,i)}return r},make:function(e){var t,r=!0;for(t=e.length-1;0<t;t-=1)if(65535<e.get(t).unicode){console.log("Adding CMAP format 12 (needed!)"),r=!1;break}var i=[{name:"version",type:"USHORT",value:0},{name:"numTables",type:"USHORT",value:r?1:2},{name:"platformID",type:"USHORT",value:3},{name:"encodingID",type:"USHORT",value:1},{name:"offset",type:"ULONG",value:r?12:20}];r||(i=i.concat([{name:"cmap12PlatformID",type:"USHORT",value:3},{name:"cmap12EncodingID",type:"USHORT",value:10},{name:"cmap12Offset",type:"ULONG",value:0}])),i=i.concat([{name:"format",type:"USHORT",value:4},{name:"cmap4Length",type:"USHORT",value:0},{name:"language",type:"USHORT",value:0},{name:"segCountX2",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);var n,o,a,s=new $.Table("cmap",i);for(s.segments=[],t=0;t<e.length;t+=1){for(var h=e.get(t),l=0;l<h.unicodes.length;l+=1)n=s,o=h.unicodes[l],a=t,n.segments.push({end:o,start:o,delta:-(o-a),offset:0,glyphIndex:a});s.segments=s.segments.sort(function(e,t){return e.start-t.start})}s.segments.push({end:65535,start:65535,delta:1,offset:0});var u=s.segments.length,c=0,p=[],d=[],f=[],m=[],v=[],g=[];for(t=0;t<u;t+=1){var y=s.segments[t];y.end<=65535&&y.start<=65535?(p=p.concat({name:"end_"+t,type:"USHORT",value:y.end}),d=d.concat({name:"start_"+t,type:"USHORT",value:y.start}),f=f.concat({name:"idDelta_"+t,type:"SHORT",value:y.delta}),m=m.concat({name:"idRangeOffset_"+t,type:"USHORT",value:y.offset}),void 0!==y.glyphId&&(v=v.concat({name:"glyph_"+t,type:"USHORT",value:y.glyphId}))):c+=1,r||void 0===y.glyphIndex||(g=(g=(g=g.concat({name:"cmap12Start_"+t,type:"ULONG",value:y.start})).concat({name:"cmap12End_"+t,type:"ULONG",value:y.end})).concat({name:"cmap12Glyph_"+t,type:"ULONG",value:y.glyphIndex}))}if(s.segCountX2=2*(u-c),s.searchRange=2*Math.pow(2,Math.floor(Math.log(u-c)/Math.log(2))),s.entrySelector=Math.log(s.searchRange/2)/Math.log(2),s.rangeShift=s.segCountX2-s.searchRange,s.fields=s.fields.concat(p),s.fields.push({name:"reservedPad",type:"USHORT",value:0}),s.fields=s.fields.concat(d),s.fields=s.fields.concat(f),s.fields=s.fields.concat(m),s.fields=s.fields.concat(v),s.cmap4Length=14+2*p.length+2+2*d.length+2*f.length+2*m.length+2*v.length,!r){var b=16+4*g.length;s.cmap12Offset=20+s.cmap4Length,s.fields=s.fields.concat([{name:"cmap12Format",type:"USHORT",value:12},{name:"cmap12Reserved",type:"USHORT",value:0},{name:"cmap12Length",type:"ULONG",value:b},{name:"cmap12Language",type:"ULONG",value:0},{name:"cmap12nGroups",type:"ULONG",value:g.length/3}]),s.fields=s.fields.concat(g)}return s}},le=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","266 ff","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],ue=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],ce=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],pe=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];function de(e){this.font=e}function fe(e){this.cmap=e}function me(e,t){this.encoding=e,this.charset=t}function ve(e){switch(e.version){case 1:this.names=pe.slice();break;case 2:this.names=new Array(e.numberOfGlyphs);for(var t=0;t<e.numberOfGlyphs;t++)e.glyphNameIndex[t]<pe.length?this.names[t]=pe[e.glyphNameIndex[t]]:this.names[t]=e.names[e.glyphNameIndex[t]-pe.length];break;case 2.5:this.names=new Array(e.numberOfGlyphs);for(var r=0;r<e.numberOfGlyphs;r++)this.names[r]=pe[r+e.glyphNameIndex[r]];break;case 3:default:this.names=[]}}de.prototype.charToGlyphIndex=function(e){var t=e.codePointAt(0),r=this.font.glyphs;if(r)for(var i=0;i<r.length;i+=1)for(var n=r.get(i),o=0;o<n.unicodes.length;o+=1)if(n.unicodes[o]===t)return i;return null},fe.prototype.charToGlyphIndex=function(e){return this.cmap.glyphIndexMap[e.codePointAt(0)]||0},me.prototype.charToGlyphIndex=function(e){var t=e.codePointAt(0),r=this.encoding[t];return this.charset.indexOf(r)},ve.prototype.nameToGlyphIndex=function(e){return this.names.indexOf(e)},ve.prototype.glyphIndexToName=function(e){return this.names[e]};var ge={line:function(e,t,r,i,n){e.beginPath(),e.moveTo(t,r),e.lineTo(i,n),e.stroke()}};function ye(e){this.bindConstructorValues(e)}function be(t,e,r){Object.defineProperty(t,e,{get:function(){return t.path,t[r]},set:function(e){t[r]=e},enumerable:!0,configurable:!0})}function _e(e,t){if(this.font=e,this.glyphs={},Array.isArray(t))for(var r=0;r<t.length;r++)this.glyphs[r]=t[r];this.length=t&&t.length||0}ye.prototype.bindConstructorValues=function(e){var t,r;this.index=e.index||0,this.name=e.name||null,this.unicode=e.unicode||void 0,this.unicodes=e.unicodes||void 0!==e.unicode?[e.unicode]:[],e.xMin&&(this.xMin=e.xMin),e.yMin&&(this.yMin=e.yMin),e.xMax&&(this.xMax=e.xMax),e.yMax&&(this.yMax=e.yMax),e.advanceWidth&&(this.advanceWidth=e.advanceWidth),Object.defineProperty(this,"path",(t=e.path,r=t||new U,{configurable:!0,get:function(){return"function"==typeof r&&(r=r()),r},set:function(e){r=e}}))},ye.prototype.addUnicode=function(e){0===this.unicodes.length&&(this.unicode=e),this.unicodes.push(e)},ye.prototype.getBoundingBox=function(){return this.path.getBoundingBox()},ye.prototype.getPath=function(e,t,r,i,n){var o,a;e=void 0!==e?e:0,t=void 0!==t?t:0,r=void 0!==r?r:72,i||(i={});var s=i.xScale,h=i.yScale;if(i.hinting&&n&&n.hinting&&(a=this.path&&n.hinting.exec(this,r)),a)o=n.hinting.getCommands(a),e=Math.round(e),t=Math.round(t),s=h=1;else{o=this.path.commands;var l=1/this.path.unitsPerEm*r;void 0===s&&(s=l),void 0===h&&(h=l)}for(var u=new U,c=0;c<o.length;c+=1){var p=o[c];"M"===p.type?u.moveTo(e+p.x*s,t+-p.y*h):"L"===p.type?u.lineTo(e+p.x*s,t+-p.y*h):"Q"===p.type?u.quadraticCurveTo(e+p.x1*s,t+-p.y1*h,e+p.x*s,t+-p.y*h):"C"===p.type?u.curveTo(e+p.x1*s,t+-p.y1*h,e+p.x2*s,t+-p.y2*h,e+p.x*s,t+-p.y*h):"Z"===p.type&&u.closePath()}return u},ye.prototype.getContours=function(){if(void 0===this.points)return[];for(var e=[],t=[],r=0;r<this.points.length;r+=1){var i=this.points[r];t.push(i),i.lastPointOfContour&&(e.push(t),t=[])}return D.argument(0===t.length,"There are still points left in the current contour."),e},ye.prototype.getMetrics=function(){for(var e=this.path.commands,t=[],r=[],i=0;i<e.length;i+=1){var n=e[i];"Z"!==n.type&&(t.push(n.x),r.push(n.y)),"Q"!==n.type&&"C"!==n.type||(t.push(n.x1),r.push(n.y1)),"C"===n.type&&(t.push(n.x2),r.push(n.y2))}var o={xMin:Math.min.apply(null,t),yMin:Math.min.apply(null,r),xMax:Math.max.apply(null,t),yMax:Math.max.apply(null,r),leftSideBearing:this.leftSideBearing};return isFinite(o.xMin)||(o.xMin=0),isFinite(o.xMax)||(o.xMax=this.advanceWidth),isFinite(o.yMin)||(o.yMin=0),isFinite(o.yMax)||(o.yMax=0),o.rightSideBearing=this.advanceWidth-o.leftSideBearing-(o.xMax-o.xMin),o},ye.prototype.draw=function(e,t,r,i,n){this.getPath(t,r,i,n).draw(e)},ye.prototype.drawPoints=function(a,e,t,r){function i(e,t,r,i){var n=2*Math.PI;a.beginPath();for(var o=0;o<e.length;o+=1)a.moveTo(t+e[o].x*i,r+e[o].y*i),a.arc(t+e[o].x*i,r+e[o].y*i,2,0,n,!1);a.closePath(),a.fill()}e=void 0!==e?e:0,t=void 0!==t?t:0,r=void 0!==r?r:24;for(var n=1/this.path.unitsPerEm*r,o=[],s=[],h=this.path,l=0;l<h.commands.length;l+=1){var u=h.commands[l];void 0!==u.x&&o.push({x:u.x,y:-u.y}),void 0!==u.x1&&s.push({x:u.x1,y:-u.y1}),void 0!==u.x2&&s.push({x:u.x2,y:-u.y2})}a.fillStyle="blue",i(o,e,t,n),a.fillStyle="red",i(s,e,t,n)},ye.prototype.drawMetrics=function(e,t,r,i){var n;t=void 0!==t?t:0,r=void 0!==r?r:0,i=void 0!==i?i:24,n=1/this.path.unitsPerEm*i,e.lineWidth=1,e.strokeStyle="black",ge.line(e,t,-1e4,t,1e4),ge.line(e,-1e4,r,1e4,r);var o=this.xMin||0,a=this.yMin||0,s=this.xMax||0,h=this.yMax||0,l=this.advanceWidth||0;e.strokeStyle="blue",ge.line(e,t+o*n,-1e4,t+o*n,1e4),ge.line(e,t+s*n,-1e4,t+s*n,1e4),ge.line(e,-1e4,r+-a*n,1e4,r+-a*n),ge.line(e,-1e4,r+-h*n,1e4,r+-h*n),e.strokeStyle="green",ge.line(e,t+l*n,-1e4,t+l*n,1e4)},_e.prototype.get=function(e){return"function"==typeof this.glyphs[e]&&(this.glyphs[e]=this.glyphs[e]()),this.glyphs[e]},_e.prototype.push=function(e,t){this.glyphs[e]=t,this.length++};var xe={GlyphSet:_e,glyphLoader:function(e,t){return new ye({index:t,font:e})},ttfGlyphLoader:function(r,e,i,n,o,a){return function(){var t=new ye({index:e,font:r});return t.path=function(){i(t,n,o);var e=a(r.glyphs,t);return e.unitsPerEm=r.unitsPerEm,e},be(t,"xMin","_xMin"),be(t,"xMax","_xMax"),be(t,"yMin","_yMin"),be(t,"yMax","_yMax"),t}},cffGlyphLoader:function(r,e,i,n){return function(){var t=new ye({index:e,font:r});return t.path=function(){var e=i(r,t,n);return e.unitsPerEm=r.unitsPerEm,e},t}}};function we(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r+=1)if(!we(e[r],t[r]))return!1;return!0}return!1}function Se(e){return e.length<1240?107:e.length<33900?1131:32768}function Te(e,t,r){var i,n,o=[],a=[],s=se.getCard16(e,t);if(0!==s){var h=se.getByte(e,t+2);i=t+(s+1)*h+2;for(var l=t+3,u=0;u<s+1;u+=1)o.push(se.getOffset(e,l,h)),l+=h;n=i+o[s]}else n=t+2;for(var c=0;c<o.length-1;c+=1){var p=se.getBytes(e,i+o[c],i+o[c+1]);r&&(p=r(p)),a.push(p)}return{objects:a,startOffset:t,endOffset:n}}function Me(e,t){if(28===t)return e.parseByte()<<8|e.parseByte();if(29===t)return e.parseByte()<<24|e.parseByte()<<16|e.parseByte()<<8|e.parseByte();if(30===t)return function(e){for(var t="",r=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"];;){var i=e.parseByte(),n=i>>4,o=15&i;if(15===n)break;if(t+=r[n],15===o)break;t+=r[o]}return parseFloat(t)}(e);if(32<=t&&t<=246)return t-139;if(247<=t&&t<=250)return 256*(t-247)+e.parseByte()+108;if(251<=t&&t<=254)return 256*-(t-251)-e.parseByte()-108;throw new Error("Invalid b0 "+t)}function Ee(e,t,r){t=void 0!==t?t:0;var i=new se.Parser(e,t),n=[],o=[];for(r=void 0!==r?r:e.length;i.relativeOffset<r;){var a=i.parseByte();a<=21?(12===a&&(a=1200+i.parseByte()),n.push([a,o]),o=[]):o.push(Me(i,a))}return function(e){for(var t={},r=0;r<e.length;r+=1){var i=e[r][0],n=e[r][1],o=void 0;if(o=1===n.length?n[0]:n,t.hasOwnProperty(i)&&!isNaN(t[i]))throw new Error("Object "+t+" already has key "+i);t[i]=o}return t}(n)}function Ce(e,t){return t=t<=390?le[t]:e[t-391]}function Re(e,t,r){for(var i,n={},o=0;o<t.length;o+=1){var a=t[o];if(Array.isArray(a.type)){var s=[];s.length=a.type.length;for(var h=0;h<a.type.length;h++)void 0===(i=void 0!==e[a.op]?e[a.op][h]:void 0)&&(i=void 0!==a.value&&void 0!==a.value[h]?a.value[h]:null),"SID"===a.type[h]&&(i=Ce(r,i)),s[h]=i;n[a.name]=s}else void 0===(i=e[a.op])&&(i=void 0!==a.value?a.value:null),"SID"===a.type&&(i=Ce(r,i)),n[a.name]=i}return n}var Le=[{name:"version",op:0,type:"SID"},{name:"notice",op:1,type:"SID"},{name:"copyright",op:1200,type:"SID"},{name:"fullName",op:2,type:"SID"},{name:"familyName",op:3,type:"SID"},{name:"weight",op:4,type:"SID"},{name:"isFixedPitch",op:1201,type:"number",value:0},{name:"italicAngle",op:1202,type:"number",value:0},{name:"underlinePosition",op:1203,type:"number",value:-100},{name:"underlineThickness",op:1204,type:"number",value:50},{name:"paintType",op:1205,type:"number",value:0},{name:"charstringType",op:1206,type:"number",value:2},{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"uniqueId",op:13,type:"number"},{name:"fontBBox",op:5,type:["number","number","number","number"],value:[0,0,0,0]},{name:"strokeWidth",op:1208,type:"number",value:0},{name:"xuid",op:14,type:[],value:null},{name:"charset",op:15,type:"offset",value:0},{name:"encoding",op:16,type:"offset",value:0},{name:"charStrings",op:17,type:"offset",value:0},{name:"private",op:18,type:["number","offset"],value:[0,0]},{name:"ros",op:1230,type:["SID","SID","number"]},{name:"cidFontVersion",op:1231,type:"number",value:0},{name:"cidFontRevision",op:1232,type:"number",value:0},{name:"cidFontType",op:1233,type:"number",value:0},{name:"cidCount",op:1234,type:"number",value:8720},{name:"uidBase",op:1235,type:"number"},{name:"fdArray",op:1236,type:"offset"},{name:"fdSelect",op:1237,type:"offset"},{name:"fontName",op:1238,type:"SID"}],De=[{name:"subrs",op:19,type:"offset",value:0},{name:"defaultWidthX",op:20,type:"number",value:0},{name:"nominalWidthX",op:21,type:"number",value:0}];function Pe(e,t,r,i){return Re(Ee(e,t,r),De,i)}function Ie(e,t,r,i){for(var n,o,a=[],s=0;s<r.length;s+=1){var h=new DataView(new Uint8Array(r[s]).buffer),l=(o=i,Re(Ee(n=h,0,n.byteLength),Le,o));l._subrs=[],l._subrsBias=0;var u=l.private[0],c=l.private[1];if(0!==u&&0!==c){var p=Pe(e,c+t,u,i);if(l._defaultWidthX=p.defaultWidthX,l._nominalWidthX=p.nominalWidthX,0!==p.subrs){var d=Te(e,c+p.subrs+t);l._subrs=d.objects,l._subrsBias=Se(l._subrs)}l._privateDict=p}a.push(l)}return a}function ke(v,g,e){var y,b,_,x,w,S,t,T,M=new U,E=[],C=0,R=!1,L=!1,D=0,P=0;if(v.isCIDFont){var r=v.tables.cff.topDict._fdSelect[g.index],i=v.tables.cff.topDict._fdArray[r];w=i._subrs,S=i._subrsBias,t=i._defaultWidthX,T=i._nominalWidthX}else w=v.tables.cff.topDict._subrs,S=v.tables.cff.topDict._subrsBias,t=v.tables.cff.topDict._defaultWidthX,T=v.tables.cff.topDict._nominalWidthX;var I=t;function k(e,t){L&&M.closePath(),M.moveTo(e,t),L=!0}function A(){E.length%2!=0&&!R&&(I=E.shift()+T),C+=E.length>>1,E.length=0,R=!0}return function e(t){for(var r,i,n,o,a,s,h,l,u,c,p,d,f=0;f<t.length;){var m=t[f];switch(f+=1,m){case 1:case 3:A();break;case 4:1<E.length&&!R&&(I=E.shift()+T,R=!0),P+=E.pop(),k(D,P);break;case 5:for(;0<E.length;)D+=E.shift(),P+=E.shift(),M.lineTo(D,P);break;case 6:for(;0<E.length&&(D+=E.shift(),M.lineTo(D,P),0!==E.length);)P+=E.shift(),M.lineTo(D,P);break;case 7:for(;0<E.length&&(P+=E.shift(),M.lineTo(D,P),0!==E.length);)D+=E.shift(),M.lineTo(D,P);break;case 8:for(;0<E.length;)y=D+E.shift(),b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),D=_+E.shift(),P=x+E.shift(),M.curveTo(y,b,_,x,D,P);break;case 10:a=E.pop()+S,(s=w[a])&&e(s);break;case 11:return;case 12:switch(m=t[f],f+=1,m){case 35:y=D+E.shift(),b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),h=_+E.shift(),l=x+E.shift(),u=h+E.shift(),c=l+E.shift(),p=u+E.shift(),d=c+E.shift(),D=p+E.shift(),P=d+E.shift(),E.shift(),M.curveTo(y,b,_,x,h,l),M.curveTo(u,c,p,d,D,P);break;case 34:y=D+E.shift(),b=P,_=y+E.shift(),x=b+E.shift(),h=_+E.shift(),l=x,u=h+E.shift(),c=x,p=u+E.shift(),d=P,D=p+E.shift(),M.curveTo(y,b,_,x,h,l),M.curveTo(u,c,p,d,D,P);break;case 36:y=D+E.shift(),b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),h=_+E.shift(),l=x,u=h+E.shift(),c=x,p=u+E.shift(),d=c+E.shift(),D=p+E.shift(),M.curveTo(y,b,_,x,h,l),M.curveTo(u,c,p,d,D,P);break;case 37:y=D+E.shift(),b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),h=_+E.shift(),l=x+E.shift(),u=h+E.shift(),c=l+E.shift(),p=u+E.shift(),d=c+E.shift(),Math.abs(p-D)>Math.abs(d-P)?D=p+E.shift():P=d+E.shift(),M.curveTo(y,b,_,x,h,l),M.curveTo(u,c,p,d,D,P);break;default:console.log("Glyph "+g.index+": unknown operator 1200"+m),E.length=0}break;case 14:0<E.length&&!R&&(I=E.shift()+T,R=!0),L&&(M.closePath(),L=!1);break;case 18:A();break;case 19:case 20:A(),f+=C+7>>3;break;case 21:2<E.length&&!R&&(I=E.shift()+T,R=!0),P+=E.pop(),k(D+=E.pop(),P);break;case 22:1<E.length&&!R&&(I=E.shift()+T,R=!0),k(D+=E.pop(),P);break;case 23:A();break;case 24:for(;2<E.length;)y=D+E.shift(),b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),D=_+E.shift(),P=x+E.shift(),M.curveTo(y,b,_,x,D,P);D+=E.shift(),P+=E.shift(),M.lineTo(D,P);break;case 25:for(;6<E.length;)D+=E.shift(),P+=E.shift(),M.lineTo(D,P);y=D+E.shift(),b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),D=_+E.shift(),P=x+E.shift(),M.curveTo(y,b,_,x,D,P);break;case 26:for(E.length%2&&(D+=E.shift());0<E.length;)y=D,b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),D=_,P=x+E.shift(),M.curveTo(y,b,_,x,D,P);break;case 27:for(E.length%2&&(P+=E.shift());0<E.length;)y=D+E.shift(),b=P,_=y+E.shift(),x=b+E.shift(),D=_+E.shift(),P=x,M.curveTo(y,b,_,x,D,P);break;case 28:r=t[f],i=t[f+1],E.push((r<<24|i<<16)>>16),f+=2;break;case 29:a=E.pop()+v.gsubrsBias,(s=v.gsubrs[a])&&e(s);break;case 30:for(;0<E.length&&(y=D,b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),D=_+E.shift(),P=x+(1===E.length?E.shift():0),M.curveTo(y,b,_,x,D,P),0!==E.length);)y=D+E.shift(),b=P,_=y+E.shift(),x=b+E.shift(),P=x+E.shift(),D=_+(1===E.length?E.shift():0),M.curveTo(y,b,_,x,D,P);break;case 31:for(;0<E.length&&(y=D+E.shift(),b=P,_=y+E.shift(),x=b+E.shift(),P=x+E.shift(),D=_+(1===E.length?E.shift():0),M.curveTo(y,b,_,x,D,P),0!==E.length);)y=D,b=P+E.shift(),_=y+E.shift(),x=b+E.shift(),D=_+E.shift(),P=x+(1===E.length?E.shift():0),M.curveTo(y,b,_,x,D,P);break;default:m<32?console.log("Glyph "+g.index+": unknown operator "+m):m<247?E.push(m-139):m<251?(r=t[f],f+=1,E.push(256*(m-247)+r+108)):m<255?(r=t[f],f+=1,E.push(256*-(m-251)-r-108)):(r=t[f],i=t[f+1],n=t[f+2],o=t[f+3],f+=4,E.push((r<<24|i<<16|n<<8|o)/65536))}}}(e),g.advanceWidth=I,M}function Ae(e,t){var r,i=le.indexOf(e);return 0<=i&&(r=i),0<=(i=t.indexOf(e))?r=i+le.length:(r=le.length+t.length,t.push(e)),r}function Ue(e,t,r){for(var i={},n=0;n<e.length;n+=1){var o=e[n],a=t[o.name];void 0===a||we(a,o.value)||("SID"===o.type&&(a=Ae(a,r)),i[o.op]={name:o.name,type:o.type,value:a})}return i}function Oe(e,t){var r=new $.Record("Top DICT",[{name:"dict",type:"DICT",value:{}}]);return r.dict=Ue(Le,e,t),r}function Be(e){var t=new $.Record("Top DICT INDEX",[{name:"topDicts",type:"INDEX",value:[]}]);return t.topDicts=[{name:"topDict_0",type:"TABLE",value:e}],t}function Ne(e){var t=[],r=e.path;t.push({name:"width",type:"NUMBER",value:e.advanceWidth});for(var i=0,n=0,o=0;o<r.commands.length;o+=1){var a=void 0,s=void 0,h=r.commands[o];if("Q"===h.type){h={type:"C",x:h.x,y:h.y,x1:1/3*i+2/3*h.x1,y1:1/3*n+2/3*h.y1,x2:1/3*h.x+2/3*h.x1,y2:1/3*h.y+2/3*h.y1}}if("M"===h.type)a=Math.round(h.x-i),s=Math.round(h.y-n),t.push({name:"dx",type:"NUMBER",value:a}),t.push({name:"dy",type:"NUMBER",value:s}),t.push({name:"rmoveto",type:"OP",value:21}),i=Math.round(h.x),n=Math.round(h.y);else if("L"===h.type)a=Math.round(h.x-i),s=Math.round(h.y-n),t.push({name:"dx",type:"NUMBER",value:a}),t.push({name:"dy",type:"NUMBER",value:s}),t.push({name:"rlineto",type:"OP",value:5}),i=Math.round(h.x),n=Math.round(h.y);else if("C"===h.type){var l=Math.round(h.x1-i),u=Math.round(h.y1-n),c=Math.round(h.x2-h.x1),p=Math.round(h.y2-h.y1);a=Math.round(h.x-h.x2),s=Math.round(h.y-h.y2),t.push({name:"dx1",type:"NUMBER",value:l}),t.push({name:"dy1",type:"NUMBER",value:u}),t.push({name:"dx2",type:"NUMBER",value:c}),t.push({name:"dy2",type:"NUMBER",value:p}),t.push({name:"dx",type:"NUMBER",value:a}),t.push({name:"dy",type:"NUMBER",value:s}),t.push({name:"rrcurveto",type:"OP",value:8}),i=Math.round(h.x),n=Math.round(h.y)}}return t.push({name:"endchar",type:"OP",value:14}),t}var Ge={parse:function(e,t,r){r.tables.cff={};var i,n,o,a=Te(e,Te(e,(i=e,n=t,(o={}).formatMajor=se.getCard8(i,n),o.formatMinor=se.getCard8(i,n+1),o.size=se.getCard8(i,n+2),o.offsetSize=se.getCard8(i,n+3),o.startOffset=n,o.endOffset=n+4,o).endOffset,se.bytesToString).endOffset),s=Te(e,a.endOffset,se.bytesToString),h=Te(e,s.endOffset);r.gsubrs=h.objects,r.gsubrsBias=Se(r.gsubrs);var l=Ie(e,t,a.objects,s.objects);if(1!==l.length)throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = "+l.length);var u=l[0];if((r.tables.cff.topDict=u)._privateDict&&(r.defaultWidthX=u._privateDict.defaultWidthX,r.nominalWidthX=u._privateDict.nominalWidthX),void 0!==u.ros[0]&&void 0!==u.ros[1]&&(r.isCIDFont=!0),r.isCIDFont){var c=u.fdArray,p=u.fdSelect;if(0===c||0===p)throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");var d=Ie(e,t,Te(e,c+=t).objects,s.objects);u._fdArray=d,p+=t,u._fdSelect=function(e,t,r,i){var n,o=[],a=new se.Parser(e,t),s=a.parseCard8();if(0===s)for(var h=0;h<r;h++){if(i<=(n=a.parseCard8()))throw new Error("CFF table CID Font FDSelect has bad FD index value "+n+" (FD count "+i+")");o.push(n)}else{if(3!==s)throw new Error("CFF Table CID Font FDSelect table has unsupported format "+s);var l,u=a.parseCard16(),c=a.parseCard16();if(0!==c)throw new Error("CFF Table CID Font FDSelect format 3 range has bad initial GID "+c);for(var p=0;p<u;p++){if(n=a.parseCard8(),l=a.parseCard16(),i<=n)throw new Error("CFF table CID Font FDSelect has bad FD index value "+n+" (FD count "+i+")");if(r<l)throw new Error("CFF Table CID Font FDSelect format 3 range has bad GID "+l);for(;c<l;c++)o.push(n);c=l}if(l!==r)throw new Error("CFF Table CID Font FDSelect format 3 range has bad final GID "+l)}return o}(e,p,r.numGlyphs,d.length)}var f=t+u.private[1],m=Pe(e,f,u.private[0],s.objects);if(r.defaultWidthX=m.defaultWidthX,r.nominalWidthX=m.nominalWidthX,0!==m.subrs){var v=Te(e,f+m.subrs);r.subrs=v.objects,r.subrsBias=Se(r.subrs)}else r.subrs=[],r.subrsBias=0;var g=Te(e,t+u.charStrings);r.nGlyphs=g.objects.length;var y=function(e,t,r,i){var n,o,a=new se.Parser(e,t);r-=1;var s=[".notdef"],h=a.parseCard8();if(0===h)for(var l=0;l<r;l+=1)n=a.parseSID(),s.push(Ce(i,n));else if(1===h)for(;s.length<=r;){n=a.parseSID(),o=a.parseCard8();for(var u=0;u<=o;u+=1)s.push(Ce(i,n)),n+=1}else{if(2!==h)throw new Error("Unknown charset format "+h);for(;s.length<=r;){n=a.parseSID(),o=a.parseCard16();for(var c=0;c<=o;c+=1)s.push(Ce(i,n)),n+=1}}return s}(e,t+u.charset,r.nGlyphs,s.objects);0===u.encoding?r.cffEncoding=new me(ue,y):1===u.encoding?r.cffEncoding=new me(ce,y):r.cffEncoding=function(e,t,r){var i,n={},o=new se.Parser(e,t),a=o.parseCard8();if(0===a)for(var s=o.parseCard8(),h=0;h<s;h+=1)n[i=o.parseCard8()]=h;else{if(1!==a)throw new Error("Unknown encoding format "+a);var l=o.parseCard8();i=1;for(var u=0;u<l;u+=1)for(var c=o.parseCard8(),p=o.parseCard8(),d=c;d<=c+p;d+=1)n[d]=i,i+=1}return new me(n,r)}(e,t+u.encoding,y),r.encoding=r.encoding||r.cffEncoding,r.glyphs=new xe.GlyphSet(r);for(var b=0;b<r.nGlyphs;b+=1){var _=g.objects[b];r.glyphs.push(b,xe.cffGlyphLoader(r,b,ke,_))}},make:function(e,t){for(var r,i=new $.Table("CFF ",[{name:"header",type:"RECORD"},{name:"nameIndex",type:"RECORD"},{name:"topDictIndex",type:"RECORD"},{name:"stringIndex",type:"RECORD"},{name:"globalSubrIndex",type:"RECORD"},{name:"charsets",type:"RECORD"},{name:"charStringsIndex",type:"RECORD"},{name:"privateDict",type:"RECORD"}]),n=1/t.unitsPerEm,o={version:t.version,fullName:t.fullName,familyName:t.familyName,weight:t.weightName,fontBBox:t.fontBBox||[0,0,0,0],fontMatrix:[n,0,0,n,0,0],charset:999,encoding:0,charStrings:999,private:[0,999]},a=[],s=1;s<e.length;s+=1)r=e.get(s),a.push(r.name);var h=[];i.header=new $.Record("Header",[{name:"major",type:"Card8",value:1},{name:"minor",type:"Card8",value:0},{name:"hdrSize",type:"Card8",value:4},{name:"major",type:"Card8",value:1}]),i.nameIndex=function(e){var t=new $.Record("Name INDEX",[{name:"names",type:"INDEX",value:[]}]);t.names=[];for(var r=0;r<e.length;r+=1)t.names.push({name:"name_"+r,type:"NAME",value:e[r]});return t}([t.postScriptName]);var l,u,c,p=Oe(o,h);i.topDictIndex=Be(p),i.globalSubrIndex=new $.Record("Global Subr INDEX",[{name:"subrs",type:"INDEX",value:[]}]),i.charsets=function(e,t){for(var r=new $.Record("Charsets",[{name:"format",type:"Card8",value:0}]),i=0;i<e.length;i+=1){var n=Ae(e[i],t);r.fields.push({name:"glyph_"+i,type:"SID",value:n})}return r}(a,h),i.charStringsIndex=function(e){for(var t=new $.Record("CharStrings INDEX",[{name:"charStrings",type:"INDEX",value:[]}]),r=0;r<e.length;r+=1){var i=e.get(r),n=Ne(i);t.charStrings.push({name:i.name,type:"CHARSTRING",value:n})}return t}(e),i.privateDict=(l={},u=h,(c=new $.Record("Private DICT",[{name:"dict",type:"DICT",value:{}}])).dict=Ue(De,l,u),c),i.stringIndex=function(e){var t=new $.Record("String INDEX",[{name:"strings",type:"INDEX",value:[]}]);t.strings=[];for(var r=0;r<e.length;r+=1)t.strings.push({name:"string_"+r,type:"STRING",value:e[r]});return t}(h);var d=i.header.sizeOf()+i.nameIndex.sizeOf()+i.topDictIndex.sizeOf()+i.stringIndex.sizeOf()+i.globalSubrIndex.sizeOf();return o.charset=d,o.encoding=0,o.charStrings=o.charset+i.charsets.sizeOf(),o.private[1]=o.charStrings+i.charStringsIndex.sizeOf(),p=Oe(o,h),i.topDictIndex=Be(p),i}};var Fe={parse:function(e,t){var r={},i=new se.Parser(e,t);return r.version=i.parseVersion(),r.fontRevision=Math.round(1e3*i.parseFixed())/1e3,r.checkSumAdjustment=i.parseULong(),r.magicNumber=i.parseULong(),D.argument(1594834165===r.magicNumber,"Font header has wrong magic number."),r.flags=i.parseUShort(),r.unitsPerEm=i.parseUShort(),r.created=i.parseLongDateTime(),r.modified=i.parseLongDateTime(),r.xMin=i.parseShort(),r.yMin=i.parseShort(),r.xMax=i.parseShort(),r.yMax=i.parseShort(),r.macStyle=i.parseUShort(),r.lowestRecPPEM=i.parseUShort(),r.fontDirectionHint=i.parseShort(),r.indexToLocFormat=i.parseShort(),r.glyphDataFormat=i.parseShort(),r},make:function(e){var t=Math.round((new Date).getTime()/1e3)+2082844800,r=t;return e.createdTimestamp&&(r=e.createdTimestamp+2082844800),new $.Table("head",[{name:"version",type:"FIXED",value:65536},{name:"fontRevision",type:"FIXED",value:65536},{name:"checkSumAdjustment",type:"ULONG",value:0},{name:"magicNumber",type:"ULONG",value:1594834165},{name:"flags",type:"USHORT",value:0},{name:"unitsPerEm",type:"USHORT",value:1e3},{name:"created",type:"LONGDATETIME",value:r},{name:"modified",type:"LONGDATETIME",value:t},{name:"xMin",type:"SHORT",value:0},{name:"yMin",type:"SHORT",value:0},{name:"xMax",type:"SHORT",value:0},{name:"yMax",type:"SHORT",value:0},{name:"macStyle",type:"USHORT",value:0},{name:"lowestRecPPEM",type:"USHORT",value:0},{name:"fontDirectionHint",type:"SHORT",value:2},{name:"indexToLocFormat",type:"SHORT",value:0},{name:"glyphDataFormat",type:"SHORT",value:0}],e)}};var Ve={parse:function(e,t){var r={},i=new se.Parser(e,t);return r.version=i.parseVersion(),r.ascender=i.parseShort(),r.descender=i.parseShort(),r.lineGap=i.parseShort(),r.advanceWidthMax=i.parseUShort(),r.minLeftSideBearing=i.parseShort(),r.minRightSideBearing=i.parseShort(),r.xMaxExtent=i.parseShort(),r.caretSlopeRise=i.parseShort(),r.caretSlopeRun=i.parseShort(),r.caretOffset=i.parseShort(),i.relativeOffset+=8,r.metricDataFormat=i.parseShort(),r.numberOfHMetrics=i.parseUShort(),r},make:function(e){return new $.Table("hhea",[{name:"version",type:"FIXED",value:65536},{name:"ascender",type:"FWORD",value:0},{name:"descender",type:"FWORD",value:0},{name:"lineGap",type:"FWORD",value:0},{name:"advanceWidthMax",type:"UFWORD",value:0},{name:"minLeftSideBearing",type:"FWORD",value:0},{name:"minRightSideBearing",type:"FWORD",value:0},{name:"xMaxExtent",type:"FWORD",value:0},{name:"caretSlopeRise",type:"SHORT",value:1},{name:"caretSlopeRun",type:"SHORT",value:0},{name:"caretOffset",type:"SHORT",value:0},{name:"reserved1",type:"SHORT",value:0},{name:"reserved2",type:"SHORT",value:0},{name:"reserved3",type:"SHORT",value:0},{name:"reserved4",type:"SHORT",value:0},{name:"metricDataFormat",type:"SHORT",value:0},{name:"numberOfHMetrics",type:"USHORT",value:0}],e)}};var ze={parse:function(e,t,r,i,n){for(var o,a,s=new se.Parser(e,t),h=0;h<i;h+=1){h<r&&(o=s.parseUShort(),a=s.parseShort());var l=n.get(h);l.advanceWidth=o,l.leftSideBearing=a}},make:function(e){for(var t=new $.Table("hmtx",[]),r=0;r<e.length;r+=1){var i=e.get(r),n=i.advanceWidth||0,o=i.leftSideBearing||0;t.fields.push({name:"advanceWidth_"+r,type:"USHORT",value:n}),t.fields.push({name:"leftSideBearing_"+r,type:"SHORT",value:o})}return t}};var He={make:function(e){for(var t=new $.Table("ltag",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"numTags",type:"ULONG",value:e.length}]),r="",i=12+4*e.length,n=0;n<e.length;++n){var o=r.indexOf(e[n]);o<0&&(o=r.length,r+=e[n]),t.fields.push({name:"offset "+n,type:"USHORT",value:i+o}),t.fields.push({name:"length "+n,type:"USHORT",value:e[n].length})}return t.fields.push({name:"stringPool",type:"CHARARRAY",value:r}),t},parse:function(e,t){var r=new se.Parser(e,t),i=r.parseULong();D.argument(1===i,"Unsupported ltag table version."),r.skip("uLong",1);for(var n=r.parseULong(),o=[],a=0;a<n;a++){for(var s="",h=t+r.parseUShort(),l=r.parseUShort(),u=h;u<h+l;++u)s+=String.fromCharCode(e.getInt8(u));o.push(s)}return o}};var je={parse:function(e,t){var r={},i=new se.Parser(e,t);return r.version=i.parseVersion(),r.numGlyphs=i.parseUShort(),1===r.version&&(r.maxPoints=i.parseUShort(),r.maxContours=i.parseUShort(),r.maxCompositePoints=i.parseUShort(),r.maxCompositeContours=i.parseUShort(),r.maxZones=i.parseUShort(),r.maxTwilightPoints=i.parseUShort(),r.maxStorage=i.parseUShort(),r.maxFunctionDefs=i.parseUShort(),r.maxInstructionDefs=i.parseUShort(),r.maxStackElements=i.parseUShort(),r.maxSizeOfInstructions=i.parseUShort(),r.maxComponentElements=i.parseUShort(),r.maxComponentDepth=i.parseUShort()),r},make:function(e){return new $.Table("maxp",[{name:"version",type:"FIXED",value:20480},{name:"numGlyphs",type:"USHORT",value:e}])}},Xe=["copyright","fontFamily","fontSubfamily","uniqueID","fullName","version","postScriptName","trademark","manufacturer","designer","description","manufacturerURL","designerURL","license","licenseURL","reserved","preferredFamily","preferredSubfamily","compatibleFullName","sampleText","postScriptFindFontName","wwsFamily","wwsSubfamily"],We={0:"en",1:"fr",2:"de",3:"it",4:"nl",5:"sv",6:"es",7:"da",8:"pt",9:"no",10:"he",11:"ja",12:"ar",13:"fi",14:"el",15:"is",16:"mt",17:"tr",18:"hr",19:"zh-Hant",20:"ur",21:"hi",22:"th",23:"ko",24:"lt",25:"pl",26:"hu",27:"es",28:"lv",29:"se",30:"fo",31:"fa",32:"ru",33:"zh",34:"nl-BE",35:"ga",36:"sq",37:"ro",38:"cz",39:"sk",40:"si",41:"yi",42:"sr",43:"mk",44:"bg",45:"uk",46:"be",47:"uz",48:"kk",49:"az-Cyrl",50:"az-Arab",51:"hy",52:"ka",53:"mo",54:"ky",55:"tg",56:"tk",57:"mn-CN",58:"mn",59:"ps",60:"ks",61:"ku",62:"sd",63:"bo",64:"ne",65:"sa",66:"mr",67:"bn",68:"as",69:"gu",70:"pa",71:"or",72:"ml",73:"kn",74:"ta",75:"te",76:"si",77:"my",78:"km",79:"lo",80:"vi",81:"id",82:"tl",83:"ms",84:"ms-Arab",85:"am",86:"ti",87:"om",88:"so",89:"sw",90:"rw",91:"rn",92:"ny",93:"mg",94:"eo",128:"cy",129:"eu",130:"ca",131:"la",132:"qu",133:"gn",134:"ay",135:"tt",136:"ug",137:"dz",138:"jv",139:"su",140:"gl",141:"af",142:"br",143:"iu",144:"gd",145:"gv",146:"ga",147:"to",148:"el-polyton",149:"kl",150:"az",151:"nn"},qe={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:5,11:1,12:4,13:0,14:6,15:0,16:0,17:0,18:0,19:2,20:4,21:9,22:21,23:3,24:29,25:29,26:29,27:29,28:29,29:0,30:0,31:4,32:7,33:25,34:0,35:0,36:0,37:0,38:29,39:29,40:0,41:5,42:7,43:7,44:7,45:7,46:7,47:7,48:7,49:7,50:4,51:24,52:23,53:7,54:7,55:7,56:7,57:27,58:7,59:4,60:4,61:4,62:4,63:26,64:9,65:9,66:9,67:13,68:13,69:11,70:10,71:12,72:17,73:16,74:14,75:15,76:18,77:19,78:20,79:22,80:30,81:0,82:0,83:0,84:4,85:28,86:28,87:28,88:0,89:0,90:0,91:0,92:0,93:0,94:0,128:0,129:0,130:0,131:0,132:0,133:0,134:0,135:7,136:4,137:26,138:0,139:0,140:0,141:0,142:0,143:28,144:0,145:0,146:0,147:0,148:6,149:0,150:0,151:0},Ye={1078:"af",1052:"sq",1156:"gsw",1118:"am",5121:"ar-DZ",15361:"ar-BH",3073:"ar",2049:"ar-IQ",11265:"ar-JO",13313:"ar-KW",12289:"ar-LB",4097:"ar-LY",6145:"ary",8193:"ar-OM",16385:"ar-QA",1025:"ar-SA",10241:"ar-SY",7169:"aeb",14337:"ar-AE",9217:"ar-YE",1067:"hy",1101:"as",2092:"az-Cyrl",1068:"az",1133:"ba",1069:"eu",1059:"be",2117:"bn",1093:"bn-IN",8218:"bs-Cyrl",5146:"bs",1150:"br",1026:"bg",1027:"ca",3076:"zh-HK",5124:"zh-MO",2052:"zh",4100:"zh-SG",1028:"zh-TW",1155:"co",1050:"hr",4122:"hr-BA",1029:"cs",1030:"da",1164:"prs",1125:"dv",2067:"nl-BE",1043:"nl",3081:"en-AU",10249:"en-BZ",4105:"en-CA",9225:"en-029",16393:"en-IN",6153:"en-IE",8201:"en-JM",17417:"en-MY",5129:"en-NZ",13321:"en-PH",18441:"en-SG",7177:"en-ZA",11273:"en-TT",2057:"en-GB",1033:"en",12297:"en-ZW",1061:"et",1080:"fo",1124:"fil",1035:"fi",2060:"fr-BE",3084:"fr-CA",1036:"fr",5132:"fr-LU",6156:"fr-MC",4108:"fr-CH",1122:"fy",1110:"gl",1079:"ka",3079:"de-AT",1031:"de",5127:"de-LI",4103:"de-LU",2055:"de-CH",1032:"el",1135:"kl",1095:"gu",1128:"ha",1037:"he",1081:"hi",1038:"hu",1039:"is",1136:"ig",1057:"id",1117:"iu",2141:"iu-Latn",2108:"ga",1076:"xh",1077:"zu",1040:"it",2064:"it-CH",1041:"ja",1099:"kn",1087:"kk",1107:"km",1158:"quc",1159:"rw",1089:"sw",1111:"kok",1042:"ko",1088:"ky",1108:"lo",1062:"lv",1063:"lt",2094:"dsb",1134:"lb",1071:"mk",2110:"ms-BN",1086:"ms",1100:"ml",1082:"mt",1153:"mi",1146:"arn",1102:"mr",1148:"moh",1104:"mn",2128:"mn-CN",1121:"ne",1044:"nb",2068:"nn",1154:"oc",1096:"or",1123:"ps",1045:"pl",1046:"pt",2070:"pt-PT",1094:"pa",1131:"qu-BO",2155:"qu-EC",3179:"qu",1048:"ro",1047:"rm",1049:"ru",9275:"smn",4155:"smj-NO",5179:"smj",3131:"se-FI",1083:"se",2107:"se-SE",8251:"sms",6203:"sma-NO",7227:"sms",1103:"sa",7194:"sr-Cyrl-BA",3098:"sr",6170:"sr-Latn-BA",2074:"sr-Latn",1132:"nso",1074:"tn",1115:"si",1051:"sk",1060:"sl",11274:"es-AR",16394:"es-BO",13322:"es-CL",9226:"es-CO",5130:"es-CR",7178:"es-DO",12298:"es-EC",17418:"es-SV",4106:"es-GT",18442:"es-HN",2058:"es-MX",19466:"es-NI",6154:"es-PA",15370:"es-PY",10250:"es-PE",20490:"es-PR",3082:"es",1034:"es",21514:"es-US",14346:"es-UY",8202:"es-VE",2077:"sv-FI",1053:"sv",1114:"syr",1064:"tg",2143:"tzm",1097:"ta",1092:"tt",1098:"te",1054:"th",1105:"bo",1055:"tr",1090:"tk",1152:"ug",1058:"uk",1070:"hsb",1056:"ur",2115:"uz-Cyrl",1091:"uz",1066:"vi",1106:"cy",1160:"wo",1157:"sah",1144:"ii",1130:"yo"};function Ze(e,t,r){switch(e){case 0:if(65535===t)return"und";if(r)return r[t];break;case 1:return We[t];case 3:return Ye[t]}}var Qe="utf-16",Ke={0:"macintosh",1:"x-mac-japanese",2:"x-mac-chinesetrad",3:"x-mac-korean",6:"x-mac-greek",7:"x-mac-cyrillic",9:"x-mac-devanagai",10:"x-mac-gurmukhi",11:"x-mac-gujarati",12:"x-mac-oriya",13:"x-mac-bengali",14:"x-mac-tamil",15:"x-mac-telugu",16:"x-mac-kannada",17:"x-mac-malayalam",18:"x-mac-sinhalese",19:"x-mac-burmese",20:"x-mac-khmer",21:"x-mac-thai",22:"x-mac-lao",23:"x-mac-georgian",24:"x-mac-armenian",25:"x-mac-chinesesimp",26:"x-mac-tibetan",27:"x-mac-mongolian",28:"x-mac-ethiopic",29:"x-mac-ce",30:"x-mac-vietnamese",31:"x-mac-extarabic"},Je={15:"x-mac-icelandic",17:"x-mac-turkish",18:"x-mac-croatian",24:"x-mac-ce",25:"x-mac-ce",26:"x-mac-ce",27:"x-mac-ce",28:"x-mac-ce",30:"x-mac-icelandic",37:"x-mac-romanian",38:"x-mac-ce",39:"x-mac-ce",40:"x-mac-ce",143:"x-mac-inuit",146:"x-mac-gaelic"};function $e(e,t,r){switch(e){case 0:return Qe;case 1:return Je[r]||Ke[t];case 3:if(1===t||10===t)return Qe}}function et(e){var t={};for(var r in e)t[e[r]]=parseInt(r);return t}function tt(e,t,r,i,n,o){return new $.Record("NameRecord",[{name:"platformID",type:"USHORT",value:e},{name:"encodingID",type:"USHORT",value:t},{name:"languageID",type:"USHORT",value:r},{name:"nameID",type:"USHORT",value:i},{name:"length",type:"USHORT",value:n},{name:"offset",type:"USHORT",value:o}])}function rt(e,t){var r=function(e,t){var r=e.length,i=t.length-r+1;e:for(var n=0;n<i;n++)for(;n<i;n++){for(var o=0;o<r;o++)if(t[n+o]!==e[o])continue e;return n}return-1}(e,t);if(r<0){r=t.length;for(var i=0,n=e.length;i<n;++i)t.push(e[i])}return r}var it={parse:function(e,t,r){for(var i={},n=new se.Parser(e,t),o=n.parseUShort(),a=n.parseUShort(),s=n.offset+n.parseUShort(),h=0;h<a;h++){var l=n.parseUShort(),u=n.parseUShort(),c=n.parseUShort(),p=n.parseUShort(),d=Xe[p]||p,f=n.parseUShort(),m=n.parseUShort(),v=Ze(l,c,r),g=$e(l,u,c);if(void 0!==g&&void 0!==v){var y=void 0;if(y=g===Qe?I.UTF16(e,s+m,f):I.MACSTRING(e,s+m,f,g)){var b=i[d];void 0===b&&(b=i[d]={}),b[v]=y}}}return 1===o&&n.parseUShort(),i},make:function(e,t){var r,i=[],n={},o=et(Xe);for(var a in e){var s=o[a];if(void 0===s&&(s=a),r=parseInt(s),isNaN(r))throw new Error('Name table entry "'+a+'" does not exist, see nameTableNames for complete list.');n[r]=e[a],i.push(r)}for(var h=et(We),l=et(Ye),u=[],c=[],p=0;p<i.length;p++){var d=n[r=i[p]];for(var f in d){var m=d[f],v=1,g=h[f],y=qe[g],b=$e(v,y,g),_=k.MACSTRING(m,b);void 0===_&&(v=0,(g=t.indexOf(f))<0&&(g=t.length,t.push(f)),y=4,_=k.UTF16(m));var x=rt(_,c);u.push(tt(v,y,g,r,_.length,x));var w=l[f];if(void 0!==w){var S=k.UTF16(m),T=rt(S,c);u.push(tt(3,1,w,r,S.length,T))}}}u.sort(function(e,t){return e.platformID-t.platformID||e.encodingID-t.encodingID||e.languageID-t.languageID||e.nameID-t.nameID});for(var M=new $.Table("name",[{name:"format",type:"USHORT",value:0},{name:"count",type:"USHORT",value:u.length},{name:"stringOffset",type:"USHORT",value:6+12*u.length}]),E=0;E<u.length;E++)M.fields.push({name:"record_"+E,type:"RECORD",value:u[E]});return M.fields.push({name:"strings",type:"LITERAL",value:c}),M}},nt=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];var ot={parse:function(e,t){var r={},i=new se.Parser(e,t);r.version=i.parseUShort(),r.xAvgCharWidth=i.parseShort(),r.usWeightClass=i.parseUShort(),r.usWidthClass=i.parseUShort(),r.fsType=i.parseUShort(),r.ySubscriptXSize=i.parseShort(),r.ySubscriptYSize=i.parseShort(),r.ySubscriptXOffset=i.parseShort(),r.ySubscriptYOffset=i.parseShort(),r.ySuperscriptXSize=i.parseShort(),r.ySuperscriptYSize=i.parseShort(),r.ySuperscriptXOffset=i.parseShort(),r.ySuperscriptYOffset=i.parseShort(),r.yStrikeoutSize=i.parseShort(),r.yStrikeoutPosition=i.parseShort(),r.sFamilyClass=i.parseShort(),r.panose=[];for(var n=0;n<10;n++)r.panose[n]=i.parseByte();return r.ulUnicodeRange1=i.parseULong(),r.ulUnicodeRange2=i.parseULong(),r.ulUnicodeRange3=i.parseULong(),r.ulUnicodeRange4=i.parseULong(),r.achVendID=String.fromCharCode(i.parseByte(),i.parseByte(),i.parseByte(),i.parseByte()),r.fsSelection=i.parseUShort(),r.usFirstCharIndex=i.parseUShort(),r.usLastCharIndex=i.parseUShort(),r.sTypoAscender=i.parseShort(),r.sTypoDescender=i.parseShort(),r.sTypoLineGap=i.parseShort(),r.usWinAscent=i.parseUShort(),r.usWinDescent=i.parseUShort(),1<=r.version&&(r.ulCodePageRange1=i.parseULong(),r.ulCodePageRange2=i.parseULong()),2<=r.version&&(r.sxHeight=i.parseShort(),r.sCapHeight=i.parseShort(),r.usDefaultChar=i.parseUShort(),r.usBreakChar=i.parseUShort(),r.usMaxContent=i.parseUShort()),r},make:function(e){return new $.Table("OS/2",[{name:"version",type:"USHORT",value:3},{name:"xAvgCharWidth",type:"SHORT",value:0},{name:"usWeightClass",type:"USHORT",value:0},{name:"usWidthClass",type:"USHORT",value:0},{name:"fsType",type:"USHORT",value:0},{name:"ySubscriptXSize",type:"SHORT",value:650},{name:"ySubscriptYSize",type:"SHORT",value:699},{name:"ySubscriptXOffset",type:"SHORT",value:0},{name:"ySubscriptYOffset",type:"SHORT",value:140},{name:"ySuperscriptXSize",type:"SHORT",value:650},{name:"ySuperscriptYSize",type:"SHORT",value:699},{name:"ySuperscriptXOffset",type:"SHORT",value:0},{name:"ySuperscriptYOffset",type:"SHORT",value:479},{name:"yStrikeoutSize",type:"SHORT",value:49},{name:"yStrikeoutPosition",type:"SHORT",value:258},{name:"sFamilyClass",type:"SHORT",value:0},{name:"bFamilyType",type:"BYTE",value:0},{name:"bSerifStyle",type:"BYTE",value:0},{name:"bWeight",type:"BYTE",value:0},{name:"bProportion",type:"BYTE",value:0},{name:"bContrast",type:"BYTE",value:0},{name:"bStrokeVariation",type:"BYTE",value:0},{name:"bArmStyle",type:"BYTE",value:0},{name:"bLetterform",type:"BYTE",value:0},{name:"bMidline",type:"BYTE",value:0},{name:"bXHeight",type:"BYTE",value:0},{name:"ulUnicodeRange1",type:"ULONG",value:0},{name:"ulUnicodeRange2",type:"ULONG",value:0},{name:"ulUnicodeRange3",type:"ULONG",value:0},{name:"ulUnicodeRange4",type:"ULONG",value:0},{name:"achVendID",type:"CHARARRAY",value:"XXXX"},{name:"fsSelection",type:"USHORT",value:0},{name:"usFirstCharIndex",type:"USHORT",value:0},{name:"usLastCharIndex",type:"USHORT",value:0},{name:"sTypoAscender",type:"SHORT",value:0},{name:"sTypoDescender",type:"SHORT",value:0},{name:"sTypoLineGap",type:"SHORT",value:0},{name:"usWinAscent",type:"USHORT",value:0},{name:"usWinDescent",type:"USHORT",value:0},{name:"ulCodePageRange1",type:"ULONG",value:0},{name:"ulCodePageRange2",type:"ULONG",value:0},{name:"sxHeight",type:"SHORT",value:0},{name:"sCapHeight",type:"SHORT",value:0},{name:"usDefaultChar",type:"USHORT",value:0},{name:"usBreakChar",type:"USHORT",value:0},{name:"usMaxContext",type:"USHORT",value:0}],e)},unicodeRanges:nt,getUnicodeRange:function(e){for(var t=0;t<nt.length;t+=1){var r=nt[t];if(e>=r.begin&&e<r.end)return t}return-1}};var at={parse:function(e,t){var r={},i=new se.Parser(e,t);switch(r.version=i.parseVersion(),r.italicAngle=i.parseFixed(),r.underlinePosition=i.parseShort(),r.underlineThickness=i.parseShort(),r.isFixedPitch=i.parseULong(),r.minMemType42=i.parseULong(),r.maxMemType42=i.parseULong(),r.minMemType1=i.parseULong(),r.maxMemType1=i.parseULong(),r.version){case 1:r.names=pe.slice();break;case 2:r.numberOfGlyphs=i.parseUShort(),r.glyphNameIndex=new Array(r.numberOfGlyphs);for(var n=0;n<r.numberOfGlyphs;n++)r.glyphNameIndex[n]=i.parseUShort();r.names=[];for(var o=0;o<r.numberOfGlyphs;o++)if(r.glyphNameIndex[o]>=pe.length){var a=i.parseChar();r.names.push(i.parseString(a))}break;case 2.5:r.numberOfGlyphs=i.parseUShort(),r.offset=new Array(r.numberOfGlyphs);for(var s=0;s<r.numberOfGlyphs;s++)r.offset[s]=i.parseChar()}return r},make:function(){return new $.Table("post",[{name:"version",type:"FIXED",value:196608},{name:"italicAngle",type:"FIXED",value:0},{name:"underlinePosition",type:"FWORD",value:0},{name:"underlineThickness",type:"FWORD",value:0},{name:"isFixedPitch",type:"ULONG",value:0},{name:"minMemType42",type:"ULONG",value:0},{name:"maxMemType42",type:"ULONG",value:0},{name:"minMemType1",type:"ULONG",value:0},{name:"maxMemType1",type:"ULONG",value:0}])}},st=new Array(9);st[1]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();return 1===t?{substFormat:1,coverage:this.parsePointer(oe.coverage),deltaGlyphId:this.parseUShort()}:2===t?{substFormat:2,coverage:this.parsePointer(oe.coverage),substitute:this.parseOffset16List()}:void D.assert(!1,"0x"+e.toString(16)+": lookup type 1 format must be 1 or 2.")},st[2]=function(){var e=this.parseUShort();return D.argument(1===e,"GSUB Multiple Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(oe.coverage),sequences:this.parseListOfLists()}},st[3]=function(){var e=this.parseUShort();return D.argument(1===e,"GSUB Alternate Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(oe.coverage),alternateSets:this.parseListOfLists()}},st[4]=function(){var e=this.parseUShort();return D.argument(1===e,"GSUB ligature table identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(oe.coverage),ligatureSets:this.parseListOfLists(function(){return{ligGlyph:this.parseUShort(),components:this.parseUShortList(this.parseUShort()-1)}})}};var ht={sequenceIndex:oe.uShort,lookupListIndex:oe.uShort};st[5]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(1===t)return{substFormat:t,coverage:this.parsePointer(oe.coverage),ruleSets:this.parseListOfLists(function(){var e=this.parseUShort(),t=this.parseUShort();return{input:this.parseUShortList(e-1),lookupRecords:this.parseRecordList(t,ht)}})};if(2===t)return{substFormat:t,coverage:this.parsePointer(oe.coverage),classDef:this.parsePointer(oe.classDef),classSets:this.parseListOfLists(function(){var e=this.parseUShort(),t=this.parseUShort();return{classes:this.parseUShortList(e-1),lookupRecords:this.parseRecordList(t,ht)}})};if(3===t){var r=this.parseUShort(),i=this.parseUShort();return{substFormat:t,coverages:this.parseList(r,oe.pointer(oe.coverage)),lookupRecords:this.parseRecordList(i,ht)}}D.assert(!1,"0x"+e.toString(16)+": lookup type 5 format must be 1, 2 or 3.")},st[6]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();return 1===t?{substFormat:1,coverage:this.parsePointer(oe.coverage),chainRuleSets:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(ht)}})}:2===t?{substFormat:2,coverage:this.parsePointer(oe.coverage),backtrackClassDef:this.parsePointer(oe.classDef),inputClassDef:this.parsePointer(oe.classDef),lookaheadClassDef:this.parsePointer(oe.classDef),chainClassSet:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(ht)}})}:3===t?{substFormat:3,backtrackCoverage:this.parseList(oe.pointer(oe.coverage)),inputCoverage:this.parseList(oe.pointer(oe.coverage)),lookaheadCoverage:this.parseList(oe.pointer(oe.coverage)),lookupRecords:this.parseRecordList(ht)}:void D.assert(!1,"0x"+e.toString(16)+": lookup type 6 format must be 1, 2 or 3.")},st[7]=function(){var e=this.parseUShort();D.argument(1===e,"GSUB Extension Substitution subtable identifier-format must be 1");var t=this.parseUShort(),r=new oe(this.data,this.offset+this.parseULong());return{substFormat:1,lookupType:t,extension:st[t].call(r)}},st[8]=function(){var e=this.parseUShort();return D.argument(1===e,"GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(oe.coverage),backtrackCoverage:this.parseList(oe.pointer(oe.coverage)),lookaheadCoverage:this.parseList(oe.pointer(oe.coverage)),substitutes:this.parseUShortList()}};var lt=new Array(9);lt[1]=function(e){return 1===e.substFormat?new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new $.Coverage(e.coverage)},{name:"deltaGlyphID",type:"USHORT",value:e.deltaGlyphId}]):new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:2},{name:"coverage",type:"TABLE",value:new $.Coverage(e.coverage)}].concat($.ushortList("substitute",e.substitute)))},lt[3]=function(e){return D.assert(1===e.substFormat,"Lookup type 3 substFormat must be 1."),new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new $.Coverage(e.coverage)}].concat($.tableList("altSet",e.alternateSets,function(e){return new $.Table("alternateSetTable",$.ushortList("alternate",e))})))},lt[4]=function(e){return D.assert(1===e.substFormat,"Lookup type 4 substFormat must be 1."),new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new $.Coverage(e.coverage)}].concat($.tableList("ligSet",e.ligatureSets,function(e){return new $.Table("ligatureSetTable",$.tableList("ligature",e,function(e){return new $.Table("ligatureTable",[{name:"ligGlyph",type:"USHORT",value:e.ligGlyph}].concat($.ushortList("component",e.components,e.components.length+1)))}))})))};var ut={parse:function(e,t){var r=new oe(e,t=t||0),i=r.parseVersion(1);return D.argument(1===i||1.1===i,"Unsupported GSUB table version."),1===i?{version:i,scripts:r.parseScriptList(),features:r.parseFeatureList(),lookups:r.parseLookupList(st)}:{version:i,scripts:r.parseScriptList(),features:r.parseFeatureList(),lookups:r.parseLookupList(st),variations:r.parseFeatureVariationsList()}},make:function(e){return new $.Table("GSUB",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new $.ScriptList(e.scripts)},{name:"features",type:"TABLE",value:new $.FeatureList(e.features)},{name:"lookups",type:"TABLE",value:new $.LookupList(e.lookups,lt)}])}};var ct={parse:function(e,t){var r=new se.Parser(e,t),i=r.parseULong();D.argument(1===i,"Unsupported META table version."),r.parseULong(),r.parseULong();for(var n=r.parseULong(),o={},a=0;a<n;a++){var s=r.parseTag(),h=r.parseULong(),l=r.parseULong(),u=I.UTF8(e,t+h,l);o[s]=u}return o},make:function(e){var t=Object.keys(e).length,r="",i=16+12*t,n=new $.Table("meta",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"offset",type:"ULONG",value:i},{name:"numTags",type:"ULONG",value:t}]);for(var o in e){var a=r.length;r+=e[o],n.fields.push({name:"tag "+o,type:"TAG",value:o}),n.fields.push({name:"offset "+o,type:"ULONG",value:i+a}),n.fields.push({name:"length "+o,type:"ULONG",value:e[o].length})}return n.fields.push({name:"stringPool",type:"CHARARRAY",value:r}),n}};function pt(e){return Math.log(e)/Math.log(2)|0}function dt(e){for(;e.length%4!=0;)e.push(0);for(var t=0,r=0;r<e.length;r+=4)t+=(e[r]<<24)+(e[r+1]<<16)+(e[r+2]<<8)+e[r+3];return t%=Math.pow(2,32)}function ft(e,t,r,i){return new $.Record("Table Record",[{name:"tag",type:"TAG",value:void 0!==e?e:""},{name:"checkSum",type:"ULONG",value:void 0!==t?t:0},{name:"offset",type:"ULONG",value:void 0!==r?r:0},{name:"length",type:"ULONG",value:void 0!==i?i:0}])}function mt(e){var t=new $.Table("sfnt",[{name:"version",type:"TAG",value:"OTTO"},{name:"numTables",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);t.tables=e,t.numTables=e.length;var r=Math.pow(2,pt(t.numTables));t.searchRange=16*r,t.entrySelector=pt(r),t.rangeShift=16*t.numTables-t.searchRange;for(var i=[],n=[],o=t.sizeOf()+ft().sizeOf()*t.numTables;o%4!=0;)o+=1,n.push({name:"padding",type:"BYTE",value:0});for(var a=0;a<e.length;a+=1){var s=e[a];D.argument(4===s.tableName.length,"Table name"+s.tableName+" is invalid.");var h=s.sizeOf(),l=ft(s.tableName,dt(s.encode()),o,h);for(i.push({name:l.tag+" Table Record",type:"RECORD",value:l}),n.push({name:s.tableName+" table",type:"RECORD",value:s}),o+=h,D.argument(!isNaN(o),"Something went wrong calculating the offset.");o%4!=0;)o+=1,n.push({name:"padding",type:"BYTE",value:0})}return i.sort(function(e,t){return e.value.tag>t.value.tag?1:-1}),t.fields=t.fields.concat(i),t.fields=t.fields.concat(n),t}function vt(e,t,r){for(var i=0;i<t.length;i+=1){var n=e.charToGlyphIndex(t[i]);if(0<n)return e.glyphs.get(n).getMetrics()}return r}var gt={make:mt,fontToTable:function(e){for(var t,r=[],i=[],n=[],o=[],a=[],s=[],h=[],l=0,u=0,c=0,p=0,d=0,f=0;f<e.glyphs.length;f+=1){var m=e.glyphs.get(f),v=0|m.unicode;if(isNaN(m.advanceWidth))throw new Error("Glyph "+m.name+" ("+f+"): advanceWidth is not a number.");(v<t||void 0===t)&&0<v&&(t=v),l<v&&(l=v);var g=ot.getUnicodeRange(v);if(g<32)u|=1<<g;else if(g<64)c|=1<<g-32;else if(g<96)p|=1<<g-64;else{if(!(g<123))throw new Error("Unicode ranges bits > 123 are reserved for internal usage");d|=1<<g-96}if(".notdef"!==m.name){var y=m.getMetrics();r.push(y.xMin),i.push(y.yMin),n.push(y.xMax),o.push(y.yMax),s.push(y.leftSideBearing),h.push(y.rightSideBearing),a.push(m.advanceWidth)}}var b={xMin:Math.min.apply(null,r),yMin:Math.min.apply(null,i),xMax:Math.max.apply(null,n),yMax:Math.max.apply(null,o),advanceWidthMax:Math.max.apply(null,a),advanceWidthAvg:function(e){for(var t=0,r=0;r<e.length;r+=1)t+=e[r];return t/e.length}(a),minLeftSideBearing:Math.min.apply(null,s),maxLeftSideBearing:Math.max.apply(null,s),minRightSideBearing:Math.min.apply(null,h)};b.ascender=e.ascender,b.descender=e.descender;var _=Fe.make({flags:3,unitsPerEm:e.unitsPerEm,xMin:b.xMin,yMin:b.yMin,xMax:b.xMax,yMax:b.yMax,lowestRecPPEM:3,createdTimestamp:e.createdTimestamp}),x=Ve.make({ascender:b.ascender,descender:b.descender,advanceWidthMax:b.advanceWidthMax,minLeftSideBearing:b.minLeftSideBearing,minRightSideBearing:b.minRightSideBearing,xMaxExtent:b.maxLeftSideBearing+(b.xMax-b.xMin),numberOfHMetrics:e.glyphs.length}),w=je.make(e.glyphs.length),S=ot.make({xAvgCharWidth:Math.round(b.advanceWidthAvg),usWeightClass:e.tables.os2.usWeightClass,usWidthClass:e.tables.os2.usWidthClass,usFirstCharIndex:t,usLastCharIndex:l,ulUnicodeRange1:u,ulUnicodeRange2:c,ulUnicodeRange3:p,ulUnicodeRange4:d,fsSelection:e.tables.os2.fsSelection,sTypoAscender:b.ascender,sTypoDescender:b.descender,sTypoLineGap:0,usWinAscent:b.yMax,usWinDescent:Math.abs(b.yMin),ulCodePageRange1:1,sxHeight:vt(e,"xyvw",{yMax:Math.round(b.ascender/2)}).yMax,sCapHeight:vt(e,"HIKLEFJMNTZBDPRAGOQSUVWXY",b).yMax,usDefaultChar:e.hasChar(" ")?32:0,usBreakChar:e.hasChar(" ")?32:0}),T=ze.make(e.glyphs),M=he.make(e.glyphs),E=e.getEnglishName("fontFamily"),C=e.getEnglishName("fontSubfamily"),R=E+" "+C,L=e.getEnglishName("postScriptName");L||(L=E.replace(/\s/g,"")+"-"+C);var D={};for(var P in e.names)D[P]=e.names[P];D.uniqueID||(D.uniqueID={en:e.getEnglishName("manufacturer")+":"+R}),D.postScriptName||(D.postScriptName={en:L}),D.preferredFamily||(D.preferredFamily=e.names.fontFamily),D.preferredSubfamily||(D.preferredSubfamily=e.names.fontSubfamily);var I=[],k=it.make(D,I),A=0<I.length?He.make(I):void 0,U=at.make(),O=Ge.make(e.glyphs,{version:e.getEnglishName("version"),fullName:R,familyName:E,weightName:C,postScriptName:L,unitsPerEm:e.unitsPerEm,fontBBox:[0,b.yMin,b.ascender,b.advanceWidthMax]}),B=e.metas&&0<Object.keys(e.metas).length?ct.make(e.metas):void 0,N=[_,x,w,S,k,M,U,O,T];A&&N.push(A),e.tables.gsub&&N.push(ut.make(e.tables.gsub)),B&&N.push(B);for(var G=mt(N),F=dt(G.encode()),V=G.fields,z=!1,H=0;H<V.length;H+=1)if("head table"===V[H].name){V[H].value.checkSumAdjustment=2981146554-F,z=!0;break}if(!z)throw new Error("Could not find head table with checkSum to adjust.");return G},computeCheckSum:dt};function yt(e,t){for(var r=0,i=e.length-1;r<=i;){var n=r+i>>>1,o=e[n].tag;if(o===t)return n;o<t?r=n+1:i=n-1}return-r-1}function bt(e,t){for(var r=0,i=e.length-1;r<=i;){var n=r+i>>>1,o=e[n];if(o===t)return n;o<t?r=n+1:i=n-1}return-r-1}function _t(e,t){for(var r,i=0,n=e.length-1;i<=n;){var o=i+n>>>1,a=(r=e[o]).start;if(a===t)return r;a<t?i=o+1:n=o-1}if(0<i)return t>(r=e[i-1]).end?0:r}function xt(e,t){this.font=e,this.tableName=t}function wt(e){xt.call(this,e,"gpos")}function St(e){xt.call(this,e,"gsub")}function Tt(e,t){var r=e.length;if(r!==t.length)return!1;for(var i=0;i<r;i++)if(e[i]!==t[i])return!1;return!0}function Mt(e,t,r){for(var i=e.subtables,n=0;n<i.length;n++){var o=i[n];if(o.substFormat===t)return o}if(r)return i.push(r),r}function Et(e){for(var t=new ArrayBuffer(e.length),r=new Uint8Array(t),i=0;i<e.length;++i)r[i]=e[i];return t}function Ct(e,t){if(!e)throw t}function Rt(e,t,r,i,n){var o;return o=0<(t&i)?(o=e.parseByte(),0==(t&n)&&(o=-o),r+o):0<(t&n)?r:r+e.parseShort()}function Lt(e,t,r){var i,n,o=new se.Parser(t,r);if(e.numberOfContours=o.parseShort(),e._xMin=o.parseShort(),e._yMin=o.parseShort(),e._xMax=o.parseShort(),e._yMax=o.parseShort(),0<e.numberOfContours){for(var a=e.endPointIndices=[],s=0;s<e.numberOfContours;s+=1)a.push(o.parseUShort());e.instructionLength=o.parseUShort(),e.instructions=[];for(var h=0;h<e.instructionLength;h+=1)e.instructions.push(o.parseByte());var l=a[a.length-1]+1;i=[];for(var u=0;u<l;u+=1)if(n=o.parseByte(),i.push(n),0<(8&n))for(var c=o.parseByte(),p=0;p<c;p+=1)i.push(n),u+=1;if(D.argument(i.length===l,"Bad flags."),0<a.length){var d,f=[];if(0<l){for(var m=0;m<l;m+=1)n=i[m],(d={}).onCurve=!!(1&n),d.lastPointOfContour=0<=a.indexOf(m),f.push(d);for(var v=0,g=0;g<l;g+=1)n=i[g],(d=f[g]).x=Rt(o,n,v,2,16),v=d.x;for(var y=0,b=0;b<l;b+=1)n=i[b],(d=f[b]).y=Rt(o,n,y,4,32),y=d.y}e.points=f}else e.points=[]}else if(0===e.numberOfContours)e.points=[];else{e.isComposite=!0,e.points=[],e.components=[];for(var _=!0;_;){i=o.parseUShort();var x={glyphIndex:o.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};0<(1&i)?0<(2&i)?(x.dx=o.parseShort(),x.dy=o.parseShort()):x.matchedPoints=[o.parseUShort(),o.parseUShort()]:0<(2&i)?(x.dx=o.parseChar(),x.dy=o.parseChar()):x.matchedPoints=[o.parseByte(),o.parseByte()],0<(8&i)?x.xScale=x.yScale=o.parseF2Dot14():0<(64&i)?(x.xScale=o.parseF2Dot14(),x.yScale=o.parseF2Dot14()):0<(128&i)&&(x.xScale=o.parseF2Dot14(),x.scale01=o.parseF2Dot14(),x.scale10=o.parseF2Dot14(),x.yScale=o.parseF2Dot14()),e.components.push(x),_=!!(32&i)}if(256&i){e.instructionLength=o.parseUShort(),e.instructions=[];for(var w=0;w<e.instructionLength;w+=1)e.instructions.push(o.parseByte())}}}function Dt(e,t){for(var r=[],i=0;i<e.length;i+=1){var n=e[i],o={x:t.xScale*n.x+t.scale01*n.y+t.dx,y:t.scale10*n.x+t.yScale*n.y+t.dy,onCurve:n.onCurve,lastPointOfContour:n.lastPointOfContour};r.push(o)}return r}function Pt(e){var t=new U;if(!e)return t;for(var r=function(e){for(var t=[],r=[],i=0;i<e.length;i+=1){var n=e[i];r.push(n),n.lastPointOfContour&&(t.push(r),r=[])}return D.argument(0===r.length,"There are still points left in the current contour."),t}(e),i=0;i<r.length;++i){var n=r[i],o=null,a=n[n.length-1],s=n[0];if(a.onCurve)t.moveTo(a.x,a.y);else if(s.onCurve)t.moveTo(s.x,s.y);else{var h={x:.5*(a.x+s.x),y:.5*(a.y+s.y)};t.moveTo(h.x,h.y)}for(var l=0;l<n.length;++l)if(o=a,a=s,s=n[(l+1)%n.length],a.onCurve)t.lineTo(a.x,a.y);else{var u=s;o.onCurve||{x:.5*(a.x+o.x),y:.5*(a.y+o.y)},s.onCurve||(u={x:.5*(a.x+s.x),y:.5*(a.y+s.y)}),t.quadraticCurveTo(a.x,a.y,u.x,u.y)}t.closePath()}return t}function It(e,t){if(t.isComposite)for(var r=0;r<t.components.length;r+=1){var i=t.components[r],n=e.get(i.glyphIndex);if(n.getPath(),n.points){var o=void 0;if(void 0===i.matchedPoints)o=Dt(n.points,i);else{if(i.matchedPoints[0]>t.points.length-1||i.matchedPoints[1]>n.points.length-1)throw Error("Matched points out of range in "+t.name);var a=t.points[i.matchedPoints[0]],s=n.points[i.matchedPoints[1]],h={xScale:i.xScale,scale01:i.scale01,scale10:i.scale10,yScale:i.yScale,dx:0,dy:0};s=Dt([s],h)[0],h.dx=a.x-s.x,h.dy=a.y-s.y,o=Dt(n.points,h)}t.points=t.points.concat(o)}}return Pt(t.points)}(wt.prototype=xt.prototype={searchTag:yt,binSearch:bt,getTable:function(e){var t=this.font.tables[this.tableName];return!t&&e&&(t=this.font.tables[this.tableName]=this.createDefaultTable()),t},getScriptNames:function(){var e=this.getTable();return e?e.scripts.map(function(e){return e.tag}):[]},getDefaultScriptName:function(){var e=this.getTable();if(e){for(var t=!1,r=0;r<e.scripts.length;r++){var i=e.scripts[r].tag;if("DFLT"===i)return i;"latn"===i&&(t=!0)}return t?"latn":void 0}},getScriptTable:function(e,t){var r=this.getTable(t);if(r){e=e||"DFLT";var i=r.scripts,n=yt(r.scripts,e);if(0<=n)return i[n].script;if(t){var o={tag:e,script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}};return i.splice(-1-n,0,o),o.script}}},getLangSysTable:function(e,t,r){var i=this.getScriptTable(e,r);if(i){if(!t||"dflt"===t||"DFLT"===t)return i.defaultLangSys;var n=yt(i.langSysRecords,t);if(0<=n)return i.langSysRecords[n].langSys;if(r){var o={tag:t,langSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]}};return i.langSysRecords.splice(-1-n,0,o),o.langSys}}},getFeatureTable:function(e,t,r,i){var n=this.getLangSysTable(e,t,i);if(n){for(var o,a=n.featureIndexes,s=this.font.tables[this.tableName].features,h=0;h<a.length;h++)if((o=s[a[h]]).tag===r)return o.feature;if(i){var l=s.length;return D.assert(0===l||r>=s[l-1].tag,"Features must be added in alphabetical order."),o={tag:r,feature:{params:0,lookupListIndexes:[]}},s.push(o),a.push(l),o.feature}}},getLookupTables:function(e,t,r,i,n){var o=this.getFeatureTable(e,t,r,n),a=[];if(o){for(var s,h=o.lookupListIndexes,l=this.font.tables[this.tableName].lookups,u=0;u<h.length;u++)(s=l[h[u]]).lookupType===i&&a.push(s);if(0===a.length&&n){s={lookupType:i,lookupFlag:0,subtables:[],markFilteringSet:void 0};var c=l.length;return l.push(s),h.push(c),[s]}}return a},getGlyphClass:function(e,t){switch(e.format){case 1:return e.startGlyph<=t&&t<e.startGlyph+e.classes.length?e.classes[t-e.startGlyph]:0;case 2:var r=_t(e.ranges,t);return r?r.classId:0}},getCoverageIndex:function(e,t){switch(e.format){case 1:var r=bt(e.glyphs,t);return 0<=r?r:-1;case 2:var i=_t(e.ranges,t);return i?i.index+t-i.start:-1}},expandCoverage:function(e){if(1===e.format)return e.glyphs;for(var t=[],r=e.ranges,i=0;i<r.length;i++)for(var n=r[i],o=n.start,a=n.end,s=o;s<=a;s++)t.push(s);return t}}).init=function(){var e=this.getDefaultScriptName();this.defaultKerningTables=this.getKerningTables(e)},wt.prototype.getKerningValue=function(e,t,r){for(var i=0;i<e.length;i++)for(var n=e[i].subtables,o=0;o<n.length;o++){var a=n[o],s=this.getCoverageIndex(a.coverage,t);if(!(s<0))switch(a.posFormat){case 1:for(var h=a.pairSets[s],l=0;l<h.length;l++){var u=h[l];if(u.secondGlyph===r)return u.value1&&u.value1.xAdvance||0}break;case 2:var c=this.getGlyphClass(a.classDef1,t),p=this.getGlyphClass(a.classDef2,r),d=a.classRecords[c][p];return d.value1&&d.value1.xAdvance||0}}return 0},wt.prototype.getKerningTables=function(e,t){if(this.font.tables.gpos)return this.getLookupTables(e,t,"kern",2)},(St.prototype=xt.prototype).createDefaultTable=function(){return{version:1,scripts:[{tag:"DFLT",script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}}],features:[],lookups:[]}},St.prototype.getSingle=function(e,t,r){for(var i=[],n=this.getLookupTables(t,r,e,1),o=0;o<n.length;o++)for(var a=n[o].subtables,s=0;s<a.length;s++){var h=a[s],l=this.expandCoverage(h.coverage),u=void 0;if(1===h.substFormat){var c=h.deltaGlyphId;for(u=0;u<l.length;u++){var p=l[u];i.push({sub:p,by:p+c})}}else{var d=h.substitute;for(u=0;u<l.length;u++)i.push({sub:l[u],by:d[u]})}}return i},St.prototype.getAlternates=function(e,t,r){for(var i=[],n=this.getLookupTables(t,r,e,3),o=0;o<n.length;o++)for(var a=n[o].subtables,s=0;s<a.length;s++)for(var h=a[s],l=this.expandCoverage(h.coverage),u=h.alternateSets,c=0;c<l.length;c++)i.push({sub:l[c],by:u[c]});return i},St.prototype.getLigatures=function(e,t,r){for(var i=[],n=this.getLookupTables(t,r,e,4),o=0;o<n.length;o++)for(var a=n[o].subtables,s=0;s<a.length;s++)for(var h=a[s],l=this.expandCoverage(h.coverage),u=h.ligatureSets,c=0;c<l.length;c++)for(var p=l[c],d=u[c],f=0;f<d.length;f++){var m=d[f];i.push({sub:[p].concat(m.components),by:m.ligGlyph})}return i},St.prototype.addSingle=function(e,t,r,i){var n=Mt(this.getLookupTables(r,i,e,1,!0)[0],2,{substFormat:2,coverage:{format:1,glyphs:[]},substitute:[]});D.assert(1===n.coverage.format,"Ligature: unable to modify coverage table format "+n.coverage.format);var o=t.sub,a=this.binSearch(n.coverage.glyphs,o);a<0&&(a=-1-a,n.coverage.glyphs.splice(a,0,o),n.substitute.splice(a,0,0)),n.substitute[a]=t.by},St.prototype.addAlternate=function(e,t,r,i){var n=Mt(this.getLookupTables(r,i,e,3,!0)[0],1,{substFormat:1,coverage:{format:1,glyphs:[]},alternateSets:[]});D.assert(1===n.coverage.format,"Ligature: unable to modify coverage table format "+n.coverage.format);var o=t.sub,a=this.binSearch(n.coverage.glyphs,o);a<0&&(a=-1-a,n.coverage.glyphs.splice(a,0,o),n.alternateSets.splice(a,0,0)),n.alternateSets[a]=t.by},St.prototype.addLigature=function(e,t,r,i){var n=this.getLookupTables(r,i,e,4,!0)[0],o=n.subtables[0];o||(o={substFormat:1,coverage:{format:1,glyphs:[]},ligatureSets:[]},n.subtables[0]=o),D.assert(1===o.coverage.format,"Ligature: unable to modify coverage table format "+o.coverage.format);var a=t.sub[0],s=t.sub.slice(1),h={ligGlyph:t.by,components:s},l=this.binSearch(o.coverage.glyphs,a);if(0<=l){for(var u=o.ligatureSets[l],c=0;c<u.length;c++)if(Tt(u[c].components,s))return;u.push(h)}else l=-1-l,o.coverage.glyphs.splice(l,0,a),o.ligatureSets.splice(l,0,[h])},St.prototype.getFeature=function(e,t,r){if(/ss\d\d/.test(e))return this.getSingle(e,t,r);switch(e){case"aalt":case"salt":return this.getSingle(e,t,r).concat(this.getAlternates(e,t,r));case"dlig":case"liga":case"rlig":return this.getLigatures(e,t,r)}},St.prototype.add=function(e,t,r,i){if(/ss\d\d/.test(e))return this.addSingle(e,t,r,i);switch(e){case"aalt":case"salt":return"number"==typeof t.by?this.addSingle(e,t,r,i):this.addAlternate(e,t,r,i);case"dlig":case"liga":case"rlig":return this.addLigature(e,t,r,i)}};var kt,At,Ut,Ot,Bt={getPath:Pt,parse:function(e,t,r,i){for(var n=new xe.GlyphSet(i),o=0;o<r.length-1;o+=1){var a=r[o];a!==r[o+1]?n.push(o,xe.ttfGlyphLoader(i,o,Lt,e,t+a,It)):n.push(o,xe.glyphLoader(i,o))}return n}};function Nt(e){this.font=e,this.getCommands=function(e){return Bt.getPath(e).commands},this._fpgmState=this._prepState=void 0,this._errorState=0}function Gt(e){return e}function Ft(e){return Math.sign(e)*Math.round(Math.abs(e))}function Vt(e){return Math.sign(e)*Math.round(Math.abs(2*e))/2}function zt(e){return Math.sign(e)*(Math.round(Math.abs(e)+.5)-.5)}function Ht(e){return Math.sign(e)*Math.ceil(Math.abs(e))}function jt(e){return Math.sign(e)*Math.floor(Math.abs(e))}var Xt=function(e){var t=this.srPeriod,r=this.srPhase,i=1;return e<0&&(e=-e,i=-1),e+=this.srThreshold-r,e=Math.trunc(e/t)*t,(e+=r)<0?r*i:e*i},Wt={x:1,y:0,axis:"x",distance:function(e,t,r,i){return(r?e.xo:e.x)-(i?t.xo:t.x)},interpolate:function(e,t,r,i){var n,o,a,s,h,l,u;if(!i||i===this)return n=e.xo-t.xo,o=e.xo-r.xo,h=t.x-t.xo,l=r.x-r.xo,0===(u=(a=Math.abs(n))+(s=Math.abs(o)))?void(e.x=e.xo+(h+l)/2):void(e.x=e.xo+(h*s+l*a)/u);n=i.distance(e,t,!0,!0),o=i.distance(e,r,!0,!0),h=i.distance(t,t,!1,!0),l=i.distance(r,r,!1,!0),0!==(u=(a=Math.abs(n))+(s=Math.abs(o)))?Wt.setRelative(e,e,(h*s+l*a)/u,i,!0):Wt.setRelative(e,e,(h+l)/2,i,!0)},normalSlope:Number.NEGATIVE_INFINITY,setRelative:function(e,t,r,i,n){if(i&&i!==this){var o=n?t.xo:t.x,a=n?t.yo:t.y,s=o+r*i.x,h=a+r*i.y;e.x=s+(e.y-h)/i.normalSlope}else e.x=(n?t.xo:t.x)+r},slope:0,touch:function(e){e.xTouched=!0},touched:function(e){return e.xTouched},untouch:function(e){e.xTouched=!1}},qt={x:0,y:1,axis:"y",distance:function(e,t,r,i){return(r?e.yo:e.y)-(i?t.yo:t.y)},interpolate:function(e,t,r,i){var n,o,a,s,h,l,u;if(!i||i===this)return n=e.yo-t.yo,o=e.yo-r.yo,h=t.y-t.yo,l=r.y-r.yo,0===(u=(a=Math.abs(n))+(s=Math.abs(o)))?void(e.y=e.yo+(h+l)/2):void(e.y=e.yo+(h*s+l*a)/u);n=i.distance(e,t,!0,!0),o=i.distance(e,r,!0,!0),h=i.distance(t,t,!1,!0),l=i.distance(r,r,!1,!0),0!==(u=(a=Math.abs(n))+(s=Math.abs(o)))?qt.setRelative(e,e,(h*s+l*a)/u,i,!0):qt.setRelative(e,e,(h+l)/2,i,!0)},normalSlope:0,setRelative:function(e,t,r,i,n){if(i&&i!==this){var o=n?t.xo:t.x,a=n?t.yo:t.y,s=o+r*i.x,h=a+r*i.y;e.y=h+i.normalSlope*(e.x-s)}else e.y=(n?t.yo:t.y)+r},slope:Number.POSITIVE_INFINITY,touch:function(e){e.yTouched=!0},touched:function(e){return e.yTouched},untouch:function(e){e.yTouched=!1}};function Yt(e,t){this.x=e,this.y=t,this.axis=void 0,this.slope=t/e,this.normalSlope=-e/t,Object.freeze(this)}function Zt(e,t){var r=Math.sqrt(e*e+t*t);return t/=r,1===(e/=r)&&0===t?Wt:0===e&&1===t?qt:new Yt(e,t)}function Qt(e,t,r,i){this.x=this.xo=Math.round(64*e)/64,this.y=this.yo=Math.round(64*t)/64,this.lastPointOfContour=r,this.onCurve=i,this.prevPointOnContour=void 0,this.nextPointOnContour=void 0,this.xTouched=!1,this.yTouched=!1,Object.preventExtensions(this)}Object.freeze(Wt),Object.freeze(qt),Yt.prototype.distance=function(e,t,r,i){return this.x*Wt.distance(e,t,r,i)+this.y*qt.distance(e,t,r,i)},Yt.prototype.interpolate=function(e,t,r,i){var n,o,a,s,h,l,u;a=i.distance(e,t,!0,!0),s=i.distance(e,r,!0,!0),n=i.distance(t,t,!1,!0),o=i.distance(r,r,!1,!0),0!==(u=(h=Math.abs(a))+(l=Math.abs(s)))?this.setRelative(e,e,(n*l+o*h)/u,i,!0):this.setRelative(e,e,(n+o)/2,i,!0)},Yt.prototype.setRelative=function(e,t,r,i,n){i=i||this;var o=n?t.xo:t.x,a=n?t.yo:t.y,s=o+r*i.x,h=a+r*i.y,l=i.normalSlope,u=this.slope,c=e.x,p=e.y;e.x=(u*c-l*s+h-p)/(u-l),e.y=u*(e.x-c)+p},Yt.prototype.touch=function(e){e.xTouched=!0,e.yTouched=!0},Qt.prototype.nextTouched=function(e){for(var t=this.nextPointOnContour;!e.touched(t)&&t!==this;)t=t.nextPointOnContour;return t},Qt.prototype.prevTouched=function(e){for(var t=this.prevPointOnContour;!e.touched(t)&&t!==this;)t=t.prevPointOnContour;return t};var Kt=Object.freeze(new Qt(0,0)),Jt={cvCutIn:17/16,deltaBase:9,deltaShift:.125,loop:1,minDis:1,autoFlip:!0};function $t(e,t){switch(this.env=e,this.stack=[],this.prog=t,e){case"glyf":this.zp0=this.zp1=this.zp2=1,this.rp0=this.rp1=this.rp2=0;case"prep":this.fv=this.pv=this.dpv=Wt,this.round=Ft}}function er(e){for(var t=e.tZone=new Array(e.gZone.length),r=0;r<t.length;r++)t[r]=new Qt(0,0)}function tr(e,t){var r,i=e.prog,n=e.ip,o=1;do{if(88===(r=i[++n]))o++;else if(89===r)o--;else if(64===r)n+=i[n+1]+1;else if(65===r)n+=2*i[n+1]+1;else if(176<=r&&r<=183)n+=r-176+1;else if(184<=r&&r<=191)n+=2*(r-184+1);else if(t&&1===o&&27===r)break}while(0<o);e.ip=n}function rr(e,t){M.DEBUG&&console.log(t.step,"SVTCA["+e.axis+"]"),t.fv=t.pv=t.dpv=e}function ir(e,t){M.DEBUG&&console.log(t.step,"SPVTCA["+e.axis+"]"),t.pv=t.dpv=e}function nr(e,t){M.DEBUG&&console.log(t.step,"SFVTCA["+e.axis+"]"),t.fv=e}function or(e,t){var r,i,n=t.stack,o=n.pop(),a=n.pop(),s=t.z2[o],h=t.z1[a];M.DEBUG&&console.log("SPVTL["+e+"]",o,a),i=e?(r=s.y-h.y,h.x-s.x):(r=h.x-s.x,h.y-s.y),t.pv=t.dpv=Zt(r,i)}function ar(e,t){var r,i,n=t.stack,o=n.pop(),a=n.pop(),s=t.z2[o],h=t.z1[a];M.DEBUG&&console.log("SFVTL["+e+"]",o,a),i=e?(r=s.y-h.y,h.x-s.x):(r=h.x-s.x,h.y-s.y),t.fv=Zt(r,i)}function sr(e){M.DEBUG&&console.log(e.step,"POP[]"),e.stack.pop()}function hr(e,t){var r=t.stack.pop(),i=t.z0[r],n=t.fv,o=t.pv;M.DEBUG&&console.log(t.step,"MDAP["+e+"]",r);var a=o.distance(i,Kt);e&&(a=t.round(a)),n.setRelative(i,Kt,a,o),n.touch(i),t.rp0=t.rp1=r}function lr(e,t){var r,i,n,o=t.z2,a=o.length-2;M.DEBUG&&console.log(t.step,"IUP["+e.axis+"]");for(var s=0;s<a;s++)r=o[s],e.touched(r)||(i=r.prevTouched(e))!==r&&(i===(n=r.nextTouched(e))&&e.setRelative(r,r,e.distance(i,i,!1,!0),e,!0),e.interpolate(r,i,n,e))}function ur(e,t){for(var r=t.stack,i=e?t.rp1:t.rp2,n=(e?t.z0:t.z1)[i],o=t.fv,a=t.pv,s=t.loop,h=t.z2;s--;){var l=r.pop(),u=h[l],c=a.distance(n,n,!1,!0);o.setRelative(u,u,c,a),o.touch(u),M.DEBUG&&console.log(t.step,(1<t.loop?"loop "+(t.loop-s)+": ":"")+"SHP["+(e?"rp1":"rp2")+"]",l)}t.loop=1}function cr(e,t){var r=t.stack,i=e?t.rp1:t.rp2,n=(e?t.z0:t.z1)[i],o=t.fv,a=t.pv,s=r.pop(),h=t.z2[t.contours[s]],l=h;M.DEBUG&&console.log(t.step,"SHC["+e+"]",s);for(var u=a.distance(n,n,!1,!0);l!==n&&o.setRelative(l,l,u,a),(l=l.nextPointOnContour)!==h;);}function pr(e,t){var r,i,n=t.stack,o=e?t.rp1:t.rp2,a=(e?t.z0:t.z1)[o],s=t.fv,h=t.pv,l=n.pop();switch(M.DEBUG&&console.log(t.step,"SHZ["+e+"]",l),l){case 0:r=t.tZone;break;case 1:r=t.gZone;break;default:throw new Error("Invalid zone")}for(var u=h.distance(a,a,!1,!0),c=r.length-2,p=0;p<c;p++)i=r[p],s.setRelative(i,i,u,h)}function dr(e,t){var r=t.stack,i=r.pop()/64,n=r.pop(),o=t.z1[n],a=t.z0[t.rp0],s=t.fv,h=t.pv;s.setRelative(o,a,i,h),s.touch(o),M.DEBUG&&console.log(t.step,"MSIRP["+e+"]",i,n),t.rp1=t.rp0,t.rp2=n,e&&(t.rp0=n)}function fr(e,t){var r=t.stack,i=r.pop(),n=r.pop(),o=t.z0[n],a=t.fv,s=t.pv,h=t.cvt[i];M.DEBUG&&console.log(t.step,"MIAP["+e+"]",i,"(",h,")",n);var l=s.distance(o,Kt);e&&(Math.abs(l-h)<t.cvCutIn&&(l=h),l=t.round(l)),a.setRelative(o,Kt,l,s),0===t.zp0&&(o.xo=o.x,o.yo=o.y),a.touch(o),t.rp0=t.rp1=n}function mr(e,t){var r=t.stack,i=r.pop(),n=t.z2[i];M.DEBUG&&console.log(t.step,"GC["+e+"]",i),r.push(64*t.dpv.distance(n,Kt,e,!1))}function vr(e,t){var r=t.stack,i=r.pop(),n=r.pop(),o=t.z1[i],a=t.z0[n],s=t.dpv.distance(a,o,e,e);M.DEBUG&&console.log(t.step,"MD["+e+"]",i,n,"->",s),t.stack.push(Math.round(64*s))}function gr(e,t){var r=t.stack,i=r.pop(),n=t.fv,o=t.pv,a=t.ppem,s=t.deltaBase+16*(e-1),h=t.deltaShift,l=t.z0;M.DEBUG&&console.log(t.step,"DELTAP["+e+"]",i,r);for(var u=0;u<i;u++){var c=r.pop(),p=r.pop();if(s+((240&p)>>4)===a){var d=(15&p)-8;0<=d&&d++,M.DEBUG&&console.log(t.step,"DELTAPFIX",c,"by",d*h);var f=l[c];n.setRelative(f,f,d*h,o)}}}function yr(e,t){var r=t.stack,i=r.pop();M.DEBUG&&console.log(t.step,"ROUND[]"),r.push(64*t.round(i/64))}function br(e,t){var r=t.stack,i=r.pop(),n=t.ppem,o=t.deltaBase+16*(e-1),a=t.deltaShift;M.DEBUG&&console.log(t.step,"DELTAC["+e+"]",i,r);for(var s=0;s<i;s++){var h=r.pop(),l=r.pop();if(o+((240&l)>>4)===n){var u=(15&l)-8;0<=u&&u++;var c=u*a;M.DEBUG&&console.log(t.step,"DELTACFIX",h,"by",c),t.cvt[h]+=c}}}function _r(e,t){var r,i,n=t.stack,o=n.pop(),a=n.pop(),s=t.z2[o],h=t.z1[a];M.DEBUG&&console.log(t.step,"SDPVTL["+e+"]",o,a),i=e?(r=s.y-h.y,h.x-s.x):(r=h.x-s.x,h.y-s.y),t.dpv=Zt(r,i)}function xr(e,t){var r=t.stack,i=t.prog,n=t.ip;M.DEBUG&&console.log(t.step,"PUSHB["+e+"]");for(var o=0;o<e;o++)r.push(i[++n]);t.ip=n}function wr(e,t){var r=t.ip,i=t.prog,n=t.stack;M.DEBUG&&console.log(t.ip,"PUSHW["+e+"]");for(var o=0;o<e;o++){var a=i[++r]<<8|i[++r];32768&a&&(a=-(1+(65535^a))),n.push(a)}t.ip=r}function Sr(e,t,r,i,n,o){var a,s,h,l,u=o.stack,c=e&&u.pop(),p=u.pop(),d=o.rp0,f=o.z0[d],m=o.z1[p],v=o.minDis,g=o.fv,y=o.dpv;h=0<=(s=a=y.distance(m,f,!0,!0))?1:-1,s=Math.abs(s),e&&(l=o.cvt[c],i&&Math.abs(s-l)<o.cvCutIn&&(s=l)),r&&s<v&&(s=v),i&&(s=o.round(s)),g.setRelative(m,f,h*s,y),g.touch(m),M.DEBUG&&console.log(o.step,(e?"MIRP[":"MDRP[")+(t?"M":"m")+(r?">":"_")+(i?"R":"_")+(0===n?"Gr":1===n?"Bl":2===n?"Wh":"")+"]",e?c+"("+o.cvt[c]+","+l+")":"",p,"(d =",a,"->",h*s,")"),o.rp1=o.rp0,o.rp2=p,t&&(o.rp0=p)}Nt.prototype.exec=function(e,t){if("number"!=typeof t)throw new Error("Point size is not a number!");if(!(2<this._errorState)){var r=this.font,i=this._prepState;if(!i||i.ppem!==t){var n=this._fpgmState;if(!n){$t.prototype=Jt,(n=this._fpgmState=new $t("fpgm",r.tables.fpgm)).funcs=[],n.font=r,M.DEBUG&&(console.log("---EXEC FPGM---"),n.step=-1);try{At(n)}catch(e){return console.log("Hinting error in FPGM:"+e),void(this._errorState=3)}}$t.prototype=n,(i=this._prepState=new $t("prep",r.tables.prep)).ppem=t;var o=r.tables.cvt;if(o)for(var a=i.cvt=new Array(o.length),s=t/r.unitsPerEm,h=0;h<o.length;h++)a[h]=o[h]*s;else i.cvt=[];M.DEBUG&&(console.log("---EXEC PREP---"),i.step=-1);try{At(i)}catch(e){this._errorState<2&&console.log("Hinting error in PREP:"+e),this._errorState=2}}if(!(1<this._errorState))try{return Ut(e,i)}catch(e){return this._errorState<1&&(console.log("Hinting error:"+e),console.log("Note: further hinting errors are silenced")),void(this._errorState=1)}}},Ut=function(e,t){var r,i,n,o=t.ppem/t.font.unitsPerEm,a=o,s=e.components;if($t.prototype=t,s){var h=t.font;i=[],r=[];for(var l=0;l<s.length;l++){var u=s[l],c=h.glyphs.get(u.glyphIndex);n=new $t("glyf",c.instructions),M.DEBUG&&(console.log("---EXEC COMP "+l+"---"),n.step=-1),Ot(c,n,o,a);for(var p=Math.round(u.dx*o),d=Math.round(u.dy*a),f=n.gZone,m=n.contours,v=0;v<f.length;v++){var g=f[v];g.xTouched=g.yTouched=!1,g.xo=g.x=g.x+p,g.yo=g.y=g.y+d}var y=i.length;i.push.apply(i,f);for(var b=0;b<m.length;b++)r.push(m[b]+y)}e.instructions&&!n.inhibitGridFit&&((n=new $t("glyf",e.instructions)).gZone=n.z0=n.z1=n.z2=i,n.contours=r,i.push(new Qt(0,0),new Qt(Math.round(e.advanceWidth*o),0)),M.DEBUG&&(console.log("---EXEC COMPOSITE---"),n.step=-1),At(n),i.length-=2)}else n=new $t("glyf",e.instructions),M.DEBUG&&(console.log("---EXEC GLYPH---"),n.step=-1),Ot(e,n,o,a),i=n.gZone;return i},Ot=function(e,t,r,i){for(var n,o,a,s=e.points||[],h=s.length,l=t.gZone=t.z0=t.z1=t.z2=[],u=t.contours=[],c=0;c<h;c++)n=s[c],l[c]=new Qt(n.x*r,n.y*i,n.lastPointOfContour,n.onCurve);for(var p=0;p<h;p++)n=l[p],o||(o=n,u.push(p)),n.lastPointOfContour?((n.nextPointOnContour=o).prevPointOnContour=n,o=void 0):(a=l[p+1],(n.nextPointOnContour=a).prevPointOnContour=n);if(!t.inhibitGridFit){if(M.DEBUG){console.log("PROCESSING GLYPH",t.stack);for(var d=0;d<h;d++)console.log(d,l[d].x,l[d].y)}if(l.push(new Qt(0,0),new Qt(Math.round(e.advanceWidth*r),0)),At(t),l.length-=2,M.DEBUG){console.log("FINISHED GLYPH",t.stack);for(var f=0;f<h;f++)console.log(f,l[f].x,l[f].y)}}},At=function(e){var t=e.prog;if(t){var r,i=t.length;for(e.ip=0;e.ip<i;e.ip++){if(M.DEBUG&&e.step++,!(r=kt[t[e.ip]]))throw new Error("unknown instruction: 0x"+Number(t[e.ip]).toString(16));r(e)}}},kt=[rr.bind(void 0,qt),rr.bind(void 0,Wt),ir.bind(void 0,qt),ir.bind(void 0,Wt),nr.bind(void 0,qt),nr.bind(void 0,Wt),or.bind(void 0,0),or.bind(void 0,1),ar.bind(void 0,0),ar.bind(void 0,1),function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"SPVFS[]",r,i),e.pv=e.dpv=Zt(i,r)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"SPVFS[]",r,i),e.fv=Zt(i,r)},function(e){var t=e.stack,r=e.pv;M.DEBUG&&console.log(e.step,"GPV[]"),t.push(16384*r.x),t.push(16384*r.y)},function(e){var t=e.stack,r=e.fv;M.DEBUG&&console.log(e.step,"GFV[]"),t.push(16384*r.x),t.push(16384*r.y)},function(e){e.fv=e.pv,M.DEBUG&&console.log(e.step,"SFVTPV[]")},function(e){var t=e.stack,r=t.pop(),i=t.pop(),n=t.pop(),o=t.pop(),a=t.pop(),s=e.z0,h=e.z1,l=s[r],u=s[i],c=h[n],p=h[o],d=e.z2[a];M.DEBUG&&console.log("ISECT[], ",r,i,n,o,a);var f=l.x,m=l.y,v=u.x,g=u.y,y=c.x,b=c.y,_=p.x,x=p.y,w=(f-v)*(b-x)-(m-g)*(y-_),S=f*g-m*v,T=y*x-b*_;d.x=(S*(y-_)-T*(f-v))/w,d.y=(S*(b-x)-T*(m-g))/w},function(e){e.rp0=e.stack.pop(),M.DEBUG&&console.log(e.step,"SRP0[]",e.rp0)},function(e){e.rp1=e.stack.pop(),M.DEBUG&&console.log(e.step,"SRP1[]",e.rp1)},function(e){e.rp2=e.stack.pop(),M.DEBUG&&console.log(e.step,"SRP2[]",e.rp2)},function(e){var t=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SZP0[]",t),e.zp0=t){case 0:e.tZone||er(e),e.z0=e.tZone;break;case 1:e.z0=e.gZone;break;default:throw new Error("Invalid zone pointer")}},function(e){var t=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SZP1[]",t),e.zp1=t){case 0:e.tZone||er(e),e.z1=e.tZone;break;case 1:e.z1=e.gZone;break;default:throw new Error("Invalid zone pointer")}},function(e){var t=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SZP2[]",t),e.zp2=t){case 0:e.tZone||er(e),e.z2=e.tZone;break;case 1:e.z2=e.gZone;break;default:throw new Error("Invalid zone pointer")}},function(e){var t=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SZPS[]",t),e.zp0=e.zp1=e.zp2=t,t){case 0:e.tZone||er(e),e.z0=e.z1=e.z2=e.tZone;break;case 1:e.z0=e.z1=e.z2=e.gZone;break;default:throw new Error("Invalid zone pointer")}},function(e){e.loop=e.stack.pop(),M.DEBUG&&console.log(e.step,"SLOOP[]",e.loop)},function(e){M.DEBUG&&console.log(e.step,"RTG[]"),e.round=Ft},function(e){M.DEBUG&&console.log(e.step,"RTHG[]"),e.round=zt},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SMD[]",t),e.minDis=t/64},function(e){M.DEBUG&&console.log(e.step,"ELSE[]"),tr(e,!1)},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"JMPR[]",t),e.ip+=t-1},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SCVTCI[]",t),e.cvCutIn=t/64},void 0,void 0,function(e){var t=e.stack;M.DEBUG&&console.log(e.step,"DUP[]"),t.push(t[t.length-1])},sr,function(e){M.DEBUG&&console.log(e.step,"CLEAR[]"),e.stack.length=0},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"SWAP[]"),t.push(r),t.push(i)},function(e){var t=e.stack;M.DEBUG&&console.log(e.step,"DEPTH[]"),t.push(t.length)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"CINDEX[]",r),t.push(t[t.length-r])},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"MINDEX[]",r),t.push(t.splice(t.length-r,1)[0])},void 0,void 0,void 0,function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"LOOPCALL[]",r,i);var n=e.ip,o=e.prog;e.prog=e.funcs[r];for(var a=0;a<i;a++)At(e),M.DEBUG&&console.log(++e.step,a+1<i?"next loopcall":"done loopcall",a);e.ip=n,e.prog=o},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"CALL[]",t);var r=e.ip,i=e.prog;e.prog=e.funcs[t],At(e),e.ip=r,e.prog=i,M.DEBUG&&console.log(++e.step,"returning from",t)},function(e){if("fpgm"!==e.env)throw new Error("FDEF not allowed here");var t=e.stack,r=e.prog,i=e.ip,n=t.pop(),o=i;for(M.DEBUG&&console.log(e.step,"FDEF[]",n);45!==r[++i];);e.ip=i,e.funcs[n]=r.slice(o+1,i)},void 0,hr.bind(void 0,0),hr.bind(void 0,1),lr.bind(void 0,qt),lr.bind(void 0,Wt),ur.bind(void 0,0),ur.bind(void 0,1),cr.bind(void 0,0),cr.bind(void 0,1),pr.bind(void 0,0),pr.bind(void 0,1),function(e){for(var t=e.stack,r=e.loop,i=e.fv,n=t.pop()/64,o=e.z2;r--;){var a=t.pop(),s=o[a];M.DEBUG&&console.log(e.step,(1<e.loop?"loop "+(e.loop-r)+": ":"")+"SHPIX[]",a,n),i.setRelative(s,s,n),i.touch(s)}e.loop=1},function(e){for(var t=e.stack,r=e.rp1,i=e.rp2,n=e.loop,o=e.z0[r],a=e.z1[i],s=e.fv,h=e.dpv,l=e.z2;n--;){var u=t.pop(),c=l[u];M.DEBUG&&console.log(e.step,(1<e.loop?"loop "+(e.loop-n)+": ":"")+"IP[]",u,r,"<->",i),s.interpolate(c,o,a,h),s.touch(c)}e.loop=1},dr.bind(void 0,0),dr.bind(void 0,1),function(e){for(var t=e.stack,r=e.rp0,i=e.z0[r],n=e.loop,o=e.fv,a=e.pv,s=e.z1;n--;){var h=t.pop(),l=s[h];M.DEBUG&&console.log(e.step,(1<e.loop?"loop "+(e.loop-n)+": ":"")+"ALIGNRP[]",h),o.setRelative(l,i,0,a),o.touch(l)}e.loop=1},function(e){M.DEBUG&&console.log(e.step,"RTDG[]"),e.round=Vt},fr.bind(void 0,0),fr.bind(void 0,1),function(e){var t=e.prog,r=e.ip,i=e.stack,n=t[++r];M.DEBUG&&console.log(e.step,"NPUSHB[]",n);for(var o=0;o<n;o++)i.push(t[++r]);e.ip=r},function(e){var t=e.ip,r=e.prog,i=e.stack,n=r[++t];M.DEBUG&&console.log(e.step,"NPUSHW[]",n);for(var o=0;o<n;o++){var a=r[++t]<<8|r[++t];32768&a&&(a=-(1+(65535^a))),i.push(a)}e.ip=t},function(e){var t=e.stack,r=e.store;r||(r=e.store=[]);var i=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"WS",i,n),r[n]=i},function(e){var t=e.stack,r=e.store,i=t.pop();M.DEBUG&&console.log(e.step,"RS",i);var n=r&&r[i]||0;t.push(n)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"WCVTP",r,i),e.cvt[i]=r/64},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"RCVT",r),t.push(64*e.cvt[r])},mr.bind(void 0,0),mr.bind(void 0,1),void 0,vr.bind(void 0,0),vr.bind(void 0,1),function(e){M.DEBUG&&console.log(e.step,"MPPEM[]"),e.stack.push(e.ppem)},void 0,function(e){M.DEBUG&&console.log(e.step,"FLIPON[]"),e.autoFlip=!0},void 0,void 0,function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"LT[]",r,i),t.push(i<r?1:0)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"LTEQ[]",r,i),t.push(i<=r?1:0)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"GT[]",r,i),t.push(r<i?1:0)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"GTEQ[]",r,i),t.push(r<=i?1:0)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"EQ[]",r,i),t.push(r===i?1:0)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"NEQ[]",r,i),t.push(r!==i?1:0)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"ODD[]",r),t.push(Math.trunc(r)%2?1:0)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"EVEN[]",r),t.push(Math.trunc(r)%2?0:1)},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"IF[]",t),t||(tr(e,!0),M.DEBUG&&console.log(e.step,"EIF[]"))},function(e){M.DEBUG&&console.log(e.step,"EIF[]")},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"AND[]",r,i),t.push(r&&i?1:0)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"OR[]",r,i),t.push(r||i?1:0)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"NOT[]",r),t.push(r?0:1)},gr.bind(void 0,1),function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SDB[]",t),e.deltaBase=t},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SDS[]",t),e.deltaShift=Math.pow(.5,t)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"ADD[]",r,i),t.push(i+r)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"SUB[]",r,i),t.push(i-r)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"DIV[]",r,i),t.push(64*i/r)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"MUL[]",r,i),t.push(i*r/64)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"ABS[]",r),t.push(Math.abs(r))},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"NEG[]",r),t.push(-r)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"FLOOR[]",r),t.push(64*Math.floor(r/64))},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"CEILING[]",r),t.push(64*Math.ceil(r/64))},yr.bind(void 0,0),yr.bind(void 0,1),yr.bind(void 0,2),yr.bind(void 0,3),void 0,void 0,void 0,void 0,function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"WCVTF[]",r,i),e.cvt[i]=r*e.ppem/e.font.unitsPerEm},gr.bind(void 0,2),gr.bind(void 0,3),br.bind(void 0,1),br.bind(void 0,2),br.bind(void 0,3),function(e){var t,r=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SROUND[]",r),e.round=Xt,192&r){case 0:t=.5;break;case 64:t=1;break;case 128:t=2;break;default:throw new Error("invalid SROUND value")}switch(e.srPeriod=t,48&r){case 0:e.srPhase=0;break;case 16:e.srPhase=.25*t;break;case 32:e.srPhase=.5*t;break;case 48:e.srPhase=.75*t;break;default:throw new Error("invalid SROUND value")}r&=15,e.srThreshold=0===r?0:(r/8-.5)*t},function(e){var t,r=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"S45ROUND[]",r),e.round=Xt,192&r){case 0:t=Math.sqrt(2)/2;break;case 64:t=Math.sqrt(2);break;case 128:t=2*Math.sqrt(2);break;default:throw new Error("invalid S45ROUND value")}switch(e.srPeriod=t,48&r){case 0:e.srPhase=0;break;case 16:e.srPhase=.25*t;break;case 32:e.srPhase=.5*t;break;case 48:e.srPhase=.75*t;break;default:throw new Error("invalid S45ROUND value")}r&=15,e.srThreshold=0===r?0:(r/8-.5)*t},void 0,void 0,function(e){M.DEBUG&&console.log(e.step,"ROFF[]"),e.round=Gt},void 0,function(e){M.DEBUG&&console.log(e.step,"RUTG[]"),e.round=Ht},function(e){M.DEBUG&&console.log(e.step,"RDTG[]"),e.round=jt},sr,sr,void 0,void 0,void 0,void 0,void 0,function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SCANCTRL[]",t)},_r.bind(void 0,0),_r.bind(void 0,1),function(e){var t=e.stack,r=t.pop(),i=0;M.DEBUG&&console.log(e.step,"GETINFO[]",r),1&r&&(i=35),32&r&&(i|=4096),t.push(i)},void 0,function(e){var t=e.stack,r=t.pop(),i=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"ROLL[]"),t.push(i),t.push(r),t.push(n)},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"MAX[]",r,i),t.push(Math.max(i,r))},function(e){var t=e.stack,r=t.pop(),i=t.pop();M.DEBUG&&console.log(e.step,"MIN[]",r,i),t.push(Math.min(i,r))},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SCANTYPE[]",t)},function(e){var t=e.stack.pop(),r=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"INSTCTRL[]",t,r),t){case 1:return void(e.inhibitGridFit=!!r);case 2:return void(e.ignoreCvt=!!r);default:throw new Error("invalid INSTCTRL[] selector")}},void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,xr.bind(void 0,1),xr.bind(void 0,2),xr.bind(void 0,3),xr.bind(void 0,4),xr.bind(void 0,5),xr.bind(void 0,6),xr.bind(void 0,7),xr.bind(void 0,8),wr.bind(void 0,1),wr.bind(void 0,2),wr.bind(void 0,3),wr.bind(void 0,4),wr.bind(void 0,5),wr.bind(void 0,6),wr.bind(void 0,7),wr.bind(void 0,8),Sr.bind(void 0,0,0,0,0,0),Sr.bind(void 0,0,0,0,0,1),Sr.bind(void 0,0,0,0,0,2),Sr.bind(void 0,0,0,0,0,3),Sr.bind(void 0,0,0,0,1,0),Sr.bind(void 0,0,0,0,1,1),Sr.bind(void 0,0,0,0,1,2),Sr.bind(void 0,0,0,0,1,3),Sr.bind(void 0,0,0,1,0,0),Sr.bind(void 0,0,0,1,0,1),Sr.bind(void 0,0,0,1,0,2),Sr.bind(void 0,0,0,1,0,3),Sr.bind(void 0,0,0,1,1,0),Sr.bind(void 0,0,0,1,1,1),Sr.bind(void 0,0,0,1,1,2),Sr.bind(void 0,0,0,1,1,3),Sr.bind(void 0,0,1,0,0,0),Sr.bind(void 0,0,1,0,0,1),Sr.bind(void 0,0,1,0,0,2),Sr.bind(void 0,0,1,0,0,3),Sr.bind(void 0,0,1,0,1,0),Sr.bind(void 0,0,1,0,1,1),Sr.bind(void 0,0,1,0,1,2),Sr.bind(void 0,0,1,0,1,3),Sr.bind(void 0,0,1,1,0,0),Sr.bind(void 0,0,1,1,0,1),Sr.bind(void 0,0,1,1,0,2),Sr.bind(void 0,0,1,1,0,3),Sr.bind(void 0,0,1,1,1,0),Sr.bind(void 0,0,1,1,1,1),Sr.bind(void 0,0,1,1,1,2),Sr.bind(void 0,0,1,1,1,3),Sr.bind(void 0,1,0,0,0,0),Sr.bind(void 0,1,0,0,0,1),Sr.bind(void 0,1,0,0,0,2),Sr.bind(void 0,1,0,0,0,3),Sr.bind(void 0,1,0,0,1,0),Sr.bind(void 0,1,0,0,1,1),Sr.bind(void 0,1,0,0,1,2),Sr.bind(void 0,1,0,0,1,3),Sr.bind(void 0,1,0,1,0,0),Sr.bind(void 0,1,0,1,0,1),Sr.bind(void 0,1,0,1,0,2),Sr.bind(void 0,1,0,1,0,3),Sr.bind(void 0,1,0,1,1,0),Sr.bind(void 0,1,0,1,1,1),Sr.bind(void 0,1,0,1,1,2),Sr.bind(void 0,1,0,1,1,3),Sr.bind(void 0,1,1,0,0,0),Sr.bind(void 0,1,1,0,0,1),Sr.bind(void 0,1,1,0,0,2),Sr.bind(void 0,1,1,0,0,3),Sr.bind(void 0,1,1,0,1,0),Sr.bind(void 0,1,1,0,1,1),Sr.bind(void 0,1,1,0,1,2),Sr.bind(void 0,1,1,0,1,3),Sr.bind(void 0,1,1,1,0,0),Sr.bind(void 0,1,1,1,0,1),Sr.bind(void 0,1,1,1,0,2),Sr.bind(void 0,1,1,1,0,3),Sr.bind(void 0,1,1,1,1,0),Sr.bind(void 0,1,1,1,1,1),Sr.bind(void 0,1,1,1,1,2),Sr.bind(void 0,1,1,1,1,3)];var Tr=Array.from||function(e){return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g)||[]};function Mr(e){(e=e||{}).empty||(Ct(e.familyName,"When creating a new Font object, familyName is required."),Ct(e.styleName,"When creating a new Font object, styleName is required."),Ct(e.unitsPerEm,"When creating a new Font object, unitsPerEm is required."),Ct(e.ascender,"When creating a new Font object, ascender is required."),Ct(e.descender,"When creating a new Font object, descender is required."),Ct(e.descender<0,"Descender should be negative (e.g. -512)."),this.names={fontFamily:{en:e.familyName||" "},fontSubfamily:{en:e.styleName||" "},fullName:{en:e.fullName||e.familyName+" "+e.styleName},postScriptName:{en:e.postScriptName||(e.familyName+e.styleName).replace(/\s/g,"")},designer:{en:e.designer||" "},designerURL:{en:e.designerURL||" "},manufacturer:{en:e.manufacturer||" "},manufacturerURL:{en:e.manufacturerURL||" "},license:{en:e.license||" "},licenseURL:{en:e.licenseURL||" "},version:{en:e.version||"Version 0.1"},description:{en:e.description||" "},copyright:{en:e.copyright||" "},trademark:{en:e.trademark||" "}},this.unitsPerEm=e.unitsPerEm||1e3,this.ascender=e.ascender,this.descender=e.descender,this.createdTimestamp=e.createdTimestamp,this.tables={os2:{usWeightClass:e.weightClass||this.usWeightClasses.MEDIUM,usWidthClass:e.widthClass||this.usWidthClasses.MEDIUM,fsSelection:e.fsSelection||this.fsSelectionValues.REGULAR}}),this.supported=!0,this.glyphs=new xe.GlyphSet(this,e.glyphs||[]),this.encoding=new de(this),this.position=new wt(this),this.substitution=new St(this),this.tables=this.tables||{},Object.defineProperty(this,"hinting",{get:function(){return this._hinting?this._hinting:"truetype"===this.outlinesFormat?this._hinting=new Nt(this):void 0}})}function Er(e,t){var r=JSON.stringify(e),i=256;for(var n in t){var o=parseInt(n);if(o&&!(o<256)){if(JSON.stringify(t[n])===r)return o;i<=o&&(i=o+1)}}return t[i]=e,i}function Cr(e,t,r,i){for(var n=[{name:"nameID_"+e,type:"USHORT",value:Er(t.name,i)},{name:"flags_"+e,type:"USHORT",value:0}],o=0;o<r.length;++o){var a=r[o].tag;n.push({name:"axis_"+e+" "+a,type:"FIXED",value:t.coordinates[a]<<16})}return n}function Rr(e,t,r,i){var n={},o=new se.Parser(e,t);n.name=i[o.parseUShort()]||{},o.skip("uShort",1),n.coordinates={};for(var a=0;a<r.length;++a)n.coordinates[r[a].tag]=o.parseFixed();return n}Mr.prototype.hasChar=function(e){return null!==this.encoding.charToGlyphIndex(e)},Mr.prototype.charToGlyphIndex=function(e){return this.encoding.charToGlyphIndex(e)},Mr.prototype.charToGlyph=function(e){var t=this.charToGlyphIndex(e),r=this.glyphs.get(t);return r||(r=this.glyphs.get(0)),r},Mr.prototype.stringToGlyphs=function(e,t){t=t||this.defaultRenderOptions;for(var r=Tr(e),i=[],n=0;n<r.length;n+=1){var o=r[n];i.push(this.charToGlyphIndex(o))}var a=i.length;if(t.features){var s=t.script||this.substitution.getDefaultScriptName(),h=[];t.features.liga&&(h=h.concat(this.substitution.getFeature("liga",s,t.language))),t.features.rlig&&(h=h.concat(this.substitution.getFeature("rlig",s,t.language)));for(var l=0;l<a;l+=1)for(var u=0;u<h.length;u++){for(var c=h[u],p=c.sub,d=p.length,f=0;f<d&&p[f]===i[l+f];)f++;f===d&&(i.splice(l,d,c.by),a=a-d+1)}}for(var m=new Array(a),v=this.glyphs.get(0),g=0;g<a;g+=1)m[g]=this.glyphs.get(i[g])||v;return m},Mr.prototype.nameToGlyphIndex=function(e){return this.glyphNames.nameToGlyphIndex(e)},Mr.prototype.nameToGlyph=function(e){var t=this.nameToGlyphIndex(e),r=this.glyphs.get(t);return r||(r=this.glyphs.get(0)),r},Mr.prototype.glyphIndexToName=function(e){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(e):""},Mr.prototype.getKerningValue=function(e,t){e=e.index||e,t=t.index||t;var r=this.position.defaultKerningTables;return r?this.position.getKerningValue(r,e,t):this.kerningPairs[e+","+t]||0},Mr.prototype.defaultRenderOptions={kerning:!0,features:{liga:!0,rlig:!0}},Mr.prototype.forEachGlyph=function(e,t,r,i,n,o){t=void 0!==t?t:0,r=void 0!==r?r:0,i=void 0!==i?i:72,n=n||this.defaultRenderOptions;var a,s=1/this.unitsPerEm*i,h=this.stringToGlyphs(e,n);if(n.kerning){var l=n.script||this.position.getDefaultScriptName();a=this.position.getKerningTables(l,n.language)}for(var u=0;u<h.length;u+=1){var c=h[u];if(o.call(this,c,t,r,i,n),c.advanceWidth&&(t+=c.advanceWidth*s),n.kerning&&u<h.length-1)t+=(a?this.position.getKerningValue(a,c.index,h[u+1].index):this.getKerningValue(c,h[u+1]))*s;n.letterSpacing?t+=n.letterSpacing*i:n.tracking&&(t+=n.tracking/1e3*i)}return t},Mr.prototype.getPath=function(e,t,r,i,o){var a=new U;return this.forEachGlyph(e,t,r,i,o,function(e,t,r,i){var n=e.getPath(t,r,i,o,this);a.extend(n)}),a},Mr.prototype.getPaths=function(e,t,r,i,o){var a=[];return this.forEachGlyph(e,t,r,i,o,function(e,t,r,i){var n=e.getPath(t,r,i,o,this);a.push(n)}),a},Mr.prototype.getAdvanceWidth=function(e,t,r){return this.forEachGlyph(e,0,0,t,r,function(){})},Mr.prototype.draw=function(e,t,r,i,n,o){this.getPath(t,r,i,n,o).draw(e)},Mr.prototype.drawPoints=function(n,e,t,r,i,o){this.forEachGlyph(e,t,r,i,o,function(e,t,r,i){e.drawPoints(n,t,r,i)})},Mr.prototype.drawMetrics=function(n,e,t,r,i,o){this.forEachGlyph(e,t,r,i,o,function(e,t,r,i){e.drawMetrics(n,t,r,i)})},Mr.prototype.getEnglishName=function(e){var t=this.names[e];if(t)return t.en},Mr.prototype.validate=function(){var r=this;function e(e){var t=r.getEnglishName(e);t&&t.trim().length}e("fontFamily"),e("weightName"),e("manufacturer"),e("copyright"),e("version"),this.unitsPerEm},Mr.prototype.toTables=function(){return gt.fontToTable(this)},Mr.prototype.toBuffer=function(){return console.warn("Font.toBuffer is deprecated. Use Font.toArrayBuffer instead."),this.toArrayBuffer()},Mr.prototype.toArrayBuffer=function(){for(var e=this.toTables().encode(),t=new ArrayBuffer(e.length),r=new Uint8Array(t),i=0;i<e.length;i++)r[i]=e[i];return t},Mr.prototype.download=function(t){var e=this.getEnglishName("fontFamily"),r=this.getEnglishName("fontSubfamily");t=t||e.replace(/\s/g,"")+"-"+r+".otf";var n=this.toArrayBuffer();if("undefined"!=typeof window)window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,window.requestFileSystem(window.TEMPORARY,n.byteLength,function(e){e.root.getFile(t,{create:!0},function(i){i.createWriter(function(e){var t=new DataView(n),r=new Blob([t],{type:"font/opentype"});e.write(r),e.addEventListener("writeend",function(){location.href=i.toURL()},!1)})})},function(e){throw new Error(e.name+": "+e.message)});else{var i=Vr("fs"),o=function(e){for(var t=new Fr(e.byteLength),r=new Uint8Array(e),i=0;i<t.length;++i)t[i]=r[i];return t}(n);i.writeFileSync(t,o)}},Mr.prototype.fsSelectionValues={ITALIC:1,UNDERSCORE:2,NEGATIVE:4,OUTLINED:8,STRIKEOUT:16,BOLD:32,REGULAR:64,USER_TYPO_METRICS:128,WWS:256,OBLIQUE:512},Mr.prototype.usWidthClasses={ULTRA_CONDENSED:1,EXTRA_CONDENSED:2,CONDENSED:3,SEMI_CONDENSED:4,MEDIUM:5,SEMI_EXPANDED:6,EXPANDED:7,EXTRA_EXPANDED:8,ULTRA_EXPANDED:9},Mr.prototype.usWeightClasses={THIN:100,EXTRA_LIGHT:200,LIGHT:300,NORMAL:400,MEDIUM:500,SEMI_BOLD:600,BOLD:700,EXTRA_BOLD:800,BLACK:900};var Lr={make:function(e,t){var r,i,n,o,a=new $.Table("fvar",[{name:"version",type:"ULONG",value:65536},{name:"offsetToData",type:"USHORT",value:0},{name:"countSizePairs",type:"USHORT",value:2},{name:"axisCount",type:"USHORT",value:e.axes.length},{name:"axisSize",type:"USHORT",value:20},{name:"instanceCount",type:"USHORT",value:e.instances.length},{name:"instanceSize",type:"USHORT",value:4+4*e.axes.length}]);a.offsetToData=a.sizeOf();for(var s=0;s<e.axes.length;s++)a.fields=a.fields.concat((r=s,i=e.axes[s],n=t,o=Er(i.name,n),[{name:"tag_"+r,type:"TAG",value:i.tag},{name:"minValue_"+r,type:"FIXED",value:i.minValue<<16},{name:"defaultValue_"+r,type:"FIXED",value:i.defaultValue<<16},{name:"maxValue_"+r,type:"FIXED",value:i.maxValue<<16},{name:"flags_"+r,type:"USHORT",value:0},{name:"nameID_"+r,type:"USHORT",value:o}]));for(var h=0;h<e.instances.length;h++)a.fields=a.fields.concat(Cr(h,e.instances[h],e.axes,t));return a},parse:function(e,t,r){var i=new se.Parser(e,t),n=i.parseULong();D.argument(65536===n,"Unsupported fvar table version.");var o=i.parseOffset16();i.skip("uShort",1);for(var a,s,h,l,u,c=i.parseUShort(),p=i.parseUShort(),d=i.parseUShort(),f=i.parseUShort(),m=[],v=0;v<c;v++)m.push((a=e,s=t+o+v*p,h=r,u=l=void 0,l={},u=new se.Parser(a,s),l.tag=u.parseTag(),l.minValue=u.parseFixed(),l.defaultValue=u.parseFixed(),l.maxValue=u.parseFixed(),u.skip("uShort",1),l.name=h[u.parseUShort()]||{},l));for(var g=[],y=t+o+c*p,b=0;b<d;b++)g.push(Rr(e,y+b*f,m,r));return{axes:m,instances:g}}},Dr=new Array(10);Dr[1]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();return 1===t?{posFormat:1,coverage:this.parsePointer(oe.coverage),value:this.parseValueRecord()}:2===t?{posFormat:2,coverage:this.parsePointer(oe.coverage),values:this.parseValueRecordList()}:void D.assert(!1,"0x"+e.toString(16)+": GPOS lookup type 1 format must be 1 or 2.")},Dr[2]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();D.assert(1===t||2===t,"0x"+e.toString(16)+": GPOS lookup type 2 format must be 1 or 2.");var r=this.parsePointer(oe.coverage),i=this.parseUShort(),n=this.parseUShort();if(1===t)return{posFormat:t,coverage:r,valueFormat1:i,valueFormat2:n,pairSets:this.parseList(oe.pointer(oe.list(function(){return{secondGlyph:this.parseUShort(),value1:this.parseValueRecord(i),value2:this.parseValueRecord(n)}})))};if(2===t){var o=this.parsePointer(oe.classDef),a=this.parsePointer(oe.classDef),s=this.parseUShort(),h=this.parseUShort();return{posFormat:t,coverage:r,valueFormat1:i,valueFormat2:n,classDef1:o,classDef2:a,class1Count:s,class2Count:h,classRecords:this.parseList(s,oe.list(h,function(){return{value1:this.parseValueRecord(i),value2:this.parseValueRecord(n)}}))}}},Dr[3]=function(){return{error:"GPOS Lookup 3 not supported"}},Dr[4]=function(){return{error:"GPOS Lookup 4 not supported"}},Dr[5]=function(){return{error:"GPOS Lookup 5 not supported"}},Dr[6]=function(){return{error:"GPOS Lookup 6 not supported"}},Dr[7]=function(){return{error:"GPOS Lookup 7 not supported"}},Dr[8]=function(){return{error:"GPOS Lookup 8 not supported"}},Dr[9]=function(){return{error:"GPOS Lookup 9 not supported"}};var Pr=new Array(10);var Ir={parse:function(e,t){var r=new oe(e,t=t||0),i=r.parseVersion(1);return D.argument(1===i||1.1===i,"Unsupported GPOS table version "+i),1===i?{version:i,scripts:r.parseScriptList(),features:r.parseFeatureList(),lookups:r.parseLookupList(Dr)}:{version:i,scripts:r.parseScriptList(),features:r.parseFeatureList(),lookups:r.parseLookupList(Dr),variations:r.parseFeatureVariationsList()}},make:function(e){return new $.Table("GPOS",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new $.ScriptList(e.scripts)},{name:"features",type:"TABLE",value:new $.FeatureList(e.features)},{name:"lookups",type:"TABLE",value:new $.LookupList(e.lookups,Pr)}])}};var kr={parse:function(e,t){var r=new se.Parser(e,t),i=r.parseUShort();if(0===i)return function(e){var t={};e.skip("uShort");var r=e.parseUShort();D.argument(0===r,"Unsupported kern sub-table version."),e.skip("uShort",2);var i=e.parseUShort();e.skip("uShort",3);for(var n=0;n<i;n+=1){var o=e.parseUShort(),a=e.parseUShort(),s=e.parseShort();t[o+","+a]=s}return t}(r);if(1===i)return function(e){var t={};e.skip("uShort"),1<e.parseULong()&&console.warn("Only the first kern subtable is supported."),e.skip("uLong");var r=255&e.parseUShort();if(e.skip("uShort"),0===r){var i=e.parseUShort();e.skip("uShort",3);for(var n=0;n<i;n+=1){var o=e.parseUShort(),a=e.parseUShort(),s=e.parseShort();t[o+","+a]=s}}return t}(r);throw new Error("Unsupported kern table version ("+i+").")}};var Ar={parse:function(e,t,r,i){for(var n=new se.Parser(e,t),o=i?n.parseUShort:n.parseULong,a=[],s=0;s<r+1;s+=1){var h=o.call(n);i&&(h*=2),a.push(h)}return a}};function Ur(e,r){Vr("fs").readFile(e,function(e,t){if(e)return r(e.message);r(null,Et(t))})}function Or(e,t){var r=new XMLHttpRequest;r.open("get",e,!0),r.responseType="arraybuffer",r.onload=function(){return r.response?t(null,r.response):t("Font could not be loaded: "+r.statusText)},r.onerror=function(){t("Font could not be loaded")},r.send()}function Br(e,t){for(var r=[],i=12,n=0;n<t;n+=1){var o=se.getTag(e,i),a=se.getULong(e,i+4),s=se.getULong(e,i+8),h=se.getULong(e,i+12);r.push({tag:o,checksum:a,offset:s,length:h,compression:!1}),i+=16}return r}function Nr(e,t){if("WOFF"!==t.compression)return{data:e,offset:t.offset};var r=new Uint8Array(e.buffer,t.offset+2,t.compressedLength-2),i=new Uint8Array(t.length);if(n(r,i),i.byteLength!==t.length)throw new Error("Decompression error: "+t.tag+" decompressed length doesn't match recorded length");return{data:new DataView(i.buffer,0),offset:0}}function Gr(e){var t,r,i,n,o,a,s,h,l,u,c,p,d,f,m=new Mr({empty:!0}),v=new DataView(e,0),g=[],y=se.getTag(v,0);if(y===String.fromCharCode(0,1,0,0)||"true"===y||"typ1"===y)m.outlinesFormat="truetype",g=Br(v,i=se.getUShort(v,4));else if("OTTO"===y)m.outlinesFormat="cff",g=Br(v,i=se.getUShort(v,4));else{if("wOFF"!==y)throw new Error("Unsupported OpenType signature "+y);var b=se.getTag(v,4);if(b===String.fromCharCode(0,1,0,0))m.outlinesFormat="truetype";else{if("OTTO"!==b)throw new Error("Unsupported OpenType flavor "+y);m.outlinesFormat="cff"}g=function(e,t){for(var r=[],i=44,n=0;n<t;n+=1){var o=se.getTag(e,i),a=se.getULong(e,i+4),s=se.getULong(e,i+8),h=se.getULong(e,i+12),l=void 0;l=s<h&&"WOFF",r.push({tag:o,offset:a,compression:l,compressedLength:s,length:h}),i+=20}return r}(v,i=se.getUShort(v,12))}for(var _=0;_<i;_+=1){var x=g[_],w=void 0;switch(x.tag){case"cmap":w=Nr(v,x),m.tables.cmap=he.parse(w.data,w.offset),m.encoding=new fe(m.tables.cmap);break;case"cvt ":w=Nr(v,x),f=new se.Parser(w.data,w.offset),m.tables.cvt=f.parseShortList(x.length/2);break;case"fvar":o=x;break;case"fpgm":w=Nr(v,x),f=new se.Parser(w.data,w.offset),m.tables.fpgm=f.parseByteList(x.length);break;case"head":w=Nr(v,x),m.tables.head=Fe.parse(w.data,w.offset),m.unitsPerEm=m.tables.head.unitsPerEm,t=m.tables.head.indexToLocFormat;break;case"hhea":w=Nr(v,x),m.tables.hhea=Ve.parse(w.data,w.offset),m.ascender=m.tables.hhea.ascender,m.descender=m.tables.hhea.descender,m.numberOfHMetrics=m.tables.hhea.numberOfHMetrics;break;case"hmtx":l=x;break;case"ltag":w=Nr(v,x),r=He.parse(w.data,w.offset);break;case"maxp":w=Nr(v,x),m.tables.maxp=je.parse(w.data,w.offset),m.numGlyphs=m.tables.maxp.numGlyphs;break;case"name":p=x;break;case"OS/2":w=Nr(v,x),m.tables.os2=ot.parse(w.data,w.offset);break;case"post":w=Nr(v,x),m.tables.post=at.parse(w.data,w.offset),m.glyphNames=new ve(m.tables.post);break;case"prep":w=Nr(v,x),f=new se.Parser(w.data,w.offset),m.tables.prep=f.parseByteList(x.length);break;case"glyf":a=x;break;case"loca":c=x;break;case"CFF ":n=x;break;case"kern":u=x;break;case"GPOS":s=x;break;case"GSUB":h=x;break;case"meta":d=x}}var S=Nr(v,p);if(m.tables.name=it.parse(S.data,S.offset,r),m.names=m.tables.name,a&&c){var T=0===t,M=Nr(v,c),E=Ar.parse(M.data,M.offset,m.numGlyphs,T),C=Nr(v,a);m.glyphs=Bt.parse(C.data,C.offset,E,m)}else{if(!n)throw new Error("Font doesn't contain TrueType or CFF outlines.");var R=Nr(v,n);Ge.parse(R.data,R.offset,m)}var L=Nr(v,l);if(ze.parse(L.data,L.offset,m.numberOfHMetrics,m.numGlyphs,m.glyphs),function(e){for(var t,r=e.tables.cmap.glyphIndexMap,i=Object.keys(r),n=0;n<i.length;n+=1){var o=i[n],a=r[o];(t=e.glyphs.get(a)).addUnicode(parseInt(o))}for(var s=0;s<e.glyphs.length;s+=1)t=e.glyphs.get(s),e.cffEncoding?e.isCIDFont?t.name="gid"+s:t.name=e.cffEncoding.charset[s]:e.glyphNames.names&&(t.name=e.glyphNames.glyphIndexToName(s))}(m),u){var D=Nr(v,u);m.kerningPairs=kr.parse(D.data,D.offset)}else m.kerningPairs={};if(s){var P=Nr(v,s);m.tables.gpos=Ir.parse(P.data,P.offset),m.position.init()}if(h){var I=Nr(v,h);m.tables.gsub=ut.parse(I.data,I.offset)}if(o){var k=Nr(v,o);m.tables.fvar=Lr.parse(k.data,k.offset,m.names)}if(d){var A=Nr(v,d);m.tables.meta=ct.parse(A.data,A.offset),m.metas=m.tables.meta}return m}M.Font=Mr,M.Glyph=ye,M.Path=U,M.BoundingBox=C,M._parse=se,M.parse=Gr,M.load=function(e,i){("undefined"==typeof window?Ur:Or)(e,function(e,t){if(e)return i(e);var r;try{r=Gr(t)}catch(e){return i(e,null)}return i(null,r)})},M.loadSync=function(e){return Gr(Et(Vr("fs").readFileSync(e)))},Object.defineProperty(M,"__esModule",{value:!0})}("object"==typeof r&&void 0!==t?r:e.opentype={})}).call(this,Vr("buffer").Buffer)},{buffer:3,fs:2}],10:[function(e,t,r){var i,n,o=t.exports={};function a(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function h(t){if(i===setTimeout)return setTimeout(t,0);if((i===a||!i)&&setTimeout)return i=setTimeout,setTimeout(t,0);try{return i(t,0)}catch(e){try{return i.call(null,t,0)}catch(e){return i.call(this,t,0)}}}!function(){try{i="function"==typeof setTimeout?setTimeout:a}catch(e){i=a}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var l,u=[],c=!1,p=-1;function d(){c&&l&&(c=!1,l.length?u=l.concat(u):p=-1,u.length&&f())}function f(){if(!c){var e=h(d);c=!0;for(var t=u.length;t;){for(l=u,u=[];++p<t;)l&&l[p].run();p=-1,t=u.length}l=null,c=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function v(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new m(e,t)),1!==u.length||c||h(f)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},{}],11:[function(e,t,r){!function(e){"use strict";if(!e.fetch){var t="URLSearchParams"in e,r="Symbol"in e&&"iterator"in Symbol,a="FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),i="FormData"in e,n="ArrayBuffer"in e;if(n)var o=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],s=function(e){return e&&DataView.prototype.isPrototypeOf(e)},h=ArrayBuffer.isView||function(e){return e&&-1<o.indexOf(Object.prototype.toString.call(e))};f.prototype.append=function(e,t){e=c(e),t=p(t);var r=this.map[e];this.map[e]=r?r+","+t:t},f.prototype.delete=function(e){delete this.map[c(e)]},f.prototype.get=function(e){return e=c(e),this.has(e)?this.map[e]:null},f.prototype.has=function(e){return this.map.hasOwnProperty(c(e))},f.prototype.set=function(e,t){this.map[c(e)]=p(t)},f.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},f.prototype.keys=function(){var r=[];return this.forEach(function(e,t){r.push(t)}),d(r)},f.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),d(t)},f.prototype.entries=function(){var r=[];return this.forEach(function(e,t){r.push([t,e])}),d(r)},r&&(f.prototype[Symbol.iterator]=f.prototype.entries);var l=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];_.prototype.clone=function(){return new _(this,{body:this._bodyInit})},b.call(_.prototype),b.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},w.error=function(){var e=new w(null,{status:0,statusText:""});return e.type="error",e};var u=[301,302,303,307,308];w.redirect=function(e,t){if(-1===u.indexOf(t))throw new RangeError("Invalid status code");return new w(null,{status:t,headers:{location:e}})},e.Headers=f,e.Request=_,e.Response=w,e.fetch=function(r,n){return new Promise(function(i,e){var t=new _(r,n),o=new XMLHttpRequest;o.onload=function(){var e,n,t={status:o.status,statusText:o.statusText,headers:(e=o.getAllResponseHeaders()||"",n=new f,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var t=e.split(":"),r=t.shift().trim();if(r){var i=t.join(":").trim();n.append(r,i)}}),n)};t.url="responseURL"in o?o.responseURL:t.headers.get("X-Request-URL");var r="response"in o?o.response:o.responseText;i(new w(r,t))},o.onerror=function(){e(new TypeError("Network request failed"))},o.ontimeout=function(){e(new TypeError("Network request failed"))},o.open(t.method,t.url,!0),"include"===t.credentials?o.withCredentials=!0:"omit"===t.credentials&&(o.withCredentials=!1),"responseType"in o&&a&&(o.responseType="blob"),t.headers.forEach(function(e,t){o.setRequestHeader(t,e)}),o.send(void 0===t._bodyInit?null:t._bodyInit)})},e.fetch.polyfill=!0}function c(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function p(e){return"string"!=typeof e&&(e=String(e)),e}function d(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return r&&(e[Symbol.iterator]=function(){return e}),e}function f(t){this.map={},t instanceof f?t.forEach(function(e,t){this.append(t,e)},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function m(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function v(r){return new Promise(function(e,t){r.onload=function(){e(r.result)},r.onerror=function(){t(r.error)}})}function g(e){var t=new FileReader,r=v(t);return t.readAsArrayBuffer(e),r}function y(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function b(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e)if("string"==typeof e)this._bodyText=e;else if(a&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(i&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(t&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(n&&a&&s(e))this._bodyArrayBuffer=y(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!n||!ArrayBuffer.prototype.isPrototypeOf(e)&&!h(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=y(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},a&&(this.blob=function(){var e=m(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?m(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(g)}),this.text=function(){var e,t,r,i=m(this);if(i)return i;if(this._bodyBlob)return e=this._bodyBlob,t=new FileReader,r=v(t),t.readAsText(e),r;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),i=0;i<t.length;i++)r[i]=String.fromCharCode(t[i]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i&&(this.formData=function(){return this.text().then(x)}),this.json=function(){return this.text().then(JSON.parse)},this}function _(e,t){var r,i,n=(t=t||{}).body;if(e instanceof _){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new f(e.headers)),this.method=e.method,this.mode=e.mode,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new f(t.headers)),this.method=(r=t.method||this.method||"GET",i=r.toUpperCase(),-1<l.indexOf(i)?i:r),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function x(e){var n=new FormData;return e.trim().split("&").forEach(function(e){if(e){var t=e.split("="),r=t.shift().replace(/\+/g," "),i=t.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(i))}}),n}function w(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new f(t.headers),this.url=t.url||"",this._initBody(e)}}("undefined"!=typeof self?self:this)},{}],12:[function(e,t,r){"use strict";var i=e("./core/main");e("./core/constants"),e("./core/environment"),e("./core/error_helpers"),e("./core/helpers"),e("./core/legacy"),e("./core/p5.Element"),e("./core/p5.Graphics"),e("./core/p5.Renderer"),e("./core/p5.Renderer2D"),e("./core/rendering"),e("./core/shim"),e("./core/structure"),e("./core/transform"),e("./core/shape/2d_primitives"),e("./core/shape/attributes"),e("./core/shape/curves"),e("./core/shape/vertex"),e("./color/color_conversion"),e("./color/creating_reading"),e("./color/p5.Color"),e("./color/setting"),e("./data/p5.TypedDict"),e("./data/local_storage.js"),e("./events/acceleration"),e("./events/keyboard"),e("./events/mouse"),e("./events/touch"),e("./image/filters"),e("./image/image"),e("./image/loading_displaying"),e("./image/p5.Image"),e("./image/pixels"),e("./io/files"),e("./io/p5.Table"),e("./io/p5.TableRow"),e("./io/p5.XML"),e("./math/calculation"),e("./math/math"),e("./math/noise"),e("./math/p5.Vector"),e("./math/random"),e("./math/trigonometry"),e("./typography/attributes"),e("./typography/loading_displaying"),e("./typography/p5.Font"),e("./utilities/array_functions"),e("./utilities/conversion"),e("./utilities/string_functions"),e("./utilities/time_date"),e("./webgl/3d_primitives"),e("./webgl/interaction"),e("./webgl/light"),e("./webgl/loading"),e("./webgl/material"),e("./webgl/p5.Camera"),e("./webgl/p5.Geometry"),e("./webgl/p5.Matrix"),e("./webgl/p5.RendererGL.Immediate"),e("./webgl/p5.RendererGL"),e("./webgl/p5.RendererGL.Retained"),e("./webgl/p5.Shader"),e("./webgl/p5.Texture"),e("./webgl/text"),e("./core/init"),t.exports=i},{"./color/color_conversion":13,"./color/creating_reading":14,"./color/p5.Color":15,"./color/setting":16,"./core/constants":17,"./core/environment":18,"./core/error_helpers":19,"./core/helpers":20,"./core/init":21,"./core/legacy":22,"./core/main":23,"./core/p5.Element":24,"./core/p5.Graphics":25,"./core/p5.Renderer":26,"./core/p5.Renderer2D":27,"./core/rendering":28,"./core/shape/2d_primitives":29,"./core/shape/attributes":30,"./core/shape/curves":31,"./core/shape/vertex":32,"./core/shim":33,"./core/structure":34,"./core/transform":35,"./data/local_storage.js":36,"./data/p5.TypedDict":37,"./events/acceleration":38,"./events/keyboard":39,"./events/mouse":40,"./events/touch":41,"./image/filters":42,"./image/image":43,"./image/loading_displaying":44,"./image/p5.Image":45,"./image/pixels":46,"./io/files":47,"./io/p5.Table":48,"./io/p5.TableRow":49,"./io/p5.XML":50,"./math/calculation":51,"./math/math":52,"./math/noise":53,"./math/p5.Vector":54,"./math/random":55,"./math/trigonometry":56,"./typography/attributes":57,"./typography/loading_displaying":58,"./typography/p5.Font":59,"./utilities/array_functions":60,"./utilities/conversion":61,"./utilities/string_functions":62,"./utilities/time_date":63,"./webgl/3d_primitives":64,"./webgl/interaction":65,"./webgl/light":66,"./webgl/loading":67,"./webgl/material":68,"./webgl/p5.Camera":69,"./webgl/p5.Geometry":70,"./webgl/p5.Matrix":71,"./webgl/p5.RendererGL":74,"./webgl/p5.RendererGL.Immediate":72,"./webgl/p5.RendererGL.Retained":73,"./webgl/p5.Shader":75,"./webgl/p5.Texture":76,"./webgl/text":77}],13:[function(e,t,r){"use strict";var i=e("../core/main");i.ColorConversion={},i.ColorConversion._hsbaToHSLA=function(e){var t=e[0],r=e[1],i=e[2],n=(2-r)*i/2;return 0!==n&&(1===n?r=0:n<.5?r/=2-r:r=r*i/(2-2*n)),[t,r,n,e[3]]},i.ColorConversion._hsbaToRGBA=function(e){var t=6*e[0],r=e[1],i=e[2],n=[];if(0===r)n=[i,i,i,e[3]];else{var o,a,s,h=Math.floor(t),l=i*(1-r),u=i*(1-r*(t-h)),c=i*(1-r*(1+h-t));s=1===h?(o=u,a=i,l):2===h?(o=l,a=i,c):3===h?(o=l,a=u,i):4===h?(o=c,a=l,i):5===h?(o=i,a=l,u):(o=i,a=c,l),n=[o,a,s,e[3]]}return n},i.ColorConversion._hslaToHSBA=function(e){var t,r=e[0],i=e[1],n=e[2];return[r,i=2*((t=n<.5?(1+i)*n:n+i-n*i)-n)/t,t,e[3]]},i.ColorConversion._hslaToRGBA=function(e){var t=6*e[0],r=e[1],i=e[2],n=[];if(0===r)n=[i,i,i,e[3]];else{var o,a=2*i-(o=i<.5?(1+r)*i:i+r-i*r),s=function(e,t,r){return e<0?e+=6:6<=e&&(e-=6),e<1?t+(r-t)*e:e<3?r:e<4?t+(r-t)*(4-e):t};n=[s(t+2,a,o),s(t,a,o),s(t-2,a,o),e[3]]}return n},i.ColorConversion._rgbaToHSBA=function(e){var t,r,i=e[0],n=e[1],o=e[2],a=Math.max(i,n,o),s=a-Math.min(i,n,o);return 0===s?r=t=0:(r=s/a,i===a?t=(n-o)/s:n===a?t=2+(o-i)/s:o===a&&(t=4+(i-n)/s),t<0?t+=6:6<=t&&(t-=6)),[t/6,r,a,e[3]]},i.ColorConversion._rgbaToHSLA=function(e){var t,r,i=e[0],n=e[1],o=e[2],a=Math.max(i,n,o),s=Math.min(i,n,o),h=a+s,l=a-s;return 0===l?r=t=0:(r=h<1?l/h:l/(2-h),i===a?t=(n-o)/l:n===a?t=2+(o-i)/l:o===a&&(t=4+(i-n)/l),t<0?t+=6:6<=t&&(t-=6)),[t/6,r,h/2,e[3]]},t.exports=i.ColorConversion},{"../core/main":23}],14:[function(e,t,r){"use strict";var c=e("../core/main"),p=e("../core/constants");e("./p5.Color"),e("../core/error_helpers"),c.prototype.alpha=function(e){return c._validateParameters("alpha",arguments),this.color(e)._getAlpha()},c.prototype.blue=function(e){return c._validateParameters("blue",arguments),this.color(e)._getBlue()},c.prototype.brightness=function(e){return c._validateParameters("brightness",arguments),this.color(e)._getBrightness()},c.prototype.color=function(){if(c._validateParameters("color",arguments),arguments[0]instanceof c.Color)return arguments[0];var e=arguments[0]instanceof Array?arguments[0]:arguments;return new c.Color(this,e)},c.prototype.green=function(e){return c._validateParameters("green",arguments),this.color(e)._getGreen()},c.prototype.hue=function(e){return c._validateParameters("hue",arguments),this.color(e)._getHue()},c.prototype.lerpColor=function(e,t,r){c._validateParameters("lerpColor",arguments);var i,n,o,a,s,h,l=this._colorMode,u=this._colorMaxes;if(l===p.RGB)s=e.levels.map(function(e){return e/255}),h=t.levels.map(function(e){return e/255});else if(l===p.HSB)e._getBrightness(),t._getBrightness(),s=e.hsba,h=t.hsba;else{if(l!==p.HSL)throw new Error(l+"cannot be used for interpolation.");e._getLightness(),t._getLightness(),s=e.hsla,h=t.hsla}return r=Math.max(Math.min(r,1),0),void 0===this.lerp&&(this.lerp=function(e,t,r){return r*(t-e)+e}),i=this.lerp(s[0],h[0],r),n=this.lerp(s[1],h[1],r),o=this.lerp(s[2],h[2],r),a=this.lerp(s[3],h[3],r),i*=u[l][0],n*=u[l][1],o*=u[l][2],a*=u[l][3],this.color(i,n,o,a)},c.prototype.lightness=function(e){return c._validateParameters("lightness",arguments),this.color(e)._getLightness()},c.prototype.red=function(e){return c._validateParameters("red",arguments),this.color(e)._getRed()},c.prototype.saturation=function(e){return c._validateParameters("saturation",arguments),this.color(e)._getSaturation()},t.exports=c},{"../core/constants":17,"../core/error_helpers":19,"../core/main":23,"./p5.Color":15}],15:[function(e,t,r){"use strict";var c=e("../core/main"),p=e("../core/constants"),d=e("./color_conversion");c.Color=function(e,t){if(this._storeModeAndMaxes(e._colorMode,e._colorMaxes),this.mode!==p.RGB&&this.mode!==p.HSL&&this.mode!==p.HSB)throw new Error(this.mode+" is an invalid colorMode.");return this._array=c.Color._parseInputs.apply(this,t),this._calculateLevels(),this},c.Color.prototype.toString=function(e){var t=this.levels,r=this._array,i=r[3];switch(e){case"#rrggbb":return"#".concat(t[0]<16?"0".concat(t[0].toString(16)):t[0].toString(16),t[1]<16?"0".concat(t[1].toString(16)):t[1].toString(16),t[2]<16?"0".concat(t[2].toString(16)):t[2].toString(16));case"#rrggbbaa":return"#".concat(t[0]<16?"0".concat(t[0].toString(16)):t[0].toString(16),t[1]<16?"0".concat(t[1].toString(16)):t[1].toString(16),t[2]<16?"0".concat(t[2].toString(16)):t[2].toString(16),t[3]<16?"0".concat(t[2].toString(16)):t[3].toString(16));case"#rgb":return"#".concat(Math.round(15*r[0]).toString(16),Math.round(15*r[1]).toString(16),Math.round(15*r[2]).toString(16));case"#rgba":return"#".concat(Math.round(15*r[0]).toString(16),Math.round(15*r[1]).toString(16),Math.round(15*r[2]).toString(16),Math.round(15*r[3]).toString(16));case"rgb":return"rgb(".concat(t[0],", ",t[1],", ",t[2],")");case"rgb%":return"rgb(".concat((100*r[0]).toPrecision(3),"%, ",(100*r[1]).toPrecision(3),"%, ",(100*r[2]).toPrecision(3),"%)");case"rgba%":return"rgba(".concat((100*r[0]).toPrecision(3),"%, ",(100*r[1]).toPrecision(3),"%, ",(100*r[2]).toPrecision(3),"%, ",(100*r[3]).toPrecision(3),"%)");case"hsb":case"hsv":return this.hsba||(this.hsba=d._rgbaToHSBA(this._array)),"hsb(".concat(this.hsba[0]*this.maxes[p.HSB][0],", ",this.hsba[1]*this.maxes[p.HSB][1],", ",this.hsba[2]*this.maxes[p.HSB][2],")");case"hsb%":case"hsv%":return this.hsba||(this.hsba=d._rgbaToHSBA(this._array)),"hsb(".concat((100*this.hsba[0]).toPrecision(3),"%, ",(100*this.hsba[1]).toPrecision(3),"%, ",(100*this.hsba[2]).toPrecision(3),"%)");case"hsba":case"hsva":return this.hsba||(this.hsba=d._rgbaToHSBA(this._array)),"hsba(".concat(this.hsba[0]*this.maxes[p.HSB][0],", ",this.hsba[1]*this.maxes[p.HSB][1],", ",this.hsba[2]*this.maxes[p.HSB][2],", ",i,")");case"hsba%":case"hsva%":return this.hsba||(this.hsba=d._rgbaToHSBA(this._array)),"hsba(".concat((100*this.hsba[0]).toPrecision(3),"%, ",(100*this.hsba[1]).toPrecision(3),"%, ",(100*this.hsba[2]).toPrecision(3),"%, ",(100*i).toPrecision(3),"%)");case"hsl":return this.hsla||(this.hsla=d._rgbaToHSLA(this._array)),"hsl(".concat(this.hsla[0]*this.maxes[p.HSL][0],", ",this.hsla[1]*this.maxes[p.HSL][1],", ",this.hsla[2]*this.maxes[p.HSL][2],")");case"hsl%":return this.hsla||(this.hsla=d._rgbaToHSLA(this._array)),"hsl(".concat((100*this.hsla[0]).toPrecision(3),"%, ",(100*this.hsla[1]).toPrecision(3),"%, ",(100*this.hsla[2]).toPrecision(3),"%)");case"hsla":return this.hsla||(this.hsla=d._rgbaToHSLA(this._array)),"hsla(".concat(this.hsla[0]*this.maxes[p.HSL][0],", ",this.hsla[1]*this.maxes[p.HSL][1],", ",this.hsla[2]*this.maxes[p.HSL][2],", ",i,")");case"hsla%":return this.hsla||(this.hsla=d._rgbaToHSLA(this._array)),"hsl(".concat((100*this.hsla[0]).toPrecision(3),"%, ",(100*this.hsla[1]).toPrecision(3),"%, ",(100*this.hsla[2]).toPrecision(3),"%, ",(100*i).toPrecision(3),"%)");case"rgba":default:return"rgba(".concat(t[0],",",t[1],",",t[2],",",i,")")}},c.Color.prototype.setRed=function(e){this._array[0]=e/this.maxes[p.RGB][0],this._calculateLevels()},c.Color.prototype.setGreen=function(e){this._array[1]=e/this.maxes[p.RGB][1],this._calculateLevels()},c.Color.prototype.setBlue=function(e){this._array[2]=e/this.maxes[p.RGB][2],this._calculateLevels()},c.Color.prototype.setAlpha=function(e){this._array[3]=e/this.maxes[this.mode][3],this._calculateLevels()},c.Color.prototype._calculateLevels=function(){for(var e=this._array,t=this.levels=new Array(e.length),r=e.length-1;0<=r;--r)t[r]=Math.round(255*e[r])},c.Color.prototype._getAlpha=function(){return this._array[3]*this.maxes[this.mode][3]},c.Color.prototype._storeModeAndMaxes=function(e,t){this.mode=e,this.maxes=t},c.Color.prototype._getMode=function(){return this.mode},c.Color.prototype._getMaxes=function(){return this.maxes},c.Color.prototype._getBlue=function(){return this._array[2]*this.maxes[p.RGB][2]},c.Color.prototype._getBrightness=function(){return this.hsba||(this.hsba=d._rgbaToHSBA(this._array)),this.hsba[2]*this.maxes[p.HSB][2]},c.Color.prototype._getGreen=function(){return this._array[1]*this.maxes[p.RGB][1]},c.Color.prototype._getHue=function(){return this.mode===p.HSB?(this.hsba||(this.hsba=d._rgbaToHSBA(this._array)),this.hsba[0]*this.maxes[p.HSB][0]):(this.hsla||(this.hsla=d._rgbaToHSLA(this._array)),this.hsla[0]*this.maxes[p.HSL][0])},c.Color.prototype._getLightness=function(){return this.hsla||(this.hsla=d._rgbaToHSLA(this._array)),this.hsla[2]*this.maxes[p.HSL][2]},c.Color.prototype._getRed=function(){return this._array[0]*this.maxes[p.RGB][0]},c.Color.prototype._getSaturation=function(){return this.mode===p.HSB?(this.hsba||(this.hsba=d._rgbaToHSBA(this._array)),this.hsba[1]*this.maxes[p.HSB][1]):(this.hsla||(this.hsla=d._rgbaToHSLA(this._array)),this.hsla[1]*this.maxes[p.HSL][1])};var f={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},i=/\s*/,n=/(\d{1,3})/,o=/((?:\d+(?:\.\d+)?)|(?:\.\d+))/,a=new RegExp(o.source+"%"),m={HEX3:/^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,HEX4:/^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])$/i,HEX6:/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,HEX8:/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,RGB:new RegExp(["^rgb\\(",n.source,",",n.source,",",n.source,"\\)$"].join(i.source),"i"),RGB_PERCENT:new RegExp(["^rgb\\(",a.source,",",a.source,",",a.source,"\\)$"].join(i.source),"i"),RGBA:new RegExp(["^rgba\\(",n.source,",",n.source,",",n.source,",",o.source,"\\)$"].join(i.source),"i"),RGBA_PERCENT:new RegExp(["^rgba\\(",a.source,",",a.source,",",a.source,",",o.source,"\\)$"].join(i.source),"i"),HSL:new RegExp(["^hsl\\(",n.source,",",a.source,",",a.source,"\\)$"].join(i.source),"i"),HSLA:new RegExp(["^hsla\\(",n.source,",",a.source,",",a.source,",",o.source,"\\)$"].join(i.source),"i"),HSB:new RegExp(["^hsb\\(",n.source,",",a.source,",",a.source,"\\)$"].join(i.source),"i"),HSBA:new RegExp(["^hsba\\(",n.source,",",a.source,",",a.source,",",o.source,"\\)$"].join(i.source),"i")};c.Color._parseInputs=function(e,t,r,i){var n,o=arguments.length,a=this.mode,s=this.maxes[a],h=[];if(3<=o){for(h[0]=e/s[0],h[1]=t/s[1],h[2]=r/s[2],h[3]="number"==typeof i?i/s[3]:1,n=h.length-1;0<=n;--n){var l=h[n];l<0?h[n]=0:1<l&&(h[n]=1)}return a===p.HSL?d._hslaToRGBA(h):a===p.HSB?d._hsbaToRGBA(h):h}if(1===o&&"string"==typeof e){var u=e.trim().toLowerCase();if(f[u])return c.Color._parseInputs.call(this,f[u]);if(m.HEX3.test(u))return(h=m.HEX3.exec(u).slice(1).map(function(e){return parseInt(e+e,16)/255}))[3]=1,h;if(m.HEX6.test(u))return(h=m.HEX6.exec(u).slice(1).map(function(e){return parseInt(e,16)/255}))[3]=1,h;if(m.HEX4.test(u))return h=m.HEX4.exec(u).slice(1).map(function(e){return parseInt(e+e,16)/255});if(m.HEX8.test(u))return h=m.HEX8.exec(u).slice(1).map(function(e){return parseInt(e,16)/255});if(m.RGB.test(u))return(h=m.RGB.exec(u).slice(1).map(function(e){return e/255}))[3]=1,h;if(m.RGB_PERCENT.test(u))return(h=m.RGB_PERCENT.exec(u).slice(1).map(function(e){return parseFloat(e)/100}))[3]=1,h;if(m.RGBA.test(u))return h=m.RGBA.exec(u).slice(1).map(function(e,t){return 3===t?parseFloat(e):e/255});if(m.RGBA_PERCENT.test(u))return h=m.RGBA_PERCENT.exec(u).slice(1).map(function(e,t){return 3===t?parseFloat(e):parseFloat(e)/100});if(m.HSL.test(u)?(h=m.HSL.exec(u).slice(1).map(function(e,t){return 0===t?parseInt(e,10)/360:parseInt(e,10)/100}))[3]=1:m.HSLA.test(u)&&(h=m.HSLA.exec(u).slice(1).map(function(e,t){return 0===t?parseInt(e,10)/360:3===t?parseFloat(e):parseInt(e,10)/100})),(h=h.map(function(e){return Math.max(Math.min(e,1),0)})).length)return d._hslaToRGBA(h);if(m.HSB.test(u)?(h=m.HSB.exec(u).slice(1).map(function(e,t){return 0===t?parseInt(e,10)/360:parseInt(e,10)/100}))[3]=1:m.HSBA.test(u)&&(h=m.HSBA.exec(u).slice(1).map(function(e,t){return 0===t?parseInt(e,10)/360:3===t?parseFloat(e):parseInt(e,10)/100})),h.length){for(n=h.length-1;0<=n;--n)h[n]=Math.max(Math.min(h[n],1),0);return d._hsbaToRGBA(h)}h=[1,1,1,1]}else{if(1!==o&&2!==o||"number"!=typeof e)throw new Error(arguments+"is not a valid color representation.");h[0]=e/s[2],h[1]=e/s[2],h[2]=e/s[2],h[3]="number"==typeof t?t/s[3]:1,h=h.map(function(e){return Math.max(Math.min(e,1),0)})}return h},t.exports=c.Color},{"../core/constants":17,"../core/main":23,"./color_conversion":13}],16:[function(e,t,r){"use strict";var a=e("../core/main"),s=e("../core/constants");e("./p5.Color"),a.prototype.background=function(){return this._renderer.background.apply(this._renderer,arguments),this},a.prototype.clear=function(){return this._renderer.clear(),this},a.prototype.colorMode=function(e,t,r,i,n){if(a._validateParameters("colorMode",arguments),e===s.RGB||e===s.HSB||e===s.HSL){this._colorMode=e;var o=this._colorMaxes[e];2===arguments.length?(o[0]=t,o[1]=t,o[2]=t,o[3]=t):4===arguments.length?(o[0]=t,o[1]=r,o[2]=i):5===arguments.length&&(o[0]=t,o[1]=r,o[2]=i,o[3]=n)}return this},a.prototype.fill=function(){return this._renderer._setProperty("_fillSet",!0),this._renderer._setProperty("_doFill",!0),this._renderer.fill.apply(this._renderer,arguments),this},a.prototype.noFill=function(){return this._renderer._setProperty("_doFill",!1),this},a.prototype.noStroke=function(){return this._renderer._setProperty("_doStroke",!1),this},a.prototype.stroke=function(){return this._renderer._setProperty("_strokeSet",!0),this._renderer._setProperty("_doStroke",!0),this._renderer.stroke.apply(this._renderer,arguments),this},t.exports=a},{"../core/constants":17,"../core/main":23,"./p5.Color":15}],17:[function(e,t,r){"use strict";var i=Math.PI;t.exports={P2D:"p2d",WEBGL:"webgl",ARROW:"default",CROSS:"crosshair",HAND:"pointer",MOVE:"move",TEXT:"text",WAIT:"wait",HALF_PI:i/2,PI:i,QUARTER_PI:i/4,TAU:2*i,TWO_PI:2*i,DEGREES:"degrees",RADIANS:"radians",DEG_TO_RAD:i/180,RAD_TO_DEG:180/i,CORNER:"corner",CORNERS:"corners",RADIUS:"radius",RIGHT:"right",LEFT:"left",CENTER:"center",TOP:"top",BOTTOM:"bottom",BASELINE:"alphabetic",POINTS:0,LINES:1,LINE_STRIP:3,LINE_LOOP:2,TRIANGLES:4,TRIANGLE_FAN:6,TRIANGLE_STRIP:5,QUADS:"quads",QUAD_STRIP:"quad_strip",CLOSE:"close",OPEN:"open",CHORD:"chord",PIE:"pie",PROJECT:"square",SQUARE:"butt",ROUND:"round",BEVEL:"bevel",MITER:"miter",RGB:"rgb",HSB:"hsb",HSL:"hsl",AUTO:"auto",ALT:18,BACKSPACE:8,CONTROL:17,DELETE:46,DOWN_ARROW:40,ENTER:13,ESCAPE:27,LEFT_ARROW:37,OPTION:18,RETURN:13,RIGHT_ARROW:39,SHIFT:16,TAB:9,UP_ARROW:38,BLEND:"source-over",ADD:"lighter",DARKEST:"darken",LIGHTEST:"lighten",DIFFERENCE:"difference",SUBTRACT:"subtract",EXCLUSION:"exclusion",MULTIPLY:"multiply",SCREEN:"screen",REPLACE:"copy",OVERLAY:"overlay",HARD_LIGHT:"hard-light",SOFT_LIGHT:"soft-light",DODGE:"color-dodge",BURN:"color-burn",THRESHOLD:"threshold",GRAY:"gray",OPAQUE:"opaque",INVERT:"invert",POSTERIZE:"posterize",DILATE:"dilate",ERODE:"erode",BLUR:"blur",NORMAL:"normal",ITALIC:"italic",BOLD:"bold",BOLDITALIC:"bold italic",_DEFAULT_TEXT_FILL:"#000000",_DEFAULT_LEADMULT:1.25,_CTX_MIDDLE:"middle",LINEAR:"linear",QUADRATIC:"quadratic",BEZIER:"bezier",CURVE:"curve",STROKE:"stroke",FILL:"fill",TEXTURE:"texture",IMMEDIATE:"immediate",IMAGE:"image",NEAREST:"nearest",REPEAT:"repeat",CLAMP:"clamp",MIRROR:"mirror",LANDSCAPE:"landscape",PORTRAIT:"portrait",_DEFAULT_STROKE:"#000000",_DEFAULT_FILL:"#FFFFFF",GRID:"grid",AXES:"axes"}},{}],18:[function(e,t,r){"use strict";var i=e("./main"),n=e("./constants"),a=[n.ARROW,n.CROSS,n.HAND,n.MOVE,n.TEXT,n.WAIT];i.prototype._frameRate=0,i.prototype._lastFrameTime=window.performance.now(),i.prototype._targetFrameRate=60;var o=window.print;function s(){return window.innerWidth||document.documentElement&&document.documentElement.clientWidth||document.body&&document.body.clientWidth||0}function h(){return window.innerHeight||document.documentElement&&document.documentElement.clientHeight||document.body&&document.body.clientHeight||0}i.prototype.print=function(){arguments.length?console.log.apply(console,arguments):o()},i.prototype.frameCount=0,i.prototype.deltaTime=0,i.prototype.focused=document.hasFocus(),i.prototype.cursor=function(e,t,r){var i="auto",n=this._curElement.elt;if(-1<a.indexOf(e))i=e;else if("string"==typeof e){var o="";t&&r&&"number"==typeof t&&"number"==typeof r&&(o=t+" "+r),i="http://"===e.substring(0,7)||"https://"===e.substring(0,8)?"url("+e+") "+o+", auto":/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(e)?"url("+e+") "+o+", auto":e}n.style.cursor=i},i.prototype.frameRate=function(e){return i._validateParameters("frameRate",arguments),"number"!=typeof e||e<0?this._frameRate:(this._setProperty("_targetFrameRate",e),this)},i.prototype.getFrameRate=function(){return this.frameRate()},i.prototype.setFrameRate=function(e){return this.frameRate(e)},i.prototype.noCursor=function(){this._curElement.elt.style.cursor="none"},i.prototype.displayWidth=screen.width,i.prototype.displayHeight=screen.height,i.prototype.windowWidth=s(),i.prototype.windowHeight=h(),i.prototype._onresize=function(e){this._setProperty("windowWidth",s()),this._setProperty("windowHeight",h());var t,r=this._isGlobal?window:this;"function"==typeof r.windowResized&&(void 0===(t=r.windowResized(e))||t||e.preventDefault())},i.prototype.width=0,i.prototype.height=0,i.prototype.fullscreen=function(e){if(i._validateParameters("fullscreen",arguments),void 0===e)return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;e?function(e){if(!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled))throw new Error("Fullscreen not enabled in this browser.");e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}(document.documentElement):document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()},i.prototype.pixelDensity=function(e){var t;return i._validateParameters("pixelDensity",arguments),"number"==typeof e?(e!==this._pixelDensity&&(this._pixelDensity=e,this._pixelsDirty=!0),(t=this).resizeCanvas(this.width,this.height,!0)):t=this._pixelDensity,t},i.prototype.displayDensity=function(){return window.devicePixelRatio},i.prototype.getURL=function(){return location.href},i.prototype.getURLPath=function(){return location.pathname.split("/").filter(function(e){return""!==e})},i.prototype.getURLParams=function(){for(var e,t=/[?&]([^&=]+)(?:[&=])([^&=]+)/gim,r={};null!=(e=t.exec(location.search));)e.index===t.lastIndex&&t.lastIndex++,r[e[1]]=e[2];return r},t.exports=i},{"./constants":17,"./main":23}],19:[function(n,e,t){"use strict";var o=n("./main");n("./constants");o._validateParameters=o._friendlyFileLoadError=o._friendlyError=function(){};var a=null,r=function(t,r){var i,e;r||(r=console.log.bind(console)),a||(i={},(a=[].concat((e=function(r){return Object.getOwnPropertyNames(r).filter(function(e){return"_"!==e[0]&&!(e in i)&&(i[e]=!0)}).map(function(e){var t;return t="function"==typeof r[e]?"function":e===e.toUpperCase()?"constant":"variable",{name:e,type:t}})})(o.prototype),e(n("./constants")))).sort(function(e,t){return t.name.length-e.name.length})),a.some(function(e){if(t.message&&null!==t.message.match("\\W?"+e.name+"\\W"))return r("Did you just try to use p5.js's "+e.name+("function"===e.type?"() ":" ")+e.type+"? If so, you may want to move it into your sketch's setup() function.\n\nFor more details, see: https://github.com/processing/p5.js/wiki/p5.js-overview#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup"),!0})};o.prototype._helpForMisusedAtTopLevelCode=r,"complete"!==document.readyState&&(window.addEventListener("error",r,!1),window.addEventListener("load",function(){window.removeEventListener("error",r,!1)})),e.exports=o},{"../../docs/reference/data.json":void 0,"./constants":17,"./main":23}],20:[function(e,t,r){"use strict";var o=e("./constants");t.exports={modeAdjust:function(e,t,r,i,n){return n===o.CORNER?{x:e,y:t,w:r,h:i}:n===o.CORNERS?{x:e,y:t,w:r-e,h:i-t}:n===o.RADIUS?{x:e-r,y:t-i,w:2*r,h:2*i}:n===o.CENTER?{x:e-.5*r,y:t-.5*i,w:r,h:i}:void 0}}},{"./constants":17}],21:[function(e,t,r){"use strict";var i=e("../core/main"),n=function(){window.mocha||(window.setup&&"function"==typeof window.setup||window.draw&&"function"==typeof window.draw)&&!i.instance&&new i};"complete"===document.readyState?n():window.addEventListener("load",n,!1)},{"../core/main":23}],22:[function(e,t,r){"use strict";var i=e("./main");i.prototype.pushStyle=function(){throw new Error("pushStyle() not used, see push()")},i.prototype.popStyle=function(){throw new Error("popStyle() not used, see pop()")},i.prototype.popMatrix=function(){throw new Error("popMatrix() not used, see pop()")},i.prototype.printMatrix=function(){throw new Error("printMatrix() is not implemented in p5.js, refer to [https://simonsarris.com/a-transformation-class-for-canvas-to-keep-track-of-the-transformation-matrix/] to add your own implementation.")},i.prototype.pushMatrix=function(){throw new Error("pushMatrix() not used, see push()")},t.exports=i},{"./main":23}],23:[function(e,t,r){"use strict";e("./shim");var i=e("./constants"),n=function h(e,t,r){this._setupDone=!1,this._pixelDensity=Math.ceil(window.devicePixelRatio)||1,this._userNode=t,this._curElement=null,this._elements=[],this._glAttributes=null,this._requestAnimId=0,this._preloadCount=0,this._isGlobal=!1,this._loop=!0,this._initializeInstanceVariables(),this._defaultCanvasSize={width:100,height:100},this._events={mousemove:null,mousedown:null,mouseup:null,dragend:null,dragover:null,click:null,dblclick:null,mouseover:null,mouseout:null,keydown:null,keyup:null,keypress:null,touchstart:null,touchmove:null,touchend:null,resize:null,blur:null},this._events.wheel=null,this._loadingScreenId="p5_loading",this._registeredMethods={};for(var i=Object.getOwnPropertyNames(h.prototype._registeredMethods),n=0;n<i.length;n++){var o=i[n];this._registeredMethods[o]=h.prototype._registeredMethods[o].slice()}window.DeviceOrientationEvent&&(this._events.deviceorientation=null),window.DeviceMotionEvent&&!window._isNodeWebkit&&(this._events.devicemotion=null),this._start=function(){this._userNode&&"string"==typeof this._userNode&&(this._userNode=document.getElementById(this._userNode));var e=(this._isGlobal?window:this).preload;if(e){var t=document.getElementById(this._loadingScreenId);if(!t)(t=document.createElement("div")).innerHTML="Loading...",t.style.position="absolute",t.id=this._loadingScreenId,(this._userNode||document.body).appendChild(t);var r=this._preloadMethods;for(var i in r){r[i]=r[i]||h;var n=r[i];n!==h.prototype&&n!==h||(this._isGlobal&&(window[i]=this._wrapPreload(this,i)),n=this),this._registeredPreloadMethods[i]=n[i],n[i]=this._wrapPreload(n,i)}e(),this._runIfPreloadsAreDone()}else this._setup(),this._draw()}.bind(this),this._runIfPreloadsAreDone=function(){var e=this._isGlobal?window:this;if(0===e._preloadCount){var t=document.getElementById(e._loadingScreenId);t&&t.parentNode.removeChild(t),e._setup(),e._draw()}},this._decrementPreload=function(){var e=this._isGlobal?window:this;"function"==typeof e.preload&&(e._setProperty("_preloadCount",e._preloadCount-1),e._runIfPreloadsAreDone())},this._wrapPreload=function(e,t){return function(){return this._incrementPreload(),this._registeredPreloadMethods[t].apply(e,arguments)}.bind(this)},this._incrementPreload=function(){var e=this._isGlobal?window:this;e._setProperty("_preloadCount",e._preloadCount+1)},this._setup=function(){this.createCanvas(this._defaultCanvasSize.width,this._defaultCanvasSize.height,"p2d");var e=this._isGlobal?window:this;if("function"==typeof e.preload)for(var t in this._preloadMethods)e[t]=this._preloadMethods[t][t],e[t]&&this&&(e[t]=e[t].bind(this));"function"==typeof e.setup&&e.setup();for(var r=document.getElementsByTagName("canvas"),i=0;i<r.length;i++){var n=r[i];"true"===n.dataset.hidden&&(n.style.visibility="",delete n.dataset.hidden)}this._setupDone=!0}.bind(this),this._draw=function(){var e=window.performance.now(),t=e-this._lastFrameTime,r=1e3/this._targetFrameRate;(!this._loop||r-5<=t)&&(this.redraw(),this._frameRate=1e3/(e-this._lastFrameTime),this.deltaTime=e-this._lastFrameTime,this._setProperty("deltaTime",this.deltaTime),this._lastFrameTime=e,void 0!==this._updateMouseCoords&&this._updateMouseCoords()),this._loop&&(this._requestAnimId=window.requestAnimationFrame(this._draw))}.bind(this),this._setProperty=function(e,t){this[e]=t,this._isGlobal&&(window[e]=t)}.bind(this),this.remove=function(){var e=document.getElementById(this._loadingScreenId);if(e&&(e.parentNode.removeChild(e),this._incrementPreload()),this._curElement){for(var t in this._loop=!1,this._requestAnimId&&window.cancelAnimationFrame(this._requestAnimId),this._events)window.removeEventListener(t,this._events[t]);for(var r=0;r<this._elements.length;r++){var i=this._elements[r];for(var n in i.elt.parentNode&&i.elt.parentNode.removeChild(i.elt),i._events)i.elt.removeEventListener(n,i._events[n])}var o=this;this._registeredMethods.remove.forEach(function(e){void 0!==e&&e.call(o)})}if(this._isGlobal){for(var a in h.prototype)try{delete window[a]}catch(e){window[a]=void 0}for(var s in this)if(this.hasOwnProperty(s))try{delete window[s]}catch(e){window[s]=void 0}h.instance=null}}.bind(this),this._registeredMethods.init.forEach(function(e){void 0!==e&&e.call(this)},this);var a=this._createFriendlyGlobalFunctionBinder();if(e)e(this);else{for(var s in this._isGlobal=!0,h.instance=this,h.prototype)if("function"==typeof h.prototype[s]){var l=s.substring(2);this._events.hasOwnProperty(l)||(Math.hasOwnProperty(s)&&Math[s]===h.prototype[s]?a(s,h.prototype[s]):a(s,h.prototype[s].bind(this)))}else a(s,h.prototype[s]);for(var u in this)this.hasOwnProperty(u)&&a(u,this[u])}for(var c in this._events){var p=this["_on"+c];if(p){var d=p.bind(this);window.addEventListener(c,d,{passive:!1}),this._events[c]=d}}var f=function(){this._setProperty("focused",!0)}.bind(this),m=function(){this._setProperty("focused",!1)}.bind(this);window.addEventListener("focus",f),window.addEventListener("blur",m),this.registerMethod("remove",function(){window.removeEventListener("focus",f),window.removeEventListener("blur",m)}),"complete"===document.readyState?this._start():window.addEventListener("load",this._start.bind(this),!1)};for(var o in n.prototype._initializeInstanceVariables=function(){this._styles=[],this._bezierDetail=20,this._curveDetail=20,this._colorMode=i.RGB,this._colorMaxes={rgb:[255,255,255,255],hsb:[360,100,100,1],hsl:[360,100,100,1]},this._pixelsDirty=!0,this._downKeys={}},n.instance=null,n.disableFriendlyErrors=!1,i)n.prototype[o]=i[o];n.prototype._preloadMethods={loadJSON:n.prototype,loadImage:n.prototype,loadStrings:n.prototype,loadXML:n.prototype,loadBytes:n.prototype,loadTable:n.prototype,loadFont:n.prototype,loadModel:n.prototype,loadShader:n.prototype},n.prototype._registeredMethods={init:[],pre:[],post:[],remove:[]},n.prototype._registeredPreloadMethods={},n.prototype.registerPreloadMethod=function(e,t){n.prototype._preloadMethods.hasOwnProperty(e)||(n.prototype._preloadMethods[e]=t)},n.prototype.registerMethod=function(e,t){var r=this||n.prototype;r._registeredMethods.hasOwnProperty(e)||(r._registeredMethods[e]=[]),r._registeredMethods[e].push(t)},n.prototype._createFriendlyGlobalFunctionBinder=function(e){var r=(e=e||{}).globalObject||window;e.log||console.log.bind(console);return function(e,t){r[e]=t}},t.exports=n},{"./constants":17,"./shim":33}],24:[function(e,t,r){"use strict";var n=e("./main");n.Element=function(e,t){this.elt=e,this._pInst=this._pixelsState=t,this._events={},this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight},n.Element.prototype.parent=function(e){return void 0===e?this.elt.parentNode:("string"==typeof e?("#"===e[0]&&(e=e.substring(1)),e=document.getElementById(e)):e instanceof n.Element&&(e=e.elt),e.appendChild(this.elt),this)},n.Element.prototype.id=function(e){return void 0===e?this.elt.id:(this.elt.id=e,this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight,this)},n.Element.prototype.class=function(e){return void 0===e?this.elt.className:(this.elt.className=e,this)},n.Element.prototype.mousePressed=function(t){return n.Element._adjustListener("mousedown",function(e){return this._pInst._setProperty("mouseIsPressed",!0),this._pInst._setMouseButton(e),t.call(this)},this),this},n.Element.prototype.doubleClicked=function(e){return n.Element._adjustListener("dblclick",e,this),this},n.Element.prototype.mouseWheel=function(e){return n.Element._adjustListener("wheel",e,this),this},n.Element.prototype.mouseReleased=function(e){return n.Element._adjustListener("mouseup",e,this),this},n.Element.prototype.mouseClicked=function(e){return n.Element._adjustListener("click",e,this),this},n.Element.prototype.mouseMoved=function(e){return n.Element._adjustListener("mousemove",e,this),this},n.Element.prototype.mouseOver=function(e){return n.Element._adjustListener("mouseover",e,this),this},n.Element.prototype.mouseOut=function(e){return n.Element._adjustListener("mouseout",e,this),this},n.Element.prototype.touchStarted=function(e){return n.Element._adjustListener("touchstart",e,this),this},n.Element.prototype.touchMoved=function(e){return n.Element._adjustListener("touchmove",e,this),this},n.Element.prototype.touchEnded=function(e){return n.Element._adjustListener("touchend",e,this),this},n.Element.prototype.dragOver=function(e){return n.Element._adjustListener("dragover",e,this),this},n.Element.prototype.dragLeave=function(e){return n.Element._adjustListener("dragleave",e,this),this},n.Element._adjustListener=function(e,t,r){return!1===t?n.Element._detachListener(e,r):n.Element._attachListener(e,t,r),this},n.Element._attachListener=function(e,t,r){r._events[e]&&n.Element._detachListener(e,r);var i=t.bind(r);r.elt.addEventListener(e,i,!1),r._events[e]=i},n.Element._detachListener=function(e,t){var r=t._events[e];t.elt.removeEventListener(e,r,!1),t._events[e]=null},n.Element.prototype._setProperty=function(e,t){this[e]=t},t.exports=n.Element},{"./main":23}],25:[function(e,t,r){"use strict";var s=e("./main"),h=e("./constants");s.Graphics=function(e,t,r,i){var n=r||h.P2D;this.canvas=document.createElement("canvas");var o=i._userNode||document.body;for(var a in o.appendChild(this.canvas),s.Element.call(this,this.canvas,i),s.prototype)this[a]||("function"==typeof s.prototype[a]?this[a]=s.prototype[a].bind(this):this[a]=s.prototype[a]);return s.prototype._initializeInstanceVariables.apply(this),this.width=e,this.height=t,this._pixelDensity=i._pixelDensity,n===h.WEBGL?this._renderer=new s.RendererGL(this.canvas,this,!1):this._renderer=new s.Renderer2D(this.canvas,this,!1),i._elements.push(this),this._renderer.resize(e,t),this._renderer._applyDefaults(),this},s.Graphics.prototype=Object.create(s.Element.prototype),s.Graphics.prototype.reset=function(){this._renderer.resetMatrix(),this._renderer.isP3D&&this._renderer._update()},s.Graphics.prototype.remove=function(){this.elt.parentNode&&this.elt.parentNode.removeChild(this.elt);var e=this._pInst._elements.indexOf(this);for(var t in-1!==e&&this._pInst._elements.splice(e,1),this._events)this.elt.removeEventListener(t,this._events[t])},t.exports=s.Graphics},{"./constants":17,"./main":23}],26:[function(e,t,r){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var h=e("./main"),y=e("../core/constants");function s(e){var t=0,r=0;if(e.offsetParent)for(;t+=e.offsetLeft,r+=e.offsetTop,e=e.offsetParent;);else t+=e.offsetLeft,r+=e.offsetTop;return[t,r]}h.Renderer=function(e,t,r){h.Element.call(this,e,t),this.canvas=e,this._pixelsState=t,r?(this._isMainCanvas=!0,this._pInst._setProperty("_curElement",this),this._pInst._setProperty("canvas",this.canvas),this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height)):(this.canvas.style.display="none",this._styles=[]),this._textSize=12,this._textLeading=15,this._textFont="sans-serif",this._textStyle=y.NORMAL,this._textAscent=null,this._textDescent=null,this._textAlign=y.LEFT,this._textBaseline=y.BASELINE,this._rectMode=y.CORNER,this._ellipseMode=y.CENTER,this._curveTightness=0,this._imageMode=y.CORNER,this._tint=null,this._doStroke=!0,this._doFill=!0,this._strokeSet=!1,this._fillSet=!1},h.Renderer.prototype=Object.create(h.Element.prototype),h.Renderer.prototype.push=function(){return{properties:{_doStroke:this._doStroke,_strokeSet:this._strokeSet,_doFill:this._doFill,_fillSet:this._fillSet,_tint:this._tint,_imageMode:this._imageMode,_rectMode:this._rectMode,_ellipseMode:this._ellipseMode,_textFont:this._textFont,_textLeading:this._textLeading,_textSize:this._textSize,_textAlign:this._textAlign,_textBaseline:this._textBaseline,_textStyle:this._textStyle}}},h.Renderer.prototype.pop=function(e){e.properties&&Object.assign(this,e.properties)},h.Renderer.prototype.resize=function(e,t){this.width=e,this.height=t,this.elt.width=e*this._pInst._pixelDensity,this.elt.height=t*this._pInst._pixelDensity,this.elt.style.width=e+"px",this.elt.style.height=t+"px",this._isMainCanvas&&(this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height))},h.Renderer.prototype.get=function(e,t,r,i){var n=this._pixelsState,o=n._pixelDensity,a=this.canvas;if(void 0===e&&void 0===t)e=t=0,r=n.width,i=n.height;else if(e*=o,t*=o,void 0===r&&void 0===i)return e<0||t<0||e>=a.width||t>=a.height?[0,0,0,0]:this._getPixel(e,t);var s=new h.Image(r,i);return s.canvas.getContext("2d").drawImage(a,e,t,r*o,i*o,0,0,r,i),s},h.Renderer.prototype.textLeading=function(e){return"number"==typeof e?(this._setProperty("_textLeading",e),this._pInst):this._textLeading},h.Renderer.prototype.textSize=function(e){return"number"==typeof e?(this._setProperty("_textSize",e),this._setProperty("_textLeading",e*y._DEFAULT_LEADMULT),this._applyTextProperties()):this._textSize},h.Renderer.prototype.textStyle=function(e){return e?(e!==y.NORMAL&&e!==y.ITALIC&&e!==y.BOLD&&e!==y.BOLDITALIC||this._setProperty("_textStyle",e),this._applyTextProperties()):this._textStyle},h.Renderer.prototype.textAscent=function(){return null===this._textAscent&&this._updateTextMetrics(),this._textAscent},h.Renderer.prototype.textDescent=function(){return null===this._textDescent&&this._updateTextMetrics(),this._textDescent},h.Renderer.prototype.textAlign=function(e,t){return void 0!==e?(this._setProperty("_textAlign",e),void 0!==t&&this._setProperty("_textBaseline",t),this._applyTextProperties()):{horizontal:this._textAlign,vertical:this._textBaseline}},h.Renderer.prototype.text=function(e,t,r,i,n){var o,a,s,h,l,u,c,p,d=this._pInst,f=Number.MAX_VALUE;if((this._doFill||this._doStroke)&&void 0!==e){if("string"!=typeof e&&(e=e.toString()),o=(e=e.replace(/(\t)/g,"  ")).split("\n"),void 0!==i){for(s=p=0;s<o.length;s++)for(l="",c=o[s].split(" "),a=0;a<c.length;a++)u=l+c[a]+" ",i<this.textWidth(u)?(l=c[a]+" ",p+=d.textLeading()):l=u;switch(this._rectMode===y.CENTER&&(t-=i/2,r-=n/2),this._textAlign){case y.CENTER:t+=i/2;break;case y.RIGHT:t+=i}var m=!1;if(void 0!==n){switch(this._textBaseline){case y.BOTTOM:r+=n-p;break;case y.CENTER:r+=(n-p)/2;break;case y.BASELINE:m=!0,this._textBaseline=y.TOP}f=r+n-d.textAscent()}for(s=0;s<o.length;s++){for(l="",c=o[s].split(" "),a=0;a<c.length;a++)u=l+c[a]+" ",i<this.textWidth(u)&&0<l.length?(this._renderText(d,l,t,r,f),l=c[a]+" ",r+=d.textLeading()):l=u;this._renderText(d,l,t,r,f),r+=d.textLeading(),m&&(this._textBaseline=y.BASELINE)}}else{var v=0,g=d.textAlign().vertical;for(g===y.CENTER?v=(o.length-1)*d.textLeading()/2:g===y.BOTTOM&&(v=(o.length-1)*d.textLeading()),h=0;h<o.length;h++)this._renderText(d,o[h],t,r-v,f),r+=d.textLeading()}return d}},h.Renderer.prototype._applyDefaults=function(){return this},h.Renderer.prototype._isOpenType=function(e){return"object"===i(e=e||this._textFont)&&e.font&&e.font.supported},h.Renderer.prototype._updateTextMetrics=function(){if(this._isOpenType())return this._setProperty("_textAscent",this._textFont._textAscent()),this._setProperty("_textDescent",this._textFont._textDescent()),this;var e=document.createElement("span");e.style.fontFamily=this._textFont,e.style.fontSize=this._textSize+"px",e.innerHTML="ABCjgq|";var t=document.createElement("div");t.style.display="inline-block",t.style.width="1px",t.style.height="0px";var r=document.createElement("div");r.appendChild(e),r.appendChild(t),r.style.height="0px",r.style.overflow="hidden",document.body.appendChild(r),t.style.verticalAlign="baseline";var i=s(t),n=s(e),o=i[1]-n[1];t.style.verticalAlign="bottom",i=s(t),n=s(e);var a=i[1]-n[1]-o;return document.body.removeChild(r),this._setProperty("_textAscent",o),this._setProperty("_textDescent",a),this},t.exports=h.Renderer},{"../core/constants":17,"./main":23}],27:[function(e,t,r){"use strict";var c=e("./main"),f=e("./constants"),p=e("../image/filters");e("./p5.Renderer");var m="rgba(0,0,0,0)";c.Renderer2D=function(e,t,r){return c.Renderer.call(this,e,t,r),this.drawingContext=this.canvas.getContext("2d"),this._pInst._setProperty("drawingContext",this.drawingContext),this},c.Renderer2D.prototype=Object.create(c.Renderer.prototype),c.Renderer2D.prototype._applyDefaults=function(){this._cachedFillStyle=this._cachedStrokeStyle=void 0,this._setFill(f._DEFAULT_FILL),this._setStroke(f._DEFAULT_STROKE),this.drawingContext.lineCap=f.ROUND,this.drawingContext.font="normal 12px sans-serif"},c.Renderer2D.prototype.resize=function(e,t){c.Renderer.prototype.resize.call(this,e,t),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity)},c.Renderer2D.prototype.background=function(){if(this.drawingContext.save(),this.resetMatrix(),arguments[0]instanceof c.Image)this._pInst.image(arguments[0],0,0,this.width,this.height);else{var e=this._getFill(),t=this._pInst.color.apply(this._pInst,arguments).toString();this._setFill(t),this.drawingContext.fillRect(0,0,this.width,this.height),this._setFill(e)}this.drawingContext.restore(),this._pixelsState._pixelsDirty=!0},c.Renderer2D.prototype.clear=function(){this.drawingContext.save(),this.resetMatrix(),this.drawingContext.clearRect(0,0,this.width,this.height),this.drawingContext.restore(),this._pixelsState._pixelsDirty=!0},c.Renderer2D.prototype.fill=function(){var e=this._pInst.color.apply(this._pInst,arguments);this._setFill(e.toString())},c.Renderer2D.prototype.stroke=function(){var e=this._pInst.color.apply(this._pInst,arguments);this._setStroke(e.toString())},c.Renderer2D.prototype.image=function(e,t,r,i,n,o,a,s,h){var l;try{this._tint&&(c.MediaElement&&e instanceof c.MediaElement&&e.loadPixels(),e.canvas&&(l=this._getTintedImageCanvas(e))),l||(l=e.canvas||e.elt);var u=1;e.width&&0<e.width&&(u=l.width/e.width),this.drawingContext.drawImage(l,u*t,u*r,u*i,u*n,o,a,s,h)}catch(e){if("NS_ERROR_NOT_AVAILABLE"!==e.name)throw e}this._pixelsState._pixelsDirty=!0},c.Renderer2D.prototype._getTintedImageCanvas=function(e){if(!e.canvas)return e;var t=p._toPixels(e.canvas),r=document.createElement("canvas");r.width=e.canvas.width,r.height=e.canvas.height;for(var i=r.getContext("2d"),n=i.createImageData(e.canvas.width,e.canvas.height),o=n.data,a=0;a<t.length;a+=4){var s=t[a],h=t[a+1],l=t[a+2],u=t[a+3];o[a]=s*this._tint[0]/255,o[a+1]=h*this._tint[1]/255,o[a+2]=l*this._tint[2]/255,o[a+3]=u*this._tint[3]/255}return i.putImageData(n,0,0),r},c.Renderer2D.prototype.blendMode=function(e){if(e===f.SUBTRACT)console.warn("blendMode(SUBTRACT) only works in WEBGL mode.");else{if(e!==f.BLEND&&e!==f.DARKEST&&e!==f.LIGHTEST&&e!==f.DIFFERENCE&&e!==f.MULTIPLY&&e!==f.EXCLUSION&&e!==f.SCREEN&&e!==f.REPLACE&&e!==f.OVERLAY&&e!==f.HARD_LIGHT&&e!==f.SOFT_LIGHT&&e!==f.DODGE&&e!==f.BURN&&e!==f.ADD)throw new Error("Mode "+e+" not recognized.");this.drawingContext.globalCompositeOperation=e}},c.Renderer2D.prototype.blend=function(){var e=this.drawingContext.globalCompositeOperation,t=arguments[arguments.length-1],r=Array.prototype.slice.call(arguments,0,arguments.length-1);this.drawingContext.globalCompositeOperation=t,this._pInst?this._pInst.copy.apply(this._pInst,r):this.copy.apply(this,r),this.drawingContext.globalCompositeOperation=e},c.Renderer2D.prototype.copy=function(){var e,t,r,i,n,o,a,s,h;if(9===arguments.length)e=arguments[0],t=arguments[1],r=arguments[2],i=arguments[3],n=arguments[4],o=arguments[5],a=arguments[6],s=arguments[7],h=arguments[8];else{if(8!==arguments.length)throw new Error("Signature not supported");e=this._pInst,t=arguments[0],r=arguments[1],i=arguments[2],n=arguments[3],o=arguments[4],a=arguments[5],s=arguments[6],h=arguments[7]}c.Renderer2D._copyHelper(this,e,t,r,i,n,o,a,s,h),this._pixelsState._pixelsDirty=!0},c.Renderer2D._copyHelper=function(e,t,r,i,n,o,a,s,h,l){t.loadPixels();var u=t.canvas.width/t.width;e.drawingContext.drawImage(t.canvas,u*r,u*i,u*n,u*o,a,s,h,l)},c.Renderer2D.prototype._getPixel=function(e,t){var r,i,n=this._pixelsState;return i=n._pixelsDirty?(r=this.drawingContext.getImageData(e,t,1,1).data,0):(r=n.pixels,4*(Math.floor(e)+Math.floor(t)*this.canvas.width)),[r[i+0],r[i+1],r[i+2],r[i+3]]},c.Renderer2D.prototype.loadPixels=function(){var e=this._pixelsState;if(e._pixelsDirty){e._pixelsDirty=!1;var t=e._pixelDensity,r=this.width*t,i=this.height*t,n=this.drawingContext.getImageData(0,0,r,i);e._setProperty("imageData",n),e._setProperty("pixels",n.data)}},c.Renderer2D.prototype.set=function(e,t,r){e=Math.floor(e),t=Math.floor(t);var i=this._pixelsState;if(r instanceof c.Image)this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(i._pixelDensity,i._pixelDensity),this.drawingContext.drawImage(r.canvas,e,t),this.drawingContext.restore(),i._pixelsDirty=!0;else{var n=0,o=0,a=0,s=0,h=4*(t*i._pixelDensity*(this.width*i._pixelDensity)+e*i._pixelDensity);if(i.imageData&&!i._pixelsDirty||i.loadPixels.call(i),"number"==typeof r)h<i.pixels.length&&(a=o=n=r,s=255);else if(r instanceof Array){if(r.length<4)throw new Error("pixel array must be of the form [R, G, B, A]");h<i.pixels.length&&(n=r[0],o=r[1],a=r[2],s=r[3])}else r instanceof c.Color&&h<i.pixels.length&&(n=r.levels[0],o=r.levels[1],a=r.levels[2],s=r.levels[3]);for(var l=0;l<i._pixelDensity;l++)for(var u=0;u<i._pixelDensity;u++)h=4*((t*i._pixelDensity+u)*this.width*i._pixelDensity+(e*i._pixelDensity+l)),i.pixels[h]=n,i.pixels[h+1]=o,i.pixels[h+2]=a,i.pixels[h+3]=s}},c.Renderer2D.prototype.updatePixels=function(e,t,r,i){var n=this._pixelsState,o=n._pixelDensity;void 0===e&&void 0===t&&void 0===r&&void 0===i&&(t=e=0,r=this.width,i=this.height),e*=o,t*=o,r*=o,i*=o,this.drawingContext.putImageData(n.imageData,e,t,0,0,r,i),0===e&&0===t&&r===this.width&&i===this.height||(n._pixelsDirty=!0)},c.Renderer2D.prototype._acuteArcToBezier=function(e,t){var r=t/2,i=Math.cos(r),n=Math.sin(r),o=1/Math.tan(r),a=e+r,s=Math.cos(a),h=Math.sin(a),l=(4-i)/3,u=n+(i-l)*o;return{ax:Math.cos(e).toFixed(7),ay:Math.sin(e).toFixed(7),bx:(l*s+u*h).toFixed(7),by:(l*h-u*s).toFixed(7),cx:(l*s-u*h).toFixed(7),cy:(l*h+u*s).toFixed(7),dx:Math.cos(e+t).toFixed(7),dy:Math.sin(e+t).toFixed(7)}},c.Renderer2D.prototype.arc=function(r,i,e,t,n,o,a){var s=this.drawingContext,h=e/2,l=t/2,u=0,c=[];for(r+=h,i+=l;1e-5<=o-n;)u=Math.min(o-n,f.HALF_PI),c.push(this._acuteArcToBezier(n,u)),n+=u;return this._doFill&&(s.beginPath(),c.forEach(function(e,t){0===t&&s.moveTo(r+e.ax*h,i+e.ay*l),s.bezierCurveTo(r+e.bx*h,i+e.by*l,r+e.cx*h,i+e.cy*l,r+e.dx*h,i+e.dy*l)}),a!==f.PIE&&null!=a||s.lineTo(r,i),s.closePath(),s.fill(),this._pixelsState._pixelsDirty=!0),this._doStroke&&(s.beginPath(),c.forEach(function(e,t){0===t&&s.moveTo(r+e.ax*h,i+e.ay*l),s.bezierCurveTo(r+e.bx*h,i+e.by*l,r+e.cx*h,i+e.cy*l,r+e.dx*h,i+e.dy*l)}),a===f.PIE?(s.lineTo(r,i),s.closePath()):a===f.CHORD&&s.closePath(),s.stroke(),this._pixelsState._pixelsDirty=!0),this},c.Renderer2D.prototype.ellipse=function(e){var t=this.drawingContext,r=this._doFill,i=this._doStroke,n=e[0],o=e[1],a=e[2],s=e[3];if(r&&!i){if(this._getFill()===m)return this}else if(!r&&i&&this._getStroke()===m)return this;var h=a/2*.5522847498,l=s/2*.5522847498,u=n+a,c=o+s,p=n+a/2,d=o+s/2;t.beginPath(),t.moveTo(n,d),t.bezierCurveTo(n,d-l,p-h,o,p,o),t.bezierCurveTo(p+h,o,u,d-l,u,d),t.bezierCurveTo(u,d+l,p+h,c,p,c),t.bezierCurveTo(p-h,c,n,d+l,n,d),t.closePath(),r&&(t.fill(),this._pixelsState._pixelsDirty=!0),i&&(t.stroke(),this._pixelsState._pixelsDirty=!0)},c.Renderer2D.prototype.line=function(e,t,r,i){var n=this.drawingContext;return this._doStroke&&(this._getStroke()===m||(n.beginPath(),n.moveTo(e,t),n.lineTo(r,i),n.stroke(),this._pixelsState._pixelsDirty=!0)),this},c.Renderer2D.prototype.point=function(e,t){var r=this.drawingContext;if(!this._doStroke)return this;if(this._getStroke()===m)return this;var i=this._getStroke(),n=this._getFill();e=Math.round(e),t=Math.round(t),this._setFill(i),1<r.lineWidth?(r.beginPath(),r.arc(e,t,r.lineWidth/2,0,f.TWO_PI,!1),r.fill()):r.fillRect(e,t,1,1),this._setFill(n),this._pixelsState._pixelsDirty=!0},c.Renderer2D.prototype.quad=function(e,t,r,i,n,o,a,s){var h=this.drawingContext,l=this._doFill,u=this._doStroke;if(l&&!u){if(this._getFill()===m)return this}else if(!l&&u&&this._getStroke()===m)return this;return h.beginPath(),h.moveTo(e,t),h.lineTo(r,i),h.lineTo(n,o),h.lineTo(a,s),h.closePath(),l&&h.fill(),u&&h.stroke(),this._pixelsState._pixelsDirty=!0,this},c.Renderer2D.prototype.rect=function(e){var t=e[0],r=e[1],i=e[2],n=e[3],o=e[4],a=e[5],s=e[6],h=e[7],l=this.drawingContext,u=this._doFill,c=this._doStroke;if(u&&!c){if(this._getFill()===m)return this}else if(!u&&c&&this._getStroke()===m)return this;if(l.beginPath(),void 0===o)l.rect(t,r,i,n);else{void 0===a&&(a=o),void 0===s&&(s=a),void 0===h&&(h=s);var p=i/2,d=n/2;i<2*o&&(o=p),n<2*o&&(o=d),i<2*a&&(a=p),n<2*a&&(a=d),i<2*s&&(s=p),n<2*s&&(s=d),i<2*h&&(h=p),n<2*h&&(h=d),l.beginPath(),l.moveTo(t+o,r),l.arcTo(t+i,r,t+i,r+n,a),l.arcTo(t+i,r+n,t,r+n,s),l.arcTo(t,r+n,t,r,h),l.arcTo(t,r,t+i,r,o),l.closePath()}return this._doFill&&l.fill(),this._doStroke&&l.stroke(),this._pixelsState._pixelsDirty=!0,this},c.Renderer2D.prototype.triangle=function(e){var t=this.drawingContext,r=this._doFill,i=this._doStroke,n=e[0],o=e[1],a=e[2],s=e[3],h=e[4],l=e[5];if(r&&!i){if(this._getFill()===m)return this}else if(!r&&i&&this._getStroke()===m)return this;t.beginPath(),t.moveTo(n,o),t.lineTo(a,s),t.lineTo(h,l),t.closePath(),r&&(t.fill(),this._pixelsState._pixelsDirty=!0),i&&(t.stroke(),this._pixelsState._pixelsDirty=!0)},c.Renderer2D.prototype.endShape=function(e,t,r,i,n,o,a){if(0===t.length)return this;if(!this._doStroke&&!this._doFill)return this;var s,h,l,u=e===f.CLOSE;u&&!o&&t.push(t[0]);var c=t.length;if(!r||a!==f.POLYGON&&null!==a)if(!i||a!==f.POLYGON&&null!==a)if(!n||a!==f.POLYGON&&null!==a)if(a===f.POINTS)for(h=0;h<c;h++)s=t[h],this._doStroke&&this._pInst.stroke(s[6]),this._pInst.point(s[0],s[1]);else if(a===f.LINES)for(h=0;h+1<c;h+=2)s=t[h],this._doStroke&&this._pInst.stroke(t[h+1][6]),this._pInst.line(s[0],s[1],t[h+1][0],t[h+1][1]);else if(a===f.TRIANGLES)for(h=0;h+2<c;h+=3)s=t[h],this.drawingContext.beginPath(),this.drawingContext.moveTo(s[0],s[1]),this.drawingContext.lineTo(t[h+1][0],t[h+1][1]),this.drawingContext.lineTo(t[h+2][0],t[h+2][1]),this.drawingContext.closePath(),this._doFill&&(this._pInst.fill(t[h+2][5]),this.drawingContext.fill()),this._doStroke&&(this._pInst.stroke(t[h+2][6]),this.drawingContext.stroke());else if(a===f.TRIANGLE_STRIP)for(h=0;h+1<c;h++)s=t[h],this.drawingContext.beginPath(),this.drawingContext.moveTo(t[h+1][0],t[h+1][1]),this.drawingContext.lineTo(s[0],s[1]),this._doStroke&&this._pInst.stroke(t[h+1][6]),this._doFill&&this._pInst.fill(t[h+1][5]),h+2<c&&(this.drawingContext.lineTo(t[h+2][0],t[h+2][1]),this._doStroke&&this._pInst.stroke(t[h+2][6]),this._doFill&&this._pInst.fill(t[h+2][5])),this._doFillStrokeClose(u);else if(a===f.TRIANGLE_FAN){if(2<c){for(this.drawingContext.beginPath(),h=2;h<c;h++)s=t[h],this.drawingContext.moveTo(t[0][0],t[0][1]),this.drawingContext.lineTo(t[h-1][0],t[h-1][1]),this.drawingContext.lineTo(s[0],s[1]),this.drawingContext.lineTo(t[0][0],t[0][1]),h<c-1&&(this._doFill&&s[5]!==t[h+1][5]||this._doStroke&&s[6]!==t[h+1][6])&&(this._doFill&&(this._pInst.fill(s[5]),this.drawingContext.fill(),this._pInst.fill(t[h+1][5])),this._doStroke&&(this._pInst.stroke(s[6]),this.drawingContext.stroke(),this._pInst.stroke(t[h+1][6])),this.drawingContext.closePath(),this.drawingContext.beginPath());this._doFillStrokeClose(u)}}else if(a===f.QUADS)for(h=0;h+3<c;h+=4){for(s=t[h],this.drawingContext.beginPath(),this.drawingContext.moveTo(s[0],s[1]),l=1;l<4;l++)this.drawingContext.lineTo(t[h+l][0],t[h+l][1]);this.drawingContext.lineTo(s[0],s[1]),this._doFill&&this._pInst.fill(t[h+3][5]),this._doStroke&&this._pInst.stroke(t[h+3][6]),this._doFillStrokeClose(u)}else if(a===f.QUAD_STRIP){if(3<c)for(h=0;h+1<c;h+=2)s=t[h],this.drawingContext.beginPath(),h+3<c?(this.drawingContext.moveTo(t[h+2][0],t[h+2][1]),this.drawingContext.lineTo(s[0],s[1]),this.drawingContext.lineTo(t[h+1][0],t[h+1][1]),this.drawingContext.lineTo(t[h+3][0],t[h+3][1]),this._doFill&&this._pInst.fill(t[h+3][5]),this._doStroke&&this._pInst.stroke(t[h+3][6])):(this.drawingContext.moveTo(s[0],s[1]),this.drawingContext.lineTo(t[h+1][0],t[h+1][1])),this._doFillStrokeClose(u)}else{for(this.drawingContext.beginPath(),this.drawingContext.moveTo(t[0][0],t[0][1]),h=1;h<c;h++)(s=t[h]).isVert&&(s.moveTo?this.drawingContext.moveTo(s[0],s[1]):this.drawingContext.lineTo(s[0],s[1]));this._doFillStrokeClose(u)}else{for(this.drawingContext.beginPath(),h=0;h<c;h++)t[h].isVert?t[h].moveTo?this.drawingContext.moveTo(t[h][0],t[h][1]):this.drawingContext.lineTo(t[h][0],t[h][1]):this.drawingContext.quadraticCurveTo(t[h][0],t[h][1],t[h][2],t[h][3]);this._doFillStrokeClose(u)}else{for(this.drawingContext.beginPath(),h=0;h<c;h++)t[h].isVert?t[h].moveTo?this.drawingContext.moveTo(t[h][0],t[h][1]):this.drawingContext.lineTo(t[h][0],t[h][1]):this.drawingContext.bezierCurveTo(t[h][0],t[h][1],t[h][2],t[h][3],t[h][4],t[h][5]);this._doFillStrokeClose(u)}else if(3<c){var p=[],d=1-this._curveTightness;for(this.drawingContext.beginPath(),this.drawingContext.moveTo(t[1][0],t[1][1]),h=1;h+2<c;h++)s=t[h],p[0]=[s[0],s[1]],p[1]=[s[0]+(d*t[h+1][0]-d*t[h-1][0])/6,s[1]+(d*t[h+1][1]-d*t[h-1][1])/6],p[2]=[t[h+1][0]+(d*t[h][0]-d*t[h+2][0])/6,t[h+1][1]+(d*t[h][1]-d*t[h+2][1])/6],p[3]=[t[h+1][0],t[h+1][1]],this.drawingContext.bezierCurveTo(p[1][0],p[1][1],p[2][0],p[2][1],p[3][0],p[3][1]);u&&this.drawingContext.lineTo(t[h+1][0],t[h+1][1]),this._doFillStrokeClose(u)}return o=n=i=r=!1,u&&t.pop(),this._pixelsState._pixelsDirty=!0,this},c.Renderer2D.prototype.strokeCap=function(e){return e!==f.ROUND&&e!==f.SQUARE&&e!==f.PROJECT||(this.drawingContext.lineCap=e),this},c.Renderer2D.prototype.strokeJoin=function(e){return e!==f.ROUND&&e!==f.BEVEL&&e!==f.MITER||(this.drawingContext.lineJoin=e),this},c.Renderer2D.prototype.strokeWeight=function(e){return this.drawingContext.lineWidth=void 0===e||0===e?1e-4:e,this},c.Renderer2D.prototype._getFill=function(){return this._cachedFillStyle||(this._cachedFillStyle=this.drawingContext.fillStyle),this._cachedFillStyle},c.Renderer2D.prototype._setFill=function(e){e!==this._cachedFillStyle&&(this.drawingContext.fillStyle=e,this._cachedFillStyle=e)},c.Renderer2D.prototype._getStroke=function(){return this._cachedStrokeStyle||(this._cachedStrokeStyle=this.drawingContext.strokeStyle),this._cachedStrokeStyle},c.Renderer2D.prototype._setStroke=function(e){e!==this._cachedStrokeStyle&&(this.drawingContext.strokeStyle=e,this._cachedStrokeStyle=e)},c.Renderer2D.prototype.bezier=function(e,t,r,i,n,o,a,s){return this._pInst.beginShape(),this._pInst.vertex(e,t),this._pInst.bezierVertex(r,i,n,o,a,s),this._pInst.endShape(),this},c.Renderer2D.prototype.curve=function(e,t,r,i,n,o,a,s){return this._pInst.beginShape(),this._pInst.curveVertex(e,t),this._pInst.curveVertex(r,i),this._pInst.curveVertex(n,o),this._pInst.curveVertex(a,s),this._pInst.endShape(),this},c.Renderer2D.prototype._doFillStrokeClose=function(e){e&&this.drawingContext.closePath(),this._doFill&&this.drawingContext.fill(),this._doStroke&&this.drawingContext.stroke(),this._pixelsState._pixelsDirty=!0},c.Renderer2D.prototype.applyMatrix=function(e,t,r,i,n,o){this.drawingContext.transform(e,t,r,i,n,o)},c.Renderer2D.prototype.resetMatrix=function(){return this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),this},c.Renderer2D.prototype.rotate=function(e){this.drawingContext.rotate(e)},c.Renderer2D.prototype.scale=function(e,t){return this.drawingContext.scale(e,t),this},c.Renderer2D.prototype.translate=function(e,t){return e instanceof c.Vector&&(t=e.y,e=e.x),this.drawingContext.translate(e,t),this},c.Renderer2D.prototype.text=function(e,t,r,i,n){var o;void 0!==i&&this.drawingContext.textBaseline===f.BASELINE&&(o=!0,this.drawingContext.textBaseline=f.TOP);var a=c.Renderer.prototype.text.apply(this,arguments);return o&&(this.drawingContext.textBaseline=f.BASELINE),a},c.Renderer2D.prototype._renderText=function(e,t,r,i,n){if(!(n<=i))return e.push(),this._isOpenType()?this._textFont._renderPath(t,r,i,{renderer:this}):(this._doStroke&&this._strokeSet&&this.drawingContext.strokeText(t,r,i),this._doFill&&(this._fillSet||this._setFill(f._DEFAULT_TEXT_FILL),this.drawingContext.fillText(t,r,i))),e.pop(),this._pixelsState._pixelsDirty=!0,e},c.Renderer2D.prototype.textWidth=function(e){return this._isOpenType()?this._textFont._textWidth(e,this._textSize):this.drawingContext.measureText(e).width},c.Renderer2D.prototype._applyTextProperties=function(){var e,t=this._pInst;return this._setProperty("_textAscent",null),this._setProperty("_textDescent",null),e=this._textFont,this._isOpenType()&&(e=this._textFont.font.familyName,this._setProperty("_textStyle",this._textFont.font.styleName)),this.drawingContext.font=(this._textStyle||"normal")+" "+(this._textSize||12)+"px "+(e||"sans-serif"),this.drawingContext.textAlign=this._textAlign,this._textBaseline===f.CENTER?this.drawingContext.textBaseline=f._CTX_MIDDLE:this.drawingContext.textBaseline=this._textBaseline,t},c.Renderer2D.prototype.push=function(){return this.drawingContext.save(),c.Renderer.prototype.push.apply(this)},c.Renderer2D.prototype.pop=function(e){this.drawingContext.restore(),this._cachedFillStyle=this.drawingContext.fillStyle,this._cachedStrokeStyle=this.drawingContext.strokeStyle,c.Renderer.prototype.pop.call(this,e)},t.exports=c.Renderer2D},{"../image/filters":42,"./constants":17,"./main":23,"./p5.Renderer":26}],28:[function(e,t,r){"use strict";function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var h=e("./main"),l=e("./constants");e("./p5.Graphics"),e("./p5.Renderer2D"),e("../webgl/p5.RendererGL");var u="defaultCanvas0";h.prototype.createCanvas=function(e,t,r){h._validateParameters("createCanvas",arguments);var i,n=r||l.P2D;if(n===l.WEBGL){if(i=document.getElementById(u)){i.parentNode.removeChild(i);var o=this._renderer;this._elements=this._elements.filter(function(e){return e!==o})}(i=document.createElement("canvas")).id=u,i.classList.add("p5Canvas")}else if(this._defaultGraphicsCreated)i=this.canvas;else{i=document.createElement("canvas");for(var a=0;document.getElementById("defaultCanvas"+a);)a++;u="defaultCanvas"+a,i.id=u,i.classList.add("p5Canvas")}return this._setupDone||(i.dataset.hidden=!0,i.style.visibility="hidden"),this._userNode?this._userNode.appendChild(i):document.body.appendChild(i),n===l.WEBGL?(this._setProperty("_renderer",new h.RendererGL(i,this,!0)),this._elements.push(this._renderer)):this._defaultGraphicsCreated||(this._setProperty("_renderer",new h.Renderer2D(i,this,!0)),this._defaultGraphicsCreated=!0,this._elements.push(this._renderer)),this._renderer.resize(e,t),this._renderer._applyDefaults(),this._renderer},h.prototype.resizeCanvas=function(e,t,r){if(h._validateParameters("resizeCanvas",arguments),this._renderer){var i={};for(var n in this.drawingContext){var o=this.drawingContext[n];"object"!==s(o)&&"function"!=typeof o&&(i[n]=o)}for(var a in this._renderer.resize(e,t),this.width=e,this.height=t,i)try{this.drawingContext[a]=i[a]}catch(e){}r||this.redraw()}},h.prototype.noCanvas=function(){this.canvas&&this.canvas.parentNode.removeChild(this.canvas)},h.prototype.createGraphics=function(e,t,r){return h._validateParameters("createGraphics",arguments),new h.Graphics(e,t,r,this)},h.prototype.blendMode=function(e){h._validateParameters("blendMode",arguments),e===l.NORMAL&&(console.warn("NORMAL has been deprecated for use in blendMode. defaulting to BLEND instead."),e=l.BLEND),this._renderer.blendMode(e)},t.exports=h},{"../webgl/p5.RendererGL":74,"./constants":17,"./main":23,"./p5.Graphics":25,"./p5.Renderer2D":27}],29:[function(e,t,r){"use strict";var u=e("../main"),a=e("../constants"),c=e("../helpers");e("../error_helpers"),u.prototype._normalizeArcAngles=function(e,t,r,i,n){var o;return e-=a.TWO_PI*Math.floor(e/a.TWO_PI),t-=a.TWO_PI*Math.floor(t/a.TWO_PI),o=Math.min(Math.abs(e-t),a.TWO_PI-Math.abs(e-t)),n&&(e=e<=a.HALF_PI?Math.atan(r/i*Math.tan(e)):e>a.HALF_PI&&e<=3*a.HALF_PI?Math.atan(r/i*Math.tan(e))+a.PI:Math.atan(r/i*Math.tan(e))+a.TWO_PI,t=t<=a.HALF_PI?Math.atan(r/i*Math.tan(t)):t>a.HALF_PI&&t<=3*a.HALF_PI?Math.atan(r/i*Math.tan(t))+a.PI:Math.atan(r/i*Math.tan(t))+a.TWO_PI),t<e&&(t+=a.TWO_PI),{start:e,stop:t,correspondToSamePoint:o<1e-5}},u.prototype.arc=function(e,t,r,i,n,o,a,s){if(u._validateParameters("arc",arguments),!this._renderer._doStroke&&!this._renderer._doFill)return this;n=this._toRadians(n),o=this._toRadians(o),r=Math.abs(r),i=Math.abs(i);var h=c.modeAdjust(e,t,r,i,this._renderer._ellipseMode),l=this._normalizeArcAngles(n,o,h.w,h.h,!0);return l.correspondToSamePoint?this._renderer.ellipse([h.x,h.y,h.w,h.h,s]):this._renderer.arc(h.x,h.y,h.w,h.h,l.start,l.stop,a,s),this},u.prototype.ellipse=function(e,t,r,i,n){if(u._validateParameters("ellipse",arguments),!this._renderer._doStroke&&!this._renderer._doFill)return this;r<0&&(r=Math.abs(r)),void 0===i?i=r:i<0&&(i=Math.abs(i));var o=c.modeAdjust(e,t,r,i,this._renderer._ellipseMode);return this._renderer.ellipse([o.x,o.y,o.w,o.h,n]),this},u.prototype.circle=function(){var e=Array.prototype.slice.call(arguments,0,2);return e.push(arguments[2]),e.push(arguments[2]),this.ellipse.apply(this,e)},u.prototype.line=function(){return u._validateParameters("line",arguments),this._renderer._doStroke&&this._renderer.line.apply(this._renderer,arguments),this},u.prototype.point=function(){return u._validateParameters("point",arguments),this._renderer._doStroke&&this._renderer.point.apply(this._renderer,arguments),this},u.prototype.quad=function(){return u._validateParameters("quad",arguments),(this._renderer._doStroke||this._renderer._doFill)&&(this._renderer.isP3D&&12!==arguments.length?this._renderer.quad.call(this._renderer,arguments[0],arguments[1],0,arguments[2],arguments[3],0,arguments[4],arguments[5],0,arguments[6],arguments[7],0):this._renderer.quad.apply(this._renderer,arguments)),this},u.prototype.rect=function(){if(u._validateParameters("rect",arguments),this._renderer._doStroke||this._renderer._doFill){for(var e=c.modeAdjust(arguments[0],arguments[1],arguments[2],arguments[3],this._renderer._rectMode),t=[e.x,e.y,e.w,e.h],r=4;r<arguments.length;r++)t[r]=arguments[r];this._renderer.rect(t)}return this},u.prototype.square=function(e,t,r,i,n,o,a){return this.rect(e,t,r,r,i,n,o,a)},u.prototype.triangle=function(){return u._validateParameters("triangle",arguments),(this._renderer._doStroke||this._renderer._doFill)&&this._renderer.triangle(arguments),this},t.exports=u},{"../constants":17,"../error_helpers":19,"../helpers":20,"../main":23}],30:[function(e,t,r){"use strict";var i=e("../main"),n=e("../constants");i.prototype.ellipseMode=function(e){return i._validateParameters("ellipseMode",arguments),e!==n.CORNER&&e!==n.CORNERS&&e!==n.RADIUS&&e!==n.CENTER||(this._renderer._ellipseMode=e),this},i.prototype.noSmooth=function(){return this.setAttributes("antialias",!1),"imageSmoothingEnabled"in this.drawingContext&&(this.drawingContext.imageSmoothingEnabled=!1),this},i.prototype.rectMode=function(e){return i._validateParameters("rectMode",arguments),e!==n.CORNER&&e!==n.CORNERS&&e!==n.RADIUS&&e!==n.CENTER||(this._renderer._rectMode=e),this},i.prototype.smooth=function(){return this.setAttributes("antialias",!0),"imageSmoothingEnabled"in this.drawingContext&&(this.drawingContext.imageSmoothingEnabled=!0),this},i.prototype.strokeCap=function(e){return i._validateParameters("strokeCap",arguments),e!==n.ROUND&&e!==n.SQUARE&&e!==n.PROJECT||this._renderer.strokeCap(e),this},i.prototype.strokeJoin=function(e){return i._validateParameters("strokeJoin",arguments),e!==n.ROUND&&e!==n.BEVEL&&e!==n.MITER||this._renderer.strokeJoin(e),this},i.prototype.strokeWeight=function(e){return i._validateParameters("strokeWeight",arguments),this._renderer.strokeWeight(e),this},t.exports=i},{"../constants":17,"../main":23}],31:[function(e,t,r){"use strict";var s=e("../main");e("../error_helpers"),s.prototype.bezier=function(){return s._validateParameters("bezier",arguments),(this._renderer._doStroke||this._renderer._doFill)&&this._renderer.bezier.apply(this._renderer,arguments),this},s.prototype.bezierDetail=function(e){return s._validateParameters("bezierDetail",arguments),this._bezierDetail=e,this},s.prototype.bezierPoint=function(e,t,r,i,n){s._validateParameters("bezierPoint",arguments);var o=1-n;return Math.pow(o,3)*e+3*Math.pow(o,2)*n*t+3*o*Math.pow(n,2)*r+Math.pow(n,3)*i},s.prototype.bezierTangent=function(e,t,r,i,n){s._validateParameters("bezierTangent",arguments);var o=1-n;return 3*i*Math.pow(n,2)-3*r*Math.pow(n,2)+6*r*o*n-6*t*o*n+3*t*Math.pow(o,2)-3*e*Math.pow(o,2)},s.prototype.curve=function(){return s._validateParameters("curve",arguments),this._renderer._doStroke&&this._renderer.curve.apply(this._renderer,arguments),this},s.prototype.curveDetail=function(e){return s._validateParameters("curveDetail",arguments),this._curveDetail=e<3?3:e,this},s.prototype.curveTightness=function(e){return s._validateParameters("curveTightness",arguments),this._renderer._curveTightness=e,this},s.prototype.curvePoint=function(e,t,r,i,n){s._validateParameters("curvePoint",arguments);var o=n*n*n,a=n*n;return e*(-.5*o+a-.5*n)+t*(1.5*o-2.5*a+1)+r*(-1.5*o+2*a+.5*n)+i*(.5*o-.5*a)},s.prototype.curveTangent=function(e,t,r,i,n){s._validateParameters("curveTangent",arguments);var o=n*n;return e*(-3*o/2+2*n-.5)+t*(9*o/2-5*n)+r*(-9*o/2+4*n+.5)+i*(3*o/2-n)},t.exports=s},{"../error_helpers":19,"../main":23}],32:[function(e,t,r){"use strict";var i=e("../main"),n=e("../constants"),o=null,a=[],s=[],h=!1,l=!1,u=!1,c=!1,p=!0;i.prototype.beginContour=function(){return s=[],c=!0,this},i.prototype.beginShape=function(e){return i._validateParameters("beginShape",arguments),this._renderer.isP3D?this._renderer.beginShape.apply(this._renderer,arguments):(o=e===n.POINTS||e===n.LINES||e===n.TRIANGLES||e===n.TRIANGLE_FAN||e===n.TRIANGLE_STRIP||e===n.QUADS||e===n.QUAD_STRIP?e:null,a=[],s=[]),this},i.prototype.bezierVertex=function(){if(i._validateParameters("bezierVertex",arguments),this._renderer.isP3D)this._renderer.bezierVertex.apply(this._renderer,arguments);else if(0===a.length)i._friendlyError("vertex() must be used once before calling bezierVertex()","bezierVertex");else{h=!0;for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];e.isVert=!1,c?s.push(e):a.push(e)}return this},i.prototype.curveVertex=function(){return i._validateParameters("curveVertex",arguments),this._renderer.isP3D?this._renderer.curveVertex.apply(this._renderer,arguments):(l=!0,this.vertex(arguments[0],arguments[1])),this},i.prototype.endContour=function(){var e=s[0].slice();e.isVert=s[0].isVert,e.moveTo=!1,s.push(e),p&&(a.push(a[0]),p=!1);for(var t=0;t<s.length;t++)a.push(s[t]);return this},i.prototype.endShape=function(e){if(i._validateParameters("endShape",arguments),this._renderer.isP3D)this._renderer.endShape(e,l,h,u,c,o);else{if(0===a.length)return this;if(!this._renderer._doStroke&&!this._renderer._doFill)return this;var t=e===n.CLOSE;t&&!c&&a.push(a[0]),this._renderer.endShape(e,a,l,h,u,c,o),p=!(c=u=h=l=!1),t&&a.pop()}return this},i.prototype.quadraticVertex=function(){if(i._validateParameters("quadraticVertex",arguments),this._renderer.isP3D)this._renderer.quadraticVertex.apply(this._renderer,arguments);else{if(this._contourInited){var e={};return e.x=arguments[0],e.y=arguments[1],e.x3=arguments[2],e.y3=arguments[3],e.type=n.QUADRATIC,this._contourVertices.push(e),this}if(0<a.length){u=!0;for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];t.isVert=!1,c?s.push(t):a.push(t)}else i._friendlyError("vertex() must be used once before calling quadraticVertex()","quadraticVertex")}return this},i.prototype.vertex=function(e,t,r,i,n){if(this._renderer.isP3D)this._renderer.vertex.apply(this._renderer,arguments);else{var o=[];o.isVert=!0,o[0]=e,o[1]=t,o[2]=0,o[3]=0,o[4]=0,o[5]=this._renderer._getFill(),o[6]=this._renderer._getStroke(),r&&(o.moveTo=r),c?(0===s.length&&(o.moveTo=!0),s.push(o)):a.push(o)}return this},t.exports=i},{"../constants":17,"../main":23}],33:[function(e,t,r){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/60)},"undefined"==typeof Uint8ClampedArray||Uint8ClampedArray.prototype.slice||Object.defineProperty(Uint8ClampedArray.prototype,"slice",{value:Array.prototype.slice,writable:!0,configurable:!0,enumerable:!1}),function(){if(!Object.assign){var s=Object.keys,e=Object.defineProperty,h="function"==typeof Symbol&&"symbol"===i(Symbol()),r=Object.prototype.propertyIsEnumerable,l=function(t){return function(e){return r.call(t,e)}};e(Object,"assign",{value:function(e,t){if(null==e)throw new TypeError("target must be an object");var r,i,n,o,a=Object(e);for(r=1;r<arguments.length;++r)for(i=Object(arguments[r]),o=s(i),h&&Object.getOwnPropertySymbols&&o.push.apply(o,Object.getOwnPropertySymbols(i).filter(l(i))),n=0;n<o.length;++n)a[o[n]]=i[o[n]];return a},configurable:!0,enumerable:!1,writable:!0})}}()},{}],34:[function(e,t,r){"use strict";var i=e("./main");i.prototype.noLoop=function(){this._loop=!1},i.prototype.loop=function(){this._loop||(this._loop=!0,this._setupDone&&this._draw())},i.prototype.push=function(){this._styles.push({props:{_colorMode:this._colorMode},renderer:this._renderer.push()})},i.prototype.pop=function(){var e=this._styles.pop();e?(this._renderer.pop(e.renderer),Object.assign(this,e.props)):console.warn("pop() was called without matching push()")},i.prototype.redraw=function(e){if(!this._inUserDraw&&this._setupDone){var t=parseInt(e);(isNaN(t)||t<1)&&(t=1);var r=this._isGlobal?window:this,i=r.setup,n=r.draw;if("function"==typeof n){void 0===i&&r.scale(r._pixelDensity,r._pixelDensity);for(var o=function(e){e.call(r)},a=0;a<t;a++){r.resetMatrix(),r._renderer.isP3D&&r._renderer._update(),r._setProperty("frameCount",r.frameCount+1),r._registeredMethods.pre.forEach(o),this._inUserDraw=!0;try{n()}finally{this._inUserDraw=!1}r._registeredMethods.post.forEach(o)}}}},t.exports=i},{"./main":23}],35:[function(e,t,r){"use strict";var o=e("./main");o.prototype.applyMatrix=function(e,t,r,i,n,o){return this._renderer.applyMatrix.apply(this._renderer,arguments),this},o.prototype.resetMatrix=function(){return this._renderer.resetMatrix(),this},o.prototype.rotate=function(e,t){return o._validateParameters("rotate",arguments),this._renderer.rotate(this._toRadians(e),t),this},o.prototype.rotateX=function(e){return this._assert3d("rotateX"),o._validateParameters("rotateX",arguments),this._renderer.rotateX(this._toRadians(e)),this},o.prototype.rotateY=function(e){return this._assert3d("rotateY"),o._validateParameters("rotateY",arguments),this._renderer.rotateY(this._toRadians(e)),this},o.prototype.rotateZ=function(e){return this._assert3d("rotateZ"),o._validateParameters("rotateZ",arguments),this._renderer.rotateZ(this._toRadians(e)),this},o.prototype.scale=function(e,t,r){if(o._validateParameters("scale",arguments),e instanceof o.Vector){var i=e;e=i.x,t=i.y,r=i.z}else if(e instanceof Array){var n=e;e=n[0],t=n[1],r=n[2]||1}return isNaN(t)?t=r=e:isNaN(r)&&(r=1),this._renderer.scale.call(this._renderer,e,t,r),this},o.prototype.shearX=function(e){o._validateParameters("shearX",arguments);var t=this._toRadians(e);return this._renderer.applyMatrix(1,0,Math.tan(t),1,0,0),this},o.prototype.shearY=function(e){o._validateParameters("shearY",arguments);var t=this._toRadians(e);return this._renderer.applyMatrix(1,Math.tan(t),0,1,0,0),this},o.prototype.translate=function(e,t,r){return o._validateParameters("translate",arguments),this._renderer.isP3D?this._renderer.translate(e,t,r):this._renderer.translate(e,t),this},t.exports=o},{"./main":23}],36:[function(e,t,r){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o=e("../core/main");o.prototype.storeItem=function(e,t){void 0===t&&console.log("You cannot store undefined variables using storeItem()");var r=n(t);switch(r){case"number":case"boolean":t=t.toString();break;case"object":t instanceof o.Color&&(r="p5.Color"),t=JSON.stringify(t)}localStorage.setItem(e,t);var i=e+"p5TypeID";localStorage.setItem(i,r)},o.prototype.getItem=function(e){var t=localStorage.getItem(e),r=localStorage.getItem(e+"p5TypeID");if(void 0===r)console.log("Unable to determine type of item stored under "+e+"in local storage. Did you save the item with something other than setItem()?");else if(null!==t)switch(r){case"number":t=parseInt(t);break;case"boolean":t="true"===t;break;case"object":t=JSON.parse(t);break;case"p5.Color":t=JSON.parse(t),t=this.color.apply(this,t.levels)}return t},o.prototype.clearStorage=function(){localStorage.clear()},o.prototype.removeItem=function(e){"string"!=typeof e&&console.log("The argument that you passed to removeItem() - "+e+" is not a string."),localStorage.removeItem(e),localStorage.removeItem(e+"p5TypeID")}},{"../core/main":23}],37:[function(e,t,r){"use strict";var n=e("../core/main");n.prototype.createStringDict=function(e,t){return n._validateParameters("createStringDict",arguments),new n.StringDict(e,t)},n.prototype.createNumberDict=function(e,t){return n._validateParameters("createNumberDict",arguments),new n.NumberDict(e,t)},n.TypedDict=function(e,t){return e instanceof Object?this.data=e:(this.data={},this.data[e]=t),this},n.TypedDict.prototype.size=function(){return Object.keys(this.data).length},n.TypedDict.prototype.hasKey=function(e){return this.data.hasOwnProperty(e)},n.TypedDict.prototype.get=function(e){if(this.data.hasOwnProperty(e))return this.data[e];console.log(e+" does not exist in this Dictionary")},n.TypedDict.prototype.set=function(e,t){this._validate(t)?this.data[e]=t:console.log("Those values dont work for this dictionary type.")},n.TypedDict.prototype._addObj=function(e){for(var t in e)this.set(t,e[t])},n.TypedDict.prototype.create=function(e,t){e instanceof Object&&void 0===t?this._addObj(e):void 0!==e?this.set(e,t):console.log("In order to create a new Dictionary entry you must pass an object or a key, value pair")},n.TypedDict.prototype.clear=function(){this.data={}},n.TypedDict.prototype.remove=function(e){if(!this.data.hasOwnProperty(e))throw new Error(e+" does not exist in this Dictionary");delete this.data[e]},n.TypedDict.prototype.print=function(){for(var e in this.data)console.log("key:"+e+" value:"+this.data[e])},n.TypedDict.prototype.saveTable=function(e){var t="";for(var r in this.data)t+=r+","+this.data[r]+"\n";var i=new Blob([t],{type:"text/csv"});n.prototype.downloadFile(i,e||"mycsv","csv")},n.TypedDict.prototype.saveJSON=function(e,t){n.prototype.saveJSON(this.data,e,t)},n.TypedDict.prototype._validate=function(e){return!0},n.StringDict=function(){n.TypedDict.apply(this,arguments)},n.StringDict.prototype=Object.create(n.TypedDict.prototype),n.StringDict.prototype._validate=function(e){return"string"==typeof e},n.NumberDict=function(){n.TypedDict.apply(this,arguments)},n.NumberDict.prototype=Object.create(n.TypedDict.prototype),n.NumberDict.prototype._validate=function(e){return"number"==typeof e},n.NumberDict.prototype.add=function(e,t){this.data.hasOwnProperty(e)?this.data[e]+=t:console.log("The key - "+e+" does not exist in this dictionary.")},n.NumberDict.prototype.sub=function(e,t){this.add(e,-t)},n.NumberDict.prototype.mult=function(e,t){this.data.hasOwnProperty(e)?this.data[e]*=t:console.log("The key - "+e+" does not exist in this dictionary.")},n.NumberDict.prototype.div=function(e,t){this.data.hasOwnProperty(e)?this.data[e]/=t:console.log("The key - "+e+" does not exist in this dictionary.")},n.NumberDict.prototype._valueTest=function(e){if(0===Object.keys(this.data).length)throw new Error("Unable to search for a minimum or maximum value on an empty NumberDict");if(1===Object.keys(this.data).length)return this.data[Object.keys(this.data)[0]];var t=this.data[Object.keys(this.data)[0]];for(var r in this.data)this.data[r]*e<t*e&&(t=this.data[r]);return t},n.NumberDict.prototype.minValue=function(){return this._valueTest(1)},n.NumberDict.prototype.maxValue=function(){return this._valueTest(-1)},n.NumberDict.prototype._keyTest=function(e){if(0===Object.keys(this.data).length)throw new Error("Unable to use minValue on an empty NumberDict");if(1===Object.keys(this.data).length)return Object.keys(this.data)[0];for(var t=Object.keys(this.data)[0],r=1;r<Object.keys(this.data).length;r++)Object.keys(this.data)[r]*e<t*e&&(t=Object.keys(this.data)[r]);return t},n.NumberDict.prototype.minKey=function(){return this._keyTest(1)},n.NumberDict.prototype.maxKey=function(){return this._keyTest(-1)},t.exports=n.TypedDict},{"../core/main":23}],38:[function(e,t,r){"use strict";var i=e("../core/main");i.prototype.deviceOrientation=void 0,i.prototype.accelerationX=0,i.prototype.accelerationY=0,i.prototype.accelerationZ=0,i.prototype.pAccelerationX=0,i.prototype.pAccelerationY=0,i.prototype.pAccelerationZ=0,i.prototype._updatePAccelerations=function(){this._setProperty("pAccelerationX",this.accelerationX),this._setProperty("pAccelerationY",this.accelerationY),this._setProperty("pAccelerationZ",this.accelerationZ)},i.prototype.rotationX=0,i.prototype.rotationY=0,i.prototype.rotationZ=0,i.prototype.pRotationX=0,i.prototype.pRotationY=0;var c,p,d,f=i.prototype.pRotationZ=0,m=0,v=0,g="clockwise",y="clockwise",b="clockwise";i.prototype._updatePRotations=function(){this._setProperty("pRotationX",this.rotationX),this._setProperty("pRotationY",this.rotationY),this._setProperty("pRotationZ",this.rotationZ)},i.prototype.turnAxis=void 0;var _=.5,x=30;i.prototype.setMoveThreshold=function(e){i._validateParameters("setMoveThreshold",arguments),_=e},i.prototype.setShakeThreshold=function(e){i._validateParameters("setShakeThreshold",arguments),x=e},i.prototype._ondeviceorientation=function(e){this._updatePRotations(),this._setProperty("rotationX",e.beta),this._setProperty("rotationY",e.gamma),this._setProperty("rotationZ",e.alpha),this._handleMotion()},i.prototype._ondevicemotion=function(e){this._updatePAccelerations(),this._setProperty("accelerationX",2*e.acceleration.x),this._setProperty("accelerationY",2*e.acceleration.y),this._setProperty("accelerationZ",2*e.acceleration.z),this._handleMotion()},i.prototype._handleMotion=function(){90===window.orientation||-90===window.orientation?this._setProperty("deviceOrientation","landscape"):0===window.orientation?this._setProperty("deviceOrientation","portrait"):void 0===window.orientation&&this._setProperty("deviceOrientation","undefined");var e=this.deviceMoved||window.deviceMoved;"function"==typeof e&&(Math.abs(this.accelerationX-this.pAccelerationX)>_||Math.abs(this.accelerationY-this.pAccelerationY)>_||Math.abs(this.accelerationZ-this.pAccelerationZ)>_)&&e();var t=this.deviceTurned||window.deviceTurned;if("function"==typeof t){var r=this.rotationX+180,i=this.pRotationX+180,n=f+180;0<r-i&&r-i<270||r-i<-270?g="clockwise":(r-i<0||270<r-i)&&(g="counter-clockwise"),g!==c&&(n=r),90<Math.abs(r-n)&&Math.abs(r-n)<270&&(n=r,this._setProperty("turnAxis","X"),t()),c=g,f=n-180;var o=this.rotationY+180,a=this.pRotationY+180,s=m+180;0<o-a&&o-a<270||o-a<-270?y="clockwise":(o-a<0||270<o-this.pRotationY)&&(y="counter-clockwise"),y!==p&&(s=o),90<Math.abs(o-s)&&Math.abs(o-s)<270&&(s=o,this._setProperty("turnAxis","Y"),t()),p=y,m=s-180,0<this.rotationZ-this.pRotationZ&&this.rotationZ-this.pRotationZ<270||this.rotationZ-this.pRotationZ<-270?b="clockwise":(this.rotationZ-this.pRotationZ<0||270<this.rotationZ-this.pRotationZ)&&(b="counter-clockwise"),b!==d&&(v=this.rotationZ),90<Math.abs(this.rotationZ-v)&&Math.abs(this.rotationZ-v)<270&&(v=this.rotationZ,this._setProperty("turnAxis","Z"),t()),d=b,this._setProperty("turnAxis",void 0)}var h,l,u=this.deviceShaken||window.deviceShaken;"function"==typeof u&&(null!==this.pAccelerationX&&(h=Math.abs(this.accelerationX-this.pAccelerationX),l=Math.abs(this.accelerationY-this.pAccelerationY)),x<h+l&&u())},t.exports=i},{"../core/main":23}],39:[function(e,t,r){"use strict";var i=e("../core/main");i.prototype.isKeyPressed=!1,i.prototype.keyIsPressed=!1,i.prototype.key="",i.prototype.keyCode=0,i.prototype._onkeydown=function(e){if(!this._downKeys[e.which]){this._setProperty("isKeyPressed",!0),this._setProperty("keyIsPressed",!0),this._setProperty("keyCode",e.which),this._downKeys[e.which]=!0,this._setProperty("key",e.key||String.fromCharCode(e.which)||e.which);var t=this.keyPressed||window.keyPressed;if("function"==typeof t&&!e.charCode)!1===t(e)&&e.preventDefault()}},i.prototype._onkeyup=function(e){var t=this.keyReleased||window.keyReleased;(this._downKeys[e.which]=!1,this._areDownKeys()||(this._setProperty("isKeyPressed",!1),this._setProperty("keyIsPressed",!1)),this._setProperty("_lastKeyCodeTyped",null),this._setProperty("key",e.key||String.fromCharCode(e.which)||e.which),this._setProperty("keyCode",e.which),"function"==typeof t)&&(!1===t(e)&&e.preventDefault())},i.prototype._onkeypress=function(e){if(e.which!==this._lastKeyCodeTyped){this._setProperty("_lastKeyCodeTyped",e.which),this._setProperty("key",String.fromCharCode(e.which));var t=this.keyTyped||window.keyTyped;if("function"==typeof t)!1===t(e)&&e.preventDefault()}},i.prototype._onblur=function(e){this._downKeys={}},i.prototype.keyIsDown=function(e){return i._validateParameters("keyIsDown",arguments),this._downKeys[e]||!1},i.prototype._areDownKeys=function(){for(var e in this._downKeys)if(this._downKeys.hasOwnProperty(e)&&!0===this._downKeys[e])return!0;return!1},t.exports=i},{"../core/main":23}],40:[function(e,t,r){"use strict";var i=e("../core/main"),n=e("../core/constants");i.prototype._hasMouseInteracted=!1,i.prototype.mouseX=0,i.prototype.mouseY=0,i.prototype.pmouseX=0,i.prototype.pmouseY=0,i.prototype.winMouseX=0,i.prototype.winMouseY=0,i.prototype.pwinMouseX=0,i.prototype.pwinMouseY=0,i.prototype.mouseButton=0,i.prototype.mouseIsPressed=!1,i.prototype._updateNextMouseCoords=function(e){if(null!==this._curElement&&(!e.touches||0<e.touches.length)){var t=function(e,t,r,i){i&&!i.clientX&&(i.touches?i=i.touches[0]:i.changedTouches&&(i=i.changedTouches[0]));var n=e.getBoundingClientRect(),o=e.scrollWidth/t||1,a=e.scrollHeight/r||1;return{x:(i.clientX-n.left)/o,y:(i.clientY-n.top)/a,winX:i.clientX,winY:i.clientY,id:i.identifier}}(this._curElement.elt,this.width,this.height,e);this._setProperty("mouseX",t.x),this._setProperty("mouseY",t.y),this._setProperty("winMouseX",t.winX),this._setProperty("winMouseY",t.winY)}this._hasMouseInteracted||(this._updateMouseCoords(),this._setProperty("_hasMouseInteracted",!0))},i.prototype._updateMouseCoords=function(){this._setProperty("pmouseX",this.mouseX),this._setProperty("pmouseY",this.mouseY),this._setProperty("pwinMouseX",this.winMouseX),this._setProperty("pwinMouseY",this.winMouseY),this._setProperty("_pmouseWheelDeltaY",this._mouseWheelDeltaY)},i.prototype._setMouseButton=function(e){1===e.button?this._setProperty("mouseButton",n.CENTER):2===e.button?this._setProperty("mouseButton",n.RIGHT):this._setProperty("mouseButton",n.LEFT)},i.prototype._onmousemove=function(e){var t=this._isGlobal?window:this;this._updateNextMouseCoords(e),this.mouseIsPressed?"function"==typeof t.mouseDragged?!1===t.mouseDragged(e)&&e.preventDefault():"function"==typeof t.touchMoved&&!1===t.touchMoved(e)&&e.preventDefault():"function"==typeof t.mouseMoved&&!1===t.mouseMoved(e)&&e.preventDefault()},i.prototype._onmousedown=function(e){var t=this._isGlobal?window:this;this._setProperty("mouseIsPressed",!0),this._setMouseButton(e),this._updateNextMouseCoords(e),"function"==typeof t.mousePressed?!1===t.mousePressed(e)&&e.preventDefault():navigator.userAgent.toLowerCase().includes("safari")&&"function"==typeof t.touchStarted&&!1===t.touchStarted(e)&&e.preventDefault()},i.prototype._onmouseup=function(e){var t=this._isGlobal?window:this;this._setProperty("mouseIsPressed",!1),"function"==typeof t.mouseReleased?!1===t.mouseReleased(e)&&e.preventDefault():"function"==typeof t.touchEnded&&!1===t.touchEnded(e)&&e.preventDefault()},i.prototype._ondragend=i.prototype._onmouseup,i.prototype._ondragover=i.prototype._onmousemove,i.prototype._onclick=function(e){var t=this._isGlobal?window:this;"function"==typeof t.mouseClicked&&(!1===t.mouseClicked(e)&&e.preventDefault())},i.prototype._ondblclick=function(e){var t=this._isGlobal?window:this;"function"==typeof t.doubleClicked&&(!1===t.doubleClicked(e)&&e.preventDefault())},i.prototype._mouseWheelDeltaY=0,i.prototype._pmouseWheelDeltaY=0,i.prototype._onwheel=function(e){var t=this._isGlobal?window:this;(this._setProperty("_mouseWheelDeltaY",e.deltaY),"function"==typeof t.mouseWheel)&&(e.delta=e.deltaY,!1===t.mouseWheel(e)&&e.preventDefault())},t.exports=i},{"../core/constants":17,"../core/main":23}],41:[function(e,t,r){"use strict";var i=e("../core/main");function n(e,t,r,i,n){n=n||0;var o=e.getBoundingClientRect(),a=e.scrollWidth/t||1,s=e.scrollHeight/r||1,h=i.touches[n]||i.changedTouches[n];return{x:(h.clientX-o.left)/a,y:(h.clientY-o.top)/s,winX:h.clientX,winY:h.clientY,id:h.identifier}}i.prototype.touches=[],i.prototype._updateTouchCoords=function(e){if(null!==this._curElement){for(var t=[],r=0;r<e.touches.length;r++)t[r]=n(this._curElement.elt,this.width,this.height,e,r);this._setProperty("touches",t)}},i.prototype._ontouchstart=function(e){var t=this._isGlobal?window:this;this._setProperty("mouseIsPressed",!0),this._updateTouchCoords(e),this._updateNextMouseCoords(e),this._updateMouseCoords(),"function"==typeof t.touchStarted?!1===t.touchStarted(e)&&e.preventDefault():navigator.userAgent.toLowerCase().includes("safari")&&"function"==typeof t.touchStarted&&!1===t.mousePressed(e)&&e.preventDefault()},i.prototype._ontouchmove=function(e){var t=this._isGlobal?window:this;this._updateTouchCoords(e),this._updateNextMouseCoords(e),"function"==typeof t.touchMoved?!1===t.touchMoved(e)&&e.preventDefault():"function"==typeof t.mouseDragged&&!1===t.mouseDragged(e)&&e.preventDefault()},i.prototype._ontouchend=function(e){this._setProperty("mouseIsPressed",!1),this._updateTouchCoords(e),this._updateNextMouseCoords(e);var t=this._isGlobal?window:this;"function"==typeof t.touchEnded?!1===t.touchEnded(e)&&e.preventDefault():"function"==typeof t.mouseReleased&&!1===t.mouseReleased(e)&&e.preventDefault()},t.exports=i},{"../core/main":23}],42:[function(e,t,r){"use strict";var R,L,D,P,I={};function i(e,t){for(var r,i,n,o,a,s,h,l,u,c,p=I._toPixels(e),d=e.width,f=e.height,m=d*f,v=new Int32Array(m),g=0;g<m;g++)v[g]=I._getARGB(p,g);var y,b,_,x,w=new Int32Array(m),S=new Int32Array(m),T=new Int32Array(m),M=new Int32Array(m),E=0;for(function(e){var t=3.5*e|0;if(R!==(t=t<1?1:t<248?t:248)){L=1+(R=t)<<1,D=new Int32Array(L),P=new Array(L);for(var r=0;r<L;r++)P[r]=new Int32Array(256);for(var i,n,o,a,s=1,h=t-1;s<t;s++){D[t+s]=D[h]=n=h*h,o=P[t+s],a=P[h--];for(var l=0;l<256;l++)o[l]=a[l]=n*l}i=D[t]=t*t,o=P[t];for(var u=0;u<256;u++)o[u]=i*u}}(t),b=0;b<f;b++){for(y=0;y<d;y++){if(o=n=i=a=r=0,(s=y-R)<0)c=-s,s=0;else{if(d<=s)break;c=0}for(_=c;_<L&&!(d<=s);_++){var C=v[s+E];a+=(x=P[_])[(-16777216&C)>>>24],i+=x[(16711680&C)>>16],n+=x[(65280&C)>>8],o+=x[255&C],r+=D[_],s++}w[h=E+y]=a/r,S[h]=i/r,T[h]=n/r,M[h]=o/r}E+=d}for(u=(l=-R)*d,b=E=0;b<f;b++){for(y=0;y<d;y++){if(o=n=i=a=r=0,l<0)c=h=-l,s=y;else{if(f<=l)break;c=0,h=l,s=y+u}for(_=c;_<L&&!(f<=h);_++)a+=(x=P[_])[w[s]],i+=x[S[s]],n+=x[T[s]],o+=x[M[s]],r+=D[_],h++,s+=d;v[y+E]=a/r<<24|i/r<<16|n/r<<8|o/r}E+=d,u+=d,l++}I._setPixels(p,v)}I._toPixels=function(e){return e instanceof ImageData?e.data:e.getContext("2d").getImageData(0,0,e.width,e.height).data},I._getARGB=function(e,t){var r=4*t;return e[r+3]<<24&4278190080|e[r]<<16&16711680|e[r+1]<<8&65280|255&e[r+2]},I._setPixels=function(e,t){for(var r=0,i=0,n=e.length;i<n;i++)e[(r=4*i)+0]=(16711680&t[i])>>>16,e[r+1]=(65280&t[i])>>>8,e[r+2]=255&t[i],e[r+3]=(4278190080&t[i])>>>24},I._toImageData=function(e){return e instanceof ImageData?e:e.getContext("2d").getImageData(0,0,e.width,e.height)},I._createImageData=function(e,t){return I._tmpCanvas=document.createElement("canvas"),I._tmpCtx=I._tmpCanvas.getContext("2d"),this._tmpCtx.createImageData(e,t)},I.apply=function(e,t,r){var i=e.getContext("2d"),n=i.getImageData(0,0,e.width,e.height),o=t(n,r);o instanceof ImageData?i.putImageData(o,0,0,0,0,e.width,e.height):i.putImageData(n,0,0,0,0,e.width,e.height)},I.threshold=function(e,t){var r=I._toPixels(e);void 0===t&&(t=.5);for(var i=Math.floor(255*t),n=0;n<r.length;n+=4){var o;o=i<=.2126*r[n]+.7152*r[n+1]+.0722*r[n+2]?255:0,r[n]=r[n+1]=r[n+2]=o}},I.gray=function(e){for(var t=I._toPixels(e),r=0;r<t.length;r+=4){var i=.2126*t[r]+.7152*t[r+1]+.0722*t[r+2];t[r]=t[r+1]=t[r+2]=i}},I.opaque=function(e){for(var t=I._toPixels(e),r=0;r<t.length;r+=4)t[r+3]=255;return t},I.invert=function(e){for(var t=I._toPixels(e),r=0;r<t.length;r+=4)t[r]=255-t[r],t[r+1]=255-t[r+1],t[r+2]=255-t[r+2]},I.posterize=function(e,t){var r=I._toPixels(e);if(t<2||255<t)throw new Error("Level must be greater than 2 and less than 255 for posterize");for(var i=t-1,n=0;n<r.length;n+=4){var o=r[n],a=r[n+1],s=r[n+2];r[n]=255*(o*t>>8)/i,r[n+1]=255*(a*t>>8)/i,r[n+2]=255*(s*t>>8)/i}},I.dilate=function(e){for(var t,r,i,n,o,a,s,h,l,u,c,p,d,f,m,v,g,y=I._toPixels(e),b=0,_=y.length?y.length/4:0,x=new Int32Array(_);b<_;)for(r=(t=b)+e.width;b<r;)i=n=I._getARGB(y,b),(s=b-1)<t&&(s=b),r<=(a=b+1)&&(a=b),(h=b-e.width)<0&&(h=0),_<=(l=b+e.width)&&(l=b),p=I._getARGB(y,h),c=I._getARGB(y,s),d=I._getARGB(y,l),(o=77*(i>>16&255)+151*(i>>8&255)+28*(255&i))<(m=77*(c>>16&255)+151*(c>>8&255)+28*(255&c))&&(n=c,o=m),o<(f=77*((u=I._getARGB(y,a))>>16&255)+151*(u>>8&255)+28*(255&u))&&(n=u,o=f),o<(v=77*(p>>16&255)+151*(p>>8&255)+28*(255&p))&&(n=p,o=v),o<(g=77*(d>>16&255)+151*(d>>8&255)+28*(255&d))&&(n=d,o=g),x[b++]=n;I._setPixels(y,x)},I.erode=function(e){for(var t,r,i,n,o,a,s,h,l,u,c,p,d,f,m,v,g,y=I._toPixels(e),b=0,_=y.length?y.length/4:0,x=new Int32Array(_);b<_;)for(r=(t=b)+e.width;b<r;)i=n=I._getARGB(y,b),(s=b-1)<t&&(s=b),r<=(a=b+1)&&(a=b),(h=b-e.width)<0&&(h=0),_<=(l=b+e.width)&&(l=b),p=I._getARGB(y,h),c=I._getARGB(y,s),d=I._getARGB(y,l),(m=77*(c>>16&255)+151*(c>>8&255)+28*(255&c))<(o=77*(i>>16&255)+151*(i>>8&255)+28*(255&i))&&(n=c,o=m),(f=77*((u=I._getARGB(y,a))>>16&255)+151*(u>>8&255)+28*(255&u))<o&&(n=u,o=f),(v=77*(p>>16&255)+151*(p>>8&255)+28*(255&p))<o&&(n=p,o=v),(g=77*(d>>16&255)+151*(d>>8&255)+28*(255&d))<o&&(n=d,o=g),x[b++]=n;I._setPixels(y,x)},I.blur=function(e,t){i(e,t)},t.exports=I},{}],43:[function(e,t,r){"use strict";var c=e("../core/main"),p=[];c.prototype.createImage=function(e,t){return c._validateParameters("createImage",arguments),new c.Image(e,t)},c.prototype.saveCanvas=function(){c._validateParameters("saveCanvas",arguments);var e,t,r,i,n=[].slice.call(arguments);switch(arguments[0]instanceof HTMLCanvasElement?(e=arguments[0],n.shift()):arguments[0]instanceof c.Element?(e=arguments[0].elt,n.shift()):e=this._curElement&&this._curElement.elt,1<=n.length&&(t=n[0]),2<=n.length&&(r=n[1]),r=r||c.prototype._checkFileExtension(t,r)[1]||"png"){default:i="image/png";break;case"jpeg":case"jpg":i="image/jpeg"}e.toBlob(function(e){c.prototype.downloadFile(e,t,r)},i)},c.prototype.saveFrames=function(e,t,r,i,n){c._validateParameters("saveFrames",arguments);var o=r||3;o=c.prototype.constrain(o,0,15),o*=1e3;var a=i||15;a=c.prototype.constrain(a,0,22);var s=0,h=c.prototype._makeFrame,l=this._curElement.elt,u=setInterval(function(){h(e+s,t,l),s++},1e3/a);setTimeout(function(){if(clearInterval(u),n)n(p);else for(var e=0;e<p.length;e++){var t=p[e];c.prototype.downloadFile(t.imageData,t.filename,t.ext)}p=[]},o+.01)},c.prototype._makeFrame=function(e,t,r){var i,n;if(i=this?this._curElement.elt:r,t)switch(t.toLowerCase()){case"png":n="image/png";break;case"jpeg":case"jpg":n="image/jpeg";break;default:n="image/png"}else t="png",n="image/png";var o=i.toDataURL(n);o=o.replace(n,"image/octet-stream");var a={};a.imageData=o,a.filename=e,a.ext=t,p.push(a)},t.exports=c},{"../core/main":23}],44:[function(e,t,r){"use strict";var x=e("../core/main"),c=e("./filters"),w=e("../core/helpers"),i=e("../core/constants");function S(e,t){return 0<e&&e<t?e:t}e("../core/error_helpers"),x.prototype.loadImage=function(e,t,r){x._validateParameters("loadImage",arguments);var i=new Image,n=new x.Image(1,1,this),o=this;return i.onload=function(){n.width=n.canvas.width=i.width,n.height=n.canvas.height=i.height,n.drawingContext.drawImage(i,0,0),n.modified=!0,"function"==typeof t&&t(n),o._decrementPreload()},i.onerror=function(e){x._friendlyFileLoadError(0,i.src),"function"==typeof r?r(e):console.error(e)},0!==e.indexOf("data:image/")&&(i.crossOrigin="Anonymous"),i.src=e,n},x.prototype.image=function(e,t,r,i,n,o,a,s,h){x._validateParameters("image",arguments);var l=e.width,u=e.height;e.elt&&e.elt.videoWidth&&!e.canvas&&(l=e.elt.videoWidth,u=e.elt.videoHeight);var c=t,p=r,d=i||l,f=n||u,m=o||0,v=a||0,g=s||l,y=h||u;g=S(g,l),y=S(y,u);var b=1;e.elt&&!e.canvas&&e.elt.style.width&&(b=e.elt.videoWidth&&!i?e.elt.videoWidth:e.elt.width,b/=parseInt(e.elt.style.width,10)),m*=b,v*=b,y*=b,g*=b;var _=w.modeAdjust(c,p,d,f,this._renderer._imageMode);this._renderer.image(e,m,v,g,y,_.x,_.y,_.w,_.h)},x.prototype.tint=function(){x._validateParameters("tint",arguments);var e=this.color.apply(this,arguments);this._renderer._tint=e.levels},x.prototype.noTint=function(){this._renderer._tint=null},x.prototype._getTintedImageCanvas=function(e){if(!e.canvas)return e;var t=c._toPixels(e.canvas),r=document.createElement("canvas");r.width=e.canvas.width,r.height=e.canvas.height;for(var i=r.getContext("2d"),n=i.createImageData(e.canvas.width,e.canvas.height),o=n.data,a=0;a<t.length;a+=4){var s=t[a],h=t[a+1],l=t[a+2],u=t[a+3];o[a]=s*this._renderer._tint[0]/255,o[a+1]=h*this._renderer._tint[1]/255,o[a+2]=l*this._renderer._tint[2]/255,o[a+3]=u*this._renderer._tint[3]/255}return i.putImageData(n,0,0),r},x.prototype.imageMode=function(e){x._validateParameters("imageMode",arguments),e!==i.CORNER&&e!==i.CORNERS&&e!==i.CENTER||(this._renderer._imageMode=e)},t.exports=x},{"../core/constants":17,"../core/error_helpers":19,"../core/helpers":20,"../core/main":23,"./filters":42}],45:[function(e,t,r){"use strict";var l=e("../core/main"),i=e("./filters");l.Image=function(e,t){this.width=e,this.height=t,this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.drawingContext=this.canvas.getContext("2d"),(this._pixelsState=this)._pixelDensity=1,this._pixelsDirty=!0,this._modified=!1,this.pixels=[]},l.Image.prototype._setProperty=function(e,t){this[e]=t,this.setModified(!0)},l.Image.prototype.loadPixels=function(){l.Renderer2D.prototype.loadPixels.call(this),this.setModified(!0)},l.Image.prototype.updatePixels=function(e,t,r,i){l.Renderer2D.prototype.updatePixels.call(this,e,t,r,i),this.setModified(!0)},l.Image.prototype.get=function(e,t,r,i){return l._validateParameters("p5.Image.get",arguments),l.Renderer2D.prototype.get.apply(this,arguments)},l.Image.prototype._getPixel=l.Renderer2D.prototype._getPixel,l.Image.prototype.set=function(e,t,r){l.Renderer2D.prototype.set.call(this,e,t,r),this.setModified(!0)},l.Image.prototype.resize=function(e,t){0===e&&0===t?(e=this.canvas.width,t=this.canvas.height):0===e?e=this.canvas.width*t/this.canvas.height:0===t&&(t=this.canvas.height*e/this.canvas.width),e=Math.floor(e),t=Math.floor(t);var r=document.createElement("canvas");r.width=e,r.height=t,r.getContext("2d").drawImage(this.canvas,0,0,this.canvas.width,this.canvas.height,0,0,r.width,r.height),this.canvas.width=this.width=e,this.canvas.height=this.height=t,this.drawingContext.drawImage(r,0,0,e,t,0,0,e,t),0<this.pixels.length&&this.loadPixels(),this.setModified(!0),this._pixelsDirty=!0},l.Image.prototype.copy=function(){var e,t,r,i,n,o,a,s,h;if(9===arguments.length)e=arguments[0],t=arguments[1],r=arguments[2],i=arguments[3],n=arguments[4],o=arguments[5],a=arguments[6],s=arguments[7],h=arguments[8];else{if(8!==arguments.length)throw new Error("Signature not supported");e=this,t=arguments[0],r=arguments[1],i=arguments[2],n=arguments[3],o=arguments[4],a=arguments[5],s=arguments[6],h=arguments[7]}l.Renderer2D._copyHelper(this,e,t,r,i,n,o,a,s,h),this._pixelsDirty=!0},l.Image.prototype.mask=function(e){void 0===e&&(e=this);var t=this.drawingContext.globalCompositeOperation,r=1;e instanceof l.Renderer&&(r=e._pInst._pixelDensity);var i=[e,0,0,r*e.width,r*e.height,0,0,this.width,this.height];this.drawingContext.globalCompositeOperation="destination-in",l.Image.prototype.copy.apply(this,i),this.drawingContext.globalCompositeOperation=t,this.setModified(!0)},l.Image.prototype.filter=function(e,t){i.apply(this.canvas,i[e],t),this.setModified(!0)},l.Image.prototype.blend=function(){l.prototype.blend.apply(this,arguments),this.setModified(!0)},l.Image.prototype.setModified=function(e){this._modified=e},l.Image.prototype.isModified=function(){return this._modified},l.Image.prototype.save=function(e,t){l.prototype.saveCanvas(this.canvas,e,t)},t.exports=l.Image},{"../core/main":23,"./filters":42}],46:[function(e,t,r){"use strict";var n=e("../core/main"),i=e("./filters");e("../color/p5.Color"),n.prototype.pixels=[],n.prototype.blend=function(){n._validateParameters("blend",arguments),this._renderer?this._renderer.blend.apply(this._renderer,arguments):n.Renderer2D.prototype.blend.apply(this,arguments)},n.prototype.copy=function(){n._validateParameters("copy",arguments),n.Renderer2D.prototype.copy.apply(this._renderer,arguments)},n.prototype.filter=function(e,t){n._validateParameters("filter",arguments),void 0!==this.canvas?i.apply(this.canvas,i[e],t):i.apply(this.elt,i[e],t)},n.prototype.get=function(e,t,r,i){return n._validateParameters("get",arguments),this._renderer.get.apply(this._renderer,arguments)},n.prototype.loadPixels=function(){n._validateParameters("loadPixels",arguments),this._renderer.loadPixels()},n.prototype.set=function(e,t,r){this._renderer.set(e,t,r)},n.prototype.updatePixels=function(e,t,r,i){n._validateParameters("updatePixels",arguments),0!==this.pixels.length&&this._renderer.updatePixels(e,t,r,i)},t.exports=n},{"../color/p5.Color":15,"../core/main":23,"./filters":42}],47:[function(s,e,t){"use strict";function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var g=s("../core/main");s("whatwg-fetch"),s("es6-promise").polyfill();var y=s("fetch-jsonp");function b(e,t){var r={};if(void 0===(t=t||[]))for(var i=0;i<e.length;i++)t[i.toString()]=i;for(var n=0;n<t.length;n++){var o=t[n],a=e[n];r[o]=a}return r}function m(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function h(e,t){t&&!0!==t&&"true"!==t||(t=""),e||(e="untitled");var r="";return e&&-1<e.indexOf(".")&&(r=e.split(".").pop()),t&&r!==t&&(e=e+"."+(r=t)),[e,r]}s("../core/error_helpers"),g.prototype.loadJSON=function(){g._validateParameters("loadJSON",arguments);for(var r,t,e,i=arguments[0],n={},o="json",a=1;a<arguments.length;a++){var s=arguments[a];"string"==typeof s?"jsonp"!==s&&"json"!==s||(o=s):"function"==typeof s?r?t=s:r=s:"object"===v(s)&&(s.hasOwnProperty("jsonpCallback")||s.hasOwnProperty("jsonpCallbackFunction"))&&(o="jsonp",e=s)}var h=this;return this.httpDo(i,"GET",e,o,function(e){for(var t in e)n[t]=e[t];void 0!==r&&r(e),h._decrementPreload()},function(e){if(g._friendlyFileLoadError(5,i),!t)throw e;t(e)}),n},g.prototype.loadStrings=function(){g._validateParameters("loadStrings",arguments);for(var r,t,i=[],e=1;e<arguments.length;e++){var n=arguments[e];"function"==typeof n&&(void 0===r?r=n:void 0===t&&(t=n))}var o=this;return g.prototype.httpDo.call(this,arguments[0],"GET","text",function(e){var t=e.replace(/\r\n/g,"\r").replace(/\n/g,"\r").split(/\r/);Array.prototype.push.apply(i,t),void 0!==r&&r(i),o._decrementPreload()},function(e){if(g._friendlyFileLoadError(3,e),!t)throw e;t(e)}),i},g.prototype.loadTable=function(t){var u,r,e=[],c=!1,i=t.substring(t.lastIndexOf(".")+1,t.length),p=",",n=!1;"tsv"===i&&(p="\t");for(var d=1;d<arguments.length;d++)if("function"==typeof arguments[d])void 0===u?u=arguments[d]:void 0===r&&(r=arguments[d]);else if("string"==typeof arguments[d])if(e.push(arguments[d]),"header"===arguments[d]&&(c=!0),"csv"===arguments[d]){if(n)throw new Error("Cannot set multiple separator types.");p=",",n=!0}else if("tsv"===arguments[d]){if(n)throw new Error("Cannot set multiple separator types.");p="\t",n=!0}var f=new g.Table,m=this;return this.httpDo(t,"GET","table",function(e){for(var t,r,i={},n=[],o=0,a=null,s=function(){i.currentState=0,i.token=""},h=function(){a.push(i.token),s()},l=function(){i.currentState=4,n.push(a),a=null};;){if(null==(t=e[o++])){if(i.escaped)throw new Error("Unclosed quote in file.");if(a){h(),l();break}}if(null===a&&(i.escaped=!1,a=[],s()),0===i.currentState){if('"'===t){i.escaped=!0,i.currentState=1;continue}i.currentState=1}if(1===i.currentState&&i.escaped)if('"'===t)'"'===e[o]?(i.token+='"',o++):(i.escaped=!1,i.currentState=2);else{if("\r"===t)continue;i.token+=t}else"\r"===t?("\n"===e[o]&&o++,h(),l()):"\n"===t?(h(),l()):t===p?h():1===i.currentState&&(i.token+=t)}if(c)f.columns=n.shift();else for(d=0;d<n[0].length;d++)f.columns[d]="null";for(d=0;d<n.length;d++)(1!==n[d].length||"undefined"!==n[d][0]&&""!==n[d][0])&&((r=new g.TableRow).arr=n[d],r.obj=b(n[d],f.columns),f.addRow(r));"function"==typeof u&&u(f),m._decrementPreload()},function(e){g._friendlyFileLoadError(2,t),r?r(e):console.error(e)}),f},g.prototype.loadXML=function(){for(var r,t,i=new g.XML,e=1;e<arguments.length;e++){var n=arguments[e];"function"==typeof n&&(void 0===r?r=n:void 0===t&&(t=n))}var o=this;return this.httpDo(arguments[0],"GET","xml",function(e){for(var t in e)i[t]=e[t];void 0!==r&&r(i),o._decrementPreload()},function(e){if(g._friendlyFileLoadError(1,e),!t)throw e;t(e)}),i},g.prototype.loadBytes=function(t,r,i){var n={},o=this;return this.httpDo(t,"GET","arrayBuffer",function(e){n.bytes=new Uint8Array(e),"function"==typeof r&&r(n),o._decrementPreload()},function(e){if(g._friendlyFileLoadError(6,t),!i)throw e;i(e)}),n},g.prototype.httpGet=function(){g._validateParameters("httpGet",arguments);var e=Array.prototype.slice.call(arguments);return e.splice(1,0,"GET"),g.prototype.httpDo.apply(this,e)},g.prototype.httpPost=function(){g._validateParameters("httpPost",arguments);var e=Array.prototype.slice.call(arguments);return e.splice(1,0,"POST"),g.prototype.httpDo.apply(this,e)},g.prototype.httpDo=function(){for(var i,e,t,r,n,o={},a=0,s="text/plain",h=arguments.length-1;0<h&&"function"==typeof arguments[h];h--)a++;var l=arguments.length-a,u=arguments[0];if(2===l&&"string"==typeof u&&"object"===v(arguments[1]))r=new Request(u,arguments[1]),e=arguments[2],t=arguments[3];else{for(var c,p="GET",d=1;d<arguments.length;d++){var f=arguments[d];if("string"==typeof f)"GET"===f||"POST"===f||"PUT"===f||"DELETE"===f?p=f:"json"===f||"jsonp"===f||"binary"===f||"arrayBuffer"===f||"xml"===f||"text"===f||"table"===f?i=f:c=f;else if("number"==typeof f)c=f.toString();else if("object"===v(f))if(f.hasOwnProperty("jsonpCallback")||f.hasOwnProperty("jsonpCallbackFunction"))for(var m in f)o[m]=f[m];else s=f instanceof g.XML?(c=f.serialize(),"application/xml"):(c=JSON.stringify(f),"application/json");else"function"==typeof f&&(e?t=f:e=f)}r=new Request(u,{method:p,mode:"cors",body:c,headers:new Headers({"Content-Type":s})})}return i||(i=-1!==u.indexOf("json")?"json":-1!==u.indexOf("xml")?"xml":"text"),(n=(n="jsonp"===i?y(u,o):fetch(r)).then(function(e){if(!e.ok){var t=new Error(e.body);throw t.status=e.status,t.ok=!1,t}var r=0;switch("jsonp"!==i&&(r=e.headers.get("content-length")),r&&64e6<r&&g._friendlyFileLoadError(7,u),i){case"json":case"jsonp":return e.json();case"binary":return e.blob();case"arrayBuffer":return e.arrayBuffer();case"xml":return e.text().then(function(e){var t=(new DOMParser).parseFromString(e,"text/xml");return new g.XML(t.documentElement)});default:return e.text()}})).then(e||function(){}),n.catch(t||console.error),n},window.URL=window.URL||window.webkitURL,g.prototype._pWriters=[],g.prototype.createWriter=function(e,t){var r;for(var i in g.prototype._pWriters)if(g.prototype._pWriters[i].name===e)return r=new g.PrintWriter(e+this.millis(),t),g.prototype._pWriters.push(r),r;return r=new g.PrintWriter(e,t),g.prototype._pWriters.push(r),r},g.PrintWriter=function(r,i){var n=this;this.name=r,this.content="",this.write=function(e){this.content+=e},this.print=function(e){this.content+=e+"\n"},this.clear=function(){this.content=""},this.close=function(){var e=[];for(var t in e.push(this.content),g.prototype.writeFile(e,r,i),g.prototype._pWriters)g.prototype._pWriters[t].name===this.name&&g.prototype._pWriters.splice(t,1);n.clear(),n={}}},g.prototype.save=function(e,t,r){var i=arguments,n=this._curElement?this._curElement.elt:this.elt;if(0!==i.length)if(i[0]instanceof g.Renderer||i[0]instanceof g.Graphics)g.prototype.saveCanvas(i[0].elt,i[1],i[2]);else if(1===i.length&&"string"==typeof i[0])g.prototype.saveCanvas(n,i[0]);else switch(h(i[1],i[2])[1]){case"json":return void g.prototype.saveJSON(i[0],i[1],i[2]);case"txt":return void g.prototype.saveStrings(i[0],i[1],i[2]);default:i[0]instanceof Array?g.prototype.saveStrings(i[0],i[1],i[2]):i[0]instanceof g.Table?g.prototype.saveTable(i[0],i[1],i[2]):i[0]instanceof g.Image?g.prototype.saveCanvas(i[0].canvas,i[1]):i[0]instanceof g.SoundFile&&g.prototype.saveSound(i[0],i[1],i[2],i[3])}else g.prototype.saveCanvas(n)},g.prototype.saveJSON=function(e,t,r){var i;g._validateParameters("saveJSON",arguments),i=r?JSON.stringify(e):JSON.stringify(e,void 0,2),this.saveStrings(i.split("\n"),t,"json")},g.prototype.saveJSONObject=g.prototype.saveJSON,g.prototype.saveJSONArray=g.prototype.saveJSON,g.prototype.saveStrings=function(e,t,r){g._validateParameters("saveStrings",arguments);for(var i=r||"txt",n=this.createWriter(t,i),o=0;o<e.length;o++)e.length,n.print(e[o]);n.close(),n.clear()},g.prototype.saveTable=function(e,t,r){var i;g._validateParameters("saveTable",arguments),i=void 0===r?t.substring(t.lastIndexOf(".")+1,t.length):r;var n=this.createWriter(t,i),o=e.columns,a=",";if("tsv"===i&&(a="\t"),"html"!==i){if("0"!==o[0]){for(var s=0;s<o.length;s++)s<o.length-1?n.write(o[s]+a):n.write(o[s]);n.write("\n")}for(var h=0;h<e.rows.length;h++){var l;for(l=0;l<e.rows[h].arr.length;l++)l<e.rows[h].arr.length-1?n.write(e.rows[h].arr[l]+a):(e.rows.length,n.write(e.rows[h].arr[l]));n.write("\n")}}else{n.print("<html>"),n.print("<head>");if('="text/html;charset=utf-8" />',n.print('  <meta http-equiv="content-type" content="text/html;charset=utf-8" />'),n.print("</head>"),n.print("<body>"),n.print("  <table>"),"0"!==o[0]){n.print("    <tr>");for(var u=0;u<o.length;u++){var c=m(o[u]);n.print("      <td>"+c),n.print("      </td>")}n.print("    </tr>")}for(var p=0;p<e.rows.length;p++){n.print("    <tr>");for(var d=0;d<e.columns.length;d++){var f=m(e.rows[p].getString(d));n.print("      <td>"+f),n.print("      </td>")}n.print("    </tr>")}n.print("  </table>"),n.print("</body>"),n.print("</html>")}n.close(),n.clear()},g.prototype.writeFile=function(e,t,r){var i="application/octet-stream";g.prototype._isSafari()&&(i="text/plain");var n=new Blob(e,{type:i});g.prototype.downloadFile(n,t,r)},g.prototype.downloadFile=function(e,t,r){var i=h(t,r),n=i[0];if(e instanceof Blob){s("file-saver").saveAs(e,n)}else{var o=document.createElement("a");if(o.href=e,o.download=n,o.onclick=function(e){var t;t=e,document.body.removeChild(t.target),e.stopPropagation()},o.style.display="none",document.body.appendChild(o),g.prototype._isSafari()){var a="Hello, Safari user! To download this file...\n";a+="1. Go to File --\x3e Save As.\n",a+='2. Choose "Page Source" as the Format.\n',a+='3. Name it with this extension: ."'+i[1]+'"',alert(a)}o.click()}},g.prototype._checkFileExtension=h,g.prototype._isSafari=function(){return 0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")},e.exports=g},{"../core/error_helpers":19,"../core/main":23,"es6-promise":4,"fetch-jsonp":5,"file-saver":6,"whatwg-fetch":11}],48:[function(e,t,r){"use strict";var i=e("../core/main");i.Table=function(e){this.columns=[],this.rows=[]},i.Table.prototype.addRow=function(e){var t=e||new i.TableRow;if(void 0===t.arr||void 0===t.obj)throw new Error("invalid TableRow: "+t);return(t.table=this).rows.push(t),t},i.Table.prototype.removeRow=function(e){this.rows[e].table=null;var t=this.rows.splice(e+1,this.rows.length);this.rows.pop(),this.rows=this.rows.concat(t)},i.Table.prototype.getRow=function(e){return this.rows[e]},i.Table.prototype.getRows=function(){return this.rows},i.Table.prototype.findRow=function(e,t){if("string"==typeof t){for(var r=0;r<this.rows.length;r++)if(this.rows[r].obj[t]===e)return this.rows[r]}else for(var i=0;i<this.rows.length;i++)if(this.rows[i].arr[t]===e)return this.rows[i];return null},i.Table.prototype.findRows=function(e,t){var r=[];if("string"==typeof t)for(var i=0;i<this.rows.length;i++)this.rows[i].obj[t]===e&&r.push(this.rows[i]);else for(var n=0;n<this.rows.length;n++)this.rows[n].arr[t]===e&&r.push(this.rows[n]);return r},i.Table.prototype.matchRow=function(e,t){if("number"==typeof t){for(var r=0;r<this.rows.length;r++)if(this.rows[r].arr[t].match(e))return this.rows[r]}else for(var i=0;i<this.rows.length;i++)if(this.rows[i].obj[t].match(e))return this.rows[i];return null},i.Table.prototype.matchRows=function(e,t){var r=[];if("number"==typeof t)for(var i=0;i<this.rows.length;i++)this.rows[i].arr[t].match(e)&&r.push(this.rows[i]);else for(var n=0;n<this.rows.length;n++)this.rows[n].obj[t].match(e)&&r.push(this.rows[n]);return r},i.Table.prototype.getColumn=function(e){var t=[];if("string"==typeof e)for(var r=0;r<this.rows.length;r++)t.push(this.rows[r].obj[e]);else for(var i=0;i<this.rows.length;i++)t.push(this.rows[i].arr[e]);return t},i.Table.prototype.clearRows=function(){delete this.rows,this.rows=[]},i.Table.prototype.addColumn=function(e){var t=e||null;this.columns.push(t)},i.Table.prototype.getColumnCount=function(){return this.columns.length},i.Table.prototype.getRowCount=function(){return this.rows.length},i.Table.prototype.removeTokens=function(e,t){for(var r=[],i=0;i<e.length;i++)r.push(e.charAt(i).replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"));var n=new RegExp(r.join("|"),"g");if(void 0===t)for(var o=0;o<this.columns.length;o++)for(var a=0;a<this.rows.length;a++){var s=this.rows[a].arr[o];s=s.replace(n,""),this.rows[a].arr[o]=s,this.rows[a].obj[this.columns[o]]=s}else if("string"==typeof t)for(var h=0;h<this.rows.length;h++){var l=this.rows[h].obj[t];l=l.replace(n,""),this.rows[h].obj[t]=l;var u=this.columns.indexOf(t);this.rows[h].arr[u]=l}else for(var c=0;c<this.rows.length;c++){var p=this.rows[c].arr[t];p=p.replace(n,""),this.rows[c].arr[t]=p,this.rows[c].obj[this.columns[t]]=p}},i.Table.prototype.trim=function(e){var t=new RegExp(" ","g");if(void 0===e)for(var r=0;r<this.columns.length;r++)for(var i=0;i<this.rows.length;i++){var n=this.rows[i].arr[r];n=n.replace(t,""),this.rows[i].arr[r]=n,this.rows[i].obj[this.columns[r]]=n}else if("string"==typeof e)for(var o=0;o<this.rows.length;o++){var a=this.rows[o].obj[e];a=a.replace(t,""),this.rows[o].obj[e]=a;var s=this.columns.indexOf(e);this.rows[o].arr[s]=a}else for(var h=0;h<this.rows.length;h++){var l=this.rows[h].arr[e];l=l.replace(t,""),this.rows[h].arr[e]=l,this.rows[h].obj[this.columns[e]]=l}},i.Table.prototype.removeColumn=function(e){var t,r;"string"==typeof e?(t=e,r=this.columns.indexOf(e)):(r=e,t=this.columns[e]);var i=this.columns.splice(r+1,this.columns.length);this.columns.pop(),this.columns=this.columns.concat(i);for(var n=0;n<this.rows.length;n++){var o=this.rows[n].arr,a=o.splice(r+1,o.length);o.pop(),this.rows[n].arr=o.concat(a),delete this.rows[n].obj[t]}},i.Table.prototype.set=function(e,t,r){this.rows[e].set(t,r)},i.Table.prototype.setNum=function(e,t,r){this.rows[e].setNum(t,r)},i.Table.prototype.setString=function(e,t,r){this.rows[e].setString(t,r)},i.Table.prototype.get=function(e,t){return this.rows[e].get(t)},i.Table.prototype.getNum=function(e,t){return this.rows[e].getNum(t)},i.Table.prototype.getString=function(e,t){return this.rows[e].getString(t)},i.Table.prototype.getObject=function(e){for(var t,r={},i=0;i<this.rows.length;i++)if(t=this.rows[i].obj,"string"==typeof e){if(!(0<=this.columns.indexOf(e)))throw new Error('This table has no column named "'+e+'"');r[t[e]]=t}else r[i]=this.rows[i].obj;return r},i.Table.prototype.getArray=function(){for(var e=[],t=0;t<this.rows.length;t++)e.push(this.rows[t].arr);return e},t.exports=i},{"../core/main":23}],49:[function(e,t,r){"use strict";var i=e("../core/main");i.TableRow=function(e,t){var r=[],i={};e&&(t=t||",",r=e.split(t));for(var n=0;n<r.length;n++){var o=n,a=r[n];i[o]=a}this.arr=r,this.obj=i,this.table=null},i.TableRow.prototype.set=function(e,t){if("string"==typeof e){var r=this.table.columns.indexOf(e);if(!(0<=r))throw new Error('This table has no column named "'+e+'"');this.obj[e]=t,this.arr[r]=t}else{if(!(e<this.table.columns.length))throw new Error("Column #"+e+" is out of the range of this table");this.arr[e]=t;var i=this.table.columns[e];this.obj[i]=t}},i.TableRow.prototype.setNum=function(e,t){var r=parseFloat(t);this.set(e,r)},i.TableRow.prototype.setString=function(e,t){var r=t.toString();this.set(e,r)},i.TableRow.prototype.get=function(e){return"string"==typeof e?this.obj[e]:this.arr[e]},i.TableRow.prototype.getNum=function(e){var t;if("NaN"===(t="string"==typeof e?parseFloat(this.obj[e]):parseFloat(this.arr[e])).toString())throw"Error: "+this.obj[e]+" is NaN (Not a Number)";return t},i.TableRow.prototype.getString=function(e){return"string"==typeof e?this.obj[e].toString():this.arr[e].toString()},t.exports=i},{"../core/main":23}],50:[function(e,t,r){"use strict";var i=e("../core/main");function n(e){for(var t=[],r=0;r<e.length;r++)t.push(new i.XML(e[r]));return t}i.XML=function(e){if(e)this.DOM=e;else{var t=document.implementation.createDocument(null,"doc");this.DOM=t.createElement("root")}},i.XML.prototype.getParent=function(){return new i.XML(this.DOM.parentElement)},i.XML.prototype.getName=function(){return this.DOM.tagName},i.XML.prototype.setName=function(e){var t=this.DOM.innerHTML,r=this.DOM.attributes,i=document.implementation.createDocument(null,"default").createElement(e);i.innerHTML=t;for(var n=0;n<r.length;n++)i.setAttribute(r[n].nodeName,r.nodeValue);this.DOM=i},i.XML.prototype.hasChildren=function(){return 0<this.DOM.children.length},i.XML.prototype.listChildren=function(){for(var e=[],t=0;t<this.DOM.childNodes.length;t++)e.push(this.DOM.childNodes[t].nodeName);return e},i.XML.prototype.getChildren=function(e){return n(e?this.DOM.getElementsByTagName(e):this.DOM.children)},i.XML.prototype.getChild=function(e){if("string"!=typeof e)return new i.XML(this.DOM.children[e]);for(var t=0;t<this.DOM.children.length;t++){var r=this.DOM.children[t];if(r.tagName===e)return new i.XML(r)}},i.XML.prototype.addChild=function(e){e instanceof i.XML&&this.DOM.appendChild(e.DOM)},i.XML.prototype.removeChild=function(e){var t=-1;if("string"==typeof e){for(var r=0;r<this.DOM.children.length;r++)if(this.DOM.children[r].tagName===e){t=r;break}}else t=e;-1!==t&&this.DOM.removeChild(this.DOM.children[t])},i.XML.prototype.getAttributeCount=function(){return this.DOM.attributes.length},i.XML.prototype.listAttributes=function(){for(var e=[],t=0;t<this.DOM.attributes.length;t++){var r=this.DOM.attributes[t];e.push(r.nodeName)}return e},i.XML.prototype.hasAttribute=function(e){for(var t={},r=0;r<this.DOM.attributes.length;r++){var i=this.DOM.attributes[r];t[i.nodeName]=i.nodeValue}return!!t[e]},i.XML.prototype.getNum=function(e,t){for(var r={},i=0;i<this.DOM.attributes.length;i++){var n=this.DOM.attributes[i];r[n.nodeName]=n.nodeValue}return Number(r[e])||t||0},i.XML.prototype.getString=function(e,t){for(var r={},i=0;i<this.DOM.attributes.length;i++){var n=this.DOM.attributes[i];r[n.nodeName]=n.nodeValue}return r[e]?String(r[e]):t||null},i.XML.prototype.setAttribute=function(e,t){this.DOM.setAttribute(e,t)},i.XML.prototype.getContent=function(e){return this.DOM.textContent.replace(/\s\s+/g,",")||e||null},i.XML.prototype.setContent=function(e){this.DOM.children.length||(this.DOM.textContent=e)},i.XML.prototype.serialize=function(){return(new XMLSerializer).serializeToString(this.DOM)},t.exports=i},{"../core/main":23}],51:[function(e,t,r){"use strict";var s=e("../core/main");function i(e,t,r){if("function"==typeof Math.hypot)return Math.hypot.apply(null,arguments);for(var i=arguments.length,n=[],o=0,a=0;a<i;a++){var s=arguments[a];if((s=+s)===1/0||s===-1/0)return 1/0;o<(s=Math.abs(s))&&(o=s),n[a]=s}0===o&&(o=1);for(var h=0,l=0,u=0;u<i;u++){var c=n[u]/o,p=c*c-l,d=h+p;l=d-h-p,h=d}return Math.sqrt(h)*o}s.prototype.abs=Math.abs,s.prototype.ceil=Math.ceil,s.prototype.constrain=function(e,t,r){return s._validateParameters("constrain",arguments),Math.max(Math.min(e,r),t)},s.prototype.dist=function(){return s._validateParameters("dist",arguments),4===arguments.length?i(arguments[2]-arguments[0],arguments[3]-arguments[1]):6===arguments.length?i(arguments[3]-arguments[0],arguments[4]-arguments[1],arguments[5]-arguments[2]):void 0},s.prototype.exp=Math.exp,s.prototype.floor=Math.floor,s.prototype.lerp=function(e,t,r){return s._validateParameters("lerp",arguments),r*(t-e)+e},s.prototype.log=Math.log,s.prototype.mag=function(e,t){return s._validateParameters("mag",arguments),i(e,t)},s.prototype.map=function(e,t,r,i,n,o){s._validateParameters("map",arguments);var a=(e-t)/(r-t)*(n-i)+i;return o?i<n?this.constrain(a,i,n):this.constrain(a,n,i):a},s.prototype.max=function(){return s._validateParameters("max",arguments),arguments[0]instanceof Array?Math.max.apply(null,arguments[0]):Math.max.apply(null,arguments)},s.prototype.min=function(){return s._validateParameters("min",arguments),arguments[0]instanceof Array?Math.min.apply(null,arguments[0]):Math.min.apply(null,arguments)},s.prototype.norm=function(e,t,r){return s._validateParameters("norm",arguments),this.map(e,t,r,0,1)},s.prototype.pow=Math.pow,s.prototype.round=Math.round,s.prototype.sq=function(e){return e*e},s.prototype.sqrt=Math.sqrt,t.exports=s},{"../core/main":23}],52:[function(e,t,r){"use strict";var i=e("../core/main");i.prototype.createVector=function(e,t,r){return this instanceof i?new i.Vector(this,arguments):new i.Vector(e,t,r)},t.exports=i},{"../core/main":23}],53:[function(e,t,r){"use strict";var b,i=e("../core/main"),_=4095,x=4,w=.5,S=function(e){return.5*(1-Math.cos(e*Math.PI))};i.prototype.noise=function(e,t,r){if(t=t||0,r=r||0,null==b){b=new Array(4096);for(var i=0;i<4096;i++)b[i]=Math.random()}e<0&&(e=-e),t<0&&(t=-t),r<0&&(r=-r);for(var n,o,a,s,h,l=Math.floor(e),u=Math.floor(t),c=Math.floor(r),p=e-l,d=t-u,f=r-c,m=0,v=.5,g=0;g<x;g++){var y=l+(u<<4)+(c<<8);n=S(p),o=S(d),a=b[y&_],a+=n*(b[y+1&_]-a),s=b[y+16&_],a+=o*((s+=n*(b[y+16+1&_]-s))-a),s=b[(y+=256)&_],s+=n*(b[y+1&_]-s),h=b[y+16&_],s+=o*((h+=n*(b[y+16+1&_]-h))-s),m+=(a+=S(f)*(s-a))*v,v*=w,l<<=1,u<<=1,c<<=1,1<=(p*=2)&&(l++,p--),1<=(d*=2)&&(u++,d--),1<=(f*=2)&&(c++,f--)}return m},i.prototype.noiseDetail=function(e,t){0<e&&(x=e),0<t&&(w=t)},i.prototype.noiseSeed=function(e){var t,r,i,n=(i=4294967296,{setSeed:function(e){r=t=(null==e?Math.random()*i:e)>>>0},getSeed:function(){return t},rand:function(){return(r=(1664525*r+1013904223)%i)/i}});n.setSeed(e),b=new Array(4096);for(var o=0;o<4096;o++)b[o]=n.rand()},t.exports=i},{"../core/main":23}],54:[function(e,t,r){"use strict";var s=e("../core/main"),o=e("../core/constants");s.Vector=function(){var e,t,r;r=arguments[0]instanceof s?(this.p5=arguments[0],e=arguments[1][0]||0,t=arguments[1][1]||0,arguments[1][2]||0):(e=arguments[0]||0,t=arguments[1]||0,arguments[2]||0),this.x=e,this.y=t,this.z=r},s.Vector.prototype.toString=function(){return"p5.Vector Object : ["+this.x+", "+this.y+", "+this.z+"]"},s.Vector.prototype.set=function(e,t,r){return e instanceof s.Vector?(this.x=e.x||0,this.y=e.y||0,this.z=e.z||0):e instanceof Array?(this.x=e[0]||0,this.y=e[1]||0,this.z=e[2]||0):(this.x=e||0,this.y=t||0,this.z=r||0),this},s.Vector.prototype.copy=function(){return this.p5?new s.Vector(this.p5,[this.x,this.y,this.z]):new s.Vector(this.x,this.y,this.z)},s.Vector.prototype.add=function(e,t,r){return e instanceof s.Vector?(this.x+=e.x||0,this.y+=e.y||0,this.z+=e.z||0):e instanceof Array?(this.x+=e[0]||0,this.y+=e[1]||0,this.z+=e[2]||0):(this.x+=e||0,this.y+=t||0,this.z+=r||0),this},s.Vector.prototype.sub=function(e,t,r){return e instanceof s.Vector?(this.x-=e.x||0,this.y-=e.y||0,this.z-=e.z||0):e instanceof Array?(this.x-=e[0]||0,this.y-=e[1]||0,this.z-=e[2]||0):(this.x-=e||0,this.y-=t||0,this.z-=r||0),this},s.Vector.prototype.mult=function(e){return"number"==typeof e&&isFinite(e)?(this.x*=e,this.y*=e,this.z*=e):console.warn("p5.Vector.prototype.mult:","n is undefined or not a finite number"),this},s.Vector.prototype.div=function(e){return"number"==typeof e&&isFinite(e)?0===e?console.warn("p5.Vector.prototype.div:","divide by 0"):(this.x/=e,this.y/=e,this.z/=e):console.warn("p5.Vector.prototype.div:","n is undefined or not a finite number"),this},s.Vector.prototype.mag=function(){return Math.sqrt(this.magSq())},s.Vector.prototype.magSq=function(){var e=this.x,t=this.y,r=this.z;return e*e+t*t+r*r},s.Vector.prototype.dot=function(e,t,r){return e instanceof s.Vector?this.dot(e.x,e.y,e.z):this.x*(e||0)+this.y*(t||0)+this.z*(r||0)},s.Vector.prototype.cross=function(e){var t=this.y*e.z-this.z*e.y,r=this.z*e.x-this.x*e.z,i=this.x*e.y-this.y*e.x;return this.p5?new s.Vector(this.p5,[t,r,i]):new s.Vector(t,r,i)},s.Vector.prototype.dist=function(e){return e.copy().sub(this).mag()},s.Vector.prototype.normalize=function(){var e=this.mag();return 0!==e&&this.mult(1/e),this},s.Vector.prototype.limit=function(e){var t=this.magSq();return e*e<t&&this.div(Math.sqrt(t)).mult(e),this},s.Vector.prototype.setMag=function(e){return this.normalize().mult(e)},s.Vector.prototype.heading=function(){var e=Math.atan2(this.y,this.x);return this.p5?this.p5._fromRadians(e):e},s.Vector.prototype.rotate=function(e){var t=this.heading()+e;this.p5&&(t=this.p5._toRadians(t));var r=this.mag();return this.x=Math.cos(t)*r,this.y=Math.sin(t)*r,this},s.Vector.prototype.angleBetween=function(e){var t=this.dot(e)/(this.mag()*e.mag()),r=Math.acos(Math.min(1,Math.max(-1,t)));return this.p5?this.p5._fromRadians(r):r},s.Vector.prototype.lerp=function(e,t,r,i){return e instanceof s.Vector?this.lerp(e.x,e.y,e.z,t):(this.x+=(e-this.x)*i||0,this.y+=(t-this.y)*i||0,this.z+=(r-this.z)*i||0,this)},s.Vector.prototype.array=function(){return[this.x||0,this.y||0,this.z||0]},s.Vector.prototype.equals=function(e,t,r){var i,n,o;return o=e instanceof s.Vector?(i=e.x||0,n=e.y||0,e.z||0):e instanceof Array?(i=e[0]||0,n=e[1]||0,e[2]||0):(i=e||0,n=t||0,r||0),this.x===i&&this.y===n&&this.z===o},s.Vector.fromAngle=function(e,t){return void 0===t&&(t=1),new s.Vector(t*Math.cos(e),t*Math.sin(e),0)},s.Vector.fromAngles=function(e,t,r){void 0===r&&(r=1);var i=Math.cos(t),n=Math.sin(t),o=Math.cos(e),a=Math.sin(e);return new s.Vector(r*a*n,-r*o,r*a*i)},s.Vector.random2D=function(){return this.fromAngle(Math.random()*o.TWO_PI)},s.Vector.random3D=function(){var e=Math.random()*o.TWO_PI,t=2*Math.random()-1,r=Math.sqrt(1-t*t),i=r*Math.cos(e),n=r*Math.sin(e);return new s.Vector(i,n,t)},s.Vector.add=function(e,t,r){return r?r.set(e):r=e.copy(),r.add(t),r},s.Vector.sub=function(e,t,r){return r?r.set(e):r=e.copy(),r.sub(t),r},s.Vector.mult=function(e,t,r){return r?r.set(e):r=e.copy(),r.mult(t),r},s.Vector.div=function(e,t,r){return r?r.set(e):r=e.copy(),r.div(t),r},s.Vector.dot=function(e,t){return e.dot(t)},s.Vector.cross=function(e,t){return e.cross(t)},s.Vector.dist=function(e,t){return e.dist(t)},s.Vector.lerp=function(e,t,r,i){return i?i.set(e):i=e.copy(),i.lerp(t,r),i},s.Vector.mag=function(e){var t=e.x,r=e.y,i=e.z,n=t*t+r*r+i*i;return Math.sqrt(n)},t.exports=s.Vector},{"../core/constants":17,"../core/main":23}],55:[function(e,t,r){"use strict";var i,n,o,a=e("../core/main"),s=!1,h=!1,l=0,u=(o=2147483647,{setSeed:function(e){n=i=(null==e?Math.random()*o:e)>>>0},getSeed:function(){return i},rand:function(){return(n=(1103515245*n+12345)%o)/o}});a.prototype.randomSeed=function(e){u.setSeed(e),h=!(s=!0)},a.prototype.random=function(e,t){var r;if(r=s?u.rand():Math.random(),void 0===e)return r;if(void 0===t)return e instanceof Array?e[Math.floor(r*e.length)]:r*e;if(t<e){var i=e;e=t,t=i}return r*(t-e)+e},a.prototype.randomGaussian=function(e,t){var r,i,n,o;if(h)r=l,h=!1;else{for(;1<=(o=(i=this.random(2)-1)*i+(n=this.random(2)-1)*n););r=i*(o=Math.sqrt(-2*Math.log(o)/o)),l=n*o,h=!0}return r*(t||1)+(e||0)},t.exports=a},{"../core/main":23}],56:[function(e,t,r){"use strict";var i=e("../core/main"),n=e("../core/constants");i.prototype._angleMode=n.RADIANS,i.prototype.acos=function(e){return this._fromRadians(Math.acos(e))},i.prototype.asin=function(e){return this._fromRadians(Math.asin(e))},i.prototype.atan=function(e){return this._fromRadians(Math.atan(e))},i.prototype.atan2=function(e,t){return this._fromRadians(Math.atan2(e,t))},i.prototype.cos=function(e){return Math.cos(this._toRadians(e))},i.prototype.sin=function(e){return Math.sin(this._toRadians(e))},i.prototype.tan=function(e){return Math.tan(this._toRadians(e))},i.prototype.degrees=function(e){return e*n.RAD_TO_DEG},i.prototype.radians=function(e){return e*n.DEG_TO_RAD},i.prototype.angleMode=function(e){e!==n.DEGREES&&e!==n.RADIANS||(this._angleMode=e)},i.prototype._toRadians=function(e){return this._angleMode===n.DEGREES?e*n.DEG_TO_RAD:e},i.prototype._toDegrees=function(e){return this._angleMode===n.RADIANS?e*n.RAD_TO_DEG:e},i.prototype._fromRadians=function(e){return this._angleMode===n.DEGREES?e*n.RAD_TO_DEG:e},t.exports=i},{"../core/constants":17,"../core/main":23}],57:[function(e,t,r){"use strict";var i=e("../core/main");i.prototype.textAlign=function(e,t){return i._validateParameters("textAlign",arguments),this._renderer.textAlign.apply(this._renderer,arguments)},i.prototype.textLeading=function(e){return i._validateParameters("textLeading",arguments),this._renderer.textLeading.apply(this._renderer,arguments)},i.prototype.textSize=function(e){return i._validateParameters("textSize",arguments),this._renderer.textSize.apply(this._renderer,arguments)},i.prototype.textStyle=function(e){return i._validateParameters("textStyle",arguments),this._renderer.textStyle.apply(this._renderer,arguments)},i.prototype.textWidth=function(e){return i._validateParameters("textWidth",arguments),0===e.length?0:this._renderer.textWidth.apply(this._renderer,arguments)},i.prototype.textAscent=function(){return i._validateParameters("textAscent",arguments),this._renderer.textAscent()},i.prototype.textDescent=function(){return i._validateParameters("textDescent",arguments),this._renderer.textDescent()},i.prototype._updateTextMetrics=function(){return this._renderer._updateTextMetrics()},t.exports=i},{"../core/main":23}],58:[function(e,t,r){"use strict";var p=e("../core/main"),i=e("../core/constants"),n=e("opentype.js");e("../core/error_helpers"),p.prototype.loadFont=function(s,h,l){p._validateParameters("loadFont",arguments);var u=new p.Font(this),c=this;return n.load(s,function(e,t){if(e)return p._friendlyFileLoadError(4,s),void 0!==l?l(e):void console.error(e,s);u.font=t,void 0!==h&&h(u),c._decrementPreload();var r,i,n=s.split("\\").pop().split("/").pop(),o=n.lastIndexOf("."),a=o<1?null:n.substr(o+1);-1<["ttf","otf","woff","woff2"].indexOf(a)&&(r=n.substr(0,o),(i=document.createElement("style")).appendChild(document.createTextNode("\n@font-face {\nfont-family: "+r+";\nsrc: url("+s+");\n}\n")),document.head.appendChild(i))}),u},p.prototype.text=function(e,t,r,i,n){return p._validateParameters("text",arguments),this._renderer._doFill||this._renderer._doStroke?this._renderer.text.apply(this._renderer,arguments):this},p.prototype.textFont=function(e,t){if(p._validateParameters("textFont",arguments),arguments.length){if(!e)throw new Error("null font passed to textFont");return this._renderer._setProperty("_textFont",e),t&&(this._renderer._setProperty("_textSize",t),this._renderer._setProperty("_textLeading",t*i._DEFAULT_LEADMULT)),this._renderer._applyTextProperties()}return this._renderer._textFont},t.exports=p},{"../core/constants":17,"../core/error_helpers":19,"../core/main":23,"opentype.js":9}],59:[function(e,t,r){"use strict";function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=e("../core/main"),m=e("../core/constants");function f(e,t){for(var r=function(e,t){if("object"!==l(e))e=t;else for(var r in t)void 0===e[r]&&(e[r]=t[r]);return e}(t,{sampleFactor:.1,simplifyThreshold:0}),i=h(e,0,1),n=i/(i*r.sampleFactor),o=[],a=0;a<i;a+=n)o.push(h(e,a));return r.simplifyThreshold&&function(e,t){t=void 0===t?0:t;for(var r=0,i=e.length-1;3<e.length&&0<=i;--i)p(s(e,i-1),s(e,i),s(e,i+1),t)&&(e.splice(i%e.length,1),r++)}(o,r.simplifyThreshold),o}function v(e){for(var t,r=[],i=0;i<e.length;i++)"M"===e[i].type&&(t&&r.push(t),t=[]),t.push(n(e[i]));return r.push(t),r}function n(e){var t=[e.type];return"M"===e.type||"L"===e.type?t.push(e.x,e.y):"C"===e.type?t.push(e.x1,e.y1,e.x2,e.y2,e.x,e.y):"Q"===e.type&&t.push(e.x1,e.y1,e.x,e.y),t}function s(e,t){var r=e.length;return e[t<0?t%r+r:t%r]}function p(e,t,r,i){if(!i)return 0==(n=e,a=r,((o=t)[0]-n[0])*(a[1]-n[1])-(a[0]-n[0])*(o[1]-n[1]));var n,o,a;void 0===p.tmpPoint1&&(p.tmpPoint1=[],p.tmpPoint2=[]);var s=p.tmpPoint1,h=p.tmpPoint2;s.x=t.x-e.x,s.y=t.y-e.y,h.x=r.x-t.x,h.y=r.y-t.y;var l=s.x*h.x+s.y*h.y,u=Math.sqrt(s.x*s.x+s.y*s.y),c=Math.sqrt(h.x*h.x+h.y*h.y);return Math.acos(l/(u*c))<i}function c(e,t,r,i,n,o,a,s,h){var l=1-h,u=Math.pow(l,3),c=Math.pow(l,2),p=h*h,d=p*h,f=u*e+3*c*h*r+3*l*h*h*n+d*a,m=u*t+3*c*h*i+3*l*h*h*o+d*s,v=e+2*h*(r-e)+p*(n-2*r+e),g=t+2*h*(i-t)+p*(o-2*i+t),y=r+2*h*(n-r)+p*(a-2*n+r),b=i+2*h*(o-i)+p*(s-2*o+i),_=l*e+h*r,x=l*t+h*i,w=l*n+h*a,S=l*o+h*s,T=90-180*Math.atan2(v-y,g-b)/Math.PI;return(y<v||g<b)&&(T+=180),{x:f,y:m,m:{x:v,y:g},n:{x:y,y:b},start:{x:_,y:x},end:{x:w,y:S},alpha:T}}function d(e,t,r,i,n,o,a,s,h){return null==h?y(e,t,r,i,n,o,a,s):c(e,t,r,i,n,o,a,s,function(e,t,r,i,n,o,a,s,h){if(h<0||y(e,t,r,i,n,o,a,s)<h)return;var l,u=.5,c=1-u;l=y(e,t,r,i,n,o,a,s,c);for(;.01<Math.abs(l-h);)l=y(e,t,r,i,n,o,a,s,c+=(l<h?1:-1)*(u/=2));return c}(e,t,r,i,n,o,a,s,h))}function h(e,t,r){for(var i,n,o,a,s,h=0,l=0,u=(e=function(e,t){var o,a=b(e),s=t&&b(t),r={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},i={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},n=[],h=[],l=function(e,t,r){var i,n;if(!e)return["C",t.x,t.y,t.x,t.y,t.x,t.y];switch(e[0]in{T:1,Q:1}||(t.qx=t.qy=null),e[0]){case"M":t.X=e[1],t.Y=e[2];break;case"A":e=["C"].concat(function e(t,r,i,n,o,a,s,h,l,u){var c,p,d,f,m,v=Math.PI,g=120*v/180,y=v/180*(+o||0),b=[],_=function(e,t,r){var i=e*Math.cos(r)-t*Math.sin(r),n=e*Math.sin(r)+t*Math.cos(r);return{x:i,y:n}};if(u)c=u[0],p=u[1],d=u[2],f=u[3];else{m=_(t,r,-y),t=m.x,r=m.y,m=_(h,l,-y),h=m.x,l=m.y;var x=(t-h)/2,w=(r-l)/2,S=x*x/(i*i)+w*w/(n*n);1<S&&(S=Math.sqrt(S),i*=S,n*=S);var T=i*i,M=n*n,E=(a===s?-1:1)*Math.sqrt(Math.abs((T*M-T*w*w-M*x*x)/(T*w*w+M*x*x)));d=E*i*w/n+(t+h)/2,f=E*-n*x/i+(r+l)/2,c=Math.asin(((r-f)/n).toFixed(9)),p=Math.asin(((l-f)/n).toFixed(9)),(c=t<d?v-c:c)<0&&(c=2*v+c),(p=h<d?v-p:p)<0&&(p=2*v+p),s&&p<c&&(c-=2*v),!s&&c<p&&(p-=2*v)}var C=p-c;if(Math.abs(C)>g){var R=p,L=h,D=l;p=c+g*(s&&c<p?1:-1),h=d+i*Math.cos(p),l=f+n*Math.sin(p),b=e(h,l,i,n,o,0,s,L,D,[p,R,d,f])}C=p-c;var P=Math.cos(c),I=Math.sin(c),k=Math.cos(p),A=Math.sin(p),U=Math.tan(C/4),O=4/3*i*U,B=4/3*n*U,N=[t,r],G=[t+O*I,r-B*P],F=[h+O*A,l-B*k],V=[h,l];G[0]=2*N[0]-G[0];G[1]=2*N[1]-G[1];{if(u)return[G,F,V].concat(b);b=[G,F,V].concat(b).join().split(",");for(var z=[],H=0,j=b.length;H<j;H++)z[H]=H%2?_(b[H-1],b[H],y).y:_(b[H],b[H+1],y).x;return z}}.apply(0,[t.x,t.y].concat(e.slice(1))));break;case"S":n="C"===r||"S"===r?(i=2*t.x-t.bx,2*t.y-t.by):(i=t.x,t.y),e=["C",i,n].concat(e.slice(1));break;case"T":t.qy="Q"===r||"T"===r?(t.qx=2*t.x-t.qx,2*t.y-t.qy):(t.qx=t.x,t.y),e=["C"].concat(x(t.x,t.y,t.qx,t.qy,e[1],e[2]));break;case"Q":t.qx=e[1],t.qy=e[2],e=["C"].concat(x(t.x,t.y,e[1],e[2],e[3],e[4]));break;case"L":e=["C"].concat(_(t.x,t.y,e[1],e[2]));break;case"H":e=["C"].concat(_(t.x,t.y,e[1],t.y));break;case"V":e=["C"].concat(_(t.x,t.y,t.x,e[1]));break;case"Z":e=["C"].concat(_(t.x,t.y,t.X,t.Y))}return e},u=function(e,t){if(7<e[t].length){e[t].shift();for(var r=e[t];r.length;)n[t]="A",s&&(h[t]="A"),e.splice(t++,0,["C"].concat(r.splice(0,6)));e.splice(t,1),o=Math.max(a.length,s&&s.length||0)}},c=function(e,t,r,i,n){e&&t&&"M"===e[n][0]&&"M"!==t[n][0]&&(t.splice(n,0,["M",i.x,i.y]),r.bx=0,r.by=0,r.x=e[n][1],r.y=e[n][2],o=Math.max(a.length,s&&s.length||0))},p="",d="";o=Math.max(a.length,s&&s.length||0);for(var f=0;f<o;f++){a[f]&&(p=a[f][0]),"C"!==p&&(n[f]=p,f&&(d=n[f-1])),a[f]=l(a[f],r,d),"A"!==n[f]&&"C"===p&&(n[f]="C"),u(a,f),s&&(s[f]&&(p=s[f][0]),"C"!==p&&(h[f]=p,f&&(d=h[f-1])),s[f]=l(s[f],i,d),"A"!==h[f]&&"C"===p&&(h[f]="C"),u(s,f)),c(a,s,r,i,f),c(s,a,i,r,f);var m=a[f],v=s&&s[f],g=m.length,y=s&&v.length;r.x=m[g-2],r.y=m[g-1],r.bx=parseFloat(m[g-4])||r.x,r.by=parseFloat(m[g-3])||r.y,i.bx=s&&(parseFloat(v[y-4])||i.x),i.by=s&&(parseFloat(v[y-3])||i.y),i.x=s&&v[y-2],i.y=s&&v[y-1]}return s?[a,s]:a}(e)).length;l<u;l++){if("M"===(o=e[l])[0])i=+o[1],n=+o[2];else{if(t<h+(a=d(i,n,o[1],o[2],o[3],o[4],o[5],o[6]))&&!r)return{x:(s=d(i,n,o[1],o[2],o[3],o[4],o[5],o[6],t-h)).x,y:s.y,alpha:s.alpha};h+=a,i=+o[5],n=+o[6]}o.shift()+o}return(s=r?h:c(i,n,o[0],o[1],o[2],o[3],o[4],o[5],1)).alpha&&(s={x:s.x,y:s.y,alpha:s.alpha}),s}function b(e){var t=[],r=0,i=0,n=0,o=0,a=0;if(!e)return t;"M"===e[0][0]&&(n=r=+e[0][1],o=i=+e[0][2],a++,t[0]=["M",r,i]);for(var s,h,l,u=3===e.length&&"M"===e[0][0]&&"R"===e[1][0].toUpperCase()&&"Z"===e[2][0].toUpperCase(),c=a,p=e.length;c<p;c++){if(t.push(h=[]),(l=e[c])[0]!==String.prototype.toUpperCase.call(l[0]))switch(h[0]=String.prototype.toUpperCase.call(l[0]),h[0]){case"A":h[1]=l[1],h[2]=l[2],h[3]=l[3],h[4]=l[4],h[5]=l[5],h[6]=+(l[6]+r),h[7]=+(l[7]+i);break;case"V":h[1]=+l[1]+i;break;case"H":h[1]=+l[1]+r;break;case"R":for(var d=2,f=(s=[r,i].concat(l.slice(1))).length;d<f;d++)s[d]=+s[d]+r,s[++d]=+s[d]+i;t.pop(),t=t.concat(g(s,u));break;case"M":n=+l[1]+r,o=+l[2]+i;break;default:for(d=1,f=l.length;d<f;d++)h[d]=+l[d]+(d%2?r:i)}else if("R"===l[0])s=[r,i].concat(l.slice(1)),t.pop(),t=t.concat(g(s,u)),h=["R"].concat(l.slice(-2));else for(var m=0,v=l.length;m<v;m++)h[m]=l[m];switch(h[0]){case"Z":r=n,i=o;break;case"H":r=h[1];break;case"V":i=h[1];break;case"M":n=h[h.length-2],o=h[h.length-1];break;default:r=h[h.length-2],i=h[h.length-1]}}return t}function g(e,t){for(var r=[],i=0,n=e.length;i<n-2*!t;i+=2){var o=[{x:+e[i-2],y:+e[i-1]},{x:+e[i],y:+e[i+1]},{x:+e[i+2],y:+e[i+3]},{x:+e[i+4],y:+e[i+5]}];t?i?n-4===i?o[3]={x:+e[0],y:+e[1]}:n-2===i&&(o[2]={x:+e[0],y:+e[1]},o[3]={x:+e[2],y:+e[3]}):o[0]={x:+e[n-2],y:+e[n-1]}:n-4===i?o[3]=o[2]:i||(o[0]={x:+e[i],y:+e[i+1]}),r.push(["C",(-o[0].x+6*o[1].x+o[2].x)/6,(-o[0].y+6*o[1].y+o[2].y)/6,(o[1].x+6*o[2].x-o[3].x)/6,(o[1].y+6*o[2].y-o[3].y)/6,o[2].x,o[2].y])}return r}function _(e,t,r,i){return[e,t,r,i,r,i]}function x(e,t,r,i,n,o){return[1/3*e+2/3*r,1/3*t+2/3*i,1/3*n+2/3*r,1/3*o+2/3*i,n,o]}function y(e,t,r,i,n,o,a,s,h){null==h&&(h=1);for(var l=(h=1<h?1:h<0?0:h)/2,u=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],c=0,p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0;d<12;d++){var f=l*u[d]+l,m=w(f,e,r,n,a),v=w(f,t,i,o,s),g=m*m+v*v;c+=p[d]*Math.sqrt(g)}return l*c}function w(e,t,r,i,n){return e*(e*(-3*t+9*r-9*i+3*n)+6*t-12*r+6*i)-3*t+3*r}i.Font=function(e){this.parent=e,this.cache={},this.font=void 0},i.Font.prototype.textBounds=function(e,t,r,i,n){t=void 0!==t?t:0,r=void 0!==r?r:0;var o,a=n&&n.renderer&&n.renderer._pInst||this.parent,s=a._renderer.drawingContext;s.textAlign||m.LEFT,s.textBaseline||m.BASELINE;if(i=i||a._renderer._textSize,!o){var h,l,u,c,p=[],d=[],f=this._scale(i);this.font.forEachGlyph(e,t,r,i,n,function(e,t,r,i){var n=e.getMetrics();p.push(t+n.xMin*f),p.push(t+n.xMax*f),d.push(r+-n.yMin*f),d.push(r+-n.yMax*f)}),h=Math.min.apply(null,p),l=Math.min.apply(null,d),u=Math.max.apply(null,p),o={x:h,y:l,h:Math.max.apply(null,d)-l,w:u-h,advance:h-t},c=this._handleAlignment(a._renderer,e,o.x,o.y,o.w+o.advance),o.x=c.x,o.y=c.y}return o},i.Font.prototype.textToPoints=function(e,t,r,i,n){var o,a=0,s=[],h=this._getGlyphs(e);i=i||this.parent._renderer._textSize;for(var l=0;l<h.length;l++){if(!(h[o=l].name&&"space"===h[o].name||e.length===h.length&&" "===e[o]||h[o].index&&3===h[o].index))for(var u=v(h[l].getPath(t,r,i).commands),c=0;c<u.length;c++)for(var p=f(u[c],n),d=0;d<p.length;d++)p[d].x+=a,s.push(p[d]);a+=h[l].advanceWidth*this._scale(i)}return s},i.Font.prototype._getGlyphs=function(e){return this.font.stringToGlyphs(e)},i.Font.prototype._getPath=function(e,t,r,i){var n=(i&&i.renderer&&i.renderer._pInst||this.parent)._renderer,o=this._handleAlignment(n,e,t,r);return this.font.getPath(e,o.x,o.y,n._textSize,i)},i.Font.prototype._getPathData=function(e,t,r,i){var n=3;return"string"==typeof e&&2<arguments.length?e=this._getPath(e,t,r,i):"object"===l(t)&&(i=t),i&&"number"==typeof i.decimals&&(n=i.decimals),e.toPathData(n)},i.Font.prototype._getSVG=function(e,t,r,i){var n=3;return"string"==typeof e&&2<arguments.length?e=this._getPath(e,t,r,i):"object"===l(t)&&(i=t),i&&("number"==typeof i.decimals&&(n=i.decimals),"number"==typeof i.strokeWidth&&(e.strokeWidth=i.strokeWidth),void 0!==i.fill&&(e.fill=i.fill),void 0!==i.stroke&&(e.stroke=i.stroke)),e.toSVG(n)},i.Font.prototype._renderPath=function(e,t,r,i){var n,o=i&&i.renderer||this.parent._renderer,a=o.drawingContext;n="object"===l(e)&&e.commands?e.commands:this._getPath(e,t,r,i).commands,a.beginPath();for(var s=0;s<n.length;s+=1){var h=n[s];"M"===h.type?a.moveTo(h.x,h.y):"L"===h.type?a.lineTo(h.x,h.y):"C"===h.type?a.bezierCurveTo(h.x1,h.y1,h.x2,h.y2,h.x,h.y):"Q"===h.type?a.quadraticCurveTo(h.x1,h.y1,h.x,h.y):"Z"===h.type&&a.closePath()}return o._doStroke&&o._strokeSet&&a.stroke(),o._doFill&&(o._fillSet||o._setFill(m._DEFAULT_TEXT_FILL),a.fill()),this},i.Font.prototype._textWidth=function(e,t){return this.font.getAdvanceWidth(e,t)},i.Font.prototype._textAscent=function(e){return this.font.ascender*this._scale(e)},i.Font.prototype._textDescent=function(e){return-this.font.descender*this._scale(e)},i.Font.prototype._scale=function(e){return 1/this.font.unitsPerEm*(e||this.parent._renderer._textSize)},i.Font.prototype._handleAlignment=function(e,t,r,i,n){var o=e._textSize;switch(void 0===n&&(n=this._textWidth(t,o)),e._textAlign){case m.CENTER:r-=n/2;break;case m.RIGHT:r-=n}switch(e._textBaseline){case m.TOP:i+=this._textAscent(o);break;case m.CENTER:i+=this._textAscent(o)/2;break;case m.BOTTOM:i-=this._textDescent(o)}return{x:r,y:i}},t.exports=i},{"../core/constants":17,"../core/main":23}],60:[function(e,t,r){"use strict";var i=e("../core/main");i.prototype.append=function(e,t){return e.push(t),e},i.prototype.arrayCopy=function(e,t,r,i,n){var o,a;e=void 0!==n?(a=Math.min(n,e.length),o=i,e.slice(t,a+t)):(a=void 0!==r?(a=r,Math.min(a,e.length)):e.length,o=0,r=t,e.slice(0,a)),Array.prototype.splice.apply(r,[o,a].concat(e))},i.prototype.concat=function(e,t){return e.concat(t)},i.prototype.reverse=function(e){return e.reverse()},i.prototype.shorten=function(e){return e.pop(),e},i.prototype.shuffle=function(e,t){for(var r,i,n=ArrayBuffer&&ArrayBuffer.isView&&ArrayBuffer.isView(e),o=(e=t||n?e:e.slice()).length;1<o;)r=Math.random()*o|0,i=e[--o],e[o]=e[r],e[r]=i;return e},i.prototype.sort=function(e,t){var r=t?e.slice(0,Math.min(t,e.length)):e,i=t?e.slice(Math.min(t,e.length)):[];return(r="string"==typeof r[0]?r.sort():r.sort(function(e,t){return e-t})).concat(i)},i.prototype.splice=function(e,t,r){return Array.prototype.splice.apply(e,[r,0].concat(t)),e},i.prototype.subset=function(e,t,r){return void 0!==r?e.slice(t,t+r):e.slice(t,e.length)},t.exports=i},{"../core/main":23}],61:[function(e,t,r){"use strict";var i=e("../core/main");i.prototype.float=function(e){return e instanceof Array?e.map(parseFloat):parseFloat(e)},i.prototype.int=function(e,t){return t=t||10,e===1/0||"Infinity"===e?1/0:e===-1/0||"-Infinity"===e?-1/0:"string"==typeof e?parseInt(e,t):"number"==typeof e?0|e:"boolean"==typeof e?e?1:0:e instanceof Array?e.map(function(e){return i.prototype.int(e,t)}):void 0},i.prototype.str=function(e){return e instanceof Array?e.map(i.prototype.str):String(e)},i.prototype.boolean=function(e){return"number"==typeof e?0!==e:"string"==typeof e?"true"===e.toLowerCase():"boolean"==typeof e?e:e instanceof Array?e.map(i.prototype.boolean):void 0},i.prototype.byte=function(e){var t=i.prototype.int(e,10);return"number"==typeof t?(t+128)%256-128:t instanceof Array?t.map(i.prototype.byte):void 0},i.prototype.char=function(e){return"number"!=typeof e||isNaN(e)?e instanceof Array?e.map(i.prototype.char):"string"==typeof e?i.prototype.char(parseInt(e,10)):void 0:String.fromCharCode(e)},i.prototype.unchar=function(e){return"string"==typeof e&&1===e.length?e.charCodeAt(0):e instanceof Array?e.map(i.prototype.unchar):void 0},i.prototype.hex=function(e,t){if(t=null==t?t=8:t,e instanceof Array)return e.map(function(e){return i.prototype.hex(e,t)});if(e===1/0||e===-1/0)return(e===1/0?"F":"0").repeat(t);if("number"==typeof e){e<0&&(e=4294967295+e+1);for(var r=Number(e).toString(16).toUpperCase();r.length<t;)r="0"+r;return r.length>=t&&(r=r.substring(r.length-t,r.length)),r}},i.prototype.unhex=function(e){return e instanceof Array?e.map(i.prototype.unhex):parseInt("0x"+e,16)},t.exports=i},{"../core/main":23}],62:[function(e,t,r){"use strict";var a=e("../core/main");function i(e,t,r){var i=e<0,n=i?e.toString().substring(1):e.toString(),o=n.indexOf("."),a=-1!==o?n.substring(0,o):n,s=-1!==o?n.substring(o+1):"",h=i?"-":"";if(void 0!==r){var l="";(-1!==o||0<r-s.length)&&(l="."),s.length>r&&(s=s.substring(0,r));for(var u=0;u<t-a.length;u++)h+="0";h+=a,h+=l,h+=s;for(var c=0;c<r-s.length;c++)h+="0";return h}for(var p=0;p<Math.max(t-a.length,0);p++)h+="0";return h+=n}function n(e,t){var r=(e=e.toString()).indexOf("."),i=-1!==r?e.substring(r):"",n=-1!==r?e.substring(0,r):e;if(n=n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),0===t)i="";else if(void 0!==t)if(t>i.length)for(var o=t-(i+=-1===r?".":"").length+1,a=0;a<o;a++)i+="0";else i=i.substring(0,t+1);return n+i}function o(e){return 0<parseFloat(e)?"+"+e.toString():e.toString()}function s(e){return 0<=parseFloat(e)?" "+e.toString():e.toString()}e("../core/error_helpers"),a.prototype.join=function(e,t){return a._validateParameters("join",arguments),e.join(t)},a.prototype.match=function(e,t){return a._validateParameters("match",arguments),e.match(t)},a.prototype.matchAll=function(e,t){a._validateParameters("matchAll",arguments);for(var r=new RegExp(t,"g"),i=r.exec(e),n=[];null!==i;)n.push(i),i=r.exec(e);return n},a.prototype.nf=function(e,t,r){return a._validateParameters("nf",arguments),e instanceof Array?e.map(function(e){return i(e,t,r)}):"[object Arguments]"===Object.prototype.toString.call(e)?3===e.length?this.nf(e[0],e[1],e[2]):2===e.length?this.nf(e[0],e[1]):this.nf(e[0]):i(e,t,r)},a.prototype.nfc=function(e,t){return a._validateParameters("nfc",arguments),e instanceof Array?e.map(function(e){return n(e,t)}):n(e,t)},a.prototype.nfp=function(){a._validateParameters("nfp",arguments);var e=a.prototype.nf.apply(this,arguments);return e instanceof Array?e.map(o):o(e)},a.prototype.nfs=function(){a._validateParameters("nfs",arguments);var e=a.prototype.nf.apply(this,arguments);return e instanceof Array?e.map(s):s(e)},a.prototype.split=function(e,t){return a._validateParameters("split",arguments),e.split(t)},a.prototype.splitTokens=function(e,t){var r;if(a._validateParameters("splitTokens",arguments),void 0!==t){var i=t,n=/\]/g.exec(i),o=/\[/g.exec(i);r=o&&n?(i=i.slice(0,n.index)+i.slice(n.index+1),o=/\[/g.exec(i),i=i.slice(0,o.index)+i.slice(o.index+1),new RegExp("[\\["+i+"\\]]","g")):n?(i=i.slice(0,n.index)+i.slice(n.index+1),new RegExp("["+i+"\\]]","g")):o?(i=i.slice(0,o.index)+i.slice(o.index+1),new RegExp("["+i+"\\[]","g")):new RegExp("["+i+"]","g")}else r=/\s/g;return e.split(r).filter(function(e){return e})},a.prototype.trim=function(e){return a._validateParameters("trim",arguments),e instanceof Array?e.map(this.trim):e.trim()},t.exports=a},{"../core/error_helpers":19,"../core/main":23}],63:[function(e,t,r){"use strict";var i=e("../core/main");i.prototype.day=function(){return(new Date).getDate()},i.prototype.hour=function(){return(new Date).getHours()},i.prototype.minute=function(){return(new Date).getMinutes()},i.prototype.millis=function(){return window.performance.now()},i.prototype.month=function(){return(new Date).getMonth()+1},i.prototype.second=function(){return(new Date).getSeconds()},i.prototype.year=function(){return(new Date).getFullYear()},t.exports=i},{"../core/main":23}],64:[function(e,t,r){"use strict";var E=e("../core/main");e("./p5.Geometry");var d=e("../core/constants");E.prototype.plane=function(e,t,r,i){this._assert3d("plane"),E._validateParameters("plane",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=1),void 0===i&&(i=1);var n="plane|"+r+"|"+i;if(!this._renderer.geometryInHash(n)){var o=new E.Geometry(r,i,function(){for(var e,t,r,i=0;i<=this.detailY;i++){t=i/this.detailY;for(var n=0;n<=this.detailX;n++)e=n/this.detailX,r=new E.Vector(e-.5,t-.5,0),this.vertices.push(r),this.uvs.push(e,t)}});o.computeFaces().computeNormals(),r<=1&&i<=1?o._makeTriangleEdges()._edgesToVertices():console.log("Cannot draw stroke on plane objects with more than 1 detailX or 1 detailY"),this._renderer.createBuffers(n,o)}return this._renderer.drawBuffersScaled(n,e,t,1),this},E.prototype.box=function(e,t,r,i,n){this._assert3d("box"),E._validateParameters("box",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=t);var o=this._renderer.attributes&&this._renderer.attributes.perPixelLighting;void 0===i&&(i=o?1:4),void 0===n&&(n=o?1:4);var a="box|"+i+"|"+n;if(!this._renderer.geometryInHash(a)){var s=new E.Geometry(i,n,function(){var e=[[0,4,2,6],[1,3,5,7],[0,1,4,5],[2,6,3,7],[0,2,1,3],[4,5,6,7]];this.strokeIndices=[[0,1],[1,3],[3,2],[6,7],[8,9],[9,11],[14,15],[16,17],[17,19],[18,19],[20,21],[22,23]];for(var t=0;t<e.length;t++){for(var r=e[t],i=4*t,n=0;n<4;n++){var o=r[n],a=new E.Vector((2*(1&o)-1)/2,((2&o)-1)/2,((4&o)/2-1)/2);this.vertices.push(a),this.uvs.push(1&n,(2&n)/2)}this.faces.push([i,i+1,i+2]),this.faces.push([i+2,i+1,i+3])}});s.computeNormals(),i<=4&&n<=4?s._makeTriangleEdges()._edgesToVertices():console.log("Cannot draw stroke on box objects with more than 4 detailX or 4 detailY"),this._renderer.createBuffers(a,s)}return this._renderer.drawBuffersScaled(a,e,t,r),this},E.prototype.sphere=function(e,t,r){return this._assert3d("sphere"),E._validateParameters("sphere",arguments),void 0===e&&(e=50),void 0===t&&(t=24),void 0===r&&(r=16),this.ellipsoid(e,e,e,t,r),this};var h=function(e,t,r,i,n,o,a){e=e<=0?1:e,t=t<0?0:t,r=r<=0?e:r,i=i<3?3:i;var s,h,l,u=(o=void 0===o||o)?-2:0,c=(n=n<1?1:n)+((a=void 0===a?0!==t:a)?2:0),p=Math.atan2(e-t,r),d=Math.sin(p),f=Math.cos(p);for(s=u;s<=c;++s){var m,v=s/n,g=r*v;for(m=s<0?(v=g=0,e):n<s?(g=r,v=1,t):e+(t-e)*v,-2!==s&&s!==n+2||(m=0),g-=r/2,h=0;h<i;++h){var y,b=h/i,_=2*Math.PI*b,x=Math.sin(_),w=Math.cos(_);this.vertices.push(new E.Vector(x*m,g,w*m)),y=s<0?new E.Vector(0,-1,0):n<s&&t?new E.Vector(0,1,0):new E.Vector(x*f,d,w*f),this.vertexNormals.push(y),this.uvs.push(b,v)}}var S=0;if(o){for(l=0;l<i;++l){var T=(l+1)%i;this.faces.push([S+l,S+i+T,S+i+l])}S+=2*i}for(s=0;s<n;++s){for(h=0;h<i;++h){var M=(h+1)%i;this.faces.push([S+h,S+M,S+i+M]),this.faces.push([S+h,S+i+M,S+i+h])}S+=i}if(a)for(S+=i,h=0;h<i;++h)this.faces.push([S+h,S+(h+1)%i,S+i])};E.prototype.cylinder=function(e,t,r,i,n,o){this._assert3d("cylinder"),E._validateParameters("cylinder",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=24),void 0===i&&(i=1),void 0===o&&(o=!0),void 0===n&&(n=!0);var a="cylinder|"+r+"|"+i+"|"+n+"|"+o;if(!this._renderer.geometryInHash(a)){var s=new E.Geometry(r,i);h.call(s,1,1,1,r,i,n,o),r<=24&&i<=16?s._makeTriangleEdges()._edgesToVertices():console.log("Cannot draw stroke on cylinder objects with more than 24 detailX or 16 detailY"),this._renderer.createBuffers(a,s)}return this._renderer.drawBuffersScaled(a,e,t,e),this},E.prototype.cone=function(e,t,r,i,n){this._assert3d("cone"),E._validateParameters("cone",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=24),void 0===i&&(i=1),void 0===n&&(n=!0);var o="cone|"+r+"|"+i+"|"+n;if(!this._renderer.geometryInHash(o)){var a=new E.Geometry(r,i);h.call(a,1,0,1,r,i,n,!1),r<=24&&i<=16?a._makeTriangleEdges()._edgesToVertices():console.log("Cannot draw stroke on cone objects with more than 24 detailX or 16 detailY"),this._renderer.createBuffers(o,a)}return this._renderer.drawBuffersScaled(o,e,t,e),this},E.prototype.ellipsoid=function(e,t,r,i,n){this._assert3d("ellipsoid"),E._validateParameters("ellipsoid",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=e),void 0===i&&(i=24),void 0===n&&(n=16);var o="ellipsoid|"+i+"|"+n;if(!this._renderer.geometryInHash(o)){var a=new E.Geometry(i,n,function(){for(var e=0;e<=this.detailY;e++)for(var t=e/this.detailY,r=Math.PI*t-Math.PI/2,i=Math.cos(r),n=Math.sin(r),o=0;o<=this.detailX;o++){var a=o/this.detailX,s=2*Math.PI*a,h=Math.cos(s),l=Math.sin(s),u=new E.Vector(i*l,n,i*h);this.vertices.push(u),this.vertexNormals.push(u),this.uvs.push(a,t)}});a.computeFaces(),i<=24&&n<=24?a._makeTriangleEdges()._edgesToVertices():console.log("Cannot draw stroke on ellipsoids with more than 24 detailX or 24 detailY"),this._renderer.createBuffers(o,a)}return this._renderer.drawBuffersScaled(o,e,t,r),this},E.prototype.torus=function(e,t,r,i){if(this._assert3d("torus"),E._validateParameters("torus",arguments),void 0===e)e=50;else if(!e)return;if(void 0===t)t=10;else if(!t)return;void 0===r&&(r=24),void 0===i&&(i=16);var d=(t/e).toPrecision(4),n="torus|"+d+"|"+r+"|"+i;if(!this._renderer.geometryInHash(n)){var o=new E.Geometry(r,i,function(){for(var e=0;e<=this.detailY;e++)for(var t=e/this.detailY,r=2*Math.PI*t,i=Math.cos(r),n=Math.sin(r),o=1+d*i,a=0;a<=this.detailX;a++){var s=a/this.detailX,h=2*Math.PI*s,l=Math.cos(h),u=Math.sin(h),c=new E.Vector(o*l,o*u,d*n),p=new E.Vector(i*l,i*u,n);this.vertices.push(c),this.vertexNormals.push(p),this.uvs.push(s,t)}});o.computeFaces(),r<=24&&i<=16?o._makeTriangleEdges()._edgesToVertices():console.log("Cannot draw strokes on torus object with more than 24 detailX or 16 detailY"),this._renderer.createBuffers(n,o)}return this._renderer.drawBuffersScaled(n,e,e,e),this},E.RendererGL.prototype.point=function(e,t,r){void 0===r&&(r=0);var i=[];return i.push(new E.Vector(e,t,r)),this._drawPoints(i,this._pointVertexBuffer),this},E.RendererGL.prototype.triangle=function(e){var t=e[0],r=e[1],i=e[2],n=e[3],o=e[4],a=e[5];if(!this.geometryInHash("tri")){var s=new E.Geometry(1,1,function(){var e=[];e.push(new E.Vector(0,0,0)),e.push(new E.Vector(0,1,0)),e.push(new E.Vector(1,0,0)),this.strokeIndices=[[0,1],[1,2],[2,0]],this.vertices=e,this.faces=[[0,1,2]],this.uvs=[0,0,0,1,1,1]});s._makeTriangleEdges()._edgesToVertices(),s.computeNormals(),this.createBuffers("tri",s)}var h=this.uMVMatrix.copy();try{var l=new E.Matrix([i-t,n-r,0,0,o-t,a-r,0,0,0,0,1,0,t,r,0,1]).mult(this.uMVMatrix);this.uMVMatrix=l,this.drawBuffers("tri")}finally{this.uMVMatrix=h}return this},E.RendererGL.prototype.ellipse=function(e){this.arc(e[0],e[1],e[2],e[3],0,d.TWO_PI,d.OPEN,e[4])},E.RendererGL.prototype.arc=function(e){var t,r,i=e,n=arguments[1],o=arguments[2],a=arguments[3],s=arguments[4],h=arguments[5],l=arguments[6],u=arguments[7]||25;if(r=Math.abs(h-s)>=d.TWO_PI?(t="ellipse")+"|"+u+"|":(t="arc")+"|"+s+"|"+h+"|"+l+"|"+u+"|",!this.geometryInHash(r)){var c=new E.Geometry(u,1,function(){if(this.strokeIndices=[],s.toFixed(10)!==h.toFixed(10)){l!==d.PIE&&void 0!==l||(this.vertices.push(new E.Vector(.5,.5,0)),this.uvs.push([.5,.5]));for(var e=0;e<=u;e++){var t=e/u*(h-s)+s,r=.5+Math.cos(t)/2,i=.5+Math.sin(t)/2;this.vertices.push(new E.Vector(r,i,0)),this.uvs.push([r,i]),e<u-1&&(this.faces.push([0,e+1,e+2]),this.strokeIndices.push([e+1,e+2]))}switch(l){case d.PIE:this.faces.push([0,this.vertices.length-2,this.vertices.length-1]),this.strokeIndices.push([0,1]),this.strokeIndices.push([this.vertices.length-2,this.vertices.length-1]),this.strokeIndices.push([0,this.vertices.length-1]);break;case d.CHORD:this.strokeIndices.push([0,1]),this.strokeIndices.push([0,this.vertices.length-1]);break;case d.OPEN:this.strokeIndices.push([0,1]);break;default:this.faces.push([0,this.vertices.length-2,this.vertices.length-1]),this.strokeIndices.push([this.vertices.length-2,this.vertices.length-1])}}});c.computeNormals(),u<=50?c._makeTriangleEdges()._edgesToVertices(c):console.log("Cannot stroke "+t+" with more than 50 detail"),this.createBuffers(r,c)}var p=this.uMVMatrix.copy();try{this.uMVMatrix.translate([i,n,0]),this.uMVMatrix.scale(o,a,1),this.drawBuffers(r)}finally{this.uMVMatrix=p}return this},E.RendererGL.prototype.rect=function(e){var t=this._pInst._glAttributes.perPixelLighting,r=e[0],i=e[1],n=e[2],o=e[3],a=e[4]||(t?1:24),s=e[5]||(t?1:16),h="rect|"+a+"|"+s;if(!this.geometryInHash(h)){var l=new E.Geometry(a,s,function(){for(var e=0;e<=this.detailY;e++)for(var t=e/this.detailY,r=0;r<=this.detailX;r++){var i=r/this.detailX,n=new E.Vector(i,t,0);this.vertices.push(n),this.uvs.push(i,t)}0<a&&0<s&&(this.strokeIndices=[[0,a],[a,(a+1)*(s+1)-1],[(a+1)*(s+1)-1,(a+1)*s],[(a+1)*s,0]])});l.computeFaces().computeNormals()._makeTriangleEdges()._edgesToVertices(),this.createBuffers(h,l)}var u=this.uMVMatrix.copy();try{this.uMVMatrix.translate([r,i,0]),this.uMVMatrix.scale(n,o,1),this.drawBuffers(h)}finally{this.uMVMatrix=u}return this},E.RendererGL.prototype.quad=function(e,t,r,i,n,o,a,s,h,l,u,c){var p="quad|"+e+"|"+t+"|"+r+"|"+i+"|"+n+"|"+o+"|"+a+"|"+s+"|"+h+"|"+l+"|"+u+"|"+c;if(!this.geometryInHash(p)){var d=new E.Geometry(2,2,function(){this.vertices.push(new E.Vector(e,t,r)),this.vertices.push(new E.Vector(i,n,o)),this.vertices.push(new E.Vector(a,s,h)),this.vertices.push(new E.Vector(l,u,c)),this.uvs.push(0,0,1,0,1,1,0,1),this.strokeIndices=[[0,1],[1,2],[2,3],[3,0]]});d.computeNormals()._makeTriangleEdges()._edgesToVertices(),d.faces=[[0,1,2],[2,3,0]],this.createBuffers(p,d)}return this.drawBuffers(p),this},E.RendererGL.prototype.bezier=function(e,t,r,i,n,o,a,s,h,l,u,c){8===arguments.length&&(u=s,l=a,s=o,a=n,n=i,i=r,r=o=h=c=0);var p=this._pInst._bezierDetail||20;this.beginShape();for(var d=0;d<=p;d++){var f=Math.pow(1-d/p,3),m=d/p*3*Math.pow(1-d/p,2),v=3*Math.pow(d/p,2)*(1-d/p),g=Math.pow(d/p,3);this.vertex(e*f+i*m+a*v+l*g,t*f+n*m+s*v+u*g,r*f+o*m+h*v+c*g)}return this.endShape(),this},E.RendererGL.prototype.curve=function(e,t,r,i,n,o,a,s,h,l,u,c){8===arguments.length&&(l=a,u=s,a=n,s=i,n=i=r,r=o=h=c=0);var p=this._pInst._curveDetail;this.beginShape();for(var d=0;d<=p;d++){var f=.5*Math.pow(d/p,3),m=.5*Math.pow(d/p,2),v=d/p*.5,g=f*(3*i-e-3*a+l)+m*(2*e-5*i+4*a-l)+v*(-e+a)+2*i*.5,y=f*(3*n-t-3*s+u)+m*(2*t-5*n+4*s-u)+v*(-t+s)+2*n*.5,b=f*(3*o-r-3*h+c)+m*(2*r-5*o+4*h-c)+v*(-r+h)+2*o*.5;this.vertex(g,y,b)}return this.endShape(),this},E.RendererGL.prototype.line=function(){return 6===arguments.length?(this.beginShape(),this.vertex(arguments[0],arguments[1],arguments[2]),this.vertex(arguments[3],arguments[4],arguments[5]),this.endShape()):4===arguments.length&&(this.beginShape(),this.vertex(arguments[0],arguments[1],0),this.vertex(arguments[2],arguments[3],0),this.endShape()),this},E.RendererGL.prototype.bezierVertex=function(){if(0===this.immediateMode._bezierVertex.length)throw Error("vertex() must be used once before calling bezierVertex()");var e,t,r,i,n,o=[],a=[],s=[],h=arguments.length;if((e=0)===this._lookUpTableBezier.length||this._lutBezierDetail!==this._pInst._curveDetail){this._lookUpTableBezier=[],this._lutBezierDetail=this._pInst._curveDetail;for(var l=1/this._lutBezierDetail,u=0,c=1,p=0;u<1;){if(e=parseFloat(u.toFixed(6)),this._lookUpTableBezier[p]=this._bezierCoefficients(e),c.toFixed(6)===l.toFixed(6)){e=parseFloat(c.toFixed(6))+parseFloat(u.toFixed(6)),++p,this._lookUpTableBezier[p]=this._bezierCoefficients(e);break}u+=l,c-=l,++p}}var d=this._lookUpTableBezier.length;if(6===h){for(this.isBezier=!0,o=[this.immediateMode._bezierVertex[0],arguments[0],arguments[2],arguments[4]],a=[this.immediateMode._bezierVertex[1],arguments[1],arguments[3],arguments[5]],n=0;n<d;n++)t=o[0]*this._lookUpTableBezier[n][0]+o[1]*this._lookUpTableBezier[n][1]+o[2]*this._lookUpTableBezier[n][2]+o[3]*this._lookUpTableBezier[n][3],r=a[0]*this._lookUpTableBezier[n][0]+a[1]*this._lookUpTableBezier[n][1]+a[2]*this._lookUpTableBezier[n][2]+a[3]*this._lookUpTableBezier[n][3],this.vertex(t,r);this.immediateMode._bezierVertex[0]=arguments[4],this.immediateMode._bezierVertex[1]=arguments[5]}else if(9===h){for(this.isBezier=!0,o=[this.immediateMode._bezierVertex[0],arguments[0],arguments[3],arguments[6]],a=[this.immediateMode._bezierVertex[1],arguments[1],arguments[4],arguments[7]],s=[this.immediateMode._bezierVertex[2],arguments[2],arguments[5],arguments[8]],n=0;n<d;n++)t=o[0]*this._lookUpTableBezier[n][0]+o[1]*this._lookUpTableBezier[n][1]+o[2]*this._lookUpTableBezier[n][2]+o[3]*this._lookUpTableBezier[n][3],r=a[0]*this._lookUpTableBezier[n][0]+a[1]*this._lookUpTableBezier[n][1]+a[2]*this._lookUpTableBezier[n][2]+a[3]*this._lookUpTableBezier[n][3],i=s[0]*this._lookUpTableBezier[n][0]+s[1]*this._lookUpTableBezier[n][1]+s[2]*this._lookUpTableBezier[n][2]+s[3]*this._lookUpTableBezier[n][3],this.vertex(t,r,i);this.immediateMode._bezierVertex[0]=arguments[6],this.immediateMode._bezierVertex[1]=arguments[7],this.immediateMode._bezierVertex[2]=arguments[8]}},E.RendererGL.prototype.quadraticVertex=function(){if(0===this.immediateMode._quadraticVertex.length)throw Error("vertex() must be used once before calling quadraticVertex()");var e,t,r,i,n,o=[],a=[],s=[],h=arguments.length;if((e=0)===this._lookUpTableQuadratic.length||this._lutQuadraticDetail!==this._pInst._curveDetail){this._lookUpTableQuadratic=[],this._lutQuadraticDetail=this._pInst._curveDetail;for(var l=1/this._lutQuadraticDetail,u=0,c=1,p=0;u<1;){if(e=parseFloat(u.toFixed(6)),this._lookUpTableQuadratic[p]=this._quadraticCoefficients(e),c.toFixed(6)===l.toFixed(6)){e=parseFloat(c.toFixed(6))+parseFloat(u.toFixed(6)),++p,this._lookUpTableQuadratic[p]=this._quadraticCoefficients(e);break}u+=l,c-=l,++p}}var d=this._lookUpTableQuadratic.length;if(4===h){for(this.isQuadratic=!0,o=[this.immediateMode._quadraticVertex[0],arguments[0],arguments[2]],a=[this.immediateMode._quadraticVertex[1],arguments[1],arguments[3]],n=0;n<d;n++)t=o[0]*this._lookUpTableQuadratic[n][0]+o[1]*this._lookUpTableQuadratic[n][1]+o[2]*this._lookUpTableQuadratic[n][2],r=a[0]*this._lookUpTableQuadratic[n][0]+a[1]*this._lookUpTableQuadratic[n][1]+a[2]*this._lookUpTableQuadratic[n][2],this.vertex(t,r);this.immediateMode._quadraticVertex[0]=arguments[2],this.immediateMode._quadraticVertex[1]=arguments[3]}else if(6===h){for(this.isQuadratic=!0,o=[this.immediateMode._quadraticVertex[0],arguments[0],arguments[3]],a=[this.immediateMode._quadraticVertex[1],arguments[1],arguments[4]],s=[this.immediateMode._quadraticVertex[2],arguments[2],arguments[5]],n=0;n<d;n++)t=o[0]*this._lookUpTableQuadratic[n][0]+o[1]*this._lookUpTableQuadratic[n][1]+o[2]*this._lookUpTableQuadratic[n][2],r=a[0]*this._lookUpTableQuadratic[n][0]+a[1]*this._lookUpTableQuadratic[n][1]+a[2]*this._lookUpTableQuadratic[n][2],i=s[0]*this._lookUpTableQuadratic[n][0]+s[1]*this._lookUpTableQuadratic[n][1]+s[2]*this._lookUpTableQuadratic[n][2],this.vertex(t,r,i);this.immediateMode._quadraticVertex[0]=arguments[3],this.immediateMode._quadraticVertex[1]=arguments[4],this.immediateMode._quadraticVertex[2]=arguments[5]}},E.RendererGL.prototype.curveVertex=function(){var e,t,r,i,n,o=[],a=[],s=[];e=0;var h=arguments.length;if(0===this._lookUpTableBezier.length||this._lutBezierDetail!==this._pInst._curveDetail){this._lookUpTableBezier=[],this._lutBezierDetail=this._pInst._curveDetail;for(var l=1/this._lutBezierDetail,u=0,c=1,p=0;u<1;){if(e=parseFloat(u.toFixed(6)),this._lookUpTableBezier[p]=this._bezierCoefficients(e),c.toFixed(6)===l.toFixed(6)){e=parseFloat(c.toFixed(6))+parseFloat(u.toFixed(6)),++p,this._lookUpTableBezier[p]=this._bezierCoefficients(e);break}u+=l,c-=l,++p}}var d=this._lookUpTableBezier.length;if(2===h){if(this.immediateMode._curveVertex.push(arguments[0]),this.immediateMode._curveVertex.push(arguments[1]),8===this.immediateMode._curveVertex.length){for(this.isCurve=!0,o=this._bezierToCatmull([this.immediateMode._curveVertex[0],this.immediateMode._curveVertex[2],this.immediateMode._curveVertex[4],this.immediateMode._curveVertex[6]]),a=this._bezierToCatmull([this.immediateMode._curveVertex[1],this.immediateMode._curveVertex[3],this.immediateMode._curveVertex[5],this.immediateMode._curveVertex[7]]),n=0;n<d;n++)t=o[0]*this._lookUpTableBezier[n][0]+o[1]*this._lookUpTableBezier[n][1]+o[2]*this._lookUpTableBezier[n][2]+o[3]*this._lookUpTableBezier[n][3],r=a[0]*this._lookUpTableBezier[n][0]+a[1]*this._lookUpTableBezier[n][1]+a[2]*this._lookUpTableBezier[n][2]+a[3]*this._lookUpTableBezier[n][3],this.vertex(t,r);for(n=0;n<h;n++)this.immediateMode._curveVertex.shift()}}else if(3===h&&(this.immediateMode._curveVertex.push(arguments[0]),this.immediateMode._curveVertex.push(arguments[1]),this.immediateMode._curveVertex.push(arguments[2]),12===this.immediateMode._curveVertex.length)){for(this.isCurve=!0,o=this._bezierToCatmull([this.immediateMode._curveVertex[0],this.immediateMode._curveVertex[3],this.immediateMode._curveVertex[6],this.immediateMode._curveVertex[9]]),a=this._bezierToCatmull([this.immediateMode._curveVertex[1],this.immediateMode._curveVertex[4],this.immediateMode._curveVertex[7],this.immediateMode._curveVertex[10]]),s=this._bezierToCatmull([this.immediateMode._curveVertex[2],this.immediateMode._curveVertex[5],this.immediateMode._curveVertex[8],this.immediateMode._curveVertex[11]]),n=0;n<d;n++)t=o[0]*this._lookUpTableBezier[n][0]+o[1]*this._lookUpTableBezier[n][1]+o[2]*this._lookUpTableBezier[n][2]+o[3]*this._lookUpTableBezier[n][3],r=a[0]*this._lookUpTableBezier[n][0]+a[1]*this._lookUpTableBezier[n][1]+a[2]*this._lookUpTableBezier[n][2]+a[3]*this._lookUpTableBezier[n][3],i=s[0]*this._lookUpTableBezier[n][0]+s[1]*this._lookUpTableBezier[n][1]+s[2]*this._lookUpTableBezier[n][2]+s[3]*this._lookUpTableBezier[n][3],this.vertex(t,r,i);for(n=0;n<h;n++)this.immediateMode._curveVertex.shift()}},E.RendererGL.prototype.image=function(e,t,r,i,n,o,a,s,h){this._pInst.push(),this._pInst.texture(e),this._pInst.textureMode(d.NORMAL);var l=0;t<=e.width&&(l=t/e.width);var u=1;t+i<=e.width&&(u=(t+i)/e.width);var c=0;r<=e.height&&(c=r/e.height);var p=1;r+n<=e.height&&(p=(r+n)/e.height),this.beginShape(),this.vertex(o,a,0,l,c),this.vertex(o+s,a,0,u,c),this.vertex(o+s,a+h,0,u,p),this.vertex(o,a+h,0,l,p),this.endShape(d.CLOSE),this._pInst.pop()},t.exports=E},{"../core/constants":17,"../core/main":23,"./p5.Geometry":70}],65:[function(e,t,r){"use strict";var c=e("../core/main"),i=e("../core/constants");c.prototype.orbitControl=function(e,t){if(this._assert3d("orbitControl"),c._validateParameters("orbitControl",arguments),this.mouseX<this.width&&0<this.mouseX&&this.mouseY<this.height&&0<this.mouseY){var r=this._renderer._curCamera;void 0===e&&(e=1),void 0===t&&(t=e),!0!==this.contextMenuDisabled&&(this.canvas.oncontextmenu=function(){return!1},this._setProperty("contextMenuDisabled",!0)),!0!==this.wheelDefaultDisabled&&(this.canvas.onwheel=function(){return!1},this._setProperty("wheelDefaultDisabled",!0));var i=this.height<this.width?this.height:this.width;if(this._mouseWheelDeltaY!==this._pmouseWheelDeltaY&&(0<this._mouseWheelDeltaY?this._renderer._curCamera._orbit(0,0,.5*i):this._renderer._curCamera._orbit(0,0,-.5*i)),this.mouseIsPressed)if(this.mouseButton===this.LEFT){var n=-e*(this.mouseX-this.pmouseX)/i,o=t*(this.mouseY-this.pmouseY)/i;this._renderer._curCamera._orbit(n,o,0)}else if(this.mouseButton===this.RIGHT){var a=r._getLocalAxes(),s=Math.sqrt(a.x[0]*a.x[0]+a.x[2]*a.x[2]);0!==s&&(a.x[0]/=s,a.x[2]/=s);var h=Math.sqrt(a.y[0]*a.y[0]+a.y[2]*a.y[2]);0!==h&&(a.y[0]/=h,a.y[2]/=h);var l=-1*e*(this.mouseX-this.pmouseX),u=-1*t*(this.mouseY-this.pmouseY);r.setPosition(r.eyeX+l*a.x[0]+u*a.z[0],r.eyeY,r.eyeZ+l*a.x[2]+u*a.z[2])}return this}},c.prototype.debugMode=function(){this._assert3d("debugMode"),c._validateParameters("debugMode",arguments);for(var e=this._registeredMethods.post.length-1;0<=e;e--)this._registeredMethods.post[e].toString()!==this._grid().toString()&&this._registeredMethods.post[e].toString()!==this._axesIcon().toString()||this._registeredMethods.post.splice(e,1);arguments[0]===i.GRID?this.registerMethod("post",this._grid.call(this,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])):arguments[0]===i.AXES?this.registerMethod("post",this._axesIcon.call(this,arguments[1],arguments[2],arguments[3],arguments[4])):(this.registerMethod("post",this._grid.call(this,arguments[0],arguments[1],arguments[2],arguments[3],arguments[4])),this.registerMethod("post",this._axesIcon.call(this,arguments[5],arguments[6],arguments[7],arguments[8])))},c.prototype.noDebugMode=function(){this._assert3d("noDebugMode");for(var e=this._registeredMethods.post.length-1;0<=e;e--)this._registeredMethods.post[e].toString()!==this._grid().toString()&&this._registeredMethods.post[e].toString()!==this._axesIcon().toString()||this._registeredMethods.post.splice(e,1)},c.prototype._grid=function(e,r,i,n,o){void 0===e&&(e=this.width/2),void 0===r&&(r=Math.round(e/30)<4?4:Math.round(e/30)),void 0===i&&(i=0),void 0===n&&(n=0),void 0===o&&(o=0);var a=e/r,s=e/2;return function(){this.push(),this.stroke(255*this._renderer.curStrokeColor[0],255*this._renderer.curStrokeColor[1],255*this._renderer.curStrokeColor[2]),this._renderer.uMVMatrix.set(this._renderer._curCamera.cameraMatrix.mat4[0],this._renderer._curCamera.cameraMatrix.mat4[1],this._renderer._curCamera.cameraMatrix.mat4[2],this._renderer._curCamera.cameraMatrix.mat4[3],this._renderer._curCamera.cameraMatrix.mat4[4],this._renderer._curCamera.cameraMatrix.mat4[5],this._renderer._curCamera.cameraMatrix.mat4[6],this._renderer._curCamera.cameraMatrix.mat4[7],this._renderer._curCamera.cameraMatrix.mat4[8],this._renderer._curCamera.cameraMatrix.mat4[9],this._renderer._curCamera.cameraMatrix.mat4[10],this._renderer._curCamera.cameraMatrix.mat4[11],this._renderer._curCamera.cameraMatrix.mat4[12],this._renderer._curCamera.cameraMatrix.mat4[13],this._renderer._curCamera.cameraMatrix.mat4[14],this._renderer._curCamera.cameraMatrix.mat4[15]);for(var e=0;e<=r;e++)this.beginShape(this.LINES),this.vertex(-s+i,n,e*a-s+o),this.vertex(+s+i,n,e*a-s+o),this.endShape();for(var t=0;t<=r;t++)this.beginShape(this.LINES),this.vertex(t*a-s+i,n,-s+o),this.vertex(t*a-s+i,n,+s+o),this.endShape();this.pop()}},c.prototype._axesIcon=function(e,t,r,i){return void 0===e&&(e=40<this.width/20?this.width/20:40),void 0===t&&(t=-this.width/4),void 0===r&&(r=t),void 0===i&&(i=t),function(){this.push(),this._renderer.uMVMatrix.set(this._renderer._curCamera.cameraMatrix.mat4[0],this._renderer._curCamera.cameraMatrix.mat4[1],this._renderer._curCamera.cameraMatrix.mat4[2],this._renderer._curCamera.cameraMatrix.mat4[3],this._renderer._curCamera.cameraMatrix.mat4[4],this._renderer._curCamera.cameraMatrix.mat4[5],this._renderer._curCamera.cameraMatrix.mat4[6],this._renderer._curCamera.cameraMatrix.mat4[7],this._renderer._curCamera.cameraMatrix.mat4[8],this._renderer._curCamera.cameraMatrix.mat4[9],this._renderer._curCamera.cameraMatrix.mat4[10],this._renderer._curCamera.cameraMatrix.mat4[11],this._renderer._curCamera.cameraMatrix.mat4[12],this._renderer._curCamera.cameraMatrix.mat4[13],this._renderer._curCamera.cameraMatrix.mat4[14],this._renderer._curCamera.cameraMatrix.mat4[15]),this.strokeWeight(2),this.stroke(255,0,0),this.beginShape(this.LINES),this.vertex(t,r,i),this.vertex(t+e,r,i),this.endShape(),this.stroke(0,255,0),this.beginShape(this.LINES),this.vertex(t,r,i),this.vertex(t,r+e,i),this.endShape(),this.stroke(0,0,255),this.beginShape(this.LINES),this.vertex(t,r,i),this.vertex(t,r,i+e),this.endShape(),this.pop()}},t.exports=c},{"../core/constants":17,"../core/main":23}],66:[function(e,t,r){"use strict";var p=e("../core/main");p.prototype.ambientLight=function(e,t,r,i){this._assert3d("ambientLight"),p._validateParameters("ambientLight",arguments);var n=this.color.apply(this,arguments);return this._renderer.ambientLightColors.push(n._array[0],n._array[1],n._array[2]),this._renderer._enableLighting=!0,this},p.prototype.directionalLight=function(e,t,r,i,n,o){var a,s,h,l;this._assert3d("directionalLight"),p._validateParameters("directionalLight",arguments),a=e instanceof p.Color?e:this.color(e,t,r);var u=arguments[arguments.length-1];l="number"==typeof u?(s=arguments[arguments.length-3],h=arguments[arguments.length-2],arguments[arguments.length-1]):(s=u.x,h=u.y,u.z);var c=Math.sqrt(s*s+h*h+l*l);return this._renderer.directionalLightDirections.push(s/c,h/c,l/c),this._renderer.directionalLightColors.push(a._array[0],a._array[1],a._array[2]),this._renderer._enableLighting=!0,this},p.prototype.pointLight=function(e,t,r,i,n,o){var a,s,h,l;this._assert3d("pointLight"),p._validateParameters("pointLight",arguments),a=e instanceof p.Color?e:this.color(e,t,r);var u=arguments[arguments.length-1];return l="number"==typeof u?(s=arguments[arguments.length-3],h=arguments[arguments.length-2],arguments[arguments.length-1]):(s=u.x,h=u.y,u.z),this._renderer.pointLightPositions.push(s,h,l),this._renderer.pointLightColors.push(a._array[0],a._array[1],a._array[2]),this._renderer._enableLighting=!0,this},p.prototype.lights=function(){return this._assert3d("lights"),this.ambientLight(128,128,128),this.directionalLight(128,128,128,0,0,-1),this},p.prototype.lightFalloff=function(e,t,r){return this._assert3d("lightFalloff"),p._validateParameters("lightFalloff",arguments),e<0&&(e=0,console.warn("Value of constant argument in lightFalloff() should be never be negative. Set to 0.")),t<0&&(t=0,console.warn("Value of linear argument in lightFalloff() should be never be negative. Set to 0.")),r<0&&(r=0,console.warn("Value of quadratic argument in lightFalloff() should be never be negative. Set to 0.")),0===e&&0===t&&0===r&&(e=1,console.warn("Either one of the three arguments in lightFalloff() should be greater than zero. Set constant argument to 1.")),this._renderer.constantAttenuation=e,this._renderer.linearAttenuation=t,this._renderer.quadraticAttenuation=r,this},t.exports=p},{"../core/main":23}],67:[function(e,t,r){"use strict";var S=e("../core/main");function s(e,t,r){for(var i=0,n=e.length;i<n;i++)if(e[i]!==t.getUint8(r+i,!1))return!1;return!0}e("./p5.Geometry"),S.prototype.loadModel=function(e){var t,r,i;S._validateParameters("loadModel",arguments),i="boolean"==typeof arguments[1]?(t=arguments[1],r=arguments[2],arguments[3]):(t=!1,r=arguments[1],arguments[2]);var n=e.slice(-4),o=new S.Geometry;o.gid=e+"|"+t;var a=this;return".stl"===n?this.httpDo(e,"GET","arrayBuffer",function(e){!function(e,t){if(function(e){for(var t=new DataView(e),r=[115,111,108,105,100],i=0;i<5;i++)if(s(r,t,i))return!1;return!0}(t))!function(e,t){for(var r,i,n,o,a,s,h,l=new DataView(t),u=l.getUint32(80,!0),c=!1,p=0;p<70;p++)1129270351===l.getUint32(p,!1)&&82===l.getUint8(p+4)&&61===l.getUint8(p+5)&&(c=!0,o=[],a=l.getUint8(p+6)/255,s=l.getUint8(p+7)/255,h=l.getUint8(p+8)/255);for(var d=0;d<u;d++){var f=84+50*d,m=l.getFloat32(f,!0),v=l.getFloat32(f+4,!0),g=l.getFloat32(f+8,!0);if(c){var y=l.getUint16(f+48,!0);n=0==(32768&y)?(r=(31&y)/31,i=(y>>5&31)/31,(y>>10&31)/31):(r=a,i=s,h)}for(var b=1;b<=3;b++){var _=f+12*b,x=new S.Vector(l.getFloat32(_,!0),l.getFloat32(_+8,!0),l.getFloat32(_+4,!0));e.vertices.push(x),c&&o.push(r,i,n)}var w=new S.Vector(m,v,g);e.vertexNormals.push(w,w,w),e.faces.push([3*d,3*d+1,3*d+2])}}(e,t);else{var r=new DataView(t);if(!("TextDecoder"in window))return console.warn("Sorry, ASCII STL loading only works in browsers that support TextDecoder (https://caniuse.com/#feat=textencoder)");var i=new TextDecoder("utf-8"),n=i.decode(r),o=n.split("\n");!function(e,t){for(var r,i,n="",o=[],a=0;a<t.length;++a){for(var s=t[a].trim(),h=s.split(" "),l=0;l<h.length;++l)""===h[l]&&h.splice(l,1);if(0!==h.length)switch(n){case"":if("solid"!==h[0])return console.error(s),console.error('Invalid state "'+h[0]+'", should be "solid"');n="solid";break;case"solid":if("facet"!==h[0]||"normal"!==h[1])return console.error(s),console.error('Invalid state "'+h[0]+'", should be "facet normal"');r=new S.Vector(parseFloat(h[2]),parseFloat(h[3]),parseFloat(h[4])),e.vertexNormals.push(r,r,r),n="facet normal";break;case"facet normal":if("outer"!==h[0]||"loop"!==h[1])return console.error(s),console.error('Invalid state "'+h[0]+'", should be "outer loop"');n="vertex";break;case"vertex":if("vertex"===h[0])i=new S.Vector(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),e.vertices.push(i),o.push(e.vertices.indexOf(i));else{if("endloop"!==h[0])return console.error(s),console.error('Invalid state "'+h[0]+'", should be "vertex" or "endloop"');e.faces.push(o),o=[],n="endloop"}break;case"endloop":if("endfacet"!==h[0])return console.error(s),console.error('Invalid state "'+h[0]+'", should be "endfacet"');n="endfacet";break;case"endfacet":if("endsolid"===h[0]);else{if("facet"!==h[0]||"normal"!==h[1])return console.error(s),console.error('Invalid state "'+h[0]+'", should be "endsolid" or "facet normal"');r=new S.Vector(parseFloat(h[2]),parseFloat(h[3]),parseFloat(h[4])),e.vertexNormals.push(r,r,r),n="facet normal"}break;default:console.error('Invalid state "'+n+'"')}}}(e,o)}}(o,e),t&&o.normalize(),a._decrementPreload(),"function"==typeof r&&r(o)}.bind(this),i):".obj"===n?this.loadStrings(e,function(e){!function(e,t){for(var r={v:[],vt:[],vn:[]},i={},n=0;n<t.length;++n){var o=t[n].trim().split(/\b\s+/);if(0<o.length)if("v"===o[0]||"vn"===o[0]){var a=new S.Vector(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3]));r[o[0]].push(a)}else if("vt"===o[0]){var s=[parseFloat(o[1]),parseFloat(o[2])];r[o[0]].push(s)}else if("f"===o[0])for(var h=3;h<o.length;++h){for(var l=[],u=[1,h-1,h],c=0;c<u.length;++c){var p=o[u[c]],d=0;if(void 0!==i[p])d=i[p];else{for(var f=p.split("/"),m=0;m<f.length;m++)f[m]=parseInt(f[m])-1;d=i[p]=e.vertices.length,e.vertices.push(r.v[f[0]].copy()),r.vt[f[1]]?e.uvs.push(r.vt[f[1]].slice()):e.uvs.push([0,0]),r.vn[f[2]]&&e.vertexNormals.push(r.vn[f[2]].copy())}l.push(d)}l[0]!==l[1]&&l[0]!==l[2]&&l[1]!==l[2]&&e.faces.push(l)}}0===e.vertexNormals.length&&e.computeNormals()}(o,e),t&&o.normalize(),a._decrementPreload(),"function"==typeof r&&r(o)}.bind(this),i):(S._friendlyFileLoadError(3,e),i?i():console.error("Sorry, the file type is invalid. Only OBJ and STL files are supported.")),o},S.prototype.model=function(e){this._assert3d("model"),S._validateParameters("model",arguments),0<e.vertices.length&&(this._renderer.geometryInHash(e.gid)||(e._makeTriangleEdges()._edgesToVertices(),this._renderer.createBuffers(e.gid,e)),this._renderer.drawBuffers(e.gid))},t.exports=S},{"../core/main":23,"./p5.Geometry":70}],68:[function(e,t,r){"use strict";var l=e("../core/main"),i=e("../core/constants");e("./p5.Texture"),l.prototype.loadShader=function(e,t,r,i){l._validateParameters("loadShader",arguments),i||(i=console.error);var n=new l.Shader,o=this,a=!1,s=!1,h=function(){o._decrementPreload(),r&&r(n)};return this.loadStrings(e,function(e){n._vertSrc=e.join("\n"),s=!0,a&&h()},i),this.loadStrings(t,function(e){n._fragSrc=e.join("\n"),a=!0,s&&h()},i),n},l.prototype.createShader=function(e,t){return this._assert3d("createShader"),l._validateParameters("createShader",arguments),new l.Shader(this._renderer,e,t)},l.prototype.shader=function(e){return this._assert3d("shader"),l._validateParameters("shader",arguments),void 0===e._renderer&&(e._renderer=this._renderer),e.isStrokeShader()?this._renderer.userStrokeShader=e:(this._renderer.userFillShader=e,this._renderer._useNormalMaterial=!1),e.init(),this},l.prototype.resetShader=function(){return this._renderer.userFillShader=this._renderer.userStrokeShader=null,this},l.prototype.normalMaterial=function(){return this._assert3d("normalMaterial"),l._validateParameters("normalMaterial",arguments),this._renderer.drawMode=i.FILL,this._renderer._useSpecularMaterial=!1,this._renderer._useNormalMaterial=!0,this._renderer.curFillColor=[1,1,1,1],this._renderer._setProperty("_doFill",!0),this.noStroke(),this},l.prototype.texture=function(e){return this._assert3d("texture"),l._validateParameters("texture",arguments),this._renderer.drawMode=i.TEXTURE,this._renderer._useSpecularMaterial=!1,this._renderer._useNormalMaterial=!1,this._renderer._tex=e,this._renderer._setProperty("_doFill",!0),this},l.prototype.textureMode=function(e){e!==i.IMAGE&&e!==i.NORMAL?console.warn("You tried to set "+e+" textureMode only supports IMAGE & NORMAL "):this._renderer.textureMode=e},l.prototype.textureWrap=function(e,t){t=t||e,this._renderer.textureWrapX=e,this._renderer.textureWrapY=t;for(var r=this._renderer.textures,i=0;i<r.length;i++)r[i].setWrapMode(e,t)},l.prototype.ambientMaterial=function(e,t,r,i){this._assert3d("ambientMaterial"),l._validateParameters("ambientMaterial",arguments);var n=l.prototype.color.apply(this,arguments);return this._renderer.curFillColor=n._array,this._renderer._useSpecularMaterial=!1,this._renderer._useNormalMaterial=!1,this._renderer._enableLighting=!0,this._renderer._tex=null,this},l.prototype.specularMaterial=function(e,t,r,i){this._assert3d("specularMaterial"),l._validateParameters("specularMaterial",arguments);var n=l.prototype.color.apply(this,arguments);return this._renderer.curFillColor=n._array,this._renderer._useSpecularMaterial=!0,this._renderer._useNormalMaterial=!1,this._renderer._enableLighting=!0,this._renderer._tex=null,this},l.prototype.shininess=function(e){return this._assert3d("shininess"),l._validateParameters("shininess",arguments),e<1&&(e=1),this._renderer._useShininess=e,this},l.RendererGL.prototype._applyColorBlend=function(e){var t=this.GL,r=this.drawMode===i.TEXTURE;return r||e[e.length-1]<1?(t.depthMask(r),t.enable(t.BLEND),this._applyBlendMode()):(t.depthMask(!0),t.disable(t.BLEND)),e},l.RendererGL.prototype._applyBlendMode=function(){var e=this.GL;switch(this.curBlendMode){case i.BLEND:case i.ADD:e.blendEquation(e.FUNC_ADD),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);break;case i.MULTIPLY:e.blendEquationSeparate(e.FUNC_ADD,e.FUNC_ADD),e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ONE,e.ONE);break;case i.SCREEN:e.blendEquationSeparate(e.FUNC_ADD,e.FUNC_ADD),e.blendFuncSeparate(e.ONE_MINUS_DST_COLOR,e.ONE,e.ONE,e.ONE);break;case i.EXCLUSION:e.blendEquationSeparate(e.FUNC_ADD,e.FUNC_ADD),e.blendFuncSeparate(e.ONE_MINUS_DST_COLOR,e.ONE_MINUS_SRC_COLOR,e.ONE,e.ONE);break;case i.REPLACE:e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO);break;case i.SUBTRACT:e.blendEquationSeparate(e.FUNC_REVERSE_SUBTRACT,e.FUNC_ADD),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case i.DARKEST:this.blendExt?(e.blendEquationSeparate(this.blendExt.MIN_EXT,e.FUNC_ADD),e.blendFuncSeparate(e.ONE,e.ONE,e.ONE,e.ONE)):console.warn("blendMode(DARKEST) does not work in your browser in WEBGL mode.");break;case i.LIGHTEST:this.blendExt?(e.blendEquationSeparate(this.blendExt.MAX_EXT,e.FUNC_ADD),e.blendFuncSeparate(e.ONE,e.ONE,e.ONE,e.ONE)):console.warn("blendMode(LIGHTEST) does not work in your browser in WEBGL mode.");break;default:console.error("Oops! Somehow RendererGL set curBlendMode to an unsupported mode.")}},t.exports=l},{"../core/constants":17,"../core/main":23,"./p5.Texture":76}],69:[function(e,t,r){"use strict";var m=e("../core/main");m.prototype.camera=function(){return this._assert3d("camera"),m._validateParameters("camera",arguments),this._renderer._curCamera.camera.apply(this._renderer._curCamera,arguments),this},m.prototype.perspective=function(){return this._assert3d("perspective"),m._validateParameters("perspective",arguments),this._renderer._curCamera.perspective.apply(this._renderer._curCamera,arguments),this},m.prototype.ortho=function(){return this._assert3d("ortho"),m._validateParameters("ortho",arguments),this._renderer._curCamera.ortho.apply(this._renderer._curCamera,arguments),this},m.prototype.createCamera=function(){this._assert3d("createCamera");var e=new m.Camera(this._renderer);return e._computeCameraDefaultSettings(),e._setDefaultCamera(),this._renderer._curCamera=e},m.Camera=function(e){this._renderer=e,this.cameraType="default",this.cameraMatrix=new m.Matrix,this.projMatrix=new m.Matrix},m.Camera.prototype.perspective=function(e,t,r,i){this.cameraFOV=void 0===e?e=this.defaultCameraFOV:this._renderer._pInst._toRadians(e),void 0===t&&(t=this.defaultAspectRatio),void 0===r&&(r=this.defaultCameraNear),void 0===i&&(i=this.defaultCameraFar),r<=1e-4&&(r=.01,console.log("Avoid perspective near plane values close to or below 0. Setting value to 0.01.")),i<r&&console.log("Perspective far plane value is less than near plane value. Nothing will be shown."),this.aspectRatio=t,this.cameraNear=r,this.cameraFar=i,this.projMatrix=m.Matrix.identity();var n=1/Math.tan(this.cameraFOV/2),o=1/(this.cameraNear-this.cameraFar);this.projMatrix.set(n/t,0,0,0,0,-n,0,0,0,0,(i+r)*o,-1,0,0,2*i*r*o,0),this._isActive()&&this._renderer.uPMatrix.set(this.projMatrix.mat4[0],this.projMatrix.mat4[1],this.projMatrix.mat4[2],this.projMatrix.mat4[3],this.projMatrix.mat4[4],this.projMatrix.mat4[5],this.projMatrix.mat4[6],this.projMatrix.mat4[7],this.projMatrix.mat4[8],this.projMatrix.mat4[9],this.projMatrix.mat4[10],this.projMatrix.mat4[11],this.projMatrix.mat4[12],this.projMatrix.mat4[13],this.projMatrix.mat4[14],this.projMatrix.mat4[15]),this.cameraType="custom"},m.Camera.prototype.ortho=function(e,t,r,i,n,o){void 0===e&&(e=-this._renderer.width/2),void 0===t&&(t=+this._renderer.width/2),void 0===r&&(r=-this._renderer.height/2),void 0===i&&(i=+this._renderer.height/2),void 0===n&&(n=0),void 0===o&&(o=Math.max(this._renderer.width,this._renderer.height));var a=t-e,s=i-r,h=o-n,l=2/a,u=2/s,c=-2/h,p=-(t+e)/a,d=-(i+r)/s,f=-(o+n)/h;this.projMatrix=m.Matrix.identity(),this.projMatrix.set(l,0,0,0,0,-u,0,0,0,0,c,0,p,d,f,1),this._isActive()&&this._renderer.uPMatrix.set(this.projMatrix.mat4[0],this.projMatrix.mat4[1],this.projMatrix.mat4[2],this.projMatrix.mat4[3],this.projMatrix.mat4[4],this.projMatrix.mat4[5],this.projMatrix.mat4[6],this.projMatrix.mat4[7],this.projMatrix.mat4[8],this.projMatrix.mat4[9],this.projMatrix.mat4[10],this.projMatrix.mat4[11],this.projMatrix.mat4[12],this.projMatrix.mat4[13],this.projMatrix.mat4[14],this.projMatrix.mat4[15]),this.cameraType="custom"},m.Camera.prototype._rotateView=function(e,t,r,i){var n=this.centerX,o=this.centerY,a=this.centerZ;n-=this.eyeX,o-=this.eyeY,a-=this.eyeZ;var s=m.Matrix.identity(this._renderer._pInst);s.rotate(this._renderer._pInst._toRadians(e),t,r,i);var h=[n*s.mat4[0]+o*s.mat4[4]+a*s.mat4[8],n*s.mat4[1]+o*s.mat4[5]+a*s.mat4[9],n*s.mat4[2]+o*s.mat4[6]+a*s.mat4[10]];h[0]+=this.eyeX,h[1]+=this.eyeY,h[2]+=this.eyeZ,this.camera(this.eyeX,this.eyeY,this.eyeZ,h[0],h[1],h[2],this.upX,this.upY,this.upZ)},m.Camera.prototype.pan=function(e){var t=this._getLocalAxes();this._rotateView(e,t.y[0],t.y[1],t.y[2])},m.Camera.prototype.tilt=function(e){var t=this._getLocalAxes();this._rotateView(e,t.x[0],t.x[1],t.x[2])},m.Camera.prototype.lookAt=function(e,t,r){this.camera(this.eyeX,this.eyeY,this.eyeZ,e,t,r,this.upX,this.upY,this.upZ)},m.Camera.prototype.camera=function(e,t,r,i,n,o,a,s,h){void 0===e&&(e=this.defaultEyeX,t=this.defaultEyeY,r=this.defaultEyeZ,i=e,n=t,s=1,h=a=o=0),this.eyeX=e,this.eyeY=t,this.eyeZ=r,this.centerX=i,this.centerY=n,this.centerZ=o,this.upX=a,this.upY=s,this.upZ=h;var l=this._getLocalAxes();this.cameraMatrix.set(l.x[0],l.y[0],l.z[0],0,l.x[1],l.y[1],l.z[1],0,l.x[2],l.y[2],l.z[2],0,0,0,0,1);var u=-e,c=-t,p=-r;return this.cameraMatrix.translate([u,c,p]),this._isActive()&&this._renderer.uMVMatrix.set(this.cameraMatrix.mat4[0],this.cameraMatrix.mat4[1],this.cameraMatrix.mat4[2],this.cameraMatrix.mat4[3],this.cameraMatrix.mat4[4],this.cameraMatrix.mat4[5],this.cameraMatrix.mat4[6],this.cameraMatrix.mat4[7],this.cameraMatrix.mat4[8],this.cameraMatrix.mat4[9],this.cameraMatrix.mat4[10],this.cameraMatrix.mat4[11],this.cameraMatrix.mat4[12],this.cameraMatrix.mat4[13],this.cameraMatrix.mat4[14],this.cameraMatrix.mat4[15]),this},m.Camera.prototype.move=function(e,t,r){var i=this._getLocalAxes(),n=[i.x[0]*e,i.x[1]*e,i.x[2]*e],o=[i.y[0]*t,i.y[1]*t,i.y[2]*t],a=[i.z[0]*r,i.z[1]*r,i.z[2]*r];this.camera(this.eyeX+n[0]+o[0]+a[0],this.eyeY+n[1]+o[1]+a[1],this.eyeZ+n[2]+o[2]+a[2],this.centerX+n[0]+o[0]+a[0],this.centerY+n[1]+o[1]+a[1],this.centerZ+n[2]+o[2]+a[2],0,1,0)},m.Camera.prototype.setPosition=function(e,t,r){var i=e-this.eyeX,n=t-this.eyeY,o=r-this.eyeZ;this.camera(e,t,r,this.centerX+i,this.centerY+n,this.centerZ+o,0,1,0)},m.Camera.prototype._computeCameraDefaultSettings=function(){this.defaultCameraFOV=60/180*Math.PI,this.defaultAspectRatio=this._renderer.width/this._renderer.height,this.defaultEyeX=0,this.defaultEyeY=0,this.defaultEyeZ=this._renderer.height/2/Math.tan(this.defaultCameraFOV/2),this.defaultCenterX=0,this.defaultCenterY=0,this.defaultCenterZ=0,this.defaultCameraNear=.1*this.defaultEyeZ,this.defaultCameraFar=10*this.defaultEyeZ},m.Camera.prototype._setDefaultCamera=function(){this.cameraFOV=this.defaultCameraFOV,this.aspectRatio=this.defaultAspectRatio,this.eyeX=this.defaultEyeX,this.eyeY=this.defaultEyeY,this.eyeZ=this.defaultEyeZ,this.centerX=this.defaultCenterX,this.centerY=this.defaultCenterY,this.centerZ=this.defaultCenterZ,this.upX=0,this.upY=1,this.upZ=0,this.cameraNear=this.defaultCameraNear,this.cameraFar=this.defaultCameraFar,this.perspective(),this.camera(),this.cameraType="default"},m.Camera.prototype._resize=function(){"default"===this.cameraType?(this._computeCameraDefaultSettings(),this._setDefaultCamera()):this.perspective(this.cameraFOV,this._renderer.width/this._renderer.height)},m.Camera.prototype.copy=function(){var e=new m.Camera(this._renderer);return e.cameraFOV=this.cameraFOV,e.aspectRatio=this.aspectRatio,e.eyeX=this.eyeX,e.eyeY=this.eyeY,e.eyeZ=this.eyeZ,e.centerX=this.centerX,e.centerY=this.centerY,e.centerZ=this.centerZ,e.cameraNear=this.cameraNear,e.cameraFar=this.cameraFar,e.cameraType=this.cameraType,e.cameraMatrix=this.cameraMatrix.copy(),e.projMatrix=this.projMatrix.copy(),e},m.Camera.prototype._getLocalAxes=function(){var e=this.eyeX-this.centerX,t=this.eyeY-this.centerY,r=this.eyeZ-this.centerZ,i=Math.sqrt(e*e+t*t+r*r);0!==i&&(e/=i,t/=i,r/=i);var n=this.upX,o=this.upY,a=this.upZ,s=o*r-a*t,h=-n*r+a*e,l=n*t-o*e;n=t*l-r*h,o=-e*l+r*s,a=e*h-t*s;var u=Math.sqrt(s*s+h*h+l*l);0!==u&&(s/=u,h/=u,l/=u);var c=Math.sqrt(n*n+o*o+a*a);return 0!==c&&(n/=c,o/=c,a/=c),{x:[s,h,l],y:[n,o,a],z:[e,t,r]}},m.Camera.prototype._orbit=function(e,t,r){var i=this.eyeX-this.centerX,n=this.eyeY-this.centerY,o=this.eyeZ-this.centerZ,a=Math.sqrt(i*i+n*n+o*o),s=Math.atan2(i,o),h=Math.acos(Math.max(-1,Math.min(1,n/a)));s+=e,(a+=r)<0&&(a=.1),(h+=t)>Math.PI?h=Math.PI:h<=0&&(h=.001);var l=Math.sin(h)*a*Math.sin(s),u=Math.cos(h)*a,c=Math.sin(h)*a*Math.cos(s);this.camera(l+this.centerX,u+this.centerY,c+this.centerZ,this.centerX,this.centerY,this.centerZ,0,1,0)},m.Camera.prototype._isActive=function(){return this===this._renderer._curCamera},m.prototype.setCamera=function(e){this._renderer._curCamera=e,this._renderer.uPMatrix.set(e.projMatrix.mat4[0],e.projMatrix.mat4[1],e.projMatrix.mat4[2],e.projMatrix.mat4[3],e.projMatrix.mat4[4],e.projMatrix.mat4[5],e.projMatrix.mat4[6],e.projMatrix.mat4[7],e.projMatrix.mat4[8],e.projMatrix.mat4[9],e.projMatrix.mat4[10],e.projMatrix.mat4[11],e.projMatrix.mat4[12],e.projMatrix.mat4[13],e.projMatrix.mat4[14],e.projMatrix.mat4[15])},t.exports=m.Camera},{"../core/main":23}],70:[function(e,t,r){"use strict";var u=e("../core/main");u.Geometry=function(e,t,r){return this.vertices=[],this.lineVertices=[],this.lineNormals=[],this.vertexNormals=[],this.faces=[],this.uvs=[],this.edges=[],this.detailX=void 0!==e?e:1,this.detailY=void 0!==t?t:1,this.dirtyFlags={},r instanceof Function&&r.call(this),this},u.Geometry.prototype.reset=function(){this.lineVertices.length=0,this.lineNormals.length=0,this.vertices.length=0,this.edges.length=0,this.vertexColors.length=0,this.vertexNormals.length=0,this.uvs.length=0,this.dirtyFlags={}},u.Geometry.prototype.computeFaces=function(){this.faces.length=0;for(var e,t,r,i,n=this.detailX+1,o=0;o<this.detailY;o++)for(var a=0;a<this.detailX;a++)t=(e=o*n+a)+1,r=(o+1)*n+a+1,i=(o+1)*n+a,this.faces.push([e,t,i]),this.faces.push([i,t,r]);return this},u.Geometry.prototype._getFaceNormal=function(e){var t=this.faces[e],r=this.vertices[t[0]],i=this.vertices[t[1]],n=this.vertices[t[2]],o=u.Vector.sub(i,r),a=u.Vector.sub(n,r),s=u.Vector.cross(o,a),h=u.Vector.mag(s),l=h/(u.Vector.mag(o)*u.Vector.mag(a));return 0===l||isNaN(l)?(console.warn("p5.Geometry.prototype._getFaceNormal:","face has colinear sides or a repeated vertex"),s):(1<l&&(l=1),s.mult(Math.asin(l)/h))},u.Geometry.prototype.computeNormals=function(){var e,t=this.vertexNormals,r=this.vertices,i=this.faces;for(e=t.length=0;e<r.length;++e)t.push(new u.Vector);for(var n=0;n<i.length;++n)for(var o=i[n],a=this._getFaceNormal(n),s=0;s<3;++s){t[o[s]].add(a)}for(e=0;e<r.length;++e)t[e].normalize();return this},u.Geometry.prototype.averageNormals=function(){for(var e=0;e<=this.detailY;e++){var t=this.detailX+1,r=u.Vector.add(this.vertexNormals[e*t],this.vertexNormals[e*t+this.detailX]);r=u.Vector.div(r,2),this.vertexNormals[e*t]=r,this.vertexNormals[e*t+this.detailX]=r}return this},u.Geometry.prototype.averagePoleNormals=function(){for(var e=new u.Vector(0,0,0),t=0;t<this.detailX;t++)e.add(this.vertexNormals[t]);for(e=u.Vector.div(e,this.detailX),t=0;t<this.detailX;t++)this.vertexNormals[t]=e;for(e=new u.Vector(0,0,0),t=this.vertices.length-1;t>this.vertices.length-1-this.detailX;t--)e.add(this.vertexNormals[t]);for(e=u.Vector.div(e,this.detailX),t=this.vertices.length-1;t>this.vertices.length-1-this.detailX;t--)this.vertexNormals[t]=e;return this},u.Geometry.prototype._makeTriangleEdges=function(){if(this.edges.length=0,Array.isArray(this.strokeIndices))for(var e=0,t=this.strokeIndices.length;e<t;e++)this.edges.push(this.strokeIndices[e]);else for(var r=0;r<this.faces.length;r++)this.edges.push([this.faces[r][0],this.faces[r][1]]),this.edges.push([this.faces[r][1],this.faces[r][2]]),this.edges.push([this.faces[r][2],this.faces[r][0]]);return this},u.Geometry.prototype._edgesToVertices=function(){this.lineVertices.length=0;for(var e=this.lineNormals.length=0;e<this.edges.length;e++){var t=this.vertices[this.edges[e][0]],r=this.vertices[this.edges[e][1]],i=r.copy().sub(t).normalize(),n=t.array(),o=t.array(),a=r.array(),s=r.array(),h=i.array(),l=i.array();h.push(1),l.push(-1),this.lineNormals.push(h,l,h,h,l,l),this.lineVertices.push(n,o,a,a,o,s)}return this},u.Geometry.prototype.normalize=function(){if(0<this.vertices.length){for(var e=this.vertices[0].copy(),t=this.vertices[0].copy(),r=0;r<this.vertices.length;r++)e.x=Math.max(e.x,this.vertices[r].x),t.x=Math.min(t.x,this.vertices[r].x),e.y=Math.max(e.y,this.vertices[r].y),t.y=Math.min(t.y,this.vertices[r].y),e.z=Math.max(e.z,this.vertices[r].z),t.z=Math.min(t.z,this.vertices[r].z);var i=u.Vector.lerp(e,t,.5),n=u.Vector.sub(e,t),o=200/Math.max(Math.max(n.x,n.y),n.z);for(r=0;r<this.vertices.length;r++)this.vertices[r].sub(i),this.vertices[r].mult(o)}return this},t.exports=u.Geometry},{"../core/main":23}],71:[function(e,t,r){"use strict";var D=e("../core/main"),i=Array,P=function(e){return e instanceof Array};"undefined"!=typeof Float32Array&&(i=Float32Array,P=function(e){return e instanceof Array||e instanceof Float32Array}),D.Matrix=function(){for(var e=new Array(arguments.length),t=0;t<e.length;++t)e[t]=arguments[t];return e.length&&e[e.length-1]instanceof D&&(this.p5=e[e.length-1]),"mat3"===e[0]?this.mat3=Array.isArray(e[1])?e[1]:new i([1,0,0,0,1,0,0,0,1]):this.mat4=Array.isArray(e[0])?e[0]:new i([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this},D.Matrix.prototype.set=function(e){return e instanceof D.Matrix?this.mat4=e.mat4:P(e)?this.mat4=e:16===arguments.length&&(this.mat4[0]=e,this.mat4[1]=arguments[1],this.mat4[2]=arguments[2],this.mat4[3]=arguments[3],this.mat4[4]=arguments[4],this.mat4[5]=arguments[5],this.mat4[6]=arguments[6],this.mat4[7]=arguments[7],this.mat4[8]=arguments[8],this.mat4[9]=arguments[9],this.mat4[10]=arguments[10],this.mat4[11]=arguments[11],this.mat4[12]=arguments[12],this.mat4[13]=arguments[13],this.mat4[14]=arguments[14],this.mat4[15]=arguments[15]),this},D.Matrix.prototype.get=function(){return new D.Matrix(this.mat4,this.p5)},D.Matrix.prototype.copy=function(){var e=new D.Matrix(this.p5);return e.mat4[0]=this.mat4[0],e.mat4[1]=this.mat4[1],e.mat4[2]=this.mat4[2],e.mat4[3]=this.mat4[3],e.mat4[4]=this.mat4[4],e.mat4[5]=this.mat4[5],e.mat4[6]=this.mat4[6],e.mat4[7]=this.mat4[7],e.mat4[8]=this.mat4[8],e.mat4[9]=this.mat4[9],e.mat4[10]=this.mat4[10],e.mat4[11]=this.mat4[11],e.mat4[12]=this.mat4[12],e.mat4[13]=this.mat4[13],e.mat4[14]=this.mat4[14],e.mat4[15]=this.mat4[15],e},D.Matrix.identity=function(e){return new D.Matrix(e)},D.Matrix.prototype.transpose=function(e){var t,r,i,n,o,a;return e instanceof D.Matrix?(t=e.mat4[1],r=e.mat4[2],i=e.mat4[3],n=e.mat4[6],o=e.mat4[7],a=e.mat4[11],this.mat4[0]=e.mat4[0],this.mat4[1]=e.mat4[4],this.mat4[2]=e.mat4[8],this.mat4[3]=e.mat4[12],this.mat4[4]=t,this.mat4[5]=e.mat4[5],this.mat4[6]=e.mat4[9],this.mat4[7]=e.mat4[13],this.mat4[8]=r,this.mat4[9]=n,this.mat4[10]=e.mat4[10],this.mat4[11]=e.mat4[14],this.mat4[12]=i,this.mat4[13]=o,this.mat4[14]=a,this.mat4[15]=e.mat4[15]):P(e)&&(t=e[1],r=e[2],i=e[3],n=e[6],o=e[7],a=e[11],this.mat4[0]=e[0],this.mat4[1]=e[4],this.mat4[2]=e[8],this.mat4[3]=e[12],this.mat4[4]=t,this.mat4[5]=e[5],this.mat4[6]=e[9],this.mat4[7]=e[13],this.mat4[8]=r,this.mat4[9]=n,this.mat4[10]=e[10],this.mat4[11]=e[14],this.mat4[12]=i,this.mat4[13]=o,this.mat4[14]=a,this.mat4[15]=e[15]),this},D.Matrix.prototype.invert=function(e){var t,r,i,n,o,a,s,h,l,u,c,p,d,f,m,v;e instanceof D.Matrix?(t=e.mat4[0],r=e.mat4[1],i=e.mat4[2],n=e.mat4[3],o=e.mat4[4],a=e.mat4[5],s=e.mat4[6],h=e.mat4[7],l=e.mat4[8],u=e.mat4[9],c=e.mat4[10],p=e.mat4[11],d=e.mat4[12],f=e.mat4[13],m=e.mat4[14],v=e.mat4[15]):P(e)&&(t=e[0],r=e[1],i=e[2],n=e[3],o=e[4],a=e[5],s=e[6],h=e[7],l=e[8],u=e[9],c=e[10],p=e[11],d=e[12],f=e[13],m=e[14],v=e[15]);var g=t*a-r*o,y=t*s-i*o,b=t*h-n*o,_=r*s-i*a,x=r*h-n*a,w=i*h-n*s,S=l*f-u*d,T=l*m-c*d,M=l*v-p*d,E=u*m-c*f,C=u*v-p*f,R=c*v-p*m,L=g*R-y*C+b*E+_*M-x*T+w*S;return L?(L=1/L,this.mat4[0]=(a*R-s*C+h*E)*L,this.mat4[1]=(i*C-r*R-n*E)*L,this.mat4[2]=(f*w-m*x+v*_)*L,this.mat4[3]=(c*x-u*w-p*_)*L,this.mat4[4]=(s*M-o*R-h*T)*L,this.mat4[5]=(t*R-i*M+n*T)*L,this.mat4[6]=(m*b-d*w-v*y)*L,this.mat4[7]=(l*w-c*b+p*y)*L,this.mat4[8]=(o*C-a*M+h*S)*L,this.mat4[9]=(r*M-t*C-n*S)*L,this.mat4[10]=(d*x-f*b+v*g)*L,this.mat4[11]=(u*b-l*x-p*g)*L,this.mat4[12]=(a*T-o*E-s*S)*L,this.mat4[13]=(t*E-r*T+i*S)*L,this.mat4[14]=(f*y-d*_-m*g)*L,this.mat4[15]=(l*_-u*y+c*g)*L,this):null},D.Matrix.prototype.invert3x3=function(){var e=this.mat3[0],t=this.mat3[1],r=this.mat3[2],i=this.mat3[3],n=this.mat3[4],o=this.mat3[5],a=this.mat3[6],s=this.mat3[7],h=this.mat3[8],l=h*n-o*s,u=-h*i+o*a,c=s*i-n*a,p=e*l+t*u+r*c;return p?(p=1/p,this.mat3[0]=l*p,this.mat3[1]=(-h*t+r*s)*p,this.mat3[2]=(o*t-r*n)*p,this.mat3[3]=u*p,this.mat3[4]=(h*e-r*a)*p,this.mat3[5]=(-o*e+r*i)*p,this.mat3[6]=c*p,this.mat3[7]=(-s*e+t*a)*p,this.mat3[8]=(n*e-t*i)*p,this):null},D.Matrix.prototype.transpose3x3=function(e){var t=e[1],r=e[2],i=e[5];return this.mat3[1]=e[3],this.mat3[2]=e[6],this.mat3[3]=t,this.mat3[5]=e[7],this.mat3[6]=r,this.mat3[7]=i,this},D.Matrix.prototype.inverseTranspose=function(e){void 0===this.mat3?console.error("sorry, this function only works with mat3"):(this.mat3[0]=e.mat4[0],this.mat3[1]=e.mat4[1],this.mat3[2]=e.mat4[2],this.mat3[3]=e.mat4[4],this.mat3[4]=e.mat4[5],this.mat3[5]=e.mat4[6],this.mat3[6]=e.mat4[8],this.mat3[7]=e.mat4[9],this.mat3[8]=e.mat4[10]);var t=this.invert3x3();if(t)t.transpose3x3(this.mat3);else for(var r=0;r<9;r++)this.mat3[r]=0;return this},D.Matrix.prototype.determinant=function(){var e=this.mat4[0]*this.mat4[5]-this.mat4[1]*this.mat4[4],t=this.mat4[0]*this.mat4[6]-this.mat4[2]*this.mat4[4],r=this.mat4[0]*this.mat4[7]-this.mat4[3]*this.mat4[4],i=this.mat4[1]*this.mat4[6]-this.mat4[2]*this.mat4[5],n=this.mat4[1]*this.mat4[7]-this.mat4[3]*this.mat4[5],o=this.mat4[2]*this.mat4[7]-this.mat4[3]*this.mat4[6],a=this.mat4[8]*this.mat4[13]-this.mat4[9]*this.mat4[12],s=this.mat4[8]*this.mat4[14]-this.mat4[10]*this.mat4[12],h=this.mat4[8]*this.mat4[15]-this.mat4[11]*this.mat4[12],l=this.mat4[9]*this.mat4[14]-this.mat4[10]*this.mat4[13],u=this.mat4[9]*this.mat4[15]-this.mat4[11]*this.mat4[13];return e*(this.mat4[10]*this.mat4[15]-this.mat4[11]*this.mat4[14])-t*u+r*l+i*h-n*s+o*a},D.Matrix.prototype.mult=function(e){var t;if(e===this||e===this.mat4)t=this.copy().mat4;else if(e instanceof D.Matrix)t=e.mat4;else if(P(e))t=e;else{if(16!==arguments.length)return;t=arguments}var r=this.mat4[0],i=this.mat4[1],n=this.mat4[2],o=this.mat4[3];return this.mat4[0]=r*t[0]+i*t[4]+n*t[8]+o*t[12],this.mat4[1]=r*t[1]+i*t[5]+n*t[9]+o*t[13],this.mat4[2]=r*t[2]+i*t[6]+n*t[10]+o*t[14],this.mat4[3]=r*t[3]+i*t[7]+n*t[11]+o*t[15],r=this.mat4[4],i=this.mat4[5],n=this.mat4[6],o=this.mat4[7],this.mat4[4]=r*t[0]+i*t[4]+n*t[8]+o*t[12],this.mat4[5]=r*t[1]+i*t[5]+n*t[9]+o*t[13],this.mat4[6]=r*t[2]+i*t[6]+n*t[10]+o*t[14],this.mat4[7]=r*t[3]+i*t[7]+n*t[11]+o*t[15],r=this.mat4[8],i=this.mat4[9],n=this.mat4[10],o=this.mat4[11],this.mat4[8]=r*t[0]+i*t[4]+n*t[8]+o*t[12],this.mat4[9]=r*t[1]+i*t[5]+n*t[9]+o*t[13],this.mat4[10]=r*t[2]+i*t[6]+n*t[10]+o*t[14],this.mat4[11]=r*t[3]+i*t[7]+n*t[11]+o*t[15],r=this.mat4[12],i=this.mat4[13],n=this.mat4[14],o=this.mat4[15],this.mat4[12]=r*t[0]+i*t[4]+n*t[8]+o*t[12],this.mat4[13]=r*t[1]+i*t[5]+n*t[9]+o*t[13],this.mat4[14]=r*t[2]+i*t[6]+n*t[10]+o*t[14],this.mat4[15]=r*t[3]+i*t[7]+n*t[11]+o*t[15],this},D.Matrix.prototype.apply=function(e){var t;if(e===this||e===this.mat4)t=this.copy().mat4;else if(e instanceof D.Matrix)t=e.mat4;else if(P(e))t=e;else{if(16!==arguments.length)return;t=arguments}var r=this.mat4,i=r[0],n=r[4],o=r[8],a=r[12];r[0]=t[0]*i+t[1]*n+t[2]*o+t[3]*a,r[4]=t[4]*i+t[5]*n+t[6]*o+t[7]*a,r[8]=t[8]*i+t[9]*n+t[10]*o+t[11]*a,r[12]=t[12]*i+t[13]*n+t[14]*o+t[15]*a;var s=r[1],h=r[5],l=r[9],u=r[13];r[1]=t[0]*s+t[1]*h+t[2]*l+t[3]*u,r[5]=t[4]*s+t[5]*h+t[6]*l+t[7]*u,r[9]=t[8]*s+t[9]*h+t[10]*l+t[11]*u,r[13]=t[12]*s+t[13]*h+t[14]*l+t[15]*u;var c=r[2],p=r[6],d=r[10],f=r[14];r[2]=t[0]*c+t[1]*p+t[2]*d+t[3]*f,r[6]=t[4]*c+t[5]*p+t[6]*d+t[7]*f,r[10]=t[8]*c+t[9]*p+t[10]*d+t[11]*f,r[14]=t[12]*c+t[13]*p+t[14]*d+t[15]*f;var m=r[3],v=r[7],g=r[11],y=r[15];return r[3]=t[0]*m+t[1]*v+t[2]*g+t[3]*y,r[7]=t[4]*m+t[5]*v+t[6]*g+t[7]*y,r[11]=t[8]*m+t[9]*v+t[10]*g+t[11]*y,r[15]=t[12]*m+t[13]*v+t[14]*g+t[15]*y,this},D.Matrix.prototype.scale=function(e,t,r){return e instanceof D.Vector?(t=e.y,r=e.z,e=e.x):e instanceof Array&&(t=e[1],r=e[2],e=e[0]),this.mat4[0]*=e,this.mat4[1]*=e,this.mat4[2]*=e,this.mat4[3]*=e,this.mat4[4]*=t,this.mat4[5]*=t,this.mat4[6]*=t,this.mat4[7]*=t,this.mat4[8]*=r,this.mat4[9]*=r,this.mat4[10]*=r,this.mat4[11]*=r,this},D.Matrix.prototype.rotate=function(e,t,r,i){t instanceof D.Vector?(r=t.y,i=t.z,t=t.x):t instanceof Array&&(r=t[1],i=t[2],t=t[0]);var n=Math.sqrt(t*t+r*r+i*i);t*=1/n,r*=1/n,i*=1/n;var o=this.mat4[0],a=this.mat4[1],s=this.mat4[2],h=this.mat4[3],l=this.mat4[4],u=this.mat4[5],c=this.mat4[6],p=this.mat4[7],d=this.mat4[8],f=this.mat4[9],m=this.mat4[10],v=this.mat4[11],g=Math.sin(e),y=Math.cos(e),b=1-y,_=t*t*b+y,x=r*t*b+i*g,w=i*t*b-r*g,S=t*r*b-i*g,T=r*r*b+y,M=i*r*b+t*g,E=t*i*b+r*g,C=r*i*b-t*g,R=i*i*b+y;return this.mat4[0]=o*_+l*x+d*w,this.mat4[1]=a*_+u*x+f*w,this.mat4[2]=s*_+c*x+m*w,this.mat4[3]=h*_+p*x+v*w,this.mat4[4]=o*S+l*T+d*M,this.mat4[5]=a*S+u*T+f*M,this.mat4[6]=s*S+c*T+m*M,this.mat4[7]=h*S+p*T+v*M,this.mat4[8]=o*E+l*C+d*R,this.mat4[9]=a*E+u*C+f*R,this.mat4[10]=s*E+c*C+m*R,this.mat4[11]=h*E+p*C+v*R,this},D.Matrix.prototype.translate=function(e){var t=e[0],r=e[1],i=e[2]||0;this.mat4[12]+=this.mat4[0]*t+this.mat4[4]*r+this.mat4[8]*i,this.mat4[13]+=this.mat4[1]*t+this.mat4[5]*r+this.mat4[9]*i,this.mat4[14]+=this.mat4[2]*t+this.mat4[6]*r+this.mat4[10]*i,this.mat4[15]+=this.mat4[3]*t+this.mat4[7]*r+this.mat4[11]*i},D.Matrix.prototype.rotateX=function(e){this.rotate(e,1,0,0)},D.Matrix.prototype.rotateY=function(e){this.rotate(e,0,1,0)},D.Matrix.prototype.rotateZ=function(e){this.rotate(e,0,0,1)},D.Matrix.prototype.perspective=function(e,t,r,i){var n=1/Math.tan(e/2),o=1/(r-i);return this.mat4[0]=n/t,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=n,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=(i+r)*o,this.mat4[11]=-1,this.mat4[12]=0,this.mat4[13]=0,this.mat4[14]=2*i*r*o,this.mat4[15]=0,this},D.Matrix.prototype.ortho=function(e,t,r,i,n,o){var a=1/(e-t),s=1/(r-i),h=1/(n-o);return this.mat4[0]=-2*a,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=-2*s,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=2*h,this.mat4[11]=0,this.mat4[12]=(e+t)*a,this.mat4[13]=(i+r)*s,this.mat4[14]=(o+n)*h,this.mat4[15]=1,this},t.exports=D.Matrix},{"../core/main":23}],72:[function(e,t,r){"use strict";var c=e("../core/main"),p=e("../core/constants");c.RendererGL.prototype.beginShape=function(e){return this.immediateMode.shapeMode=void 0!==e?e:p.LINE_STRIP,void 0===this.immediateMode.vertices?(this.immediateMode.vertices=[],this.immediateMode.edges=[],this.immediateMode.lineVertices=[],this.immediateMode.vertexColors=[],this.immediateMode.lineNormals=[],this.immediateMode.uvCoords=[],this.immediateMode.vertexBuffer=this.GL.createBuffer(),this.immediateMode.colorBuffer=this.GL.createBuffer(),this.immediateMode.uvBuffer=this.GL.createBuffer(),this.immediateMode.lineVertexBuffer=this.GL.createBuffer(),this.immediateMode.lineNormalBuffer=this.GL.createBuffer(),this.immediateMode.pointVertexBuffer=this.GL.createBuffer(),this.immediateMode._bezierVertex=[],this.immediateMode._quadraticVertex=[],this.immediateMode._curveVertex=[],this.immediateMode._isCoplanar=!0,this.immediateMode._testIfCoplanar=null):(this.immediateMode.vertices.length=0,this.immediateMode.edges.length=0,this.immediateMode.lineVertices.length=0,this.immediateMode.lineNormals.length=0,this.immediateMode.vertexColors.length=0,this.immediateMode.uvCoords.length=0),this.isImmediateDrawing=!0,this},c.RendererGL.prototype.vertex=function(e,t){var r,i,n;r=i=n=0,3===arguments.length?r=arguments[2]:4===arguments.length?(i=arguments[2],n=arguments[3]):5===arguments.length&&(r=arguments[2],i=arguments[3],n=arguments[4]),null==this.immediateMode._testIfCoplanar?this.immediateMode._testIfCoplanar=r:this.immediateMode._testIfCoplanar!==r&&(this.immediateMode._isCoplanar=!1);var o=new c.Vector(e,t,r);this.immediateMode.vertices.push(o);var a=this.curFillColor||[.5,.5,.5,1];return this.immediateMode.vertexColors.push(a[0],a[1],a[2],a[3]),this.textureMode===p.IMAGE&&(null!==this._tex?0<this._tex.width&&0<this._tex.height&&(i/=this._tex.width,n/=this._tex.height):null===this._tex&&4<=arguments.length&&console.warn("You must first call texture() before using vertex() with image based u and v coordinates")),this.immediateMode.uvCoords.push(i,n),this.immediateMode._bezierVertex[0]=e,this.immediateMode._bezierVertex[1]=t,this.immediateMode._bezierVertex[2]=r,this.immediateMode._quadraticVertex[0]=e,this.immediateMode._quadraticVertex[1]=t,this.immediateMode._quadraticVertex[2]=r,this},c.RendererGL.prototype.endShape=function(e,t,r,i,n,o){if(this.immediateMode.shapeMode===p.POINTS)this._drawPoints(this.immediateMode.vertices,this.immediateMode.pointVertexBuffer);else if(1<this.immediateMode.vertices.length){if(this._doStroke&&this.drawMode!==p.TEXTURE){if(this.immediateMode.shapeMode===p.TRIANGLE_STRIP){var a;for(a=0;a<this.immediateMode.vertices.length-2;a++)this.immediateMode.edges.push([a,a+1]),this.immediateMode.edges.push([a,a+2]);this.immediateMode.edges.push([a,a+1])}else if(this.immediateMode.shapeMode===p.TRIANGLES)for(a=0;a<this.immediateMode.vertices.length-2;a+=3)this.immediateMode.edges.push([a,a+1]),this.immediateMode.edges.push([a+1,a+2]),this.immediateMode.edges.push([a+2,a]);else if(this.immediateMode.shapeMode===p.LINES)for(a=0;a<this.immediateMode.vertices.length-1;a+=2)this.immediateMode.edges.push([a,a+1]);else for(a=0;a<this.immediateMode.vertices.length-1;a++)this.immediateMode.edges.push([a,a+1]);e===p.CLOSE&&this.immediateMode.edges.push([this.immediateMode.vertices.length-1,0]),c.Geometry.prototype._edgesToVertices.call(this.immediateMode),this._drawStrokeImmediateMode()}if(this._doFill&&this.immediateMode.shapeMode!==p.LINES){if(this.isBezier||this.isQuadratic||this.isCurve||this.immediateMode.shapeMode===p.LINE_STRIP&&this.drawMode===p.FILL&&!0===this.immediateMode._isCoplanar){this.immediateMode.shapeMode=p.TRIANGLES;var s=[new Float32Array(this._vToNArray(this.immediateMode.vertices))],h=this._triangulate(s);this.immediateMode.vertices=[];for(var l=0,u=h.length;l<u;l+=3)this.vertex(h[l],h[l+1],h[l+2])}0<this.immediateMode.vertices.length&&this._drawFillImmediateMode(e,t,r,i,n,o)}}return this.immediateMode.vertices.length=0,this.immediateMode.vertexColors.length=0,this.immediateMode.uvCoords.length=0,this.isImmediateDrawing=!1,this.isBezier=!1,this.isQuadratic=!1,this.isCurve=!1,this.immediateMode._bezierVertex.length=0,this.immediateMode._quadraticVertex.length=0,this.immediateMode._curveVertex.length=0,this.immediateMode._isCoplanar=!0,this.immediateMode._testIfCoplanar=null,this},c.RendererGL.prototype._drawFillImmediateMode=function(e,t,r,i,n,o){var a=this.GL,s=this._getImmediateFillShader();if(this._setFillUniforms(s),s.attributes.aPosition&&(this._bindBuffer(this.immediateMode.vertexBuffer,a.ARRAY_BUFFER,this._vToNArray(this.immediateMode.vertices),Float32Array,a.DYNAMIC_DRAW),s.enableAttrib(s.attributes.aPosition,3)),this.drawMode===p.FILL&&s.attributes.aVertexColor&&(this._bindBuffer(this.immediateMode.colorBuffer,a.ARRAY_BUFFER,this.immediateMode.vertexColors,Float32Array,a.DYNAMIC_DRAW),s.enableAttrib(s.attributes.aVertexColor,4)),this.drawMode===p.TEXTURE&&s.attributes.aTexCoord&&(this._bindBuffer(this.immediateMode.uvBuffer,a.ARRAY_BUFFER,this.immediateMode.uvCoords,Float32Array,a.DYNAMIC_DRAW),s.enableAttrib(s.attributes.aTexCoord,2)),this.drawMode===p.FILL||this.drawMode===p.TEXTURE)switch(this.immediateMode.shapeMode){case p.LINE_STRIP:case p.LINES:this.immediateMode.shapeMode=p.TRIANGLE_FAN}else switch(this.immediateMode.shapeMode){case p.LINE_STRIP:case p.LINES:this.immediateMode.shapeMode=p.LINE_LOOP}if(this.immediateMode.shapeMode===p.QUADS||this.immediateMode.shapeMode===p.QUAD_STRIP)throw new Error("sorry, "+this.immediateMode.shapeMode+" not yet implemented in webgl mode.");this._applyColorBlend(this.curFillColor),a.enable(a.BLEND),a.drawArrays(this.immediateMode.shapeMode,0,this.immediateMode.vertices.length),this._pixelsState._pixelsDirty=!0,s.unbindShader()},c.RendererGL.prototype._drawStrokeImmediateMode=function(){var e=this.GL,t=this._getImmediateStrokeShader();this._setStrokeUniforms(t),t.attributes.aPosition&&(this._bindBuffer(this.immediateMode.lineVertexBuffer,e.ARRAY_BUFFER,this._flatten(this.immediateMode.lineVertices),Float32Array,e.STATIC_DRAW),t.enableAttrib(t.attributes.aPosition,3)),t.attributes.aDirection&&(this._bindBuffer(this.immediateMode.lineNormalBuffer,e.ARRAY_BUFFER,this._flatten(this.immediateMode.lineNormals),Float32Array,e.STATIC_DRAW),t.enableAttrib(t.attributes.aDirection,4)),this._applyColorBlend(this.curStrokeColor),e.drawArrays(e.TRIANGLES,0,this.immediateMode.lineVertices.length),this._pixelsState._pixelsDirty=!0,t.unbindShader()},t.exports=c.RendererGL},{"../core/constants":17,"../core/main":23}],73:[function(e,t,r){"use strict";var a=e("../core/main");function i(e,t,r,i,n){this.size=e,this.src=t,this.dst=r,this.attr=i,this.map=n}e("./p5.RendererGL");var n=a.RendererGL.prototype._flatten,o=a.RendererGL.prototype._vToNArray,s=[new i(3,"lineVertices","lineVertexBuffer","aPosition",n),new i(4,"lineNormals","lineNormalBuffer","aDirection",n)],h=[new i(3,"vertices","vertexBuffer","aPosition",o),new i(3,"vertexNormals","normalBuffer","aNormal",o),new i(4,"vertexColors","colorBuffer","aMaterialColor"),new i(3,"vertexAmbients","ambientBuffer","aAmbientColor"),new i(2,"uvs","uvBuffer","aTexCoord",n)];a.RendererGL._textBuffers=[new i(3,"vertices","vertexBuffer","aPosition",o),new i(2,"uvs","uvBuffer","aTexCoord",n)];var l=0;a.RendererGL.prototype._initBufferDefaults=function(e){if(this._freeBuffers(e),1e3<++l){var t=Object.keys(this.gHash)[0];delete this.gHash[t],l--}return this.gHash[e]={}},a.RendererGL.prototype._freeBuffers=function(e){var i=this.gHash[e];if(i){delete this.gHash[e],l--;var n=this.GL;i.indexBuffer&&n.deleteBuffer(i.indexBuffer),t(s),t(h)}function t(e){for(var t=0;t<e.length;t++){var r=e[t];i[r.dst]&&(n.deleteBuffer(i[r.dst]),i[r.dst]=null)}}},a.RendererGL.prototype._prepareBuffers=function(e,t,r){for(var i=e.model,n=t.attributes,o=this.GL,a=0;a<r.length;a++){var s=r[a],h=n[s.attr];if(h){var l=e[s.dst],u=i[s.src];if(u){var c=!l;if(c&&(e[s.dst]=l=o.createBuffer()),o.bindBuffer(o.ARRAY_BUFFER,l),c||!1!==i.dirtyFlags[s.src]){var p=s.map,d=p?p(u):u;this._bindBuffer(l,o.ARRAY_BUFFER,d),i.dirtyFlags[s.src]=!1}t.enableAttrib(h,s.size)}else l&&(o.deleteBuffer(l),e[s.dst]=null),o.disableVertexAttribArray(h.index)}}},a.RendererGL.prototype.createBuffers=function(e,t){var r=this.GL,i=this._initBufferDefaults(e);i.model=t;var n=i.indexBuffer;if(t.faces.length){n||(n=i.indexBuffer=r.createBuffer());var o=a.RendererGL.prototype._flatten(t.faces);this._bindBuffer(n,r.ELEMENT_ARRAY_BUFFER,o,Uint16Array),i.vertexCount=3*t.faces.length}else n&&(r.deleteBuffer(n),i.indexBuffer=null),i.vertexCount=t.vertices?t.vertices.length:0;return i.lineVertexCount=t.lineVertices?t.lineVertices.length:0,i},a.RendererGL.prototype.drawBuffers=function(e){var t=this.GL,r=this.gHash[e];if(this._doStroke&&0<r.lineVertexCount){var i=this._getRetainedStrokeShader();this._setStrokeUniforms(i),this._prepareBuffers(r,i,s),this._applyColorBlend(this.curStrokeColor),this._drawArrays(t.TRIANGLES,e),i.unbindShader()}if(this._doFill){var n=this._getRetainedFillShader();this._setFillUniforms(n),this._prepareBuffers(r,n,h),r.indexBuffer&&this._bindBuffer(r.indexBuffer,t.ELEMENT_ARRAY_BUFFER),this._applyColorBlend(this.curFillColor),this._drawElements(t.TRIANGLES,e),n.unbindShader()}return this},a.RendererGL.prototype.drawBuffersScaled=function(e,t,r,i){var n=this.uMVMatrix.copy();try{this.uMVMatrix.scale(t,r,i),this.drawBuffers(e)}finally{this.uMVMatrix=n}},a.RendererGL.prototype._drawArrays=function(e,t){return this.GL.drawArrays(e,0,this.gHash[t].lineVertexCount),this._pixelsState._pixelsDirty=!0,this},a.RendererGL.prototype._drawElements=function(e,t){var r=this.gHash[t],i=this.GL;r.indexBuffer?i.drawElements(i.TRIANGLES,r.vertexCount,i.UNSIGNED_SHORT,0):i.drawArrays(e||i.TRIANGLES,0,r.vertexCount),this._pixelsState._pixelsDirty=!0},a.RendererGL.prototype._drawPoints=function(e,t){var r=this.GL,i=this._getImmediatePointShader();this._setPointUniforms(i),this._bindBuffer(t,r.ARRAY_BUFFER,this._vToNArray(e),Float32Array,r.STATIC_DRAW),i.enableAttrib(i.attributes.aPosition,3),r.drawArrays(r.Points,0,e.length),i.unbindShader(),this._pixelsState._pixelsDirty=!0},t.exports=a.RendererGL},{"../core/main":23,"./p5.RendererGL":74}],74:[function(e,t,r){"use strict";var l=e("../core/main"),o=e("../core/constants"),i=e("libtess");e("./p5.Shader"),e("./p5.Camera"),e("../core/p5.Renderer"),e("./p5.Matrix");var n="precision mediump float;\n\nuniform mat4 uViewMatrix;\n\nuniform bool uUseLighting;\n\nuniform int uAmbientLightCount;\nuniform vec3 uAmbientColor[8];\n\nuniform int uDirectionalLightCount;\nuniform vec3 uLightingDirection[8];\nuniform vec3 uDirectionalColor[8];\n\nuniform int uPointLightCount;\nuniform vec3 uPointLightLocation[8];\nuniform vec3 uPointLightColor[8];\n\nuniform bool uSpecular;\nuniform float uShininess;\n\nuniform float uConstantAttenuation;\nuniform float uLinearAttenuation;\nuniform float uQuadraticAttenuation;\n\nconst float specularFactor = 2.0;\nconst float diffuseFactor = 0.73;\n\nstruct LightResult {\n  float specular;\n  float diffuse;\n};\n\nfloat _phongSpecular(\n  vec3 lightDirection,\n  vec3 viewDirection,\n  vec3 surfaceNormal,\n  float shininess) {\n\n  vec3 R = reflect(lightDirection, surfaceNormal);\n  return pow(max(0.0, dot(R, viewDirection)), shininess);\n}\n\nfloat _lambertDiffuse(vec3 lightDirection, vec3 surfaceNormal) {\n  return max(0.0, dot(-lightDirection, surfaceNormal));\n}\n\nLightResult _light(vec3 viewDirection, vec3 normal, vec3 lightVector) {\n\n  vec3 lightDir = normalize(lightVector);\n\n  //compute our diffuse & specular terms\n  LightResult lr;\n  if (uSpecular)\n    lr.specular = _phongSpecular(lightDir, viewDirection, normal, uShininess);\n  lr.diffuse = _lambertDiffuse(lightDir, normal);\n  return lr;\n}\n\nvoid totalLight(\n  vec3 modelPosition,\n  vec3 normal,\n  out vec3 totalDiffuse,\n  out vec3 totalSpecular\n) {\n\n  totalSpecular = vec3(0.0);\n\n  if (!uUseLighting) {\n    totalDiffuse = vec3(1.0);\n    return;\n  }\n\n  totalDiffuse = vec3(0.0);\n\n  vec3 viewDirection = normalize(-modelPosition);\n\n  for (int j = 0; j < 8; j++) {\n    if (j < uDirectionalLightCount) {\n      vec3 lightVector = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;\n      vec3 lightColor = uDirectionalColor[j];\n      LightResult result = _light(viewDirection, normal, lightVector);\n      totalDiffuse += result.diffuse * lightColor;\n      totalSpecular += result.specular * lightColor;\n    }\n\n    if (j < uPointLightCount) {\n      vec3 lightPosition = (uViewMatrix * vec4(uPointLightLocation[j], 1.0)).xyz;\n      vec3 lightVector = modelPosition - lightPosition;\n    \n      //calculate attenuation\n      float lightDistance = length(lightVector);\n      float lightFalloff = 1.0 / (uConstantAttenuation + lightDistance * uLinearAttenuation + (lightDistance * lightDistance) * uQuadraticAttenuation);\n      vec3 lightColor = lightFalloff * uPointLightColor[j];\n\n      LightResult result = _light(viewDirection, normal, lightVector);\n      totalDiffuse += result.diffuse * lightColor;\n      totalSpecular += result.specular * lightColor;\n    }\n  }\n\n  totalDiffuse *= diffuseFactor;\n  totalSpecular *= specularFactor;\n}\n",a={immediateVert:"attribute vec3 aPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform float uResolution;\nuniform float uPointSize;\n\nvarying vec4 vColor;\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vColor = aVertexColor;\n  gl_PointSize = uPointSize;\n}\n",vertexColorVert:"attribute vec3 aPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vColor = aVertexColor;\n}\n",vertexColorFrag:"precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n  gl_FragColor = vColor;\n}",normalVert:"attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\n\nvarying vec3 vVertexNormal;\nvarying highp vec2 vVertTexCoord;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vVertexNormal = normalize(vec3( uNormalMatrix * aNormal ));\n  vVertTexCoord = aTexCoord;\n}\n",normalFrag:"precision mediump float;\nvarying vec3 vVertexNormal;\nvoid main(void) {\n  gl_FragColor = vec4(vVertexNormal, 1.0);\n}",basicFrag:"precision mediump float;\nuniform vec4 uMaterialColor;\nvoid main(void) {\n  gl_FragColor = uMaterialColor;\n}",lightVert:n+"// include lighting.glgl\n\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\n\nvarying highp vec2 vVertTexCoord;\nvarying vec3 vDiffuseColor;\nvarying vec3 vSpecularColor;\n\nvoid main(void) {\n\n  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);\n  gl_Position = uProjectionMatrix * viewModelPosition;\n\n  vec3 vertexNormal = normalize(uNormalMatrix * aNormal);\n  vVertTexCoord = aTexCoord;\n\n  totalLight(viewModelPosition.xyz, vertexNormal, vDiffuseColor, vSpecularColor);\n\n  for (int i = 0; i < 8; i++) {\n    if (i < uAmbientLightCount) {\n      vDiffuseColor += uAmbientColor[i];\n    }\n  }\n}\n",lightTextureFrag:"precision mediump float;\n\nuniform vec4 uMaterialColor;\nuniform vec4 uTint;\nuniform sampler2D uSampler;\nuniform bool isTexture;\n\nvarying highp vec2 vVertTexCoord;\nvarying vec3 vDiffuseColor;\nvarying vec3 vSpecularColor;\n\nvoid main(void) {\n  gl_FragColor = isTexture ? texture2D(uSampler, vVertTexCoord) * (uTint / vec4(255, 255, 255, 255)) : uMaterialColor;\n  gl_FragColor.rgb = gl_FragColor.rgb * vDiffuseColor + vSpecularColor;\n}",phongVert:"precision mediump float;\nprecision mediump int;\n\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform vec3 uAmbientColor[8];\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\nuniform int uAmbientLightCount;\n\nvarying vec3 vNormal;\nvarying vec2 vTexCoord;\nvarying vec3 vViewPosition;\nvarying vec3 vAmbientColor;\n\nvoid main(void) {\n\n  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);\n\n  // Pass varyings to fragment shader\n  vViewPosition = viewModelPosition.xyz;\n  gl_Position = uProjectionMatrix * viewModelPosition;  \n\n  vNormal = uNormalMatrix * aNormal;\n  vTexCoord = aTexCoord;\n\n  // TODO: this should be a uniform\n  vAmbientColor = vec3(0.0);\n  for (int i = 0; i < 8; i++) {\n    if (i < uAmbientLightCount) {\n      vAmbientColor += uAmbientColor[i];\n    }\n  }\n}\n",phongFrag:n+"// include lighting.glgl\n\nuniform vec4 uMaterialColor;\nuniform sampler2D uSampler;\nuniform bool isTexture;\n\nvarying vec3 vNormal;\nvarying vec2 vTexCoord;\nvarying vec3 vViewPosition;\nvarying vec3 vAmbientColor;\n\nvoid main(void) {\n\n  vec3 diffuse;\n  vec3 specular;\n  totalLight(vViewPosition, normalize(vNormal), diffuse, specular);\n\n  gl_FragColor = isTexture ? texture2D(uSampler, vTexCoord) : uMaterialColor;\n  gl_FragColor.rgb = gl_FragColor.rgb * (diffuse + vAmbientColor) + specular;\n}",fontVert:"precision mediump float;\n\nattribute vec3 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nuniform vec4 uGlyphRect;\nuniform float uGlyphOffset;\n\nvarying vec2 vTexCoord;\nvarying float w;\n\nvoid main() {\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n\n  // scale by the size of the glyph's rectangle\n  positionVec4.xy *= uGlyphRect.zw - uGlyphRect.xy;\n\n  // move to the corner of the glyph\n  positionVec4.xy += uGlyphRect.xy;\n\n  // move to the letter's line offset\n  positionVec4.x += uGlyphOffset;\n  \n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vTexCoord = aTexCoord;\n  w = gl_Position.w;\n}\n",fontFrag:"#extension GL_OES_standard_derivatives : enable\nprecision mediump float;\n\n#if 0\n  // simulate integer math using floats\n\t#define int float\n\t#define ivec2 vec2\n\t#define INT(x) float(x)\n\n\tint ifloor(float v) { return floor(v); }\n\tivec2 ifloor(vec2 v) { return floor(v); }\n\n#else\n  // use native integer math\n\tprecision highp int;\n\t#define INT(x) x\n\n\tint ifloor(float v) { return int(v); }\n\tint ifloor(int v) { return v; }\n\tivec2 ifloor(vec2 v) { return ivec2(v); }\n\n#endif\n\nuniform sampler2D uSamplerStrokes;\nuniform sampler2D uSamplerRowStrokes;\nuniform sampler2D uSamplerRows;\nuniform sampler2D uSamplerColStrokes;\nuniform sampler2D uSamplerCols;\n\nuniform ivec2 uStrokeImageSize;\nuniform ivec2 uCellsImageSize;\nuniform ivec2 uGridImageSize;\n\nuniform ivec2 uGridOffset;\nuniform ivec2 uGridSize;\nuniform vec4 uMaterialColor;\n\nvarying vec2 vTexCoord;\n\n// some helper functions\nint round(float v) { return ifloor(v + 0.5); }\nivec2 round(vec2 v) { return ifloor(v + 0.5); }\nfloat saturate(float v) { return clamp(v, 0.0, 1.0); }\nvec2 saturate(vec2 v) { return clamp(v, 0.0, 1.0); }\n\nint mul(float v1, int v2) {\n  return ifloor(v1 * float(v2));\n}\n\nivec2 mul(vec2 v1, ivec2 v2) {\n  return ifloor(v1 * vec2(v2) + 0.5);\n}\n\n// unpack a 16-bit integer from a float vec2\nint getInt16(vec2 v) {\n  ivec2 iv = round(v * 255.0);\n  return iv.x * INT(128) + iv.y;\n}\n\nvec2 pixelScale;\nvec2 coverage = vec2(0.0);\nvec2 weight = vec2(0.5);\nconst float minDistance = 1.0/8192.0;\nconst float hardness = 1.05; // amount of antialias\n\n// the maximum number of curves in a glyph\nconst int N = INT(250);\n\n// retrieves an indexed pixel from a sampler\nvec4 getTexel(sampler2D sampler, int pos, ivec2 size) {\n  int width = size.x;\n  int y = ifloor(pos / width);\n  int x = pos - y * width;  // pos % width\n\n  return texture2D(sampler, (vec2(x, y) + 0.5) / vec2(size));\n}\n\nvoid calulateCrossings(vec2 p0, vec2 p1, vec2 p2, out vec2 C1, out vec2 C2) {\n\n  // get the coefficients of the quadratic in t\n  vec2 a = p0 - p1 * 2.0 + p2;\n  vec2 b = p0 - p1;\n  vec2 c = p0 - vTexCoord;\n\n  // found out which values of 't' it crosses the axes\n  vec2 surd = sqrt(max(vec2(0.0), b * b - a * c));\n  vec2 t1 = ((b - surd) / a).yx;\n  vec2 t2 = ((b + surd) / a).yx;\n\n  // approximate straight lines to avoid rounding errors\n  if (abs(a.y) < 0.001)\n    t1.x = t2.x = c.y / (2.0 * b.y);\n\n  if (abs(a.x) < 0.001)\n    t1.y = t2.y = c.x / (2.0 * b.x);\n\n  // plug into quadratic formula to find the corrdinates of the crossings\n  C1 = ((a * t1 - b * 2.0) * t1 + c) * pixelScale;\n  C2 = ((a * t2 - b * 2.0) * t2 + c) * pixelScale;\n}\n\nvoid coverageX(vec2 p0, vec2 p1, vec2 p2) {\n\n  vec2 C1, C2;\n  calulateCrossings(p0, p1, p2, C1, C2);\n\n  // determine on which side of the x-axis the points lie\n  bool y0 = p0.y > vTexCoord.y;\n  bool y1 = p1.y > vTexCoord.y;\n  bool y2 = p2.y > vTexCoord.y;\n\n  // could web be under the curve (after t1)?\n  if (y1 ? !y2 : y0) {\n    // add the coverage for t1\n    coverage.x += saturate(C1.x + 0.5);\n    // calculate the anti-aliasing for t1\n    weight.x = min(weight.x, abs(C1.x));\n  }\n\n  // are we outside the curve (after t2)?\n  if (y1 ? !y0 : y2) {\n    // subtract the coverage for t2\n    coverage.x -= saturate(C2.x + 0.5);\n    // calculate the anti-aliasing for t2\n    weight.x = min(weight.x, abs(C2.x));\n  }\n}\n\n// this is essentially the same as coverageX, but with the axes swapped\nvoid coverageY(vec2 p0, vec2 p1, vec2 p2) {\n\n  vec2 C1, C2;\n  calulateCrossings(p0, p1, p2, C1, C2);\n\n  bool x0 = p0.x > vTexCoord.x;\n  bool x1 = p1.x > vTexCoord.x;\n  bool x2 = p2.x > vTexCoord.x;\n\n  if (x1 ? !x2 : x0) {\n    coverage.y -= saturate(C1.y + 0.5);\n    weight.y = min(weight.y, abs(C1.y));\n  }\n\n  if (x1 ? !x0 : x2) {\n    coverage.y += saturate(C2.y + 0.5);\n    weight.y = min(weight.y, abs(C2.y));\n  }\n}\n\nvoid main() {\n\n  // calculate the pixel scale based on screen-coordinates\n  pixelScale = hardness / fwidth(vTexCoord);\n\n  // which grid cell is this pixel in?\n  ivec2 gridCoord = ifloor(vTexCoord * vec2(uGridSize));\n\n  // intersect curves in this row\n  {\n    // the index into the row info bitmap\n    int rowIndex = gridCoord.y + uGridOffset.y;\n    // fetch the info texel\n    vec4 rowInfo = getTexel(uSamplerRows, rowIndex, uGridImageSize);\n    // unpack the rowInfo\n    int rowStrokeIndex = getInt16(rowInfo.xy);\n    int rowStrokeCount = getInt16(rowInfo.zw);\n\n    for (int iRowStroke = INT(0); iRowStroke < N; iRowStroke++) {\n      if (iRowStroke >= rowStrokeCount)\n        break;\n\n      // each stroke is made up of 3 points: the start and control point\n      // and the start of the next curve.\n      // fetch the indices of this pair of strokes:\n      vec4 strokeIndices = getTexel(uSamplerRowStrokes, rowStrokeIndex++, uCellsImageSize);\n\n      // unpack the stroke index\n      int strokePos = getInt16(strokeIndices.xy);\n\n      // fetch the two strokes\n      vec4 stroke0 = getTexel(uSamplerStrokes, strokePos + INT(0), uStrokeImageSize);\n      vec4 stroke1 = getTexel(uSamplerStrokes, strokePos + INT(1), uStrokeImageSize);\n\n      // calculate the coverage\n      coverageX(stroke0.xy, stroke0.zw, stroke1.xy);\n    }\n  }\n\n  // intersect curves in this column\n  {\n    int colIndex = gridCoord.x + uGridOffset.x;\n    vec4 colInfo = getTexel(uSamplerCols, colIndex, uGridImageSize);\n    int colStrokeIndex = getInt16(colInfo.xy);\n    int colStrokeCount = getInt16(colInfo.zw);\n    \n    for (int iColStroke = INT(0); iColStroke < N; iColStroke++) {\n      if (iColStroke >= colStrokeCount)\n        break;\n\n      vec4 strokeIndices = getTexel(uSamplerColStrokes, colStrokeIndex++, uCellsImageSize);\n\n      int strokePos = getInt16(strokeIndices.xy);\n      vec4 stroke0 = getTexel(uSamplerStrokes, strokePos + INT(0), uStrokeImageSize);\n      vec4 stroke1 = getTexel(uSamplerStrokes, strokePos + INT(1), uStrokeImageSize);\n      coverageY(stroke0.xy, stroke0.zw, stroke1.xy);\n    }\n  }\n\n  weight = saturate(1.0 - weight * 2.0);\n  float distance = max(weight.x + weight.y, minDistance); // manhattan approx.\n  float antialias = abs(dot(coverage, weight) / distance);\n  float cover = min(abs(coverage.x), abs(coverage.y));\n  gl_FragColor = uMaterialColor;\n  gl_FragColor.a *= saturate(max(antialias, cover));\n}",lineVert:"/*\n  Part of the Processing project - http://processing.org\n  Copyright (c) 2012-15 The Processing Foundation\n  Copyright (c) 2004-12 Ben Fry and Casey Reas\n  Copyright (c) 2001-04 Massachusetts Institute of Technology\n  This library is free software; you can redistribute it and/or\n  modify it under the terms of the GNU Lesser General Public\n  License as published by the Free Software Foundation, version 2.1.\n  This library is distributed in the hope that it will be useful,\n  but WITHOUT ANY WARRANTY; without even the implied warranty of\n  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n  Lesser General Public License for more details.\n  You should have received a copy of the GNU Lesser General\n  Public License along with this library; if not, write to the\n  Free Software Foundation, Inc., 59 Temple Place, Suite 330,\n  Boston, MA  02111-1307  USA\n*/\n\n#define PROCESSING_LINE_SHADER\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform float uStrokeWeight;\n\nuniform vec4 uViewport;\n\nattribute vec4 aPosition;\nattribute vec4 aDirection;\n  \nvoid main() {\n  // using a scale <1 moves the lines towards the camera\n  // in order to prevent popping effects due to half of\n  // the line disappearing behind the geometry faces.\n  vec3 scale = vec3(0.9995);\n\n  vec4 posp = uModelViewMatrix * aPosition;\n  vec4 posq = uModelViewMatrix * (aPosition + vec4(aDirection.xyz, 0));\n\n  // Moving vertices slightly toward the camera\n  // to avoid depth-fighting with the fill triangles.\n  // Discussed here:\n  // http://www.opengl.org/discussion_boards/ubbthreads.php?ubb=showflat&Number=252848  \n  posp.xyz = posp.xyz * scale;\n  posq.xyz = posq.xyz * scale;\n\n  vec4 p = uProjectionMatrix * posp;\n  vec4 q = uProjectionMatrix * posq;\n\n  // formula to convert from clip space (range -1..1) to screen space (range 0..[width or height])\n  // screen_p = (p.xy/p.w + <1,1>) * 0.5 * uViewport.zw\n\n  // prevent division by W by transforming the tangent formula (div by 0 causes\n  // the line to disappear, see https://github.com/processing/processing/issues/5183)\n  // t = screen_q - screen_p\n  //\n  // tangent is normalized and we don't care which aDirection it points to (+-)\n  // t = +- normalize( screen_q - screen_p )\n  // t = +- normalize( (q.xy/q.w+<1,1>)*0.5*uViewport.zw - (p.xy/p.w+<1,1>)*0.5*uViewport.zw )\n  //\n  // extract common factor, <1,1> - <1,1> cancels out\n  // t = +- normalize( (q.xy/q.w - p.xy/p.w) * 0.5 * uViewport.zw )\n  //\n  // convert to common divisor\n  // t = +- normalize( ((q.xy*p.w - p.xy*q.w) / (p.w*q.w)) * 0.5 * uViewport.zw )\n  //\n  // remove the common scalar divisor/factor, not needed due to normalize and +-\n  // (keep uViewport - can't remove because it has different components for x and y\n  //  and corrects for aspect ratio, see https://github.com/processing/processing/issues/5181)\n  // t = +- normalize( (q.xy*p.w - p.xy*q.w) * uViewport.zw )\n\n  vec2 tangent = normalize((q.xy*p.w - p.xy*q.w) * uViewport.zw);\n\n  // flip tangent to normal (it's already normalized)\n  vec2 normal = vec2(-tangent.y, tangent.x);\n\n  float thickness = aDirection.w * uStrokeWeight;\n  vec2 offset = normal * thickness / 2.0;\n\n  // Perspective ---\n  // convert from world to clip by multiplying with projection scaling factor\n  // to get the right thickness (see https://github.com/processing/processing/issues/5182)\n  // invert Y, projections in Processing invert Y\n  vec2 perspScale = (uProjectionMatrix * vec4(1, -1, 0, 0)).xy;\n\n  // No Perspective ---\n  // multiply by W (to cancel out division by W later in the pipeline) and\n  // convert from screen to clip (derived from clip to screen above)\n  vec2 noPerspScale = p.w / (0.5 * uViewport.zw);\n\n  //gl_Position.xy = p.xy + offset.xy * mix(noPerspScale, perspScale, float(perspective > 0));\n  gl_Position.xy = p.xy + offset.xy * perspScale;\n  gl_Position.zw = p.zw;\n}\n",lineFrag:"precision mediump float;\nprecision mediump int;\n\nuniform vec4 uMaterialColor;\n\nvoid main() {\n  gl_FragColor = uMaterialColor;\n}",pointVert:"attribute vec3 aPosition;\nuniform float uPointSize;\nvarying float vStrokeWeight;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nvoid main() {\n\tvec4 positionVec4 =  vec4(aPosition, 1.0);\n\tgl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n\tgl_PointSize = uPointSize;\n\tvStrokeWeight = uPointSize;\n}",pointFrag:"precision mediump float;\nprecision mediump int;\nuniform vec4 uMaterialColor;\nvarying float vStrokeWeight;\n\nvoid main(){\n\tfloat mask = 0.0;\n\n\t// make a circular mask using the gl_PointCoord (goes from 0 - 1 on a point)\n    // might be able to get a nicer edge on big strokeweights with smoothstep but slightly less performant\n\n\tmask = step(0.98, length(gl_PointCoord * 2.0 - 1.0));\n\n\t// if strokeWeight is 1 or less lets just draw a square\n\t// this prevents weird artifacting from carving circles when our points are really small\n\t// if strokeWeight is larger than 1, we just use it as is\n\n\tmask = mix(0.0, mask, clamp(floor(vStrokeWeight - 0.5),0.0,1.0));\n\n\t// throw away the borders of the mask\n    // otherwise we get weird alpha blending issues\n\n\tif(mask > 0.98){\n      discard;\n  \t}\n\n  \tgl_FragColor = vec4(uMaterialColor.rgb * (1.0 - mask), uMaterialColor.a) ;\n}"};l.RendererGL=function(e,t,r,i){return l.Renderer.call(this,e,t,r),this._setAttributeDefaults(t),this._initContext(),this.isP3D=!0,this.GL=this.drawingContext,this._enableLighting=!1,this.ambientLightColors=[],this.directionalLightDirections=[],this.directionalLightColors=[],this.pointLightPositions=[],this.pointLightColors=[],this.drawMode=o.FILL,this.curFillColor=[1,1,1,1],this.curStrokeColor=[0,0,0,1],this.curBlendMode=o.BLEND,this.blendExt=this.GL.getExtension("EXT_blend_minmax"),this._useSpecularMaterial=!1,this._useNormalMaterial=!1,this._useShininess=1,this._tint=[255,255,255,255],this.constantAttenuation=1,this.linearAttenuation=0,this.quadraticAttenuation=0,this.uMVMatrix=new l.Matrix,this.uPMatrix=new l.Matrix,this.uNMatrix=new l.Matrix("mat3"),this._curCamera=new l.Camera(this),this._curCamera._computeCameraDefaultSettings(),this._curCamera._setDefaultCamera(),this.gHash={},this._defaultLightShader=void 0,this._defaultImmediateModeShader=void 0,this._defaultNormalShader=void 0,this._defaultColorShader=void 0,this._defaultPointShader=void 0,this._pointVertexBuffer=this.GL.createBuffer(),this.userFillShader=void 0,this.userStrokeShader=void 0,this.userPointShader=void 0,this.isImmediateDrawing=!1,this.immediateMode={},this.pointSize=5,this.curStrokeWeight=1,this.textures=[],this.textureMode=o.IMAGE,this.textureWrapX=o.CLAMP,this.textureWrapY=o.CLAMP,this._tex=null,this._curveTightness=6,this._lookUpTableBezier=[],this._lookUpTableQuadratic=[],this._lutBezierDetail=0,this._lutQuadraticDetail=0,this._tessy=this._initTessy(),this.fontInfos={},this},l.RendererGL.prototype=Object.create(l.Renderer.prototype),l.RendererGL.prototype._setAttributeDefaults=function(e){var t={alpha:!0,depth:!0,stencil:!0,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!0,perPixelLighting:!1};null===e._glAttributes?e._glAttributes=t:e._glAttributes=Object.assign(t,e._glAttributes)},l.RendererGL.prototype._initContext=function(){try{if(this.drawingContext=this.canvas.getContext("webgl",this._pInst._glAttributes)||this.canvas.getContext("experimental-webgl",this._pInst._glAttributes),null===this.drawingContext)throw new Error("Error creating webgl context");var e=this.drawingContext;e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),this._viewport=this.drawingContext.getParameter(this.drawingContext.VIEWPORT)}catch(e){throw e}},l.RendererGL.prototype._resetContext=function(e,t){var r=this.width,i=this.height,n=this.canvas.id,o=this._pInst instanceof l.Graphics;if(o){var a=this._pInst;a.canvas.parentNode.removeChild(a.canvas),a.canvas=document.createElement("canvas"),(a._pInst._userNode||document.body).appendChild(a.canvas),l.Element.call(a,a.canvas,a._pInst),a.width=r,a.height=i}else{var s=this.canvas;s&&s.parentNode.removeChild(s),(s=document.createElement("canvas")).id=n,this._pInst._userNode?this._pInst._userNode.appendChild(s):document.body.appendChild(s),this._pInst.canvas=s}var h=new l.RendererGL(this._pInst.canvas,this._pInst,!o);this._pInst._setProperty("_renderer",h),h.resize(r,i),h._applyDefaults(),o||this._pInst._elements.push(h),"function"==typeof t&&setTimeout(function(){t.apply(window._renderer,e)},0)},l.prototype.setAttributes=function(e,t){if(void 0!==this._glAttributes){var r=!0;if(void 0!==t?(null===this._glAttributes&&(this._glAttributes={}),this._glAttributes[e]!==t&&(this._glAttributes[e]=t,r=!1)):e instanceof Object&&this._glAttributes!==e&&(this._glAttributes=e,r=!1),this._renderer.isP3D&&!r){if(!this._setupDone)for(var i in this._renderer.gHash)if(this._renderer.gHash.hasOwnProperty(i))return void console.error("Sorry, Could not set the attributes, you need to call setAttributes() before calling the other drawing methods in setup()");this.push(),this._renderer._resetContext(),this.pop(),this._renderer._curCamera&&(this._renderer._curCamera._renderer=this._renderer)}}else console.log("You are trying to use setAttributes on a p5.Graphics object that does not use a WEBGL renderer.")},l.RendererGL.prototype._update=function(){this.uMVMatrix.set(this._curCamera.cameraMatrix.mat4[0],this._curCamera.cameraMatrix.mat4[1],this._curCamera.cameraMatrix.mat4[2],this._curCamera.cameraMatrix.mat4[3],this._curCamera.cameraMatrix.mat4[4],this._curCamera.cameraMatrix.mat4[5],this._curCamera.cameraMatrix.mat4[6],this._curCamera.cameraMatrix.mat4[7],this._curCamera.cameraMatrix.mat4[8],this._curCamera.cameraMatrix.mat4[9],this._curCamera.cameraMatrix.mat4[10],this._curCamera.cameraMatrix.mat4[11],this._curCamera.cameraMatrix.mat4[12],this._curCamera.cameraMatrix.mat4[13],this._curCamera.cameraMatrix.mat4[14],this._curCamera.cameraMatrix.mat4[15]),this.ambientLightColors.length=0,this.directionalLightDirections.length=0,this.directionalLightColors.length=0,this.pointLightPositions.length=0,this.pointLightColors.length=0,this._enableLighting=!1,this._tint=[255,255,255,255]},l.RendererGL.prototype.background=function(){var e=this._pInst.color.apply(this._pInst,arguments),t=e.levels[0]/255,r=e.levels[1]/255,i=e.levels[2]/255,n=e.levels[3]/255;this.GL.clearColor(t,r,i,n),this.GL.depthMask(!0),this.GL.clear(this.GL.COLOR_BUFFER_BIT|this.GL.DEPTH_BUFFER_BIT),this._pixelsState._pixelsDirty=!0},l.RendererGL.prototype.fill=function(e,t,r,i){var n=l.prototype.color.apply(this._pInst,arguments);this.curFillColor=n._array,this.drawMode=o.FILL,this._useNormalMaterial=!1,this._tex=null},l.RendererGL.prototype.stroke=function(e,t,r,i){i=255;var n=l.prototype.color.apply(this._pInst,arguments);this.curStrokeColor=n._array},l.RendererGL.prototype.strokeCap=function(e){console.error("Sorry, strokeCap() is not yet implemented in WEBGL mode")},l.RendererGL.prototype.blendMode=function(e){e===o.DARKEST||e===o.LIGHTEST||e===o.ADD||e===o.BLEND||e===o.SUBTRACT||e===o.SCREEN||e===o.EXCLUSION||e===o.REPLACE||e===o.MULTIPLY?this.curBlendMode=e:e!==o.BURN&&e!==o.OVERLAY&&e!==o.HARD_LIGHT&&e!==o.SOFT_LIGHT&&e!==o.DODGE||console.warn("BURN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, and DODGE only work for blendMode in 2D mode.")},l.RendererGL.prototype.strokeWeight=function(e){this.curStrokeWeight!==e&&(this.pointSize=e,this.curStrokeWeight=e)},l.RendererGL.prototype._getPixel=function(e,t){var r,i,n=this._pixelsState;return i=n._pixelsDirty?(r=new Uint8Array(4),this.drawingContext.readPixels(e,t,1,1,this.drawingContext.RGBA,this.drawingContext.UNSIGNED_BYTE,r),0):(r=n.pixels,4*(Math.floor(e)+Math.floor(t)*this.canvas.width)),[r[i+0],r[i+1],r[i+2],r[i+3]]},l.RendererGL.prototype.loadPixels=function(){var e=this._pixelsState;if(e._pixelsDirty)if(!(e._pixelsDirty=!1)===this._pInst._glAttributes.preserveDrawingBuffer){var t=e.pixels,r=this.GL.drawingBufferWidth*this.GL.drawingBufferHeight*4;t instanceof Uint8Array&&t.length===r||(t=new Uint8Array(r),this._pixelsState._setProperty("pixels",t));var i=this._pInst._pixelDensity;this.GL.readPixels(0,0,this.width*i,this.height*i,this.GL.RGBA,this.GL.UNSIGNED_BYTE,t)}else console.log("loadPixels only works in WebGL when preserveDrawingBuffer is true.")},l.RendererGL.prototype.geometryInHash=function(e){return void 0!==this.gHash[e]},l.RendererGL.prototype.resize=function(e,t){l.Renderer.prototype.resize.call(this,e,t),this.GL.viewport(0,0,this.GL.drawingBufferWidth,this.GL.drawingBufferHeight),this._viewport=this.GL.getParameter(this.GL.VIEWPORT),this._curCamera._resize();var r=this._pixelsState;r._pixelsDirty=!0,void 0!==r.pixels&&r._setProperty("pixels",new Uint8Array(this.GL.drawingBufferWidth*this.GL.drawingBufferHeight*4))},l.RendererGL.prototype.clear=function(){var e=arguments[0]||0,t=arguments[1]||0,r=arguments[2]||0,i=arguments[3]||0;this.GL.clearColor(e,t,r,i),this.GL.clear(this.GL.COLOR_BUFFER_BIT|this.GL.DEPTH_BUFFER_BIT),this._pixelsState._pixelsDirty=!0},l.RendererGL.prototype.applyMatrix=function(e,t,r,i,n,o){16===arguments.length?l.Matrix.prototype.apply.apply(this.uMVMatrix,arguments):this.uMVMatrix.apply([e,t,0,0,r,i,0,0,0,0,1,0,n,o,0,1])},l.RendererGL.prototype.translate=function(e,t,r){return e instanceof l.Vector&&(r=e.z,t=e.y,e=e.x),this.uMVMatrix.translate([e,t,r]),this},l.RendererGL.prototype.scale=function(e,t,r){return this.uMVMatrix.scale(e,t,r),this},l.RendererGL.prototype.rotate=function(e,t){return void 0===t?this.rotateZ(e):(l.Matrix.prototype.rotate.apply(this.uMVMatrix,arguments),this)},l.RendererGL.prototype.rotateX=function(e){return this.rotate(e,1,0,0),this},l.RendererGL.prototype.rotateY=function(e){return this.rotate(e,0,1,0),this},l.RendererGL.prototype.rotateZ=function(e){return this.rotate(e,0,0,1),this},l.RendererGL.prototype.push=function(){var e=l.Renderer.prototype.push.apply(this),t=e.properties;return t.uMVMatrix=this.uMVMatrix.copy(),t.uPMatrix=this.uPMatrix.copy(),t._curCamera=this._curCamera,this._curCamera=this._curCamera.copy(),t.ambientLightColors=this.ambientLightColors.slice(),t.directionalLightDirections=this.directionalLightDirections.slice(),t.directionalLightColors=this.directionalLightColors.slice(),t.pointLightPositions=this.pointLightPositions.slice(),t.pointLightColors=this.pointLightColors.slice(),t.userFillShader=this.userFillShader,t.userStrokeShader=this.userStrokeShader,t.userPointShader=this.userPointShader,t.pointSize=this.pointSize,t.curStrokeWeight=this.curStrokeWeight,t.curStrokeColor=this.curStrokeColor,t.curFillColor=this.curFillColor,t._useSpecularMaterial=this._useSpecularMaterial,t._useShininess=this._useShininess,t.constantAttenuation=this.constantAttenuation,t.linearAttenuation=this.linearAttenuation,t.quadraticAttenuation=this.quadraticAttenuation,t._enableLighting=this._enableLighting,t._useNormalMaterial=this._useNormalMaterial,t._tex=this._tex,t.drawMode=this.drawMode,e},l.RendererGL.prototype.resetMatrix=function(){return this.uMVMatrix=l.Matrix.identity(this._pInst),this},l.RendererGL.prototype._getImmediateStrokeShader=function(){var e=this.userStrokeShader;return e&&e.isStrokeShader()?e:this._getLineShader()},l.RendererGL.prototype._getRetainedStrokeShader=l.RendererGL.prototype._getImmediateStrokeShader,l.RendererGL.prototype._getImmediateFillShader=function(){if(this._useNormalMaterial)return console.log("Sorry, normalMaterial() does not currently work with custom WebGL geometry created with beginShape(). Falling back to standard fill material."),this._getImmediateModeShader();var e=this.userFillShader;if(this._enableLighting){if(!e||!e.isLightShader())return this._getLightShader()}else if(this._tex){if(!e||!e.isTextureShader())return this._getLightShader()}else if(!e)return this._getImmediateModeShader();return e},l.RendererGL.prototype._getRetainedFillShader=function(){if(this._useNormalMaterial)return this._getNormalShader();var e=this.userFillShader;if(this._enableLighting){if(!e||!e.isLightShader())return this._getLightShader()}else if(this._tex){if(!e||!e.isTextureShader())return this._getLightShader()}else if(!e)return this._getColorShader();return e},l.RendererGL.prototype._getImmediatePointShader=function(){var e=this.userPointShader;return e&&e.isPointShader()?e:this._getPointShader()},l.RendererGL.prototype._getRetainedLineShader=l.RendererGL.prototype._getImmediateLineShader,l.RendererGL.prototype._getLightShader=function(){return this._defaultLightShader||(this._pInst._glAttributes.perPixelLighting?this._defaultLightShader=new l.Shader(this,a.phongVert,a.phongFrag):this._defaultLightShader=new l.Shader(this,a.lightVert,a.lightTextureFrag)),this._defaultLightShader},l.RendererGL.prototype._getImmediateModeShader=function(){return this._defaultImmediateModeShader||(this._defaultImmediateModeShader=new l.Shader(this,a.immediateVert,a.vertexColorFrag)),this._defaultImmediateModeShader},l.RendererGL.prototype._getNormalShader=function(){return this._defaultNormalShader||(this._defaultNormalShader=new l.Shader(this,a.normalVert,a.normalFrag)),this._defaultNormalShader},l.RendererGL.prototype._getColorShader=function(){return this._defaultColorShader||(this._defaultColorShader=new l.Shader(this,a.normalVert,a.basicFrag)),this._defaultColorShader},l.RendererGL.prototype._getPointShader=function(){return this._defaultPointShader||(this._defaultPointShader=new l.Shader(this,a.pointVert,a.pointFrag)),this._defaultPointShader},l.RendererGL.prototype._getLineShader=function(){return this._defaultLineShader||(this._defaultLineShader=new l.Shader(this,a.lineVert,a.lineFrag)),this._defaultLineShader},l.RendererGL.prototype._getFontShader=function(){return this._defaultFontShader||(this.GL.getExtension("OES_standard_derivatives"),this._defaultFontShader=new l.Shader(this,a.fontVert,a.fontFrag)),this._defaultFontShader},l.RendererGL.prototype._getEmptyTexture=function(){if(!this._emptyTexture){var e=new l.Image(1,1);e.set(0,0,255),this._emptyTexture=new l.Texture(this,e)}return this._emptyTexture},l.RendererGL.prototype.getTexture=function(e){for(var t=this.textures,r=0;r<t.length;++r){var i=t[r];if(i.src===e)return i}var n=new l.Texture(this,e);return t.push(n),n},l.RendererGL.prototype._setStrokeUniforms=function(e){e.bindShader(),e.setUniform("uMaterialColor",this.curStrokeColor),e.setUniform("uStrokeWeight",this.curStrokeWeight)},l.RendererGL.prototype._setFillUniforms=function(e){e.bindShader(),e.setUniform("uMaterialColor",this.curFillColor),e.setUniform("isTexture",!!this._tex),this._tex&&e.setUniform("uSampler",this._tex),e.setUniform("uTint",this._tint),e.setUniform("uSpecular",this._useSpecularMaterial),e.setUniform("uShininess",this._useShininess),e.setUniform("uUseLighting",this._enableLighting);var t=this.pointLightColors.length/3;e.setUniform("uPointLightCount",t),e.setUniform("uPointLightLocation",this.pointLightPositions),e.setUniform("uPointLightColor",this.pointLightColors);var r=this.directionalLightColors.length/3;e.setUniform("uDirectionalLightCount",r),e.setUniform("uLightingDirection",this.directionalLightDirections),e.setUniform("uDirectionalColor",this.directionalLightColors);var i=this.ambientLightColors.length/3;e.setUniform("uAmbientLightCount",i),e.setUniform("uAmbientColor",this.ambientLightColors),e.setUniform("uConstantAttenuation",this.constantAttenuation),e.setUniform("uLinearAttenuation",this.linearAttenuation),e.setUniform("uQuadraticAttenuation",this.quadraticAttenuation),e.bindTextures()},l.RendererGL.prototype._setPointUniforms=function(e){e.bindShader(),e.setUniform("uMaterialColor",this.curStrokeColor),e.setUniform("uPointSize",this.pointSize)},l.RendererGL.prototype._bindBuffer=function(e,t,r,i,n){if(t||(t=this.GL.ARRAY_BUFFER),this.GL.bindBuffer(t,e),void 0!==r){var o=new(i||Float32Array)(r);this.GL.bufferData(t,o,n||this.GL.STATIC_DRAW)}},l.RendererGL.prototype._flatten=function(e){if(0===e.length)return[];if(2e4<e.length){var t,r=Object.prototype.toString,i=[],n=e.slice();for(t=n.pop();"[object Array]"===r.call(t)?n.push.apply(n,t):i.push(t),n.length&&void 0!==(t=n.pop()););return i.reverse(),i}return[].concat.apply([],e)},l.RendererGL.prototype._vToNArray=function(e){for(var t=[],r=0;r<e.length;r++){var i=e[r];t.push(i.x,i.y,i.z)}return t},l.prototype._assert3d=function(e){if(!this._renderer.isP3D)throw new Error(e+"() is only supported in WEBGL mode. If you'd like to use 3D graphics and WebGL, see  https://p5js.org/examples/form-3d-primitives.html for more information.")},l.RendererGL.prototype._initTessy=function(){var e=new i.GluTesselator;return e.gluTessCallback(i.gluEnum.GLU_TESS_VERTEX_DATA,function(e,t){t[t.length]=e[0],t[t.length]=e[1],t[t.length]=e[2]}),e.gluTessCallback(i.gluEnum.GLU_TESS_BEGIN,function(e){e!==i.primitiveType.GL_TRIANGLES&&console.log("expected TRIANGLES but got type: "+e)}),e.gluTessCallback(i.gluEnum.GLU_TESS_ERROR,function(e){console.log("error callback"),console.log("error number: "+e)}),e.gluTessCallback(i.gluEnum.GLU_TESS_COMBINE,function(e,t,r){return[e[0],e[1],e[2]]}),e.gluTessCallback(i.gluEnum.GLU_TESS_EDGE_FLAG,function(e){}),e},l.RendererGL.prototype._triangulate=function(e){this._tessy.gluTessNormal(0,0,1);var t=[];this._tessy.gluTessBeginPolygon(t);for(var r=0;r<e.length;r++){this._tessy.gluTessBeginContour();for(var i=e[r],n=0;n<i.length;n+=3){var o=[i[n],i[n+1],i[n+2]];this._tessy.gluTessVertex(o,o)}this._tessy.gluTessEndContour()}return this._tessy.gluTessEndPolygon(),t},l.RendererGL.prototype._bezierCoefficients=function(e){var t=e*e,r=1-e,i=r*r;return[i*r,3*i*e,3*r*t,t*e]},l.RendererGL.prototype._quadraticCoefficients=function(e){var t=1-e;return[t*t,2*t*e,e*e]},l.RendererGL.prototype._bezierToCatmull=function(e){return[e[1],e[1]+(e[2]-e[0])/this._curveTightness,e[2]-(e[3]-e[1])/this._curveTightness,e[2]]},t.exports=l.RendererGL},{"../core/constants":17,"../core/main":23,"../core/p5.Renderer":26,"./p5.Camera":69,"./p5.Matrix":71,"./p5.Shader":75,libtess:8}],75:[function(e,t,r){"use strict";var i=e("../core/main");i.Shader=function(e,t,r){this._renderer=e,this._vertSrc=t,this._fragSrc=r,this._vertShader=-1,this._fragShader=-1,this._glProgram=0,this._loadedAttributes=!1,this.attributes={},this._loadedUniforms=!1,this.uniforms={},this._bound=!1,this.samplers=[]},i.Shader.prototype.init=function(){if(0===this._glProgram){var e=this._renderer.GL;if(this._vertShader=e.createShader(e.VERTEX_SHADER),e.shaderSource(this._vertShader,this._vertSrc),e.compileShader(this._vertShader),!e.getShaderParameter(this._vertShader,e.COMPILE_STATUS))return console.error("Yikes! An error occurred compiling the vertex shader:"+e.getShaderInfoLog(this._vertShader)),null;if(this._fragShader=e.createShader(e.FRAGMENT_SHADER),e.shaderSource(this._fragShader,this._fragSrc),e.compileShader(this._fragShader),!e.getShaderParameter(this._fragShader,e.COMPILE_STATUS))return console.error("Darn! An error occurred compiling the fragment shader:"+e.getShaderInfoLog(this._fragShader)),null;this._glProgram=e.createProgram(),e.attachShader(this._glProgram,this._vertShader),e.attachShader(this._glProgram,this._fragShader),e.linkProgram(this._glProgram),e.getProgramParameter(this._glProgram,e.LINK_STATUS)||console.error("Snap! Error linking shader program: "+e.getProgramInfoLog(this._glProgram)),this._loadAttributes(),this._loadUniforms()}return this},i.Shader.prototype._loadAttributes=function(){if(!this._loadedAttributes){this.attributes={};for(var e=this._renderer.GL,t=e.getProgramParameter(this._glProgram,e.ACTIVE_ATTRIBUTES),r=0;r<t;++r){var i=e.getActiveAttrib(this._glProgram,r),n=i.name,o=e.getAttribLocation(this._glProgram,n),a={};a.name=n,a.location=o,a.index=r,a.type=i.type,a.size=i.size,this.attributes[n]=a}this._loadedAttributes=!0}},i.Shader.prototype._loadUniforms=function(){if(!this._loadedUniforms){for(var e=this._renderer.GL,t=e.getProgramParameter(this._glProgram,e.ACTIVE_UNIFORMS),r=0,i=0;i<t;++i){var n=e.getActiveUniform(this._glProgram,i),o={};o.location=e.getUniformLocation(this._glProgram,n.name),o.size=n.size;var a=n.name;1<n.size&&(a=a.substring(0,a.indexOf("[0]"))),o.name=a,o.type=n.type,o.type===e.SAMPLER_2D&&(o.samplerIndex=r,r++,this.samplers.push(o)),this.uniforms[a]=o}this._loadedUniforms=!0}},i.Shader.prototype.compile=function(){},i.Shader.prototype.bindShader=function(){this.init(),this._bound||(this.useProgram(),this._bound=!0,this._setMatrixUniforms(),this.setUniform("uViewport",this._renderer._viewport))},i.Shader.prototype.unbindShader=function(){return this._bound&&(this.unbindTextures(),this._bound=!1),this},i.Shader.prototype.bindTextures=function(){for(var e=this._renderer.GL,t=0;t<this.samplers.length;t++){var r=this.samplers[t],i=r.texture;void 0===i&&(i=this._renderer._getEmptyTexture()),e.activeTexture(e.TEXTURE0+r.samplerIndex),i.bindTexture(),i.update(),e.uniform1i(r.location,r.samplerIndex)}},i.Shader.prototype.updateTextures=function(){for(var e=0;e<this.samplers.length;e++){var t=this.samplers[e].texture;t&&t.update()}},i.Shader.prototype.unbindTextures=function(){},i.Shader.prototype._setMatrixUniforms=function(){this.setUniform("uProjectionMatrix",this._renderer.uPMatrix.mat4),this.setUniform("uModelViewMatrix",this._renderer.uMVMatrix.mat4),this.setUniform("uViewMatrix",this._renderer._curCamera.cameraMatrix.mat4),this.uniforms.uNormalMatrix&&(this._renderer.uNMatrix.inverseTranspose(this._renderer.uMVMatrix),this.setUniform("uNormalMatrix",this._renderer.uNMatrix.mat3))},i.Shader.prototype.useProgram=function(){return this._renderer.GL.useProgram(this._glProgram),this},i.Shader.prototype.setUniform=function(e,t){var r=this.uniforms[e];if(r){var i=r.location,n=this._renderer.GL;switch(this.useProgram(),r.type){case n.BOOL:!0===t?n.uniform1i(i,1):n.uniform1i(i,0);break;case n.INT:1<r.size?t.length&&n.uniform1iv(i,t):n.uniform1i(i,t);break;case n.FLOAT:1<r.size?t.length&&n.uniform1fv(i,t):n.uniform1f(i,t);break;case n.FLOAT_MAT3:n.uniformMatrix3fv(i,!1,t);break;case n.FLOAT_MAT4:n.uniformMatrix4fv(i,!1,t);break;case n.FLOAT_VEC2:1<r.size?t.length&&n.uniform2fv(i,t):n.uniform2f(i,t[0],t[1]);break;case n.FLOAT_VEC3:1<r.size?t.length&&n.uniform3fv(i,t):n.uniform3f(i,t[0],t[1],t[2]);break;case n.FLOAT_VEC4:1<r.size?t.length&&n.uniform4fv(i,t):n.uniform4f(i,t[0],t[1],t[2],t[3]);break;case n.INT_VEC2:1<r.size?t.length&&n.uniform2iv(i,t):n.uniform2i(i,t[0],t[1]);break;case n.INT_VEC3:1<r.size?t.length&&n.uniform3iv(i,t):n.uniform3i(i,t[0],t[1],t[2]);break;case n.INT_VEC4:1<r.size?t.length&&n.uniform4iv(i,t):n.uniform4i(i,t[0],t[1],t[2],t[3]);break;case n.SAMPLER_2D:n.activeTexture(n.TEXTURE0+r.samplerIndex),r.texture=this._renderer.getTexture(t),n.uniform1i(r.location,r.samplerIndex)}return this}},i.Shader.prototype.isLightShader=function(){return void 0!==this.attributes.aNormal||void 0!==this.uniforms.uUseLighting||void 0!==this.uniforms.uAmbientLightCount||void 0!==this.uniforms.uDirectionalLightCount||void 0!==this.uniforms.uPointLightCount||void 0!==this.uniforms.uAmbientColor||void 0!==this.uniforms.uDirectionalColor||void 0!==this.uniforms.uPointLightLocation||void 0!==this.uniforms.uPointLightColor||void 0!==this.uniforms.uLightingDirection||void 0!==this.uniforms.uSpecular},i.Shader.prototype.isTextureShader=function(){return 0<this.samplerIndex},i.Shader.prototype.isColorShader=function(){return void 0!==this.attributes.aVertexColor||void 0!==this.uniforms.uMaterialColor},i.Shader.prototype.isTexLightShader=function(){return this.isLightShader()&&this.isTextureShader()},i.Shader.prototype.isStrokeShader=function(){return void 0!==this.uniforms.uStrokeWeight},i.Shader.prototype.enableAttrib=function(e,t,r,i,n,o){if(e){0;var a=e.location;if(-1!==a){var s=this._renderer.GL;s.enableVertexAttribArray(a),s.vertexAttribPointer(a,t,r||s.FLOAT,i||!1,n||0,o||0)}}return this},t.exports=i.Shader},{"../core/main":23}],76:[function(e,t,r){"use strict";var n=e("../core/main"),a=e("../core/constants");n.Texture=function(e,t){this._renderer=e;var r=this._renderer.GL;this.src=t,this.glTex=void 0,this.glTarget=r.TEXTURE_2D,this.glFormat=r.RGBA,this.mipmaps=!1,this.glMinFilter=r.LINEAR,this.glMagFilter=r.LINEAR,this.glWrapS=r.CLAMP_TO_EDGE,this.glWrapT=r.CLAMP_TO_EDGE,this.isSrcMediaElement=void 0!==n.MediaElement&&t instanceof n.MediaElement,this._videoPrevUpdateTime=0,this.isSrcHTMLElement=void 0!==n.Element&&t instanceof n.Element&&!(t instanceof n.Graphics),this.isSrcP5Image=t instanceof n.Image,this.isSrcP5Graphics=t instanceof n.Graphics,this.isImageData="undefined"!=typeof ImageData&&t instanceof ImageData;var i=this._getTextureDataFromSource();return this.width=i.width,this.height=i.height,this.init(i),this},n.Texture.prototype._getTextureDataFromSource=function(){var e;return this.isSrcP5Image?e=this.src.canvas:this.isSrcMediaElement||this.isSrcP5Graphics||this.isSrcHTMLElement?e=this.src.elt:this.isImageData&&(e=this.src),e},n.Texture.prototype.init=function(e){var t=this._renderer.GL;if(this.glTex=t.createTexture(),this.glWrapS=this._renderer.textureWrapX,this.glWrapT=this._renderer.textureWrapY,this.setWrapMode(this.glWrapS,this.glWrapT),this.bindTexture(),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,this.glMagFilter),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,this.glMinFilter),0===this.width||0===this.height||this.isSrcMediaElement&&!this.src.loadedmetadata){var r=new Uint8Array([1,1,1,1]);t.texImage2D(this.glTarget,0,t.RGBA,1,1,0,this.glFormat,t.UNSIGNED_BYTE,r)}else t.texImage2D(this.glTarget,0,this.glFormat,this.glFormat,t.UNSIGNED_BYTE,e)},n.Texture.prototype.update=function(){var e=this.src;if(0===e.width||0===e.height)return!1;var t=this._getTextureDataFromSource(),r=!1,i=this._renderer.GL;return t.width!==this.width||t.height!==this.height?(r=!0,this.width=t.width,this.height=t.height,this.isSrcP5Image?e.setModified(!1):(this.isSrcMediaElement||this.isSrcHTMLElement)&&e.setModified(!0)):this.isSrcP5Image?e.isModified()&&(r=!0,e.setModified(!1)):this.isSrcMediaElement?e.isModified()?(r=!0,e.setModified(!1)):e.loadedmetadata&&this._videoPrevUpdateTime!==e.time()&&(this._videoPrevUpdateTime=e.time(),r=!0):this.isImageData?e._dirty&&(r=!(e._dirty=!1)):r=!0,r&&(this.bindTexture(),i.texImage2D(this.glTarget,0,this.glFormat,this.glFormat,i.UNSIGNED_BYTE,t)),r},n.Texture.prototype.bindTexture=function(){return this._renderer.GL.bindTexture(this.glTarget,this.glTex),this},n.Texture.prototype.unbindTexture=function(){this._renderer.GL.bindTexture(this.glTarget,null)},n.Texture.prototype.setInterpolation=function(e,t){var r=this._renderer.GL;e===a.NEAREST?this.glMinFilter=r.NEAREST:this.glMinFilter=r.LINEAR,t===a.NEAREST?this.glMagFilter=r.NEAREST:this.glMagFilter=r.LINEAR,this.bindTexture(),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.glMinFilter),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,this.glMagFilter),this.unbindTexture()},n.Texture.prototype.setWrapMode=function(e,t){var r=this._renderer.GL,i=function(e){return 0==(e&e-1)},n=i(this.width),o=i(this.height);e===a.REPEAT?this.glWrapS=n&&o?r.REPEAT:(console.warn("You tried to set the wrap mode to REPEAT but the texture size is not a power of two. Setting to CLAMP instead"),r.CLAMP_TO_EDGE):e===a.MIRROR?this.glWrapS=n&&o?r.MIRRORED_REPEAT:(console.warn("You tried to set the wrap mode to MIRROR but the texture size is not a power of two. Setting to CLAMP instead"),r.CLAMP_TO_EDGE):this.glWrapS=r.CLAMP_TO_EDGE,t===a.REPEAT?this.glWrapT=n&&o?r.REPEAT:(console.warn("You tried to set the wrap mode to REPEAT but the texture size is not a power of two. Setting to CLAMP instead"),r.CLAMP_TO_EDGE):t===a.MIRROR?this.glWrapT=n&&o?r.MIRRORED_REPEAT:(console.warn("You tried to set the wrap mode to MIRROR but the texture size is not a power of two. Setting to CLAMP instead"),r.CLAMP_TO_EDGE):this.glWrapT=r.CLAMP_TO_EDGE,this.bindTexture(),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,this.glWrapS),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,this.glWrapT),this.unbindTexture()},t.exports=n.Texture},{"../core/constants":17,"../core/main":23}],77:[function(e,t,r){"use strict";var B=e("../core/main"),T=e("../core/constants");e("./p5.Shader"),e("./p5.RendererGL.Retained"),B.RendererGL.prototype._applyTextProperties=function(){},B.RendererGL.prototype.textWidth=function(e){return this._isOpenType()?this._textFont._textWidth(e,this._textSize):0};function i(e,t){this.width=e,this.height=t,this.infos=[],this.findImage=function(e){var t,r,i=this.width*this.height;if(i<e)throw new Error("font is too complex to render in 3D");for(var n=this.infos.length-1;0<=n;--n){var o=this.infos[n];if(o.index+e<i){r=(t=o).imageData;break}}if(!t){try{r=new ImageData(this.width,this.height)}catch(e){var a=document.getElementsByTagName("canvas")[0],s=!a;a||((a=document.createElement("canvas")).style.display="none",document.body.appendChild(a));var h=a.getContext("2d");h&&(r=h.createImageData(this.width,this.height)),s&&document.body.removeChild(a)}t={index:0,imageData:r},this.infos.push(t)}var l=t.index;return t.index+=e,r._dirty=!0,{imageData:r,index:l}}}function N(e,t,r,i,n){var o=e.imageData.data,a=4*e.index++;o[a++]=t,o[a++]=r,o[a++]=i,o[a++]=n}var G=Math.sqrt(3),M=function(e){this.font=e,this.strokeImageInfos=new i(64,64),this.colDimImageInfos=new i(64,64),this.rowDimImageInfos=new i(64,64),this.colCellImageInfos=new i(64,64),this.rowCellImageInfos=new i(64,64),this.glyphInfos={},this.getGlyphInfo=function(e){var t=this.glyphInfos[e.index];if(t)return t;var r,i=e.getBoundingBox(),n=i.x1,o=i.y1,a=i.x2-n,s=i.y2-o,h=e.path.commands;if(0===a||0===s||!h.length)return this.glyphInfos[e.index]={};var l,u,c,p,d=[],f=[],m=[];for(r=8;0<=r;--r)m.push([]);for(r=8;0<=r;--r)f.push([]);function v(e,t,r){var i=d.length;function n(e,t,r){for(var i=e.length;0<i--;){var n=e[i];n<t&&(t=n),r<n&&(r=n)}return{min:t,max:r}}d.push(r);for(var o=n(e,1,0),a=Math.max(Math.floor(9*o.min),0),s=Math.min(Math.ceil(9*o.max),9),h=a;h<s;++h)m[h].push(i);for(var l=n(t,1,0),u=Math.max(Math.floor(9*l.min),0),c=Math.min(Math.ceil(9*l.max),9),p=u;p<c;++p)f[p].push(i)}function g(e){return(t=(i=255)*e)<(r=0)?r:i<t?i:t;var t,r,i}function y(e,t,r,i){this.p0=e,this.c0=t,this.c1=r,this.p1=i,this.toQuadratic=function(){return{x:this.p0.x,y:this.p0.y,x1:this.p1.x,y1:this.p1.y,cx:(3*(this.c0.x+this.c1.x)-(this.p0.x+this.p1.x))/4,cy:(3*(this.c0.y+this.c1.y)-(this.p0.y+this.p1.y))/4}},this.quadError=function(){return B.Vector.sub(B.Vector.sub(this.p1,this.p0),B.Vector.mult(B.Vector.sub(this.c1,this.c0),3)).mag()/2},this.split=function(e){var t=B.Vector.lerp(this.p0,this.c0,e),r=B.Vector.lerp(this.c0,this.c1,e),i=B.Vector.lerp(t,r,e);this.c1=B.Vector.lerp(this.c1,this.p1,e),this.c0=B.Vector.lerp(r,this.c1,e);var n=B.Vector.lerp(i,this.c0,e),o=new y(this.p0,t,i,n);return this.p0=n,o},this.splitInflections=function(){var e=B.Vector.sub(this.c0,this.p0),t=B.Vector.sub(B.Vector.sub(this.c1,this.c0),e),r=B.Vector.sub(B.Vector.sub(B.Vector.sub(this.p1,this.c1),e),B.Vector.mult(t,2)),i=[],n=t.x*r.y-t.y*r.x;if(0!==n){var o=e.x*r.y-e.y*r.x,a=e.x*t.y-e.y*t.x,s=o*o-4*n*a;if(0<=s){n<0&&(n=-n,o=-o,a=-a);var h=Math.sqrt(s),l=(-o-h)/(2*n),u=(-o+h)/(2*n);0<l&&l<1&&(i.push(this.split(l)),u=1-(1-u)/(1-l)),0<u&&u<1&&i.push(this.split(u))}}return i.push(this),i}}function b(e,t,r,i,n,o,a,s){for(var h=new y(new B.Vector(e,t),new B.Vector(r,i),new B.Vector(n,o),new B.Vector(a,s)).splitInflections(),l=[],u=30/G,c=0;c<h.length;c++){for(var p,d=h[c],f=[];!(.125<=(p=u/d.quadError()));){var m=Math.pow(p,1/3),v=d.split(m),g=d.split(1-m/(1-m));l.push(v),f.push(d),d=g}p<1&&l.push(d.split(.5)),l.push(d),Array.prototype.push.apply(l,f.reverse())}return l}function _(e,t,r,i){v([e,r],[t,i],{x:e,y:t,cx:(e+r)/2,cy:(t+i)/2})}function x(e,t,r,i){return Math.abs(r-e)<1e-5&&Math.abs(i-t)<1e-5}for(var w=0;w<h.length;++w){var S=h[w],T=(S.x-n)/a,M=(S.y-o)/s;if(!x(l,u,T,M)){switch(S.type){case"M":c=T,p=M;break;case"L":_(l,u,T,M);break;case"Q":var E=(S.x1-n)/a,C=(S.y1-o)/s;v([l,T,E],[u,M,C],{x:l,y:u,cx:E,cy:C});break;case"Z":x(l,u,c,p)?d.push({x:l,y:u}):(_(l,u,c,p),d.push({x:c,y:p}));break;case"C":for(var R=b(l,u,(S.x1-n)/a,(S.y1-o)/s,(S.x2-n)/a,(S.y2-o)/s,T,M),L=0;L<R.length;L++){var D=R[L].toQuadratic();v([D.x,D.x1,D.cx],[D.y,D.y1,D.cy],D)}break;default:throw new Error("unknown command type: "+S.type)}l=T,u=M}}for(var P=d.length,I=this.strokeImageInfos.findImage(P),k=I.index,A=0;A<P;++A){var U=d[A];N(I,g(U.x),g(U.y),g(U.cx),g(U.cy))}function O(e,t,r){for(var i=e.length,n=t.findImage(i),o=n.index,a=0,s=0;s<i;++s)a+=e[s].length;for(var h=r.findImage(a),l=0;l<i;++l){var u=e[l],c=u.length,p=h.index;N(n,p>>7,127&p,c>>7,127&c);for(var d=0;d<c;++d){var f=u[d]+k;N(h,f>>7,127&f,0,0)}}return{cellImageInfo:h,dimOffset:o,dimImageInfo:n}}return(t=this.glyphInfos[e.index]={glyph:e,uGlyphRect:[i.x1,-i.y1,i.x2,-i.y2],strokeImageInfo:I,strokes:d,colInfo:O(m,this.colDimImageInfos,this.colCellImageInfos),rowInfo:O(f,this.rowDimImageInfos,this.rowCellImageInfos)}).uGridOffset=[t.colInfo.dimOffset,t.rowInfo.dimOffset],t}};B.RendererGL.prototype._renderText=function(e,t,r,i,n){if(this._textFont&&"string"!=typeof this._textFont){if(!(n<=i)&&this._doFill){if(!this._isOpenType())return console.log("WEBGL: only opentype fonts are supported"),e;e.push();var o=this._doStroke,a=this.drawMode;this._doStroke=!1,this.drawMode=T.TEXTURE;var s=this._textFont.font,h=this._textFont._fontInfo;h||(h=this._textFont._fontInfo=new M(s));var l=this._textFont._handleAlignment(this,t,r,i),u=this._textSize/s.unitsPerEm;this.translate(l.x,l.y,0),this.scale(u,u,1);var c=this.GL,p=!this._defaultFontShader,d=this._getFontShader();d.init(),d.bindShader(),p&&(d.setUniform("uGridImageSize",[64,64]),d.setUniform("uCellsImageSize",[64,64]),d.setUniform("uStrokeImageSize",[64,64]),d.setUniform("uGridSize",[9,9])),this._applyColorBlend(this.curFillColor);var f=this.gHash.glyph;if(!f){var m=this._textGeom=new B.Geometry(1,1,function(){for(var e=0;e<=1;e++)for(var t=0;t<=1;t++)this.vertices.push(new B.Vector(t,e,0)),this.uvs.push(t,e)});m.computeFaces().computeNormals(),f=this.createBuffers("glyph",m)}this._prepareBuffers(f,d,B.RendererGL._textBuffers),this._bindBuffer(f.indexBuffer,c.ELEMENT_ARRAY_BUFFER),d.setUniform("uMaterialColor",this.curFillColor);try{for(var v=0,g=null,y=s.stringToGlyphs(t),b=0;b<y.length;++b){var _=y[b];g&&(v+=s.getKerningValue(g,_));var x=h.getGlyphInfo(_);if(x.uGlyphRect){var w=x.rowInfo,S=x.colInfo;d.setUniform("uSamplerStrokes",x.strokeImageInfo.imageData),d.setUniform("uSamplerRowStrokes",w.cellImageInfo.imageData),d.setUniform("uSamplerRows",w.dimImageInfo.imageData),d.setUniform("uSamplerColStrokes",S.cellImageInfo.imageData),d.setUniform("uSamplerCols",S.dimImageInfo.imageData),d.setUniform("uGridOffset",x.uGridOffset),d.setUniform("uGlyphRect",x.uGlyphRect),d.setUniform("uGlyphOffset",v),d.bindTextures(),c.drawElements(c.TRIANGLES,6,this.GL.UNSIGNED_SHORT,0)}v+=_.advanceWidth,g=_}}finally{d.unbindShader(),this._doStroke=o,this.drawMode=a,e.pop()}return this._pixelsState._pixelsDirty=!0,e}}else console.log("WEBGL: you must load and set a font before drawing text. See `loadFont` and `textFont` for more details.")}},{"../core/constants":17,"../core/main":23,"./p5.RendererGL.Retained":73,"./p5.Shader":75}]},{},[12])(12)});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)))

/***/ })
/******/ ]);