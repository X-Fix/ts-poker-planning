import { assign } from 'lodash';

const init = {};

const page = (state = init, {type, payload}) => {
	let newState = {};
	switch (type) {
		case "ACTION_NAME":
			newState.property = payload.property;
			return assign({}, state, newState);
		default:
			return state;
	}
	return state ;
}

export default page;