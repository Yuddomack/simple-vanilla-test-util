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

  return {
    author: author,
    expect: expect
  };
}

// browser
if (typeof window !== "undefined" && this === window) {
  window.SVTU = createSVTU();

  // nodejs
} else if (!!module && !!module.exports) {
  module.exports = createSVTU();
} else {
  throw new Error(
    "hi dude :) I guess this isn't a normal runtime enviorment \n but you sure, customize this logic"
  );
}
