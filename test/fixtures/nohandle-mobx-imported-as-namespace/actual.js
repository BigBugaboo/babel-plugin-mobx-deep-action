import { makeAutoObservable, runInAction } from "mobx";

function a1() {}

action(function doSome() {
  setTimeout(function () {});
});

action("named", function doSome() {
  setTimeout(function () {});
});

action("named", function doSome() {
  setTimeout(action(function () {}));
});

class SomeClass {
  constructor() {
    makeAutoObservable(this);
  }

  m1() {
    setTimeout(function () {});
    setTimeout(() => {});
  }

  m2() {
    setTimeout(runInAction(function () {}));
    setTimeout(() => {});
  }

  m3 = function () {
    setTimeout(function () {});
    setTimeout(() => {});
  };

  m4 = function () {
    setTimeout(function () {});
    setTimeout(() => {});
  };

  m5 = () => {};

  m6 = () => {
    setTimeout(function () {});
    setTimeout(() => {});
  };

  m7 = blabla;
}
