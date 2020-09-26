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
    } = sails.helpers;

    const {
      gameId
    } = inputs;

    const game = await Game.findOne({
      id: gameId
    });

    if (!game) {
      throw "gameNotFound";
    }

    checkIfUserCanDeclineDrawOffer.with({
      game,
      req: this.req,
    });

    const updatedGame = await declineDrawOffer.with({
      game,
      req: this.req,
    });

    return updatedGame;

  }


};
