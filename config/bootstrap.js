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
      sails.log.debug(
        "Business Socket",
        JSON.stringify({ business_socketID: socket.id })
      );
      sails.sockets.join(soc.userID, "business-" + soc.userID);
      await SocketInfo.create({
        socketId: socket.id,
        userId: soc.userID,
        roomName: "business-" + soc.userID,
      });
    });
    socket.on("kiffgo", async (soc) => {
      sails.sockets.join(soc.userID, "kiffgo");
      await SocketInfo.create({
        socketId: socket.id,
        userId: soc.userID,
        roomName: "kiffgo",
      });

      // Get list of all Drivers on connection (only for kiffgo admins)
      const test = await Track.native((err, collection) => {
        if (err) return res.serverError(err);
        collection
          .aggregate([
            {
              $group: {
                userId: "$userId",
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
          ])
          .toArray((err, results) => {
            if (err) return res.serverError(err);
            return res.ok(results);
          });
      });
      sails.log(test);
      sails.sockets.broadcast("kiffgo", "allDrivers", {
        task: inputs.task,
      });

      sails.log.debug(
        "Kiffgo Socket",
        JSON.stringify({ kiffgo_socketID: socket.id })
      );
    });
  });
};
