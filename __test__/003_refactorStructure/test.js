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

  describe("first describe", function() {
    expect(20).toEqual(20);

    test("1 - test1", function() {
      expect(20).toEqual(20);
    });

    beforeEach(function() {
      console.log("1 - beforeEach");
    });

    // describe("second describe", function() {
    //   expect("qwer").toEqual("qwer");

    //   test("2 - test", function() {
    //     expect(40).toEqual(40);
    //   });
    // });

    afterEach(function() {
      console.log("1 - afterEach");
    });

    test("1 - test2", function() {
      expect("yu").toEqual("yu");
    });

    beforeAll(function() {
      console.log("1 - beforeAll");
    });

    afterAll(function() {
      console.log("1 - afterAll");
    });
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
