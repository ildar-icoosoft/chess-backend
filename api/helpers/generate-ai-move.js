const jsChessEngine = require('js-chess-engine');

const { aiMove } = jsChessEngine;

module.exports = {


  friendlyName: 'Generate ai move',


  description: '',

  sync: true,

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

    internalError: {
      statusCode: 500,
      description: 'Internal server error',
    }

  },


  fn: function (inputs) {
    const {chess} = inputs;

    const moveObj = aiMove(chess.fen(), 3);

    for (const propName in moveObj) {
      const move = (propName + moveObj[propName]).toLowerCase();

      return move;
    }

    throw "internalError";
  }


};

