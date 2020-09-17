module.exports = {


  friendlyName: 'Get game status after move',


  description: '',

  sync: true,

  inputs: {
    chess: {
      type: "ref",
      required: true
    },
  },


  exits: {

    success: {
      outputFriendlyName: 'Game status',
    },

  },


  fn: function (inputs) {
    const { chess } = inputs;

    if (chess.in_stalemate()) {
      return "stalemate";
    }
    if (chess.in_checkmate()) {
      return "mate";
    }
    if (chess.in_draw()) {
      return "draw";
    }

    return "started";
  }


};

