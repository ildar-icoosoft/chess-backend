module.exports = {


  friendlyName: 'Abort game',


  description: '',


  inputs: {
    game: {
      type: "ref",
      required: true
    },
    req: {
      type: "ref",
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const {
      game,
      req
    } = inputs;

    const updatedData = {
      status: "aborted"
    };

    const updatedGame = await Game.updateOne(game).set(updatedData);

    sails.sockets.blast('game', {
      verb: 'updated',
      data: {
        id: game.id,
        ...updatedData
      },
      previous: game,
      id: game.id
    }, req);

    return updatedGame;
  }


};

