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

## Provide Methods

- expect(value).toEqual(expected) <i>(TODO: 함수 나오면 단어들 고쳐쓰기)</i>

  테스트 함수 내에서 `expect().toEqual()`을 통해 두 값을 비교하고 결과 리포트를 제공받을 수 있습니다.<br>
  이 메소드를 단독으로 사용하면, equal 조건에 맞지 않을 때 exception을 발생시킵니다.<br><br>
  In case of using Test method, This function compares two values. and It record to SVTU the comparison results.<br>
  In case of using only `expect().toEqual()` on your code, An exception is thrown if the comparisons differ.<br>

```javascript
expect(10).toEqual(12);
expect("test").toEqual("test");
expect([1, 2, 3]).toEqual(something);
```

## Future

- ui 표시
- mocking
