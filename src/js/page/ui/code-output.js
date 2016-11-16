var utils = require('../utils');

class CodeOutput {
  constructor() {
    this.container = utils.strToEl(
      '<div class="code-output">' +
        '<pre><code></code></pre>' +
      '</div>' +
    '');
    this._codeEl = this.container.querySelector('code');
  }

  async setUal(ualFile) {
    this._codeEl.innerHTML = ualFile.text;
  }

  reset() {
    this._codeEl.innerHTML = '';
  }
}

module.exports = CodeOutput;
