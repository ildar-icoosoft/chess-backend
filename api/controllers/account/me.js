module.exports = {


  friendlyName: 'Get current user',


  description: '',

  exits: {

  },


  fn: async function () {
    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    var user = await User.findOne({ id: this.req.session.userId });

    // If no user was found, respond "notFound" (like calling `res.notFound()`)
    if (!user) { throw 'notFound'; }

    // Display a personalized welcome view.
    return user;
  }


};
