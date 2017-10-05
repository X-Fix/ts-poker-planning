const _ = require("lodash");
const shortid = require('shortid');
const dbi = require("../utilities/databaseInterface");
const HTTP_STATUS = require('../utilities/constants').HTTP_STATUS;

function Room(roomName, cardType) {
	return {
        id: shortid.generate(),
        name: roomName,
        ownerId: null,
        isLocked: true,
        cardType: cardType,
        item: {
            name: null,
            isLocked: false,
            dateCreated: Date.now()
        },
        participants: [],
        lurkers: [],
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
		const {
			participantName,
			participantId,
			roomName,
			roomId=dbi.getRoomId(roomName)
		 } = req.body;

		if (_.isEmpty(roomId)) {
			// If no roomName provided in RQ then neither identifier was provided in RQ which is bad
			if (_.isEmpty(roomName)) {
				throw {
					type: "STATUS",
					message: "No valid room identifier provided",
					status: HTTP_STATUS.BAD_REQUEST
				};
			// if roomName WAS provided in RQ but roomId still not found, invalid roomName provided
			} else {
				throw {
					type: "STATUS",
					message: "No room found with that name",
					status: HTTP_STATUS.NOT_FOUND
				};
			}
		}

		let room = dbi.checkOutRoom(roomId, "joinRoom");
		let returnParticipant;

		if (!_.isEmpty(participantId)) {
			// Look for participant in room.participants
			returnParticipant = _.find(room.participants, { id: participantId });
			// If not found...
			if (_.isEmpty(returnParticipant)) {
				// Look for participant in room.lurkers and remove from that list if found
				returnParticipant = _.remove(room.lurkers, { id: participantId })[0];
				// If found in lurkers...
				if (!_.isEmpty(returnParticipant)) {
					// Add back to room.participants collection
					room.participants = _.concat(room.participants, returnParticipant);
					// If the only participant in colloection...
					if (_.isEqual(room.participants.length, 1)) {
						// Set this participant as owner of the room
						room.ownerId = returnParticipant.id;
					}
				// If not found in room.lurkers either...
				} else {
					throw {
						type: "STATUS",
						message: "No participant with that id exists in this room",
						status: HTTP_STATUS.NOT_FOUND
					};
				}
			}
		} else if (!_.isEmpty(participantName)) {
			_.forEach(room.participants, (participant) => {
				// TODO remove toLowerCase() once FE handles case and capitalisation (BE should not alter data)
				if (_.isEqual(participant.name.toLowerCase(), participantName.toLowerCase())) {
					dbi.checkInRoom(roomId);
					throw {
						type: "STATUS",
						message: "A participant with that name already exists in this room",
						status: HTTP_STATUS.CONFLICT
					};
				}
			});
			returnParticipant = new Participant(participantName);
			room.participants.push(returnParticipant);
		} else {
			throw {
				type: "STATUS",
				message: "No valid participant identifier provided",
				status: HTTP_STATUS.BAD_REQUEST
			};
		}

		res.json({
			room: room,
			participant: returnParticipant,
			timeStamp: Date.now()
		});

		dbi.checkInRoom(roomId);
	}
}

module.exports = expressRoutes;