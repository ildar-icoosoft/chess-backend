module.exports = {


  friendlyName: 'Resign',


  description: 'Resign board.',


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
      checkIfUserCanResignGame,
      resignGame,
    } = sails.helpers;

    const {gameId} = inputs;

    const game = await Game.findOne({
      id: gameId
    }).populate('white').populate('black');

    if (!game) {
      throw "gameNotFound";
    }

    const chess = makeChessInstance(game);

    checkIfUserCanResignGame.with({
      chess,
      game,
      req: this.req,
    });

    const winner = (game.white && this.req.session.userId === game.white.id) ? "black" : "white";

    const updatedGame = await resignGame.with({
      game,
      chess,
      winner,
      req: this.req,
    });

    return updatedGame;

  }


};
