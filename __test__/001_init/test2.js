(function() {
  // duck typing
  if (
    !SVTU.expect &&
    !(expect instanceof Function) &&
    !(_expect instanceof Function)
  ) {
    console.log("유틸 불러오기 실패");
  } else {
    throw new Error("유틸 불러오기 성공");
  }
})();
