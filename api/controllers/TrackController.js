/**
 * TrackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  location: async (req, res) => {
    sails.log.debug(
      "TrackingController.location req.body: ",
      JSON.stringify(req.body)
    );

    // Check bearer authorization token first
    // 'authorization': "Bearer <a secret key>"
    if (
      req.headers["authorization"].substr(7) !==
      sails.config.transistorsoft.auth
    ) {
      sails.log.warn("TrackingController.location authorization header wrong");
      return res.badRequest();
    }

    const location = req.param("location");
    const userId = req.param("userId");
    const deliveryId = req.param("jobId") || req.param("deliveryId");
    try {
      await DriverProfile.setLatestLocation(location.coords, userId);
    } catch (err) {
      sails.log.error(
        "TrackingController.location DriverProfile.setLatestLocation error: ",
        err.message || err
      );
    }

    // Check if a tracking event is in "allocation" mode
    const allocation = !!req.param("allocation");
    try {
      // This is for onJob tracking
      await Tracking.add(location, userId, deliveryId, allocation);
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
