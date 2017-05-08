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

const countries = (state = [], action) => {
	switch (action.type) {
		case types.SET_COUNTRIES:
			return action.countries;
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
		case types.CREATE_CHAT:
			return R.concat(state, [action.chat]);
		case types.UPDATE_CHAT:
			return R.map(chatAux => {
				if(chatAux.id == action.chat.id) return action.chat;
				return chatAux;
			}, state);
		case types.SET_FAVORITES:
			return R.map(event => {
				return R.merge( event, { favorite: (typeof R.find(fav => fav.id == event.id, action.favorites) !== 'undefined') } );
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
			return R.map(fav => {
				return R.merge(fav, { favorite: true });
			}, action.favorites);
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

const mine = (state = [], action) => {
	switch (action.type) {
		case types.SET_MINE:
			return action.mine;
		case types.SET_FAVORITES:
			return R.map(event => {
				return R.merge( event, { favorite: (typeof R.find(fav => fav.id == event.id, action.favorites) !== 'undefined') } );
			}, state);
		case types.TOGGLE_FAVORITE:
			return R.map(event => {
				const favoriteID = typeof action.favorite.chat_id == 'string' ? parseInt(action.favorite.chat_id, 10) : action.favorite.chat_id;
				return event.id == favoriteID ? R.merge( event, { favorite: action.favorite.subscribed } ) : event;
			}, state);
		case types.UPDATE_CHAT:
			return R.map(chatAux => {
				if(chatAux.id == action.chat.id) return action.chat;
				return chatAux;
			}, state);
		default:
			return state;
	}
};

const favoritesCategories = (state = [], action) => {
	switch (action.type) {
		case types.SET_FAVORITES_CATEGORIES:
			return action.favorites;
		case types.ADD_FAVORITE_CATEGORY:
			return R.concat(state, [action.category]);
		case types.REMOVE_FAVORITE_CATEGORY:
			return R.filter(event => event.id != action.categoryID, state);
		case types.LOG_OUT:
			return [];
		default:
			return state;
	}
};

const personal = (state = [], action) => {
	switch (action.type) {
		case types.SET_PERSONAL:
			return action.personal;
		case types.SET_FAVORITES:
			return R.map(event => {
				return R.merge( event, { favorite: (typeof R.find(fav => fav.id == event.id, action.favorites) !== 'undefined') } );
			}, state);
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
		case types.SET_FAVORITES:
			return R.map(event => {
				return R.merge( event, { favorite: (typeof R.find(fav => fav.id == event.id, action.favorites) !== 'undefined') } );
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

const orderBy = (state = 'distance', action) => {
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

const languageAcronym = (state = {acronym: 'en', langs: {}}, action) => {
	switch (action.type) {
		case types.SET_LANGUAGES:
			const langs = {};
			action.languages.forEach(auxLang => {
				langs[auxLang.name.toLowerCase()] = auxLang.code;
			});
			return R.merge(state, { langs });
		case types.SET_LANGUAGE:
			return R.merge(state, { acronym: state.langs[action.language] });
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	mine,
	languageAcronym,
	filter,
	countries,
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
