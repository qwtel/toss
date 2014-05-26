define("scalaish/util/Random",
  ["underscore","../Any","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var _ = __dependency1__;
    var Any = __dependency2__.Any;

    /**
     * http://stackoverflow.com/a/1527820/870615
     *
     * @param min {number} inclusive
     * @param max {number} exclusive
     * @return {number}
     */
    function range(min, max) {
      return Math.floor(this.random() * (max - min) + min);
    }

    /**
     * @param {function} random You can supply your own random implementation
     * @constructor
     * @extends {Any}
     */
    function Random(random) {
      if (typeof random !== 'undefined') {
        this.random = random;
      }
    }

    Random.prototype = _.extend(Object.create(Any.prototype), {
      Random: true,

      random: Math.random,

      /**
       * // http://jsfiddle.net/Ronny/Ud5vT/
       * @return {boolean}
       */
      nextBoolean: function () {
        return this.random() < .5;
      },

      nextNumber: function () {
        return this.random();
      },

      nextInt: function (n) {
        if (typeof n === 'undefined') {
          n = 32;
        }
        return range.call(this, 0, n);
      },

      /**
       * http://www.protonfish.com/random.shtml
       *
       * @return {number}
       */
      nextGaussian: function () {
        return (this.random() * 2 - 1) + (this.random() * 2 - 1) + (this.random() * 2 - 1);
      },

      /**
       * This is basically useless.
       *
       * @param {number} length
       * @return {string}
       */
      nextString: function (length) {
        var safeChar = function () {
          var surrogateStart = 0xD800;
          var res = this.nextInt(surrogateStart - 1) + 1;
          return String.fromCharCode(res);
        }.bind(this);

        // TODO: use range or something
        var buffer = '';
        for (var i = 0; i < length; i++) {
          buffer += safeChar();
        }

        return buffer;
      },

      nextPrintableChar: function () {
        var low = 33;
        var high = 127;
        return String.fromCharCode(this.nextInt(high - low) + low);
      }

      // TODO: shuffle (requires collections)
      // TODO: alphanumeric (requires stream)
    });

    __exports__.Random = Random;
  });