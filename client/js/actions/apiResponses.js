import { store } from '../reducers';
import apiInterface from '../utilities/apiInterface';
 
export default {
	
	joinRoomResponse: function(response) {
		store.dispatch({
			type: "JOIN_ROOM",
			payload: response.body
		});
		window.location = "/#/PokerRoom";
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
