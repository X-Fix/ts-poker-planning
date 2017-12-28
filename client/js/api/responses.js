import find 	from 'lodash/find';
import isEmpty 	from 'lodash/isEmpty';
import { store } from '../reducers';
import { roomActions } from '../actionCreators';
import { getStorageItem, setStorageItem } from '../utilities/helperMethods';

function identifyForFullstory(room, participant) {
	if (!window.FS) return;

	FS.identify(participant.id, {
		displayName: participant.name,
		roomName_str: room.name,
		isOwner_bool: room.ownerId === participant.id
	});
}

function joinRoom({ room, participant }) {
	store.dispatch(roomActions.joinRoom({ room, participant }));
	identifyForFullstory(room, participant);
	setStorageItem("roomId", room.id);
	setStorageItem("participantId", participant.id);
};

export default {

	/*
		HTTP responses
	 */
	joinRoomResponse: function(response) {
		joinRoom(response.body);
	},

	joinRoomError: function(error, response, message) {
		alert(message);
	},

	createRoomResponse: function(response) {
		joinRoom(response.body);
	},

	createRoomError: function(error, response, message) {
		alert(message);
	},
	/***/

	/*
		Socket messages
	 */
	serverSync: function({ room, timestamp }) {

		const participantId = getStorageItem("participantId");
		const participant = find(room.participants, { id: participantId }) || {};

		if (isEmpty(participant)) {
			setStorageItem("participantId", null);
			setStorageItem("roomId", null);
		}

		store.dispatch(roomActions.syncRoom({ room, participant, timestamp }));
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