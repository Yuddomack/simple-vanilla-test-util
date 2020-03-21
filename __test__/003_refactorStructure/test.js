(function() {
  var sequence = "seq";
  test("only use test", function() {
    var isGood = true;
    expect(isGood).to.eq(true);
  });

  describe("check template method", function() {
    test("test in describe", function() {
      sequence += " test";
    });

    beforeAll(function() {
      sequence += " beforeAll";
    });
    beforeEach(function() {
      sequence += " beforeEach";
    });
    afterAll(function() {
      sequence += " afterAll";
    });
    afterEach(function() {
      sequence += " afterEach";
    });
  });

  test("check result from template method", function() {
    expect(sequence).to.eq("seq beforeAll beforeEach test afterEach afterAll");
  });

  describe("check describe in describe template method", function() {
    //

    beforeAll(function() {
      sequence = "seq";
    });

    beforeEach(function() {
      sequence += " beforeEach";
    });

    afterEach(function() {
      sequence += " afterEach";
    });

    describe("describe level 2", function desc2() {
      beforeAll(function() {
        sequence += " beforeAll2";
      });
      beforeEach(function() {
        sequence += " beforeEach2";
      });

      test("test 1 in describe level 2", function test1() {
        // nothing
      });

      test("test 2 in describe level 2", function test2() {
        // nothing
      });

      afterAll(function() {
        sequence += " afterAll2";
      });
    });
  });

  test("check result from describe in describe template method", function() {
    expect(sequence).to.eq(
      "seq beforeAll2 beforeEach beforeEach2 afterEach beforeEach beforeEach2 afterEach afterAll2"
    );
  });

  describe("afterEach when fail test", function() {
    beforeAll(function() {
      sequence = "seq";
    });

    test("raise exception", function() {
      expect(10).to.eq(20);
    });

    afterEach(function() {
      sequence = "";
    });
  });

  test("check afterEach when fail test", function() {
    expect(sequence).to.eq("");
  });

  describe("template method life cycle", function() {
    beforeAll(function() {
      console.log("1 - beforeAll");
    });
    afterAll(function() {
      console.log("1 - afterAll");
    });
    beforeEach(function() {
      console.log("1 - beforeEach");
    });
    afterEach(function() {
      console.log("1 - afterEach");
    });
    test("", function() {
      console.log("1 - test");
    });

    describe("Scoped / Nested block", function() {
      beforeAll(function() {
        console.log("2 - beforeAll");
      });
      afterAll(function() {
        console.log("2 - afterAll");
      });
      beforeEach(function() {
        console.log("2 - beforeEach");
      });
      afterEach(function() {
        console.log("2 - afterEach");
      });
      test("", function() {
        console.log("2 - test");
      });
    });
  });
})();
