module.exports = {


  friendlyName: 'Check if user can resign game',


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
    cantResignBeforeThreeMoves: {
      description: 'Can\'t resign the game before three moves',
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

    if (!(game.white && req.session.userId === game.white.id) && !(game.black && req.session.userId === game.black.id)) {
      throw "userIsNotPlayerOfThisGame";
    }

    const movesHistory = chess.history();

    if (movesHistory.length < 2) {
      throw "cantResignBeforeThreeMoves";
    }
  }


};

