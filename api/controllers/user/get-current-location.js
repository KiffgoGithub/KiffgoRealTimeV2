module.exports = {
  friendlyName: "Get current location",

  description: "get user last location from track table",

  inputs: {
    drivers: {
      type: ["ref"],
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    const driverLocation = [];
    const drivers = inputs.drivers;

    try {
      for (let i = 0; i < drivers.length; i++) {
        const track = await Track.find({
          select: "location",
          where: { userId: drivers[i] },
        })
          .sort("createdAt DESC")
          .limit(1);
        if (track) {
          driverLocation.push({
            driverId: drivers[i],
            location: {
              lat: track[0].location.coords.latitude,
              lng: track[0].location.coords.longitude,
            },
          });
        }
      }
    } catch (err) {
      sails.log.error("Driver location Error === :", err.message || err);
    }

    // Send response.
    return exits.success({
      status: true,
      data: driverLocation,
      message: "Drivers current location",
    });
  },
};