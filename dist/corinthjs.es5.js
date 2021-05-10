"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('stream'), require('http'), require('url'), require('https'), require('zlib')) : typeof define === 'function' && define.amd ? define(['exports', 'stream', 'http', 'url', 'https', 'zlib'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Corinth = {}, global.Stream, global.http, global.Url, global.https, global.zlib));
})(void 0, function (exports, Stream, http, Url, https, zlib) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && _typeof2(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);

  var http__default = /*#__PURE__*/_interopDefaultLegacy(http);

  var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);

  var https__default = /*#__PURE__*/_interopDefaultLegacy(https);

  var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace(n) {
    return n && n['default'] || n;
  } // Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js
  // fix for "Readable" isn't a named export issue


  var Readable = Stream__default['default'].Readable;
  var BUFFER = Symbol('buffer');
  var TYPE = Symbol('type');

  var Blob = /*#__PURE__*/function () {
    function Blob() {
      _classCallCheck(this, Blob);

      this[TYPE] = '';
      var blobParts = arguments[0];
      var options = arguments[1];
      var buffers = [];
      var size = 0;

      if (blobParts) {
        var a = blobParts;
        var length = Number(a.length);

        for (var i = 0; i < length; i++) {
          var element = a[i];
          var buffer = void 0;

          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element[BUFFER];
          } else {
            buffer = Buffer.from(typeof element === 'string' ? element : String(element));
          }

          size += buffer.length;
          buffers.push(buffer);
        }
      }

      this[BUFFER] = Buffer.concat(buffers);
      var type = options && options.type !== undefined && String(options.type).toLowerCase();

      if (type && !/[^\u0020-\u007E]/.test(type)) {
        this[TYPE] = type;
      }
    }

    _createClass(Blob, [{
      key: "size",
      get: function get() {
        return this[BUFFER].length;
      }
    }, {
      key: "type",
      get: function get() {
        return this[TYPE];
      }
    }, {
      key: "text",
      value: function text() {
        return Promise.resolve(this[BUFFER].toString());
      }
    }, {
      key: "arrayBuffer",
      value: function arrayBuffer() {
        var buf = this[BUFFER];
        var ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return Promise.resolve(ab);
      }
    }, {
      key: "stream",
      value: function stream() {
        var readable = new Readable();

        readable._read = function () {};

        readable.push(this[BUFFER]);
        readable.push(null);
        return readable;
      }
    }, {
      key: "toString",
      value: function toString() {
        return '[object Blob]';
      }
    }, {
      key: "slice",
      value: function slice() {
        var size = this.size;
        var start = arguments[0];
        var end = arguments[1];
        var relativeStart, relativeEnd;

        if (start === undefined) {
          relativeStart = 0;
        } else if (start < 0) {
          relativeStart = Math.max(size + start, 0);
        } else {
          relativeStart = Math.min(start, size);
        }

        if (end === undefined) {
          relativeEnd = size;
        } else if (end < 0) {
          relativeEnd = Math.max(size + end, 0);
        } else {
          relativeEnd = Math.min(end, size);
        }

        var span = Math.max(relativeEnd - relativeStart, 0);
        var buffer = this[BUFFER];
        var slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        var blob = new Blob([], {
          type: arguments[2]
        });
        blob[BUFFER] = slicedBuffer;
        return blob;
      }
    }]);

    return Blob;
  }();

  Object.defineProperties(Blob.prototype, {
    size: {
      enumerable: true
    },
    type: {
      enumerable: true
    },
    slice: {
      enumerable: true
    }
  });
  Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: 'Blob',
    writable: false,
    enumerable: false,
    configurable: true
  });
  /**
   * fetch-error.js
   *
   * FetchError interface for operational errors
   */

  /**
   * Create FetchError instance
   *
   * @param   String      message      Error message for human
   * @param   String      type         Error type for machine
   * @param   String      systemError  For Node.js system error
   * @return  FetchError
   */

  function FetchError(message, type, systemError) {
    Error.call(this, message);
    this.message = message;
    this.type = type; // when err.type is `system`, err.code contains system error code

    if (systemError) {
      this.code = this.errno = systemError.code;
    } // hide custom error implementation details from end-users


    Error.captureStackTrace(this, this.constructor);
  }

  FetchError.prototype = Object.create(Error.prototype);
  FetchError.prototype.constructor = FetchError;
  FetchError.prototype.name = 'FetchError';
  var convert;

  try {
    convert = require('encoding').convert;
  } catch (e) {}

  var INTERNALS = Symbol('Body internals'); // fix an issue where "PassThrough" isn't a named export for node <10

  var PassThrough = Stream__default['default'].PassThrough;
  /**
   * Body mixin
   *
   * Ref: https://fetch.spec.whatwg.org/#body
   *
   * @param   Stream  body  Readable stream
   * @param   Object  opts  Response options
   * @return  Void
   */

  function Body(body) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$size = _ref.size;

    var size = _ref$size === undefined ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    var timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

    if (body == null) {
      // body is undefined or null
      body = null;
    } else if (isURLSearchParams(body)) {
      // body is a URLSearchParams
      body = Buffer.from(body.toString());
    } else if (isBlob(body)) ;else if (Buffer.isBuffer(body)) ;else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
      // body is ArrayBuffer
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      // body is ArrayBufferView
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream__default['default']) ;else {
      // none of the above
      // coerce to string then buffer
      body = Buffer.from(String(body));
    }

    this[INTERNALS] = {
      body: body,
      disturbed: false,
      error: null
    };
    this.size = size;
    this.timeout = timeout;

    if (body instanceof Stream__default['default']) {
      body.on('error', function (err) {
        var error = err.name === 'AbortError' ? err : new FetchError("Invalid response body while trying to fetch ".concat(_this.url, ": ").concat(err.message), 'system', err);
        _this[INTERNALS].error = error;
      });
    }
  }

  Body.prototype = {
    get body() {
      return this[INTERNALS].body;
    },

    get bodyUsed() {
      return this[INTERNALS].disturbed;
    },

    /**
     * Decode response as ArrayBuffer
     *
     * @return  Promise
     */
    arrayBuffer: function arrayBuffer() {
      return consumeBody.call(this).then(function (buf) {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      });
    },

    /**
     * Return raw response as Blob
     *
     * @return Promise
     */
    blob: function blob() {
      var ct = this.headers && this.headers.get('content-type') || '';
      return consumeBody.call(this).then(function (buf) {
        return Object.assign( // Prevent copying
        new Blob([], {
          type: ct.toLowerCase()
        }), _defineProperty({}, BUFFER, buf));
      });
    },

    /**
     * Decode response as json
     *
     * @return  Promise
     */
    json: function json() {
      var _this2 = this;

      return consumeBody.call(this).then(function (buffer) {
        try {
          return JSON.parse(buffer.toString());
        } catch (err) {
          return Body.Promise.reject(new FetchError("invalid json response body at ".concat(_this2.url, " reason: ").concat(err.message), 'invalid-json'));
        }
      });
    },

    /**
     * Decode response as text
     *
     * @return  Promise
     */
    text: function text() {
      return consumeBody.call(this).then(function (buffer) {
        return buffer.toString();
      });
    },

    /**
     * Decode response as buffer (non-spec api)
     *
     * @return  Promise
     */
    buffer: function buffer() {
      return consumeBody.call(this);
    },

    /**
     * Decode response as text, while automatically detecting the encoding and
     * trying to decode to UTF-8 (non-spec api)
     *
     * @return  Promise
     */
    textConverted: function textConverted() {
      var _this3 = this;

      return consumeBody.call(this).then(function (buffer) {
        return convertBody(buffer, _this3.headers);
      });
    }
  }; // In browsers, all properties are enumerable.

  Object.defineProperties(Body.prototype, {
    body: {
      enumerable: true
    },
    bodyUsed: {
      enumerable: true
    },
    arrayBuffer: {
      enumerable: true
    },
    blob: {
      enumerable: true
    },
    json: {
      enumerable: true
    },
    text: {
      enumerable: true
    }
  });

  Body.mixIn = function (proto) {
    var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(Body.prototype)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var name = _step.value;

        // istanbul ignore else: future proof
        if (!(name in proto)) {
          var desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
          Object.defineProperty(proto, name, desc);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  /**
   * Consume and convert an entire Body to a Buffer.
   *
   * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
   *
   * @return  Promise
   */


  function consumeBody() {
    var _this4 = this;

    if (this[INTERNALS].disturbed) {
      return Body.Promise.reject(new TypeError("body used already for: ".concat(this.url)));
    }

    this[INTERNALS].disturbed = true;

    if (this[INTERNALS].error) {
      return Body.Promise.reject(this[INTERNALS].error);
    }

    var body = this.body; // body is null

    if (body === null) {
      return Body.Promise.resolve(Buffer.alloc(0));
    } // body is blob


    if (isBlob(body)) {
      body = body.stream();
    } // body is buffer


    if (Buffer.isBuffer(body)) {
      return Body.Promise.resolve(body);
    } // istanbul ignore if: should never happen


    if (!(body instanceof Stream__default['default'])) {
      return Body.Promise.resolve(Buffer.alloc(0));
    } // body is stream
    // get ready to actually consume the body


    var accum = [];
    var accumBytes = 0;
    var abort = false;
    return new Body.Promise(function (resolve, reject) {
      var resTimeout; // allow timeout on slow response body

      if (_this4.timeout) {
        resTimeout = setTimeout(function () {
          abort = true;
          reject(new FetchError("Response timeout while trying to fetch ".concat(_this4.url, " (over ").concat(_this4.timeout, "ms)"), 'body-timeout'));
        }, _this4.timeout);
      } // handle stream errors


      body.on('error', function (err) {
        if (err.name === 'AbortError') {
          // if the request was aborted, reject with this Error
          abort = true;
          reject(err);
        } else {
          // other errors, such as incorrect content-encoding
          reject(new FetchError("Invalid response body while trying to fetch ".concat(_this4.url, ": ").concat(err.message), 'system', err));
        }
      });
      body.on('data', function (chunk) {
        if (abort || chunk === null) {
          return;
        }

        if (_this4.size && accumBytes + chunk.length > _this4.size) {
          abort = true;
          reject(new FetchError("content size at ".concat(_this4.url, " over limit: ").concat(_this4.size), 'max-size'));
          return;
        }

        accumBytes += chunk.length;
        accum.push(chunk);
      });
      body.on('end', function () {
        if (abort) {
          return;
        }

        clearTimeout(resTimeout);

        try {
          resolve(Buffer.concat(accum, accumBytes));
        } catch (err) {
          // handle streams that have accumulated too much data (issue #414)
          reject(new FetchError("Could not create Buffer from response body for ".concat(_this4.url, ": ").concat(err.message), 'system', err));
        }
      });
    });
  }
  /**
   * Detect buffer encoding and convert to target encoding
   * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
   *
   * @param   Buffer  buffer    Incoming buffer
   * @param   String  encoding  Target encoding
   * @return  String
   */


  function convertBody(buffer, headers) {
    if (typeof convert !== 'function') {
      throw new Error('The package `encoding` must be installed to use the textConverted() function');
    }

    var ct = headers.get('content-type');
    var charset = 'utf-8';
    var res, str; // header

    if (ct) {
      res = /charset=([^;]*)/i.exec(ct);
    } // no charset in content type, peek at response body for at most 1024 bytes


    str = buffer.slice(0, 1024).toString(); // html5

    if (!res && str) {
      res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    } // html4


    if (!res && str) {
      res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

      if (!res) {
        res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);

        if (res) {
          res.pop(); // drop last quote
        }
      }

      if (res) {
        res = /charset=(.*)/i.exec(res.pop());
      }
    } // xml


    if (!res && str) {
      res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    } // found charset


    if (res) {
      charset = res.pop(); // prevent decode issues when sites use incorrect encoding
      // ref: https://hsivonen.fi/encoding-menu/

      if (charset === 'gb2312' || charset === 'gbk') {
        charset = 'gb18030';
      }
    } // turn raw buffers into a single utf-8 buffer


    return convert(buffer, 'UTF-8', charset).toString();
  }
  /**
   * Detect a URLSearchParams object
   * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
   *
   * @param   Object  obj     Object to detect by type or brand
   * @return  String
   */


  function isURLSearchParams(obj) {
    // Duck-typing as a necessary condition.
    if (_typeof2(obj) !== 'object' || typeof obj.append !== 'function' || typeof obj["delete"] !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
      return false;
    } // Brand-checking and more duck-typing as optional condition.


    return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
  }
  /**
   * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
   * @param  {*} obj
   * @return {boolean}
   */


  function isBlob(obj) {
    return _typeof2(obj) === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
  }
  /**
   * Clone body given Res/Req instance
   *
   * @param   Mixed  instance  Response or Request instance
   * @return  Mixed
   */


  function _clone(instance) {
    var p1, p2;
    var body = instance.body; // don't allow cloning a used body

    if (instance.bodyUsed) {
      throw new Error('cannot clone body after it is used');
    } // check that body is a stream and not form-data object
    // note: we can't clone the form-data object without having it as a dependency


    if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
      // tee instance body
      p1 = new PassThrough();
      p2 = new PassThrough();
      body.pipe(p1);
      body.pipe(p2); // set instance body to teed body and return the other teed body

      instance[INTERNALS].body = p1;
      body = p2;
    }

    return body;
  }
  /**
   * Performs the operation "extract a `Content-Type` value from |object|" as
   * specified in the specification:
   * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
   *
   * This function assumes that instance.body is present.
   *
   * @param   Mixed  instance  Any options.body input
   */


  function extractContentType(body) {
    if (body === null) {
      // body is null
      return null;
    } else if (typeof body === 'string') {
      // body is string
      return 'text/plain;charset=UTF-8';
    } else if (isURLSearchParams(body)) {
      // body is a URLSearchParams
      return 'application/x-www-form-urlencoded;charset=UTF-8';
    } else if (isBlob(body)) {
      // body is blob
      return body.type || null;
    } else if (Buffer.isBuffer(body)) {
      // body is buffer
      return null;
    } else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
      // body is ArrayBuffer
      return null;
    } else if (ArrayBuffer.isView(body)) {
      // body is ArrayBufferView
      return null;
    } else if (typeof body.getBoundary === 'function') {
      // detect form data input from form-data module
      return "multipart/form-data;boundary=".concat(body.getBoundary());
    } else if (body instanceof Stream__default['default']) {
      // body is stream
      // can't really do much about this
      return null;
    } else {
      // Body constructor defaults other things to string
      return 'text/plain;charset=UTF-8';
    }
  }
  /**
   * The Fetch Standard treats this as if "total bytes" is a property on the body.
   * For us, we have to explicitly get it with a function.
   *
   * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
   *
   * @param   Body    instance   Instance of Body
   * @return  Number?            Number of bytes, or null if not possible
   */


  function getTotalBytes(instance) {
    var body = instance.body;

    if (body === null) {
      // body is null
      return 0;
    } else if (isBlob(body)) {
      return body.size;
    } else if (Buffer.isBuffer(body)) {
      // body is buffer
      return body.length;
    } else if (body && typeof body.getLengthSync === 'function') {
      // detect form data input from form-data module
      if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
      body.hasKnownLength && body.hasKnownLength()) {
        // 2.x
        return body.getLengthSync();
      }

      return null;
    } else {
      // body is stream
      return null;
    }
  }
  /**
   * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
   *
   * @param   Body    instance   Instance of Body
   * @return  Void
   */


  function writeToStream(dest, instance) {
    var body = instance.body;

    if (body === null) {
      // body is null
      dest.end();
    } else if (isBlob(body)) {
      body.stream().pipe(dest);
    } else if (Buffer.isBuffer(body)) {
      // body is buffer
      dest.write(body);
      dest.end();
    } else {
      // body is stream
      body.pipe(dest);
    }
  } // expose Promise


  Body.Promise = global.Promise;
  /**
   * headers.js
   *
   * Headers class offers convenient helpers
   */

  var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
  var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

  function validateName(name) {
    name = "".concat(name);

    if (invalidTokenRegex.test(name) || name === '') {
      throw new TypeError("".concat(name, " is not a legal HTTP header name"));
    }
  }

  function validateValue(value) {
    value = "".concat(value);

    if (invalidHeaderCharRegex.test(value)) {
      throw new TypeError("".concat(value, " is not a legal HTTP header value"));
    }
  }
  /**
   * Find the key in the map object given a header name.
   *
   * Returns undefined if not found.
   *
   * @param   String  name  Header name
   * @return  String|Undefined
   */


  function find(map, name) {
    name = name.toLowerCase();

    for (var key in map) {
      if (key.toLowerCase() === name) {
        return key;
      }
    }

    return undefined;
  }

  var MAP = Symbol('map');

  var Headers = /*#__PURE__*/function () {
    /**
     * Headers class
     *
     * @param   Object  headers  Response headers
     * @return  Void
     */
    function Headers() {
      _classCallCheck(this, Headers);

      var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      this[MAP] = Object.create(null);

      if (init instanceof Headers) {
        var rawHeaders = init.raw();
        var headerNames = Object.keys(rawHeaders);

        for (var _i = 0, _headerNames = headerNames; _i < _headerNames.length; _i++) {
          var headerName = _headerNames[_i];

          var _iterator2 = _createForOfIteratorHelper(rawHeaders[headerName]),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var value = _step2.value;
              this.append(headerName, value);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        return;
      } // We don't worry about converting prop to ByteString here as append()
      // will handle it.


      if (init == null) ;else if (_typeof2(init) === 'object') {
        var method = init[Symbol.iterator];

        if (method != null) {
          if (typeof method !== 'function') {
            throw new TypeError('Header pairs must be iterable');
          } // sequence<sequence<ByteString>>
          // Note: per spec we have to first exhaust the lists then process them


          var pairs = [];

          var _iterator3 = _createForOfIteratorHelper(init),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _pair = _step3.value;

              if (_typeof2(_pair) !== 'object' || typeof _pair[Symbol.iterator] !== 'function') {
                throw new TypeError('Each header pair must be iterable');
              }

              pairs.push(Array.from(_pair));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          for (var _i2 = 0, _pairs = pairs; _i2 < _pairs.length; _i2++) {
            var pair = _pairs[_i2];

            if (pair.length !== 2) {
              throw new TypeError('Each header pair must be a name/value tuple');
            }

            this.append(pair[0], pair[1]);
          }
        } else {
          // record<ByteString, ByteString>
          for (var _i3 = 0, _Object$keys = Object.keys(init); _i3 < _Object$keys.length; _i3++) {
            var key = _Object$keys[_i3];
            var _value = init[key];
            this.append(key, _value);
          }
        }
      } else {
        throw new TypeError('Provided initializer must be an object');
      }
    }
    /**
     * Return combined header value given name
     *
     * @param   String  name  Header name
     * @return  Mixed
     */


    _createClass(Headers, [{
      key: "get",
      value: function get(name) {
        name = "".concat(name);
        validateName(name);
        var key = find(this[MAP], name);

        if (key === undefined) {
          return null;
        }

        return this[MAP][key].join(', ');
      }
      /**
       * Iterate over all headers
       *
       * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
       * @param   Boolean   thisArg   `this` context for callback function
       * @return  Void
       */

    }, {
      key: "forEach",
      value: function forEach(callback) {
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var pairs = getHeaders(this);
        var i = 0;

        while (i < pairs.length) {
          var _pairs$i = pairs[i];
          var name = _pairs$i[0],
              value = _pairs$i[1];
          callback.call(thisArg, value, name, this);
          pairs = getHeaders(this);
          i++;
        }
      }
      /**
       * Overwrite header values given name
       *
       * @param   String  name   Header name
       * @param   String  value  Header value
       * @return  Void
       */

    }, {
      key: "set",
      value: function set(name, value) {
        name = "".concat(name);
        value = "".concat(value);
        validateName(name);
        validateValue(value);
        var key = find(this[MAP], name);
        this[MAP][key !== undefined ? key : name] = [value];
      }
      /**
       * Append a value onto existing header
       *
       * @param   String  name   Header name
       * @param   String  value  Header value
       * @return  Void
       */

    }, {
      key: "append",
      value: function append(name, value) {
        name = "".concat(name);
        value = "".concat(value);
        validateName(name);
        validateValue(value);
        var key = find(this[MAP], name);

        if (key !== undefined) {
          this[MAP][key].push(value);
        } else {
          this[MAP][name] = [value];
        }
      }
      /**
       * Check for header name existence
       *
       * @param   String   name  Header name
       * @return  Boolean
       */

    }, {
      key: "has",
      value: function has(name) {
        name = "".concat(name);
        validateName(name);
        return find(this[MAP], name) !== undefined;
      }
      /**
       * Delete all header values given name
       *
       * @param   String  name  Header name
       * @return  Void
       */

    }, {
      key: "delete",
      value: function _delete(name) {
        name = "".concat(name);
        validateName(name);
        var key = find(this[MAP], name);

        if (key !== undefined) {
          delete this[MAP][key];
        }
      }
      /**
       * Return raw headers (non-spec api)
       *
       * @return  Object
       */

    }, {
      key: "raw",
      value: function raw() {
        return this[MAP];
      }
      /**
       * Get an iterator on keys.
       *
       * @return  Iterator
       */

    }, {
      key: "keys",
      value: function keys() {
        return createHeadersIterator(this, 'key');
      }
      /**
       * Get an iterator on values.
       *
       * @return  Iterator
       */

    }, {
      key: "values",
      value: function values() {
        return createHeadersIterator(this, 'value');
      }
      /**
       * Get an iterator on entries.
       *
       * This is the default iterator of the Headers object.
       *
       * @return  Iterator
       */

    }, {
      key: Symbol.iterator,
      value: function value() {
        return createHeadersIterator(this, 'key+value');
      }
    }]);

    return Headers;
  }();

  Headers.prototype.entries = Headers.prototype[Symbol.iterator];
  Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    value: 'Headers',
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Headers.prototype, {
    get: {
      enumerable: true
    },
    forEach: {
      enumerable: true
    },
    set: {
      enumerable: true
    },
    append: {
      enumerable: true
    },
    has: {
      enumerable: true
    },
    "delete": {
      enumerable: true
    },
    keys: {
      enumerable: true
    },
    values: {
      enumerable: true
    },
    entries: {
      enumerable: true
    }
  });

  function getHeaders(headers) {
    var kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';
    var keys = Object.keys(headers[MAP]).sort();
    return keys.map(kind === 'key' ? function (k) {
      return k.toLowerCase();
    } : kind === 'value' ? function (k) {
      return headers[MAP][k].join(', ');
    } : function (k) {
      return [k.toLowerCase(), headers[MAP][k].join(', ')];
    });
  }

  var INTERNAL = Symbol('internal');

  function createHeadersIterator(target, kind) {
    var iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
      target: target,
      kind: kind,
      index: 0
    };
    return iterator;
  }

  var HeadersIteratorPrototype = Object.setPrototypeOf({
    next: function next() {
      // istanbul ignore if
      if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
        throw new TypeError('Value of `this` is not a HeadersIterator');
      }

      var _INTERNAL = this[INTERNAL];
      var target = _INTERNAL.target,
          kind = _INTERNAL.kind,
          index = _INTERNAL.index;
      var values = getHeaders(target, kind);
      var len = values.length;

      if (index >= len) {
        return {
          value: undefined,
          done: true
        };
      }

      this[INTERNAL].index = index + 1;
      return {
        value: values[index],
        done: false
      };
    }
  }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: 'HeadersIterator',
    writable: false,
    enumerable: false,
    configurable: true
  });
  /**
   * Export the Headers object in a form that Node.js can consume.
   *
   * @param   Headers  headers
   * @return  Object
   */

  function exportNodeCompatibleHeaders(headers) {
    var obj = Object.assign({
      __proto__: null
    }, headers[MAP]); // http.request() only supports string as Host header. This hack makes
    // specifying custom Host header possible.

    var hostHeaderKey = find(headers[MAP], 'Host');

    if (hostHeaderKey !== undefined) {
      obj[hostHeaderKey] = obj[hostHeaderKey][0];
    }

    return obj;
  }
  /**
   * Create a Headers object from an object of headers, ignoring those that do
   * not conform to HTTP grammar productions.
   *
   * @param   Object  obj  Object of headers
   * @return  Headers
   */


  function createHeadersLenient(obj) {
    var headers = new Headers();

    for (var _i4 = 0, _Object$keys2 = Object.keys(obj); _i4 < _Object$keys2.length; _i4++) {
      var name = _Object$keys2[_i4];

      if (invalidTokenRegex.test(name)) {
        continue;
      }

      if (Array.isArray(obj[name])) {
        var _iterator4 = _createForOfIteratorHelper(obj[name]),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var val = _step4.value;

            if (invalidHeaderCharRegex.test(val)) {
              continue;
            }

            if (headers[MAP][name] === undefined) {
              headers[MAP][name] = [val];
            } else {
              headers[MAP][name].push(val);
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      } else if (!invalidHeaderCharRegex.test(obj[name])) {
        headers[MAP][name] = [obj[name]];
      }
    }

    return headers;
  }

  var INTERNALS$1 = Symbol('Response internals'); // fix an issue where "STATUS_CODES" aren't a named export for node <10

  var STATUS_CODES = http__default['default'].STATUS_CODES;
  /**
   * Response class
   *
   * @param   Stream  body  Readable stream
   * @param   Object  opts  Response options
   * @return  Void
   */

  var Response = /*#__PURE__*/function () {
    function Response() {
      _classCallCheck(this, Response);

      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Body.call(this, body, opts);
      var status = opts.status || 200;
      var headers = new Headers(opts.headers);

      if (body != null && !headers.has('Content-Type')) {
        var contentType = extractContentType(body);

        if (contentType) {
          headers.append('Content-Type', contentType);
        }
      }

      this[INTERNALS$1] = {
        url: opts.url,
        status: status,
        statusText: opts.statusText || STATUS_CODES[status],
        headers: headers,
        counter: opts.counter
      };
    }

    _createClass(Response, [{
      key: "url",
      get: function get() {
        return this[INTERNALS$1].url || '';
      }
    }, {
      key: "status",
      get: function get() {
        return this[INTERNALS$1].status;
      }
      /**
       * Convenience property representing if the request ended normally
       */

    }, {
      key: "ok",
      get: function get() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
    }, {
      key: "redirected",
      get: function get() {
        return this[INTERNALS$1].counter > 0;
      }
    }, {
      key: "statusText",
      get: function get() {
        return this[INTERNALS$1].statusText;
      }
    }, {
      key: "headers",
      get: function get() {
        return this[INTERNALS$1].headers;
      }
      /**
       * Clone this response
       *
       * @return  Response
       */

    }, {
      key: "clone",
      value: function clone() {
        return new Response(_clone(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected
        });
      }
    }]);

    return Response;
  }();

  Body.mixIn(Response.prototype);
  Object.defineProperties(Response.prototype, {
    url: {
      enumerable: true
    },
    status: {
      enumerable: true
    },
    ok: {
      enumerable: true
    },
    redirected: {
      enumerable: true
    },
    statusText: {
      enumerable: true
    },
    headers: {
      enumerable: true
    },
    clone: {
      enumerable: true
    }
  });
  Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    value: 'Response',
    writable: false,
    enumerable: false,
    configurable: true
  });
  var INTERNALS$2 = Symbol('Request internals'); // fix an issue where "format", "parse" aren't a named export for node <10

  var parse_url = Url__default['default'].parse;
  var format_url = Url__default['default'].format;
  var streamDestructionSupported = ('destroy' in Stream__default['default'].Readable.prototype);
  /**
   * Check if a value is an instance of Request.
   *
   * @param   Mixed   input
   * @return  Boolean
   */

  function isRequest(input) {
    return _typeof2(input) === 'object' && _typeof2(input[INTERNALS$2]) === 'object';
  }

  function isAbortSignal(signal) {
    var proto = signal && _typeof2(signal) === 'object' && Object.getPrototypeOf(signal);
    return !!(proto && proto.constructor.name === 'AbortSignal');
  }
  /**
   * Request class
   *
   * @param   Mixed   input  Url or Request instance
   * @param   Object  init   Custom options
   * @return  Void
   */


  var Request = /*#__PURE__*/function () {
    function Request(input) {
      _classCallCheck(this, Request);

      var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var parsedURL; // normalize input

      if (!isRequest(input)) {
        if (input && input.href) {
          // in order to support Node.js' Url objects; though WHATWG's URL objects
          // will fall into this branch also (since their `toString()` will return
          // `href` property anyway)
          parsedURL = parse_url(input.href);
        } else {
          // coerce input to a string before attempting to parse
          parsedURL = parse_url("".concat(input));
        }

        input = {};
      } else {
        parsedURL = parse_url(input.url);
      }

      var method = init.method || input.method || 'GET';
      method = method.toUpperCase();

      if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
        throw new TypeError('Request with GET/HEAD method cannot have body');
      }

      var inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? _clone(input) : null;
      Body.call(this, inputBody, {
        timeout: init.timeout || input.timeout || 0,
        size: init.size || input.size || 0
      });
      var headers = new Headers(init.headers || input.headers || {});

      if (inputBody != null && !headers.has('Content-Type')) {
        var contentType = extractContentType(inputBody);

        if (contentType) {
          headers.append('Content-Type', contentType);
        }
      }

      var signal = isRequest(input) ? input.signal : null;
      if ('signal' in init) signal = init.signal;

      if (signal != null && !isAbortSignal(signal)) {
        throw new TypeError('Expected signal to be an instanceof AbortSignal');
      }

      this[INTERNALS$2] = {
        method: method,
        redirect: init.redirect || input.redirect || 'follow',
        headers: headers,
        parsedURL: parsedURL,
        signal: signal
      }; // node-fetch-only options

      this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
      this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
      this.counter = init.counter || input.counter || 0;
      this.agent = init.agent || input.agent;
    }

    _createClass(Request, [{
      key: "method",
      get: function get() {
        return this[INTERNALS$2].method;
      }
    }, {
      key: "url",
      get: function get() {
        return format_url(this[INTERNALS$2].parsedURL);
      }
    }, {
      key: "headers",
      get: function get() {
        return this[INTERNALS$2].headers;
      }
    }, {
      key: "redirect",
      get: function get() {
        return this[INTERNALS$2].redirect;
      }
    }, {
      key: "signal",
      get: function get() {
        return this[INTERNALS$2].signal;
      }
      /**
       * Clone this request
       *
       * @return  Request
       */

    }, {
      key: "clone",
      value: function clone() {
        return new Request(this);
      }
    }]);

    return Request;
  }();

  Body.mixIn(Request.prototype);
  Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    value: 'Request',
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Request.prototype, {
    method: {
      enumerable: true
    },
    url: {
      enumerable: true
    },
    headers: {
      enumerable: true
    },
    redirect: {
      enumerable: true
    },
    clone: {
      enumerable: true
    },
    signal: {
      enumerable: true
    }
  });
  /**
   * Convert a Request to Node.js http request options.
   *
   * @param   Request  A Request instance
   * @return  Object   The options object to be passed to http.request
   */

  function getNodeRequestOptions(request) {
    var parsedURL = request[INTERNALS$2].parsedURL;
    var headers = new Headers(request[INTERNALS$2].headers); // fetch step 1.3

    if (!headers.has('Accept')) {
      headers.set('Accept', '*/*');
    } // Basic fetch


    if (!parsedURL.protocol || !parsedURL.hostname) {
      throw new TypeError('Only absolute URLs are supported');
    }

    if (!/^https?:$/.test(parsedURL.protocol)) {
      throw new TypeError('Only HTTP(S) protocols are supported');
    }

    if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
      throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
    } // HTTP-network-or-cache fetch steps 2.4-2.7


    var contentLengthValue = null;

    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
      contentLengthValue = '0';
    }

    if (request.body != null) {
      var totalBytes = getTotalBytes(request);

      if (typeof totalBytes === 'number') {
        contentLengthValue = String(totalBytes);
      }
    }

    if (contentLengthValue) {
      headers.set('Content-Length', contentLengthValue);
    } // HTTP-network-or-cache fetch step 2.11


    if (!headers.has('User-Agent')) {
      headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
    } // HTTP-network-or-cache fetch step 2.15


    if (request.compress && !headers.has('Accept-Encoding')) {
      headers.set('Accept-Encoding', 'gzip,deflate');
    }

    var agent = request.agent;

    if (typeof agent === 'function') {
      agent = agent(parsedURL);
    }

    if (!headers.has('Connection') && !agent) {
      headers.set('Connection', 'close');
    } // HTTP-network fetch step 4.2
    // chunked encoding is handled by Node.js


    return Object.assign({}, parsedURL, {
      method: request.method,
      headers: exportNodeCompatibleHeaders(headers),
      agent: agent
    });
  }
  /**
   * abort-error.js
   *
   * AbortError interface for cancelled requests
   */

  /**
   * Create AbortError instance
   *
   * @param   String      message      Error message for human
   * @return  AbortError
   */


  function AbortError(message) {
    Error.call(this, message);
    this.type = 'aborted';
    this.message = message; // hide custom error implementation details from end-users

    Error.captureStackTrace(this, this.constructor);
  }

  AbortError.prototype = Object.create(Error.prototype);
  AbortError.prototype.constructor = AbortError;
  AbortError.prototype.name = 'AbortError'; // fix an issue where "PassThrough", "resolve" aren't a named export for node <10

  var PassThrough$1 = Stream__default['default'].PassThrough;
  var resolve_url = Url__default['default'].resolve;
  /**
   * Fetch function
   *
   * @param   Mixed    url   Absolute url or Request instance
   * @param   Object   opts  Fetch options
   * @return  Promise
   */

  function fetch$1(url, opts) {
    // allow custom promise
    if (!fetch$1.Promise) {
      throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
    }

    Body.Promise = fetch$1.Promise; // wrap http.request into fetch

    return new fetch$1.Promise(function (resolve, reject) {
      // build request object
      var request = new Request(url, opts);
      var options = getNodeRequestOptions(request);
      var send = (options.protocol === 'https:' ? https__default['default'] : http__default['default']).request;
      var signal = request.signal;
      var response = null;

      var abort = function abort() {
        var error = new AbortError('The user aborted a request.');
        reject(error);

        if (request.body && request.body instanceof Stream__default['default'].Readable) {
          request.body.destroy(error);
        }

        if (!response || !response.body) return;
        response.body.emit('error', error);
      };

      if (signal && signal.aborted) {
        abort();
        return;
      }

      var abortAndFinalize = function abortAndFinalize() {
        abort();
        finalize();
      }; // send request


      var req = send(options);
      var reqTimeout;

      if (signal) {
        signal.addEventListener('abort', abortAndFinalize);
      }

      function finalize() {
        req.abort();
        if (signal) signal.removeEventListener('abort', abortAndFinalize);
        clearTimeout(reqTimeout);
      }

      if (request.timeout) {
        req.once('socket', function (socket) {
          reqTimeout = setTimeout(function () {
            reject(new FetchError("network timeout at: ".concat(request.url), 'request-timeout'));
            finalize();
          }, request.timeout);
        });
      }

      req.on('error', function (err) {
        reject(new FetchError("request to ".concat(request.url, " failed, reason: ").concat(err.message), 'system', err));
        finalize();
      });
      req.on('response', function (res) {
        clearTimeout(reqTimeout);
        var headers = createHeadersLenient(res.headers); // HTTP fetch step 5

        if (fetch$1.isRedirect(res.statusCode)) {
          // HTTP fetch step 5.2
          var location = headers.get('Location'); // HTTP fetch step 5.3

          var locationURL = location === null ? null : resolve_url(request.url, location); // HTTP fetch step 5.5

          switch (request.redirect) {
            case 'error':
              reject(new FetchError("uri requested responds with a redirect, redirect mode is set to error: ".concat(request.url), 'no-redirect'));
              finalize();
              return;

            case 'manual':
              // node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
              if (locationURL !== null) {
                // handle corrupted header
                try {
                  headers.set('Location', locationURL);
                } catch (err) {
                  // istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
                  reject(err);
                }
              }

              break;

            case 'follow':
              // HTTP-redirect fetch step 2
              if (locationURL === null) {
                break;
              } // HTTP-redirect fetch step 5


              if (request.counter >= request.follow) {
                reject(new FetchError("maximum redirect reached at: ".concat(request.url), 'max-redirect'));
                finalize();
                return;
              } // HTTP-redirect fetch step 6 (counter increment)
              // Create a new Request object.


              var requestOpts = {
                headers: new Headers(request.headers),
                follow: request.follow,
                counter: request.counter + 1,
                agent: request.agent,
                compress: request.compress,
                method: request.method,
                body: request.body,
                signal: request.signal,
                timeout: request.timeout,
                size: request.size
              }; // HTTP-redirect fetch step 9

              if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
                finalize();
                return;
              } // HTTP-redirect fetch step 11


              if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
                requestOpts.method = 'GET';
                requestOpts.body = undefined;
                requestOpts.headers["delete"]('content-length');
              } // HTTP-redirect fetch step 15


              resolve(fetch$1(new Request(locationURL, requestOpts)));
              finalize();
              return;
          }
        } // prepare response


        res.once('end', function () {
          if (signal) signal.removeEventListener('abort', abortAndFinalize);
        });
        var body = res.pipe(new PassThrough$1());
        var response_options = {
          url: request.url,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: headers,
          size: request.size,
          timeout: request.timeout,
          counter: request.counter
        }; // HTTP-network fetch step 12.1.1.3

        var codings = headers.get('Content-Encoding'); // HTTP-network fetch step 12.1.1.4: handle content codings
        // in following scenarios we ignore compression support
        // 1. compression support is disabled
        // 2. HEAD request
        // 3. no Content-Encoding header
        // 4. no content response (204)
        // 5. content not modified response (304)

        if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
          response = new Response(body, response_options);
          resolve(response);
          return;
        } // For Node v6+
        // Be less strict when decoding compressed responses, since sometimes
        // servers send slightly invalid responses that are still accepted
        // by common browsers.
        // Always using Z_SYNC_FLUSH is what cURL does.


        var zlibOptions = {
          flush: zlib__default['default'].Z_SYNC_FLUSH,
          finishFlush: zlib__default['default'].Z_SYNC_FLUSH
        }; // for gzip

        if (codings == 'gzip' || codings == 'x-gzip') {
          body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
          response = new Response(body, response_options);
          resolve(response);
          return;
        } // for deflate


        if (codings == 'deflate' || codings == 'x-deflate') {
          // handle the infamous raw deflate response from old servers
          // a hack for old IIS and Apache servers
          var raw = res.pipe(new PassThrough$1());
          raw.once('data', function (chunk) {
            // see http://stackoverflow.com/questions/37519828
            if ((chunk[0] & 0x0F) === 0x08) {
              body = body.pipe(zlib__default['default'].createInflate());
            } else {
              body = body.pipe(zlib__default['default'].createInflateRaw());
            }

            response = new Response(body, response_options);
            resolve(response);
          });
          return;
        } // for br


        if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
          body = body.pipe(zlib__default['default'].createBrotliDecompress());
          response = new Response(body, response_options);
          resolve(response);
          return;
        } // otherwise, use response as-is


        response = new Response(body, response_options);
        resolve(response);
      });
      writeToStream(req, request);
    });
  }
  /**
   * Redirect code matching
   *
   * @param   Number   code  Status code
   * @return  Boolean
   */


  fetch$1.isRedirect = function (code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  }; // expose Promise


  fetch$1.Promise = global.Promise;
  var lib = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': fetch$1,
    Headers: Headers,
    Request: Request,
    Response: Response,
    FetchError: FetchError
  });
  var require$$0 = getCjsExportFromNamespace(lib);
  var haxan_min = createCommonjsModule(function (module, exports) {
    function _typeof(t) {
      return (_typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (t) {
        return _typeof2(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
      })(t);
    }

    !function (t, e) {
      "object" === _typeof(exports) && "undefined" != 'object' ? e(exports) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).Haxan = {});
    }(void 0, function (t) {
      var _n,
          e,
          o = (_n = function n(t, e) {
        return (_n = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (t, e) {
          t.__proto__ = e;
        } || function (t, e) {
          for (var o in e) {
            Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          }
        })(t, e);
      }, function (t, e) {
        function o() {
          this.constructor = t;
        }

        _n(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
      }),
          r = (e = Error, o(i, e), i);

      function i() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.isHaxanError = !0, t;
      }

      function s(t) {
        return t && !0 === t.isHaxanError;
      }

      var u,
          y = (o(a, u = r), a);

      function a() {
        var t = u.call(this) || this;
        return t.isTimeout = !0, t;
      }

      var p,
          l = (o(c, p = r), c);

      function c(t) {
        var e = p.call(this) || this;
        return e.isRejection = !0, e.response = t, e;
      }

      var f,
          d,
          b,
          m = (o(h, f = r), h);

      function h() {
        var t = f.call(this) || this;
        return t.isAbort = !0, t;
      }

      (o = d = d || {}).Auto = "auto", o.Json = "json", o.Text = "text", o.Stream = "stream", (o = b = b || {}).Get = "GET", o.Post = "POST", o.Put = "PUT", o.Patch = "PATCH", o.Delete = "DELETE", o.Head = "HEAD", o.Options = "OPTIONS";

      var _ = Object.freeze({
        __proto__: null,
        HaxanError: r,
        isHaxanError: s,
        HaxanTimeout: y,
        isHaxanTimeout: function isHaxanTimeout(t) {
          return s(t) && !0 === t.isTimeout;
        },
        HaxanRejection: l,
        isHaxanRejection: function isHaxanRejection(t) {
          return s(t) && !0 === t.isRejection;
        },
        HaxanAbort: m,
        isHaxanAbort: function isHaxanAbort(t) {
          return s(t) && !0 === t.isAbort;
        },

        get ResponseType() {
          return d;
        },

        get HTTPMethod() {
          return b;
        }

      });

      var _v = function v() {
        return (_v = Object.assign || function (t) {
          for (var e, o = 1, n = arguments.length; o < n; o++) {
            for (var r in e = arguments[o]) {
              Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            }
          }

          return t;
        }).apply(this, arguments);
      },
          w = function w(t, s, u, a) {
        return new (u = u || Promise)(function (o, e) {
          function n(t) {
            try {
              i(a.next(t));
            } catch (t) {
              e(t);
            }
          }

          function r(t) {
            try {
              i(a["throw"](t));
            } catch (t) {
              e(t);
            }
          }

          function i(t) {
            var e;
            t.done ? o(t.value) : ((e = t.value) instanceof u ? e : new u(function (t) {
              t(e);
            })).then(n, r);
          }

          i((a = a.apply(t, s || [])).next());
        });
      },
          x = function x(o, n) {
        var r,
            i,
            s,
            u = {
          label: 0,
          sent: function sent() {
            if (1 & s[0]) throw s[1];
            return s[1];
          },
          trys: [],
          ops: []
        },
            t = {
          next: e(0),
          "throw": e(1),
          "return": e(2)
        };
        return "function" == typeof Symbol && (t[Symbol.iterator] = function () {
          return this;
        }), t;

        function e(e) {
          return function (t) {
            return function (e) {
              if (r) throw new TypeError("Generator is already executing.");

              for (; u;) {
                try {
                  if (r = 1, i && (s = 2 & e[0] ? i["return"] : e[0] ? i["throw"] || ((s = i["return"]) && s.call(i), 0) : i.next) && !(s = s.call(i, e[1])).done) return s;

                  switch (i = 0, s && (e = [2 & e[0], s.value]), e[0]) {
                    case 0:
                    case 1:
                      s = e;
                      break;

                    case 4:
                      return u.label++, {
                        value: e[1],
                        done: !1
                      };

                    case 5:
                      u.label++, i = e[1], e = [0];
                      continue;

                    case 7:
                      e = u.ops.pop(), u.trys.pop();
                      continue;

                    default:
                      if (!(s = 0 < (s = u.trys).length && s[s.length - 1]) && (6 === e[0] || 2 === e[0])) {
                        u = 0;
                        continue;
                      }

                      if (3 === e[0] && (!s || e[1] > s[0] && e[1] < s[3])) {
                        u.label = e[1];
                        break;
                      }

                      if (6 === e[0] && u.label < s[1]) {
                        u.label = s[1], s = e;
                        break;
                      }

                      if (s && u.label < s[2]) {
                        u.label = s[2], u.ops.push(e);
                        break;
                      }

                      s[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }

                  e = n.call(o, u);
                } catch (t) {
                  e = [6, t], i = 0;
                } finally {
                  r = s = 0;
                }
              }

              if (5 & e[0]) throw e[1];
              return {
                value: e[0] ? e[1] : void 0,
                done: !0
              };
            }([e, t]);
          };
        }
      },
          P = (j.prototype.setProp = function (t, e) {
        return this._opts[t] = e, this;
      }, j.prototype.rejectOn = function (t) {
        return this.setProp("rejectOn", t);
      }, j.prototype.url = function (t) {
        return this.setProp("url", t);
      }, j.prototype.type = function (t) {
        return this.setProp("type", t);
      }, j.prototype.method = function (t) {
        return this.setProp("method", t);
      }, j.prototype.get = function () {
        return this.method("GET");
      }, j.prototype.head = function () {
        return this.method("HEAD");
      }, j.prototype.options = function () {
        return this.method("OPTIONS");
      }, j.prototype.post = function (t) {
        return this.body(t).method("POST");
      }, j.prototype.put = function (t) {
        return this.body(t).method("PUT");
      }, j.prototype.patch = function (t) {
        return this.body(t).method("PATCH");
      }, j.prototype["delete"] = function () {
        return this.method("DELETE");
      }, j.prototype.body = function (t) {
        return this.setProp("body", t);
      }, j.prototype.header = function (t, e) {
        return this._opts.headers[t] = e, this;
      }, j.prototype.param = function (t, e) {
        return this._opts.query[t] = e, this;
      }, j.prototype.timeout = function (t) {
        return this.setProp("timeout", t);
      }, j.prototype.abort = function (t) {
        return this.setProp("abortSignal", t);
      }, j.prototype.normalizedBody = function () {
        var t = this._opts.body;
        return null === t ? null : "string" == typeof t ? t : JSON.stringify(t);
      }, j.prototype.parseBody = function (o) {
        return w(this, void 0, void 0, function () {
          var e;
          return x(this, function (t) {
            switch (t.label) {
              case 0:
                return (e = o.headers.get("content-type")) && e.startsWith("application/json") ? [4, o.json()] : [3, 2];

              case 1:
                return [2, t.sent()];

              case 2:
                return [4, o.text()];

              case 3:
                return [2, t.sent()];
            }
          });
        });
      }, j.prototype.getOptions = function () {
        return this._opts;
      }, j.prototype.send = function () {
        return this.execute();
      }, j.prototype.execute = function () {
        return this.request();
      }, j.prototype.request = function () {
        return w(this, void 0, void 0, function () {
          var r,
              i,
              s,
              u,
              a,
              p,
              c,
              f,
              h = this;
          return x(this, function (t) {
            switch (t.label) {
              case 0:
                return t.trys.push([0, 9,, 10]), r = void 0, i = "undefined" != typeof window && "[object Window]" === {}.toString.call(window), r = i ? fetch : require$$0, s = Object.keys(this._opts.query).length ? this._opts.url + "?" + (n = this._opts.query, Object.keys(n).map(function (t) {
                  return t + "=" + String(n[t]);
                }).join("&")) : this._opts.url, [4, Promise.race([r(s, {
                  method: this._opts.method,
                  headers: _v(_v({
                    "Content-Type": "application/json"
                  }, this._opts.headers), {
                    "User-Agent": "Haxan 0.2.1"
                  }),
                  body: (e = this._opts.method, [b.Put, b.Post, b.Patch].includes(e.toUpperCase()) ? this.normalizedBody() : void 0),
                  signal: this._opts.abortSignal
                }), new Promise(function (t, e) {
                  return setTimeout(function () {
                    return e(new y());
                  }, h._opts.timeout);
                })])];

              case 1:
                if (u = t.sent(), this._opts.rejectOn(u.status)) throw new l(u);
                return (e = u.headers, o = {}, e.forEach(function (t, e) {
                  o[e] = t;
                }), a = o, this._opts.type !== d.Auto) ? [3, 3] : (p = {}, [4, this.parseBody(u)]);

              case 2:
                return [2, (p.data = t.sent(), p.ok = u.ok, p.status = u.status, p.headers = a, p)];

              case 3:
                return this._opts.type !== d.Json ? [3, 5] : (c = {}, [4, u.json()]);

              case 4:
                return [2, (c.data = t.sent(), c.ok = u.ok, c.status = u.status, c.headers = a, c)];

              case 5:
                return this._opts.type !== d.Text ? [3, 7] : (f = {}, [4, u.text()]);

              case 6:
                return [2, (f.data = t.sent(), f.ok = u.ok, f.status = u.status, f.headers = a, f)];

              case 7:
                if (this._opts.type === d.Stream && !i) return [2, {
                  data: u.body,
                  ok: u.ok,
                  status: u.status,
                  headers: a
                }];
                t.label = 8;

              case 8:
                throw new Error("No valid response body parsing method found");

              case 9:
                if ("AbortError" === (a = t.sent()).name) throw new m();
                throw a;

              case 10:
                return [2];
            }

            var o, e, n;
          });
        });
      }, j);

      function j(t, e) {
        this._opts = {
          url: "",
          headers: {},
          query: {},
          method: b.Get,
          body: void 0,
          type: d.Auto,
          rejectOn: function rejectOn() {
            return !1;
          },
          abortSignal: void 0,
          timeout: 3e4
        }, e && Object.assign(this._opts, e), this.url(t);
      }

      function O(t, e) {
        return new P(t, e);
      }

      r = function () {
        var t,
            e = O;

        for (t in _) {
          e[t] = _[t];
        }

        return e.HaxanFactory = P, e;
      }();

      t.HaxanFactory = P, t["default"] = r, Object.defineProperty(t, "__esModule", {
        value: !0
      });
    });
  });
  var haxan = unwrapExports(haxan_min);

  var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var CorinthError =
  /** @class */
  function (_super) {
    __extends(CorinthError, _super);

    function CorinthError(res) {
      var _this = _super.call(this) || this;

      _this.isCorinthError = true;
      _this.res = res;
      return _this;
    }

    return CorinthError;
  }(Error);

  var __awaiter$1 = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  var __generator$1 = undefined && undefined.__generator || function (thisArg, body) {
    var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (_) {
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };

  var Queue =
  /** @class */
  function () {
    function Queue(root, name) {
      this.$root = root;
      this.name = name;
    }

    Queue.prototype.getName = function () {
      return this.name;
    };

    Queue.prototype.uri = function () {
      return this.$root.getIp() + "/queue/" + this.name;
    };

    Queue.prototype.getUrl = function (route) {
      return this.uri() + route;
    };

    Queue.prototype.ack = function (id) {
      return __awaiter$1(this, void 0, void 0, function () {
        var res;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , haxan(this.getUrl("/" + id + "/ack")).method(haxan.HTTPMethod.Post).send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                return [2
                /*return*/
                , true];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.peek = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var res;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , haxan(this.getUrl("/peek")).send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return [2
                /*return*/
                , res.data.result.item || null];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.dequeue = function (_a) {
      var _b = _a === void 0 ? {} : _a,
          _c = _b.ack,
          _ack = _c === void 0 ? false : _c,
          _d = _b.amount,
          amount = _d === void 0 ? 1 : _d;

      return __awaiter$1(this, void 0, void 0, function () {
        var request, res;

        var _this = this;

        return __generator$1(this, function (_e) {
          switch (_e.label) {
            case 0:
              request = haxan(this.getUrl("/dequeue")).method(haxan.HTTPMethod.Post).param("amount", amount);

              if (_ack) {
                request.param("ack", "true");
              }

              return [4
              /*yield*/
              , request.send()];

            case 1:
              res = _e.sent();

              if (res.ok) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return [2
                /*return*/
                , res.data.result.items.map(function (item) {
                  return {
                    message: item,
                    ack: function ack() {
                      return __awaiter$1(_this, void 0, void 0, function () {
                        return __generator$1(this, function (_a) {
                          if (_ack) {
                            return [2
                            /*return*/
                            , true];
                          } else {
                            return [2
                            /*return*/
                            , this.ack(item.id)];
                          }
                        });
                      });
                    }
                  };
                })];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.enqueueOne = function (item, deduplication) {
      if (deduplication === void 0) {
        deduplication = null;
      }

      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (_a) {
          return [2
          /*return*/
          , this.enqueue([{
            item: item,
            deduplication: deduplication
          }])];
        });
      });
    };

    Queue.prototype.enqueue = function (messages) {
      return __awaiter$1(this, void 0, void 0, function () {
        var res;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , haxan(this.getUrl("/enqueue")).post({
                messages: messages
              }).send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return [2
                /*return*/
                , res.data.result];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.stat = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var res;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , haxan(this.uri()).send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return [2
                /*return*/
                , res.data.result.queue];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.size = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var size;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , this.stat()];

            case 1:
              size = _a.sent().size;
              return [2
              /*return*/
              , size];
          }
        });
      });
    };

    Queue.prototype.purge = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var res;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , haxan(this.getUrl("/purge"))["delete"]().send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                return [2
                /*return*/
                , true];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.edit = function (opts) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (_a) {
          return [2
          /*return*/
          , this.update(opts)];
        });
      });
    };

    Queue.prototype.update = function (opts) {
      return __awaiter$1(this, void 0, void 0, function () {
        var res;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , haxan(this.uri()).patch(opts).send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                return [2
                /*return*/
                , true];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.exists = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var error_1;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4
              /*yield*/
              , this.stat()];

            case 1:
              _a.sent();

              return [2
              /*return*/
              , true];

            case 2:
              error_1 = _a.sent();

              if (error_1.isCorinthError) {
                if (error_1.res.status === 404) {
                  return [2
                  /*return*/
                  , false];
                }
              }

              throw error_1;

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    Queue.prototype["delete"] = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var res;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , haxan(this.uri())["delete"]().send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                return [2
                /*return*/
                , true];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.create = function (opts) {
      return __awaiter$1(this, void 0, void 0, function () {
        var request, res;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              request = haxan(this.uri()).method(haxan.HTTPMethod.Put);

              if ((opts === null || opts === void 0 ? void 0 : opts.dead_letter_queue) !== undefined) {
                request.param("dead_letter_queue_name", opts.dead_letter_queue.getName());
              }

              if ((opts === null || opts === void 0 ? void 0 : opts.dead_letter_queue_threshold) !== undefined) {
                request.param("dead_letter_queue_threshold", String(opts.dead_letter_queue_threshold));
              }

              if ((opts === null || opts === void 0 ? void 0 : opts.deduplication_time) !== undefined) {
                request.param("deduplication_time", String(opts.deduplication_time));
              }

              if ((opts === null || opts === void 0 ? void 0 : opts.max_length) !== undefined) {
                request.param("max_length", String(opts.max_length));
              }

              if ((opts === null || opts === void 0 ? void 0 : opts.persistent) !== undefined) {
                request.param("persistent", String(opts.persistent));
              }

              if ((opts === null || opts === void 0 ? void 0 : opts.requeue_time) !== undefined) {
                request.param("requeue_time", String(opts.requeue_time));
              }

              return [4
              /*yield*/
              , request.send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                return [2
                /*return*/
                , true];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Queue.prototype.ensure = function (opts) {
      return __awaiter$1(this, void 0, void 0, function () {
        var error_2;
        return __generator$1(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4
              /*yield*/
              , this.create(opts)];

            case 1:
              return [2
              /*return*/
              , _a.sent()];

            case 2:
              error_2 = _a.sent();

              if (error_2.isCorinthError) {
                if (error_2.res.status === 409) {
                  return [2
                  /*return*/
                  , true];
                }
              }

              throw error_2;

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    return Queue;
  }();

  var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (_) {
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }; // type LoggerFunction = (...msgs: any[]) => void;
  // interface ICorinthRootOptions {
  //   logger: LoggerFunction;
  // }


  var Corinth =
  /** @class */
  function () {
    // private logger?: LoggerFunction;
    function Corinth(ip
    /*opts?: ICorinthRootOptions*/
    ) {
      this.ip = ip; // this.logger = opts?.logger;
    }

    Corinth.prototype.getIp = function () {
      return this.ip;
    }; // getLogger(): LoggerFunction | undefined {
    //   return this.logger;
    // }


    Corinth.prototype.version = function () {
      return __awaiter(this, void 0, void 0, function () {
        var version;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , this.stat()];

            case 1:
              version = _a.sent().version;
              return [2
              /*return*/
              , version];
          }
        });
      });
    };

    Corinth.prototype.stat = function () {
      return __awaiter(this, void 0, void 0, function () {
        var request, res;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              request = haxan(this.ip);
              return [4
              /*yield*/
              , request.send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return [2
                /*return*/
                , res.data.result.info];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Corinth.prototype.listQueues = function () {
      return __awaiter(this, void 0, void 0, function () {
        var request, res;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              request = haxan(this.ip + "/queues");
              return [4
              /*yield*/
              , request.send()];

            case 1:
              res = _a.sent();

              if (res.ok) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return [2
                /*return*/
                , res.data.result.queues.items];
              }

              throw new CorinthError(res);
          }
        });
      });
    };

    Corinth.prototype.queueExists = function (name) {
      return __awaiter(this, void 0, void 0, function () {
        var queue;
        return __generator(this, function (_a) {
          queue = new Queue(this, name);
          return [2
          /*return*/
          , queue.exists()];
        });
      });
    };

    Corinth.prototype.defineQueue = function (name) {
      return new Queue(this, name);
    };

    return Corinth;
  }();

  exports.MessageState = void 0;

  (function (MessageState) {
    MessageState[MessageState["Pending"] = 0] = "Pending";
    MessageState[MessageState["Requeued"] = 1] = "Requeued";
  })(exports.MessageState || (exports.MessageState = {}));

  exports.Corinth = Corinth;
  exports.CorinthError = CorinthError;
  exports.Queue = Queue;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});