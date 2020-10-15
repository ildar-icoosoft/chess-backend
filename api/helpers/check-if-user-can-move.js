module.exports = {


  friendlyName: 'Check if user can move',


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
    notUsersTurnToMove: {
      description: 'It is not user\'s turn to move',
    }

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

    if (
      (chess.turn() === "w" && (!game.white || req.session.userId !== game.white.id) ) ||
      (chess.turn() === "b" && (!game.black || req.session.userId !== game.black.id) )
    ) {
      throw "notUsersTurnToMove";
    }
  }
};

