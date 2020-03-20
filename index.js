function createSVTU() {
  "use strict";

  function raiseError(expected, received, not) {
    return new Error(
      [
        (not && "not") || "",
        "expected",
        expected,
        "but received",
        received
      ].join(" ")
    );
  }

  function expect(received) {
    var to = {
      eq: function equal(expected) {
        toEqual(false, expected);
      },
      neq: function notEqual(expected) {
        toEqual(true, expected);
      }
    };
    function toEqual(not, expected) {
      var stringifiedExpected = JSON.stringify(expected);
      var stringifiedReceived = JSON.stringify(received);

      if ((stringifiedExpected === stringifiedReceived) === not) {
        throw raiseError(stringifiedExpected, stringifiedReceived, not);
      }
    }

    return {
      to: to
    };
  }

  var taskQueue = [];
  var hooksQueue = [];
  var depthLevel = 0;

  function test(description, func) {
    // beforeEach 실행
    taskQueue.push({
      func: func,
      depthLevel: depthLevel,
      runner: testRunner
    });
    // afterEach 실행

    if (depthLevel === 0) {
      // depthLevel이 0인 경우는 describe 없이 test 함수만
      // 단독으로 사용하는 경우
      run(); // func(); -> run();
      // try catch는 runner로 통일하고, 여기서는 푸시 후 바로 러너 호출 이런식으로
    }
  }

  function testRunner(func) {} // todo 여기까지 생각함

  function describe(description, func) {
    if (depthLevel === 0) {
      func();
      return;
    }
    // func가 test일때,
    // func가 describe일때,
    // func가 hooks일때
    // describe도 describe 러너를 push 해주는게 맞는듯? tdd의 expression처럼

    depthLevel++;

    func();
    // 러너가 종료되어야 level--이 맞는듯
    // 왜냐면 러너에서 describe를 만나면 depthLevel이 또 증가할테니
  }

  function run() {
    var task = taskQueue.shift();

    task.runner(task.func);
  }

  function beforeAll(func) {
    registerHooks("beforeAll", depthLevel, func);
  }

  function beforeEach(func) {
    registerHooks("beforeEach", depthLevel, func);
  }

  function afterEach(func) {
    registerHooks("afterEach", depthLevel, func);
  }

  function afterAll(func) {
    registerHooks("afterAll", depthLevel, func);
  }

  function registerHooks(hookOption, hookDepthLevel, func) {
    if (!(func instanceof Function)) {
      throw new Error(hookOption + " only function");
    } else if (hookDepthLevel < 0) {
      throw new Error(hookOption + " only use inside 'describe'");
    } else {
      hooksQueue[hookDepthLevel] = hooksQueue[hookDepthLevel] || {};
      hooksQueue[hookDepthLevel][hookOption] = func;
    }
  }

  function stringRepeat(str, repeat) {
    var res = "";
    for (var i = 0; i <= repeat; i++) {
      res += str;
    }

    return res;
  }

  return {
    expect: expect,
    test: test,
    describe: describe,
    beforeAll: beforeAll,
    beforeEach: beforeEach,
    afterEach: afterEach,
    afterAll: afterAll,
    hooksQueue: hooksQueue,
    taskQueue: taskQueue
  };
}

// nodejs
if (typeof module === "object" && !!module.exports) {
  module.exports = createSVTU();
}
// browser
else if (typeof window === "object" && this === window) {
  (function initOnBrowser() {
    var SVTU = createSVTU();

    // 글로벌 선언을 하기위에 window 객체 검사
    // check 'window' for using SVTU method in global.
    var globalSVTU = !window.SVTU;
    var globalMethod = true;
    var globalUnderscoreMethod = true;

    var methods = [];
    var underscoreMethods = [];

    // Object.keys doesn't support < IE9
    for (var key in SVTU) {
      if (!SVTU.hasOwnProperty(key)) {
        continue;
      }

      methods.push(key);
      underscoreMethods.push("_" + key);

      if (key in window) {
        globalMethod = false;
      }
      if ("_" + key in window) {
        globalUnderscoreMethod = false;
      }
    }

    if (!globalSVTU && !globalMethod && !globalUnderscoreMethod) {
      throw new Error(
        "SVTU has already been declared." +
          "\n Determine if the following global variables are in use" +
          "\n SVTU <- or" +
          "\n " +
          methods.join(", ") +
          " <- or" +
          "\n " +
          underscoreMethods.join(", ") +
          " <-"
      );
    }

    // global에 등록
    // define SVTU to global
    if (globalSVTU) {
      window.SVTU = SVTU;
      console.log("SVTU object is initialized");
    }
    if (globalMethod) {
      for (var i = 0, length = methods.length; i < length; i++) {
        var key = methods[i];
        window[key] = SVTU[key];
      }
      console.log(methods.join(", ") + " are initialized");
    }
    if (underscoreMethods) {
      for (var i = 0, length = methods.length; i < length; i++) {
        var key = methods[i];
        window["_" + key] = SVTU[key];
      }
      console.log(underscoreMethods.join(", ") + " are initialized");
    }
  })();
} else {
  throw new Error(
    "hi dude :) I guess this isn't a normal runtime enviorment." +
      "\n but you sure, customize this logic"
  );
}
