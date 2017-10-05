import { store } from '../reducers';
import apiInterface from '../utilities/apiInterface';

export default {

	joinRoom: function(requestObject) {
		apiInterface.sendRequest("joinRoom", requestObject);
	},

	createRoom: function(requestObject) {
		apiInterface.sendRequest("createRoom", requestObject);
	},

	subscribe: function(requestObject) {
		apiInterface.makeSocketRequest("subscribe", requestObject);
	},

	createItem: function(requestObject) {
		apiInterface.makeSocketRequest("createItem", requestObject);
	},

	setItemScore: function(requestObject) {
		apiInterface.makeSocketRequest("setItemScore", requestObject);
	},

	kickParticipant: function(requestObject) {
		apiInterface.makeSocketRequest("kickParticipant", requestObject);
	}
}
