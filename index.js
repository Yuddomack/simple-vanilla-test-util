function createSVTU() {
  "use strict";

  var author = "yuddomack";

  function expect(received) {
    function toBe(expected) {
      if (received === expected) {
      } else {
        throw new Error(
          ["expected", expected, "but received", received].join(" ")
        );
      }
    }

    return {
      toBe
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
