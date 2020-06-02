module.exports = {
  friendlyName: "Join room",

  description: "",

  inputs: {
    businessId: {
      type: "number",
    },
  },

  exits: {
    success: {
      description: "Joined",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.debug("join-room helper started");
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
    sails.log.debug({ outsideJoinRoomBusiness: inputs.businessId });
    if (inputs.businessId) {
      const roomInfo = await SocketInfo.find({
        userId: inputs.businessId,
      }).limit(1);
      sails.log.debug({
        insideJoinRoomBusiness: {
          businessId: inputs.businessId,
          roomInfo: roomInfo,
        },
      });
      sails.log.debug(roomInfo);
      if (!_.isEmpty(roomInfo) && roomInfo[0].roomName !== "kiffgo") {
        socketRooms.push(roomInfo[0].roomName);
        sails.sockets.join(roomInfo[0].socketId, roomInfo[0].roomName);
      }
    }
    sails.log.debug("join-room helper ended");
    return exits.success(socketRooms);
  },
};
