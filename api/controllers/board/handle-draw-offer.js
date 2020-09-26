module.exports = {


  friendlyName: 'Handle draw offer',


  description: '',


  inputs: {
    gameId: {
      description: 'The ID of the game to look up.',
      type: 'number',
      required: true
    },
    accept: {
      description: 'If yes, offer a draw, or accept the opponent\'s draw offer. If no, decline a draw offer from the opponent',
      type: 'string',
      isIn: ['yes', 'no'],
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
      checkIfUserCanDeclineDrawOffer,
      createOrAcceptDrawOffer,
      declineDrawOffer,
    } = sails.helpers;

    const {
      gameId,
      accept
    } = inputs;

    const game = await Game.findOne({
      id: gameId
    });

    if (!game) {
      throw "gameNotFound";
    }

    const chess = makeChessInstance(game);

    let updatedGame;

    if (accept === "yes") {
      checkIfUserCanCreateOrAcceptDrawOffer.with({
        chess,
        game,
        req: this.req,
      });

      updatedGame = await createOrAcceptDrawOffer.with({
        chess,
        game,
        req: this.req,
      });
    } else {
      checkIfUserCanDeclineDrawOffer.with({
        game,
        req: this.req,
      });

      updatedGame = await declineDrawOffer.with({
        game,
        req: this.req,
      });
    }
    return updatedGame;
  }
};
