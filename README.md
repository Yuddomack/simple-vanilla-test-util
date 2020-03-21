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

### - test(description, function)

test 함수는 하나의 테스트 유닛(unit)를 표현하는 작은 단위입니다. 이 안에서 expect 함수를 사용하여 입력값과 기대값을 관리합니다.<br><br>
The test function is a small unit that represents one test unit. in test function, we use the expect function to manage the input and expectation values.

```javascript
test("clear value from onFocus", function() {
  var inputElement = document.getElementById("phone");
  inputElement.value = "01012341234";
  inputElement.focus();
  expect(inputElement.value).to.eq("");
});
```

### - describe(description, function)

describe 함수는 test 유닛을 그룹화 할 수 있는 함수입니다. 그룹화를 통해 연관성 높은 테스트 유닛을 효과적으로 표현할 수 있습니다. 또한 템플릿 메소드를 사용하여 테스트 실행 전, 후에 동작을 삽입할 수 있습니다.<br><br>
The describe function is a function that can group test units. Grouping allows you to effectively represent highly relevant test units.
You can also use template methods to insert actions before and after test execution.

```javascript
describe("calculator test", function() {
  test("sum test", function() {
    expect(sum(10, 5, 7)).to.eq(22);
  });
  test("multiply test", function() {
    expect(multiply(2, 9)).to.eq(18);
  });
});
```

### - template method(beforeAll / beforeEach / afterEach / afterAll)

simple vanilla test util은 4가지 템플릿 메소드를 제공합니다. [jest](https://jestjs.io/docs/en/setup-teardown)의 Repeating Setup 설정과 동일하게 진행됩니다.<br>

- beforeAll : describe 내에 첫번째 test unit이 실행되기 전에 최초 한 번만 실행됩니다.
- beforeEach : describe 내에 각 test unit이 실행되기 전에 매번 실행됩니다.
- afterEach : describe 내에 각 test unit이 실행될 때마다 매번 실행됩니다.
- afterAll: describe 내에 마지막 test unit이 실행된 후에 한 번 실행됩니다.
  <br><br>

The simple vanilla test util provides four template methods.
It proceeds in the same way as the repeat setting of [jest](https://jestjs.io/docs/en/setup-teardown).<br>

- beforeAll : It is executed only once before the first test unit in describe.
- beforeEach : It is executed each time before each test unit.
- afterEach : It is executed each time after each test unit.
- afterAll: It is executed once after the last test unit.

```javascript
describe("template method life cycle", function() {
  beforeAll(function() {
    console.log("1 - beforeAll");
  });
  afterAll(function() {
    console.log("1 - afterAll");
  });
  beforeEach(function() {
    console.log("1 - beforeEach");
  });
  afterEach(function() {
    console.log("1 - afterEach");
  });
  test("", function() {
    console.log("1 - test");
  });

  describe("Scoped / Nested block", function() {
    beforeAll(function() {
      console.log("2 - beforeAll");
    });
    afterAll(function() {
      console.log("2 - afterAll");
    });
    beforeEach(function() {
      console.log("2 - beforeEach");
    });
    afterEach(function() {
      console.log("2 - afterEach");
    });
    test("", function() {
      console.log("2 - test");
    });
  });
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

## Future

- ui 표시
- mocking
- 더 나은 구조화?
