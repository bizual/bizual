'use strict';

var Interpreter = function(code) {
  if (typeof code == 'string') {
    code = parser.parse(code);
    var stringprint = '';
    code.body.forEach(function (obj) {
      if (obj.type === "PrintStatement") {
//        console.log(obj.print.arguments.value);
        stringprint = stringprint + obj.print.arguments.value;
      }
    });
//    console.log(code);
//    console.log(JSON.stringify(code));
//    console.log(stringprint);
    var textConsole = document.querySelector('#demo-snackbar-example .mdl-snackbar__text');
    textConsole.innerHTML = stringprint;
  }
};

Interpreter.prototype.run = function() {
};
