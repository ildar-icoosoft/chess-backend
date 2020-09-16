module.exports = {


  friendlyName: 'Is player turn to move',


  description: '',


  sync: true,

  inputs: {
    game: {
      type: "ref",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
  }


};

