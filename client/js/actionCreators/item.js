import { store } from '../reducers';

export default {

	createItem: function(payload) {
		return {
			type: "JOIN_ROOM",
			payload: payload
		};
	},

	setItemScore: function(payload) {
		return {
			type: "SET_ITEM_SCORE",
			payload: payload
		}
	}

}