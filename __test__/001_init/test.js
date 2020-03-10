(function() {
  // duck typing
  if (SVTU.expect || expect || _expect) {
    console.log("유틸 불러오기 성공");
  } else {
    throw new Error("유틸 불러오기 실패");
  }
})();
