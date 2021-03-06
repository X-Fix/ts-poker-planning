const request = require('superagent-defaults')();
const io = require('socket.io-client');
import { store } from '../reducers';
import { API_ENDPOINTS, ERROR_MESSAGES, REQUEST_STATES } from '../utilities/constants';
import apiResponses from './responses';

request
.set({
	"X-Clacks-Overhead": "GNU Terry Pratchett"
});

var socket;
function getSocket() {
	if (!socket) {
		socket = io();
		socket.on('sync', apiResponses.serverSync);
	}
	return socket;
}

export default {

	sendRequest: (requestName, requestObject) => {
		store.dispatch({
			type: "SET_REQUEST_STATE",
			payload: {
				requestName: requestName,
				requestState: REQUEST_STATES.BUSY
			}
		});

		request
		.post(API_ENDPOINTS[requestName])
		.send(requestObject)
		.end(function (err, res) {
			if (!res) {
				store.dispatch({
					type: "ADD_ERRORS",
					payload: {
						errorMessages: "Request has been terminated\nPlease check your internet connection and try again."
					}
				});
				store.dispatch({
					type: "FAIL_PENDING_REQUESTS"
				});
				return;
			}

			let requestState;
			if (err) {
				requestState = REQUEST_STATES.FAILED;

				let errorMessage = ERROR_MESSAGES[requestName] ? ERROR_MESSAGES[requestName][res.status] : null;
				if (errorMessage) store.dispatch({type: "ADD_ERRORS", errorMessages: errorMessage});

				let handler = apiResponses[requestName+"Error"];
				if (handler) handler(err, res, errorMessage);
			} else {
				requestState = REQUEST_STATES.READY;

				let handler = apiResponses[requestName+"Response"];
				if (handler) handler(res);
			}

			store.dispatch({
				type: "SET_REQUEST_STATE",
				payload: {
					requestName: requestName,
					requestState: requestState
				}
			});
		})
	},

	makeSocketRequest: (requestName, requestObject) => {
		let socket = getSocket();
		socket.emit(requestName, requestObject);
	}

}