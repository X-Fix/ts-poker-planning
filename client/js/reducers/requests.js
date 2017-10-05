import { assign, forEach, keys } from 'lodash';
import { createStore } from 'redux';
import { API_ENDPOINTS, REQUEST_STATES } from '../utilities/constants';

let init = {};

forEach(keys(API_ENDPOINTS), apiEndpoint => {
	init[apiEndpoint] = REQUEST_STATES.READY
});

const requests = (state = init, {type, payload}) => {

	let newState = {};

	switch (type) {
		case "SET_REQUEST_STATE":
			newState[payload.requestName] = payload.requestStatus;
			return assign({}, newState, state);
		default:
			return state;
	}
	return state ;
}

export default requests;