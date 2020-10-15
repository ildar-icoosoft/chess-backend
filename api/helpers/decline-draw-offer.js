module.exports = {


  friendlyName: 'Decline draw offer',


  description: '',


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
    outOfTime: {
      description: 'Out of time',
    }

  },


  fn: async function (inputs) {
    const {
      game,
      req
    } = inputs;

    const turnColor = game.turn;

    const now = Date.now();

    const timePropName = turnColor === "white" ? "wtime" : "btime";

    const updatedTime = game[timePropName] - (now - game.lastMoveAt);

    if (updatedTime < 0) {
      throw "outOfTime";
    }

    const updatedData = {
      drawOffer: null
    };

    await Game.updateOne({id: game.id}).set(updatedData);
    const updatedGame = await Game.findOne({id: game.id}).populate('white').populate('black');

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

