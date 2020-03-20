function createSVTU() {
  "use strict";

  function raiseError(expected, received, not) {
    return new Error(
      [
        (not && "not") || "",
        "expected",
        expected,
        "but received",
        received
      ].join(" ")
    );
  }

  function expect(received) {
    var to = {
      eq: function equal(expected) {
        toEqual(false, expected);
      },
      neq: function notEqual(expected) {
        toEqual(true, expected);
      }
    };
    function toEqual(not, expected) {
      var stringifiedExpected = JSON.stringify(expected);
      var stringifiedReceived = JSON.stringify(received);

      if ((stringifiedExpected === stringifiedReceived) === not) {
        throw raiseError(stringifiedExpected, stringifiedReceived, not);
      }
    }

    return {
      to: to
    };
  }

  function test() {}

  function describe() {}

  function beforeAll() {}

  function beforeEach() {}

  function afterEach() {}

  function afterAll() {}

  function stringRepeat(str, repeat) {
    var res = "";
    for (var i = 0; i <= repeat; i++) {
      res += str;
    }

    return res;
  }

  return {
    expect: expect,
    test: test,
    describe: describe,
    beforeAll: beforeAll,
    beforeEach: beforeEach,
    afterEach: afterEach,
    afterAll: afterAll
  };
}

// nodejs
if (typeof module === "object" && !!module.exports) {
  module.exports = createSVTU();
}
// browser
else if (typeof window === "object" && this === window) {
  (function initOnBrowser() {
    var SVTU = createSVTU();

    // 글로벌 선언을 하기위에 window 객체 검사
    // check 'window' for using SVTU method in global.
    var globalSVTU = !window.SVTU;
    var globalMethod = true;
    var globalUnderscoreMethod = true;

    var methods = [];
    var underscoreMethods = [];

    // Object.keys doesn't support < IE9
    for (var key in SVTU) {
      if (!SVTU.hasOwnProperty(key)) {
        continue;
      }

      methods.push(key);
      underscoreMethods.push("_" + key);

      if (key in window) {
        globalMethod = false;
      }
      if ("_" + key in window) {
        globalUnderscoreMethod = false;
      }
    }

    if (!globalSVTU && !globalMethod && !globalUnderscoreMethod) {
      throw new Error(
        "SVTU has already been declared." +
          "\n Determine if the following global variables are in use" +
          "\n SVTU <- or" +
          "\n " +
          methods.join(", ") +
          " <- or" +
          "\n " +
          underscoreMethods.join(", ") +
          " <-"
      );
    }

    // global에 등록
    // define SVTU to global
    if (globalSVTU) {
      window.SVTU = SVTU;
      console.log("SVTU object is initialized");
    }
    if (globalMethod) {
      for (var i = 0, length = methods.length; i < length; i++) {
        var key = methods[i];
        window[key] = SVTU[key];
      }
      console.log(methods.join(", ") + " are initialized");
    }
    if (underscoreMethods) {
      for (var i = 0, length = methods.length; i < length; i++) {
        var key = methods[i];
        window["_" + key] = SVTU[key];
      }
      console.log(underscoreMethods.join(", ") + " are initialized");
    }
  })();
} else {
  throw new Error(
    "hi dude :) I guess this isn't a normal runtime enviorment." +
      "\n but you sure, customize this logic"
  );
}
