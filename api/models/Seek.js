/**
 * Seek.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    color: {
      description: 'Which color user gets to play (random, white, black)',
      type: 'string',
      example: 'random'
    },

    clockLimit: {
      description: 'Clock initial time in seconds (60 - 10800)',
      type: 'number'
    },

    clockIncrement: {
      description: 'Clock increment in seconds (0 - 60)',
      type: 'number',
      example: 0
    },

    // @todo. remove this property. We use it because I don't know how to store
    //  Seek ID in session and get it in sockets afterDisconnect callback
    socketId: {
      description: 'socket ID',
      type: 'string'
    },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    createdBy: {
      model: 'user'
    },
    game: {
      model: 'game'
    },

  },

};

