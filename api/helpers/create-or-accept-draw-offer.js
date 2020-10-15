module.exports = {


  friendlyName: 'Create or accept draw offer',


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

    const updatedData = {};

    if (game.drawOffer === null) {
      const playerPiecesColor = (game.white && req.session.userId === game.white.id) ? "white" : "black";

      updatedData.drawOffer = playerPiecesColor;
    } else {
      updatedData.status = "draw";
      updatedData[timePropName] = updatedTime;
    }

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

