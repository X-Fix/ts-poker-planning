import { store } from '../reducers';
import { roomActions } from '../actionCreators';
import { setStorageItem } from '../utilities/helperMethods';

function identifyForFullstory(room, participant) {
	if (!window.FS) return;

	FS.identify(participant.id, {
		displayName: participant.name,
		roomName_str: room.name,
		isOwner_bool: room.ownerId === participant.id
	});
}

function joinRoom(response) {
	const { room, participant } = response.body;

	store.dispatch(roomActions.joinRoom({ room, participant }));
	identifyForFullstory(room, participant);
	setStorageItem("roomId", room.id);
	setStorageItem("participantId", participant.id);
};

export default {

	/*
		HTTP responses
	 */
	joinRoomResponse: joinRoom,

	joinRoomError: function(error, response, message) {
		alert(message);
	},

	createRoomResponse: joinRoom,

	createRoomError: function(error, response, message) {
		alert(message);
	},
	/***/

	/*
		Socket messages
	 */
	serverSync: function({ room, timestamp }) {
		store.dispatch(roomActions.syncRoom({ room, timestamp }));
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
	/***/
}