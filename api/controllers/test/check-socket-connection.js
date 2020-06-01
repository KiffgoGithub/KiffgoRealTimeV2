module.exports = {
  friendlyName: "Check socket connection",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    sails.log("Running custom shell script... (`sails run test-one-min`)");
    await sails.helpers.sendEmitToAllSockets();

    return exits.success();
  },
};
