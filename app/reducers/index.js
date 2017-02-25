import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import R from 'ramda';
import * as types from '../actions/types';
import lang from '../translate2.js';


const filter = (state = '', action) => {
	console.log(action.type);
	console.log(JSON.stringify(action));
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
		case types.UPDATE_CHAT:
			if(state.id == action.chat.id) return action.chat;
			return state;
		default:
			return state;
	}
};

const events = (state = [], action) => {
	switch (action.type) {
		case types.SET_EVENTS:
			return action.events;
		case types.UPDATE_CHAT:
			return R.map(chatAux => {
				if(chatAux.id == action.chat.id) return action.chat;
				return chatAux;
			}, state);
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
		case types.UPDATE_CHAT:
			return R.map(chatAux => {
				if(chatAux.id == action.chat.id) return action.chat;
				return chatAux;
			}, state);
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
		case types.UPDATE_CHAT:
			return R.map(chatAux => {
				if(chatAux.id == action.chat.id) return action.chat;
				return chatAux;
			}, state);
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
		case types.UPDATE_CHAT:
			return R.map(chatAux => {
				if(chatAux.id == action.chat.id) return action.chat;
				return chatAux;
			}, state);
		case types.TOGGLE_FAVORITE:
			return R.map(event => {
				const favoriteID = typeof action.favorite.chat_id == 'string' ? parseInt(action.favorite.chat_id, 10) : action.favorite.chat_id;
				return event.id == favoriteID ? R.merge( event, { favorite: action.favorite.subscribed } ) : event;
			}, state);
		default:
			return state;
	}
};

const block = (state = [], action) => {
	switch (action.type) {
		case types.SET_BLOCK:
			return action.block;
		case types.ADD_BLOCK:
			return R.concat(state, [action.block]);
		case types.REMOVE_BLOCK:
			return R.filter(blockAux => blockAux.to_id !== action.toID, state);
		default:
			return state;
	}
};

const blocked = (state = [], action) => {
	switch (action.type) {
		case types.SET_BLOCKED:
			return action.blocked;
		default:
			return state;
	}
};

const loginType = (state = null, action) => {
	switch (action.type) {
		case types.SET_LOGIN_TYPE:
			return action.loginType;
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

const orderBy = (state = 'no', action) => {
	switch (action.type) {
		case types.ORDER_CHATS:
			return action.orderBy;
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
	orderBy,
	language,
	languages,
	routing,
	events,
	favorites,
	favoritesCategories,
	personal,
	own,
	block,
	blocked,
	loginType,
	categories,
	user,
	userInspected,
	chat
});

export default rootReducer;
