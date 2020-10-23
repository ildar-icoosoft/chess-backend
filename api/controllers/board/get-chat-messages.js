module.exports = {


  friendlyName: 'Get chat messages',


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

    const {gameId} = inputs;

    const game = await Game.findOne({
      id: gameId
    });

    if (!game) {
      throw "gameNotFound";
    }

    const chatMessages = await ChatMessage.find({
      game: gameId
    }).populate('createdBy');

    // All done.
    return chatMessages;

  }


};
