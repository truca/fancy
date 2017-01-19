import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import R from 'ramda';
import * as types from '../actions/types';
import lang from '../translate2.js';


const filter = (state = '', action) => {
	console.log(action.type, action);
	switch (action.type) {
		case types.FILTER:
			return action.filter;
		default:
			return state;
	}
};

const language = (state = 'english', action) => {
	switch (action.type) {
		case types.SET_LANGUAGE:
			return action.language;
		default:
			return state;
	}
};

const chat = (state = {}, action) => {
	switch (action.type) {
		case types.SET_CHAT:
			return action.chat;
		default:
			return state;
	}
};

const events = (state = [], action) => {
	switch (action.type) {
		case types.SET_EVENTS:
			return action.events;
		case types.TOGGLE_FAVORITE:
			return R.map(event => {
				const favoriteID = typeof action.favorite.chat_id == 'string' ? parseInt(action.favorite.chat_id, 10) : action.favorite.chat_id;
				return event.id == favoriteID ? R.merge( event, { favorite: action.favorite.subscribed } ) : event;
			}, state);
		default:
			return state;
	}
};

const favorites = (state = [], action) => {
	switch (action.type) {
		case types.SET_FAVORITES:
			return action.favorites;
		case types.DELETE_FAVORITE:
			return R.filter(event => event.id != action.favorite.chat_id, state);
		default:
			return state;
	}
};

const favoritesCategories = (state = [], action) => {
	switch (action.type) {
		case types.SET_FAVORITES_CATEGORIES:
			return action.favorites;
		case types.DELETE_FAVORITE_CATEGORIES:
			return R.filter(event => event.id != action.favorite.chat_id, state);
		default:
			return state;
	}
};

const personal = (state = [], action) => {
	switch (action.type) {
		case types.SET_PERSONAL:
			return action.personal;
		case types.TOGGLE_FAVORITE:
			return R.map(event => {
				const favoriteID = typeof action.favorite.chat_id == 'string' ? parseInt(action.favorite.chat_id, 10) : action.favorite.chat_id;
				return event.id == favoriteID ? R.merge( event, { favorite: action.favorite.subscribed } ) : event;
			}, state);
		default:
			return state;
	}
};

const own = (state = [], action) => {
	switch (action.type) {
		case types.SET_OWN:
			return action.own;
		case types.TOGGLE_FAVORITE:
			return R.map(event => {
				const favoriteID = typeof action.favorite.chat_id == 'string' ? parseInt(action.favorite.chat_id, 10) : action.favorite.chat_id;
				return event.id == favoriteID ? R.merge( event, { favorite: action.favorite.subscribed } ) : event;
			}, state);
		default:
			return state;
	}
};

const categories = (state = [], action) => {
	switch (action.type) {
		case types.SET_CATEGORIES:
			return action.categories;
		default:
			return state;
	}
};

const user = (state = null, action) => {
	switch (action.type) {
		case types.SET_USER:
			return typeof action.user == 'object' ? action.user : JSON.parse(action.user);
		case types.LOG_OUT:
			return null;
		default:
			return state;
	}
};

const userInspected = (state = null, action) => {
	switch (action.type) {
		case types.SET_USER_INSPECTED:
			return typeof action.userInspected == 'object' ? action.userInspected : JSON.parse(action.userInspected);
		default:
			return state;
	}
};

const languages = (state = lang, action) => {
	switch (action.type) {
		case types.SET_LANGUAGES:
			const langs = {};
			action.languages.forEach(auxLang => {
				langs[auxLang.name.toLowerCase()] = auxLang.data;
			});
			return langs;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	filter,
	language,
	languages,
	routing,
	events,
	favorites,
	favoritesCategories,
	personal,
	own,
	categories,
	user,
	userInspected,
	chat
});

export default rootReducer;
