import { store } from '../reducers';

export default {

	someAction: function(data) {
		store.dispatch({
			type: "ACTION_TYPE",
			payload: data
		});
	}

}