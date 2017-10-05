import { store } from '../reducers';
import apiInterface from '../utilities/apiInterface';
import { setStorageItem } from '../utilities/helperMethods';

function identifyForFullstory(responseBody) {
	if (!window.FS) return;

	const { room, participant } = responseBody;
	FS.identify(participant.id, {
		displayName: participant.name,
		roomName_str: room.name,
		isOwner_bool: room.ownerId === participant.id
	});
}

function joinRoom(response) {
	store.dispatch({
		type: "JOIN_ROOM",
		payload: response.body
	});
	identifyForFullstory(response.body);

	const { room, participant } = response.body;

	window.location = "/#/PokerRoom?roomId="+room.id;
	setStorageItem("participantId", participant.id);
};

export default {

	joinRoomResponse: joinRoom,

	joinRoomError: function(error, response, message) {
		alert(message);
	},

	createRoomResponse: joinRoom,

	createRoomError: function(error, response, message) {
		alert(message);
	},

	serverSync: function(data) {
		store.dispatch({
			type: "SYNC_ROOM",
			payload: {
				room: data.room,
				timestamp: data.timestamp
			}
		});
	},

	error: function(data) {
		console.log(data);
		if (data.type > 1) {
			console.log(data.type, data.status, data.message);
			alert("Bug found, please screenshot the console message and send to cameron@travelstart.com");
		} else {
			alert(data.message);
		}
	}
}