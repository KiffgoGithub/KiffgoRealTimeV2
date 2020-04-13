/**
 * TrackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  location: async (req, res) => {
    // socket.io
    var io = sails.io;

    sails.log.debug(
      "TrackingController.location req.body: ",
      JSON.stringify(req.body)
    );

    const location = req.param("location");
    const userId = req.param("userId");
    const deliveryId = req.param("jobId") || req.param("deliveryId");

    // Check if a tracking event is in "allocation" mode
    const allocation = !!req.param("allocation");
    try {
      // This is for onJob tracking
      const insertion = await Track.add(
        location,
        userId,
        deliveryId,
        allocation
      );

      // after insertion the sockets emits the info to the client.
      if (insertion) {
        // io.on("connection", (socket) => {
        //   socket.emit("track", "data inserted");
        // });
        io.sockets.emit("track", { thisIs: "theMessage" });
      }
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
};
