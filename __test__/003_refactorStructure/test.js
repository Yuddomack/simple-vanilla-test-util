(function() {
  var sequence = "seq";
  test("only use test", function() {
    var isGood = true;
    expect(isGood).to.eq(true);
  });

  describe("describe 1", function() {
    test("test 1 in describe 1", function() {
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

  test("check hooks", function() {
    expect(sequence).to.eq("seq beforeAll beforeEach test afterEach afterAll");
  });

  describe("describe 2", function() {
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

    describe("describe 2-1", function desc2() {
      beforeAll(function() {
        sequence += " beforeAll2";
      });
      beforeEach(function() {
        sequence += " beforeEach2";
      });

      test("something", function test1() {
        // nothing
      });

      test("something", function test2() {
        // nothing
      });

      afterAll(function() {
        sequence += " afterAll2";
      });
    });
  });

  test("check hooks", function() {
    expect(sequence).to.eq(
      "seq beforeAll2 beforeEach beforeEach2 afterEach beforeEach beforeEach2 afterEach afterAll2"
    );
  });
})();
