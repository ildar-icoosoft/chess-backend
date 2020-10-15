module.exports = {


  friendlyName: 'Decline draw offer',


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
      checkIfUserCanDeclineDrawOffer,
      declineDrawOffer,
      makeChessInstance
    } = sails.helpers;

    const {
      gameId
    } = inputs;

    const game = await Game.findOne({
      id: gameId
    }).populate('white').populate('black');

    if (!game) {
      throw "gameNotFound";
    }

    const chess = makeChessInstance(game);

    checkIfUserCanDeclineDrawOffer.with({
      game,
      req: this.req,
    });

    const updatedGame = await declineDrawOffer.with({
      chess,
      game,
      req: this.req,
    });

    return updatedGame;

  }


};
