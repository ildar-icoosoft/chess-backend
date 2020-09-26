module.exports = {


  friendlyName: 'Resign game',


  description: '',


  inputs: {
    game: {
      type: "ref",
      required: true
    },
    winner: {
      description: 'Which color is winner',
      type: 'string',
      isIn: ['white', 'black'],
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
      winner,
      req
    } = inputs;

    const updatedData = {
      status: "resign",
      winner
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

