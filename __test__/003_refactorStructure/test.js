(function() {
  var sequence = "seq";
  test("only use test", function() {
    sequence += " test";
    expect(sequence).to.eq("seq test");
  });

  // describe("describe 1", function() {
  //   test("beforeAll test", function() {
  //     expect(sequence).to.eq("seq test beforeAll");
  //   });

  //   // hooks 등록을 아래에 해도 먼저 실행이 되어야 함
  //   beforeAll(function() {
  //     sequence += " beforeAll";
  //   });

  //   console.log(hooksQueue);
  //   console.log(testQueue);
  // });

  // describe("describe 1", function() {
  //   test("test 1 in describe 1", function() {
  //     expect(sequence).to.eq("seq test beforeAll beforeEach");
  //     sequence += " test";
  //   });

  //   beforeAll(function() {
  //     sequence += " beforeAll";
  //   });
  //   beforeEach(function() {
  //     sequence += " beforeEach";
  //   });
  //   afterAll(function() {
  //     sequence += " afterAll";
  //   });
  //   afterEach(function() {
  //     sequence += " afterEach";
  //   });
  // });

  // test("check after hooks", function() {
  //   expect(sequence).to.eq(
  //     "seq test beforeAll beforeEach test afterEach afterAll"
  //   );
  // });
})();
