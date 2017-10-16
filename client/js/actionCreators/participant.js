import { store } from '../reducers';

export default {

	kickParticipant: function(payload) {
		return {
			type: "KICK_PARTICIPANT",
			payload: payload
		};
	},

	leaveRoom: function() {
		return {
			type: "LEAVE_ROOM"
		};
	}

}