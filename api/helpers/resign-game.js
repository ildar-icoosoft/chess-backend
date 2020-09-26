module.exports = {


  friendlyName: 'Resign game',


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
    winner: {
      description: 'Which color is winner',
      type: 'string',
      isIn: ['white', 'black'],
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
      winner,
      req
    } = inputs;

    const turnColor = getTurnColor(chess);

    const now = Date.now();

    const updatedData = {
      status: "resign",
      winner
    };

    const timePropName = turnColor === "white" ? "wtime" : "btime";

    const updatedTime = game[timePropName] - (now - game.lastMoveAt);

    if (updatedTime < 0) {
      throw "outOfTime";
    }

    updatedData[timePropName] = updatedTime;

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

