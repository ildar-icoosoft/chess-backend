module.exports = {

  friendlyName: 'Ai',

  description: 'Ai challenge.',

  inputs: {

    level: {
      description: 'AI strength (1 - 4)',
      type: 'number',
      required: true,
      isInteger: true,
      min: 1,
      max: 4
    },

    color: {
      description: 'Which color you get to play',
      type: 'string',
      isIn: ['random', 'white', 'black'],
      required: true
    },

    clockLimit: {
      description: 'Clock initial time in seconds (60 - 10800)',
      type: 'number',
      required: true,
      isInteger: true,
      min: 60,
      max: 10800,
      custom: function(value) {
        if (value % 60 === 0) {
          return true;
        }
        return false;
      }
    },

    clockIncrement: {
      description: 'Clock increment in seconds (0 - 60)',
      type: 'number',
      required: true,
      isInteger: true,
      min: 0,
      max: 60
    }
  },

  exits: {
    unauthorized: {
      statusCode: 401,
      description: "You must log in to play with computer",
    }
  },


  fn: async function (inputs) {
    if (!this.req.me) {
      throw 'unauthorized';
    }

    const {
      makeChessInstance,
      makeMove,
      shouldAiMove,
      generateAiMove
    } = sails.helpers;

    const {level, clockLimit, clockIncrement } = inputs;

    const user = this.req.me;

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

    const notPopulatedGame = await Game.create({
      initialFen: 'startpos',
      wtime: clockLimit * 1000,
      btime: clockLimit * 1000,
      white,
      black,
      clockLimit,
      clockIncrement,
      aiLevel: level,
      moves: '',
      status: 'started',
      turn: "white"
    }).fetch();
    const game = await Game.findOne(notPopulatedGame.id).populate('white').populate('black');

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
        const aiMove = generateAiMove.with({
          chess,
          game
        });
        if (!chess.move(aiMove, {
          sloppy: true,
        })) {
          throw "invalidMove";
        }
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
