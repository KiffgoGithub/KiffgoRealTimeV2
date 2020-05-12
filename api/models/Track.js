/**
 * Track.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    location: {
      type: "ref",
      required: true,
    },

    userId: {
      type: "number",
      required: true,
    },

    owner: {
      type: "number",
      allowNull: true,
    },

    businessId: {
      type: "number",
      allowNull: true,
    },

    driverDetails: {
      type: "ref",
      required: true,
    },
  },

  afterCreate: function (entry, cb) {
    sails.sockets.broadcast("track", "new_entry", entry);
    cb();
  },
};
