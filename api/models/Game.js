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

