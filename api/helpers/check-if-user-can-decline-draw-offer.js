module.exports = {


  friendlyName: 'Check if user can decline draw offer',


  description: '',

  sync: true,

  inputs: {
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
    noDrawOffer: {
      description: "Draw did not offered to the player"
    }

  },


  fn: function (inputs) {
    const {
      game,
      req
    } = inputs;

    if (game.status !== "started") {
      throw "gameStatusIsNotStarted";
    }

    if (!(game.white && req.session.userId === game.white.id) && !(game.black && req.session.userId === game.black.id)) {
      throw "userIsNotPlayerOfThisGame";
    }

    const drawOfferFrom = (game.white && req.session.userId === game.white.id) ? "black" : "white";

    if (game.drawOffer !== drawOfferFrom) {
      throw "noDrawOffer";
    }
  }


};

