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
    sails.sockets.blast("stillConnected", "socket is still connected");
    return exits.success();
  },
};
