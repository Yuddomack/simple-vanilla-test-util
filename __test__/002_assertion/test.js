(function() {
  var num = 1;
  var arr = [1, 2, 3];
  var obj = { a: 1 };

  SVTU.expect(num); // 문제없음
  SVTU.expect(num).toBe(1); // 문제없음
  SVTU.expect(num).toBe(2); // 예외발생

  SVTU.expect(arr).toBe([1, 2, 3]); // 문제없음
  SVTU.expect(arr).toBe([1, 2]); // 예외발생

  SVTU.expect(obj).toBe({ a: 1 }); // 문제없음
  SVTU.expect(obj).toBe({ a: 1, a: 2 }); // 예외발생
})();
