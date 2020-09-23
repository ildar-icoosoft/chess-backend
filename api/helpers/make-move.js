module.exports = {


  friendlyName: 'Make move',


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
    move: {
      type: "string",
      required: true
    },
    req: {
      type: "ref",
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    outOfTime: {
      statusCode: 403,
      description: 'Out of time',
    }

  },


  fn: async function (inputs) {

    const {
      getGameStatusAfterMove,
      getTurnColor
    } = sails.helpers;

    const {
      req,
      game,
      chess,
      move
    } = inputs;

    const turnColor = getTurnColor(chess);

    const now = Date.now();

    const history = chess.history();

    const updatedData = {};

    if (history.length > 2) {
      // timePropName should contain time of previous move. So if current turnColor is white then timePropName will be "btime"
      let timePropName;
      if (turnColor === "white") {
        timePropName = "btime";
      } else {
        timePropName = "wtime";
      }

      const updatedTime = game[timePropName] - (now - game.lastMoveAt);

      if (updatedTime < 0) {
        throw "outOfTime";
      }

      updatedData[timePropName] = updatedTime;
    }

    const newStatus = getGameStatusAfterMove.with({
      chess
    });

    const moves = `${game.moves} ${move}`.trim();

    Object.assign(updatedData,{
      status: newStatus,
      moves,
      turn: turnColor,
      lastMoveAt: now
    });

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

