import { createStore, combineReducers } from 'redux';

import modals from './modals';
import page from './page';
import room from './room';
import requests from './requests';
import participant from './participant';

export const store =
createStore(combineReducers({
	modals,
	page,
	room,
	requests,
	participant
}));