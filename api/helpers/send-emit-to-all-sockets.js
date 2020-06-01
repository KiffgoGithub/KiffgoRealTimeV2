module.exports = {
  friendlyName: "Send emit to all sockets",

  description: "",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      sails.sockets.blast("stillConnected", {
        msg: "socket is still connected",
      });
    } catch (e) {
      sails.log(e);
    }
    return exits.success();
  },
};
