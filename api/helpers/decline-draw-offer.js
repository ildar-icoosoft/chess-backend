module.exports = {


  friendlyName: 'Decline draw offer',


  description: '',


  inputs: {
    game: {
      type: "ref",
      required: true
    },
    chess: {
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
    outOfTime: {
      description: 'Out of time',
    }

  },


  fn: async function (inputs) {
    const {
      getTurnColor
    } = sails.helpers;

    const {
      game,
      chess,
      req
    } = inputs;

    const turnColor = getTurnColor(chess);

    const now = Date.now();

    const timePropName = turnColor === "white" ? "wtime" : "btime";

    const updatedTime = game[timePropName] - (now - game.lastMoveAt);

    if (updatedTime < 0) {
      throw "outOfTime";
    }

    const updatedData = {
      drawOffer: null
    };

    const updatedGame = await Game.updateOne(game).set(updatedData);

    sails.sockets.blast('game', {
      verb: 'updated',
      data: {
        id: game.id,
        ...updatedData
      },
      previous: game,
      id: game.id
    }, req);

    return updatedGame;
  }


};

