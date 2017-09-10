import { assign } from 'lodash';
import { createStore } from 'redux'

const init = "Home";

const page = (state = init, {type, payload}) => {
	switch (type) {
		case "NAVIGATE":
			return payload.page;
		default:
			return state;
	}
	return state ;
}
 
export default page;