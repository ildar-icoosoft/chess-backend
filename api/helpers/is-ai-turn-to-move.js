module.exports = {


  friendlyName: 'Is ai turn to move',


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
    return false;
  }


};

