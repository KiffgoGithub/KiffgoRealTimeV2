/**
 * TrackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  location: async (req, res) => {
    const io = SocketIO("server");

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

      Track.add(location, userId, deliveryId, allocation).exec(
        (err, tracking) => {
          if (err) {
            // Handle errors here!
            return;
          }
          // Tell any socket watching the User model class
          // that a new User has been created!
          Track.publishCreate(tracking);
        }
      );

      sails.sockets.broadcast("hello", { howdy: insertion });
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
