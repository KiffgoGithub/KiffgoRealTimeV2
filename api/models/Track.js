/**
 * Track.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    latitude: {
      type: "number",
      required: true,
    },

    longitude: {
      type: "number",
      required: true,
    },

    heading: {
      type: "number",
      allowNull: true,
    },

    speed: {
      type: "number",
      allowNull: true,
    },

    odometer: {
      type: "number",
      allowNull: true,
    },

    timestamp: {
      type: "ref",
      columnType: "timestamp with time zone",
    },

    geofence_action: {
      type: "string",
      isIn: ["ENTER", "EXIT", "NONE"],
      defaultsTo: "NONE",
    },

    allocation: {
      type: "boolean",
      defaultsTo: false,
    },
  },

  add: async (location, userId, deliveryId, allocation) => {
    if (!userId) {
      throw new Error("Tracking.add userId is not defined");
    }
    if (!deliveryId && allocation === false) {
      throw new Error("Tracking.add deliveryId is not defined");
    }
    if (!location.coords) {
      throw new Error("Tracking.add location.coords is not defined");
    }

    const createObj = {
      user: userId,
      timestamp: location.timestamp,
      allocation,
    };
    if (allocation === false) createObj.owner = deliveryId;

    createObj.latitude = location.coords.latitude;
    createObj.longitude = location.coords.longitude;
    createObj.speed = location.coords.speed;
    createObj.heading = location.coords.heading;
    if (typeof location.odometer === "number")
      createObj.odometer = location.odometer;

    // Add geofence to the createObj
    if (
      location.event &&
      location.event === "geofence" &&
      allocation === false
    ) {
      createObj.geofence_action = location.geofence.action;
    }

    await Track.create(createObj);
  },
};
