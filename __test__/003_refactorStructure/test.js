(function() {
  var SOMETHING = [];
  beforeEach(function() {
    console.log("hi");
    SOMETHING.push(1);
  });
  test("beforeEach test", function() {
    expect(SOMETHING).toEqual([1]);

    // beforeEach(function() {
    //   console.log("throw");
    // });
  });
  console.log(tasks);
})();
