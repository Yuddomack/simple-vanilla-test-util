function createSVTU() {
  "strict mode";

  var author = "yuddomack";

  // 'this' must be global obj
  this.SVTU = {
    author: author
  };
}

if (!this.SVTU) {
  createSVTU();
}
