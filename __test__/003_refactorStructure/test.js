(function() {
  var SOMETHING = [];

  // test("beforeEach test", function() {
  //   console.log("1 - test");
  //   expect(SOMETHING).toEqual([1]);

  //   // beforeEach(function() {
  //   //   console.log("throw");
  //   // });
  // });

  test("first test", function() {
    console.log("started");
    expect(10).toEqual(10);
  });
  console.log(hooks);

  // console.log("1 - global");

  // describe("describe", function() {
  //   test("test in describe", function() {
  //     console.log("2 - test1");
  //     expect(10).toEqual(10);
  //   });

  //   beforeEach(function() {
  //     console.log("2 - beforeEach");
  //   });

  //   test("test in describe", function() {
  //     console.log("2 - test2");
  //     expect(10).toEqual(10);
  //   });
  // });

  // console.log(describes);
  // console.log(hooks);
})();
