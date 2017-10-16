import { assign, isEqual } from 'lodash';

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
		case "LEAVE_ROOM":
			return init;
		case "SYNC_ROOM":
			// Only return new participant object if syncRoom changes affected this participant
			if (!isEqual(payload.participant, state)) {
				return payload.participant;
			}
		default:
			return state;
	}
	return state;
}

export default participant;