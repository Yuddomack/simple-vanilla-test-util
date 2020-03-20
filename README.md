# simple-vanilla-test-util

simple vanilla test util(SVTU)은 별도의 빌드과정 없이 브라우저 위에서 바로 사용할 수 있는, QUnit을 모티브 삼아 조금 더 원시적이고 심플한 구현을 목표로 하는 테스트 유틸입니다.

## Initialize

### in browser

load SVTU (will be support cdn)<br>
also you can use by copy this

```html
<script src="path/of/SVTU.js">
```

### in nodejs

```javascript
const { expect } = require("svtu");
// or
import { expect } from "svtu";
```

## API

### - expect(value).to.eq(expected) <i>(TODO: 함수 나오면 단어들 고쳐쓰기)</i>

테스트 함수 내에서 `expect().to.eq()`을 통해 두 값을 비교하고 결과 리포트를 제공받을 수 있습니다.<br>
이 메소드를 단독으로 사용하면, equal 조건에 맞지 않을 때 exception을 발생시킵니다.<br><br>
In case of using Test method, This function compares two values. and It record to SVTU the comparison results.<br>
In case of using only `expect().to.eq()` on your code, An exception is thrown if the comparisons differ.<br>

```javascript
expect(10).to.eq(12); // throw exception
expect("test").to.eq("test");
expect([1, 2, 3]).to.eq(something);
```

### - expect(value).to.neq(expected)

`expect().to.eq()`과 거의 유사한 not equal 비교입니다.<br><br>
neq is almost similar `expect().to.eq()`. but It compares to 'not equal'

```javascript
expect(10).to.neq(12);
expect("test").to.neq("test"); // throw exception
expect([1, 2, 3]).to.neq(something);
```

### - test(description, function).run()

test 함수는 하나의 테스트 유닛(unit)를 표현하는 작은 단위 입니다. 이 안에서 expect 함수를 사용하여 입력값과 기대값을 관리합니다.<br><br>
The test function is a small unit that represents one test unit. in test function, we use the expect function to manage the input and expectation values.

```javascript
test("clear value from onFocus", function() {
  var inputElement = document.getElementById("phone");
  inputElement.value = "01012341234";
  inputElement.focus();
  expect(inputElement.value).to.eq("");
}).run();
```

### - setUp(function) / tearDown(funcion)

setUp과 tearDown은 각각 테스트가 실행되기 전, 실행된 후에 실행되는 작업을 관리할 수 있는 함수입니다.<br><br>
setUp and tearDown are functions that can manage tasks that are executed before and after the test is executed.

```javascript
test("test for test", function() {
  // test
})
  .setUp(function() {
    // execute before test
  })
  .tearDown(function() {
    // execute after test
  })
  .run();
```

## Future

- ui 표시
- mocking
