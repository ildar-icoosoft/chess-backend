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
    }).populate('createdBy').populate('game');

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
      white = seek.createdBy.id;
      black = this.req.session.userId;
    } else if (color === 'black') {
      black = seek.createdBy.id;
      white = this.req.session.userId;
    }

    const notPopulatedGame = await Game.create({
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
    const game = await Game.findOne({id: notPopulatedGame.id}).populate('white').populate('black');

    sails.sockets.blast('game', {
      verb: 'created',
      data: game,
      id: game.id
    }, this.req);

    const seekUpdatedData = {
      game: game.id
    };

    await Seek.updateOne({id: seek.id}).set(seekUpdatedData);
    const updatedSeek = await Seek.findOne({id: seek.id}).populate('createdBy').populate('game');

    sails.sockets.blast('seek', {
      verb: 'updated',
      data: {
        id: seek.id,
        game
      },
      previous: seek,
      id: seek.id
    }, this.req);

    return updatedSeek;
  }


};
