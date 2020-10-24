module.exports = {


  friendlyName: 'Create chat message',


  description: '',


  inputs: {
    text: {
      description: 'text of the message',
      type: 'string',
      example: 'Good game!',
      required: true
    },

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
    },
    unauthorized: {
      statusCode: 401,
      description: "You must log in to post messages",
    }
  },


  fn: async function (inputs) {

    if (!this.req.me) {
      throw 'unauthorized';
    }

    const {gameId, text} = inputs;

    const game = await Game.findOne({
      id: gameId
    });

    if (!game) {
      throw "gameNotFound";
    }

    const notPopulatedChatMessage = await ChatMessage.create({
      createdBy: this.req.me.id,
      text,
      game: game.id
    }).fetch();
    const chatMessage = await ChatMessage.findOne(notPopulatedChatMessage.id).populate('createdBy');

    // All done.
    return chatMessage;

  }


};
