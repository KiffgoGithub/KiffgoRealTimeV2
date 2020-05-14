module.exports = {
  friendlyName: "New task added",

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
    sails.log.debug("new-task-added action Started");

    try {
      const socketRooms = await sails.helpers.joinRoom(inputs.businessId);

      // sails.sockets.broadcast(socketRooms, "taskAdded", {
      //   task: inputs.task,
      // });
      io.sockets.in(socketRooms).emit("taskAdded", {
        task: inputs.task,
      });
    } catch (err) {
      sails.log.error(
        "new-task-added action:  Task could not be updated due to this err: ",
        err.message || err
      );
    }

    sails.log.debug("new-task-added action Ended");
    return exits.success({
      status: true,
      message: "Task Added",
    });
  },
};
