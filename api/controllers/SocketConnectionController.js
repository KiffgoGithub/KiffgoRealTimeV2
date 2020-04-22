/**
 * SocketConnectionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  onConnect: function (req, res) {
    console.log("req test");
    // sails.sockets.join(req, "testroom");
    // sails.sockets.broadcast("testroom", "testevnt", {
    //   someData: "can also be just string instead of obj, i prefer objects...",
    // });

    return res.ok();
  },
};
