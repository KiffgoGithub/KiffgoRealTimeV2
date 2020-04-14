/**
 * SocketConnectionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  onConnect: function (req, res) {
    sails.sockets.broadcast("hello", { howdy: "hi there!" });
    return res.ok();
  },
};
