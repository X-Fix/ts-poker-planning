import { store } from '../reducers';

export default {

	openModal: function(payload) {
		return {
			type: "OPEN_MODAL",
			payload: payload
		};
	},

	closeModal: function(payload) {
		return {
			type: "CLOSE_MODAL",
			payload: payload
		}
	}

}