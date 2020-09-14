module.exports = {


  friendlyName: 'Get playing games',


  description: '',


  inputs: {},


  exits: {},


  fn: async function (inputs) {

    const games = await Game.find({
      status: 'started'
    })
      .populate("white")
      .populate("black");

    return games;

  }


};
