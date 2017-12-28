import { API_ENDPOINTS, REQUEST_STATES } from '../utilities/constants';
import { assign, forEach, keys } from '../utilities/lodash';

let init = {};

forEach(keys(API_ENDPOINTS), apiEndpoint => {
	init[apiEndpoint] = REQUEST_STATES.READY
});

const requests = (state = init, {type, payload}) => {

	let newState = {};

	switch (type) {
		case "SET_REQUEST_STATE":
			newState[payload.requestName] = payload.requestState;
			return assign({}, state, newState);
		default:
			return state;
	}
	return state ;
}

export default requests;