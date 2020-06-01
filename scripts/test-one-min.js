module.exports = {
  friendlyName: "Test one min",

  description: "",

  fn: async function () {
    sails.log("Running custom shell script... (`sails run test-one-min`)");
    await sails.helpers.sendEmitToAllSockets();
    return true;
  },
};
