/**
 * TrackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  location: async (req, res) => {
    sails.log.debug("TrackController.location function Started");

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

      const socketRooms = await sails.helpers.joinRoom(businessId);

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
    sails.log.debug("TrackController.location function Ended");
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
