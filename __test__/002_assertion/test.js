(function() {
  test("자료형 테스트", function() {
    test("숫자", function() {
      var num = 1;
      expect(num).to.eq(1);
      expect(num + 1).to.eq(2);
      expect(num + 0.1).to.eq(1.1);
    }).run();

    test("문자", function() {
      var str = "yuddomack";
      expect(str).to.eq("yuddomack");
      expect(str.replace("yuddomack", "")).to.eq("");
      expect(str + " is awesome").to.eq("yuddomack is awesome");
    }).run();

    test("배열", function() {
      var arr = [1, 2, 3];
      expect(arr).to.eq([1, 2, 3]);
      expect(arr.slice(1, 2)).to.eq([2]);
      var arr2 = arr.splice(0, 1);
      expect(arr2).to.eq([1]);
      expect(arr).to.eq([2, 3]);
    }).run();

    test("객체", function() {
      var obj = { a: 1 };
      expect(obj).to.eq({ a: 1 });
      obj.b = 2;
      expect(obj).to.eq({ a: 1, b: 2 });
    }).run();
  }).run();

  test("option 테스트", function() {
    var arr = [];
    expect(arr).to.eq([]);

    test("setUp and tearDown", function() {
      expect(arr).to.eq([1]);
      arr.push(2);
    })
      .setUp(function() {
        arr.push(1);
      })
      .tearDown(function() {
        arr.push(3);
      })
      .run();

    expect(arr).to.eq([1, 2, 3]);
  }).run();

  test("not equal 테스트", function() {
    var arr = [];
    expect(arr).to.neq([1]);
  }).run();
})();
