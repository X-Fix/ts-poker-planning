import { assign } from '../utilities/lodash';

const init = {
	shareLinkModalIsOpen: false
};

const modals = (state = init, {type, payload}) => {
	let newState = {};
	switch (type) {
		case "OPEN_MODAL":
			newState[payload.modalName+"ModalIsOpen"] = true;
			return assign({}, state, newState);
		case "CLOSE_MODAL":
			newState[payload.modalName+"ModalIsOpen"] = false;
			return assign({}, state, newState);
		default:
			return state;
	}
	return state ;
}

export default modals;