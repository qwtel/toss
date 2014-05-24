define("scalaish/util/Try",
  ["../helpers/helpers","underscore","../Option","exports"],
  function(__dependency1__, _, __dependency3__, __exports__) {
    "use strict";
    var __result = __dependency1__.__result;
    var Some = __dependency3__.Some;
    var None = __dependency3__.None;
    //import {NoSuchElementException, UnsupportedOperationException} from '../Exceptions';

    function NoSuchElementException() {
    }

    function UnsupportedOperationException() {
    }

    var constructors = (function () {
      var TTry = {
        isFailure: null,

        isSuccess: null,

        getOrElse: function (def, context) {
          return this.isSuccess() ? this.get() : __result(def, context);
        },

        orElse: function (def, context) {
          try {
            return this.isSuccess() ? this : __result(def, context);
          }
          catch (e) {
            // TODO: NonFatal
            return new Failure(e);
          }
        },

        get: null,

        forEach: null,

        flatMap: null,

        map: null,

        filter: null,

        // TODO: withFilter

        recoverWith: null,

        recover: null,

        toOption: function () {
          return this.isSuccess() ? Some(this.get()) : None()
        },

        flatten: null,

        failed: null,

        transform: function (s, f, context) {
          try {
            // TODO: (pseudo) pattern matching?
            if (this.isSuccess()) {
              return s.call(context, this.value)
            } else if (this.isFailure()) {
              return f.call(context, this.exception)
            }
          } catch (e) {
            // TODO: NonFatal
            return new Failure(e)
          }
        }
      };

      var TFailure = {
        exception: null,

        isFailure: function () {
          return true
        },

        isSuccess: function () {
          return false
        },

        recoverWith: function (f, context) {
          try {
            return (true /* TODO */) ? f.call(context, this.exception) : this
          } catch (e) {
            // TODO: NonFatal
            return new Failure(e)
          }
        },

        get: function () {
          throw this.exception
        },

        flatMap: function () {
          return this
        },

        flatten: function () {
          return this
        },

        forEach: function () {
        },

        map: function () {
          return this
        },

        filter: function () {
          return this
        },

        recover: function (rescueException, context) {
          try {
            return (true /* TODO */) ? new Try(rescueException.bind(context, this.exception)) : this
          } catch (e) {
            // TODO: NonFatal
            return new Failure(e)
          }
        },

        failed: function () {
          return new Success(this.exception)
        }
      };

      var TSuccess = {
        value: null,

        isFailure: function () {
          return false
        },

        isSuccess: function () {
          return true
        },

        recoverWith: function () {
          return this
        },

        get: function () {
          return this.value
        },

        flatMap: function (f, context) {
          try {
            return f.call(context, this.value)
          } catch (e) {
            // TODO: NonFatal
            return new Failure(e)
          }
        },

        flatten: function () {
          return this.value
        },

        forEach: function (f, context) {
          f.call(context, this.value)
        },

        map: function (f, context) {
          return new Try(f.bind(context, this.value))
        },

        filter: function (p, context) {
          try {
            return p.call(context, this.value) ?
              this : new Failure(new NoSuchElementException("Predicate does not hold for " + this.value))
          } catch (e) {
            // TODO: NonFatal
            return new Failure(e)
          }
        },

        recover: function () {
          return this
        },

        failed: function () {
          return new Failure(new UnsupportedOperationException("Success.failed"))
        }
      };

      function Try(r, context) {
        try {
          return new Success(r, context)
        } catch (e) {
          // TODO: NonFatal
          return new Failure(e)
        }
      }

      Try.prototype = TTry;

      function Success(v, context) {
        this.value = __result(v, context);
      }

      Success.prototype = _.extend(Object.create(Try.prototype), TSuccess);

      function Failure(e) {
        this.exception = e;
      }
      Failure.prototype = _.extend(Object.create(Try.prototype), TFailure);

      return [Try, Success, Failure]
    })();

    function Try(r, context) {
      return new constructors[0](r, context);
    }

    function Success(v, context) {
      return new constructors[1](v, context);
    }

    function Failure(e) {
      return new constructors[2](e);
    }

    __exports__.Try = Try;
    __exports__.Success = Success;
    __exports__.Failure = Failure;
  });