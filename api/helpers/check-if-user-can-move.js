module.exports = {


  friendlyName: 'Check if user can move',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    if (!userIsPlayer(game, req)) {
      throw "userIsNotPlayer";
    }
    if (!isGameStarted(game)) {
      throw "gameIsNotStarted";
    }
    if (!isPlayerTurnToMove(chess, game)) {
      throw "notUsersTurnToMove";
    }


  }


};

