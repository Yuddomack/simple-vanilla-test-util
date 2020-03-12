(function() {
  test("자료형 테스트", function() {
    test("숫자", function() {
      var num = 1;
      expect(num).toEqual(1);
      expect(num + 1).toEqual(2);
      expect(num + 0.1).toEqual(1.1);
    });

    test("문자", function() {
      var str = "yuddomack";
      expect(str).toEqual("yuddomack");
      expect(str.replace("yuddomack", "")).toEqual("");
      expect(str + " is awesome").toEqual("yuddomack is awesome");
    });

    test("배열", function() {
      var arr = [1, 2, 3];
      expect(arr).toEqual([1, 2, 3]);
      expect(arr.slice(1, 2)).toEqual([2]);
      var arr2 = arr.splice(0, 1);
      expect(arr2).toEqual([1]);
      expect(arr).toEqual([2, 3]);
    });

    test("객체", function() {
      var obj = { a: 1 };
      expect(obj).toEqual({ a: 1 });
      obj.b = 2;
      expect(obj).toEqual({ a: 1, b: 2 });
    });
  });
})();
