module.exports = {
  friendlyName: "Get current location",

  description: "get user last location from track table",

  inputs: {
    drivers: {
      type: ["ref"],
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    // const track = await Track.find({
    //   where: { userId: { in: inputs.drivers } },
    // })
    //   .sort("createdAt DESC")
    //   .aggregate({ groupBy: "userId" });

    var db = Track.getDatastore().manager;

    const track = db
      .collection(Track.tableName)
      .find({
        userId: {
          $in: inputs.drivers,
        },
      })
      .sort({
        createdAt: -1,
      });

    console.log(track);

    return;
  },
};
