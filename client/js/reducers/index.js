import { createStore, combineReducers } from 'redux';

import page from './page';
import room from './room';
import requests from './requests';
import participant from './participant';

export const store = 
createStore(combineReducers({
	page,
	room,
	requests,
	participant
}));