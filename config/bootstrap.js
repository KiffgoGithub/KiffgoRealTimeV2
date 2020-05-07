/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
var moment = require("moment");
module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  sails.io.on("connect", async (socket) => {
    socket.on("business", async (soc) => {
      var check = await SocketInfo.find({ userId: soc.userID });
      if (check) {
        await SocketInfo.destroy({ userId: soc.userID });
      }

      sails.sockets.join(soc.userID, "business-" + soc.userID);
      await SocketInfo.create({
        socketId: socket.id,
        userId: soc.userID,
        roomName: "business-" + soc.userID,
      });

      sails.log.debug(
        "Business Socket",
        JSON.stringify({ business_socketID: socket.id })
      );
    });
    socket.on("kiffgo", async (soc) => {
      var check = await SocketInfo.find({ userId: soc.userID });
      if (check) {
        await SocketInfo.destroy({ userId: soc.userID });
      }

      sails.sockets.join(soc.userID, "kiffgo");
      await SocketInfo.create({
        socketId: socket.id,
        userId: soc.userID,
        roomName: "kiffgo",
      });

      sails.log.debug(
        "Kiffgo Socket",
        JSON.stringify({ kiffgo_socketID: socket.id })
      );
    });

    // Get list of all Drivers on connection (only for kiffgo admins)

    now = moment();
    console.log("now " + now.toString());
    var start = now.startOf("day").valueOf().unix();
    var end = now.endOf("day").valueOf().unix();

    sails.log(start, end);
    var db = Track.getDatastore().manager;
    const testing = await db
      .collection(Track.tableName)
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: start,
              $lte: end,
            },
          },
        },
        {
          $group: { _id: "$userId" },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    sails.log(testing);
    // sails.sockets.broadcast("kiffgo", "allDrivers", {
    //   drivers: test,
    // });
  });
};
