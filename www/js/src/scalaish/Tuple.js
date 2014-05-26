define("scalaish/Tuple",
  ["underscore","./Any","./Product","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var _ = __dependency1__;
    var Any = __dependency2__.Any;
    var TProduct1 = __dependency3__.TProduct1;
    var TProduct2 = __dependency3__.TProduct2;
    var TProduct3 = __dependency3__.TProduct3;
    var TProduct4 = __dependency3__.TProduct4;

    var TTuple1 = _.extend({}, TProduct1, {
      Tuple1: true,
      companion: Tuple1,

      toString: function () {
        return "(" + this._1 + ")";
      }

      // TODO case class methods

    });

    var TTuple2 = _.extend({}, TProduct2, {
      Tuple2: true,
      companion: Tuple2,

      toString: function () {
        return "(" + this._1 + "," + this._2 + ")";
      },

      swap: function () {
        return new Tuple2(this._2, this._1)
      }

      // TODO case class methods

    });

    var TTuple3 = _.extend({}, TProduct3, {
      Tuple3: true,
      companion: Tuple3,

      toString: function () {
        return "(" + this._1 + "," + this._2 + "," + this._3 + ")";
      }

      // TODO case class methods

    });

    var TTuple4 = _.extend({}, TProduct4, {
      Tuple4: true,
      companion: Tuple4,

      toString: function () {
        return "(" + this._1 + "," + this._2 + "," + this._3 + "," + this._4 + ")";
      }

      // TODO case class methods

    });

    function Tuple1Impl(_1) {
      this._1 = _1;
    }

    Tuple1Impl.prototype = _.extend(Object.create(Any.prototype), TTuple1);

    function Tuple2Impl(_1, _2) {
      this._1 = _1;
      this._2 = _2;
    }

    Tuple2Impl.prototype = _.extend(Object.create(Any.prototype), TTuple2);

    function Tuple3Impl(_1, _2, _3) {
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }

    Tuple3Impl.prototype = _.extend(Object.create(Any.prototype), TTuple3);

    function Tuple4Impl(_1, _2, _3, _4) {
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
      this._4 = _4;
    }

    Tuple4Impl.prototype = _.extend(Object.create(Any.prototype), TTuple4);

    // TODO: More tuples

    // TODO: Use 'arguments' and apply (js) when possible
    function Tuple1(_1) {
      return Tuple1.apply(_1)
    }
    Tuple1.apply = function (_1) {
      return new Tuple1Impl(_1);
    };
    Tuple1.unapply = function (tpl) {
      return [tpl._1]
    };

    function Tuple2(_1, _2) {
      return Tuple2.apply(_1, _2)
    }
    Tuple2.apply = function (_1, _2) {
      return new Tuple2Impl(_1, _2);
    };
    Tuple2.unapply = function (t) {
      return [t._1, t._2]
    };

    function Tuple3(_1, _2, _3) {
      return Tuple3.apply(_1, _2, _3)
    }
    Tuple3.apply = function (_1, _2, _3) {
      return new Tuple3Impl(_1, _2, _3);
    };
    Tuple3.unapply = function (t) {
      return [t._1, t._2, t._3]
    };

    function Tuple4(_1, _2, _3, _4) {
      return Tuple4.apply(_1, _2, _3, _4)
    }
    Tuple4.apply = function (_1, _2, _3, _4) {
      return new Tuple4Impl(_1, _2, _3, _4);
    };
    Tuple4.unapply = function (t) {
      return [t._1, t._2, t._3, t._4]
    };

    /**
     * Convenience "factory" function for Tuples
     *
     * @return {Tuple1Impl|Tuple2Impl|Tuple3Impl|Tuple4Impl}
     */
    function T() {
      switch (arguments.length) {
        case 1:
          return Tuple1(arguments[0]);
        case 2:
          return Tuple2(arguments[0], arguments[1]);
        case 3:
          return Tuple3(arguments[0], arguments[1], arguments[2]);
        case 4:
          return Tuple4(arguments[0], arguments[1], arguments[2], arguments[3]);
        default:
          throw new Error('Implementation missing for tuple with arity ' + arguments.length)
      }
    }

    __exports__.T = T;
    __exports__.Tuple1 = Tuple1;
    __exports__.Tuple2 = Tuple2;
    __exports__.Tuple3 = Tuple3;
    __exports__.Tuple4 = Tuple4;
    __exports__.TTuple1 = TTuple1;
    __exports__.TTuple2 = TTuple2;
    __exports__.TTuple3 = TTuple3;
    __exports__.TTuple4 = TTuple4;
  });