const Chess = require('chess.js').Chess;

const startPositionFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

module.exports = {


  friendlyName: 'Make chess instance',


  description: '',


  sync: true,

  inputs: {
    game: {
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
    const game = inputs.game;

    let { initialFen } = game;
    if (initialFen === "startpos") {
      initialFen = startPositionFen;
    }

    const chess = new Chess(initialFen);

    if (game.moves) {
      game.moves.split(" ").forEach((move) => {
        chess.move(move, {
          sloppy: true,
        });
      });
    }

    return chess;
  }


};

