module.exports = {


  friendlyName: 'Move',


  description: 'Move board.',


  inputs: {
    gameId: {
      description: 'The ID of the user to look up.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a number.
      type: 'number',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    },
    move: {
      description: 'The ID of the user to look up.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a number.
      type: 'string',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let game = await Game.findOne({
      id: inputs.gameId
    });

    if (game) {
      const previous = game;

      let moves = game.moves;
      if (moves) {
        moves += ' ';
      }
      moves += inputs.move;

      game = await Game.updateOne(game).set({
        moves
      });

      sails.sockets.blast('game', {
        verb: 'updated',
        data: {
          id: game.id,
          moves
        },
        previous,
        id: game.id
      }, this.req);

      return game;
    }

    // All done.
    return;

  }


};
