module.exports = {


  friendlyName: 'Create a public seek, to start a game with a random player',


  description: '',


  inputs: {
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
    notFound: {
      description: 'Seek not found. The connection may have been aborted by the client',
      responseType: 'notFound'
    },
    unauthorized: {
      statusCode: 401,
      description: "You must log in to create a game",
    }
  },


  fn: async function (inputs, exits) {

    if (!this.req.me) {
      throw 'unauthorized';
    }

    const {color, clockLimit, clockIncrement} = inputs;

    const notPopulatedSeek = await Seek.create({
      clockLimit,
      clockIncrement,
      color,
      createdBy: this.req.session.userId,
      socketId: this.req.socket.id
    }).fetch();
    const seek = await Seek.findOne({id: notPopulatedSeek.id}).populate('createdBy').populate('game');


    sails.sockets.blast('seek', {
      verb: 'created',
      data: seek,
      id: seek.id
    }, this.req);

    const intervalId = setInterval(async () => {
      const updatedSeek = await Seek.findOne({
        id: seek.id
      });

      if (updatedSeek && updatedSeek.game) {
        clearInterval(intervalId);

        const game = await Game.findOne({id: updatedSeek.game}).populate('white').populate('black');

        exits.success(game);

        await Seek.destroyOne({
          id: updatedSeek.id
        });

        sails.sockets.blast('seek', {
          verb: 'destroyed',
          previous: updatedSeek,
          id: updatedSeek.id
        });
      } else if (!updatedSeek) {
        clearInterval(intervalId);

        exits.notFound();
      }
    }, 3000);

  }


};
