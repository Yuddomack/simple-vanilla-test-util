function createSVTU() {
  "use strict";

  var author = "yuddomack";

  function expect(value) {
    function toBe(value) {}

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
