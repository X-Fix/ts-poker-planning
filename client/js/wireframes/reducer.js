import { assign } from '../utilities/lodash';

const init = {};

const reducer = (state = init, {type, payload}) => {
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

export default reducer;