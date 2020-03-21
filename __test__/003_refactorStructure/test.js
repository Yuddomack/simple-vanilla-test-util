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

  test("check after hooks", function() {
    expect(sequence).to.eq("seq beforeAll beforeEach test afterEach afterAll");
  });
})();
