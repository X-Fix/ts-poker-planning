import { store } from '../reducers';

export default {

	someAction: function(data) {
		return {
			type: "ACTION_TYPE",
			payload: data
		};
	}

}