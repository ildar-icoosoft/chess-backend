module.exports = {

  friendlyName: 'Ai',

  description: 'Ai challenge.',

  inputs: {},

  exits: {},


  fn: async function (inputs) {

    // if (!this.req.isSocket) {
    //   throw {badRequest: 'Only a client socket can subscribe to Louies.  But you look like an HTTP request to me.'};
    // }

    const game = Game.create({
      initialFen: 'startpos',
      wtime: 300000,
      btime: 300000,
      white: null,
      black: null,
      moves: '',
      status: 'started'
    });

    const gameJSON = await game.fetch();

    sails.sockets.blast('game', {
      verb: 'created',
      data: gameJSON,
      id: gameJSON.id
    }, this.req);

    return game;

  }


};
