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
      let socketRooms = ["kiffgo"];

      const kiffgoRoomInfo = await SocketInfo.find({
        roomName: "kiffgo",
      });
      if (kiffgoRoomInfo) {
        for (let i = 0; i < kiffgoRoomInfo.length; i++) {
          sails.sockets.join(
            kiffgoRoomInfo[i].socketId,
            kiffgoRoomInfo[i].roomName
          );
        }
      }

      const roomInfo = await SocketInfo.find({
        userId: inputs.businessId,
      }).limit(1);
      if (roomInfo && roomInfo[0].roomName !== "kiffgo") {
        socketRooms.push(roomInfo[0].roomName);
        sails.sockets.join(roomInfo[0].socketId, roomInfo[0].roomName);
      }

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
