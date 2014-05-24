define("scalaish/Option",
  ["./helpers/helpers","underscore","exports"],
  function(__dependency1__, _, __exports__) {
    "use strict";
    var __result = __dependency1__.__result;
    //import {NoSuchElementException} from './Exceptions';

    function NoSuchElementException() {
    }

    var constructors = (function () {
      var TOption = {

        /**
         * Returns true if the option is $none, false otherwise.
         * @return {boolean}
         */
        isEmpty: null,

        /**
         * Returns true if the option is an instance of $some, false otherwise.
         * @return {boolean}
         */
        isDefined: function () {
          return !this.isEmpty()
        },

        /**
         * Returns the option's value.
         * @note The option must be nonEmpty.
         * @throws {NoSuchElementException} if the option is empty.
         * @return {A}
         */
        get: null,

        /**
         * Returns the option's value if the option is nonempty, otherwise
         * return the result of evaluating `def`.
         *
         * @param def {A|function(): A} the default expression.
         * @return {A}
         */
        getOrElse: function (def, context) {
          if (this.isEmpty()) {
            return __result(def, context);
          } else {
            return this.get()
          }
        },

        /**
         * Returns the option's value if it is nonempty,
         * or `null` if it is empty.
         * Although the use of null is discouraged, code written to use
         * $option must often interface with code that expects and returns nulls.
         * @return {A|null}
         */
        orNull: function () {
          return this.getOrElse(null)
        },

        /**
         * Returns a $some containing the result of applying $f to this $option's
         * value if this $option is nonempty.
         * Otherwise return $none.
         *
         * @note This is similar to `flatMap` except here,
         * $f does not need to wrap its result in an $option.
         *
         * @template B
         * @param  f {function(A): B} the function to apply
         * @return Option.<B>
         * @see flatMap
         * @see forEach
         */
        map: function (f, context) {
          if (this.isEmpty()) {
            return new None()
          } else {
            return new Some(f.call(context, this.get()))
          }
        },

        /**
         * Returns the result of applying $f to this $option's
         * value if the $option is nonempty.  Otherwise, evaluates
         * expression `ifEmpty`.
         *
         * @note This is equivalent to `$option map f getOrElse ifEmpty`.
         *
         * @template B
         * @param ifEmpty {B|function(): B} the expression to evaluate if empty.
         * @return {function(B|function(): B): B}
         */
        fold: function (ifEmpty) {
          // TODO: Better way to document this / better way for partial application?
          /**
           *  @return {B}
           *  @param f {function(A): B} the function to apply if nonempty.
           */
          return function (f, context) {
            if (this.isEmpty()) {
              return __result(ifEmpty)
            } else {
              return f.call(context, this.get())
            }
          }.bind(this)
        },

        /**
         * Returns the result of applying $f to this $option's value if
         * this $option is nonempty.
         * Returns $none if this $option is empty.
         * Slightly different from `map` in that $f is expected to
         * return an $option (which could be $none).
         *
         * @template B
         * @param  f {function(A): Option.<B>} the function to apply
         * @return {Option.<B>}
         * @see map
         * @see forEach
         */
        flatMap: function (f, context) {
          if (this.isEmpty()) {
            return new None()
          } else {
            return f.call(context, this.get())
          }
        },

        flatten: function () {
          if (this.isEmpty()) {
            return new None()
          } else {
            return this.get()
          }
        },

        /**
         * Returns this $option if it is nonempty '''and''' applying the predicate $p to
         * this $option's value returns true. Otherwise, return $none.
         *
         * @param  p {function(A): boolean} the predicate used for testing.
         * @return {Option.<A>}
         */
        filter: function (p, context) {
          if (this.isEmpty() || p.call(context, this.get())) {
            return this;
          } else {
            return new None()
          }
        },

        /**
         * Returns this $option if it is nonempty '''and''' applying the predicate $p to
         * this $option's value returns false. Otherwise, return $none.
         *
         * @param  p {function(A): boolean} the predicate used for testing.
         * @return {Option.<A>}
         */
        filterNot: function (p, context) {
          if (this.isEmpty() || !p.call(context, this.get())) {
            return this;
          } else {
            return new None()
          }
        },

        nonEmpty: function () {
          return this.isDefined()
        },

        // TODO: withFilter

        /**
         * Tests whether the option contains a given value as an element.
         *
         * @param elem {A} the element to test.
         * @return {boolean} `true` if the option has an element that is equal (as
         * determined by `===`) to `elem`, `false` otherwise.
         */
        contains: function (elem) {
          // TODO: equals?
          return !this.isEmpty() && this.get() === elem
        },

        /**
         * Returns true if this option is nonempty '''and''' the predicate
         * $p returns true when applied to this $option's value.
         * Otherwise, returns false.
         *
         * @param  p {function(A): boolean}  the predicate to test
         * @return {boolean}
         */
        exists: function (p, context) {
          return !this.isEmpty() && p.call(context, this.get())
        },

        /**
         * Returns true if this option is empty '''or''' the predicate
         * $p returns true when applied to this $option's value.
         *
         * @param  p {function(A): boolean}  the predicate to test
         * @return {boolean}
         */
        forAll: function (p, context) {
          return this.isEmpty() || p.call(context, this.get())
        },

        /**
         * Apply the given procedure $f to the option's value,
         * if it is nonempty. Otherwise, do nothing.
         *
         * @template U
         * @param  f {function(A): U} the procedure to apply.
         * @return {U|undefined}
         * @see map
         * @see flatMap
         */
        forEach: function (f, context) {
          if (!this.isEmpty()) return f.call(context, this.get())
        },

        // TODO: collect

        /**
         * Returns this $option if it is nonempty,
         * otherwise return the result of evaluating `alternative`.
         *
         * @param alternative {Option.<A>|function(): Option.<A>} the alternative expression.
         * @return {Option.<A>}
         */
        orElse: function (alternative) {
          if (this.isEmpty()) {
            return __result(alternative)
          } else {
            return this
          }
        }

        // TODO: iterator

        // TODO: toList

        // TODO: toRight

        // TODO: toLeft

      };

      var TSome = {
        /**
         * @override
         * @inheritDoc
         */
        get: function () {
          return this.value;
        },

        /**
         * @override
         * @inheritDoc
         */
        isEmpty: function () {
          return false;
        }
      };

      var TNone = {
        /**
         * @override
         * @inheritDoc
         */
        get: function () {
          throw new NoSuchElementException("None.get");
        },

        /**
         * @override
         * @inheritDoc
         */
        isEmpty: function () {
          return true;
        }
      };

      /**
       * @param {B} x
       * @return {Option.<B>}
       * @constructor
       */
      function Option(x, context) {
        if (x == null) {
          return new None();
        }
        else {
          return new Some(x, context);
        }
      }

      Option.prototype = TOption;

      /**
       * @param {B} x
       * @constructor
       * @extends {Option.<B>}
       */
      function Some(x, context) {
        this.value = __result(x, context);
      }

      Some.prototype = _.extend(Object.create(Option.prototype), TSome);

      /**
       * @constructor
       * @extends {Option.<B>}
       */
      function None() {
      }
      None.prototype = _.extend(Object.create(Option.prototype), TNone);

      return [Option, Some, None]
    })();

    function Option(x, context) {
      return new constructors[0](x, context)
    }

    function Some(x, context) {
      return new constructors[1](x, context)
    }

    function None() {
      return new constructors[2]()
    }

    __exports__.Option = Option;
    __exports__.Some = Some;
    __exports__.None = None;
  });