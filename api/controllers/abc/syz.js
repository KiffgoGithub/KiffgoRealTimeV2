module.exports = {
  friendlyName: "Syz",

  description: "Syz abc.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const req = this.req;
    const res = this.res;
    // Make sure this is a socket request (not traditional HTTP)
    if (!req.isSocket) {
      return res.badRequest();
    }
    // All done.
    // Have the socket which made the request join the "funSockets" room.
    sails.sockets.join(req, "funSockets");

    // Broadcast a notification to all the sockets who have joined
    // the "funSockets" room, excluding our newly added socket:
    sails.sockets.broadcast("funSockets", "hello", { howdy: "hi there!" }, req);
    return true;
  },
};
