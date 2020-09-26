module.exports = {


  friendlyName: 'Check if user can create or accept draw offer',


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
    cantCreateDrawBeforeThreeMoves: {
      description: 'Can\'t create draw before three moves',
    },
    drawOfferAlreadyCreated: {
      description: 'Draw offer is already created',
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

    const playerColor =  req.session.userId === game.white ? "white" : "black";

    if (game.drawOffer === playerColor) {
      throw "drawOfferAlreadyCreated";
    }

    if (game.drawOffer === null) {
      const movesHistory = chess.history();

      if (movesHistory.length < 2) {
        throw "cantCreateDrawBeforeThreeMoves";
      }
    }
  }


};

