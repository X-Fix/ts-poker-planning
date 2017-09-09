const _ = require("lodash");
const shortid = require('shortid');
const dbi = require("../utilities/databaseInterface");
const HTTP_STATUS = require('../utilities/constants').HTTP_STATUS;

function Room(roomName, cardType) {
	return {
        id: shortid.generate(),
        name: roomName,
        ownerIdId: null,
        isLocked: true,
        cardType: cardType,
        item: {
            name: null,
            created: null,
            isLocked: false
        },
        participants: [],
        allParticipantsDone: function() {
	    	for (let i=0; i<this.participants.length; i++) {
				if (this.participants[i].itemScore === null) {
					return false;
				}
			}
			return true;
	    }
    };
}

function Participant(participantName) {
	return {
		id: shortid.generate(),
		name: participantName,
		itemScore: null,
		socketId: null
    };
}

const expressRoutes = {

	createRoom: function(req, res) {
		const roomName = req.body.roomName,
			participantName = req.body.participantName,
			cardType = req.body.cardType;

		if (!_.isEmpty(dbi.getRoomId(roomName))) {
			throw {
				type: "STATUS",
				message: "A room with that name already exists",
				status: HTTP_STATUS.CONFLICT
			};;
		}

		const newRoom = new Room(roomName, cardType);
		const newParticipant = new Participant(participantName);

		newRoom.participants.push(newParticipant);
		newRoom.ownerId = newParticipant.id;

		dbi.saveRoom(newRoom);

		res.json({
			room: newRoom,
			participant: newParticipant,
			timeStamp: Date.now()
		});
		dbi.checkInRoom(newRoom.id);
	},

	joinRoom: function(req, res) {
		const roomName = req.body.roomName,
			participantName = req.body.participantName;

		const roomId = dbi.getRoomId(roomName);
		if (_.isEmpty(roomId)) {
			throw {
				type: "STATUS",
				message: "No room found with that name",
				status: HTTP_STATUS.NOT_FOUND
			};
		}

		let room = dbi.checkOutRoom(roomId);
		
		const newParticipant = new Participant(participantName);
		room.participants.push(newParticipant);

		res.json({
			room: room,
			participant: newParticipant,
			timeStamp: Date.now()
		});

		dbi.checkInRoom(roomId);
	}
}

module.exports = expressRoutes;