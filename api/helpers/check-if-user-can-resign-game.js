module.exports = {


  friendlyName: 'Check if user can resign game',


  description: '',

  sync: true,

  inputs: {

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

    if (req.session.userId !== game.white && req.session.userId !== game.black) {
      throw "userIsNotPlayerOfThisGame";
    }

    const movesHistory = chess.history();

    if (movesHistory.length < 3) {
      throw "cantResignBeforeThreeMoves";
    }
  }


};
