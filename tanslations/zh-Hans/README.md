# babel-plugin-mobx-deep-action

假设，把动作内部创建的所有代码视为动作来处理，不用在单独使用 action 标记异步函数。

插件会扫描全部函数，标记 action，然后使用相应的 action 包裹其内部函数。

* [使用 async and generator 函数](#toc-usage-async)
* [Typescript 装饰模式](#toc-typescript-decorators)
* [使用其他包](#toc-mobx-package)

## 例子

**输入**

```js
import { action } from "mobx";

action(function doSome() {
  fetch("/api/list").then(function(response) {
    this.items = response.dta;
  });
});
```

**输出**

```js
"use strict";

import { action } from "mobx";

action(function doSome() {
  fetch("/api/list").then(action(function(response) {
    this.items = response.dta;
  }));
});
```

## 警告

插件支持 ES6 的 import，如果没有使用 makeAutoObserver 需要导入了 action 才能支持使用。

**如果使用了 makeAutoObserver 可以不用导入 action，我已处理。**

只支持以下导入方式，如下:
```
import {action} from "mobx";
```
```
import {action as actionAlias} from "mobx";
```
```
import * as mobx from "mobx";
```
```
import * as mobxAlias from "mobx";
```
这些例子，**不支持**:
```
const mobx = require("mobx")
```
```
const {action} = require("mobx")
```
```
import * as mobx from "my-mobx-alias"
```
```
import * as mobx from "mobx";
const {action} = mobx;
action(function() {});
```


## 安装

```sh
$ npm install @BigBugaboo/babel-plugin-mobx-deep-action
```

## 使用

### 通过 `.babelrc` (推荐)

**.babelrc**

```json
{
  "plugins": ["@BigBugaboo/babel-plugin-mobx-deep-action"]
}
```

### 通过 babel 编译

```sh
$ babel --plugins @BigBugaboo/babel-plugin-mobx-deep-action script.js
```

### 通过 babel node api 编译

```javascript
require("babel-core").transform("code", {
  plugins: ["@BigBugaboo/babel-plugin-mobx-deep-action"]
});
```


## <a id="toc-usage-async"></a> 使用 async and generator 函数.

请看 https://github.com/Strate/babel-plugin-mobx-async-action

## <a id="toc-typescript-decorators"></a>Typescript 装饰模式.

本插件可以通过装饰代码来绑定，并输出 typescript，如下：

```js
import * as tslib_1 from "tslib";
import { action } from "mobx";
export default class Class2 {
    async method() {
        const a = (other) => { };
        return a(function () { });
    }
}
tslib_1.__decorate([
    action
], Class2.prototype, "method", null);
```

要使代码正常运行，你需要设置编译配置[importHelpers](https://www.typescriptlang.org/docs/handbook/compiler-options.html) 和安装依赖包[tslib](https://www.npmjs.com/package/tslib)。 并且, typescript 需要要输出 es6 modules，所以你应该把生产环境调到es2015+。插件会检查，如果导入了`tslib` 会绑定对应装饰代码。

## <a id="toc-mobx-package"></a> 使用其他包.

如果你使用了别名替换 mobx， 你快可以通过配置对应 plugin 的配置，如下：

#### .babelrc

```json5
{
  "plugins": [
    ["mobx-deep-action", {
      "mobx-package": "mobx-custom"
    }]
  ]
}
```
