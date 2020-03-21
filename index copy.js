function createSVTU() {
  "use strict";

  function raiseError(expected, received) {
    return new Error(
      ["expected", expected, "but received", received].join(" ")
    );
  }

  function expect(received) {
    function toEqual(expected) {
      var stringifiedExpected = JSON.stringify(expected);
      var stringifiedReceived = JSON.stringify(received);

      if (stringifiedExpected !== stringifiedReceived) {
        throw raiseError(stringifiedExpected, stringifiedReceived);
      }
    }

    return {
      toEqual
    };
  }

  function test(description, testTask) {
    var options = {
      setUp: function() {},
      tearDown: function() {}
    };

    return {
      setUp: function(f) {
        if (f instanceof Function) {
          options.setUp = f;
        } else {
          throw new Error("setUp is only function");
        }

        return this;
      },
      tearDown: function(f) {
        if (f instanceof Function) {
          options.tearDown = f;
        } else {
          throw new Error("tearDown is only function");
        }

        return this;
      },
      run: function() {
        console.log("[start] " + description); // 외부에 스택으로 관리하면 되려나
        options.setUp();

        try {
          testTask();
          console.log(description + " ..... [passed]");
        } catch (e) {
          console.error(description) + " ..... [failed]";
          console.error(e);
        }

        options.tearDown();
      }
    };
  }

  var depth = -1;
  var execute = "";
  var describes = [];
  var hooks = [];
  var queue = [];

  function test(taskName, taskFunc) {
    execute = "test";

    queue.push({
      depth: depth,
      name: taskName,
      func: taskFunc
    });

    // depth는 -1로 시작해서 describe가 중첩될수록 증가함
    // describe 없이 순수 test는 실행을하고, describe에 감싸진 테스트는 describe에서 제어
    if (depth < 0) {
      testRunner();
    }
  }

  function testRunner() {
    var task = queue.shift();

    runHooks("beforeEach", task.depth);
    try {
      task.func();
      console.log(
        stringRepeat("\t", depth),
        "*",
        task.name,
        "..... [ passed! ]"
      );
    } catch (e) {
      console.log(
        stringRepeat("\t", depth),
        "*",
        task.name,
        "..... [ failed :( ]"
      );
      console.error(e);
    }
    runHooks("afterEach", task.depth);
  }

  // 수평으로 있을땐 어쩔건데
  function describe(taskName, taskFunc) {
    console.log(stringRepeat("\t", depth), "#", taskName);

    depth++;

    describes[depth] = {
      name: taskName,
      func: taskFunc,
      depth: depth
    };

    describeRunner();

    depth--;
  }

  function describeRunner() {
    var task = describes[depth]; // or pop?

    try {
      task.func();
    } catch (e) {
      console.error(e);
    }

    runHooks("beforeAll", task.depth);
    while (queue.length) {
      testRunner();
    }
    runHooks("afterAll", task.depth);
  }

  function beforeEach(func) {
    registerHooks("beforeEach", func);
  }

  function afterEach(func) {
    registerHooks("afterEach", func);
  }

  function beforeAll(func) {
    registerHooks("beforeAll", func);
  }

  function afterAll(func) {
    registerHooks("afterAll", func);
  }

  function registerHooks(hookOption, func) {
    if (!(func instanceof Function)) {
      throw new Error(hookOption + " only function");
    }
    // else if (execute === "test") {
    //   throw new Error(hookOption + " only inside 'describe'");
    // }
    else if (depth < 0) {
      throw new Error(hookOption + " only inside 'describe'");
    } else {
      hooks[depth] = hooks[depth] || {};
      hooks[depth][hookOption] = func;
    }
  }

  function runHooks(hookOption, depth) {
    for (var i = 0; i <= depth; i++) {
      if (hooks[i] && hooks[i][hookOption]) {
        hooks[i][hookOption]();
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
    beforeEach: beforeEach,
    afterEach: afterEach,
    beforeAll: beforeAll,
    afterAll: afterAll,
    describe: describe,
    describes: describes,
    hooks: hooks
  };
}

// var queue = [];
// function test(des, f) {
//   queue.push({
//     des,
//     f
//   });
// }
// run도 따로 만들어서
// function run(f){
//   f();
//   queue.pop();
// }

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