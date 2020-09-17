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
      statusCode: 403,
      description: 'Game is over',
    },
    userIsNotPlayerOfThisGame: {
      statusCode: 403,
      description: 'User is not a player of this game',
    },
    notUsersTurnToMove: {
      statusCode: 403,
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

    if (req.session.userId !== game.white && req.session.userId !== game.black) {
      throw "userIsNotPlayerOfThisGame";
    }

    if ((chess.turn() === "w" && req.session.userId !== game.white) || (chess.turn() === "b" && req.session.userId !== game.black)) {
      throw "notUsersTurnToMove";
    }
  }
};

