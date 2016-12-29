import * as types from './types';


export function noAction() { return { type: types.NO_ACTION, ...arguments }; }
export function filterTable(filter) { return { type: types.FILTER, filter }; }
export function toggleFavorite(eventID) { return { type: types.TOGGLE_FAVORITE, eventID }; }

export function setChat(chat) { return { type: types.SET_CHAT, chat }; }
export function setEvents(events) { return { type: types.SET_EVENTS, events }; }
export function setFavorites(favorites) { return { type: types.SET_FAVORITES, favorites }; }
export function setCategories(categories) { return { type: types.SET_CATEGORIES, categories }; }
export function setPersonalChats(personalChats) { return { type: types.SET_PERSONAL_CHATS, personalChats }; }
export function setOwnChats(ownChats) { return { type: types.SET_OWN_CHATS, ownChats }; }
export function setMessages(messages) { return { type: types.SET_MESSAGES, messages }; }

export function setUser(user) { return { type: types.SET_USER, user }; }
export function logout() { return { type: types.LOG_OUT }; }
