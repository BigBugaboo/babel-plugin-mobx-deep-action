import * as mobx from "mobx";
import { action } from "mobx";

const a = action(() => {
  const req = new Promise((resolve, reject) => {
    resolve({ code: 200 });
  });
  return req.then(json => {
    return json.code;
  }).catch(json => {
    return json;
  });
});

const b = action(() => {
  return Promise.resolve({ code: 200 }).then(json => {
    return json.code;
  });
});
