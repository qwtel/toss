define("scalaish/Any",
  ["./helpers/match","./helpers/helpers","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var match = __dependency1__.match;
    var __isFunction = __dependency2__.__isFunction;

    function Any() {
    }

    Any.prototype = {
      Any: true,

      isInstanceOf: function (Class) {
        if (__isFunction(Class)) {
          return this[Class.name] === true
        } else {
          return this[Class] === true
        }
      },

      getClass: function () {
        // TODO
      },

      match: function() {
        return match(this)
      }
    };

    __exports__.Any = Any;
  });