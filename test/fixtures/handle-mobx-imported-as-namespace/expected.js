import { action } from "mobx";
import { makeAutoObservable, runInAction } from "mobx";

function a1() {}

action(function doSome() {
  setTimeout(action(function () {}));
});

action("named", function doSome() {
  setTimeout(action(function () {}));
});

action("named", function doSome() {
  setTimeout(action(function () {}));
});

class SomeClass {
  constructor() {
    makeAutoObservable(this);
  }

  m1() {
    setTimeout(action(function () {}));
    setTimeout(action(() => {}));
  }

  m2() {
    setTimeout(runInAction(function () {}));
    setTimeout(action(() => {}));
  }

  m3 = function () {
    setTimeout(action(function () {}));
    setTimeout(action(() => {}));
  };

  m4 = function () {
    setTimeout(action(function () {}));
    setTimeout(action(() => {}));
  };

  m5 = () => {};

  m6 = () => {
    setTimeout(action(function () {}));
    setTimeout(action(() => {}));
  };

  m7 = blabla;
}
