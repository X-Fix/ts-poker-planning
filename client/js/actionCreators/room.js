import { store } from '../reducers';

export default {

	joinRoom: function(payload) {
		return {
			type: "JOIN_ROOM",
			payload: payload
		};
	},

	syncRoom: function(payload) {
		return {
			type: "SYNC_ROOM",
			payload: payload
		}
	}

}