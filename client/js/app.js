import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './reducers';
import Router from './components/Router';
import { getCurrentRoute } from './utilities/helperMethods';
//import fullstory from './utilities/fullstory'

function dispatchNavigate() {
	store.dispatch({
		type: "NAVIGATE",
		payload: {
			page: getCurrentRoute()
		}
	});
}

// Add dispatch to hash change and onload event
window.onhashchange = dispatchNavigate;
window.onload = dispatchNavigate;

ReactDom.render(
	<Provider store={store}>
    	<Router />
    </Provider>
, document.getElementById("root"));