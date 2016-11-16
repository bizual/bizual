var utils = require('../utils');

class Output {
  constructor() {
    this.container = utils.strToEl(
      '<div class="output-switcher"></div>' +
    '');

    this._types = {
      image: new (require('./ual-output')),
      code: new (require('./code-output'))
    };

    this._ualFile = null;
    this._switchQueue = Promise.resolve();
    this.set('image', {noAnimate: true});
  }

  update(ualFile) {
    this._ualFile = ualFile;
    return this._types[this._activeType].setUal(ualFile);
  }

  reset() {
    this._types[this._activeType].reset();
  }

  set(type, {
    noAnimate = false
  }={}) {
    return this._switchQueue = this._switchQueue.then(async _ => {
      var toRemove;
      var toAdd;

      if (this._activeType) {
        toRemove = this._types[this._activeType].container;
      }

      this._activeType = type;
      toAdd = this._types[this._activeType].container;
      this.container.appendChild(toAdd);

      if (this._ualFile) await this.update(this._ualFile);

      if (noAnimate) {
        toAdd.classList.add('active');
        if (toRemove) toRemove.classList.remove('active');
      }
      else {
        let transitions = [
          utils.transitionToClass(toAdd)
        ];

        if (toRemove) transitions.push(utils.transitionFromClass(toRemove));

        await Promise.all(transitions);
      }

      if (toRemove) {
        this.container.removeChild(toRemove);
      }
    })
  }
}

module.exports = Output;
