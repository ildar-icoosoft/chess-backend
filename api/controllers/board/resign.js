module.exports = {


  friendlyName: 'Resign',


  description: 'Resign board.',


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
      checkIfUserCanResignGame,
      resignGame,
    } = sails.helpers;

    const {gameId} = inputs;

    const game = await Game.findOne({
      id: gameId
    });

    if (!game) {
      throw "gameNotFound";
    }

    const chess = makeChessInstance(game);

    checkIfUserCanResignGame.with({
      chess,
      game,
      req: this.req,
    });

    const winner = this.req.session.userId === game.white ? "black" : "white";

    const updatedGame = await resignGame.with({
      game,
      winner
    });

    return updatedGame;

  }


};
