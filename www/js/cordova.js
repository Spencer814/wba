/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(Buffer) {// Platform: ios
	// fc4db9145934bd0053161cbf9ffc0caf83b770c6
	/*
	 Licensed to the Apache Software Foundation (ASF) under one
	 or more contributor license agreements.  See the NOTICE file
	 distributed with this work for additional information
	 regarding copyright ownership.  The ASF licenses this file
	 to you under the Apache License, Version 2.0 (the
	 "License"); you may not use this file except in compliance
	 with the License.  You may obtain a copy of the License at
	 
	     http://www.apache.org/licenses/LICENSE-2.0
	 
	 Unless required by applicable law or agreed to in writing,
	 software distributed under the License is distributed on an
	 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 KIND, either express or implied.  See the License for the
	 specific language governing permissions and limitations
	 under the License.
	*/
	;(function() {
	var PLATFORM_VERSION_BUILD_LABEL = '3.8.0';
	// file: src/scripts/require.js

	/*jshint -W079 */
	/*jshint -W020 */

	var require,
	    define;

	(function () {
	    var modules = {},
	    // Stack of moduleIds currently being built.
	        requireStack = [],
	    // Map of module ID -> index into requireStack of modules currently being built.
	        inProgressModules = {},
	        SEPARATOR = ".";



	    function build(module) {
	        var factory = module.factory,
	            localRequire = function (id) {
	                var resultantId = id;
	                //Its a relative path, so lop off the last portion and add the id (minus "./")
	                if (id.charAt(0) === ".") {
	                    resultantId = module.id.slice(0, module.id.lastIndexOf(SEPARATOR)) + SEPARATOR + id.slice(2);
	                }
	                return require(resultantId);
	            };
	        module.exports = {};
	        delete module.factory;
	        factory(localRequire, module.exports, module);
	        return module.exports;
	    }

	    require = function (id) {
	        if (!modules[id]) {
	            throw "module " + id + " not found";
	        } else if (id in inProgressModules) {
	            var cycle = requireStack.slice(inProgressModules[id]).join('->') + '->' + id;
	            throw "Cycle in require graph: " + cycle;
	        }
	        if (modules[id].factory) {
	            try {
	                inProgressModules[id] = requireStack.length;
	                requireStack.push(id);
	                return build(modules[id]);
	            } finally {
	                delete inProgressModules[id];
	                requireStack.pop();
	            }
	        }
	        return modules[id].exports;
	    };

	    define = function (id, factory) {
	        if (modules[id]) {
	            throw "module " + id + " already defined";
	        }

	        modules[id] = {
	            id: id,
	            factory: factory
	        };
	    };

	    define.remove = function (id) {
	        delete modules[id];
	    };

	    define.moduleMap = modules;
	})();

	//Export for use in node
	if (typeof module === "object" && typeof require === "function") {
	    module.exports.require = require;
	    module.exports.define = define;
	}

	// file: src/cordova.js
	define("cordova", function(require, exports, module) {


	var channel = require('cordova/channel');
	var platform = require('cordova/platform');

	/**
	 * Intercept calls to addEventListener + removeEventListener and handle deviceready,
	 * resume, and pause events.
	 */
	var m_document_addEventListener = document.addEventListener;
	var m_document_removeEventListener = document.removeEventListener;
	var m_window_addEventListener = window.addEventListener;
	var m_window_removeEventListener = window.removeEventListener;

	/**
	 * Houses custom event handlers to intercept on document + window event listeners.
	 */
	var documentEventHandlers = {},
	    windowEventHandlers = {};

	document.addEventListener = function(evt, handler, capture) {
	    var e = evt.toLowerCase();
	    if (typeof documentEventHandlers[e] != 'undefined') {
	        documentEventHandlers[e].subscribe(handler);
	    } else {
	        m_document_addEventListener.call(document, evt, handler, capture);
	    }
	};

	window.addEventListener = function(evt, handler, capture) {
	    var e = evt.toLowerCase();
	    if (typeof windowEventHandlers[e] != 'undefined') {
	        windowEventHandlers[e].subscribe(handler);
	    } else {
	        m_window_addEventListener.call(window, evt, handler, capture);
	    }
	};

	document.removeEventListener = function(evt, handler, capture) {
	    var e = evt.toLowerCase();
	    // If unsubscribing from an event that is handled by a plugin
	    if (typeof documentEventHandlers[e] != "undefined") {
	        documentEventHandlers[e].unsubscribe(handler);
	    } else {
	        m_document_removeEventListener.call(document, evt, handler, capture);
	    }
	};

	window.removeEventListener = function(evt, handler, capture) {
	    var e = evt.toLowerCase();
	    // If unsubscribing from an event that is handled by a plugin
	    if (typeof windowEventHandlers[e] != "undefined") {
	        windowEventHandlers[e].unsubscribe(handler);
	    } else {
	        m_window_removeEventListener.call(window, evt, handler, capture);
	    }
	};

	function createEvent(type, data) {
	    var event = document.createEvent('Events');
	    event.initEvent(type, false, false);
	    if (data) {
	        for (var i in data) {
	            if (data.hasOwnProperty(i)) {
	                event[i] = data[i];
	            }
	        }
	    }
	    return event;
	}


	var cordova = {
	    define:define,
	    require:require,
	    version:PLATFORM_VERSION_BUILD_LABEL,
	    platformVersion:PLATFORM_VERSION_BUILD_LABEL,
	    platformId:platform.id,
	    /**
	     * Methods to add/remove your own addEventListener hijacking on document + window.
	     */
	    addWindowEventHandler:function(event) {
	        return (windowEventHandlers[event] = channel.create(event));
	    },
	    addStickyDocumentEventHandler:function(event) {
	        return (documentEventHandlers[event] = channel.createSticky(event));
	    },
	    addDocumentEventHandler:function(event) {
	        return (documentEventHandlers[event] = channel.create(event));
	    },
	    removeWindowEventHandler:function(event) {
	        delete windowEventHandlers[event];
	    },
	    removeDocumentEventHandler:function(event) {
	        delete documentEventHandlers[event];
	    },
	    /**
	     * Retrieve original event handlers that were replaced by Cordova
	     *
	     * @return object
	     */
	    getOriginalHandlers: function() {
	        return {'document': {'addEventListener': m_document_addEventListener, 'removeEventListener': m_document_removeEventListener},
	        'window': {'addEventListener': m_window_addEventListener, 'removeEventListener': m_window_removeEventListener}};
	    },
	    /**
	     * Method to fire event from native code
	     * bNoDetach is required for events which cause an exception which needs to be caught in native code
	     */
	    fireDocumentEvent: function(type, data, bNoDetach) {
	        var evt = createEvent(type, data);
	        if (typeof documentEventHandlers[type] != 'undefined') {
	            if( bNoDetach ) {
	                documentEventHandlers[type].fire(evt);
	            }
	            else {
	                setTimeout(function() {
	                    // Fire deviceready on listeners that were registered before cordova.js was loaded.
	                    if (type == 'deviceready') {
	                        document.dispatchEvent(evt);
	                    }
	                    documentEventHandlers[type].fire(evt);
	                }, 0);
	            }
	        } else {
	            document.dispatchEvent(evt);
	        }
	    },
	    fireWindowEvent: function(type, data) {
	        var evt = createEvent(type,data);
	        if (typeof windowEventHandlers[type] != 'undefined') {
	            setTimeout(function() {
	                windowEventHandlers[type].fire(evt);
	            }, 0);
	        } else {
	            window.dispatchEvent(evt);
	        }
	    },

	    /**
	     * Plugin callback mechanism.
	     */
	    // Randomize the starting callbackId to avoid collisions after refreshing or navigating.
	    // This way, it's very unlikely that any new callback would get the same callbackId as an old callback.
	    callbackId: Math.floor(Math.random() * 2000000000),
	    callbacks:  {},
	    callbackStatus: {
	        NO_RESULT: 0,
	        OK: 1,
	        CLASS_NOT_FOUND_EXCEPTION: 2,
	        ILLEGAL_ACCESS_EXCEPTION: 3,
	        INSTANTIATION_EXCEPTION: 4,
	        MALFORMED_URL_EXCEPTION: 5,
	        IO_EXCEPTION: 6,
	        INVALID_ACTION: 7,
	        JSON_EXCEPTION: 8,
	        ERROR: 9
	    },

	    /**
	     * Called by native code when returning successful result from an action.
	     */
	    callbackSuccess: function(callbackId, args) {
	        cordova.callbackFromNative(callbackId, true, args.status, [args.message], args.keepCallback);
	    },

	    /**
	     * Called by native code when returning error result from an action.
	     */
	    callbackError: function(callbackId, args) {
	        // TODO: Deprecate callbackSuccess and callbackError in favour of callbackFromNative.
	        // Derive success from status.
	        cordova.callbackFromNative(callbackId, false, args.status, [args.message], args.keepCallback);
	    },

	    /**
	     * Called by native code when returning the result from an action.
	     */
	    callbackFromNative: function(callbackId, isSuccess, status, args, keepCallback) {
	        try {
	            var callback = cordova.callbacks[callbackId];
	            if (callback) {
	                if (isSuccess && status == cordova.callbackStatus.OK) {
	                    callback.success && callback.success.apply(null, args);
	                } else if (!isSuccess) {
	                    callback.fail && callback.fail.apply(null, args);
	                }
	                /*
	                else
	                    Note, this case is intentionally not caught.
	                    this can happen if isSuccess is true, but callbackStatus is NO_RESULT
	                    which is used to remove a callback from the list without calling the callbacks
	                    typically keepCallback is false in this case
	                */
	                // Clear callback if not expecting any more results
	                if (!keepCallback) {
	                    delete cordova.callbacks[callbackId];
	                }
	            }
	        }
	        catch (err) {
	            var msg = "Error in " + (isSuccess ? "Success" : "Error") + " callbackId: " + callbackId + " : " + err;
	            console && console.log && console.log(msg);
	            cordova.fireWindowEvent("cordovacallbackerror", { 'message': msg });
	            throw err;
	        }
	    },
	    addConstructor: function(func) {
	        channel.onCordovaReady.subscribe(function() {
	            try {
	                func();
	            } catch(e) {
	                console.log("Failed to run constructor: " + e);
	            }
	        });
	    }
	};


	module.exports = cordova;

	});

	// file: src/common/argscheck.js
	define("cordova/argscheck", function(require, exports, module) {

	var exec = require('cordova/exec');
	var utils = require('cordova/utils');

	var moduleExports = module.exports;

	var typeMap = {
	    'A': 'Array',
	    'D': 'Date',
	    'N': 'Number',
	    'S': 'String',
	    'F': 'Function',
	    'O': 'Object'
	};

	function extractParamName(callee, argIndex) {
	    return (/.*?\((.*?)\)/).exec(callee)[1].split(', ')[argIndex];
	}

	function checkArgs(spec, functionName, args, opt_callee) {
	    if (!moduleExports.enableChecks) {
	        return;
	    }
	    var errMsg = null;
	    var typeName;
	    for (var i = 0; i < spec.length; ++i) {
	        var c = spec.charAt(i),
	            cUpper = c.toUpperCase(),
	            arg = args[i];
	        // Asterix means allow anything.
	        if (c == '*') {
	            continue;
	        }
	        typeName = utils.typeName(arg);
	        if ((arg === null || arg === undefined) && c == cUpper) {
	            continue;
	        }
	        if (typeName != typeMap[cUpper]) {
	            errMsg = 'Expected ' + typeMap[cUpper];
	            break;
	        }
	    }
	    if (errMsg) {
	        errMsg += ', but got ' + typeName + '.';
	        errMsg = 'Wrong type for parameter "' + extractParamName(opt_callee || args.callee, i) + '" of ' + functionName + ': ' + errMsg;
	        // Don't log when running unit tests.
	        if (typeof jasmine == 'undefined') {
	            console.error(errMsg);
	        }
	        throw TypeError(errMsg);
	    }
	}

	function getValue(value, defaultValue) {
	    return value === undefined ? defaultValue : value;
	}

	moduleExports.checkArgs = checkArgs;
	moduleExports.getValue = getValue;
	moduleExports.enableChecks = true;


	});

	// file: src/common/base64.js
	define("cordova/base64", function(require, exports, module) {

	var base64 = exports;

	base64.fromArrayBuffer = function(arrayBuffer) {
	    var array = new Uint8Array(arrayBuffer);
	    return uint8ToBase64(array);
	};

	base64.toArrayBuffer = function(str) {
	    var decodedStr = typeof atob != 'undefined' ? atob(str) : new Buffer(str,'base64').toString('binary');
	    var arrayBuffer = new ArrayBuffer(decodedStr.length);
	    var array = new Uint8Array(arrayBuffer);
	    for (var i=0, len=decodedStr.length; i < len; i++) {
	        array[i] = decodedStr.charCodeAt(i);
	    }
	    return arrayBuffer;
	};

	//------------------------------------------------------------------------------

	/* This code is based on the performance tests at http://jsperf.com/b64tests
	 * This 12-bit-at-a-time algorithm was the best performing version on all
	 * platforms tested.
	 */

	var b64_6bit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var b64_12bit;

	var b64_12bitTable = function() {
	    b64_12bit = [];
	    for (var i=0; i<64; i++) {
	        for (var j=0; j<64; j++) {
	            b64_12bit[i*64+j] = b64_6bit[i] + b64_6bit[j];
	        }
	    }
	    b64_12bitTable = function() { return b64_12bit; };
	    return b64_12bit;
	};

	function uint8ToBase64(rawData) {
	    var numBytes = rawData.byteLength;
	    var output="";
	    var segment;
	    var table = b64_12bitTable();
	    for (var i=0;i<numBytes-2;i+=3) {
	        segment = (rawData[i] << 16) + (rawData[i+1] << 8) + rawData[i+2];
	        output += table[segment >> 12];
	        output += table[segment & 0xfff];
	    }
	    if (numBytes - i == 2) {
	        segment = (rawData[i] << 16) + (rawData[i+1] << 8);
	        output += table[segment >> 12];
	        output += b64_6bit[(segment & 0xfff) >> 6];
	        output += '=';
	    } else if (numBytes - i == 1) {
	        segment = (rawData[i] << 16);
	        output += table[segment >> 12];
	        output += '==';
	    }
	    return output;
	}

	});

	// file: src/common/builder.js
	define("cordova/builder", function(require, exports, module) {

	var utils = require('cordova/utils');

	function each(objects, func, context) {
	    for (var prop in objects) {
	        if (objects.hasOwnProperty(prop)) {
	            func.apply(context, [objects[prop], prop]);
	        }
	    }
	}

	function clobber(obj, key, value) {
	    exports.replaceHookForTesting(obj, key);
	    var needsProperty = false;
	    try {
	        obj[key] = value;
	    } catch (e) {
	        needsProperty = true;
	    }
	    // Getters can only be overridden by getters.
	    if (needsProperty || obj[key] !== value) {
	        utils.defineGetter(obj, key, function() {
	            return value;
	        });
	    }
	}

	function assignOrWrapInDeprecateGetter(obj, key, value, message) {
	    if (message) {
	        utils.defineGetter(obj, key, function() {
	            console.log(message);
	            delete obj[key];
	            clobber(obj, key, value);
	            return value;
	        });
	    } else {
	        clobber(obj, key, value);
	    }
	}

	function include(parent, objects, clobber, merge) {
	    each(objects, function (obj, key) {
	        try {
	            var result = obj.path ? require(obj.path) : {};

	            if (clobber) {
	                // Clobber if it doesn't exist.
	                if (typeof parent[key] === 'undefined') {
	                    assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
	                } else if (typeof obj.path !== 'undefined') {
	                    // If merging, merge properties onto parent, otherwise, clobber.
	                    if (merge) {
	                        recursiveMerge(parent[key], result);
	                    } else {
	                        assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
	                    }
	                }
	                result = parent[key];
	            } else {
	                // Overwrite if not currently defined.
	                if (typeof parent[key] == 'undefined') {
	                    assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
	                } else {
	                    // Set result to what already exists, so we can build children into it if they exist.
	                    result = parent[key];
	                }
	            }

	            if (obj.children) {
	                include(result, obj.children, clobber, merge);
	            }
	        } catch(e) {
	            utils.alert('Exception building Cordova JS globals: ' + e + ' for key "' + key + '"');
	        }
	    });
	}

	/**
	 * Merge properties from one object onto another recursively.  Properties from
	 * the src object will overwrite existing target property.
	 *
	 * @param target Object to merge properties into.
	 * @param src Object to merge properties from.
	 */
	function recursiveMerge(target, src) {
	    for (var prop in src) {
	        if (src.hasOwnProperty(prop)) {
	            if (target.prototype && target.prototype.constructor === target) {
	                // If the target object is a constructor override off prototype.
	                clobber(target.prototype, prop, src[prop]);
	            } else {
	                if (typeof src[prop] === 'object' && typeof target[prop] === 'object') {
	                    recursiveMerge(target[prop], src[prop]);
	                } else {
	                    clobber(target, prop, src[prop]);
	                }
	            }
	        }
	    }
	}

	exports.buildIntoButDoNotClobber = function(objects, target) {
	    include(target, objects, false, false);
	};
	exports.buildIntoAndClobber = function(objects, target) {
	    include(target, objects, true, false);
	};
	exports.buildIntoAndMerge = function(objects, target) {
	    include(target, objects, true, true);
	};
	exports.recursiveMerge = recursiveMerge;
	exports.assignOrWrapInDeprecateGetter = assignOrWrapInDeprecateGetter;
	exports.replaceHookForTesting = function() {};

	});

	// file: src/common/channel.js
	define("cordova/channel", function(require, exports, module) {

	var utils = require('cordova/utils'),
	    nextGuid = 1;

	/**
	 * Custom pub-sub "channel" that can have functions subscribed to it
	 * This object is used to define and control firing of events for
	 * cordova initialization, as well as for custom events thereafter.
	 *
	 * The order of events during page load and Cordova startup is as follows:
	 *
	 * onDOMContentLoaded*         Internal event that is received when the web page is loaded and parsed.
	 * onNativeReady*              Internal event that indicates the Cordova native side is ready.
	 * onCordovaReady*             Internal event fired when all Cordova JavaScript objects have been created.
	 * onDeviceReady*              User event fired to indicate that Cordova is ready
	 * onResume                    User event fired to indicate a start/resume lifecycle event
	 * onPause                     User event fired to indicate a pause lifecycle event
	 *
	 * The events marked with an * are sticky. Once they have fired, they will stay in the fired state.
	 * All listeners that subscribe after the event is fired will be executed right away.
	 *
	 * The only Cordova events that user code should register for are:
	 *      deviceready           Cordova native code is initialized and Cordova APIs can be called from JavaScript
	 *      pause                 App has moved to background
	 *      resume                App has returned to foreground
	 *
	 * Listeners can be registered as:
	 *      document.addEventListener("deviceready", myDeviceReadyListener, false);
	 *      document.addEventListener("resume", myResumeListener, false);
	 *      document.addEventListener("pause", myPauseListener, false);
	 *
	 * The DOM lifecycle events should be used for saving and restoring state
	 *      window.onload
	 *      window.onunload
	 *
	 */

	/**
	 * Channel
	 * @constructor
	 * @param type  String the channel name
	 */
	var Channel = function(type, sticky) {
	    this.type = type;
	    // Map of guid -> function.
	    this.handlers = {};
	    // 0 = Non-sticky, 1 = Sticky non-fired, 2 = Sticky fired.
	    this.state = sticky ? 1 : 0;
	    // Used in sticky mode to remember args passed to fire().
	    this.fireArgs = null;
	    // Used by onHasSubscribersChange to know if there are any listeners.
	    this.numHandlers = 0;
	    // Function that is called when the first listener is subscribed, or when
	    // the last listener is unsubscribed.
	    this.onHasSubscribersChange = null;
	},
	    channel = {
	        /**
	         * Calls the provided function only after all of the channels specified
	         * have been fired. All channels must be sticky channels.
	         */
	        join: function(h, c) {
	            var len = c.length,
	                i = len,
	                f = function() {
	                    if (!(--i)) h();
	                };
	            for (var j=0; j<len; j++) {
	                if (c[j].state === 0) {
	                    throw Error('Can only use join with sticky channels.');
	                }
	                c[j].subscribe(f);
	            }
	            if (!len) h();
	        },
	        create: function(type) {
	            return channel[type] = new Channel(type, false);
	        },
	        createSticky: function(type) {
	            return channel[type] = new Channel(type, true);
	        },

	        /**
	         * cordova Channels that must fire before "deviceready" is fired.
	         */
	        deviceReadyChannelsArray: [],
	        deviceReadyChannelsMap: {},

	        /**
	         * Indicate that a feature needs to be initialized before it is ready to be used.
	         * This holds up Cordova's "deviceready" event until the feature has been initialized
	         * and Cordova.initComplete(feature) is called.
	         *
	         * @param feature {String}     The unique feature name
	         */
	        waitForInitialization: function(feature) {
	            if (feature) {
	                var c = channel[feature] || this.createSticky(feature);
	                this.deviceReadyChannelsMap[feature] = c;
	                this.deviceReadyChannelsArray.push(c);
	            }
	        },

	        /**
	         * Indicate that initialization code has completed and the feature is ready to be used.
	         *
	         * @param feature {String}     The unique feature name
	         */
	        initializationComplete: function(feature) {
	            var c = this.deviceReadyChannelsMap[feature];
	            if (c) {
	                c.fire();
	            }
	        }
	    };

	function forceFunction(f) {
	    if (typeof f != 'function') throw "Function required as first argument!";
	}

	/**
	 * Subscribes the given function to the channel. Any time that
	 * Channel.fire is called so too will the function.
	 * Optionally specify an execution context for the function
	 * and a guid that can be used to stop subscribing to the channel.
	 * Returns the guid.
	 */
	Channel.prototype.subscribe = function(f, c) {
	    // need a function to call
	    forceFunction(f);
	    if (this.state == 2) {
	        f.apply(c || this, this.fireArgs);
	        return;
	    }

	    var func = f,
	        guid = f.observer_guid;
	    if (typeof c == "object") { func = utils.close(c, f); }

	    if (!guid) {
	        // first time any channel has seen this subscriber
	        guid = '' + nextGuid++;
	    }
	    func.observer_guid = guid;
	    f.observer_guid = guid;

	    // Don't add the same handler more than once.
	    if (!this.handlers[guid]) {
	        this.handlers[guid] = func;
	        this.numHandlers++;
	        if (this.numHandlers == 1) {
	            this.onHasSubscribersChange && this.onHasSubscribersChange();
	        }
	    }
	};

	/**
	 * Unsubscribes the function with the given guid from the channel.
	 */
	Channel.prototype.unsubscribe = function(f) {
	    // need a function to unsubscribe
	    forceFunction(f);

	    var guid = f.observer_guid,
	        handler = this.handlers[guid];
	    if (handler) {
	        delete this.handlers[guid];
	        this.numHandlers--;
	        if (this.numHandlers === 0) {
	            this.onHasSubscribersChange && this.onHasSubscribersChange();
	        }
	    }
	};

	/**
	 * Calls all functions subscribed to this channel.
	 */
	Channel.prototype.fire = function(e) {
	    var fail = false,
	        fireArgs = Array.prototype.slice.call(arguments);
	    // Apply stickiness.
	    if (this.state == 1) {
	        this.state = 2;
	        this.fireArgs = fireArgs;
	    }
	    if (this.numHandlers) {
	        // Copy the values first so that it is safe to modify it from within
	        // callbacks.
	        var toCall = [];
	        for (var item in this.handlers) {
	            toCall.push(this.handlers[item]);
	        }
	        for (var i = 0; i < toCall.length; ++i) {
	            toCall[i].apply(this, fireArgs);
	        }
	        if (this.state == 2 && this.numHandlers) {
	            this.numHandlers = 0;
	            this.handlers = {};
	            this.onHasSubscribersChange && this.onHasSubscribersChange();
	        }
	    }
	};


	// defining them here so they are ready super fast!
	// DOM event that is received when the web page is loaded and parsed.
	channel.createSticky('onDOMContentLoaded');

	// Event to indicate the Cordova native side is ready.
	channel.createSticky('onNativeReady');

	// Event to indicate that all Cordova JavaScript objects have been created
	// and it's time to run plugin constructors.
	channel.createSticky('onCordovaReady');

	// Event to indicate that all automatically loaded JS plugins are loaded and ready.
	// FIXME remove this
	channel.createSticky('onPluginsReady');

	// Event to indicate that Cordova is ready
	channel.createSticky('onDeviceReady');

	// Event to indicate a resume lifecycle event
	channel.create('onResume');

	// Event to indicate a pause lifecycle event
	channel.create('onPause');

	// Channels that must fire before "deviceready" is fired.
	channel.waitForInitialization('onCordovaReady');
	channel.waitForInitialization('onDOMContentLoaded');

	module.exports = channel;

	});

	// file: src/ios/exec.js
	define("cordova/exec", function(require, exports, module) {

	/**
	 * Creates a gap bridge iframe used to notify the native code about queued
	 * commands.
	 */
	var cordova = require('cordova'),
	    channel = require('cordova/channel'),
	    utils = require('cordova/utils'),
	    base64 = require('cordova/base64'),
	    // XHR mode does not work on iOS 4.2.
	    // XHR mode's main advantage is working around a bug in -webkit-scroll, which
	    // doesn't exist only on iOS 5.x devices.
	    // IFRAME_NAV is the fastest.
	    // IFRAME_HASH could be made to enable synchronous bridge calls if we wanted this feature.
	    jsToNativeModes = {
	        IFRAME_NAV: 0, // Default. Uses a new iframe for each poke.
	        // XHR bridge appears to be flaky sometimes: CB-3900, CB-3359, CB-5457, CB-4970, CB-4998, CB-5134
	        XHR_NO_PAYLOAD: 1, // About the same speed as IFRAME_NAV. Performance not about the same as IFRAME_NAV, but more variable.
	        XHR_WITH_PAYLOAD: 2, // Flakey, and not as performant
	        XHR_OPTIONAL_PAYLOAD: 3, // Flakey, and not as performant
	        IFRAME_HASH_NO_PAYLOAD: 4, // Not fully baked. A bit faster than IFRAME_NAV, but risks jank since poke happens synchronously.
	        IFRAME_HASH_WITH_PAYLOAD: 5, // Slower than no payload. Maybe since it has to be URI encoded / decoded.
	        WK_WEBVIEW_BINDING: 6 // Only way that works for WKWebView :)
	    },
	    bridgeMode,
	    execIframe,
	    execHashIframe,
	    hashToggle = 1,
	    execXhr,
	    requestCount = 0,
	    vcHeaderValue = null,
	    commandQueue = [], // Contains pending JS->Native messages.
	    isInContextOfEvalJs = 0,
	    failSafeTimerId = 0;

	function shouldBundleCommandJson() {
	    if (bridgeMode === jsToNativeModes.XHR_WITH_PAYLOAD) {
	        return true;
	    }
	    if (bridgeMode === jsToNativeModes.XHR_OPTIONAL_PAYLOAD) {
	        var payloadLength = 0;
	        for (var i = 0; i < commandQueue.length; ++i) {
	            payloadLength += commandQueue[i].length;
	        }
	        // The value here was determined using the benchmark within CordovaLibApp on an iPad 3.
	        return payloadLength < 4500;
	    }
	    return false;
	}

	function massageArgsJsToNative(args) {
	    if (!args || utils.typeName(args) != 'Array') {
	        return args;
	    }
	    var ret = [];
	    args.forEach(function(arg, i) {
	        if (utils.typeName(arg) == 'ArrayBuffer') {
	            ret.push({
	                'CDVType': 'ArrayBuffer',
	                'data': base64.fromArrayBuffer(arg)
	            });
	        } else {
	            ret.push(arg);
	        }
	    });
	    return ret;
	}

	function massageMessageNativeToJs(message) {
	    if (message.CDVType == 'ArrayBuffer') {
	        var stringToArrayBuffer = function(str) {
	            var ret = new Uint8Array(str.length);
	            for (var i = 0; i < str.length; i++) {
	                ret[i] = str.charCodeAt(i);
	            }
	            return ret.buffer;
	        };
	        var base64ToArrayBuffer = function(b64) {
	            return stringToArrayBuffer(atob(b64));
	        };
	        message = base64ToArrayBuffer(message.data);
	    }
	    return message;
	}

	function convertMessageToArgsNativeToJs(message) {
	    var args = [];
	    if (!message || !message.hasOwnProperty('CDVType')) {
	        args.push(message);
	    } else if (message.CDVType == 'MultiPart') {
	        message.messages.forEach(function(e) {
	            args.push(massageMessageNativeToJs(e));
	        });
	    } else {
	        args.push(massageMessageNativeToJs(message));
	    }
	    return args;
	}

	function iOSExec() {
	    if (bridgeMode === undefined) {
	        bridgeMode = jsToNativeModes.IFRAME_NAV;
	    }

	    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cordova && window.webkit.messageHandlers.cordova.postMessage) {
	        bridgeMode = jsToNativeModes.WK_WEBVIEW_BINDING;
	    }

	    var successCallback, failCallback, service, action, actionArgs, splitCommand;
	    var callbackId = null;
	    if (typeof arguments[0] !== "string") {
	        // FORMAT ONE
	        successCallback = arguments[0];
	        failCallback = arguments[1];
	        service = arguments[2];
	        action = arguments[3];
	        actionArgs = arguments[4];

	        // Since we need to maintain backwards compatibility, we have to pass
	        // an invalid callbackId even if no callback was provided since plugins
	        // will be expecting it. The Cordova.exec() implementation allocates
	        // an invalid callbackId and passes it even if no callbacks were given.
	        callbackId = 'INVALID';
	    } else {
	        // FORMAT TWO, REMOVED
	        try {
	            splitCommand = arguments[0].split(".");
	            action = splitCommand.pop();
	            service = splitCommand.join(".");
	            actionArgs = Array.prototype.splice.call(arguments, 1);

	            console.log('The old format of this exec call has been removed (deprecated since 2.1). Change to: ' +
	                       "cordova.exec(null, null, \"" + service + "\", \"" + action + "\"," + JSON.stringify(actionArgs) + ");"
	            );
	            return;
	        } catch (e) {}
	    }

	    // If actionArgs is not provided, default to an empty array
	    actionArgs = actionArgs || [];

	    // Register the callbacks and add the callbackId to the positional
	    // arguments if given.
	    if (successCallback || failCallback) {
	        callbackId = service + cordova.callbackId++;
	        cordova.callbacks[callbackId] =
	            {success:successCallback, fail:failCallback};
	    }

	    actionArgs = massageArgsJsToNative(actionArgs);

	    var command = [callbackId, service, action, actionArgs];

	    // Stringify and queue the command. We stringify to command now to
	    // effectively clone the command arguments in case they are mutated before
	    // the command is executed.
	    commandQueue.push(JSON.stringify(command));
	    
	    if (bridgeMode === jsToNativeModes.WK_WEBVIEW_BINDING) {
	        window.webkit.messageHandlers.cordova.postMessage(command);
	    } else {
	        // If we're in the context of a stringByEvaluatingJavaScriptFromString call,
	        // then the queue will be flushed when it returns; no need for a poke.
	        // Also, if there is already a command in the queue, then we've already
	        // poked the native side, so there is no reason to do so again.
	        if (!isInContextOfEvalJs && commandQueue.length == 1) {
	            pokeNative();
	        }
	    }
	}

	function pokeNative() {
	    switch (bridgeMode) {
	    case jsToNativeModes.XHR_NO_PAYLOAD:
	    case jsToNativeModes.XHR_WITH_PAYLOAD:
	    case jsToNativeModes.XHR_OPTIONAL_PAYLOAD:
	        pokeNativeViaXhr();
	        break;
	    default: // iframe-based.
	        pokeNativeViaIframe();
	    }
	}

	function pokeNativeViaXhr() {
	    // This prevents sending an XHR when there is already one being sent.
	    // This should happen only in rare circumstances (refer to unit tests).
	    if (execXhr && execXhr.readyState != 4) {
	        execXhr = null;
	    }
	    // Re-using the XHR improves exec() performance by about 10%.
	    execXhr = execXhr || new XMLHttpRequest();
	    // Changing this to a GET will make the XHR reach the URIProtocol on 4.2.
	    // For some reason it still doesn't work though...
	    // Add a timestamp to the query param to prevent caching.
	    execXhr.open('HEAD', "/!gap_exec?" + (+new Date()), true);
	    if (!vcHeaderValue) {
	        vcHeaderValue = /.*\((.*)\)$/.exec(navigator.userAgent)[1];
	    }
	    execXhr.setRequestHeader('vc', vcHeaderValue);
	    execXhr.setRequestHeader('rc', ++requestCount);
	    if (shouldBundleCommandJson()) {
	        execXhr.setRequestHeader('cmds', iOSExec.nativeFetchMessages());
	    }
	    execXhr.send(null);
	}

	function pokeNativeViaIframe() {
	    // CB-5488 - Don't attempt to create iframe before document.body is available.
	    if (!document.body) {
	        setTimeout(pokeNativeViaIframe);
	        return;
	    }
	    if (bridgeMode === jsToNativeModes.IFRAME_HASH_NO_PAYLOAD || bridgeMode === jsToNativeModes.IFRAME_HASH_WITH_PAYLOAD) {
	        // TODO: This bridge mode doesn't properly support being removed from the DOM (CB-7735)
	        if (!execHashIframe) {
	            execHashIframe = document.createElement('iframe');
	            execHashIframe.style.display = 'none';
	            document.body.appendChild(execHashIframe);
	            // Hash changes don't work on about:blank, so switch it to file:///.
	            execHashIframe.contentWindow.history.replaceState(null, null, 'file:///#');
	        }
	        // The delegate method is called only when the hash changes, so toggle it back and forth.
	        hashToggle = hashToggle ^ 3;
	        var hashValue = '%0' + hashToggle;
	        if (bridgeMode === jsToNativeModes.IFRAME_HASH_WITH_PAYLOAD) {
	            hashValue += iOSExec.nativeFetchMessages();
	        }
	        execHashIframe.contentWindow.location.hash = hashValue;
	    } else {
	        // Check if they've removed it from the DOM, and put it back if so.
	        if (execIframe && execIframe.contentWindow) {
	            execIframe.contentWindow.location = 'gap://ready';
	        } else {
	            execIframe = document.createElement('iframe');
	            execIframe.style.display = 'none';
	            execIframe.src = 'gap://ready';
	            document.body.appendChild(execIframe);
	        }
	        // Use a timer to protect against iframe being unloaded during the poke (CB-7735).
	        // This makes the bridge ~ 7% slower, but works around the poke getting lost
	        // when the iframe is removed from the DOM.
	        // An onunload listener could be used in the case where the iframe has just been
	        // created, but since unload events fire only once, it doesn't work in the normal
	        // case of iframe reuse (where unload will have already fired due to the attempted
	        // navigation of the page).
	        failSafeTimerId = setTimeout(function() {
	            if (commandQueue.length) {
	                pokeNative();
	            }
	        }, 50); // Making this > 0 improves performance (marginally) in the normal case (where it doesn't fire).
	    }
	}

	iOSExec.jsToNativeModes = jsToNativeModes;

	iOSExec.setJsToNativeBridgeMode = function(mode) {
	    // Remove the iFrame since it may be no longer required, and its existence
	    // can trigger browser bugs.
	    // https://issues.apache.org/jira/browse/CB-593
	    if (execIframe) {
	        if (execIframe.parentNode) {
	            execIframe.parentNode.removeChild(execIframe);
	        }
	        execIframe = null;
	    }
	    bridgeMode = mode;
	};

	iOSExec.nativeFetchMessages = function() {
	    // Stop listing for window detatch once native side confirms poke.
	    if (failSafeTimerId) {
	        clearTimeout(failSafeTimerId);
	        failSafeTimerId = 0;
	    }
	    // Each entry in commandQueue is a JSON string already.
	    if (!commandQueue.length) {
	        return '';
	    }
	    var json = '[' + commandQueue.join(',') + ']';
	    commandQueue.length = 0;
	    return json;
	};

	iOSExec.nativeCallback = function(callbackId, status, message, keepCallback) {
	    return iOSExec.nativeEvalAndFetch(function() {
	        var success = status === 0 || status === 1;
	        var args = convertMessageToArgsNativeToJs(message);
	        cordova.callbackFromNative(callbackId, success, status, args, keepCallback);
	    });
	};

	iOSExec.nativeEvalAndFetch = function(func) {
	    // This shouldn't be nested, but better to be safe.
	    isInContextOfEvalJs++;
	    try {
	        func();
	        return iOSExec.nativeFetchMessages();
	    } finally {
	        isInContextOfEvalJs--;
	    }
	};

	module.exports = iOSExec;

	});

	// file: src/common/exec/proxy.js
	define("cordova/exec/proxy", function(require, exports, module) {


	// internal map of proxy function
	var CommandProxyMap = {};

	module.exports = {

	    // example: cordova.commandProxy.add("Accelerometer",{getCurrentAcceleration: function(successCallback, errorCallback, options) {...},...);
	    add:function(id,proxyObj) {
	        console.log("adding proxy for " + id);
	        CommandProxyMap[id] = proxyObj;
	        return proxyObj;
	    },

	    // cordova.commandProxy.remove("Accelerometer");
	    remove:function(id) {
	        var proxy = CommandProxyMap[id];
	        delete CommandProxyMap[id];
	        CommandProxyMap[id] = null;
	        return proxy;
	    },

	    get:function(service,action) {
	        return ( CommandProxyMap[service] ? CommandProxyMap[service][action] : null );
	    }
	};
	});

	// file: src/common/init.js
	define("cordova/init", function(require, exports, module) {

	var channel = require('cordova/channel');
	var cordova = require('cordova');
	var modulemapper = require('cordova/modulemapper');
	var platform = require('cordova/platform');
	var pluginloader = require('cordova/pluginloader');
	var utils = require('cordova/utils');

	var platformInitChannelsArray = [channel.onNativeReady, channel.onPluginsReady];

	function logUnfiredChannels(arr) {
	    for (var i = 0; i < arr.length; ++i) {
	        if (arr[i].state != 2) {
	            console.log('Channel not fired: ' + arr[i].type);
	        }
	    }
	}

	window.setTimeout(function() {
	    if (channel.onDeviceReady.state != 2) {
	        console.log('deviceready has not fired after 5 seconds.');
	        logUnfiredChannels(platformInitChannelsArray);
	        logUnfiredChannels(channel.deviceReadyChannelsArray);
	    }
	}, 5000);

	// Replace navigator before any modules are required(), to ensure it happens as soon as possible.
	// We replace it so that properties that can't be clobbered can instead be overridden.
	function replaceNavigator(origNavigator) {
	    var CordovaNavigator = function() {};
	    CordovaNavigator.prototype = origNavigator;
	    var newNavigator = new CordovaNavigator();
	    // This work-around really only applies to new APIs that are newer than Function.bind.
	    // Without it, APIs such as getGamepads() break.
	    if (CordovaNavigator.bind) {
	        for (var key in origNavigator) {
	            if (typeof origNavigator[key] == 'function') {
	                newNavigator[key] = origNavigator[key].bind(origNavigator);
	            }
	            else {
	                (function(k) {
	                    utils.defineGetterSetter(newNavigator,key,function() {
	                        return origNavigator[k];
	                    });
	                })(key);
	            }
	        }
	    }
	    return newNavigator;
	}

	if (window.navigator) {
	    window.navigator = replaceNavigator(window.navigator);
	}

	if (!window.console) {
	    window.console = {
	        log: function(){}
	    };
	}
	if (!window.console.warn) {
	    window.console.warn = function(msg) {
	        this.log("warn: " + msg);
	    };
	}

	// Register pause, resume and deviceready channels as events on document.
	channel.onPause = cordova.addDocumentEventHandler('pause');
	channel.onResume = cordova.addDocumentEventHandler('resume');
	channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');

	// Listen for DOMContentLoaded and notify our channel subscribers.
	if (document.readyState == 'complete' || document.readyState == 'interactive') {
	    channel.onDOMContentLoaded.fire();
	} else {
	    document.addEventListener('DOMContentLoaded', function() {
	        channel.onDOMContentLoaded.fire();
	    }, false);
	}

	// _nativeReady is global variable that the native side can set
	// to signify that the native code is ready. It is a global since
	// it may be called before any cordova JS is ready.
	if (window._nativeReady) {
	    channel.onNativeReady.fire();
	}

	modulemapper.clobbers('cordova', 'cordova');
	modulemapper.clobbers('cordova/exec', 'cordova.exec');
	modulemapper.clobbers('cordova/exec', 'Cordova.exec');

	// Call the platform-specific initialization.
	platform.bootstrap && platform.bootstrap();

	// Wrap in a setTimeout to support the use-case of having plugin JS appended to cordova.js.
	// The delay allows the attached modules to be defined before the plugin loader looks for them.
	setTimeout(function() {
	    pluginloader.load(function() {
	        channel.onPluginsReady.fire();
	    });
	}, 0);

	/**
	 * Create all cordova objects once native side is ready.
	 */
	channel.join(function() {
	    modulemapper.mapModules(window);

	    platform.initialize && platform.initialize();

	    // Fire event to notify that all objects are created
	    channel.onCordovaReady.fire();

	    // Fire onDeviceReady event once page has fully loaded, all
	    // constructors have run and cordova info has been received from native
	    // side.
	    channel.join(function() {
	        require('cordova').fireDocumentEvent('deviceready');
	    }, channel.deviceReadyChannelsArray);

	}, platformInitChannelsArray);


	});

	// file: src/common/init_b.js
	define("cordova/init_b", function(require, exports, module) {

	var channel = require('cordova/channel');
	var cordova = require('cordova');
	var platform = require('cordova/platform');
	var utils = require('cordova/utils');

	var platformInitChannelsArray = [channel.onDOMContentLoaded, channel.onNativeReady];

	// setting exec
	cordova.exec = require('cordova/exec');

	function logUnfiredChannels(arr) {
	    for (var i = 0; i < arr.length; ++i) {
	        if (arr[i].state != 2) {
	            console.log('Channel not fired: ' + arr[i].type);
	        }
	    }
	}

	window.setTimeout(function() {
	    if (channel.onDeviceReady.state != 2) {
	        console.log('deviceready has not fired after 5 seconds.');
	        logUnfiredChannels(platformInitChannelsArray);
	        logUnfiredChannels(channel.deviceReadyChannelsArray);
	    }
	}, 5000);

	// Replace navigator before any modules are required(), to ensure it happens as soon as possible.
	// We replace it so that properties that can't be clobbered can instead be overridden.
	function replaceNavigator(origNavigator) {
	    var CordovaNavigator = function() {};
	    CordovaNavigator.prototype = origNavigator;
	    var newNavigator = new CordovaNavigator();
	    // This work-around really only applies to new APIs that are newer than Function.bind.
	    // Without it, APIs such as getGamepads() break.
	    if (CordovaNavigator.bind) {
	        for (var key in origNavigator) {
	            if (typeof origNavigator[key] == 'function') {
	                newNavigator[key] = origNavigator[key].bind(origNavigator);
	            }
	            else {
	                (function(k) {
	                    utils.defineGetterSetter(newNavigator,key,function() {
	                        return origNavigator[k];
	                    });
	                })(key);
	            }
	        }
	    }
	    return newNavigator;
	}
	if (window.navigator) {
	    window.navigator = replaceNavigator(window.navigator);
	}

	if (!window.console) {
	    window.console = {
	        log: function(){}
	    };
	}
	if (!window.console.warn) {
	    window.console.warn = function(msg) {
	        this.log("warn: " + msg);
	    };
	}

	// Register pause, resume and deviceready channels as events on document.
	channel.onPause = cordova.addDocumentEventHandler('pause');
	channel.onResume = cordova.addDocumentEventHandler('resume');
	channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');

	// Listen for DOMContentLoaded and notify our channel subscribers.
	if (document.readyState == 'complete' || document.readyState == 'interactive') {
	    channel.onDOMContentLoaded.fire();
	} else {
	    document.addEventListener('DOMContentLoaded', function() {
	        channel.onDOMContentLoaded.fire();
	    }, false);
	}

	// _nativeReady is global variable that the native side can set
	// to signify that the native code is ready. It is a global since
	// it may be called before any cordova JS is ready.
	if (window._nativeReady) {
	    channel.onNativeReady.fire();
	}

	// Call the platform-specific initialization.
	platform.bootstrap && platform.bootstrap();

	/**
	 * Create all cordova objects once native side is ready.
	 */
	channel.join(function() {

	    platform.initialize && platform.initialize();

	    // Fire event to notify that all objects are created
	    channel.onCordovaReady.fire();

	    // Fire onDeviceReady event once page has fully loaded, all
	    // constructors have run and cordova info has been received from native
	    // side.
	    channel.join(function() {
	        require('cordova').fireDocumentEvent('deviceready');
	    }, channel.deviceReadyChannelsArray);

	}, platformInitChannelsArray);

	});

	// file: src/common/modulemapper.js
	define("cordova/modulemapper", function(require, exports, module) {

	var builder = require('cordova/builder'),
	    moduleMap = define.moduleMap,
	    symbolList,
	    deprecationMap;

	exports.reset = function() {
	    symbolList = [];
	    deprecationMap = {};
	};

	function addEntry(strategy, moduleName, symbolPath, opt_deprecationMessage) {
	    if (!(moduleName in moduleMap)) {
	        throw new Error('Module ' + moduleName + ' does not exist.');
	    }
	    symbolList.push(strategy, moduleName, symbolPath);
	    if (opt_deprecationMessage) {
	        deprecationMap[symbolPath] = opt_deprecationMessage;
	    }
	}

	// Note: Android 2.3 does have Function.bind().
	exports.clobbers = function(moduleName, symbolPath, opt_deprecationMessage) {
	    addEntry('c', moduleName, symbolPath, opt_deprecationMessage);
	};

	exports.merges = function(moduleName, symbolPath, opt_deprecationMessage) {
	    addEntry('m', moduleName, symbolPath, opt_deprecationMessage);
	};

	exports.defaults = function(moduleName, symbolPath, opt_deprecationMessage) {
	    addEntry('d', moduleName, symbolPath, opt_deprecationMessage);
	};

	exports.runs = function(moduleName) {
	    addEntry('r', moduleName, null);
	};

	function prepareNamespace(symbolPath, context) {
	    if (!symbolPath) {
	        return context;
	    }
	    var parts = symbolPath.split('.');
	    var cur = context;
	    for (var i = 0, part; part = parts[i]; ++i) {
	        cur = cur[part] = cur[part] || {};
	    }
	    return cur;
	}

	exports.mapModules = function(context) {
	    var origSymbols = {};
	    context.CDV_origSymbols = origSymbols;
	    for (var i = 0, len = symbolList.length; i < len; i += 3) {
	        var strategy = symbolList[i];
	        var moduleName = symbolList[i + 1];
	        var module = require(moduleName);
	        // <runs/>
	        if (strategy == 'r') {
	            continue;
	        }
	        var symbolPath = symbolList[i + 2];
	        var lastDot = symbolPath.lastIndexOf('.');
	        var namespace = symbolPath.substr(0, lastDot);
	        var lastName = symbolPath.substr(lastDot + 1);

	        var deprecationMsg = symbolPath in deprecationMap ? 'Access made to deprecated symbol: ' + symbolPath + '. ' + deprecationMsg : null;
	        var parentObj = prepareNamespace(namespace, context);
	        var target = parentObj[lastName];

	        if (strategy == 'm' && target) {
	            builder.recursiveMerge(target, module);
	        } else if ((strategy == 'd' && !target) || (strategy != 'd')) {
	            if (!(symbolPath in origSymbols)) {
	                origSymbols[symbolPath] = target;
	            }
	            builder.assignOrWrapInDeprecateGetter(parentObj, lastName, module, deprecationMsg);
	        }
	    }
	};

	exports.getOriginalSymbol = function(context, symbolPath) {
	    var origSymbols = context.CDV_origSymbols;
	    if (origSymbols && (symbolPath in origSymbols)) {
	        return origSymbols[symbolPath];
	    }
	    var parts = symbolPath.split('.');
	    var obj = context;
	    for (var i = 0; i < parts.length; ++i) {
	        obj = obj && obj[parts[i]];
	    }
	    return obj;
	};

	exports.reset();


	});

	// file: src/ios/platform.js
	define("cordova/platform", function(require, exports, module) {

	module.exports = {
	    id: 'ios',
	    bootstrap: function() {
	        require('cordova/channel').onNativeReady.fire();
	    }
	};


	});

	// file: src/common/pluginloader.js
	define("cordova/pluginloader", function(require, exports, module) {

	var modulemapper = require('cordova/modulemapper');
	var urlutil = require('cordova/urlutil');

	// Helper function to inject a <script> tag.
	// Exported for testing.
	exports.injectScript = function(url, onload, onerror) {
	    var script = document.createElement("script");
	    // onload fires even when script fails loads with an error.
	    script.onload = onload;
	    // onerror fires for malformed URLs.
	    script.onerror = onerror;
	    script.src = url;
	    document.head.appendChild(script);
	};

	function injectIfNecessary(id, url, onload, onerror) {
	    onerror = onerror || onload;
	    if (id in define.moduleMap) {
	        onload();
	    } else {
	        exports.injectScript(url, function() {
	            if (id in define.moduleMap) {
	                onload();
	            } else {
	                onerror();
	            }
	        }, onerror);
	    }
	}

	function onScriptLoadingComplete(moduleList, finishPluginLoading) {
	    // Loop through all the plugins and then through their clobbers and merges.
	    for (var i = 0, module; module = moduleList[i]; i++) {
	        if (module.clobbers && module.clobbers.length) {
	            for (var j = 0; j < module.clobbers.length; j++) {
	                modulemapper.clobbers(module.id, module.clobbers[j]);
	            }
	        }

	        if (module.merges && module.merges.length) {
	            for (var k = 0; k < module.merges.length; k++) {
	                modulemapper.merges(module.id, module.merges[k]);
	            }
	        }

	        // Finally, if runs is truthy we want to simply require() the module.
	        if (module.runs) {
	            modulemapper.runs(module.id);
	        }
	    }

	    finishPluginLoading();
	}

	// Handler for the cordova_plugins.js content.
	// See plugman's plugin_loader.js for the details of this object.
	// This function is only called if the really is a plugins array that isn't empty.
	// Otherwise the onerror response handler will just call finishPluginLoading().
	function handlePluginsObject(path, moduleList, finishPluginLoading) {
	    // Now inject the scripts.
	    var scriptCounter = moduleList.length;

	    if (!scriptCounter) {
	        finishPluginLoading();
	        return;
	    }
	    function scriptLoadedCallback() {
	        if (!--scriptCounter) {
	            onScriptLoadingComplete(moduleList, finishPluginLoading);
	        }
	    }

	    for (var i = 0; i < moduleList.length; i++) {
	        injectIfNecessary(moduleList[i].id, path + moduleList[i].file, scriptLoadedCallback);
	    }
	}

	function findCordovaPath() {
	    var path = null;
	    var scripts = document.getElementsByTagName('script');
	    var term = '/cordova.js';
	    for (var n = scripts.length-1; n>-1; n--) {
	        var src = scripts[n].src.replace(/\?.*$/, ''); // Strip any query param (CB-6007).
	        if (src.indexOf(term) == (src.length - term.length)) {
	            path = src.substring(0, src.length - term.length) + '/';
	            break;
	        }
	    }
	    return path;
	}

	// Tries to load all plugins' js-modules.
	// This is an async process, but onDeviceReady is blocked on onPluginsReady.
	// onPluginsReady is fired when there are no plugins to load, or they are all done.
	exports.load = function(callback) {
	    var pathPrefix = findCordovaPath();
	    if (pathPrefix === null) {
	        console.log('Could not find cordova.js script tag. Plugin loading may fail.');
	        pathPrefix = '';
	    }
	    injectIfNecessary('cordova/plugin_list', pathPrefix + 'cordova_plugins.js', function() {
	        var moduleList = require("cordova/plugin_list");
	        handlePluginsObject(pathPrefix, moduleList, callback);
	    }, callback);
	};


	});

	// file: src/common/urlutil.js
	define("cordova/urlutil", function(require, exports, module) {


	/**
	 * For already absolute URLs, returns what is passed in.
	 * For relative URLs, converts them to absolute ones.
	 */
	exports.makeAbsolute = function makeAbsolute(url) {
	    var anchorEl = document.createElement('a');
	    anchorEl.href = url;
	    return anchorEl.href;
	};


	});

	// file: src/common/utils.js
	define("cordova/utils", function(require, exports, module) {

	var utils = exports;

	/**
	 * Defines a property getter / setter for obj[key].
	 */
	utils.defineGetterSetter = function(obj, key, getFunc, opt_setFunc) {
	    if (Object.defineProperty) {
	        var desc = {
	            get: getFunc,
	            configurable: true
	        };
	        if (opt_setFunc) {
	            desc.set = opt_setFunc;
	        }
	        Object.defineProperty(obj, key, desc);
	    } else {
	        obj.__defineGetter__(key, getFunc);
	        if (opt_setFunc) {
	            obj.__defineSetter__(key, opt_setFunc);
	        }
	    }
	};

	/**
	 * Defines a property getter for obj[key].
	 */
	utils.defineGetter = utils.defineGetterSetter;

	utils.arrayIndexOf = function(a, item) {
	    if (a.indexOf) {
	        return a.indexOf(item);
	    }
	    var len = a.length;
	    for (var i = 0; i < len; ++i) {
	        if (a[i] == item) {
	            return i;
	        }
	    }
	    return -1;
	};

	/**
	 * Returns whether the item was found in the array.
	 */
	utils.arrayRemove = function(a, item) {
	    var index = utils.arrayIndexOf(a, item);
	    if (index != -1) {
	        a.splice(index, 1);
	    }
	    return index != -1;
	};

	utils.typeName = function(val) {
	    return Object.prototype.toString.call(val).slice(8, -1);
	};

	/**
	 * Returns an indication of whether the argument is an array or not
	 */
	utils.isArray = function(a) {
	    return utils.typeName(a) == 'Array';
	};

	/**
	 * Returns an indication of whether the argument is a Date or not
	 */
	utils.isDate = function(d) {
	    return utils.typeName(d) == 'Date';
	};

	/**
	 * Does a deep clone of the object.
	 */
	utils.clone = function(obj) {
	    if(!obj || typeof obj == 'function' || utils.isDate(obj) || typeof obj != 'object') {
	        return obj;
	    }

	    var retVal, i;

	    if(utils.isArray(obj)){
	        retVal = [];
	        for(i = 0; i < obj.length; ++i){
	            retVal.push(utils.clone(obj[i]));
	        }
	        return retVal;
	    }

	    retVal = {};
	    for(i in obj){
	        if(!(i in retVal) || retVal[i] != obj[i]) {
	            retVal[i] = utils.clone(obj[i]);
	        }
	    }
	    return retVal;
	};

	/**
	 * Returns a wrapped version of the function
	 */
	utils.close = function(context, func, params) {
	    if (typeof params == 'undefined') {
	        return function() {
	            return func.apply(context, arguments);
	        };
	    } else {
	        return function() {
	            return func.apply(context, params);
	        };
	    }
	};

	/**
	 * Create a UUID
	 */
	utils.createUUID = function() {
	    return UUIDcreatePart(4) + '-' +
	        UUIDcreatePart(2) + '-' +
	        UUIDcreatePart(2) + '-' +
	        UUIDcreatePart(2) + '-' +
	        UUIDcreatePart(6);
	};

	/**
	 * Extends a child object from a parent object using classical inheritance
	 * pattern.
	 */
	utils.extend = (function() {
	    // proxy used to establish prototype chain
	    var F = function() {};
	    // extend Child from Parent
	    return function(Child, Parent) {
	        F.prototype = Parent.prototype;
	        Child.prototype = new F();
	        Child.__super__ = Parent.prototype;
	        Child.prototype.constructor = Child;
	    };
	}());

	/**
	 * Alerts a message in any available way: alert or console.log.
	 */
	utils.alert = function(msg) {
	    if (window.alert) {
	        window.alert(msg);
	    } else if (console && console.log) {
	        console.log(msg);
	    }
	};


	//------------------------------------------------------------------------------
	function UUIDcreatePart(length) {
	    var uuidpart = "";
	    for (var i=0; i<length; i++) {
	        var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
	        if (uuidchar.length == 1) {
	            uuidchar = "0" + uuidchar;
	        }
	        uuidpart += uuidchar;
	    }
	    return uuidpart;
	}


	});

	window.cordova = require('cordova');
	// file: src/scripts/bootstrap.js

	require('cordova/init');

	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(3)
	var ieee754 = __webpack_require__(4)
	var isArray = __webpack_require__(5)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 4 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(Buffer) {// Platform: android
	// 23738581906992092a43ad2e643b1e0c43bba38a
	/*
	 Licensed to the Apache Software Foundation (ASF) under one
	 or more contributor license agreements.  See the NOTICE file
	 distributed with this work for additional information
	 regarding copyright ownership.  The ASF licenses this file
	 to you under the Apache License, Version 2.0 (the
	 "License"); you may not use this file except in compliance
	 with the License.  You may obtain a copy of the License at
	 
	     http://www.apache.org/licenses/LICENSE-2.0
	 
	 Unless required by applicable law or agreed to in writing,
	 software distributed under the License is distributed on an
	 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 KIND, either express or implied.  See the License for the
	 specific language governing permissions and limitations
	 under the License.
	*/
	;(function() {
	var PLATFORM_VERSION_BUILD_LABEL = '4.0.2';
	// file: src/scripts/require.js

	/*jshint -W079 */
	/*jshint -W020 */

	var require,
	    define;

	(function () {
	    var modules = {},
	    // Stack of moduleIds currently being built.
	        requireStack = [],
	    // Map of module ID -> index into requireStack of modules currently being built.
	        inProgressModules = {},
	        SEPARATOR = ".";



	    function build(module) {
	        var factory = module.factory,
	            localRequire = function (id) {
	                var resultantId = id;
	                //Its a relative path, so lop off the last portion and add the id (minus "./")
	                if (id.charAt(0) === ".") {
	                    resultantId = module.id.slice(0, module.id.lastIndexOf(SEPARATOR)) + SEPARATOR + id.slice(2);
	                }
	                return require(resultantId);
	            };
	        module.exports = {};
	        delete module.factory;
	        factory(localRequire, module.exports, module);
	        return module.exports;
	    }

	    require = function (id) {
	        if (!modules[id]) {
	            throw "module " + id + " not found";
	        } else if (id in inProgressModules) {
	            var cycle = requireStack.slice(inProgressModules[id]).join('->') + '->' + id;
	            throw "Cycle in require graph: " + cycle;
	        }
	        if (modules[id].factory) {
	            try {
	                inProgressModules[id] = requireStack.length;
	                requireStack.push(id);
	                return build(modules[id]);
	            } finally {
	                delete inProgressModules[id];
	                requireStack.pop();
	            }
	        }
	        return modules[id].exports;
	    };

	    define = function (id, factory) {
	        if (modules[id]) {
	            throw "module " + id + " already defined";
	        }

	        modules[id] = {
	            id: id,
	            factory: factory
	        };
	    };

	    define.remove = function (id) {
	        delete modules[id];
	    };

	    define.moduleMap = modules;
	})();

	//Export for use in node
	if (typeof module === "object" && typeof require === "function") {
	    module.exports.require = require;
	    module.exports.define = define;
	}

	// file: src/cordova.js
	define("cordova", function(require, exports, module) {

	if(window.cordova){
	    throw new Error("cordova already defined");
	}


	var channel = require('cordova/channel');
	var platform = require('cordova/platform');


	/**
	 * Intercept calls to addEventListener + removeEventListener and handle deviceready,
	 * resume, and pause events.
	 */
	var m_document_addEventListener = document.addEventListener;
	var m_document_removeEventListener = document.removeEventListener;
	var m_window_addEventListener = window.addEventListener;
	var m_window_removeEventListener = window.removeEventListener;

	/**
	 * Houses custom event handlers to intercept on document + window event listeners.
	 */
	var documentEventHandlers = {},
	    windowEventHandlers = {};

	document.addEventListener = function(evt, handler, capture) {
	    var e = evt.toLowerCase();
	    if (typeof documentEventHandlers[e] != 'undefined') {
	        documentEventHandlers[e].subscribe(handler);
	    } else {
	        m_document_addEventListener.call(document, evt, handler, capture);
	    }
	};

	window.addEventListener = function(evt, handler, capture) {
	    var e = evt.toLowerCase();
	    if (typeof windowEventHandlers[e] != 'undefined') {
	        windowEventHandlers[e].subscribe(handler);
	    } else {
	        m_window_addEventListener.call(window, evt, handler, capture);
	    }
	};

	document.removeEventListener = function(evt, handler, capture) {
	    var e = evt.toLowerCase();
	    // If unsubscribing from an event that is handled by a plugin
	    if (typeof documentEventHandlers[e] != "undefined") {
	        documentEventHandlers[e].unsubscribe(handler);
	    } else {
	        m_document_removeEventListener.call(document, evt, handler, capture);
	    }
	};

	window.removeEventListener = function(evt, handler, capture) {
	    var e = evt.toLowerCase();
	    // If unsubscribing from an event that is handled by a plugin
	    if (typeof windowEventHandlers[e] != "undefined") {
	        windowEventHandlers[e].unsubscribe(handler);
	    } else {
	        m_window_removeEventListener.call(window, evt, handler, capture);
	    }
	};

	function createEvent(type, data) {
	    var event = document.createEvent('Events');
	    event.initEvent(type, false, false);
	    if (data) {
	        for (var i in data) {
	            if (data.hasOwnProperty(i)) {
	                event[i] = data[i];
	            }
	        }
	    }
	    return event;
	}


	var cordova = {
	    define:define,
	    require:require,
	    version:PLATFORM_VERSION_BUILD_LABEL,
	    platformVersion:PLATFORM_VERSION_BUILD_LABEL,
	    platformId:platform.id,
	    /**
	     * Methods to add/remove your own addEventListener hijacking on document + window.
	     */
	    addWindowEventHandler:function(event) {
	        return (windowEventHandlers[event] = channel.create(event));
	    },
	    addStickyDocumentEventHandler:function(event) {
	        return (documentEventHandlers[event] = channel.createSticky(event));
	    },
	    addDocumentEventHandler:function(event) {
	        return (documentEventHandlers[event] = channel.create(event));
	    },
	    removeWindowEventHandler:function(event) {
	        delete windowEventHandlers[event];
	    },
	    removeDocumentEventHandler:function(event) {
	        delete documentEventHandlers[event];
	    },
	    /**
	     * Retrieve original event handlers that were replaced by Cordova
	     *
	     * @return object
	     */
	    getOriginalHandlers: function() {
	        return {'document': {'addEventListener': m_document_addEventListener, 'removeEventListener': m_document_removeEventListener},
	        'window': {'addEventListener': m_window_addEventListener, 'removeEventListener': m_window_removeEventListener}};
	    },
	    /**
	     * Method to fire event from native code
	     * bNoDetach is required for events which cause an exception which needs to be caught in native code
	     */
	    fireDocumentEvent: function(type, data, bNoDetach) {
	        var evt = createEvent(type, data);
	        if (typeof documentEventHandlers[type] != 'undefined') {
	            if( bNoDetach ) {
	                documentEventHandlers[type].fire(evt);
	            }
	            else {
	                setTimeout(function() {
	                    // Fire deviceready on listeners that were registered before cordova.js was loaded.
	                    if (type == 'deviceready') {
	                        document.dispatchEvent(evt);
	                    }
	                    documentEventHandlers[type].fire(evt);
	                }, 0);
	            }
	        } else {
	            document.dispatchEvent(evt);
	        }
	    },
	    fireWindowEvent: function(type, data) {
	        var evt = createEvent(type,data);
	        if (typeof windowEventHandlers[type] != 'undefined') {
	            setTimeout(function() {
	                windowEventHandlers[type].fire(evt);
	            }, 0);
	        } else {
	            window.dispatchEvent(evt);
	        }
	    },

	    /**
	     * Plugin callback mechanism.
	     */
	    // Randomize the starting callbackId to avoid collisions after refreshing or navigating.
	    // This way, it's very unlikely that any new callback would get the same callbackId as an old callback.
	    callbackId: Math.floor(Math.random() * 2000000000),
	    callbacks:  {},
	    callbackStatus: {
	        NO_RESULT: 0,
	        OK: 1,
	        CLASS_NOT_FOUND_EXCEPTION: 2,
	        ILLEGAL_ACCESS_EXCEPTION: 3,
	        INSTANTIATION_EXCEPTION: 4,
	        MALFORMED_URL_EXCEPTION: 5,
	        IO_EXCEPTION: 6,
	        INVALID_ACTION: 7,
	        JSON_EXCEPTION: 8,
	        ERROR: 9
	    },

	    /**
	     * Called by native code when returning successful result from an action.
	     */
	    callbackSuccess: function(callbackId, args) {
	        cordova.callbackFromNative(callbackId, true, args.status, [args.message], args.keepCallback);
	    },

	    /**
	     * Called by native code when returning error result from an action.
	     */
	    callbackError: function(callbackId, args) {
	        // TODO: Deprecate callbackSuccess and callbackError in favour of callbackFromNative.
	        // Derive success from status.
	        cordova.callbackFromNative(callbackId, false, args.status, [args.message], args.keepCallback);
	    },

	    /**
	     * Called by native code when returning the result from an action.
	     */
	    callbackFromNative: function(callbackId, isSuccess, status, args, keepCallback) {
	        try {
	            var callback = cordova.callbacks[callbackId];
	            if (callback) {
	                if (isSuccess && status == cordova.callbackStatus.OK) {
	                    callback.success && callback.success.apply(null, args);
	                } else if (!isSuccess) {
	                    callback.fail && callback.fail.apply(null, args);
	                }
	                /*
	                else
	                    Note, this case is intentionally not caught.
	                    this can happen if isSuccess is true, but callbackStatus is NO_RESULT
	                    which is used to remove a callback from the list without calling the callbacks
	                    typically keepCallback is false in this case
	                */
	                // Clear callback if not expecting any more results
	                if (!keepCallback) {
	                    delete cordova.callbacks[callbackId];
	                }
	            }
	        }
	        catch (err) {
	            var msg = "Error in " + (isSuccess ? "Success" : "Error") + " callbackId: " + callbackId + " : " + err;
	            console && console.log && console.log(msg);
	            cordova.fireWindowEvent("cordovacallbackerror", { 'message': msg });
	            throw err;
	        }
	    },
	    addConstructor: function(func) {
	        channel.onCordovaReady.subscribe(function() {
	            try {
	                func();
	            } catch(e) {
	                console.log("Failed to run constructor: " + e);
	            }
	        });
	    }
	};


	module.exports = cordova;

	});

	// file: node_modules/cordova-android/cordova-js-src/android/nativeapiprovider.js
	define("cordova/android/nativeapiprovider", function(require, exports, module) {

	/**
	 * Exports the ExposedJsApi.java object if available, otherwise exports the PromptBasedNativeApi.
	 */

	var nativeApi = this._cordovaNative || require('cordova/android/promptbasednativeapi');
	var currentApi = nativeApi;

	module.exports = {
	    get: function() { return currentApi; },
	    setPreferPrompt: function(value) {
	        currentApi = value ? require('cordova/android/promptbasednativeapi') : nativeApi;
	    },
	    // Used only by tests.
	    set: function(value) {
	        currentApi = value;
	    }
	};

	});

	// file: node_modules/cordova-android/cordova-js-src/android/promptbasednativeapi.js
	define("cordova/android/promptbasednativeapi", function(require, exports, module) {

	/**
	 * Implements the API of ExposedJsApi.java, but uses prompt() to communicate.
	 * This is used pre-JellyBean, where addJavascriptInterface() is disabled.
	 */

	module.exports = {
	    exec: function(bridgeSecret, service, action, callbackId, argsJson) {
	        return prompt(argsJson, 'gap:'+JSON.stringify([bridgeSecret, service, action, callbackId]));
	    },
	    setNativeToJsBridgeMode: function(bridgeSecret, value) {
	        prompt(value, 'gap_bridge_mode:' + bridgeSecret);
	    },
	    retrieveJsMessages: function(bridgeSecret, fromOnlineEvent) {
	        return prompt(+fromOnlineEvent, 'gap_poll:' + bridgeSecret);
	    }
	};

	});

	// file: src/common/argscheck.js
	define("cordova/argscheck", function(require, exports, module) {

	var exec = require('cordova/exec');
	var utils = require('cordova/utils');

	var moduleExports = module.exports;

	var typeMap = {
	    'A': 'Array',
	    'D': 'Date',
	    'N': 'Number',
	    'S': 'String',
	    'F': 'Function',
	    'O': 'Object'
	};

	function extractParamName(callee, argIndex) {
	    return (/.*?\((.*?)\)/).exec(callee)[1].split(', ')[argIndex];
	}

	function checkArgs(spec, functionName, args, opt_callee) {
	    if (!moduleExports.enableChecks) {
	        return;
	    }
	    var errMsg = null;
	    var typeName;
	    for (var i = 0; i < spec.length; ++i) {
	        var c = spec.charAt(i),
	            cUpper = c.toUpperCase(),
	            arg = args[i];
	        // Asterix means allow anything.
	        if (c == '*') {
	            continue;
	        }
	        typeName = utils.typeName(arg);
	        if ((arg === null || arg === undefined) && c == cUpper) {
	            continue;
	        }
	        if (typeName != typeMap[cUpper]) {
	            errMsg = 'Expected ' + typeMap[cUpper];
	            break;
	        }
	    }
	    if (errMsg) {
	        errMsg += ', but got ' + typeName + '.';
	        errMsg = 'Wrong type for parameter "' + extractParamName(opt_callee || args.callee, i) + '" of ' + functionName + ': ' + errMsg;
	        // Don't log when running unit tests.
	        if (typeof jasmine == 'undefined') {
	            console.error(errMsg);
	        }
	        throw TypeError(errMsg);
	    }
	}

	function getValue(value, defaultValue) {
	    return value === undefined ? defaultValue : value;
	}

	moduleExports.checkArgs = checkArgs;
	moduleExports.getValue = getValue;
	moduleExports.enableChecks = true;


	});

	// file: src/common/base64.js
	define("cordova/base64", function(require, exports, module) {

	var base64 = exports;

	base64.fromArrayBuffer = function(arrayBuffer) {
	    var array = new Uint8Array(arrayBuffer);
	    return uint8ToBase64(array);
	};

	base64.toArrayBuffer = function(str) {
	    var decodedStr = typeof atob != 'undefined' ? atob(str) : new Buffer(str,'base64').toString('binary');
	    var arrayBuffer = new ArrayBuffer(decodedStr.length);
	    var array = new Uint8Array(arrayBuffer);
	    for (var i=0, len=decodedStr.length; i < len; i++) {
	        array[i] = decodedStr.charCodeAt(i);
	    }
	    return arrayBuffer;
	};

	//------------------------------------------------------------------------------

	/* This code is based on the performance tests at http://jsperf.com/b64tests
	 * This 12-bit-at-a-time algorithm was the best performing version on all
	 * platforms tested.
	 */

	var b64_6bit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var b64_12bit;

	var b64_12bitTable = function() {
	    b64_12bit = [];
	    for (var i=0; i<64; i++) {
	        for (var j=0; j<64; j++) {
	            b64_12bit[i*64+j] = b64_6bit[i] + b64_6bit[j];
	        }
	    }
	    b64_12bitTable = function() { return b64_12bit; };
	    return b64_12bit;
	};

	function uint8ToBase64(rawData) {
	    var numBytes = rawData.byteLength;
	    var output="";
	    var segment;
	    var table = b64_12bitTable();
	    for (var i=0;i<numBytes-2;i+=3) {
	        segment = (rawData[i] << 16) + (rawData[i+1] << 8) + rawData[i+2];
	        output += table[segment >> 12];
	        output += table[segment & 0xfff];
	    }
	    if (numBytes - i == 2) {
	        segment = (rawData[i] << 16) + (rawData[i+1] << 8);
	        output += table[segment >> 12];
	        output += b64_6bit[(segment & 0xfff) >> 6];
	        output += '=';
	    } else if (numBytes - i == 1) {
	        segment = (rawData[i] << 16);
	        output += table[segment >> 12];
	        output += '==';
	    }
	    return output;
	}

	});

	// file: src/common/builder.js
	define("cordova/builder", function(require, exports, module) {

	var utils = require('cordova/utils');

	function each(objects, func, context) {
	    for (var prop in objects) {
	        if (objects.hasOwnProperty(prop)) {
	            func.apply(context, [objects[prop], prop]);
	        }
	    }
	}

	function clobber(obj, key, value) {
	    exports.replaceHookForTesting(obj, key);
	    var needsProperty = false;
	    try {
	        obj[key] = value;
	    } catch (e) {
	        needsProperty = true;
	    }
	    // Getters can only be overridden by getters.
	    if (needsProperty || obj[key] !== value) {
	        utils.defineGetter(obj, key, function() {
	            return value;
	        });
	    }
	}

	function assignOrWrapInDeprecateGetter(obj, key, value, message) {
	    if (message) {
	        utils.defineGetter(obj, key, function() {
	            console.log(message);
	            delete obj[key];
	            clobber(obj, key, value);
	            return value;
	        });
	    } else {
	        clobber(obj, key, value);
	    }
	}

	function include(parent, objects, clobber, merge) {
	    each(objects, function (obj, key) {
	        try {
	            var result = obj.path ? require(obj.path) : {};

	            if (clobber) {
	                // Clobber if it doesn't exist.
	                if (typeof parent[key] === 'undefined') {
	                    assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
	                } else if (typeof obj.path !== 'undefined') {
	                    // If merging, merge properties onto parent, otherwise, clobber.
	                    if (merge) {
	                        recursiveMerge(parent[key], result);
	                    } else {
	                        assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
	                    }
	                }
	                result = parent[key];
	            } else {
	                // Overwrite if not currently defined.
	                if (typeof parent[key] == 'undefined') {
	                    assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
	                } else {
	                    // Set result to what already exists, so we can build children into it if they exist.
	                    result = parent[key];
	                }
	            }

	            if (obj.children) {
	                include(result, obj.children, clobber, merge);
	            }
	        } catch(e) {
	            utils.alert('Exception building Cordova JS globals: ' + e + ' for key "' + key + '"');
	        }
	    });
	}

	/**
	 * Merge properties from one object onto another recursively.  Properties from
	 * the src object will overwrite existing target property.
	 *
	 * @param target Object to merge properties into.
	 * @param src Object to merge properties from.
	 */
	function recursiveMerge(target, src) {
	    for (var prop in src) {
	        if (src.hasOwnProperty(prop)) {
	            if (target.prototype && target.prototype.constructor === target) {
	                // If the target object is a constructor override off prototype.
	                clobber(target.prototype, prop, src[prop]);
	            } else {
	                if (typeof src[prop] === 'object' && typeof target[prop] === 'object') {
	                    recursiveMerge(target[prop], src[prop]);
	                } else {
	                    clobber(target, prop, src[prop]);
	                }
	            }
	        }
	    }
	}

	exports.buildIntoButDoNotClobber = function(objects, target) {
	    include(target, objects, false, false);
	};
	exports.buildIntoAndClobber = function(objects, target) {
	    include(target, objects, true, false);
	};
	exports.buildIntoAndMerge = function(objects, target) {
	    include(target, objects, true, true);
	};
	exports.recursiveMerge = recursiveMerge;
	exports.assignOrWrapInDeprecateGetter = assignOrWrapInDeprecateGetter;
	exports.replaceHookForTesting = function() {};

	});

	// file: src/common/channel.js
	define("cordova/channel", function(require, exports, module) {

	var utils = require('cordova/utils'),
	    nextGuid = 1;

	/**
	 * Custom pub-sub "channel" that can have functions subscribed to it
	 * This object is used to define and control firing of events for
	 * cordova initialization, as well as for custom events thereafter.
	 *
	 * The order of events during page load and Cordova startup is as follows:
	 *
	 * onDOMContentLoaded*         Internal event that is received when the web page is loaded and parsed.
	 * onNativeReady*              Internal event that indicates the Cordova native side is ready.
	 * onCordovaReady*             Internal event fired when all Cordova JavaScript objects have been created.
	 * onDeviceReady*              User event fired to indicate that Cordova is ready
	 * onResume                    User event fired to indicate a start/resume lifecycle event
	 * onPause                     User event fired to indicate a pause lifecycle event
	 *
	 * The events marked with an * are sticky. Once they have fired, they will stay in the fired state.
	 * All listeners that subscribe after the event is fired will be executed right away.
	 *
	 * The only Cordova events that user code should register for are:
	 *      deviceready           Cordova native code is initialized and Cordova APIs can be called from JavaScript
	 *      pause                 App has moved to background
	 *      resume                App has returned to foreground
	 *
	 * Listeners can be registered as:
	 *      document.addEventListener("deviceready", myDeviceReadyListener, false);
	 *      document.addEventListener("resume", myResumeListener, false);
	 *      document.addEventListener("pause", myPauseListener, false);
	 *
	 * The DOM lifecycle events should be used for saving and restoring state
	 *      window.onload
	 *      window.onunload
	 *
	 */

	/**
	 * Channel
	 * @constructor
	 * @param type  String the channel name
	 */
	var Channel = function(type, sticky) {
	    this.type = type;
	    // Map of guid -> function.
	    this.handlers = {};
	    // 0 = Non-sticky, 1 = Sticky non-fired, 2 = Sticky fired.
	    this.state = sticky ? 1 : 0;
	    // Used in sticky mode to remember args passed to fire().
	    this.fireArgs = null;
	    // Used by onHasSubscribersChange to know if there are any listeners.
	    this.numHandlers = 0;
	    // Function that is called when the first listener is subscribed, or when
	    // the last listener is unsubscribed.
	    this.onHasSubscribersChange = null;
	},
	    channel = {
	        /**
	         * Calls the provided function only after all of the channels specified
	         * have been fired. All channels must be sticky channels.
	         */
	        join: function(h, c) {
	            var len = c.length,
	                i = len,
	                f = function() {
	                    if (!(--i)) h();
	                };
	            for (var j=0; j<len; j++) {
	                if (c[j].state === 0) {
	                    throw Error('Can only use join with sticky channels.');
	                }
	                c[j].subscribe(f);
	            }
	            if (!len) h();
	        },
	        create: function(type) {
	            return channel[type] = new Channel(type, false);
	        },
	        createSticky: function(type) {
	            return channel[type] = new Channel(type, true);
	        },

	        /**
	         * cordova Channels that must fire before "deviceready" is fired.
	         */
	        deviceReadyChannelsArray: [],
	        deviceReadyChannelsMap: {},

	        /**
	         * Indicate that a feature needs to be initialized before it is ready to be used.
	         * This holds up Cordova's "deviceready" event until the feature has been initialized
	         * and Cordova.initComplete(feature) is called.
	         *
	         * @param feature {String}     The unique feature name
	         */
	        waitForInitialization: function(feature) {
	            if (feature) {
	                var c = channel[feature] || this.createSticky(feature);
	                this.deviceReadyChannelsMap[feature] = c;
	                this.deviceReadyChannelsArray.push(c);
	            }
	        },

	        /**
	         * Indicate that initialization code has completed and the feature is ready to be used.
	         *
	         * @param feature {String}     The unique feature name
	         */
	        initializationComplete: function(feature) {
	            var c = this.deviceReadyChannelsMap[feature];
	            if (c) {
	                c.fire();
	            }
	        }
	    };

	function forceFunction(f) {
	    if (typeof f != 'function') throw "Function required as first argument!";
	}

	/**
	 * Subscribes the given function to the channel. Any time that
	 * Channel.fire is called so too will the function.
	 * Optionally specify an execution context for the function
	 * and a guid that can be used to stop subscribing to the channel.
	 * Returns the guid.
	 */
	Channel.prototype.subscribe = function(f, c) {
	    // need a function to call
	    forceFunction(f);
	    if (this.state == 2) {
	        f.apply(c || this, this.fireArgs);
	        return;
	    }

	    var func = f,
	        guid = f.observer_guid;
	    if (typeof c == "object") { func = utils.close(c, f); }

	    if (!guid) {
	        // first time any channel has seen this subscriber
	        guid = '' + nextGuid++;
	    }
	    func.observer_guid = guid;
	    f.observer_guid = guid;

	    // Don't add the same handler more than once.
	    if (!this.handlers[guid]) {
	        this.handlers[guid] = func;
	        this.numHandlers++;
	        if (this.numHandlers == 1) {
	            this.onHasSubscribersChange && this.onHasSubscribersChange();
	        }
	    }
	};

	/**
	 * Unsubscribes the function with the given guid from the channel.
	 */
	Channel.prototype.unsubscribe = function(f) {
	    // need a function to unsubscribe
	    forceFunction(f);

	    var guid = f.observer_guid,
	        handler = this.handlers[guid];
	    if (handler) {
	        delete this.handlers[guid];
	        this.numHandlers--;
	        if (this.numHandlers === 0) {
	            this.onHasSubscribersChange && this.onHasSubscribersChange();
	        }
	    }
	};

	/**
	 * Calls all functions subscribed to this channel.
	 */
	Channel.prototype.fire = function(e) {
	    var fail = false,
	        fireArgs = Array.prototype.slice.call(arguments);
	    // Apply stickiness.
	    if (this.state == 1) {
	        this.state = 2;
	        this.fireArgs = fireArgs;
	    }
	    if (this.numHandlers) {
	        // Copy the values first so that it is safe to modify it from within
	        // callbacks.
	        var toCall = [];
	        for (var item in this.handlers) {
	            toCall.push(this.handlers[item]);
	        }
	        for (var i = 0; i < toCall.length; ++i) {
	            toCall[i].apply(this, fireArgs);
	        }
	        if (this.state == 2 && this.numHandlers) {
	            this.numHandlers = 0;
	            this.handlers = {};
	            this.onHasSubscribersChange && this.onHasSubscribersChange();
	        }
	    }
	};


	// defining them here so they are ready super fast!
	// DOM event that is received when the web page is loaded and parsed.
	channel.createSticky('onDOMContentLoaded');

	// Event to indicate the Cordova native side is ready.
	channel.createSticky('onNativeReady');

	// Event to indicate that all Cordova JavaScript objects have been created
	// and it's time to run plugin constructors.
	channel.createSticky('onCordovaReady');

	// Event to indicate that all automatically loaded JS plugins are loaded and ready.
	// FIXME remove this
	channel.createSticky('onPluginsReady');

	// Event to indicate that Cordova is ready
	channel.createSticky('onDeviceReady');

	// Event to indicate a resume lifecycle event
	channel.create('onResume');

	// Event to indicate a pause lifecycle event
	channel.create('onPause');

	// Channels that must fire before "deviceready" is fired.
	channel.waitForInitialization('onCordovaReady');
	channel.waitForInitialization('onDOMContentLoaded');

	module.exports = channel;

	});

	// file: node_modules/cordova-android/cordova-js-src/exec.js
	define("cordova/exec", function(require, exports, module) {

	/**
	 * Execute a cordova command.  It is up to the native side whether this action
	 * is synchronous or asynchronous.  The native side can return:
	 *      Synchronous: PluginResult object as a JSON string
	 *      Asynchronous: Empty string ""
	 * If async, the native side will cordova.callbackSuccess or cordova.callbackError,
	 * depending upon the result of the action.
	 *
	 * @param {Function} success    The success callback
	 * @param {Function} fail       The fail callback
	 * @param {String} service      The name of the service to use
	 * @param {String} action       Action to be run in cordova
	 * @param {String[]} [args]     Zero or more arguments to pass to the method
	 */
	var cordova = require('cordova'),
	    nativeApiProvider = require('cordova/android/nativeapiprovider'),
	    utils = require('cordova/utils'),
	    base64 = require('cordova/base64'),
	    channel = require('cordova/channel'),
	    jsToNativeModes = {
	        PROMPT: 0,
	        JS_OBJECT: 1
	    },
	    nativeToJsModes = {
	        // Polls for messages using the JS->Native bridge.
	        POLLING: 0,
	        // For LOAD_URL to be viable, it would need to have a work-around for
	        // the bug where the soft-keyboard gets dismissed when a message is sent.
	        LOAD_URL: 1,
	        // For the ONLINE_EVENT to be viable, it would need to intercept all event
	        // listeners (both through addEventListener and window.ononline) as well
	        // as set the navigator property itself.
	        ONLINE_EVENT: 2,
	        // Uses reflection to access private APIs of the WebView that can send JS
	        // to be executed.
	        // Requires Android 3.2.4 or above.
	        PRIVATE_API: 3
	    },
	    jsToNativeBridgeMode,  // Set lazily.
	    nativeToJsBridgeMode = nativeToJsModes.ONLINE_EVENT,
	    pollEnabled = false,
	    bridgeSecret = -1;

	var messagesFromNative = [];
	var isProcessing = false;
	var resolvedPromise = typeof Promise == 'undefined' ? null : Promise.resolve();
	var nextTick = resolvedPromise ? function(fn) { resolvedPromise.then(fn); } : function(fn) { setTimeout(fn); };

	function androidExec(success, fail, service, action, args) {
	    if (bridgeSecret < 0) {
	        // If we ever catch this firing, we'll need to queue up exec()s
	        // and fire them once we get a secret. For now, I don't think
	        // it's possible for exec() to be called since plugins are parsed but
	        // not run until until after onNativeReady.
	        throw new Error('exec() called without bridgeSecret');
	    }
	    // Set default bridge modes if they have not already been set.
	    // By default, we use the failsafe, since addJavascriptInterface breaks too often
	    if (jsToNativeBridgeMode === undefined) {
	        androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
	    }

	    // Process any ArrayBuffers in the args into a string.
	    for (var i = 0; i < args.length; i++) {
	        if (utils.typeName(args[i]) == 'ArrayBuffer') {
	            args[i] = base64.fromArrayBuffer(args[i]);
	        }
	    }

	    var callbackId = service + cordova.callbackId++,
	        argsJson = JSON.stringify(args);

	    if (success || fail) {
	        cordova.callbacks[callbackId] = {success:success, fail:fail};
	    }

	    var msgs = nativeApiProvider.get().exec(bridgeSecret, service, action, callbackId, argsJson);
	    // If argsJson was received by Java as null, try again with the PROMPT bridge mode.
	    // This happens in rare circumstances, such as when certain Unicode characters are passed over the bridge on a Galaxy S2.  See CB-2666.
	    if (jsToNativeBridgeMode == jsToNativeModes.JS_OBJECT && msgs === "@Null arguments.") {
	        androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT);
	        androidExec(success, fail, service, action, args);
	        androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
	    } else if (msgs) {
	        messagesFromNative.push(msgs);
	        // Always process async to avoid exceptions messing up stack.
	        nextTick(processMessages);
	    }
	}

	androidExec.init = function() {
	    bridgeSecret = +prompt('', 'gap_init:' + nativeToJsBridgeMode);
	    channel.onNativeReady.fire();
	};

	function pollOnceFromOnlineEvent() {
	    pollOnce(true);
	}

	function pollOnce(opt_fromOnlineEvent) {
	    if (bridgeSecret < 0) {
	        // This can happen when the NativeToJsMessageQueue resets the online state on page transitions.
	        // We know there's nothing to retrieve, so no need to poll.
	        return;
	    }
	    var msgs = nativeApiProvider.get().retrieveJsMessages(bridgeSecret, !!opt_fromOnlineEvent);
	    if (msgs) {
	        messagesFromNative.push(msgs);
	        // Process sync since we know we're already top-of-stack.
	        processMessages();
	    }
	}

	function pollingTimerFunc() {
	    if (pollEnabled) {
	        pollOnce();
	        setTimeout(pollingTimerFunc, 50);
	    }
	}

	function hookOnlineApis() {
	    function proxyEvent(e) {
	        cordova.fireWindowEvent(e.type);
	    }
	    // The network module takes care of firing online and offline events.
	    // It currently fires them only on document though, so we bridge them
	    // to window here (while first listening for exec()-releated online/offline
	    // events).
	    window.addEventListener('online', pollOnceFromOnlineEvent, false);
	    window.addEventListener('offline', pollOnceFromOnlineEvent, false);
	    cordova.addWindowEventHandler('online');
	    cordova.addWindowEventHandler('offline');
	    document.addEventListener('online', proxyEvent, false);
	    document.addEventListener('offline', proxyEvent, false);
	}

	hookOnlineApis();

	androidExec.jsToNativeModes = jsToNativeModes;
	androidExec.nativeToJsModes = nativeToJsModes;

	androidExec.setJsToNativeBridgeMode = function(mode) {
	    if (mode == jsToNativeModes.JS_OBJECT && !window._cordovaNative) {
	        mode = jsToNativeModes.PROMPT;
	    }
	    nativeApiProvider.setPreferPrompt(mode == jsToNativeModes.PROMPT);
	    jsToNativeBridgeMode = mode;
	};

	androidExec.setNativeToJsBridgeMode = function(mode) {
	    if (mode == nativeToJsBridgeMode) {
	        return;
	    }
	    if (nativeToJsBridgeMode == nativeToJsModes.POLLING) {
	        pollEnabled = false;
	    }

	    nativeToJsBridgeMode = mode;
	    // Tell the native side to switch modes.
	    // Otherwise, it will be set by androidExec.init()
	    if (bridgeSecret >= 0) {
	        nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret, mode);
	    }

	    if (mode == nativeToJsModes.POLLING) {
	        pollEnabled = true;
	        setTimeout(pollingTimerFunc, 1);
	    }
	};

	function buildPayload(payload, message) {
	    var payloadKind = message.charAt(0);
	    if (payloadKind == 's') {
	        payload.push(message.slice(1));
	    } else if (payloadKind == 't') {
	        payload.push(true);
	    } else if (payloadKind == 'f') {
	        payload.push(false);
	    } else if (payloadKind == 'N') {
	        payload.push(null);
	    } else if (payloadKind == 'n') {
	        payload.push(+message.slice(1));
	    } else if (payloadKind == 'A') {
	        var data = message.slice(1);
	        payload.push(base64.toArrayBuffer(data));
	    } else if (payloadKind == 'S') {
	        payload.push(window.atob(message.slice(1)));
	    } else if (payloadKind == 'M') {
	        var multipartMessages = message.slice(1);
	        while (multipartMessages !== "") {
	            var spaceIdx = multipartMessages.indexOf(' ');
	            var msgLen = +multipartMessages.slice(0, spaceIdx);
	            var multipartMessage = multipartMessages.substr(spaceIdx + 1, msgLen);
	            multipartMessages = multipartMessages.slice(spaceIdx + msgLen + 1);
	            buildPayload(payload, multipartMessage);
	        }
	    } else {
	        payload.push(JSON.parse(message));
	    }
	}

	// Processes a single message, as encoded by NativeToJsMessageQueue.java.
	function processMessage(message) {
	    var firstChar = message.charAt(0);
	    if (firstChar == 'J') {
	        // This is deprecated on the .java side. It doesn't work with CSP enabled.
	        eval(message.slice(1));
	    } else if (firstChar == 'S' || firstChar == 'F') {
	        var success = firstChar == 'S';
	        var keepCallback = message.charAt(1) == '1';
	        var spaceIdx = message.indexOf(' ', 2);
	        var status = +message.slice(2, spaceIdx);
	        var nextSpaceIdx = message.indexOf(' ', spaceIdx + 1);
	        var callbackId = message.slice(spaceIdx + 1, nextSpaceIdx);
	        var payloadMessage = message.slice(nextSpaceIdx + 1);
	        var payload = [];
	        buildPayload(payload, payloadMessage);
	        cordova.callbackFromNative(callbackId, success, status, payload, keepCallback);
	    } else {
	        console.log("processMessage failed: invalid message: " + JSON.stringify(message));
	    }
	}

	function processMessages() {
	    // Check for the reentrant case.
	    if (isProcessing) {
	        return;
	    }
	    if (messagesFromNative.length === 0) {
	        return;
	    }
	    isProcessing = true;
	    try {
	        var msg = popMessageFromQueue();
	        // The Java side can send a * message to indicate that it
	        // still has messages waiting to be retrieved.
	        if (msg == '*' && messagesFromNative.length === 0) {
	            nextTick(pollOnce);
	            return;
	        }
	        processMessage(msg);
	    } finally {
	        isProcessing = false;
	        if (messagesFromNative.length > 0) {
	            nextTick(processMessages);
	        }
	    }
	}

	function popMessageFromQueue() {
	    var messageBatch = messagesFromNative.shift();
	    if (messageBatch == '*') {
	        return '*';
	    }

	    var spaceIdx = messageBatch.indexOf(' ');
	    var msgLen = +messageBatch.slice(0, spaceIdx);
	    var message = messageBatch.substr(spaceIdx + 1, msgLen);
	    messageBatch = messageBatch.slice(spaceIdx + msgLen + 1);
	    if (messageBatch) {
	        messagesFromNative.unshift(messageBatch);
	    }
	    return message;
	}

	module.exports = androidExec;

	});

	// file: src/common/exec/proxy.js
	define("cordova/exec/proxy", function(require, exports, module) {


	// internal map of proxy function
	var CommandProxyMap = {};

	module.exports = {

	    // example: cordova.commandProxy.add("Accelerometer",{getCurrentAcceleration: function(successCallback, errorCallback, options) {...},...);
	    add:function(id,proxyObj) {
	        console.log("adding proxy for " + id);
	        CommandProxyMap[id] = proxyObj;
	        return proxyObj;
	    },

	    // cordova.commandProxy.remove("Accelerometer");
	    remove:function(id) {
	        var proxy = CommandProxyMap[id];
	        delete CommandProxyMap[id];
	        CommandProxyMap[id] = null;
	        return proxy;
	    },

	    get:function(service,action) {
	        return ( CommandProxyMap[service] ? CommandProxyMap[service][action] : null );
	    }
	};
	});

	// file: src/common/init.js
	define("cordova/init", function(require, exports, module) {

	var channel = require('cordova/channel');
	var cordova = require('cordova');
	var modulemapper = require('cordova/modulemapper');
	var platform = require('cordova/platform');
	var pluginloader = require('cordova/pluginloader');
	var utils = require('cordova/utils');

	var platformInitChannelsArray = [channel.onNativeReady, channel.onPluginsReady];

	function logUnfiredChannels(arr) {
	    for (var i = 0; i < arr.length; ++i) {
	        if (arr[i].state != 2) {
	            console.log('Channel not fired: ' + arr[i].type);
	        }
	    }
	}

	window.setTimeout(function() {
	    if (channel.onDeviceReady.state != 2) {
	        console.log('deviceready has not fired after 5 seconds.');
	        logUnfiredChannels(platformInitChannelsArray);
	        logUnfiredChannels(channel.deviceReadyChannelsArray);
	    }
	}, 5000);

	// Replace navigator before any modules are required(), to ensure it happens as soon as possible.
	// We replace it so that properties that can't be clobbered can instead be overridden.
	function replaceNavigator(origNavigator) {
	    var CordovaNavigator = function() {};
	    CordovaNavigator.prototype = origNavigator;
	    var newNavigator = new CordovaNavigator();
	    // This work-around really only applies to new APIs that are newer than Function.bind.
	    // Without it, APIs such as getGamepads() break.
	    if (CordovaNavigator.bind) {
	        for (var key in origNavigator) {
	            if (typeof origNavigator[key] == 'function') {
	                newNavigator[key] = origNavigator[key].bind(origNavigator);
	            }
	            else {
	                (function(k) {
	                    utils.defineGetterSetter(newNavigator,key,function() {
	                        return origNavigator[k];
	                    });
	                })(key);
	            }
	        }
	    }
	    return newNavigator;
	}

	if (window.navigator) {
	    window.navigator = replaceNavigator(window.navigator);
	}

	if (!window.console) {
	    window.console = {
	        log: function(){}
	    };
	}
	if (!window.console.warn) {
	    window.console.warn = function(msg) {
	        this.log("warn: " + msg);
	    };
	}

	// Register pause, resume and deviceready channels as events on document.
	channel.onPause = cordova.addDocumentEventHandler('pause');
	channel.onResume = cordova.addDocumentEventHandler('resume');
	channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');

	// Listen for DOMContentLoaded and notify our channel subscribers.
	if (document.readyState == 'complete' || document.readyState == 'interactive') {
	    channel.onDOMContentLoaded.fire();
	} else {
	    document.addEventListener('DOMContentLoaded', function() {
	        channel.onDOMContentLoaded.fire();
	    }, false);
	}

	// _nativeReady is global variable that the native side can set
	// to signify that the native code is ready. It is a global since
	// it may be called before any cordova JS is ready.
	if (window._nativeReady) {
	    channel.onNativeReady.fire();
	}

	modulemapper.clobbers('cordova', 'cordova');
	modulemapper.clobbers('cordova/exec', 'cordova.exec');
	modulemapper.clobbers('cordova/exec', 'Cordova.exec');

	// Call the platform-specific initialization.
	platform.bootstrap && platform.bootstrap();

	// Wrap in a setTimeout to support the use-case of having plugin JS appended to cordova.js.
	// The delay allows the attached modules to be defined before the plugin loader looks for them.
	setTimeout(function() {
	    pluginloader.load(function() {
	        channel.onPluginsReady.fire();
	    });
	}, 0);

	/**
	 * Create all cordova objects once native side is ready.
	 */
	channel.join(function() {
	    modulemapper.mapModules(window);

	    platform.initialize && platform.initialize();

	    // Fire event to notify that all objects are created
	    channel.onCordovaReady.fire();

	    // Fire onDeviceReady event once page has fully loaded, all
	    // constructors have run and cordova info has been received from native
	    // side.
	    channel.join(function() {
	        require('cordova').fireDocumentEvent('deviceready');
	    }, channel.deviceReadyChannelsArray);

	}, platformInitChannelsArray);


	});

	// file: src/common/init_b.js
	define("cordova/init_b", function(require, exports, module) {

	var channel = require('cordova/channel');
	var cordova = require('cordova');
	var platform = require('cordova/platform');
	var utils = require('cordova/utils');

	var platformInitChannelsArray = [channel.onDOMContentLoaded, channel.onNativeReady];

	// setting exec
	cordova.exec = require('cordova/exec');

	function logUnfiredChannels(arr) {
	    for (var i = 0; i < arr.length; ++i) {
	        if (arr[i].state != 2) {
	            console.log('Channel not fired: ' + arr[i].type);
	        }
	    }
	}

	window.setTimeout(function() {
	    if (channel.onDeviceReady.state != 2) {
	        console.log('deviceready has not fired after 5 seconds.');
	        logUnfiredChannels(platformInitChannelsArray);
	        logUnfiredChannels(channel.deviceReadyChannelsArray);
	    }
	}, 5000);

	// Replace navigator before any modules are required(), to ensure it happens as soon as possible.
	// We replace it so that properties that can't be clobbered can instead be overridden.
	function replaceNavigator(origNavigator) {
	    var CordovaNavigator = function() {};
	    CordovaNavigator.prototype = origNavigator;
	    var newNavigator = new CordovaNavigator();
	    // This work-around really only applies to new APIs that are newer than Function.bind.
	    // Without it, APIs such as getGamepads() break.
	    if (CordovaNavigator.bind) {
	        for (var key in origNavigator) {
	            if (typeof origNavigator[key] == 'function') {
	                newNavigator[key] = origNavigator[key].bind(origNavigator);
	            }
	            else {
	                (function(k) {
	                    utils.defineGetterSetter(newNavigator,key,function() {
	                        return origNavigator[k];
	                    });
	                })(key);
	            }
	        }
	    }
	    return newNavigator;
	}
	if (window.navigator) {
	    window.navigator = replaceNavigator(window.navigator);
	}

	if (!window.console) {
	    window.console = {
	        log: function(){}
	    };
	}
	if (!window.console.warn) {
	    window.console.warn = function(msg) {
	        this.log("warn: " + msg);
	    };
	}

	// Register pause, resume and deviceready channels as events on document.
	channel.onPause = cordova.addDocumentEventHandler('pause');
	channel.onResume = cordova.addDocumentEventHandler('resume');
	channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');

	// Listen for DOMContentLoaded and notify our channel subscribers.
	if (document.readyState == 'complete' || document.readyState == 'interactive') {
	    channel.onDOMContentLoaded.fire();
	} else {
	    document.addEventListener('DOMContentLoaded', function() {
	        channel.onDOMContentLoaded.fire();
	    }, false);
	}

	// _nativeReady is global variable that the native side can set
	// to signify that the native code is ready. It is a global since
	// it may be called before any cordova JS is ready.
	if (window._nativeReady) {
	    channel.onNativeReady.fire();
	}

	// Call the platform-specific initialization.
	platform.bootstrap && platform.bootstrap();

	/**
	 * Create all cordova objects once native side is ready.
	 */
	channel.join(function() {

	    platform.initialize && platform.initialize();

	    // Fire event to notify that all objects are created
	    channel.onCordovaReady.fire();

	    // Fire onDeviceReady event once page has fully loaded, all
	    // constructors have run and cordova info has been received from native
	    // side.
	    channel.join(function() {
	        require('cordova').fireDocumentEvent('deviceready');
	    }, channel.deviceReadyChannelsArray);

	}, platformInitChannelsArray);

	});

	// file: src/common/modulemapper.js
	define("cordova/modulemapper", function(require, exports, module) {

	var builder = require('cordova/builder'),
	    moduleMap = define.moduleMap,
	    symbolList,
	    deprecationMap;

	exports.reset = function() {
	    symbolList = [];
	    deprecationMap = {};
	};

	function addEntry(strategy, moduleName, symbolPath, opt_deprecationMessage) {
	    if (!(moduleName in moduleMap)) {
	        throw new Error('Module ' + moduleName + ' does not exist.');
	    }
	    symbolList.push(strategy, moduleName, symbolPath);
	    if (opt_deprecationMessage) {
	        deprecationMap[symbolPath] = opt_deprecationMessage;
	    }
	}

	// Note: Android 2.3 does have Function.bind().
	exports.clobbers = function(moduleName, symbolPath, opt_deprecationMessage) {
	    addEntry('c', moduleName, symbolPath, opt_deprecationMessage);
	};

	exports.merges = function(moduleName, symbolPath, opt_deprecationMessage) {
	    addEntry('m', moduleName, symbolPath, opt_deprecationMessage);
	};

	exports.defaults = function(moduleName, symbolPath, opt_deprecationMessage) {
	    addEntry('d', moduleName, symbolPath, opt_deprecationMessage);
	};

	exports.runs = function(moduleName) {
	    addEntry('r', moduleName, null);
	};

	function prepareNamespace(symbolPath, context) {
	    if (!symbolPath) {
	        return context;
	    }
	    var parts = symbolPath.split('.');
	    var cur = context;
	    for (var i = 0, part; part = parts[i]; ++i) {
	        cur = cur[part] = cur[part] || {};
	    }
	    return cur;
	}

	exports.mapModules = function(context) {
	    var origSymbols = {};
	    context.CDV_origSymbols = origSymbols;
	    for (var i = 0, len = symbolList.length; i < len; i += 3) {
	        var strategy = symbolList[i];
	        var moduleName = symbolList[i + 1];
	        var module = require(moduleName);
	        // <runs/>
	        if (strategy == 'r') {
	            continue;
	        }
	        var symbolPath = symbolList[i + 2];
	        var lastDot = symbolPath.lastIndexOf('.');
	        var namespace = symbolPath.substr(0, lastDot);
	        var lastName = symbolPath.substr(lastDot + 1);

	        var deprecationMsg = symbolPath in deprecationMap ? 'Access made to deprecated symbol: ' + symbolPath + '. ' + deprecationMsg : null;
	        var parentObj = prepareNamespace(namespace, context);
	        var target = parentObj[lastName];

	        if (strategy == 'm' && target) {
	            builder.recursiveMerge(target, module);
	        } else if ((strategy == 'd' && !target) || (strategy != 'd')) {
	            if (!(symbolPath in origSymbols)) {
	                origSymbols[symbolPath] = target;
	            }
	            builder.assignOrWrapInDeprecateGetter(parentObj, lastName, module, deprecationMsg);
	        }
	    }
	};

	exports.getOriginalSymbol = function(context, symbolPath) {
	    var origSymbols = context.CDV_origSymbols;
	    if (origSymbols && (symbolPath in origSymbols)) {
	        return origSymbols[symbolPath];
	    }
	    var parts = symbolPath.split('.');
	    var obj = context;
	    for (var i = 0; i < parts.length; ++i) {
	        obj = obj && obj[parts[i]];
	    }
	    return obj;
	};

	exports.reset();


	});

	// file: node_modules/cordova-android/cordova-js-src/platform.js
	define("cordova/platform", function(require, exports, module) {

	module.exports = {
	    id: 'android',
	    bootstrap: function() {
	        var channel = require('cordova/channel'),
	            cordova = require('cordova'),
	            exec = require('cordova/exec'),
	            modulemapper = require('cordova/modulemapper');

	        // Get the shared secret needed to use the bridge.
	        exec.init();

	        // TODO: Extract this as a proper plugin.
	        modulemapper.clobbers('cordova/plugin/android/app', 'navigator.app');

	        var APP_PLUGIN_NAME = Number(cordova.platformVersion.split('.')[0]) >= 4 ? 'CoreAndroid' : 'App';

	        // Inject a listener for the backbutton on the document.
	        var backButtonChannel = cordova.addDocumentEventHandler('backbutton');
	        backButtonChannel.onHasSubscribersChange = function() {
	            // If we just attached the first handler or detached the last handler,
	            // let native know we need to override the back button.
	            exec(null, null, APP_PLUGIN_NAME, "overrideBackbutton", [this.numHandlers == 1]);
	        };

	        // Add hardware MENU and SEARCH button handlers
	        cordova.addDocumentEventHandler('menubutton');
	        cordova.addDocumentEventHandler('searchbutton');

	        function bindButtonChannel(buttonName) {
	            // generic button bind used for volumeup/volumedown buttons
	            var volumeButtonChannel = cordova.addDocumentEventHandler(buttonName + 'button');
	            volumeButtonChannel.onHasSubscribersChange = function() {
	                exec(null, null, APP_PLUGIN_NAME, "overrideButton", [buttonName, this.numHandlers == 1]);
	            };
	        }
	        // Inject a listener for the volume buttons on the document.
	        bindButtonChannel('volumeup');
	        bindButtonChannel('volumedown');

	        // Let native code know we are all done on the JS side.
	        // Native code will then un-hide the WebView.
	        channel.onCordovaReady.subscribe(function() {
	            exec(onMessageFromNative, null, APP_PLUGIN_NAME, 'messageChannel', []);
	            exec(null, null, APP_PLUGIN_NAME, "show", []);
	        });
	    }
	};

	function onMessageFromNative(msg) {
	    var cordova = require('cordova');
	    var action = msg.action;

	    switch (action)
	    {
	        // Button events
	        case 'backbutton':
	        case 'menubutton':
	        case 'searchbutton':
	        // App life cycle events
	        case 'pause':
	        case 'resume':
	        // Volume events
	        case 'volumedownbutton':
	        case 'volumeupbutton':
	            cordova.fireDocumentEvent(action);
	            break;
	        default:
	            throw new Error('Unknown event action ' + action);
	    }
	}

	});

	// file: node_modules/cordova-android/cordova-js-src/plugin/android/app.js
	define("cordova/plugin/android/app", function(require, exports, module) {

	var exec = require('cordova/exec');
	var APP_PLUGIN_NAME = Number(require('cordova').platformVersion.split('.')[0]) >= 4 ? 'CoreAndroid' : 'App';

	module.exports = {
	    /**
	    * Clear the resource cache.
	    */
	    clearCache:function() {
	        exec(null, null, APP_PLUGIN_NAME, "clearCache", []);
	    },

	    /**
	    * Load the url into the webview or into new browser instance.
	    *
	    * @param url           The URL to load
	    * @param props         Properties that can be passed in to the activity:
	    *      wait: int                           => wait msec before loading URL
	    *      loadingDialog: "Title,Message"      => display a native loading dialog
	    *      loadUrlTimeoutValue: int            => time in msec to wait before triggering a timeout error
	    *      clearHistory: boolean              => clear webview history (default=false)
	    *      openExternal: boolean              => open in a new browser (default=false)
	    *
	    * Example:
	    *      navigator.app.loadUrl("http://server/myapp/index.html", {wait:2000, loadingDialog:"Wait,Loading App", loadUrlTimeoutValue: 60000});
	    */
	    loadUrl:function(url, props) {
	        exec(null, null, APP_PLUGIN_NAME, "loadUrl", [url, props]);
	    },

	    /**
	    * Cancel loadUrl that is waiting to be loaded.
	    */
	    cancelLoadUrl:function() {
	        exec(null, null, APP_PLUGIN_NAME, "cancelLoadUrl", []);
	    },

	    /**
	    * Clear web history in this web view.
	    * Instead of BACK button loading the previous web page, it will exit the app.
	    */
	    clearHistory:function() {
	        exec(null, null, APP_PLUGIN_NAME, "clearHistory", []);
	    },

	    /**
	    * Go to previous page displayed.
	    * This is the same as pressing the backbutton on Android device.
	    */
	    backHistory:function() {
	        exec(null, null, APP_PLUGIN_NAME, "backHistory", []);
	    },

	    /**
	    * Override the default behavior of the Android back button.
	    * If overridden, when the back button is pressed, the "backKeyDown" JavaScript event will be fired.
	    *
	    * Note: The user should not have to call this method.  Instead, when the user
	    *       registers for the "backbutton" event, this is automatically done.
	    *
	    * @param override        T=override, F=cancel override
	    */
	    overrideBackbutton:function(override) {
	        exec(null, null, APP_PLUGIN_NAME, "overrideBackbutton", [override]);
	    },

	    /**
	    * Override the default behavior of the Android volume button.
	    * If overridden, when the volume button is pressed, the "volume[up|down]button"
	    * JavaScript event will be fired.
	    *
	    * Note: The user should not have to call this method.  Instead, when the user
	    *       registers for the "volume[up|down]button" event, this is automatically done.
	    *
	    * @param button          volumeup, volumedown
	    * @param override        T=override, F=cancel override
	    */
	    overrideButton:function(button, override) {
	        exec(null, null, APP_PLUGIN_NAME, "overrideButton", [button, override]);
	    },

	    /**
	    * Exit and terminate the application.
	    */
	    exitApp:function() {
	        return exec(null, null, APP_PLUGIN_NAME, "exitApp", []);
	    }
	};

	});

	// file: src/common/pluginloader.js
	define("cordova/pluginloader", function(require, exports, module) {

	var modulemapper = require('cordova/modulemapper');
	var urlutil = require('cordova/urlutil');

	// Helper function to inject a <script> tag.
	// Exported for testing.
	exports.injectScript = function(url, onload, onerror) {
	    var script = document.createElement("script");
	    // onload fires even when script fails loads with an error.
	    script.onload = onload;
	    // onerror fires for malformed URLs.
	    script.onerror = onerror;
	    script.src = url;
	    document.head.appendChild(script);
	};

	function injectIfNecessary(id, url, onload, onerror) {
	    onerror = onerror || onload;
	    if (id in define.moduleMap) {
	        onload();
	    } else {
	        exports.injectScript(url, function() {
	            if (id in define.moduleMap) {
	                onload();
	            } else {
	                onerror();
	            }
	        }, onerror);
	    }
	}

	function onScriptLoadingComplete(moduleList, finishPluginLoading) {
	    // Loop through all the plugins and then through their clobbers and merges.
	    for (var i = 0, module; module = moduleList[i]; i++) {
	        if (module.clobbers && module.clobbers.length) {
	            for (var j = 0; j < module.clobbers.length; j++) {
	                modulemapper.clobbers(module.id, module.clobbers[j]);
	            }
	        }

	        if (module.merges && module.merges.length) {
	            for (var k = 0; k < module.merges.length; k++) {
	                modulemapper.merges(module.id, module.merges[k]);
	            }
	        }

	        // Finally, if runs is truthy we want to simply require() the module.
	        if (module.runs) {
	            modulemapper.runs(module.id);
	        }
	    }

	    finishPluginLoading();
	}

	// Handler for the cordova_plugins.js content.
	// See plugman's plugin_loader.js for the details of this object.
	// This function is only called if the really is a plugins array that isn't empty.
	// Otherwise the onerror response handler will just call finishPluginLoading().
	function handlePluginsObject(path, moduleList, finishPluginLoading) {
	    // Now inject the scripts.
	    var scriptCounter = moduleList.length;

	    if (!scriptCounter) {
	        finishPluginLoading();
	        return;
	    }
	    function scriptLoadedCallback() {
	        if (!--scriptCounter) {
	            onScriptLoadingComplete(moduleList, finishPluginLoading);
	        }
	    }

	    for (var i = 0; i < moduleList.length; i++) {
	        injectIfNecessary(moduleList[i].id, path + moduleList[i].file, scriptLoadedCallback);
	    }
	}

	function findCordovaPath() {
	    var path = null;
	    var scripts = document.getElementsByTagName('script');
	    var term = '/cordova.js';
	    for (var n = scripts.length-1; n>-1; n--) {
	        var src = scripts[n].src.replace(/\?.*$/, ''); // Strip any query param (CB-6007).
	        if (src.indexOf(term) == (src.length - term.length)) {
	            path = src.substring(0, src.length - term.length) + '/';
	            break;
	        }
	    }
	    return path;
	}

	// Tries to load all plugins' js-modules.
	// This is an async process, but onDeviceReady is blocked on onPluginsReady.
	// onPluginsReady is fired when there are no plugins to load, or they are all done.
	exports.load = function(callback) {
	    var pathPrefix = findCordovaPath();
	    if (pathPrefix === null) {
	        console.log('Could not find cordova.js script tag. Plugin loading may fail.');
	        pathPrefix = '';
	    }
	    injectIfNecessary('cordova/plugin_list', pathPrefix + 'cordova_plugins.js', function() {
	        var moduleList = require("cordova/plugin_list");
	        handlePluginsObject(pathPrefix, moduleList, callback);
	    }, callback);
	};


	});

	// file: src/common/urlutil.js
	define("cordova/urlutil", function(require, exports, module) {


	/**
	 * For already absolute URLs, returns what is passed in.
	 * For relative URLs, converts them to absolute ones.
	 */
	exports.makeAbsolute = function makeAbsolute(url) {
	    var anchorEl = document.createElement('a');
	    anchorEl.href = url;
	    return anchorEl.href;
	};


	});

	// file: src/common/utils.js
	define("cordova/utils", function(require, exports, module) {

	var utils = exports;

	/**
	 * Defines a property getter / setter for obj[key].
	 */
	utils.defineGetterSetter = function(obj, key, getFunc, opt_setFunc) {
	    if (Object.defineProperty) {
	        var desc = {
	            get: getFunc,
	            configurable: true
	        };
	        if (opt_setFunc) {
	            desc.set = opt_setFunc;
	        }
	        Object.defineProperty(obj, key, desc);
	    } else {
	        obj.__defineGetter__(key, getFunc);
	        if (opt_setFunc) {
	            obj.__defineSetter__(key, opt_setFunc);
	        }
	    }
	};

	/**
	 * Defines a property getter for obj[key].
	 */
	utils.defineGetter = utils.defineGetterSetter;

	utils.arrayIndexOf = function(a, item) {
	    if (a.indexOf) {
	        return a.indexOf(item);
	    }
	    var len = a.length;
	    for (var i = 0; i < len; ++i) {
	        if (a[i] == item) {
	            return i;
	        }
	    }
	    return -1;
	};

	/**
	 * Returns whether the item was found in the array.
	 */
	utils.arrayRemove = function(a, item) {
	    var index = utils.arrayIndexOf(a, item);
	    if (index != -1) {
	        a.splice(index, 1);
	    }
	    return index != -1;
	};

	utils.typeName = function(val) {
	    return Object.prototype.toString.call(val).slice(8, -1);
	};

	/**
	 * Returns an indication of whether the argument is an array or not
	 */
	utils.isArray = function(a) {
	    return utils.typeName(a) == 'Array';
	};

	/**
	 * Returns an indication of whether the argument is a Date or not
	 */
	utils.isDate = function(d) {
	    return utils.typeName(d) == 'Date';
	};

	/**
	 * Does a deep clone of the object.
	 */
	utils.clone = function(obj) {
	    if(!obj || typeof obj == 'function' || utils.isDate(obj) || typeof obj != 'object') {
	        return obj;
	    }

	    var retVal, i;

	    if(utils.isArray(obj)){
	        retVal = [];
	        for(i = 0; i < obj.length; ++i){
	            retVal.push(utils.clone(obj[i]));
	        }
	        return retVal;
	    }

	    retVal = {};
	    for(i in obj){
	        if(!(i in retVal) || retVal[i] != obj[i]) {
	            retVal[i] = utils.clone(obj[i]);
	        }
	    }
	    return retVal;
	};

	/**
	 * Returns a wrapped version of the function
	 */
	utils.close = function(context, func, params) {
	    if (typeof params == 'undefined') {
	        return function() {
	            return func.apply(context, arguments);
	        };
	    } else {
	        return function() {
	            return func.apply(context, params);
	        };
	    }
	};

	/**
	 * Create a UUID
	 */
	utils.createUUID = function() {
	    return UUIDcreatePart(4) + '-' +
	        UUIDcreatePart(2) + '-' +
	        UUIDcreatePart(2) + '-' +
	        UUIDcreatePart(2) + '-' +
	        UUIDcreatePart(6);
	};

	/**
	 * Extends a child object from a parent object using classical inheritance
	 * pattern.
	 */
	utils.extend = (function() {
	    // proxy used to establish prototype chain
	    var F = function() {};
	    // extend Child from Parent
	    return function(Child, Parent) {
	        F.prototype = Parent.prototype;
	        Child.prototype = new F();
	        Child.__super__ = Parent.prototype;
	        Child.prototype.constructor = Child;
	    };
	}());

	/**
	 * Alerts a message in any available way: alert or console.log.
	 */
	utils.alert = function(msg) {
	    if (window.alert) {
	        window.alert(msg);
	    } else if (console && console.log) {
	        console.log(msg);
	    }
	};


	//------------------------------------------------------------------------------
	function UUIDcreatePart(length) {
	    var uuidpart = "";
	    for (var i=0; i<length; i++) {
	        var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
	        if (uuidchar.length == 1) {
	            uuidchar = "0" + uuidchar;
	        }
	        uuidpart += uuidchar;
	    }
	    return uuidpart;
	}


	});

	window.cordova = require('cordova');
	// file: src/scripts/bootstrap.js

	require('cordova/init');

	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer))

/***/ }
/******/ ]);