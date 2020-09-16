module.exports = {


  friendlyName: 'Make move',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const moves = `${inputs.game.moves} ${inputs.move}`.trim();
    const updatedGame = await Game.updateOne(inputs.game).set({
      moves
    });

    sails.helpers.emitGameUpdate.with({
      data: {
        id: game.id,
        moves
      },
      previous: game,
      req: inputs.req
    });

    return updatedGame;
  }


};

