import { assign, filter, isEqual, map } from 'lodash';
import { createStore } from 'redux'

const init = {
	id: null,
	name: null,
	ownerId: null,
	cardType: null,
	item: {
		name: null,
		isLocked: false,
		dateCreated: 0
	},
	participants: []
};

let lastTimestamp = 0;

function allParticipantsDone(room) {
	for (let i=0; i<room.participants.length; i++) {
		if (room.participants[i].itemScore === null) {
			return false;
		}
	}
	return true;
}

const room = (state = init, {type, payload}) => {

	if (payload !== undefined &&
		payload.timestamp !== undefined &&
		lastTimestamp > payload.timestamp
	) return state;

	let newProps = {};

	switch (type) {
		case "JOIN_ROOM":
		case "SYNC_ROOM":
			return payload.room;
		case "CREATE_ITEM":

			newProps.participants = map(state.participants, (participant) => {
				return assign({}, participant, { itemScore: null });
			});
			newProps.item = payload.item;

			return assign({}, state, newProps);

		case "SET_ITEM_SCORE":

			newProps.participants = map(state.participants, (participant) => {
				if (!isEqual(participant.id, payload.participantId)) return participant;

				return assign({}, participant, { itemScore: payload.itemScore });
			});

			if (allParticipantsDone(newProps)) {
				newProps.item = assign({}, state.item, { isLocked: true });
			};

			return assign({}, state, newProps);

		case "KICK_PARTICIPANT":

			newProps.participants = filter(state.participants, (participant) => {
				return !isEqual(participant.id, payload.targetId);
			});

			return assign({}, state, newProps);

		default:
			return state;
	}
	return state ;
}

export default room;