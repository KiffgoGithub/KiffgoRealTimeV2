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
};
