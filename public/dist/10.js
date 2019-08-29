(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/_@tweenjs_tween.js@17.4.0@@tweenjs/tween.js/src/Tween.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_@tweenjs_tween.js@17.4.0@@tweenjs/tween.js/src/Tween.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */


var _Group = function () {
	this._tweens = {};
	this._tweensAddedDuringUpdate = {};
};

_Group.prototype = {
	getAll: function () {

		return Object.keys(this._tweens).map(function (tweenId) {
			return this._tweens[tweenId];
		}.bind(this));

	},

	removeAll: function () {

		this._tweens = {};

	},

	add: function (tween) {

		this._tweens[tween.getId()] = tween;
		this._tweensAddedDuringUpdate[tween.getId()] = tween;

	},

	remove: function (tween) {

		delete this._tweens[tween.getId()];
		delete this._tweensAddedDuringUpdate[tween.getId()];

	},

	update: function (time, preserve) {

		var tweenIds = Object.keys(this._tweens);

		if (tweenIds.length === 0) {
			return false;
		}

		time = time !== undefined ? time : TWEEN.now();

		// Tweens are updated in "batches". If you add a new tween during an update, then the
		// new tween will be updated in the next batch.
		// If you remove a tween during an update, it may or may not be updated. However,
		// if the removed tween was added during the current batch, then it will not be updated.
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};

			for (var i = 0; i < tweenIds.length; i++) {

				var tween = this._tweens[tweenIds[i]];

				if (tween && tween.update(time) === false) {
					tween._isPlaying = false;

					if (!preserve) {
						delete this._tweens[tweenIds[i]];
					}
				}
			}

			tweenIds = Object.keys(this._tweensAddedDuringUpdate);
		}

		return true;

	}
};

var TWEEN = new _Group();

TWEEN.Group = _Group;
TWEEN._nextId = 0;
TWEEN.nextId = function () {
	return TWEEN._nextId++;
};


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (self) === 'undefined' && typeof (process) !== 'undefined' && process.hrtime) {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use self.performance.now if it is available.
else if (typeof (self) !== 'undefined' &&
         self.performance !== undefined &&
		 self.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = self.performance.now.bind(self.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object, group) {
	this._object = object;
	this._valuesStart = {};
	this._valuesEnd = {};
	this._valuesStartRepeat = {};
	this._duration = 1000;
	this._repeat = 0;
	this._repeatDelayTime = undefined;
	this._yoyo = false;
	this._isPlaying = false;
	this._reversed = false;
	this._delayTime = 0;
	this._startTime = null;
	this._easingFunction = TWEEN.Easing.Linear.None;
	this._interpolationFunction = TWEEN.Interpolation.Linear;
	this._chainedTweens = [];
	this._onStartCallback = null;
	this._onStartCallbackFired = false;
	this._onUpdateCallback = null;
	this._onRepeatCallback = null;
	this._onCompleteCallback = null;
	this._onStopCallback = null;
	this._group = group || TWEEN;
	this._id = TWEEN.nextId();

};

TWEEN.Tween.prototype = {
	getId: function () {
		return this._id;
	},

	isPlaying: function () {
		return this._isPlaying;
	},

	to: function (properties, duration) {

		this._valuesEnd = Object.create(properties);

		if (duration !== undefined) {
			this._duration = duration;
		}

		return this;

	},

	duration: function duration(d) {
		this._duration = d;
		return this;
	},

	start: function (time) {

		this._group.add(this);

		this._isPlaying = true;

		this._onStartCallbackFired = false;

		this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
		this._startTime += this._delayTime;

		for (var property in this._valuesEnd) {

			// Check if an Array was provided as property value
			if (this._valuesEnd[property] instanceof Array) {

				if (this._valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (this._object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			this._valuesStart[property] = this._object[property];

			if ((this._valuesStart[property] instanceof Array) === false) {
				this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

		}

		return this;

	},

	stop: function () {

		if (!this._isPlaying) {
			return this;
		}

		this._group.remove(this);
		this._isPlaying = false;

		if (this._onStopCallback !== null) {
			this._onStopCallback(this._object);
		}

		this.stopChainedTweens();
		return this;

	},

	end: function () {

		this.update(Infinity);
		return this;

	},

	stopChainedTweens: function () {

		for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
			this._chainedTweens[i].stop();
		}

	},

	group: function (group) {
		this._group = group;
		return this;
	},

	delay: function (amount) {

		this._delayTime = amount;
		return this;

	},

	repeat: function (times) {

		this._repeat = times;
		return this;

	},

	repeatDelay: function (amount) {

		this._repeatDelayTime = amount;
		return this;

	},

	yoyo: function (yoyo) {

		this._yoyo = yoyo;
		return this;

	},

	easing: function (easingFunction) {

		this._easingFunction = easingFunction;
		return this;

	},

	interpolation: function (interpolationFunction) {

		this._interpolationFunction = interpolationFunction;
		return this;

	},

	chain: function () {

		this._chainedTweens = arguments;
		return this;

	},

	onStart: function (callback) {

		this._onStartCallback = callback;
		return this;

	},

	onUpdate: function (callback) {

		this._onUpdateCallback = callback;
		return this;

	},

	onRepeat: function onRepeat(callback) {

		this._onRepeatCallback = callback;
		return this;

	},

	onComplete: function (callback) {

		this._onCompleteCallback = callback;
		return this;

	},

	onStop: function (callback) {

		this._onStopCallback = callback;
		return this;

	},

	update: function (time) {

		var property;
		var elapsed;
		var value;

		if (time < this._startTime) {
			return true;
		}

		if (this._onStartCallbackFired === false) {

			if (this._onStartCallback !== null) {
				this._onStartCallback(this._object);
			}

			this._onStartCallbackFired = true;
		}

		elapsed = (time - this._startTime) / this._duration;
		elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

		value = this._easingFunction(elapsed);

		for (property in this._valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (this._valuesStart[property] === undefined) {
				continue;
			}

			var start = this._valuesStart[property] || 0;
			var end = this._valuesEnd[property];

			if (end instanceof Array) {

				this._object[property] = this._interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					this._object[property] = start + (end - start) * value;
				}

			}

		}

		if (this._onUpdateCallback !== null) {
			this._onUpdateCallback(this._object, elapsed);
		}

		if (elapsed === 1) {

			if (this._repeat > 0) {

				if (isFinite(this._repeat)) {
					this._repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in this._valuesStartRepeat) {

					if (typeof (this._valuesEnd[property]) === 'string') {
						this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
					}

					if (this._yoyo) {
						var tmp = this._valuesStartRepeat[property];

						this._valuesStartRepeat[property] = this._valuesEnd[property];
						this._valuesEnd[property] = tmp;
					}

					this._valuesStart[property] = this._valuesStartRepeat[property];

				}

				if (this._yoyo) {
					this._reversed = !this._reversed;
				}

				if (this._repeatDelayTime !== undefined) {
					this._startTime = time + this._repeatDelayTime;
				} else {
					this._startTime = time + this._delayTime;
				}

				if (this._onRepeatCallback !== null) {
					this._onRepeatCallback(this._object);
				}

				return true;

			} else {

				if (this._onCompleteCallback !== null) {

					this._onCompleteCallback(this._object);
				}

				for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					this._chainedTweens[i].start(this._startTime + this._duration);
				}

				return false;

			}

		}

		return true;

	}
};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (true) {

		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return TWEEN;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	} else {}

})(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../_node-libs-browser@2.2.1@node-libs-browser/mock/process.js */ "./node_modules/_node-libs-browser@2.2.1@node-libs-browser/mock/process.js")))

/***/ }),

/***/ "./node_modules/_core-js@2.6.9@core-js/modules/_object-to-array.js":
/*!*************************************************************************!*\
  !*** ./node_modules/_core-js@2.6.9@core-js/modules/_object-to-array.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/_core-js@2.6.9@core-js/modules/_descriptors.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/_core-js@2.6.9@core-js/modules/_object-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/_core-js@2.6.9@core-js/modules/_to-iobject.js");
var isEnum = __webpack_require__(/*! ./_object-pie */ "./node_modules/_core-js@2.6.9@core-js/modules/_object-pie.js").f;
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

/***/ "./node_modules/_core-js@2.6.9@core-js/modules/_strict-method.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_core-js@2.6.9@core-js/modules/_strict-method.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ "./node_modules/_core-js@2.6.9@core-js/modules/_fails.js");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "./node_modules/_core-js@2.6.9@core-js/modules/es6.array.sort.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_core-js@2.6.9@core-js/modules/es6.array.sort.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/_core-js@2.6.9@core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/_core-js@2.6.9@core-js/modules/_a-function.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/_core-js@2.6.9@core-js/modules/_to-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/_core-js@2.6.9@core-js/modules/_fails.js");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ "./node_modules/_core-js@2.6.9@core-js/modules/_strict-method.js")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "./node_modules/_core-js@2.6.9@core-js/modules/es7.object.values.js":
/*!**************************************************************************!*\
  !*** ./node_modules/_core-js@2.6.9@core-js/modules/es7.object.values.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/_core-js@2.6.9@core-js/modules/_export.js");
var $values = __webpack_require__(/*! ./_object-to-array */ "./node_modules/_core-js@2.6.9@core-js/modules/_object-to-array.js")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/main.scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-3-1!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-3-2!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-3-3!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/main.scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../_css-loader@1.0.1@css-loader/lib/css-base.js */ "./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".svg-funnel-js {\n  display: inline-block;\n  position: relative; }\n  .svg-funnel-js svg {\n    display: block; }\n  .svg-funnel-js .svg-funnel-js__labels {\n    position: absolute;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0; }\n  .svg-funnel-js.svg-funnel-js--vertical .svg-funnel-js__labels {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/theme.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-3-1!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-3-2!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-3-3!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/theme.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../_css-loader@1.0.1@css-loader/lib/css-base.js */ "./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);", ""]);

// module
exports.push([module.i, "body {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.svg-funnel-js {\n  font-family: \"Open Sans\", sans-serif; }\n  .svg-funnel-js .svg-funnel-js__container {\n    width: 100%;\n    height: 100%; }\n  .svg-funnel-js .svg-funnel-js__labels {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n    .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0;\n      position: relative; }\n      .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__value {\n        font-size: 24px;\n        color: black;\n        line-height: 18px;\n        margin-bottom: 6px; }\n      .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__title {\n        font-size: 12px;\n        font-weight: bold;\n        color: grey; }\n      .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__percentage {\n        font-size: 16px;\n        font-weight: bold;\n        color: #9896dc; }\n      .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__segment-percentages {\n        position: absolute;\n        top: 50%;\n        -webkit-transform: translateY(-50%);\n                transform: translateY(-50%);\n        width: 100%;\n        left: 0;\n        padding: 8px 24px;\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        background-color: rgba(8, 7, 48, 0.8);\n        margin-top: 24px;\n        opacity: 0;\n        -webkit-transition: opacity 0.1s ease;\n        transition: opacity 0.1s ease;\n        cursor: default; }\n        .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__segment-percentages ul {\n          margin: 0;\n          padding: 0;\n          list-style-type: none; }\n          .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__segment-percentages ul li {\n            font-size: 13px;\n            line-height: 16px;\n            color: black;\n            margin: 18px 0; }\n            .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__segment-percentages ul li .percentage__list-label {\n              font-weight: bold;\n              color: #05df9d; }\n      .svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label:hover .label__segment-percentages {\n        opacity: 1; }\n  .svg-funnel-js:not(.svg-funnel-js--vertical) {\n    padding-top: 64px;\n    padding-bottom: 16px; }\n    .svg-funnel-js:not(.svg-funnel-js--vertical) .svg-funnel-js__label {\n      padding-left: 24px; }\n      .svg-funnel-js:not(.svg-funnel-js--vertical) .svg-funnel-js__label:not(:first-child) {\n        border-left: 1px solid #9896dc; }\n  .svg-funnel-js.svg-funnel-js--vertical {\n    padding-left: 120px;\n    padding-right: 16px; }\n    .svg-funnel-js.svg-funnel-js--vertical .svg-funnel-js__label {\n      padding-top: 24px; }\n      .svg-funnel-js.svg-funnel-js--vertical .svg-funnel-js__label:not(:first-child) {\n        border-top: 1px solid #9896dc; }\n      .svg-funnel-js.svg-funnel-js--vertical .svg-funnel-js__label .label__segment-percentages {\n        margin-top: 0;\n        margin-left: 106px;\n        width: calc(100% - 106px); }\n        .svg-funnel-js.svg-funnel-js--vertical .svg-funnel-js__label .label__segment-percentages .segment-percentage__list {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-pack: distribute;\n              justify-content: space-around; }\n  .svg-funnel-js .svg-funnel-js__subLabels {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 24px;\n    position: absolute;\n    width: 100%;\n    left: 0; }\n    .svg-funnel-js .svg-funnel-js__subLabels .svg-funnel-js__subLabel {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      font-size: 12px;\n      color: black;\n      line-height: 16px; }\n      .svg-funnel-js .svg-funnel-js__subLabels .svg-funnel-js__subLabel:not(:first-child) {\n        margin-left: 16px; }\n      .svg-funnel-js .svg-funnel-js__subLabels .svg-funnel-js__subLabel .svg-funnel-js__subLabel--color {\n        width: 12px;\n        height: 12px;\n        border-radius: 50%;\n        margin: 2px 8px 2px 0; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/_echarts@4.2.1@echarts/theme/macarons.js":
/*!***************************************************************!*\
  !*** ./node_modules/_echarts@4.2.1@echarts/theme/macarons.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! echarts */ "./node_modules/_echarts@4.2.1@echarts/index.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }

    var colorPalette = [
        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ];


    var theme = {
        color: colorPalette,

        title: {
            textStyle: {
                fontWeight: 'normal',
                color: '#008acd'
            }
        },

        visualMap: {
            itemWidth: 15,
            color: ['#5ab1ef','#e0ffff']
        },

        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: colorPalette[0]
                }
            }
        },

        tooltip: {
            backgroundColor: 'rgba(50,50,50,0.5)',
            axisPointer : {
                type : 'line',
                lineStyle : {
                    color: '#008acd'
                },
                crossStyle: {
                    color: '#008acd'
                },
                shadowStyle : {
                    color: 'rgba(200,200,200,0.2)'
                }
            }
        },

        dataZoom: {
            dataBackgroundColor: '#efefff',
            fillerColor: 'rgba(182,162,222,0.2)',
            handleColor: '#008acd'
        },

        grid: {
            borderColor: '#eee'
        },

        categoryAxis: {
            axisLine: {
                lineStyle: {
                    color: '#008acd'
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['#eee']
                }
            }
        },

        valueAxis: {
            axisLine: {
                lineStyle: {
                    color: '#008acd'
                }
            },
            splitArea : {
                show : true,
                areaStyle : {
                    color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['#eee']
                }
            }
        },

        timeline : {
            lineStyle : {
                color : '#008acd'
            },
            controlStyle : {
                normal : { color : '#008acd'},
                emphasis : { color : '#008acd'}
            },
            symbol : 'emptyCircle',
            symbolSize : 3
        },

        line: {
            smooth : true,
            symbol: 'emptyCircle',
            symbolSize: 3
        },

        candlestick: {
            itemStyle: {
                normal: {
                    color: '#d87a80',
                    color0: '#2ec7c9',
                    lineStyle: {
                        color: '#d87a80',
                        color0: '#2ec7c9'
                    }
                }
            }
        },

        scatter: {
            symbol: 'circle',
            symbolSize: 4
        },

        map: {
            label: {
                normal: {
                    textStyle: {
                        color: '#d87a80'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#eee',
                    areaColor: '#ddd'
                },
                emphasis: {
                    areaColor: '#fe994e'
                }
            }
        },

        graph: {
            color: colorPalette
        },

        gauge : {
            axisLine: {
                lineStyle: {
                    color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
                    width: 10
                }
            },
            axisTick: {
                splitNumber: 10,
                length :15,
                lineStyle: {
                    color: 'auto'
                }
            },
            splitLine: {
                length :22,
                lineStyle: {
                    color: 'auto'
                }
            },
            pointer : {
                width : 5
            }
        }
    };

    echarts.registerTheme('macarons', theme);
}));

/***/ }),

/***/ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/main */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/main.js").default;


/***/ }),

/***/ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/graph.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/graph.js ***!
  \*****************************************************************************/
/*! exports provided: generateLegendBackground, getDefaultColors, areEqual, createSVGElement, setAttrs, removeAttrs, defaultColors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateLegendBackground", function() { return generateLegendBackground; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultColors", function() { return getDefaultColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areEqual", function() { return areEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSVGElement", function() { return createSVGElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttrs", function() { return setAttrs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttrs", function() { return removeAttrs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultColors", function() { return defaultColors; });
const setAttrs = (element, attributes) => {
    if (typeof attributes === 'object') {
        Object.keys(attributes).forEach((key) => {
            element.setAttribute(key, attributes[key]);
        });
    }
};

const removeAttrs = (element, ...attributes) => {
    attributes.forEach((attribute) => {
        element.removeAttribute(attribute);
    });
};

const createSVGElement = (element, container, attributes) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', element);

    if (typeof attributes === 'object') {
        setAttrs(el, attributes);
    }

    if (typeof container !== 'undefined') {
        container.appendChild(el);
    }

    return el;
};

const generateLegendBackground = (color, direction = 'horizontal') => {
    if (typeof color === 'string') {
        return `background-color: ${color}`;
    }

    if (color.length === 1) {
        return `background-color: ${color[0]}`;
    }

    return `background-image: linear-gradient(${direction === 'horizontal'
        ? 'to right, '
        : ''}${color.join(', ')})`;
};

const defaultColors = ['#FF4589', '#FF5050',
    '#05DF9D', '#4FF2FD',
    '#2D9CDB', '#A0BBFF',
    '#FFD76F', '#F2C94C',
    '#FF9A9A', '#FFB178'];

const getDefaultColors = (number) => {
    const colors = [...defaultColors];
    const colorSet = [];

    for (let i = 0; i < number; i++) {
        // get a random color
        const index = Math.abs(Math.round(Math.random() * (colors.length - 1)));
        // push it to the list
        colorSet.push(colors[index]);
        // and remove it, so that it is not chosen again
        colors.splice(index, 1);
    }
    return colorSet;
};

/*
    Used in comparing existing values to value provided on update
    It is limited to comparing arrays on purpose
    Name is slightly unusual, in order not to be confused with Lodash method
 */
const areEqual = (value, newValue) => {
    // If values are not of the same type
    const type = Object.prototype.toString.call(value);
    if (type !== Object.prototype.toString.call(newValue)) return false;
    if (type !== '[object Array]') return false;

    if (value.length !== newValue.length) return false;

    for (let i = 0; i < value.length; i++) {
        // if the it's a two dimensional array
        const currentType = Object.prototype.toString.call(value[i]);
        if (currentType !== Object.prototype.toString.call(newValue[i])) return false;
        if (currentType === '[object Array]') {
            // if row lengths are not equal then arrays are not equal
            if (value[i].length !== newValue[i].length) return false;
            // compare each element in the row
            for (let j = 0; j < value[i].length; j++) {
                if (value[i][j] !== newValue[i][j]) {
                    return false;
                }
            }
        } else if (value[i] !== newValue[i]) {
            // if it's a one dimensional array element
            return false;
        }
    }

    return true;
};




/***/ }),

/***/ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/main.js":
/*!****************************************************************************!*\
  !*** ./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/main.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/number.js");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/path.js");
/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graph */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/graph.js");
/* eslint-disable no-trailing-spaces */




class FunnelGraph {
    constructor(options) {
        this.containerSelector = options.container;
        this.gradientDirection = (options.gradientDirection && options.gradientDirection === 'vertical')
            ? 'vertical'
            : 'horizontal';
        this.direction = (options.direction && options.direction === 'vertical') ? 'vertical' : 'horizontal';
        this.labels = FunnelGraph.getLabels(options);
        this.subLabels = FunnelGraph.getSubLabels(options);
        this.values = FunnelGraph.getValues(options);
        this.percentages = this.createPercentages();
        this.colors = options.data.colors || Object(_graph__WEBPACK_IMPORTED_MODULE_2__["getDefaultColors"])(this.is2d() ? this.getSubDataSize() : 2);
        this.displayPercent = options.displayPercent || false;
        this.data = options.data;
        this.height = options.height;
        this.width = options.width;
        this.subLabelValue = options.subLabelValue || 'percent';
    }

    /**
    An example of a two-dimensional funnel graph
    #0..................
                       ...#1................
                                           ......
    #0********************#1**                    #2.........................#3 (A)
                              *******************
                                                  #2*************************#3 (B)
                                                  #2+++++++++++++++++++++++++#3 (C)
                              +++++++++++++++++++
    #0++++++++++++++++++++#1++                    #2-------------------------#3 (D)
                                           ------
                       ---#1----------------
    #0-----------------

     Main axis is the primary axis of the graph.
     In a horizontal graph it's the X axis, and Y is the cross axis.
     However we use the names "main" and "cross" axis,
     because in a vertical graph the primary axis is the Y axis
     and the cross axis is the X axis.

     First step of drawing the funnel graph is getting the coordinates of points,
     that are used when drawing the paths.

     There are 4 paths in the example above: A, B, C and D.
     Such funnel has 3 labels and 3 subLabels.
     This means that the main axis has 4 points (number of labels + 1)
     One the ASCII illustrated graph above, those points are illustrated with a # symbol.

    */
    getMainAxisPoints() {
        const size = this.getDataSize();
        const points = [];
        const fullDimension = this.isVertical() ? this.getHeight() : this.getWidth();
        for (let i = 0; i <= size; i++) {
            points.push(Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])(fullDimension * i / size));
        }
        return points;
    }

    getCrossAxisPoints() {
        const points = [];
        const fullDimension = this.getFullDimension();
        // get half of the graph container height or width, since funnel shape is symmetric
        // we use this when calculating the "A" shape
        const dimension = fullDimension / 2;
        if (this.is2d()) {
            const totalValues = this.getValues2d();
            const max = Math.max(...totalValues);

            // duplicate last value
            totalValues.push([...totalValues].pop());
            // get points for path "A"
            points.push(totalValues.map(value => Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])((max - value) / max * dimension)));
            // percentages with duplicated last value
            const percentagesFull = this.getPercentages2d();
            const pointsOfFirstPath = points[0];

            for (let i = 1; i < this.getSubDataSize(); i++) {
                const p = points[i - 1];
                const newPoints = [];

                for (let j = 0; j < this.getDataSize(); j++) {
                    newPoints.push(Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])(
                        // eslint-disable-next-line comma-dangle
                        p[j] + (fullDimension - pointsOfFirstPath[j] * 2) * (percentagesFull[j][i - 1] / 100)
                    ));
                }

                // duplicate the last value as points #2 and #3 have the same value on the cross axis
                newPoints.push([...newPoints].pop());
                points.push(newPoints);
            }

            // add points for path "D", that is simply the "inverted" path "A"
            points.push(pointsOfFirstPath.map(point => fullDimension - point));
        } else {
            // As you can see on the visualization above points #2 and #3 have the same cross axis coordinate
            // so we duplicate the last value
            const max = Math.max(...this.values);
            const values = [...this.values].concat([...this.values].pop());
            // if the graph is simple (not two-dimensional) then we have only paths "A" and "D"
            // which are symmetric. So we get the points for "A" and then get points for "D" by subtracting "A"
            // points from graph cross dimension length
            points.push(values.map(value => Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])((max - value) / max * dimension)));
            points.push(points[0].map(point => fullDimension - point));
        }

        return points;
    }

    getGraphType() {
        return this.values && this.values[0] instanceof Array ? '2d' : 'normal';
    }

    is2d() {
        return this.getGraphType() === '2d';
    }

    isVertical() {
        return this.direction === 'vertical';
    }

    getDataSize() {
        return this.values.length;
    }

    getSubDataSize() {
        return this.values[0].length;
    }

    getFullDimension() {
        return this.isVertical() ? this.getWidth() : this.getHeight();
    }

    static getSubLabels(options) {
        if (!options.data) {
            throw new Error('Data is missing');
        }

        const { data } = options;

        if (typeof data.subLabels === 'undefined') return [];

        return data.subLabels;
    }

    static getLabels(options) {
        if (!options.data) {
            throw new Error('Data is missing');
        }

        const { data } = options;

        if (typeof data.labels === 'undefined') return [];

        return data.labels;
    }

    addLabels() {
        const holder = document.createElement('div');
        holder.setAttribute('class', 'svg-funnel-js__labels');

        this.percentages.forEach((percentage, index) => {
            const labelElement = document.createElement('div');
            labelElement.setAttribute('class', `svg-funnel-js__label label-${index + 1}`);

            const title = document.createElement('div');
            title.setAttribute('class', 'label__title');
            title.textContent = this.labels[index] || '';

            const value = document.createElement('div');
            value.setAttribute('class', 'label__value');

            const valueNumber = this.is2d() ? this.getValues2d()[index] : this.values[index];
            value.textContent = Object(_number__WEBPACK_IMPORTED_MODULE_0__["formatNumber"])(valueNumber);

            const percentageValue = document.createElement('div');
            percentageValue.setAttribute('class', 'label__percentage');

            if (percentage !== 100) {
                percentageValue.textContent = `${percentage.toString()}%`;
            }

            labelElement.appendChild(value);
            labelElement.appendChild(title);
            if (this.displayPercent) {
                labelElement.appendChild(percentageValue);
            }

            if (this.is2d()) {
                const segmentPercentages = document.createElement('div');
                segmentPercentages.setAttribute('class', 'label__segment-percentages');
                let percentageList = '<ul class="segment-percentage__list">';

                const twoDimPercentages = this.getPercentages2d();

                this.subLabels.forEach((subLabel, j) => {
                    const subLabelDisplayValue = this.subLabelValue === 'percent'
                        ? `${twoDimPercentages[index][j]}%`
                        : Object(_number__WEBPACK_IMPORTED_MODULE_0__["formatNumber"])(this.values[index][j]);
                    percentageList += `<li>${this.subLabels[j]}:
    <span class="percentage__list-label">${subLabelDisplayValue}</span>
 </li>`;
                });
                percentageList += '</ul>';
                segmentPercentages.innerHTML = percentageList;
                labelElement.appendChild(segmentPercentages);
            }

            holder.appendChild(labelElement);
        });

        this.container.appendChild(holder);
    }

    addSubLabels() {
        if (this.subLabels) {
            const subLabelsHolder = document.createElement('div');
            subLabelsHolder.setAttribute('class', 'svg-funnel-js__subLabels');

            let subLabelsHTML = '';

            this.subLabels.forEach((subLabel, index) => {
                subLabelsHTML += `<div class="svg-funnel-js__subLabel svg-funnel-js__subLabel-${index + 1}">
    <div class="svg-funnel-js__subLabel--color" 
        style="${Object(_graph__WEBPACK_IMPORTED_MODULE_2__["generateLegendBackground"])(this.colors[index], this.gradientDirection)}"></div>
    <div class="svg-funnel-js__subLabel--title">${subLabel}</div>
</div>`;
            });

            subLabelsHolder.innerHTML = subLabelsHTML;
            this.container.appendChild(subLabelsHolder);
        }
    }

    createContainer() {
        if (!this.containerSelector) {
            throw new Error('Container is missing');
        }

        this.container = document.querySelector(this.containerSelector);
        this.container.classList.add('svg-funnel-js');

        this.graphContainer = document.createElement('div');
        this.graphContainer.classList.add('svg-funnel-js__container');
        this.container.appendChild(this.graphContainer);

        if (this.direction === 'vertical') {
            this.container.classList.add('svg-funnel-js--vertical');
        }
    }

    setValues(v) {
        this.values = v;
        return this;
    }

    setDirection(d) {
        this.direction = d;
        return this;
    }

    setHeight(h) {
        this.height = h;
        return this;
    }

    setWidth(w) {
        this.width = w;
        return this;
    }

    static getValues(options) {
        if (!options.data) {
            return [];
        }

        const { data } = options;

        if (typeof data === 'object') {
            return data.values;
        }

        return [];
    }

    getValues2d() {
        const values = [];

        this.values.forEach((valueSet) => {
            values.push(valueSet.reduce((sum, value) => sum + value, 0));
        });

        return values;
    }

    getPercentages2d() {
        const percentages = [];

        this.values.forEach((valueSet) => {
            const total = valueSet.reduce((sum, value) => sum + value, 0);
            percentages.push(valueSet.map(value => (total === 0 ? 0 : Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])(value * 100 / total))));
        });

        return percentages;
    }

    createPercentages() {
        let values = [];

        if (this.is2d()) {
            values = this.getValues2d();
        } else {
            values = [...this.values];
        }

        const max = Math.max(...values);
        return values.map(value => Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])(value * 100 / max));
    }

    applyGradient(svg, path, colors, index) {
        const defs = (svg.querySelector('defs') === null)
            ? Object(_graph__WEBPACK_IMPORTED_MODULE_2__["createSVGElement"])('defs', svg)
            : svg.querySelector('defs');
        const gradientName = `funnelGradient-${index}`;
        const gradient = Object(_graph__WEBPACK_IMPORTED_MODULE_2__["createSVGElement"])('linearGradient', defs, {
            id: gradientName
        });

        if (this.gradientDirection === 'vertical') {
            Object(_graph__WEBPACK_IMPORTED_MODULE_2__["setAttrs"])(gradient, {
                x1: '0',
                x2: '0',
                y1: '0',
                y2: '1'
            });
        }

        const numberOfColors = colors.length;

        for (let i = 0; i < numberOfColors; i++) {
            Object(_graph__WEBPACK_IMPORTED_MODULE_2__["createSVGElement"])('stop', gradient, {
                'stop-color': colors[i],
                offset: `${Math.round(100 * i / (numberOfColors - 1))}%`
            });
        }

        Object(_graph__WEBPACK_IMPORTED_MODULE_2__["setAttrs"])(path, {
            fill: `url("#${gradientName}")`,
            stroke: `url("#${gradientName}")`
        });
    }

    makeSVG() {
        const svg = Object(_graph__WEBPACK_IMPORTED_MODULE_2__["createSVGElement"])('svg', this.graphContainer, {
            width: this.getWidth(),
            height: this.getHeight()
        });

        const valuesNum = this.getCrossAxisPoints().length - 1;
        for (let i = 0; i < valuesNum; i++) {
            const path = Object(_graph__WEBPACK_IMPORTED_MODULE_2__["createSVGElement"])('path', svg);

            const color = (this.is2d()) ? this.colors[i] : this.colors;
            const fillMode = (typeof color === 'string' || color.length === 1) ? 'solid' : 'gradient';

            if (fillMode === 'solid') {
                Object(_graph__WEBPACK_IMPORTED_MODULE_2__["setAttrs"])(path, {
                    fill: color,
                    stroke: color
                });
            } else if (fillMode === 'gradient') {
                this.applyGradient(svg, path, color, i + 1);
            }

            svg.appendChild(path);
        }

        this.graphContainer.appendChild(svg);
    }

    getSVG() {
        const svg = this.container.querySelector('svg');

        if (!svg) {
            throw new Error('No SVG found inside of the container');
        }

        return svg;
    }

    getWidth() {
        return this.width || this.graphContainer.clientWidth;
    }

    getHeight() {
        return this.height || this.graphContainer.clientHeight;
    }

    getPathDefinitions() {
        const valuesNum = this.getCrossAxisPoints().length - 1;
        const paths = [];
        for (let i = 0; i < valuesNum; i++) {
            if (this.isVertical()) {
                const X = this.getCrossAxisPoints()[i];
                const XNext = this.getCrossAxisPoints()[i + 1];
                const Y = this.getMainAxisPoints();

                const d = Object(_path__WEBPACK_IMPORTED_MODULE_1__["createVerticalPath"])(i, X, XNext, Y);
                paths.push(d);
            } else {
                const X = this.getMainAxisPoints();
                const Y = this.getCrossAxisPoints()[i];
                const YNext = this.getCrossAxisPoints()[i + 1];

                const d = Object(_path__WEBPACK_IMPORTED_MODULE_1__["createPath"])(i, X, Y, YNext);
                paths.push(d);
            }
        }

        return paths;
    }

    getPathMedian(i) {
        if (this.isVertical()) {
            const cross = this.getCrossAxisPoints()[i];
            const next = this.getCrossAxisPoints()[i + 1];
            const Y = this.getMainAxisPoints();
            const X = [];
            const XNext = [];

            cross.forEach((point, index) => {
                const m = (point + next[index]) / 2;
                X.push(m - 1);
                XNext.push(m + 1);
            });

            return Object(_path__WEBPACK_IMPORTED_MODULE_1__["createVerticalPath"])(i, X, XNext, Y);
        }

        const X = this.getMainAxisPoints();
        const cross = this.getCrossAxisPoints()[i];
        const next = this.getCrossAxisPoints()[i + 1];
        const Y = [];
        const YNext = [];

        cross.forEach((point, index) => {
            const m = (point + next[index]) / 2;
            Y.push(m - 1);
            YNext.push(m + 1);
        });

        return Object(_path__WEBPACK_IMPORTED_MODULE_1__["createPath"])(i, X, Y, YNext);
    }

    drawPaths() {
        const svg = this.getSVG();
        const paths = svg.querySelectorAll('path');
        const definitions = this.getPathDefinitions();

        definitions.forEach((definition, index) => {
            paths[index].setAttribute('d', definition);
        });
    }

    draw() {
        this.createContainer();
        this.makeSVG();

        this.addLabels();

        if (this.is2d()) {
            this.addSubLabels();
        }

        this.drawPaths();
    }

    /*
        Methods
     */

    makeVertical() {
        if (this.direction === 'vertical') return true;

        this.direction = 'vertical';
        this.container.classList.add('svg-funnel-js--vertical');

        const svg = this.getSVG();
        const height = this.getHeight();
        const width = this.getWidth();
        Object(_graph__WEBPACK_IMPORTED_MODULE_2__["setAttrs"])(svg, { height, width });

        this.drawPaths();

        return true;
    }

    makeHorizontal() {
        if (this.direction === 'horizontal') return true;

        this.direction = 'horizontal';
        this.container.classList.remove('svg-funnel-js--vertical');

        const svg = this.getSVG();
        const height = this.getHeight();
        const width = this.getWidth();
        Object(_graph__WEBPACK_IMPORTED_MODULE_2__["setAttrs"])(svg, { height, width });

        this.drawPaths();

        return true;
    }

    toggleDirection() {
        if (this.direction === 'horizontal') {
            this.makeVertical();
        } else {
            this.makeHorizontal();
        }
    }

    gradientMakeVertical() {
        if (this.gradientDirection === 'vertical') return true;

        this.gradientDirection = 'vertical';
        const gradients = this.graphContainer.querySelectorAll('linearGradient');

        for (let i = 0; i < gradients.length; i++) {
            Object(_graph__WEBPACK_IMPORTED_MODULE_2__["setAttrs"])(gradients[i], {
                x1: '0',
                x2: '0',
                y1: '0',
                y2: '1'
            });
        }

        return true;
    }

    gradientMakeHorizontal() {
        if (this.gradientDirection === 'horizontal') return true;

        this.gradientDirection = 'horizontal';
        const gradients = this.graphContainer.querySelectorAll('linearGradient');

        for (let i = 0; i < gradients.length; i++) {
            Object(_graph__WEBPACK_IMPORTED_MODULE_2__["removeAttrs"])(gradients[i], 'x1', 'x2', 'y1', 'y2');
        }

        return true;
    }

    gradientToggleDirection() {
        if (this.gradientDirection === 'horizontal') {
            this.gradientMakeVertical();
        } else {
            this.gradientMakeHorizontal();
        }
    }

    updateWidth(w) {
        this.width = w;
        const svg = this.getSVG();
        const width = this.getWidth();
        Object(_graph__WEBPACK_IMPORTED_MODULE_2__["setAttrs"])(svg, { width });

        this.drawPaths();

        return true;
    }

    updateHeight(h) {
        this.height = h;
        const svg = this.getSVG();
        const height = this.getHeight();
        Object(_graph__WEBPACK_IMPORTED_MODULE_2__["setAttrs"])(svg, { height });

        this.drawPaths();

        return true;
    }

    // @TODO: refactor data update
    updateData(d) {
        if (typeof d.labels !== 'undefined') {
            this.container.querySelector('.svg-funnel-js__labels').remove();
            this.labels = FunnelGraph.getLabels({ data: d });
            this.addLabels();
        }
        if (typeof d.colors !== 'undefined') {
            this.colors = d.colors || Object(_graph__WEBPACK_IMPORTED_MODULE_2__["getDefaultColors"])(this.is2d() ? this.getSubDataSize() : 2);
        }
        if (typeof d.values !== 'undefined') {
            if (Object.prototype.toString.call(d.values[0]) !== Object.prototype.toString.call(this.values[0])) {
                this.container.querySelector('svg').remove();
                this.values = FunnelGraph.getValues({ data: d });
                this.makeSVG();
                this.drawPaths();
            } else {
                this.values = FunnelGraph.getValues({ data: d });
                this.drawPaths();
            }
        }
        if (typeof d.subLabels !== 'undefined') {
            this.container.querySelector('.svg-funnel-js__subLabels').remove();
            this.subLabels = FunnelGraph.getSubLabels({ data: d });
            this.addSubLabels();
        }
    }

    update(o) {
        if (typeof o.displayPercent !== 'undefined') {
            if (this.displayPercent !== o.displayPercent) {
                if (this.displayPercent === true) {
                    this.container.querySelectorAll('.label__percentage').forEach((label) => {
                        label.remove();
                    });
                } else {
                    this.container.querySelectorAll('.svg-funnel-js__label').forEach((label, index) => {
                        const percentage = this.percentages[index];
                        const percentageValue = document.createElement('div');
                        percentageValue.setAttribute('class', 'label__percentage');

                        if (percentage !== 100) {
                            percentageValue.textContent = `${percentage.toString()}%`;
                            label.appendChild(percentageValue);
                        }
                    });
                }
            }
        }
        if (typeof o.height !== 'undefined') {
            this.updateHeight(o.height);
        }
        if (typeof o.width !== 'undefined') {
            this.updateWidth(o.width);
        }
        if (typeof o.gradientDirection !== 'undefined') {
            if (o.gradientDirection === 'vertical') {
                this.gradientMakeVertical();
            } else if (o.gradientDirection === 'horizontal') {
                this.gradientMakeHorizontal();
            }
        }
        if (typeof o.direction !== 'undefined') {
            if (o.direction === 'vertical') {
                this.makeVertical();
            } else if (o.direction === 'horizontal') {
                this.makeHorizontal();
            }
        }
        if (typeof o.data !== 'undefined') {
            this.updateData(o.data);
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (FunnelGraph);


/***/ }),

/***/ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/number.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/number.js ***!
  \******************************************************************************/
/*! exports provided: roundPoint, formatNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundPoint", function() { return roundPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNumber", function() { return formatNumber; });
const roundPoint = number => Math.round(number * 10) / 10;
const formatNumber = number => Number(number).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');




/***/ }),

/***/ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/path.js":
/*!****************************************************************************!*\
  !*** ./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/path.js ***!
  \****************************************************************************/
/*! exports provided: createCurves, createVerticalCurves, createPath, createVerticalPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCurves", function() { return createCurves; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVerticalCurves", function() { return createVerticalCurves; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return createPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVerticalPath", function() { return createVerticalPath; });
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/number.js");


const createCurves = (x1, y1, x2, y2) => ` C${Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])((x2 + x1) / 2)},${y1} `
    + `${Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])((x2 + x1) / 2)},${y2} ${x2},${y2}`;

const createVerticalCurves = (x1, y1, x2, y2) => ` C${x1},${Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])((y2 + y1) / 2)} `
    + `${x2},${Object(_number__WEBPACK_IMPORTED_MODULE_0__["roundPoint"])((y2 + y1) / 2)} ${x2},${y2}`;

/*
    A funnel segment is draw in a clockwise direction.
    Path 1-2 is drawn,
    then connected with a straight vertical line 2-3,
    then a line 3-4 is draw (using YNext points going in backwards direction)
    then path is closed (connected with the starting point 1).

    1---------->2
    ^           |
    |           v
    4<----------3

    On the graph on line 20 it works like this:
    A#0, A#1, A#2, A#3, B#3, B#2, B#1, B#0, close the path.

    Points for path "B" are passed as the YNext param.
 */

const createPath = (index, X, Y, YNext) => {
    let str = `M${X[0]},${Y[0]}`;

    for (let i = 0; i < X.length - 1; i++) {
        str += createCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
    }

    str += ` L${[...X].pop()},${[...YNext].pop()}`;

    for (let i = X.length - 1; i > 0; i--) {
        str += createCurves(X[i], YNext[i], X[i - 1], YNext[i - 1]);
    }

    str += ' Z';

    return str;
};

/*
    In a vertical path we go counter-clockwise

    1<----------4
    |           ^
    v           |
    2---------->3
 */

const createVerticalPath = (index, X, XNext, Y) => {
    let str = `M${X[0]},${Y[0]}`;

    for (let i = 0; i < X.length - 1; i++) {
        str += createVerticalCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
    }

    str += ` L${[...XNext].pop()},${[...Y].pop()}`;

    for (let i = X.length - 1; i > 0; i--) {
        str += createVerticalCurves(XNext[i], Y[i], XNext[i - 1], Y[i - 1]);
    }

    str += ' Z';

    return str;
};




/***/ }),

/***/ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/main.scss":
/*!********************************************************************************!*\
  !*** ./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/main.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../_css-loader@1.0.1@css-loader??ref--8-oneOf-3-1!../../../_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-3-2!../../../_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-3-3!./main.scss */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/main.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js */ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js").default
var update = add("6942db13", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../_css-loader@1.0.1@css-loader??ref--8-oneOf-3-1!../../../_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-3-2!../../../_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-3-3!./main.scss */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/main.scss", function() {
     var newContent = __webpack_require__(/*! !../../../_css-loader@1.0.1@css-loader??ref--8-oneOf-3-1!../../../_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-3-2!../../../_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-3-3!./main.scss */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/main.scss");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/theme.scss":
/*!*********************************************************************************!*\
  !*** ./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/theme.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../_css-loader@1.0.1@css-loader??ref--8-oneOf-3-1!../../../_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-3-2!../../../_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-3-3!./theme.scss */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/theme.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js */ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js").default
var update = add("4b01d77e", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../_css-loader@1.0.1@css-loader??ref--8-oneOf-3-1!../../../_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-3-2!../../../_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-3-3!./theme.scss */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/theme.scss", function() {
     var newContent = __webpack_require__(/*! !../../../_css-loader@1.0.1@css-loader??ref--8-oneOf-3-1!../../../_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-3-2!../../../_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-3-3!./theme.scss */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/theme.scss");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js ***!
  \*******************************************************************************/
/*! exports provided: _, V, H, L, Z, M, C, S, Q, T, A, EMPTY, FILL, NONE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return H; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return C; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return Q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY", function() { return EMPTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILL", function() { return FILL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NONE", function() { return NONE; });
const _ = undefined;
const V = 'V', H = 'H', L = 'L', Z = 'Z', M = 'M', C = 'C', S = 'S', Q = 'Q', T = 'T', A = 'A';
const EMPTY = ' ';
const FILL = 'fill';
const NONE = 'none';


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/getPath.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/getPath.js ***!
  \*****************************************************************************/
/*! exports provided: getPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPath", function() { return getPath; });
/* harmony import */ var _utilities_inspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/inspect */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/inspect.js");

const selectorRegex = /^([#|\.]|path)/i;
function getPath(selector) {
    if (Object(_utilities_inspect__WEBPACK_IMPORTED_MODULE_0__["isString"])(selector)) {
        if (!selectorRegex.test(selector)) {
            return selector;
        }
        selector = document.querySelector(selector);
    }
    return selector.getAttribute('d');
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/index.js ***!
  \***************************************************************************/
/*! exports provided: interpolate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interpolate */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/interpolate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return _interpolate__WEBPACK_IMPORTED_MODULE_0__["interpolate"]; });




/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/interpolate.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/interpolate.js ***!
  \*********************************************************************************/
/*! exports provided: interpolate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return interpolate; });
/* harmony import */ var _operators_interpolatePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operators/interpolatePath */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/interpolatePath.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/parse.js");


function interpolate(paths, options) {
    return Object(_operators_interpolatePath__WEBPACK_IMPORTED_MODULE_0__["interpolatePath"])(paths.map(_parse__WEBPACK_IMPORTED_MODULE_1__["parse"]), options || {});
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/arcToCurve.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/arcToCurve.js ***!
  \******************************************************************************************/
/*! exports provided: arcToCurve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arcToCurve", function() { return arcToCurve; });
/* harmony import */ var _utilities_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/math */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js");

const _120 = _utilities_math__WEBPACK_IMPORTED_MODULE_0__["PI"] * 120 / 180;
const PI2 = _utilities_math__WEBPACK_IMPORTED_MODULE_0__["PI"] * 2;
function arcToCurve(x1, y1, rx, ry, angle, large, sweep, dx, dy, f1, f2, cx, cy) {
    if (rx <= 0 || ry <= 0) {
        return [x1, y1, dx, dy, dx, dy];
    }
    const rad = _utilities_math__WEBPACK_IMPORTED_MODULE_0__["PI"] / 180 * (+angle || 0);
    const cosrad = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(rad);
    const sinrad = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(rad);
    const recursive = !!f1;
    if (!recursive) {
        const x1old = x1;
        const dxold = dx;
        x1 = x1old * cosrad - y1 * -sinrad;
        y1 = x1old * -sinrad + y1 * cosrad;
        dx = dxold * cosrad - dy * -sinrad;
        dy = dxold * -sinrad + dy * cosrad;
        const x = (x1 - dx) / 2;
        const y = (y1 - dy) / 2;
        let h = x * x / (rx * rx) + y * y / (ry * ry);
        if (h > 1) {
            h = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(h);
            rx = h * rx;
            ry = h * ry;
        }
        const k = (large === sweep ? -1 : 1) *
            Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["abs"])((rx * rx * ry * ry - rx * rx * y * y - ry * ry * x * x) / (rx * rx * y * y + ry * ry * x * x)));
        cx = k * rx * y / ry + (x1 + dx) / 2;
        cy = k * -ry * x / rx + (y1 + dy) / 2;
        f1 = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["asin"])((y1 - cy) / ry);
        f2 = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["asin"])((dy - cy) / ry);
        if (x1 < cx) {
            f1 = _utilities_math__WEBPACK_IMPORTED_MODULE_0__["PI"] - f1;
        }
        if (dx < cx) {
            f2 = _utilities_math__WEBPACK_IMPORTED_MODULE_0__["PI"] - f2;
        }
        if (f1 < 0) {
            f1 += PI2;
        }
        if (f2 < 0) {
            f2 += PI2;
        }
        if (sweep && f1 > f2) {
            f1 -= PI2;
        }
        if (!sweep && f2 > f1) {
            f2 -= PI2;
        }
    }
    let res;
    if (Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(f2 - f1) > _120) {
        const f2old = f2;
        const x2old = dx;
        const y2old = dy;
        f2 = f1 + _120 * (sweep && f2 > f1 ? 1 : -1);
        dx = cx + rx * Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(f2);
        dy = cy + ry * Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(f2);
        res = arcToCurve(dx, dy, rx, ry, angle, 0, sweep, x2old, y2old, f2, f2old, cx, cy);
    }
    else {
        res = [];
    }
    const t = 4 / 3 * Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["tan"])((f2 - f1) / 4);
    res.splice(0, 0, 2 * x1 - (x1 + t * rx * Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(f1)), 2 * y1 - (y1 - t * ry * Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(f1)), dx + t * rx * Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(f2), dy - t * ry * Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(f2), dx, dy);
    if (!recursive) {
        for (let i = 0, ilen = res.length; i < ilen; i += 2) {
            const xt = res[i], yt = res[i + 1];
            res[i] = xt * cosrad - yt * sinrad;
            res[i + 1] = xt * sinrad + yt * cosrad;
        }
    }
    return res;
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/fillPoints.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/fillPoints.js ***!
  \******************************************************************************************/
/*! exports provided: fillPoints, fillSubpath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillPoints", function() { return fillPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillSubpath", function() { return fillSubpath; });
/* harmony import */ var _utilities_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/math */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js");
/* harmony import */ var _utilities_createNumberArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/createNumberArray */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/createNumberArray.js");


function fillPoints(matrix, addPoints) {
    const ilen = matrix[0].length;
    for (let i = 0; i < ilen; i++) {
        const left = matrix[0][i];
        const right = matrix[1][i];
        const totalLength = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["max"])(left.length + addPoints, right.length + addPoints);
        matrix[0][i] = fillSubpath(left, totalLength);
        matrix[1][i] = fillSubpath(right, totalLength);
    }
}
function fillSubpath(ns, totalLength) {
    let totalNeeded = totalLength - ns.length;
    const ratio = Math.ceil(totalNeeded / ns.length);
    const result = Object(_utilities_createNumberArray__WEBPACK_IMPORTED_MODULE_1__["createNumberArray"])(totalLength);
    result[0] = ns[0];
    result[1] = ns[1];
    let k = 1, j = 1;
    while (j < totalLength - 1) {
        result[++j] = ns[++k];
        result[++j] = ns[++k];
        result[++j] = ns[++k];
        result[++j] = ns[++k];
        const dx = result[++j] = ns[++k];
        const dy = result[++j] = ns[++k];
        if (totalNeeded) {
            for (let f = 0; f < ratio && totalNeeded; f++) {
                result[j + 5] = result[j + 3] = result[j + 1] = dx;
                result[j + 6] = result[j + 4] = result[j + 2] = dy;
                j += 6;
                totalNeeded -= 6;
            }
        }
    }
    return result;
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/fillSegments.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/fillSegments.js ***!
  \********************************************************************************************/
/*! exports provided: fillSegments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillSegments", function() { return fillSegments; });
/* harmony import */ var _utilities_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/objects */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/objects.js");
/* harmony import */ var _utilities_createNumberArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/createNumberArray */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/createNumberArray.js");


function fillSegments(larger, smaller, origin) {
    const largeLen = larger.length;
    const smallLen = smaller.length;
    if (largeLen < smallLen) {
        return fillSegments(smaller, larger, origin);
    }
    smaller.length = largeLen;
    for (let i = smallLen; i < largeLen; i++) {
        const l = larger[i];
        const d = Object(_utilities_createNumberArray__WEBPACK_IMPORTED_MODULE_1__["createNumberArray"])(l.d.length);
        for (let k = 0; k < l.d.length; k += 2) {
            d[k] = origin.absolute ? origin.x : l.x + (l.w * origin.x);
            d[k + 1] = origin.absolute ? origin.y : l.y + (l.y * origin.y);
        }
        smaller[i] = Object(_utilities_objects__WEBPACK_IMPORTED_MODULE_0__["fillObject"])({ d }, l);
    }
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/interpolatePath.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/interpolatePath.js ***!
  \***********************************************************************************************/
/*! exports provided: interpolatePath, mixPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolatePath", function() { return interpolatePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixPoints", function() { return mixPoints; });
/* harmony import */ var _renderPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderPath */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/renderPath.js");
/* harmony import */ var _utilities_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/math */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js");
/* harmony import */ var _utilities_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/errors */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/errors.js");
/* harmony import */ var _normalizePaths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./normalizePaths */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/normalizePaths.js");
/* harmony import */ var _utilities_objects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/objects */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/objects.js");
/* harmony import */ var _utilities_createNumberArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/createNumberArray */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/createNumberArray.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js");







const defaultOptions = {
    addPoints: 0,
    optimize: _constants__WEBPACK_IMPORTED_MODULE_6__["FILL"],
    origin: { x: 0, y: 0 },
    precision: 0
};
function interpolatePath(paths, options) {
    options = Object(_utilities_objects__WEBPACK_IMPORTED_MODULE_4__["fillObject"])(options, defaultOptions);
    if (!paths || paths.length < 2) {
        Object(_utilities_errors__WEBPACK_IMPORTED_MODULE_2__["raiseError"])('invalid arguments');
    }
    const hlen = paths.length - 1;
    const items = Array(hlen);
    for (let h = 0; h < hlen; h++) {
        items[h] = getPathInterpolator(paths[h], paths[h + 1], options);
    }
    const formatter = !options.precision ? _utilities_math__WEBPACK_IMPORTED_MODULE_1__["round"] : (n) => n.toFixed(options.precision);
    return (offset) => {
        const d = hlen * offset;
        const flr = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_1__["min"])(Object(_utilities_math__WEBPACK_IMPORTED_MODULE_1__["floor"])(d), hlen - 1);
        return Object(_renderPath__WEBPACK_IMPORTED_MODULE_0__["renderPath"])(items[flr]((d - flr) / (flr + 1)), formatter);
    };
}
function getPathInterpolator(left, right, options) {
    const matrix = Object(_normalizePaths__WEBPACK_IMPORTED_MODULE_3__["normalizePaths"])(left, right, options);
    const n = matrix[0].length;
    return (offset) => {
        if (Object(_utilities_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(offset - 0) < _utilities_math__WEBPACK_IMPORTED_MODULE_1__["EPSILON"]) {
            return left.path;
        }
        if (Object(_utilities_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(offset - 1) < _utilities_math__WEBPACK_IMPORTED_MODULE_1__["EPSILON"]) {
            return right.path;
        }
        const results = Array(n);
        for (let h = 0; h < n; h++) {
            results[h] = mixPoints(matrix[0][h], matrix[1][h], offset);
        }
        return results;
    };
}
function mixPoints(a, b, o) {
    const alen = a.length;
    const results = Object(_utilities_createNumberArray__WEBPACK_IMPORTED_MODULE_5__["createNumberArray"])(alen);
    for (let i = 0; i < alen; i++) {
        results[i] = a[i] + (b[i] - a[i]) * o;
    }
    return results;
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/normalizePaths.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/normalizePaths.js ***!
  \**********************************************************************************************/
/*! exports provided: normalizePaths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizePaths", function() { return normalizePaths; });
/* harmony import */ var _fillSegments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fillSegments */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/fillSegments.js");
/* harmony import */ var _normalizePoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalizePoints */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/normalizePoints.js");
/* harmony import */ var _fillPoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fillPoints */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/fillPoints.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js");
/* harmony import */ var _utilities_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/errors */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/errors.js");





function sizeDesc(a, b) {
    return b.p - a.p;
}
function normalizePaths(left, right, options) {
    const leftPath = getSortedSegments(left);
    const rightPath = getSortedSegments(right);
    const origin = options.origin;
    const ox = origin.x;
    const oy = origin.y;
    const absolute = origin.absolute;
    if (leftPath.length !== rightPath.length) {
        if (options.optimize === _constants__WEBPACK_IMPORTED_MODULE_3__["FILL"]) {
            Object(_fillSegments__WEBPACK_IMPORTED_MODULE_0__["fillSegments"])(leftPath, rightPath, options.origin);
        }
        else {
            Object(_utilities_errors__WEBPACK_IMPORTED_MODULE_4__["raiseError"])('optimize:none requires equal lengths');
        }
    }
    const matrix = Array(2);
    matrix[0] = leftPath.map(toPoints);
    matrix[1] = rightPath.map(toPoints);
    if (options.optimize !== _constants__WEBPACK_IMPORTED_MODULE_3__["NONE"]) {
        for (let i = 0; i < leftPath.length; i++) {
            const ls = leftPath[i];
            const rs = rightPath[i];
            Object(_normalizePoints__WEBPACK_IMPORTED_MODULE_1__["normalizePoints"])(absolute ? ox : ls.x + ls.w * ox, absolute ? oy : ls.y + ls.h * oy, matrix[0][i]);
            Object(_normalizePoints__WEBPACK_IMPORTED_MODULE_1__["normalizePoints"])(absolute ? ox : rs.x + rs.w * ox, absolute ? oy : rs.y + rs.h * oy, matrix[1][i]);
        }
    }
    if (options.optimize === _constants__WEBPACK_IMPORTED_MODULE_3__["FILL"]) {
        Object(_fillPoints__WEBPACK_IMPORTED_MODULE_2__["fillPoints"])(matrix, options.addPoints * 6);
    }
    return matrix;
}
function getSortedSegments(path) {
    return path.data.slice().sort(sizeDesc);
}
function toPoints(p) {
    return p.d;
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/normalizePoints.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/normalizePoints.js ***!
  \***********************************************************************************************/
/*! exports provided: normalizePoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizePoints", function() { return normalizePoints; });
/* harmony import */ var _rotatePoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rotatePoints */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/rotatePoints.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js");
/* harmony import */ var _utilities_distance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/distance */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/distance.js");



function normalizePoints(x, y, ns) {
    let len = ns.length;
    if (ns[len - 2] !== ns[0] || ns[len - 1] !== ns[1]) {
        return;
    }
    const buffer = ns.slice(2);
    len = buffer.length;
    let index, minAmount;
    for (let i = 0; i < len; i += 6) {
        const next = Object(_utilities_distance__WEBPACK_IMPORTED_MODULE_2__["distance"])(x, y, buffer[i], buffer[i + 1]);
        if (minAmount === _constants__WEBPACK_IMPORTED_MODULE_1__["_"] || next < minAmount) {
            minAmount = next;
            index = i;
        }
    }
    Object(_rotatePoints__WEBPACK_IMPORTED_MODULE_0__["rotatePoints"])(buffer, index);
    ns[0] = buffer[len - 2];
    ns[1] = buffer[len - 1];
    for (let i = 0; i < buffer.length; i++) {
        ns[i + 2] = buffer[i];
    }
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/parsePath.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/parsePath.js ***!
  \*****************************************************************************************/
/*! exports provided: parsePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return parsePath; });
/* harmony import */ var _parsePoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePoints */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/parsePoints.js");
/* harmony import */ var _utilities_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/math */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js");
/* harmony import */ var _perimeterPoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./perimeterPoints */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/perimeterPoints.js");



function createPathSegmentArray(points) {
    let xmin = points[0];
    let ymin = points[1];
    let ymax = ymin;
    let xmax = xmin;
    for (let i = 2; i < points.length; i += 6) {
        let x = points[i + 4];
        let y = points[i + 5];
        xmin = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_1__["min"])(xmin, x);
        xmax = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_1__["max"])(xmax, x);
        ymin = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_1__["min"])(ymin, y);
        ymax = Object(_utilities_math__WEBPACK_IMPORTED_MODULE_1__["max"])(ymax, y);
    }
    return {
        d: points,
        x: xmin,
        y: ymin,
        w: xmax - xmin,
        h: ymax - ymin,
        p: Object(_perimeterPoints__WEBPACK_IMPORTED_MODULE_2__["perimeterPoints"])(points)
    };
}
function parsePath(d) {
    return {
        path: d,
        data: Object(_parsePoints__WEBPACK_IMPORTED_MODULE_0__["parsePoints"])(d).map(createPathSegmentArray)
    };
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/parsePoints.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/parsePoints.js ***!
  \*******************************************************************************************/
/*! exports provided: parsePoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePoints", function() { return parsePoints; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js");
/* harmony import */ var _utilities_coalesce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/coalesce */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/coalesce.js");
/* harmony import */ var _utilities_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/errors */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/errors.js");
/* harmony import */ var _utilities_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/math */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js");
/* harmony import */ var _arcToCurve__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./arcToCurve */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/arcToCurve.js");





const argLengths = { M: 2, H: 1, V: 1, L: 2, Z: 0, C: 6, S: 4, Q: 4, T: 2, A: 7 };
function addCurve(ctx, x1, y1, x2, y2, dx, dy) {
    const x = ctx.x;
    const y = ctx.y;
    ctx.x = Object(_utilities_coalesce__WEBPACK_IMPORTED_MODULE_1__["coalesce"])(dx, x);
    ctx.y = Object(_utilities_coalesce__WEBPACK_IMPORTED_MODULE_1__["coalesce"])(dy, y);
    ctx.p.push(Object(_utilities_coalesce__WEBPACK_IMPORTED_MODULE_1__["coalesce"])(x1, x), (y1 = Object(_utilities_coalesce__WEBPACK_IMPORTED_MODULE_1__["coalesce"])(y1, y)), (x2 = Object(_utilities_coalesce__WEBPACK_IMPORTED_MODULE_1__["coalesce"])(x2, x)), (y2 = Object(_utilities_coalesce__WEBPACK_IMPORTED_MODULE_1__["coalesce"])(y2, y)), ctx.x, ctx.y);
    ctx.lc = ctx.c;
}
function convertToAbsolute(ctx) {
    const c = ctx.c;
    const t = ctx.t;
    const x = ctx.x;
    const y = ctx.y;
    if (c === _constants__WEBPACK_IMPORTED_MODULE_0__["V"]) {
        t[0] += y;
    }
    else if (c === _constants__WEBPACK_IMPORTED_MODULE_0__["H"]) {
        t[0] += x;
    }
    else if (c === _constants__WEBPACK_IMPORTED_MODULE_0__["A"]) {
        t[5] += x;
        t[6] += y;
    }
    else {
        for (let j = 0; j < t.length; j += 2) {
            t[j] += x;
            t[j + 1] += y;
        }
    }
}
function parseSegments(d) {
    return d
        .replace(/[\^\s]*([mhvlzcsqta]|\-?\d*\.?\d+)[,\$\s]*/gi, ' $1')
        .replace(/([mhvlzcsqta])/gi, ' $1')
        .trim()
        .split('  ')
        .map(parseSegment);
}
function parseSegment(s2) {
    return s2.split(_constants__WEBPACK_IMPORTED_MODULE_0__["EMPTY"]).map(parseCommand);
}
function parseCommand(str, i) {
    return i === 0 ? str : +str;
}
function parsePoints(d) {
    const ctx = {
        x: 0,
        y: 0,
        s: []
    };
    const segments = parseSegments(d);
    for (let i = 0; i < segments.length; i++) {
        const terms = segments[i];
        const commandLetter = terms[0];
        const command = commandLetter.toUpperCase();
        const isRelative = command !== _constants__WEBPACK_IMPORTED_MODULE_0__["Z"] && command !== commandLetter;
        ctx.c = command;
        const maxLength = argLengths[command];
        const t2 = terms;
        let k = 1;
        do {
            ctx.t = t2.length === 1 ? t2 : t2.slice(k, k + maxLength);
            if (isRelative) {
                convertToAbsolute(ctx);
            }
            const n = ctx.t;
            const x = ctx.x;
            const y = ctx.y;
            let x1, y1, dx, dy, x2, y2;
            if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["M"]) {
                ctx.s.push((ctx.p = [(ctx.x = n[0]), (ctx.y = n[1])]));
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["H"]) {
                addCurve(ctx, _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], n[0], _constants__WEBPACK_IMPORTED_MODULE_0__["_"]);
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["V"]) {
                addCurve(ctx, _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], n[0]);
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["L"]) {
                addCurve(ctx, _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], n[0], n[1]);
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["Z"]) {
                addCurve(ctx, _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], _constants__WEBPACK_IMPORTED_MODULE_0__["_"], ctx.p[0], ctx.p[1]);
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["C"]) {
                addCurve(ctx, n[0], n[1], n[2], n[3], n[4], n[5]);
                ctx.cx = n[2];
                ctx.cy = n[3];
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["S"]) {
                const isInitialCurve = ctx.lc !== _constants__WEBPACK_IMPORTED_MODULE_0__["S"] && ctx.lc !== _constants__WEBPACK_IMPORTED_MODULE_0__["C"];
                x1 = isInitialCurve ? _constants__WEBPACK_IMPORTED_MODULE_0__["_"] : x * 2 - ctx.cx;
                y1 = isInitialCurve ? _constants__WEBPACK_IMPORTED_MODULE_0__["_"] : y * 2 - ctx.cy;
                addCurve(ctx, x1, y1, n[0], n[1], n[2], n[3]);
                ctx.cx = n[0];
                ctx.cy = n[1];
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["Q"]) {
                const cx1 = n[0];
                const cy1 = n[1];
                dx = n[2];
                dy = n[3];
                addCurve(ctx, x + (cx1 - x) * _utilities_math__WEBPACK_IMPORTED_MODULE_3__["quadraticRatio"], y + (cy1 - y) * _utilities_math__WEBPACK_IMPORTED_MODULE_3__["quadraticRatio"], dx + (cx1 - dx) * _utilities_math__WEBPACK_IMPORTED_MODULE_3__["quadraticRatio"], dy + (cy1 - dy) * _utilities_math__WEBPACK_IMPORTED_MODULE_3__["quadraticRatio"], dx, dy);
                ctx.cx = cx1;
                ctx.cy = cy1;
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["T"]) {
                dx = n[0];
                dy = n[1];
                if (ctx.lc === _constants__WEBPACK_IMPORTED_MODULE_0__["Q"] || ctx.lc === _constants__WEBPACK_IMPORTED_MODULE_0__["T"]) {
                    x1 = x + (x * 2 - ctx.cx - x) * _utilities_math__WEBPACK_IMPORTED_MODULE_3__["quadraticRatio"];
                    y1 = y + (y * 2 - ctx.cy - y) * _utilities_math__WEBPACK_IMPORTED_MODULE_3__["quadraticRatio"];
                    x2 = dx + (x * 2 - ctx.cx - dx) * _utilities_math__WEBPACK_IMPORTED_MODULE_3__["quadraticRatio"];
                    y2 = dy + (y * 2 - ctx.cy - dy) * _utilities_math__WEBPACK_IMPORTED_MODULE_3__["quadraticRatio"];
                }
                else {
                    x1 = x2 = x;
                    y1 = y2 = y;
                }
                addCurve(ctx, x1, y1, x2, y2, dx, dy);
                ctx.cx = x2;
                ctx.cy = y2;
            }
            else if (command === _constants__WEBPACK_IMPORTED_MODULE_0__["A"]) {
                const beziers = Object(_arcToCurve__WEBPACK_IMPORTED_MODULE_4__["arcToCurve"])(x, y, n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
                for (let j = 0; j < beziers.length; j += 6) {
                    addCurve(ctx, beziers[j], beziers[j + 1], beziers[j + 2], beziers[j + 3], beziers[j + 4], beziers[j + 5]);
                }
            }
            else {
                Object(_utilities_errors__WEBPACK_IMPORTED_MODULE_2__["raiseError"])(ctx.c, ' is not supported');
            }
            k += maxLength;
        } while (k < t2.length);
    }
    return ctx.s;
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/perimeterPoints.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/perimeterPoints.js ***!
  \***********************************************************************************************/
/*! exports provided: perimeterPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perimeterPoints", function() { return perimeterPoints; });
/* harmony import */ var _utilities_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/math */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js");
/* harmony import */ var _utilities_distance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/distance */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/distance.js");


function perimeterPoints(pts) {
    const n = pts.length;
    let x2 = pts[n - 2];
    let y2 = pts[n - 1];
    let p = 0;
    for (let i = 0; i < n; i += 6) {
        p += Object(_utilities_distance__WEBPACK_IMPORTED_MODULE_1__["distance"])(pts[i], pts[i + 1], x2, y2);
        x2 = pts[i];
        y2 = pts[i + 1];
    }
    return Object(_utilities_math__WEBPACK_IMPORTED_MODULE_0__["floor"])(p);
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/renderPath.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/renderPath.js ***!
  \******************************************************************************************/
/*! exports provided: renderPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderPath", function() { return renderPath; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js");
/* harmony import */ var _utilities_inspect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/inspect */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/inspect.js");


function renderPath(ns, formatter) {
    if (Object(_utilities_inspect__WEBPACK_IMPORTED_MODULE_1__["isString"])(ns)) {
        return ns;
    }
    let result = [];
    for (let i = 0; i < ns.length; i++) {
        const n = ns[i];
        result.push(_constants__WEBPACK_IMPORTED_MODULE_0__["M"], formatter(n[0]), formatter(n[1]), _constants__WEBPACK_IMPORTED_MODULE_0__["C"]);
        let lastResult;
        for (let f = 2; f < n.length; f += 6) {
            const p0 = formatter(n[f]);
            const p1 = formatter(n[f + 1]);
            const p2 = formatter(n[f + 2]);
            const p3 = formatter(n[f + 3]);
            const dx = formatter(n[f + 4]);
            const dy = formatter(n[f + 5]);
            const isPoint = p0 == dx && p2 == dx && p1 == dy && p3 == dy;
            if (!isPoint || lastResult != (lastResult = ('' + p0 + p1 + p2 + p3 + dx + dy))) {
                result.push(p0, p1, p2, p3, dx, dy);
            }
        }
    }
    return result.join(_constants__WEBPACK_IMPORTED_MODULE_0__["EMPTY"]);
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/rotatePoints.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/rotatePoints.js ***!
  \********************************************************************************************/
/*! exports provided: rotatePoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotatePoints", function() { return rotatePoints; });
/* harmony import */ var _utilities_createNumberArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/createNumberArray */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/createNumberArray.js");

function rotatePoints(ns, count) {
    const len = ns.length;
    const rightLen = len - count;
    const buffer = Object(_utilities_createNumberArray__WEBPACK_IMPORTED_MODULE_0__["createNumberArray"])(count);
    let i;
    for (i = 0; i < count; i++) {
        buffer[i] = ns[i];
    }
    for (i = count; i < len; i++) {
        ns[i - count] = ns[i];
    }
    for (i = 0; i < count; i++) {
        ns[rightLen + i] = buffer[i];
    }
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/parse.js":
/*!***************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/parse.js ***!
  \***************************************************************************/
/*! exports provided: parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony import */ var _operators_parsePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operators/parsePath */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/operators/parsePath.js");
/* harmony import */ var _getPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPath */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/getPath.js");


function parse(d) {
    return Object(_operators_parsePath__WEBPACK_IMPORTED_MODULE_0__["parsePath"])(Object(_getPath__WEBPACK_IMPORTED_MODULE_1__["getPath"])(d));
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/browser.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/browser.js ***!
  \***************************************************************************************/
/*! exports provided: isEdge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEdge", function() { return isEdge; });
var userAgent = typeof window !== 'undefined' && window.navigator.userAgent;
const isEdge = /(MSIE |Trident\/|Edge\/)/i.test(userAgent);


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/coalesce.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/coalesce.js ***!
  \****************************************************************************************/
/*! exports provided: coalesce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coalesce", function() { return coalesce; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js");

function coalesce(current, fallback) {
    return current === _constants__WEBPACK_IMPORTED_MODULE_0__["_"] ? fallback : current;
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/createNumberArray.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/createNumberArray.js ***!
  \*************************************************************************************************/
/*! exports provided: createNumberArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNumberArray", function() { return createNumberArray; });
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/browser.js");

const arrayConstructor = _browser__WEBPACK_IMPORTED_MODULE_0__["isEdge"] ? Array : Float32Array;
function createNumberArray(n) {
    return new arrayConstructor(n);
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/distance.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/distance.js ***!
  \****************************************************************************************/
/*! exports provided: distance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js");

function distance(x1, y1, x2, y2) {
    return Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/errors.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/errors.js ***!
  \**************************************************************************************/
/*! exports provided: raiseError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raiseError", function() { return raiseError; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/constants.js");

function raiseError() {
    throw new Error(Array.prototype.join.call(arguments, _constants__WEBPACK_IMPORTED_MODULE_0__["EMPTY"]));
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/inspect.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/inspect.js ***!
  \***************************************************************************************/
/*! exports provided: isString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
function isString(obj) {
    return typeof obj === 'string';
}


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js":
/*!************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/math.js ***!
  \************************************************************************************/
/*! exports provided: abs, min, max, floor, round, sqrt, pow, cos, asin, sin, tan, PI, quadraticRatio, EPSILON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pow", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cos", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asin", function() { return asin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sin", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tan", function() { return tan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PI", function() { return PI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadraticRatio", function() { return quadraticRatio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EPSILON", function() { return EPSILON; });
const math = Math;
const abs = math.abs;
const min = math.min;
const max = math.max;
const floor = math.floor;
const round = math.round;
const sqrt = math.sqrt;
const pow = math.pow;
const cos = math.cos;
const asin = math.asin;
const sin = math.sin;
const tan = math.tan;
const PI = math.PI;
const quadraticRatio = 2.0 / 3;
const EPSILON = pow(2, -52);


/***/ }),

/***/ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/objects.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/utilities/objects.js ***!
  \***************************************************************************************/
/*! exports provided: fillObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillObject", function() { return fillObject; });
function fillObject(dest, src) {
    for (let key in src) {
        if (!dest.hasOwnProperty(key)) {
            dest[key] = src[key];
        }
    }
    return dest;
}


/***/ }),

/***/ "./node_modules/_renyakun_vue_funnel@1.1.0@renyakun_vue_funnel/dist/vue-funnel-graph.esm.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/_renyakun_vue_funnel@1.1.0@renyakun_vue_funnel/dist/vue-funnel-graph.esm.js ***!
  \**************************************************************************************************/
/*! exports provided: default, VueFunnelGraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueFunnelGraph", function() { return vueFunnelGraph; });
/* harmony import */ var polymorph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! polymorph-js */ "./node_modules/_polymorph-js@0.2.4@polymorph-js/lib.es2015/index.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/_@tweenjs_tween.js@17.4.0@@tweenjs/tween.js/src/Tween.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var funnel_graph_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! funnel-graph-js */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/index.js");
/* harmony import */ var funnel_graph_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(funnel_graph_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var funnel_graph_js_src_js_number__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! funnel-graph-js/src/js/number */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/number.js");
/* harmony import */ var funnel_graph_js_src_js_graph__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! funnel-graph-js/src/js/graph */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/js/graph.js");
/* harmony import */ var funnel_graph_js_src_scss_main_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! funnel-graph-js/src/scss/main.scss */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/main.scss");
/* harmony import */ var funnel_graph_js_src_scss_main_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(funnel_graph_js_src_scss_main_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var funnel_graph_js_src_scss_theme_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! funnel-graph-js/src/scss/theme.scss */ "./node_modules/_funnel-graph-js@1.3.9@funnel-graph-js/src/scss/theme.scss");
/* harmony import */ var funnel_graph_js_src_scss_theme_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(funnel_graph_js_src_scss_theme_scss__WEBPACK_IMPORTED_MODULE_6__);








//

var script = {
    name: 'VueFunnelGraph',
    props: {
        animated: {
            type: Boolean,
            default: false
        },
        width: [String, Number],
        height: [String, Number],
        values: Array,
        labels: Array,
        colors: {
            type: Array,
            default: function default$1() { return []; }
        },
        subLabels: Array,
        direction: {
            type: String,
            default: 'horizontal'
        },
        gradientDirection: {
            type: String,
            default: 'horizontal'
        },
        displayPercentage: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            paths: [],
            prevPaths: [], // paths before update, used for animations
            graph: null,
            tween: null,
            defaultColors: Object(funnel_graph_js_src_js_graph__WEBPACK_IMPORTED_MODULE_4__["getDefaultColors"])(10)
        };
    },
    computed: {
        valuesFormatted: function valuesFormatted() {
            if (this.graph.is2d()) {
                return this.graph.getValues2d().map(function (value) { return Object(funnel_graph_js_src_js_number__WEBPACK_IMPORTED_MODULE_3__["formatNumber"])(value); });
            }
            return this.values.map(function (value) { return Object(funnel_graph_js_src_js_number__WEBPACK_IMPORTED_MODULE_3__["formatNumber"])(value); });
        },
        colorSet: function colorSet() {
            var colorSet = [];
            var gradientCount = 0;

            for (var i = 0; i < this.paths.length; i++) {
                var values = this.graph.is2d() ? this.getColors[i] : this.getColors;
                var fillMode = (typeof values === 'string' || values.length === 1) ? 'solid' : 'gradient';
                if (fillMode === 'gradient') { gradientCount += 1; }
                colorSet.push({
                    values: values,
                    fillMode: fillMode,
                    fill: fillMode === 'solid' ? values : ("url('#funnelGradient-" + gradientCount + "')")
                });
            }
            return colorSet;
        },
        gradientSet: function gradientSet() {
            var gradientSet = [];
            this.colorSet.forEach(function (colors) {
                if (colors.fillMode === 'gradient') {
                    gradientSet.push(colors);
                }
            });
            return gradientSet;
        },
        getColors: function getColors() {
            if (this.colors instanceof Array && this.colors.length === 0) {
                return Object(funnel_graph_js_src_js_graph__WEBPACK_IMPORTED_MODULE_4__["getDefaultColors"])(this.is2d() ? this.values[0].length : 2);
            }
            if (this.colors.length < this.paths.length) {
                return [].concat( this.colors ).concat(
                    [].concat( this.defaultColors ).splice(this.paths.length, this.paths.length - this.colors.length)
                );
            }
            return this.colors;
        },
        gradientAngle: function gradientAngle() {
            return ("rotate(" + (this.gradientDirection === 'vertical' ? 90 : 0) + ")");
        }
    },
    methods: {
        enterTransition: function enterTransition(el, done) {
            if (!this.animated) { done(); }
            setTimeout(function () { return done(); }, 700);
        },
        leaveTransition: function leaveTransition(el, done) {
            if (!this.animated) { done(); }
            setTimeout(function () { return done(); }, 700);
        },
        is2d: function is2d() {
            return this.graph.is2d();
        },
        percentages: function percentages() {
            return this.graph.createPercentages();
        },
        twoDimPercentages: function twoDimPercentages() {
            if (!this.is2d()) {
                return [];
            }
            return this.graph.getPercentages2d();
        },
        subLabelBackgrounds: function subLabelBackgrounds(index) {
            if (!this.is2d()) {
                return [];
            }
            return Object(funnel_graph_js_src_js_graph__WEBPACK_IMPORTED_MODULE_4__["generateLegendBackground"])(this.getColors[index], this.gradientDirection);
        },
        offsetColor: function offsetColor(index, length) {
            return ((Math.round(100 * index / (length - 1))) + "%");
        },
        makeAnimations: function makeAnimations() {
            var this$1 = this;

            if (this.tween !== null) { this.tween.stop(); }
            var interpolators = [];
            var dimensionChanged = this.prevPaths.length !== this.paths.length;

            var origin = { x: 0.5, y: 0.5 };
            if (dimensionChanged) {
                origin = { x: 0, y: 0.5 };
                if (this.graph.isVertical()) {
                    origin = { x: 1, y: 1 };
                }
                if (!this.graph.is2d()) {
                    origin = { x: 0, y: 1 };
                }
            }

            this.paths.forEach(function (path, index) {
                var oldPath = this$1.prevPaths[index] || this$1.graph.getPathMedian(index);
                if (dimensionChanged) { oldPath = this$1.graph.getPathMedian(index); }
                var interpolator = Object(polymorph_js__WEBPACK_IMPORTED_MODULE_0__["interpolate"])([oldPath, path], {
                    addPoints: 1,
                    origin: origin,
                    optimize: 'fill',
                    precision: 1
                });

                interpolators.push(interpolator);
            });

            function animate() {
                if (_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1___default.a.update()) {
                    requestAnimationFrame(animate);
                }
            }

            var position = { value: 0 };
            this.tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1___default.a.Tween(position)
                .to({ value: 1 }, 700)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1___default.a.Easing.Cubic.InOut)
                .onUpdate(function () {
                    for (var index = 0; index < this$1.paths.length; index++) {
                        this$1.paths[index] = interpolators[index](position.value);
                        // eslint-disable-next-line no-underscore-dangle
                        this$1.paths.__ob__.dep.notify();
                    }
                });

            this.tween.start();
            animate();
        },
        drawPaths: function drawPaths() {
            var this$1 = this;

            this.prevPaths = this.paths;
            this.paths = [];
            var definitions = this.graph.getPathDefinitions();

            definitions.forEach(function (d) {
                this$1.paths.push(d);
            });
        }
    },
    beforeMount: function beforeMount() {
        this.graph = new funnel_graph_js__WEBPACK_IMPORTED_MODULE_2___default.a({
            height: this.height,
            width: this.width,
            data: {
                labels: this.labels,
                values: this.values
            }
        });
        this.drawPaths();
        if (this.animated) { this.makeAnimations(); }
    },
    watch: {
        values: function values() {
            this.graph.setValues(this.values);
            this.drawPaths();
            if (this.animated) { this.makeAnimations(); }
        },
        direction: function direction() {
            this.graph.setDirection(this.direction)
                .setWidth(this.width)
                .setHeight(this.height);
            this.drawPaths();
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"funnel svg-funnel-js",class:{'svg-funnel-js--vertical': _vm.direction === 'vertical'}},[_c('div',{staticClass:"svg-funnel-js__container"},[_c('svg',{attrs:{"width":_vm.width,"height":_vm.height}},[_c('defs',_vm._l((_vm.gradientSet),function(colors,index){return _c('linearGradient',{key:index,attrs:{"id":("funnelGradient-" + ((index+1))),"gradientTransform":_vm.gradientAngle}},_vm._l((colors.values),function(color,index){return _c('stop',{key:index,attrs:{"stop-color":color,"offset":_vm.offsetColor(index, colors.values.length)}})}),1)}),1),_vm._v(" "),_vm._l((_vm.paths),function(path,index){return _c('path',{key:index,attrs:{"fill":_vm.colorSet[index].fill,"stroke":_vm.colorSet[index].fill,"d":path}})})],2)]),_vm._v(" "),_c('transition-group',{staticClass:"svg-funnel-js__labels",attrs:{"name":"appear","tag":"div"},on:{"enter":_vm.enterTransition,"leave":_vm.leaveTransition}},_vm._l((_vm.valuesFormatted),function(value,index){return _c('div',{key:_vm.labels[index].toLowerCase().split(' ').join('-'),staticClass:"svg-funnel-js__label",class:("label-" + ((index+1)))},[_c('div',{staticClass:"label__value"},[_vm._v(_vm._s(value))]),_vm._v(" "),(_vm.labels)?_c('div',{staticClass:"label__title"},[_vm._v(_vm._s(_vm.labels[index]))]):_vm._e(),_vm._v(" "),(_vm.displayPercentage && _vm.percentages()[index] !== 100)?_c('div',{staticClass:"label__percentage"},[_vm._v("\n                "+_vm._s(_vm.percentages()[index])+"%\n            ")]):_vm._e(),_vm._v(" "),(_vm.is2d())?_c('div',{staticClass:"label__segment-percentages"},[_c('ul',{staticClass:"segment-percentage__list"},_vm._l((_vm.subLabels),function(subLabel,j){return _c('li',{key:j},[_vm._v("\n                        "+_vm._s(subLabel)+":\n                        "),_c('span',{staticClass:"percentage__list-label"},[_vm._v(_vm._s(_vm.twoDimPercentages()[index][j])+"%")])])}),0)]):_vm._e()])}),0),_vm._v(" "),_c('transition',{attrs:{"name":"fade"},on:{"enter":_vm.enterTransition,"leave":_vm.leaveTransition}},[(_vm.is2d())?_c('div',{staticClass:"svg-funnel-js__subLabels"},_vm._l((_vm.subLabels),function(subLabel,index){return _c('div',{key:index,class:("svg-funnel-js__subLabel svg-funnel-js__subLabel-" + ((index + 1)))},[_c('div',{staticClass:"svg-funnel-js__subLabel--color",style:(_vm.subLabelBackgrounds(index))}),_vm._v(" "),_c('div',{staticClass:"svg-funnel-js__subLabel--title"},[_vm._v(_vm._s(subLabel))])])}),0):_vm._e()])],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-6203abd4_0", { source: ".appear-enter-active[data-v-6203abd4],.appear-leave-active[data-v-6203abd4]{transition:all .7s ease-in-out}.appear-enter-to[data-v-6203abd4],.appear-leave[data-v-6203abd4]{max-width:100%;max-height:100%;opacity:1}.appear-enter[data-v-6203abd4],.appear-leave-to[data-v-6203abd4]{max-width:0;max-height:0;opacity:0}.fade-enter-active[data-v-6203abd4],.fade-leave-active[data-v-6203abd4]{transition:all .3s ease}.fade-enter-to[data-v-6203abd4],.fade-leave[data-v-6203abd4]{opacity:1}.fade-enter[data-v-6203abd4],.fade-leave-to[data-v-6203abd4]{opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-6203abd4";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var vueFunnelGraph = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    VueFunnelGraph: vueFunnelGraph
});

// Import vue components

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Object.keys(components).forEach(function (componentName) {
    Vue.component(componentName, components[componentName]);
  });
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

/* harmony default export */ __webpack_exports__["default"] = (plugin);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../_webpack@4.28.4@webpack/buildin/global.js */ "./node_modules/_webpack@4.28.4@webpack/buildin/global.js")))

/***/ })

}]);
//# sourceMappingURL=10.js.map