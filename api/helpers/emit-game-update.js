module.exports = {


  friendlyName: 'Emit game update',


  description: '',


  inputs: {
    data: {
      type: "ref",
      required: true
    },
    previous: {
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


  fn: async function ({
    data,
    previous,
    req
  }) {
    sails.sockets.blast('game', {
      verb: 'updated',
      data,
      previous,
      id: data.id
    }, req);
  }


};

