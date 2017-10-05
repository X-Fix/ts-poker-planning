import { assign, forEach, keys } from 'lodash';
import { createStore } from 'redux';
import { API_ENDPOINTS, REQUEST_STATES } from '../utilities/constants';

let init = {};

forEach(keys(API_ENDPOINTS), apiEndpoint => {
	init[apiEndpoint] = REQUEST_STATES.READY
});

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