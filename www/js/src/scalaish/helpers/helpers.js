define("scalaish/helpers/helpers",
  ["exports"],
  function(__exports__) {
    "use strict";
    // http://coffeescript.org/
    var __extends = function (parent, child) {
      child.__super__ = parent.prototype;

      function ctor() {
        this.constructor = child;
      }

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();

      return child;
    };

    // http://stackoverflow.com/a/1880726/870615
    var __isConstructor = function (_this, Class) {
      var isConstructor = false;
      var key = '__previouslyConstructedBy' + Class.name + '__';
      if (_this instanceof Class && !_this[key]) {
        isConstructor = true;
        Object.defineProperty(_this, key, {
          value: true,
          writeable: false,
          enumerable: false
        })
      }
      return isConstructor;
    };

    // http://underscorejs.org/
    var __isFunction = function (obj) {
      return typeof obj === 'function';
    };

    // http://underscorejs.org/
    var __result = function (value) {
      return __isFunction(value) ? value.call() : value;
    };

    // http://stackoverflow.com/a/728694/870615
    var __clone2 = function (obj) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    };

    /**
     * Clone function for a property descriptor that goes two levels deep
     */
    var __clone = function (obj) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = __clone2(obj[attr]);
      }
      return copy;
    };

    __exports__.__extends = __extends;
    __exports__.__isConstructor = __isConstructor;
    __exports__.__isFunction = __isFunction;
    __exports__.__result = __result;
    __exports__.__clone = __clone;
  });