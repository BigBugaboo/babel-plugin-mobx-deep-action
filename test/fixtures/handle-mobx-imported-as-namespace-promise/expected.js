import * as mobx from "mobx";
import { action } from "mobx";

const a = action(() => {
  const req = new Promise(action((resolve, reject) => {
    resolve({ code: 200 });
  }));
  return req.then(action(json => {
    return json.code;
  })).catch(action(json => {
    return json;
  }));
});

const b = action(() => {
  return Promise.resolve({ code: 200 }).then(action(json => {
    return json.code;
  }));
});
