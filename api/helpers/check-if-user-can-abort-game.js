module.exports = {


  friendlyName: 'Check if user can abort game',


  description: '',

  sync: true,

  inputs: {
    chess: {
      type: "ref",
      required: true
    },
    game: {
      type: "ref",
      required: true
    },
    req: {
      type: "ref",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

    gameStatusIsNotStarted: {
      description: 'Game is over',
    },
    userIsNotPlayerOfThisGame: {
      description: 'User is not a player of this game',
    },
    cantAbortAfterTwoMoves: {
      description: 'Can\'t abort the game after two moves',
    },

  },


  fn: function (inputs) {
    const {
      chess,
      game,
      req
    } = inputs;

    if (game.status !== "started") {
      throw "gameStatusIsNotStarted";
    }

    if (!(game.white && req.session.userId === game.white.id) || (game.black && req.session.userId === game.black.id)) {
      throw "userIsNotPlayerOfThisGame";
    }

    const movesHistory = chess.history();

    if (movesHistory.length > 1) {
      throw "cantAbortAfterTwoMoves";
    }
  }


};

