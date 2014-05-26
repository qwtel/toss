define("scalaish/Product",
  ["underscore","./Any","./Exceptions","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var _ = __dependency1__;
    var Any = __dependency2__.Any;
    var IndexOutOfBoundsException = __dependency3__.IndexOutOfBoundsException;

    /**
     * Base trait for all products, which in the standard library include at
     * least [[scala.Product1]] through [[scala.Product22]] and therefore also
     * their subclasses [[scala.Tuple1]] through [[scala.Tuple22]].  In addition,
     * all case classes implement `Product` with synthetically generated methods.
     */
    var TProduct = {
      Product: true,

      /**
       * The n^th^ element of this product, 0-based.  In other words, for a
       * product `A(x,,1,,, ..., x,,k,,)`, returns `x,,(n+1),,` where `0 < n < k`.
       *
       * @param  {number} n   the index of the element to return
       * @throws       `IndexOutOfBoundsException`
       * @return  {*} the element `n` elements after the first element
       */
      productElement: null,

      /**
       * The size of this product.
       * @return  {number} for a product `A(x,,1,,, ..., x,,k,,)`, returns `k`
       */
      productArity: null,

      /**
       * An iterator over all the elements of this product.
       * @return     in the default implementation, an `Iterator[Any]`
       */
      productIterator: function () {
        // TODO
      },

      /**
       * A string used in the `toString` methods of derived classes.
       * Implementations may override this method to prepend a string prefix
       * to the result of `toString` methods.
       *
       * @type {string} in the default implementation, the empty string
       */
      productPrefix: ''
    };

    var TProduct1 = _.extend({}, TProduct, {
      Product1: true,

      productArity: 1,

      productElement: function (n) {
        switch (n) {
          case 0:
            return this._1;
          default:
            throw new IndexOutOfBoundsException(n);
        }
      },

      _1: null
    });

    var TProduct2 = _.extend({}, TProduct, {
      Product2: true,

      productArity: 2,

      productElement: function (n) {
        switch (n) {
          case 0:
            return this._1;
          case 1:
            return this._2;
          default:
            throw new IndexOutOfBoundsException(n);
        }
      },

      _1: null,
      _2: null
    });

    var TProduct3 = _.extend({}, TProduct, {
      Product3: true,

      productArity: 3,

      productElement: function (n) {
        switch (n) {
          case 0:
            return this._1;
          case 1:
            return this._2;
          case 2:
            return this._3;
          default:
            throw new IndexOutOfBoundsException(n);
        }
      },

      _1: null,
      _2: null,
      _3: null
    });

    var TProduct4 = _.extend({}, TProduct, {
      Product4: true,

      productArity: 4,

      productElement: function (n) {
        switch (n) {
          case 0:
            return this._1;
          case 1:
            return this._2;
          case 2:
            return this._3;
          case 3:
            return this._4;
          default:
            throw new IndexOutOfBoundsException(n);
        }
      },

      _1: null,
      _2: null,
      _3: null,
      _4: null
    });

    // TODO: More products

    __exports__.TProduct = TProduct;
    __exports__.TProduct1 = TProduct1;
    __exports__.TProduct2 = TProduct2;
    __exports__.TProduct3 = TProduct3;
    __exports__.TProduct4 = TProduct4;
  });