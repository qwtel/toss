define("scalaish/Exceptions",
  ["exports"],
  function(__exports__) {
    "use strict";
    function Throwable(message, fileName, lineNumber) {
      Error.call(this, arguments);
      Error.captureStackTrace(this, Throwable);

      if (message) this.message = message;
      if (fileName) this.fileName = fileName;
      if (lineNumber) this.lineNumber = lineNumber;
    }
    Throwable.prototype = Object.create(Error.prototype);
    Throwable.prototype.name = Throwable.name;

    function Exception() {
      Throwable.apply(this, arguments);
      Error.captureStackTrace(this, Exception);
    }
    Exception.prototype = Object.create(Throwable.prototype);
    Exception.prototype.name = Exception.name;

    function RuntimeException() {
      Exception.apply(this, arguments);
      Error.captureStackTrace(this, RuntimeException);
    }
    RuntimeException.prototype = Object.create(Exception.prototype);
    RuntimeException.prototype.name = RuntimeException.name;

    function NoSuchElementException() {
      RuntimeException.apply(this, arguments);
      Error.captureStackTrace(this, NoSuchElementException);
    }
    NoSuchElementException.prototype = Object.create(RuntimeException.prototype);
    NoSuchElementException.prototype.name = NoSuchElementException.name;

    function UnsupportedOperationException() {
      RuntimeException.apply(this, arguments);
      Error.captureStackTrace(this, UnsupportedOperationException);
    }
    UnsupportedOperationException.prototype = Object.create(RuntimeException.prototype);
    UnsupportedOperationException.prototype.name = UnsupportedOperationException.name;

    function IndexOutOfBoundsException() {
      RuntimeException.apply(this, arguments);
      Error.captureStackTrace(this, IndexOutOfBoundsException);
    }
    IndexOutOfBoundsException.prototype = Object.create(RuntimeException.prototype);
    IndexOutOfBoundsException.prototype.name = IndexOutOfBoundsException.name;

    // TODO

    __exports__.Throwable = Throwable;
    __exports__.Exception = Exception;
    __exports__.RuntimeException = RuntimeException;
    __exports__.NoSuchElementException = NoSuchElementException;
    __exports__.UnsupportedOperationException = UnsupportedOperationException;
    __exports__.IndexOutOfBoundsException = IndexOutOfBoundsException;
  });