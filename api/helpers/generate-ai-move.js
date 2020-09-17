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


  fn: async function (inputs, exits) {
    setTimeout(() => {
      const {chess} = inputs;

      const moveObj = aiMove(chess.fen(), 2);

      for (const propName in moveObj) {
        const move = (propName + moveObj[propName]).toLowerCase();

        exits.success(move);
        return;
      }

      throw "internalError";
    }, 0);
  }


};

