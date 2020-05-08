/**
 * TrackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  location: async (req, res) => {
    //request
    // console.log(JSON.stringify(req);

    //console.log("socket: ", req.socket.locals);

    const location = req.param("location");
    const userId = req.param("userId");
    const businessId = req.param("businessId");
    const deliveryId = req.param("jobId") || req.param("deliveryId");
    const driverDetails = req.param("driverDetails");

    // Check if a tracking event is in "allocation" mode
    const allocation = !!req.param("allocation");
    try {
      // This is for onJob tracking
      const insertion = await Track.create({
        location: location,
        userId: userId,
        owner: deliveryId,
        businessId: businessId,
        driverDetails: driverDetails,
      });

      let socketRooms = ["kiffgo"];

      const kiffgoRoomInfo = await SocketInfo.find({
        roomName: "kiffgo",
      });
      if (kiffgoRoomInfo) {
        for (let i = 0; i < kiffgoRoomInfo.length; i++) {
          sails.sockets.join(
            kiffgoRoomInfo[i].socketId,
            kiffgoRoomInfo[i].roomName
          );
        }
      }

      const roomInfo = await SocketInfo.find({ userId: businessId }).limit(1);
      if (roomInfo && roomInfo[0].roomName !== "kiffgo") {
        socketRooms.push(roomInfo[0].roomName);
        sails.sockets.join(roomInfo[0].socketId, roomInfo[0].roomName);
      }

      sails.sockets.broadcast(socketRooms, "trackingInfo", {
        location: location,
        userId: userId,
        jobId: deliveryId,
        businessId: businessId,
        driverDetails: driverDetails,
      });
    } catch (err) {
      sails.log.error(
        "TrackingController.location Tracking.add error: ",
        err.message || err
      );
    }

    return res.ok();
  },

  geofence: async (req, res) => {
    sails.log.debug(
      "TrackingController.geofence req.body: ",
      JSON.stringify(req.body)
    );
    return res.json({ success: true });
  },

  odometer: async (req, res) => {
    sails.log.debug(
      "TrackingController.odometer req.body: ",
      JSON.stringify(req.body)
    );
    return res.json({ success: true });
  },
  subscribe: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req.socket, "track");

    return res.ok();
  },
};
