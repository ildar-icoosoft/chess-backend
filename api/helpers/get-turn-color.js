module.exports = {


  friendlyName: 'Get turn color',


  description: '',

  sync: true,

  inputs: {
    chess: {
      type: 'ref',
      required: true
    },
  },


  exits: {

    success: {
      outputFriendlyName: 'Turn color',
    },

  },


  fn: function (inputs) {
    const { chess } = inputs;

    return chess.turn() === "w" ? "white" : "black";
  }


};

