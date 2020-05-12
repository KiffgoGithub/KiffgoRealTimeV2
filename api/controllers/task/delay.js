module.exports = {
  friendlyName: "Task delay",

  description: "sends the task delayed in minutes",

  inputs: {
    task: {
      type: "ref",
      required: true,
    },
    businessId: {
      type: "number",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    sails.log.debug("delay action Started");
    try {
      const socketRooms = await sails.helpers.joinRoom(inputs.businessId);

      sails.sockets.broadcast(socketRooms, "taskDelay", {
        task: inputs.task,
      });
    } catch (err) {
      sails.log.error(
        "delay action:  Task could not be updated due to this err: ",
        err.message || err
      );
    }

    // Send response.
    sails.log.debug("delay action Ended");
    return exits.success({
      status: true,
      message: "Task Update",
    });
  },
};
