module.exports = {


  friendlyName: 'Create or accept draw offer',


  description: '',


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
      checkIfUserCanCreateOrAcceptDrawOffer,
      createOrAcceptDrawOffer,
    } = sails.helpers;

    const {
      gameId,
    } = inputs;

    const game = await Game.findOne({
      id: gameId
    }).populate('white').populate('black');

    if (!game) {
      throw "gameNotFound";
    }

    const chess = makeChessInstance(game);

    checkIfUserCanCreateOrAcceptDrawOffer.with({
      chess,
      game,
      req: this.req,
    });

    const updatedGame = await createOrAcceptDrawOffer.with({
      chess,
      game,
      req: this.req,
    });

    return updatedGame;

  }


};
