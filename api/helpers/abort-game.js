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
      required: true
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

    await Game.updateOne({
      id: game.id
    }).set(updatedData);
    const updatedGame = await Game.findOne({id: game.id}).populate('white').populate('black');

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

