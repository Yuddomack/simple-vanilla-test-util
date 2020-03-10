function createSVTU() {
  "use strict";

  var author = "yuddomack";

  function raiseError(expected, received) {
    return new Error(
      ["expected", expected, "but received", received].join(" ")
    );
  }

  function expect(received) {
    function toEqual(expected) {
      var stringifiedExpected = JSON.stringify(expected),
        stringifiedReceived = JSON.stringify(received);

      if (stringifiedExpected === stringifiedReceived) {
        console.log("일치");
      } else {
        throw raiseError(stringifiedExpected, stringifiedReceived);
      }
    }

    return {
      toEqual
    };
  }

  // 'this' must be global obj
  this.SVTU = {
    author: author,
    expect: expect
  };
}

if (!this.SVTU) {
  createSVTU.call(this);
}
