const {
  makeChessInstance,
  checkIfUserCanMove,
  makeMove,
  shouldAiMove,
  generateAiMove
} = sails.helpers;

module.exports = {


  friendlyName: 'Move',


  description: 'Move board.',


  inputs: {
    gameId: {
      description: 'The ID of the user to look up.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a number.
      type: 'number',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    },
    move: {
      description: 'The ID of the user to look up.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a number.
      type: 'string',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    }
  },


  exits: {
    gameNotFound: {
      statusCode: 404,
      description: 'The provided game not found',
    },
    invalidMove: {
      statusCode: 403,
      description: 'Invalid move',
    }
  },


  fn: async function (inputs) {
    const {move, gameId} = inputs;

    const game = await Game.findOne({
      id: gameId
    });

    if (!game) {
      throw "gameNotFound";
    }

    const chess = makeChessInstance(game);

    checkIfUserCanMove.with({
      chess,
      game,
      req: this.req,
    });

    if (!chess.move(move, {
      sloppy: true,
    })) {
      throw "invalidMove";
    }

    const updatedGame = await makeMove.with({
      game,
      chess,
      move,
      req: this.req
    });

    if (shouldAiMove.with({
      chess: chess,
      game: updatedGame
    })) {
      setTimeout(async () => {
        const aiMove = generateAiMove(chess);
        await makeMove.with({
          game: updatedGame,
          chess,
          move: aiMove,
        });
      }, 0);
    }

    return updatedGame;
  }


};
