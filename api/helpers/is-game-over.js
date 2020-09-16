module.exports = {


  friendlyName: 'Is game over',


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
    const chess = sails.helpers.makeChessInstance(inputs.game);
    return chess.is_over();
  }


};

