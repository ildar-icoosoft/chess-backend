module.exports = {


  friendlyName: 'Abort',


  description: 'Abort board.',


  inputs: {
    gameId: {
      description: 'The ID of the user to look up.',
      type: 'number',
      required: true
    },
  },


  exits: {

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
    });

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
    });

    return updatedGame;
  }


};
