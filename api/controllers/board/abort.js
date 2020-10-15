module.exports = {


  friendlyName: 'Abort',


  description: 'Abort board.',


  inputs: {
    gameId: {
      description: 'The ID of the game to look up.',
      type: 'number',
      required: true
    },
  },


  exits: {
    gameNotFound: {
      statusCode: 404,
      description: 'The provided game not found',
    }
  },


  fn: async function (inputs) {
    const {
      makeChessInstance,
      checkIfUserCanAbortGame,
      abortGame,
    } = sails.helpers;

    const {gameId} = inputs;

    const game = await Game.findOne({
      id: gameId
    }).populate('white').populate('black');

    if (!game) {
      throw "gameNotFound";
    }

    const chess = makeChessInstance(game);

    checkIfUserCanAbortGame.with({
      chess,
      game,
      req: this.req,
    });

    const updatedGame = await abortGame.with({
      game,
      req: this.req,
    });

    return updatedGame;
  }


};
