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
      sails.log("script run");
      sails.sockets.blast({
        msg: "socket is still connected",
      });
    } catch (e) {
      sails.log(e);
    }
    return exits.success();
  },
};
