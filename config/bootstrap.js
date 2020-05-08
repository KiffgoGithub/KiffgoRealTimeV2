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

  now = moment();
  var start = now.startOf("day").valueOf();
  var end = now.endOf("day").valueOf();

  var test = [
    {
      location: {
        event: "geofence",
        is_moving: true,
        uuid: "3c936447-5673-48ea-9feb-f854a649c8e2",
        timestamp: "2019-07-17T07:36:42.000Z",
        odometer: 528.9,
        coords: {
          latitude: 51.45821434322742,
          longitude: 0.06421508552174945,
          accuracy: 4,
          speed: 7.31,
          heading: 346.24,
          altitude: 114.9,
        },
        activity: {
          type: "still",
          confidence: 100,
        },
        battery: {
          is_charging: false,
          level: 0.61,
        },
        geofence: {
          identifier: "dropoff",
          action: "ENTER",
          extras: {
            locationIdentifier: "dropoff",
            jobId: 29,
            userId: 264,
          },
        },
        extras: {},
      },
      jobId: 24,
      userId: 16,
      driverDetails: {
        name: "test",
        phone: "123123123",
        vehicleSize: "Large",
      },
    },
    {
      location: {
        event: "geofence",
        is_moving: true,
        uuid: "3c936447-5673-48ea-9feb-f854a649c8e2",
        timestamp: "2019-07-17T07:36:42.000Z",
        odometer: 528.9,
        coords: {
          latitude: 51.45821434322742,
          longitude: 0.06421508552174945,
          accuracy: 4,
          speed: 7.31,
          heading: 346.24,
          altitude: 114.9,
        },
        activity: {
          type: "still",
          confidence: 100,
        },
        battery: {
          is_charging: false,
          level: 0.61,
        },
        geofence: {
          identifier: "dropoff",
          action: "ENTER",
          extras: {
            locationIdentifier: "dropoff",
            jobId: 29,
            userId: 264,
          },
        },
        extras: {},
      },
      jobId: 24,
      userId: 15,
      driverDetails: {
        name: "test",
        phone: "123123123",
        vehicleSize: "Large",
      },
    },
    {
      location: {
        event: "geofence",
        is_moving: true,
        uuid: "3c936447-5673-48ea-9feb-f854a649c8e2",
        timestamp: "2019-07-17T07:36:42.000Z",
        odometer: 528.9,
        coords: {
          latitude: 51.45821434322742,
          longitude: 0.06421508552174945,
          accuracy: 4,
          speed: 7.31,
          heading: 346.24,
          altitude: 114.9,
        },
        activity: {
          type: "still",
          confidence: 100,
        },
        battery: {
          is_charging: false,
          level: 0.61,
        },
        geofence: {
          identifier: "dropoff",
          action: "ENTER",
          extras: {
            locationIdentifier: "dropoff",
            jobId: 29,
            userId: 264,
          },
        },
        extras: {},
      },
      jobId: 24,
      userId: 14,
      driverDetails: {
        name: "test",
        phone: "123123123",
        vehicleSize: "Large",
      },
    },
  ];

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

      // Get list of all Drivers on connection (only for kiffgo admins)
      var db = Track.getDatastore().manager;
      const drivers = await db
        .collection(Track.tableName)
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: start,
                $lte: end,
              },
              businessId: soc.userID,
            },
          },
          {
            $group: {
              _id: "$userId",
              location: { $last: "$location" },
              userID: { $last: "$userId" },
              owner: { $last: "$owner" },
              businessId: { $last: "$businessId" },
              driverDetails: { $last: "$driverDetails" },
            },
          },
          {
            $project: {
              _id: "$userId",
              location: "$location",
              userID: "$userID",
              owner: "$owner",
              businessId: "$businessId",
              driverDetails: "$driverDetails",
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ])
        .toArray();
      socket.emit("allDrivers", { drivers: drivers });
      console.log({ thisisBusiness: drivers });
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

      // Get list of all Drivers on connection (only for kiffgo admins)
      var db = Track.getDatastore().manager;
      const drivers = await db
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
            $group: {
              _id: "$userId",
              location: { $last: "$location" },
              userID: { $last: "$userId" },
              jobId: { $last: "$owner" },
              businessId: { $last: "$businessId" },
              driverDetails: { $last: "$driverDetails" },
            },
          },
          {
            $project: {
              _id: "$userId",
              location: "$location",
              userID: "$userID",
              jobId: "$owner",
              businessId: "$businessId",
              driverDetails: "$driverDetails",
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ])
        .toArray();
      socket.emit("allDrivers", { drivers: drivers });
      console.log({ thisisKiffgo: drivers });
    });
  });
};
