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

    const newStatus = getGameStatusAfterMove.with({
      chess
    });

    const turnColor = getTurnColor(chess);

    const moves = `${game.moves} ${move}`.trim();
    const updatedGame = await Game.updateOne(game).set({
      status: newStatus,
      moves,
      turn: turnColor
    });

    sails.sockets.blast('game', {
      verb: 'updated',
      data: {
        id: game.id,
        status: newStatus,
        moves,
        turn: turnColor
      },
      previous: game,
      id: game.id
    }, req);

    return updatedGame;
  }
};

