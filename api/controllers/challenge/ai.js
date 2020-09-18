const {
  makeChessInstance,
  makeMove,
  shouldAiMove,
  generateAiMove
} = sails.helpers;

module.exports = {

  friendlyName: 'Ai',

  description: 'Ai challenge.',

  inputs: {

    level: {
      description: 'AI strength (1 - 8)',
      type: 'number',
      required: true,
      isInteger: true,
      min: 1,
      max: 8
    },

    color: {
      description: 'Which color you get to play',
      type: 'string',
      isIn: ['random', 'white', 'black'],
      required: true
    },

    clockLimit: {
      description: 'Clock initial time in seconds. If empty, a correspondence game is created (0 - 10800)',
      type: 'number',
      required: true,
      isInteger: true,
      min: 0,
      max: 10800
    },

    clockIncrement: {
      description: 'Clock increment in seconds. If empty, a correspondence game is created (0 - 60)',
      type: 'number',
      required: true,
      isInteger: true,
      min: 0,
      max: 60
    }
  },

  exits: {},


  fn: async function (inputs) {
    var user = await User.findOne({id: this.req.session.userId});

    if (!user) {
      throw 'unauthorized';
    }

    // if (!this.req.isSocket) {
    //   throw {badRequest: 'Only a client socket can subscribe to Louies.  But you look like an HTTP request to me.'};
    // }

    let color = inputs.color;

    let white = null;
    let black = null;

    if (color === 'random') {
      const colors = ['white', 'black'];

      color = colors[Math.floor(Math.random() * colors.length)];
    }

    if (color === 'white') {
      white = user.id;
    } else if (color === 'black') {
      black = user.id;
    }

    const game = await Game.create({
      initialFen: 'startpos',
      wtime: inputs.clockLimit * 1000,
      btime: inputs.clockLimit * 1000,
      white,
      black,
      clockIncrement: inputs.clockIncrement,
      aiLevel: inputs.level,
      moves: '',
      status: 'started'
    }).fetch();

    sails.sockets.blast('game', {
      verb: 'created',
      data: game,
      id: game.id
    }, this.req);

    const chess = makeChessInstance(game);

    if (shouldAiMove.with({
      chess: chess,
      game: game
    })) {
      setTimeout(async () => {
        const aiMove = generateAiMove(chess);
        await makeMove.with({
          game,
          chess,
          move: aiMove,
        });
      }, 0);
    }

    return game;

  }


};
