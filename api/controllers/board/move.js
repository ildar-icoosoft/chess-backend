const {
  makeChessInstance,
  checkIfUserCanPlay,
  shouldAiMove
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
    userIsNotPlayer: {
      statusCode: 403,
      description: 'User is not a player of this game',
    },
    gameIsNotStarted: {
      statusCode: 403,
      description: "Game status is not 'started'"
    },
    notUsersTurnToMove: {
      statusCode: 403,
      description: 'Not user\' turn to move',
    },
    gameIsOver: {
      statusCode: 403,
      description: 'Game is over',
    },
    invalidMove: {
      statusCode: 403,
      description: 'Invalid move',
    }
  },


  fn: async function (inputs) {

    const game = await Game.findOne({
      id: inputs.gameId
    });

    if (!game) {
      throw "gameNotFound";
    }

    const chess = makeChessInstance(game);

    checkIfUserCanPlay(chess, game, this.req);

    const moves = `${game.moves} ${inputs.move}`.trim();
    const updatedGame = await Game.updateOne(game).set({
      moves
    });

    sails.helpers.emitGameUpdate.with({
      data: {
        id: game.id,
        moves
      },
      previous: game,
      req: this.req
    });

    if (shouldAiMove(updatedGame)) {
      // AI move
    }

    return game;
  }


};
