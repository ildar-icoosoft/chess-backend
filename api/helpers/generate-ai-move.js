const jsChessEngine = require('js-chess-engine');

const { aiMove } = jsChessEngine;

module.exports = {


  friendlyName: 'Generate ai move',


  description: '',

  sync: true,

  inputs: {
    chess: {
      type: 'ref',
      required: true
    },
    game: {
      type: 'ref',
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

    internalError: {
      description: 'Internal server error',
    }

  },


  fn: function (inputs) {
    const {chess, game} = inputs;

    const moveObj = aiMove(chess.fen(), game.aiLevel - 1);

    for (const propName in moveObj) {
      const move = (propName + moveObj[propName]).toLowerCase();

      return move;
    }

    throw 'internalError';
  }


};

