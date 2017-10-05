const _ = require("lodash");
const dbi = require("../utilities/databaseInterface");
const HTTP_STATUS = require('../utilities/constants').HTTP_STATUS;
const ERRORS = require('../utilities//constants').ERRORS;
const TIME_OUTS = require('../utilities//constants').TIME_OUTS;
const sleep = require('../utilities/helperMethods').sleep;

function syncRoom(io, room) {
	console.log("[" + room.name + "] synced");
	io.to(room.id).emit("sync", {room: room, timestamp: Date.now()});
}

function getParticipant(participantId, room) {
	let participant = _.find(room.participants, { id: participantId });

	if (_.isEmpty(participant)) {
		throw {
            type: ERRORS.CLIENT_ERROR,
            message: "Invalid participantId submitted",
            status: HTTP_STATUS.BAD_REQUEST
        };
	}

	return participant;
}

function checkParticipantIsRoomOwner(participantId, room) {
	if (!_.isEqual(room.ownerId, participantId)) {
		dbi.checkInRoom(room.id)
		throw {
            type: ERRORS.CLIENT_ERROR,
            message: "Participant must be room owner to execute action",
            status: HTTP_STATUS.UNAUTHORISED
        };
	}
}

function deleteEmptyRoom(room) {
	dbi.checkInRoom(room.id);

	if (room.participants.length === 0) {
		console.log("Deleting room");
		dbi.deleteRoom(room.id);
		return true;
	}
	return false;
}

const socketRoutes = {

	subscribe: function({ roomId, participantId }, socket, io) {
		let room = dbi.checkOutRoom(roomId, "subscribe");
		let participant = getParticipant(participantId, room);

		participant.socketId = socket.conn.id;

    	console.log(participantId + " (" + socket.conn.id + ") joined room [" + roomId + "]");

    	socket.join(roomId);
    	syncRoom(io, room);
    	dbi.checkInRoom(roomId);
	},

	createItem: function({ roomId, participantId, item }, socket, io) {
		const room = dbi.checkOutRoom(roomId, "createItem");
		checkParticipantIsRoomOwner(participantId, room);

		room.item = item;

		_.forEach(room.participants, (participant) => {
			participant.itemScore = null;
		});

		console.log(participantId + " (" + socket.conn.id + ") created a new item (" + item.name + ") for room [" + roomId +"]");

		syncRoom(io, room);
		dbi.checkInRoom(roomId);
	},

	setItemScore: function({ roomId, participantId, itemScore }, socket, io) {
		let room = dbi.checkOutRoom(roomId, "setItemScore");
		let participant = getParticipant(participantId, room);

		participant.itemScore = itemScore;

		if (room.allParticipantsDone()) {
			room.item.isLocked = true;
		}

		console.log(participantId + " (" + socket.conn.id + ") set their item value (" + room.item.name + " - " + itemScore + ") for room [" + roomId +"]");

		syncRoom(io, room);
		dbi.checkInRoom(roomId);
	},

	kickParticipant: function({ roomId, participantId, targetId }, socket, io) {
		let room = dbi.checkOutRoom(roomId, "kickParticipant");
		checkParticipantIsRoomOwner(participantId, room);

		if (_.isEqual(targetId, room.ownerId)) {
			dbi.checkInRoom(roomId);
			throw {
	            type: ERRORS.CLIENT_ERROR,
	            message: "Kick target cannot be room owner",
	            status: HTTP_STATUS.FORBIDDEN
	        };
		}

		room.participants = _.filter(room.participants, (participant) => {
			return !_.isEqual(targetId, participant.id);
		});

		console.log(participantId + " (" + socket.conn.id + ") kicked " + targetId + " from room [" + roomId + "]");

		syncRoom(io, room);
		dbi.checkInRoom(roomId);
	},

	disconnect: function({ roomId }, socket, io) {
		let room = dbi.checkOutRoom(roomId, "disconnect");
		// NB: Socket.io handles leaving socket room on disconnect
        const socketId = socket.conn.id;
        console.log("User disconnected from: [" + roomId + "] ("+socketId+")");

        const participant = _.find(room.participants, {socketId: socketId});
		if (_.isEmpty(participant)) return;

		room.participants = _.filter(room.participants, (participant) => {
			return !_.isEqual(socketId, participant.socketId);
		});
		room.lurkers.push(participant);

		const roomOwnerLeft = _.isEqual(participant.id, room.ownerId);
		const roomIsEmpty = room.participants.length === 0;

		if (roomOwnerLeft) {
			if (roomIsEmpty) {
				room.ownerId = null;
				console.log("Waiting "+TIME_OUTS.EMPTY_ROOM+"ms...");
				setTimeout(deleteEmptyRoom, TIME_OUTS.EMPTY_ROOM, room);
			} else {
				room.ownerId = room.participants[0].id;
			}
		} else {
			console.log("Not room owner", participant.id, room.ownerId);
		}

		syncRoom(io, room);
		dbi.checkInRoom(roomId);
	}
}

module.exports = socketRoutes;