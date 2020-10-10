module.exports = {


  friendlyName: 'Accept seek',


  description: '',


  inputs: {
    seekId: {
      description: 'The ID of the seek to look up.',
      type: 'number',
      required: true
    },
  },


  exits: {
    seekNotFound: {
      statusCode: 404,
      description: 'The provided seek not found',
    }
  },


  fn: async function (inputs) {

    const {
      seekId
    } = inputs;

    const seek = await Seek.findOne({
      id: seekId
    });

    if (!seek) {
      throw "seekNotFound";
    }

    let color = seek.color;

    if (color === 'random') {
      const colors = ['white', 'black'];

      color = colors[Math.floor(Math.random() * colors.length)];
    }

    let white = null;
    let black = null;

    const clockLimit = seek.clockLimit;
    const clockIncrement = seek.clockIncrement;

    if (color === 'white') {
      white = seek.createdBy;
      black = this.req.session.userId;
    } else if (color === 'black') {
      black = seek.createdBy;
      white = this.req.session.userId;
    }

    const game = await Game.create({
      initialFen: 'startpos',
      wtime: clockLimit * 1000,
      btime: clockLimit * 1000,
      white,
      black,
      clockLimit,
      clockIncrement,
      aiLevel: 0,
      moves: '',
      status: 'started',
      turn: "white"
    }).fetch();

    sails.sockets.blast('game', {
      verb: 'created',
      data: game,
      id: game.id
    }, this.req);
  }


};
