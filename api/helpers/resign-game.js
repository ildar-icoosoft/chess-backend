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

    const timePropName = turnColor === "white" ? "wtime" : "btime";

    const updatedTime = game[timePropName] - (now - game.lastMoveAt);

    if (updatedTime < 0) {
      throw "outOfTime";
    }

    const updatedData = {
      status: "resign",
      winner
    };

    updatedData[timePropName] = updatedTime;

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

