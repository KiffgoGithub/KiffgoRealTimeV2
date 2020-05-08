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
    try {
      const roomInfo = await SocketInfo.findOne({ userId: inputs.businessId });
      socketRooms = ["kiffgo"];

      if (roomInfo && roomInfo.roomName !== "kiffgo") {
        socketRooms.push(roomInfo.roomName);
      }

      //sails.sockets.blast("test", { location, userId, deliveryId });
      console.log(roomInfo);
      sails.sockets.join(roomInfo.socketId, roomInfo.roomName);
      sails.sockets.broadcast(socketRooms, "taskDelay", {
        task: inputs.task,
      });
    } catch (err) {
      sails.log.error(
        "Task could not be updated due to this err: ",
        err.message || err
      );
    }

    // Send response.
    return exits.success({
      status: true,
      message: "Task Update",
    });
  },
};
