module.exports = {


  friendlyName: 'Is player vs ai game',


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


  fn: function (inputs) {
    if (inputs.game.aiLevel === 0) {
      return false;
    } else {
      return true;
    }
  }


};

