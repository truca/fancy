import * as types from './types';


export function noAction() { return { type: types.NO_ACTION, ...arguments }; }
export function filterTable(filter) { return { type: types.FILTER, filter }; }

export function orderChats(orderBy) { return { type: types.ORDER_CHATS, orderBy }; }
export function setChat(chat) { return { type: types.SET_CHAT, chat }; }
export function setEvents(events) { return { type: types.SET_EVENTS, events }; }
export function setFavorites(favorites) { return { type: types.SET_FAVORITES, favorites }; }
export function setFavoritesCategories(favorites) { return { type: types.SET_FAVORITES_CATEGORIES, favorites }; }
export function setPersonal(personal) { return { type: types.SET_PERSONAL, personal }; }
export function setOwn(own) { return { type: types.SET_OWN, own }; }

export function toggleFavorite(favorite) { return { type: types.TOGGLE_FAVORITE, favorite }; }
export function setCategories(categories) { return { type: types.SET_CATEGORIES, categories }; }
export function setMessages(messages) { return { type: types.SET_MESSAGES, messages }; }

export function setUser(user) { return { type: types.SET_USER, user }; }
export function setLanguage(language) { return { type: types.SET_LANGUAGE, language }; }
export function setLanguages(languages) { return { type: types.SET_LANGUAGES, languages }; }
export function setUserInspected(userInspected) { return { type: types.SET_USER_INSPECTED, userInspected }; }
export function logout() { return { type: types.LOG_OUT }; }
