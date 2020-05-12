module.exports = {
  friendlyName: "Join room",

  description: "",

  inputs: {
    businessId: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Joined",
    },
  },

  fn: async function (inputs, exits) {
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

    const roomInfo = await SocketInfo.find({ userId: inputs.businessId }).limit(
      1
    );
    if (roomInfo && roomInfo[0].roomName !== "kiffgo") {
      socketRooms.push(roomInfo[0].roomName);
      sails.sockets.join(roomInfo[0].socketId, roomInfo[0].roomName);
    }

    return exits.success(socketRooms);
  },
};
