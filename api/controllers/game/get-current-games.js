module.exports = {


  friendlyName: 'Get current games',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    const games = await Game.find({
      status: "started"
    });

    return games;

  }


};
