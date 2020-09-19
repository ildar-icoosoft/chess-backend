/**
 * Game.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    initialFen: {
      type: 'string',
      example: 'startpos'
    },
    wtime: {
      type: 'number',
      description: 'White time in msec',
      example: 300000
    },
    btime: {
      type: 'number',
      description: 'Black time in msec',
      example: 300000
    },
    clockLimit: {
      description: 'Clock initial time in seconds (60 - 10800)',
      type: 'number',
    },
    clockIncrement: {
      type: 'number',
      description: 'Clock increment in sec (0 - 60)',
      example: 10
    },
    aiLevel: {
      type: 'number',
      example: '0 if them game is not against AI. 1 - 8 for AI strength'
    },
    moves: {
      type: 'string',
      example: 'e2e4 e7e5 g1f3'
    },
    status: {
      type: 'string',
      description: 'Possible values are: started, resign, stalemate, mate, draw, aborted, outoftime'
    },
    winner: {
      type: 'string',
      description: 'white or black'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    white: {
      model: 'user'
    },
    black: {
      model: 'user'
    },

  },

};

