module.exports = {
  friendlyName: "Task updated",

  description: "",

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
    sails.log.debug("task-updated action Started");

    try {
      const socketRooms = await sails.helpers.joinRoom(inputs.businessId);

      sails.sockets.broadcast(socketRooms, "taskUpdate", {
        task: inputs.task,
      });
    } catch (err) {
      sails.log.error(
        "task-updated action:  Task could not be updated due to this err: ",
        err.message || err
      );
    }

    sails.log.debug("task-updated action Ended");
    return exits.success({
      status: true,
      message: "Task Update",
    });
  },
};
