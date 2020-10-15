module.exports = {


  friendlyName: 'Move',


  description: 'Move board.',


  inputs: {
    gameId: {
      description: 'The ID of the game to look up.',
      type: 'number',
      required: true
    },
    move: {
      description: 'The ID of the user to look up.',
      type: 'string',
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
    const {
      makeChessInstance,
      checkIfUserCanMove,
      makeMove,
      shouldAiMove,
      generateAiMove
    } = sails.helpers;

    const {move, gameId} = inputs;

    const game = await Game.findOne({
      id: gameId
    }).populate('white').populate('black');

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
      chess,
      game: updatedGame
    })) {
      setTimeout(async () => {
        const aiMove = generateAiMove.with({
          chess,
          game: updatedGame
        });
        if (!chess.move(aiMove, {
          sloppy: true,
        })) {
          throw "invalidMove";
        }
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
