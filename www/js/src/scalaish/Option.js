define("scalaish/Option",
  ["underscore","./helpers/helpers","./Any","./Exceptions","./util/Either","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var _ = __dependency1__;
    var __result = __dependency2__.__result;
    var Any = __dependency3__.Any;
    var NoSuchElementException = __dependency4__.NoSuchElementException;
    var Left = __dependency5__.Left;
    var Right = __dependency5__.Right;

    /**
     * Represents optional values. Instances of `Option`
     * are either an instance of $some or the object $none.
     *
     * The most idiomatic way to use an $option instance is to treat it
     * as a collection or monad and use `map`,`flatMap`, `filter`, or
     * `foreach`:
     *
     * @example
     * var name = request.getParameter("name")
     * var upper = name.map(function(n) {
     *   return n.trim();
     * }).filter(function(n) {
     *   return n.length !== 0;
     * }).map(function(n) {
     *   return n.toUpperCase();
     * })
     * console.log(upper.getOrElse("")
     *
     * This allows for sophisticated chaining of $option values without
     * having to check for the existence of a value.
     *
     * A less-idiomatic way to use $option values is via pattern matching:
     *
     * @example
     * var nameMaybe = request.getParameter("name")
     * nameMaybe.match()
     *   .case(Some, function(name) {
     *     console.log(name.trim().toUppercase())
     *   })
     *   .case(None, function() {
     *     console.log("No name value")
     *   })
     *
     * @template A
     * @param {A} x
     * @return {OptionImpl.<A>}
     * @constructor
     */
    function OptionImpl(x) {
      if (x == null) {
        return None();
      }
      else {
        return Some(x);
      }
    }

    OptionImpl.prototype = _.extend(Object.create(Any.prototype), {
      Option: true,
      companion: Option,

      /**
       * Returns true if the option is $none, false otherwise.
       */
      isEmpty: undefined,

      /**
       * Returns true if the option is an instance of $some, false otherwise.
       * @return {boolean}
       */
      isDefined: function () {
        return !this.isEmpty;
      },

      /**
       * Returns the option's value.
       * Note: The option must be nonEmpty.
       * @template A
       * @throws {NoSuchElementException} - if the option is empty.
       * @return {A}
       */
      // TODO: Rename to avoid JS Object conflict?
      get: function () {
        throw new Error("TODO: NotImplementedError");
      },

      /**
       * Returns the option's value if the option is nonempty, otherwise
       * return the result of evaluating `def`.
       *
       * @template A
       * @param {A|function(): A} def - the default expression.
       * @param {Object=} context
       * @return {A}
       */
      getOrElse: function (def, context) {
        if (this.isEmpty) {
          return __result(def, context);
        } else {
          return this.get();
        }
      },

      /**
       * Returns the option's value if it is nonempty,
       * or `null` if it is empty.
       * Although the use of null is discouraged, code written to use
       * $option must often interface with code that expects and returns nulls.
       * @template A
       * @return {A|null}
       */
      orNull: function () {
        return this.getOrElse(null);
      },

      /**
       * Returns a $some containing the result of applying $f to this $option's
       * value if this $option is nonempty.
       * Otherwise return $none.
       *
       * Note: This is similar to `flatMap` except here,
       * $f does not need to wrap its result in an $option.
       *
       * @template A, B
       * @param  f {function(A): B} the function to apply
       * @param {Object=} context
       * @return OptionImpl.<B>
       *
       * @see flatMap
       * @see forEach
       */
      map: function (f, context) {
        if (this.isEmpty) {
          return None();
        } else {
          return Some(f.call(context, this.get()));
        }
      },

      /**
       * Returns the result of applying $f to this $option's
       * value if the $option is nonempty.  Otherwise, evaluates
       * expression `ifEmpty`.
       *
       * Note: This is equivalent to `$option map f getOrElse ifEmpty`.
       *
       * @template A, B
       * @param ifEmpty {B|function(): B} - the expression to evaluate if empty.
       * @param {Object=} contextIfEmpty
       * @return {function((B|function(A): B), [Object]): B}
       */
      fold: function (ifEmpty, contextIfEmpty) {
        // TODO: Better way to document this / better way for partial application?
        /**
         * @template A, B
         * @param f {B|function(A): B} - the function to apply if nonempty.
         * @param {Object=} context
         * @return {B}
         */
        return function (f, context) {
          if (this.isEmpty) {
            return __result(ifEmpty, contextIfEmpty);
          } else {
            return f.call(context, this.get());
          }
        }.bind(this);
      },

      /**
       * Returns the result of applying $f to this $option's value if
       * this $option is nonempty.
       * Returns $none if this $option is empty.
       * Slightly different from `map` in that $f is expected to
       * return an $option (which could be $none).
       *
       * @template A, B
       * @param {function(A): OptionImpl.<B>} f - the function to apply
       * @param {Object=} context -
       * @return {OptionImpl.<B>}
       *
       * @see map
       * @see forEach
       */
      flatMap: function (f, context) {
        if (this.isEmpty) {
          return None();
        } else {
          return f.call(context, this.get());
        }
      },

      flatten: function () {
        if (this.isEmpty) {
          return None();
        } else {
          return this.get();
        }
      },

      /**
       * Returns this $option if it is nonempty '''and''' applying the predicate $p to
       * this $option's value returns true. Otherwise, return $none.
       *
       * @template A
       * @param {function(A): boolean} p - the predicate used for testing.
       * @param {Object=} context
       * @return {OptionImpl.<A>}
       */
      filter: function (p, context) {
        if (this.isEmpty || p.call(context, this.get())) {
          return this;
        } else {
          return None();
        }
      },

      /**
       * Returns this $option if it is nonempty '''and''' applying the predicate $p to
       * this $option's value returns false. Otherwise, return $none.
       *
       * @template A
       * @param {function(A): boolean} p - the predicate used for testing.
       * @param {Object=} context
       * @return {OptionImpl.<A>}
       */
      filterNot: function (p, context) {
        if (this.isEmpty || !p.call(context, this.get())) {
          return this;
        } else {
          return None();
        }
      },

      nonEmpty: function () {
        return this.isDefined();
      },

      // TODO: This is the exact same code as in Try
      withFilter: function (p, context) {
        var self = this;

        // TODO: Use pseudo case class?
        /**
         * @template A
         * @param {function(A): boolean} p
         * @param {Object=} context
         * @constructor
         */
        function WithFilter(p, context) {
          this.p = p;
          this.context = context;
        }

        WithFilter.prototype = {
          map: function (f, context) {
            return self.filter(this.p, this.context).map(f, context);
          },
          flatMap: function (f, context) {
            return self.filter(this.p, this.context).flatMap(f, context);
          },
          foreach: function (f, context) {
            return self.filter(this.p, this.context).foreach(f, context);
          },
          withFilter: function (q, context) {
            return new WithFilter(function (x) {
              return self.p.call(self.context, x) && q.call(context, x);
            }, context);
          }
        };

        return new WithFilter(p, context);
      },

      /**
       * Tests whether the option contains a given value as an element.
       *
       * @template A
       * @param {A} elem - the element to test.
       * @return {boolean} - `true` if the option has an element that is equal (as
       * determined by `===`) to `elem`, `false` otherwise.
       */
      contains: function (elem) {
        // TODO: equals?
        return !this.isEmpty && this.get() === elem;
      },

      /**
       * Returns true if this option is nonempty '''and''' the predicate
       * $p returns true when applied to this $option's value.
       * Otherwise, returns false.
       *
       * @template A
       * @param {function(A): boolean} p - the predicate to test
       * @param {Object=} context
       * @return {boolean}
       */
      exists: function (p, context) {
        return !this.isEmpty && p.call(context, this.get());
      },

      /**
       * Returns true if this option is empty '''or''' the predicate
       * $p returns true when applied to this $option's value.
       *
       * @template A
       * @param {function(A): boolean} p - the predicate to test
       * @param {Object=} context
       * @return {boolean}
       */
      forAll: function (p, context) {
        return this.isEmpty || p.call(context, this.get());
      },

      /**
       * Apply the given procedure $f to the option's value,
       * if it is nonempty. Otherwise, do nothing.
       *
       * @template A
       * @param {function(A)} f - the procedure to apply.
       * @param {Object=} context
       * @return {undefined}
       *
       * @see map
       * @see flatMap
       */
      forEach: function (f, context) {
        if (!this.isEmpty) {
          return f.call(context, this.get());
        }
      },

      // TODO: collect

      /**
       * Returns this $option if it is nonempty,
       * otherwise return the result of evaluating `alternative`.
       *
       * @template A
       * @param alternative {OptionImpl.<A>|function(): OptionImpl.<A>} the alternative expression.
       * @param {Object=} context
       * @return {OptionImpl.<A>}
       */
      orElse: function (alternative, context) {
        if (this.isEmpty) {
          return __result(alternative, context);
        } else {
          return this;
        }
      },

      // TODO: iterator

      // TODO: toList

      /**
       * Returns a [[scala.util.Left]] containing the given
       * argument `left` if this $option is empty, or
       * a [[scala.util.Right]] containing this $option's value if
       * this is nonempty.
       *
       * @template X
       * @param {X|function(): X} left - the expression to evaluate and return if this is empty
       * @param {Object=} context
       * @return {EitherImpl}
       * @see toLeft
       */
      toRight: function(left, context) {
        return this.isEmpty ? Left(__result(left, context)) : Right(this.get());
      },

      /**
       * Returns a [[scala.util.Right]] containing the given
       * argument `right` if this is empty, or
       * a [[scala.util.Left]] containing this $option's value
       * if this $option is nonempty.
       *
       * @template X
       * @param {X|function(): X} right - the expression to evaluate and return if this is empty
       * @param {Object=} context
       * @return {EitherImpl}
       * @see toRight
       */
      toLeft: function(right, context) {
        return this.isEmpty ? Right(__result(right, context)) : Left(this.get());
      }
    });

    /**
     * @template A
     * @param {A} x
     * @constructor
     * @extends {OptionImpl.<A>}
     */
    function SomeImpl(x) {
      this.value = x;
    }

    SomeImpl.prototype = _.extend(Object.create(OptionImpl.prototype), {
      Some: true,
      companion: Some,

      /**
       * Returns the option's value.
       * Note: The option must be nonEmpty.
       * @template A
       * @throws {NoSuchElementException} - if the option is empty.
       * @return {A}
       */
      get: function () {
        return this.value;
      },

      /**
       * Returns true if the option is $none, false otherwise.
       * @type {boolean}
       */
      isEmpty: false
    });

    /**
     * @template A
     * @constructor
     * @extends {OptionImpl.<A>}
     */
    function NoneImpl() {
    }

    NoneImpl.prototype = _.extend(Object.create(OptionImpl.prototype), {
      None: true,
      companion: None,

      /**
       * Returns the option's value.
       * Note: The option must be nonEmpty.
       * @template A
       * @throws {NoSuchElementException} - if the option is empty.
       * @return {A}
       */
      get: function () {
        throw new NoSuchElementException("None.get");
      },

      /**
       * Returns true if the option is $none, false otherwise.
       * @type {boolean}
       */
      isEmpty: true
    });

    /**
     * An Option factory which creates Some(x) if the argument is not null,
     * and None if it is null.
     *
     * @template A
     * @param {A} x - the value
     * @return {OptionImpl.<A>} - Some(value) if value != null, None if value == null
     */
    function Option(x) {
      return new OptionImpl(x);
    }

    /**
     * @template A
     * @param {OptionImpl.<A>} opt
     * @return {A|null}
     */
      //TODO: pseudo case classes
    Option.unapply = function (opt) {
      if (opt.isEmpty) {
        return None.unapply(opt);
      } else {
        return Some.unapply(opt);
      }
    };

    /**
     * An Option factory which returns `None` in a manner consistent with
     * the collections hierarchy.
     *
     * @return {NoneImpl}
     */
    Option.empty = function () {
      return None();
    };

    /**
     * Class `Some[A]` represents existing values of type
     * `A`.
     *
     * @template A
     * @param {A} x
     * @return {SomeImpl.<A>}
     */
    function Some(x) {
      return new SomeImpl(x);
    }

    /**
     * @template A
     * @param {SomeImpl.<A>} opt
     * @return {A}
     */
      //TODO: pseudo case classes
    Some.unapply = function (opt) {
      return opt.get();
    };

    /**
     * This case object represents non-existent values.
     * @return {NoneImpl}
     */
    function None() {
      return None.instance;
    }

    /**
     * @param {NoneImpl} opt
     * @return {null}
     */
      //TODO: pseudo case classes
    None.unapply = function (opt) {
      return null;
    };

    None.instance = new NoneImpl();

    __exports__.Option = Option;
    __exports__.Some = Some;
    __exports__.None = None;
  });