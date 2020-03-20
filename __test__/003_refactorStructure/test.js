(function() {
  var sequence = "seq";
  test("only use test", function() {
    sequence += " test";
    expect(sequence).to.eq("seq test");
  });

  describe("describe 1", function() {
    test("test 1 in describe 1", function() {
      expect(sequence).to.eq("seq test beforeAll beforeEach");
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
    expect(sequence).to.eq(
      "seq test beforeAll beforeEach test afterEach afterAll"
    );
  });
})();
