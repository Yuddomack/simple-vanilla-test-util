function createSVTU() {
  var author = "yuddomack";
  return {
    author: author
  };
}

// 'this' must be global obj
if (!this.SVTU) {
  this.SVTU = createSVTU();
}
