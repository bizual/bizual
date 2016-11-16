"use strict";
require('regenerator-runtime/runtime');

()=>{ // hack around weird regenerator-runtime polyfill

var parsedUal;
var multipassInstance;

var actions = {
  load({data}) {
//    ual2js(data, function(p) {
//      parsedUal = p;
//    });
//
//    if (parsedUal.error) {
//      throw Error(parsedUal.error);
//    }
//
//    return getDimensions(parsedUal);
    return {};
  },
  process({settings}) {
    multipassInstance = multipassCompress(settings);
    return multipassInstance.next().value;
  },
  nextPass() {
    return multipassInstance.next().value;
  }
};

self.onmessage = function(event) {
  try {
    self.postMessage({
      id: event.data.id,
      result: actions[event.data.action](event.data)
    });
  }
  catch(e) {
    self.postMessage({
      id: event.data.id,
      error: e.message
    });
  }
};
}();
