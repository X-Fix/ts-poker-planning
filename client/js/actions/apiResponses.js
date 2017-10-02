import { store } from '../reducers';
import apiInterface from '../utilities/apiInterface';

function identifyForFullstory(responseBody) {
	if (!window.FS) return;
	const { participant, room } = responseBody;
	FS.identify(participant.id, {
		displayName: participant.name,
		roomName: room.name,
		isOwner: room.ownerId === participant.id
	});
}

export default {

	joinRoomResponse: function(response) {
		store.dispatch({
			type: "JOIN_ROOM",
			payload: response.body
		});
		window.location = "/#/PokerRoom";

		identifyForFullstory(response.body);
	},

	joinRoomError: function(error, response, message) {
		alert(message);
	},

	createRoomResponse: function(response) {
		store.dispatch({
			type: "CREATE_ROOM",
			payload: response.body
		});
		window.location = "/#/PokerRoom";

		identifyForFullstory(response.body);
	},

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
