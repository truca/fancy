import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
//  import _ from 'underscore';

const filter = (state = '', action) => {
	switch (action.type) {
		case types.FILTER:
			return action.filter;
		default:
			return state;
	}
};

const personalChats = (state = [{id: 1, name: 'PPedro'}, {id: 2, name: 'PPablo'}], action) => {
	switch (action.type) {
		case types.SET_PERSONAL_CHATS:
			return action.personalChats;
		default:
			return state;
	}
};

const ownChats = (state = [{id: 1, name: 'OPedro'}, {id: 2, name: 'OPablo'}], action) => {
	switch (action.type) {
		case types.SET_OWN_CHATS:
			return action.ownChats;
		default:
			return state;
	}
};

const subscribedChats = (state = [{id: 1, name: 'SPedro'}, {id: 2, name: 'SPablo'}], action) => {
	switch (action.type) {
		case types.SET_SUBSCRIBED_CHATS:
			return action.ownChats;
		default:
			return state;
	}
};

const events = (state = [], action) => {
	switch (action.type) {
		case types.SET_EVENTS:
			return action.events;
		default:
			return state;
	}
};

const user = (state = null, action) => {
	switch (action.type) {
		case types.SET_USER:
			return action.user;
		case types.LOG_OUT:
			return null;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	filter,
	routing,
	personalChats,
	ownChats,
	subscribedChats,
	events,
	user
});

export default rootReducer;
