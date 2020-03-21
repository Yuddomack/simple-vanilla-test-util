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
    var testTask = testTaskCreator(description, func);

    if (depthLevel === 0) {
      // 단일 test의 경우
      testTask();
      return;
    }

    if (!taskQueue[depthLevel]) {
      taskQueue[depthLevel] = [];
    }

    taskQueue[depthLevel].push(testTask);
  }

  function testTaskCreator(description, func) {
    return function() {
      for (var i = 0; i <= depthLevel; i++) {
        if (hooksQueue[i] && hooksQueue[i].beforeEach) {
          hooksQueue[i].beforeEach();
        }
      }
      try {
        func();
      } catch (e) {
        console.error(e);
      }
      for (var i = depthLevel; i >= 0; i--) {
        if (hooksQueue[i] && hooksQueue[i].afterEach) {
          hooksQueue[i].afterEach();
        }
      }
    };
  }
  var scrap = true;
  function describe(description, func) {
    if (scrap === true) {
      scrap = false;
      depthLevel++;
      func();
      scrap = true;
      run();
      depthLevel--;

      return;
    }

    if (!taskQueue[depthLevel]) {
      taskQueue[depthLevel] = [];
    }

    taskQueue[depthLevel].push(function() {
      return describe(description, func);
    });
  }

  function run() {
    var tasks = taskQueue[depthLevel];

    hooksQueue[depthLevel] &&
      hooksQueue[depthLevel].beforeAll &&
      hooksQueue[depthLevel].beforeAll();

    for (var i = 0; i < tasks.length; i++) {
      for (var bi = 0; bi <= depthLevel; bi++) {
        hooksQueue[bi] &&
          hooksQueue[bi].beforeEach &&
          hooksQueue[bi].beforeEach();
      }
      tasks[i]();
      for (var ai = depthLevel; ai >= 0; ai--) {
        hooksQueue[ai] &&
          hooksQueue[ai].afterEach &&
          hooksQueue[ai].afterEach();
      }
    }

    hooksQueue[depthLevel] &&
      hooksQueue[depthLevel].afterAll &&
      hooksQueue[depthLevel].afterAll();

    hooksQueue.splice(depthLevel, 1);
    taskQueue.splice(depthLevel, 1);
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

  function runHooks(hookOption, depth) {
    // after은 역순진행이 맞지않나
    for (var i = 0; i <= depth; i++) {
      if (hooksQueue[i] && hooksQueue[i][hookOption]) {
        hooksQueue[i][hookOption]();
      }
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
