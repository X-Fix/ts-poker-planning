const app = require("./server/app");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const _ = require("lodash");
const roomManager = require("./server/roomManager");

const PORT = process.env.PORT || 3000;

function syncRoom(io, room) {
	console.log("["+room.name + "] synced");
	io.to(room.name).emit("sync", {room: room, timestamp: Date.now()});
}

function getRoom(roomName) {
	return _.find(roomManager.getRooms(), {name: roomName});
}

function getParticipant(room, participantName) {
	return _.find(room.participants, {name: participantName});
}

function allParticipantsDone(room) {
	for (let i=0; i<room.participants.length; i++) {
		if (room.participants[i].itemScore === null) {
			return false;
		}
	}
	return true;
}

io.on("connection", function(socket) {
    console.log("User connected", socket.conn.id);
    let _roomName;

    socket.on("disconnect", () => {
    	// NB: Socket.io handles leaving socket room on disconnect
        const socketId = socket.conn.id;
        console.log("User disconnected from: [" + _roomName + "] ("+socketId+")");

        let room = getRoom(_roomName)
		if (_.isEmpty(room)) return;

		const participant = _.find(room.participants, {socketId: socketId});
		if (_.isEmpty(participant)) return;		

		room.participants = _.filter(room.participants, (participant) => {
			return !_.isEqual(socketId, participant.socketId);
		});

		if (room.participants.length === 0) {
			roomManager.removeRoom(_roomName);
			return;
		}

		if (_.isEqual(participant.name, room.owner)) {
			room.owner = room.participants[0].name;
		}

		syncRoom(io, _roomName);
    });

    socket.on("subscribe", (data) => {

    	let room = getRoom(data.roomName)
		if (_.isEmpty(room)) return;

		let participant = getParticipant(room, data.participantName);
		if (_.isEmpty(participant)) return;
    	participant.socketId = socket.conn.id;

    	socket.join(data.roomName);
    	_roomName = data.roomName;

    	console.log(participant.name + " (" + socket.conn.id + ") joined room [" + room.name + "]");

    	syncRoom(io, room);
    });

    socket.on("createItem", (data) => {
    	let room = getRoom(data.roomName)
		if (_.isEmpty(room)) return;

		if (!_.isEqual(data.participantName, room.owner)) return;

		room.item = { 
			name: data.itemName,
			isLocked: false
		};

		_.forEach(room.participants, (participant) => {
			participant.itemScore = null;
		});

		console.log(data.participantName + " (" + socket.conn.id + ") created a new item (" + data.itemName + ") for room [" + data.roomName+"]");

		syncRoom(io, room);
    });

    socket.on("setItemScore", (data) => {
    	let room = getRoom(data.roomName)
		if (_.isEmpty(room)) return;

		if (_.isEmpty(room.item) || room.item.isLocked) return;

		let participant = getParticipant(room, data.participantName);
		if (_.isEmpty(participant)) return;

		participant.itemScore = data.itemScore;
		console.log(participant);
		room.item.isLocked = allParticipantsDone(room);

		console.log(participant.name + " (" + socket.conn.id + ") set their item value (" + room.item.name + " - " + data.itemScore + ") for room [" + data.roomName+"]");
		if (room.item.isLocked) console.log("Locked");

		syncRoom(io, room);
    });

    socket.on("kickParticipant", (data) => {
    	let room = getRoom(data.roomName)
		if (_.isEmpty(room)) return;

		if (!_.isEqual(data.participantName, room.owner)) return;

		room.participants = _.filter(room.participants, (participant) => {
			return !_.isEqual(data.kickedParticipant, participant.name);
		});

		syncRoom(io, room);
    });
});

http.listen(PORT, function() {
    console.log(`Listening on ${ PORT }`);
});