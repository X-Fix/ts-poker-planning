import { assign, find, isEmpty, isEqual } from 'lodash';
import { createStore } from 'redux'

const init = {};

let lastTimestamp = 0;

const participant = (state = init, {type, payload}) => {

	if (payload !== undefined &&
		payload.timestamp !== undefined &&
		lastTimestamp > payload.timestamp
	) return state;

	switch (type) {
		case "JOIN_ROOM":
			return payload.participant;
		case "LEAVE_ROOM":
			return init;
		case "CREATE_ITEM":
			return assign({}, state, { itemScore: null });
		case "SET_ITEM_SCORE":
			return assign({}, state, { itemScore: payload.itemScore });
		case "SYNC_ROOM":
			let participant = find(payload.room.participants, {id: state.id});
			if (isEmpty(participant)) {
				return init
			} else if (!isEqual(participant, state)) {
				return participant;
			}
		default:
			return state;
	}
	return state ;
}

export default participant;