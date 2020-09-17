module.exports = {


  friendlyName: 'Should ai move',


  description: '',


  inputs: {
    game: {
      type: "ref",
      required: true
    },
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
    const {chess, game} = inputs;

    if (game.aiLevel === 0) {
      return false;
    }

    if (chess.game_over()) {
      return false;
    }

    if (
      (chess.turn() === "w" && game.white === null) ||
      (chess.turn() === "b" && game.black === null)
    ) {
      return true;
    }

    return false;
  }


};

