(function() {
  var num = 1;
  var arr = [1, 2, 3];
  var obj = { a: 1 };

  SVTU.expect(num); // 문제없음
  SVTU.expect(num).toEqual(1); // 문제없음
  // SVTU.expect(num).toEqual(2); // 예외발생

  SVTU.expect(arr).toEqual([1, 2, 3]); // 문제없음
  // SVTU.expect(arr).toEqual([1, 2]); // 예외발생

  SVTU.expect(obj).toEqual({ a: 1 }); // 문제없음
  // SVTU.expect(obj).toEqual({ a: 1, b: 2 }); // 예외발생
})();
