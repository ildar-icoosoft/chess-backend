const jsChessEngine = require('js-chess-engine');

const { aiMove } = jsChessEngine;

module.exports = {


  friendlyName: 'Generate ai move',


  description: '',


  inputs: {
    chess: {
      type: "ref",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: function (inputs) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const {chess} = inputs;

        const moveObj = aiMove(chess.fen(), 2);

        for (const propName in moveObj) {
          resolve(propName + moveObj[propName]);
          break;
        }

        reject("internalError");
      }, 0);

    });

  }


};

