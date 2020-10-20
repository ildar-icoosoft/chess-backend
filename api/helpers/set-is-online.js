const onlineUsers = {};

module.exports = {


  friendlyName: 'Set is online',


  description: '',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
    connected: {
      type: 'boolean',
      required: true
    },
    req: {
      type: 'ref'
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const {userId, connected, req} = inputs;

    if (connected) {
      if (onlineUsers[userId]) {
        onlineUsers[userId]++;
      } else {
        onlineUsers[userId] = 1;
      }

      if (onlineUsers[userId] === 1) {
        const user = await User.findOne({id: userId});

        if (!user.isOnline) {
          const updatedData = {
            isOnline: true
          };

          await User.updateOne({id: userId}).set(updatedData);

          sails.sockets.blast('user', {
            verb: 'updated',
            data: {
              id: userId,
              ...updatedData
            },
            previous: user,
            id: userId
          }, req);
        }
      }
    } else {
      if (onlineUsers[userId]) {
        onlineUsers[userId]--;
      } else {
        onlineUsers[userId] = 0;
      }

      if (onlineUsers[userId] === 0) {
        const user = await User.findOne({id: userId});

        if (user.isOnline) {
          const updatedData = {
            isOnline: false
          };

          await User.updateOne({id: userId}).set(updatedData);

          sails.sockets.blast('user', {
            verb: 'updated',
            data: {
              id: userId,
              ...updatedData
            },
            previous: user,
            id: userId
          }, req);
        }
      }
    }
  }


};

