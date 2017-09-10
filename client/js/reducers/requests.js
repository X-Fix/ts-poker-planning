import { assign } from 'lodash';
import { createStore } from 'redux'

const init = {
	joinRoom: "ready",
	createRoom: "ready",
	leaveRoom: "ready"
};

const requests = (state = init, {type, payload}) => {
	switch (type) {
		case "SET_REQUEST_STATUS":
			let newState;
			newState[payload.requestName] = payload.requestStatus;
			return assing({}, newState, state);
		default:
			return state;
	}
	return state ;
}
 
export default requests;