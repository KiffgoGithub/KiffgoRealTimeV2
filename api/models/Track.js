/**
 * Track.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: {
    location: {
      type: Object,
      required: true,
    },

    userId: {
      type: Number,
      required: true,
    },

    owner: {
      type: Number,
      allowNull: true,
    },
  },

  afterCreate: function (entry, cb) {
    sails.sockets.broadcast("track", "new_entry", entry);
    cb();
  },
};
