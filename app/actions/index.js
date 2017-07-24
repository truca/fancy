import * as types from './types';


export function noAction() { return { type: types.NO_ACTION, ...arguments }; }
export function filterTable(filter) { return { type: types.FILTER, filter }; }
export function setMap(map) { return { type: types.SET_MAP, map }; }
export function setPosition(position) { return { type: types.SET_POSITION, position }; }
export function setMarker(marker) { return { type: types.SET_MARKER, marker }; }

export function orderChats(orderBy) { return { type: types.ORDER_CHATS, orderBy }; }
export function setChat(chat) { return { type: types.SET_CHAT, chat }; }
export function createChat(chat) { return { type: types.CREATE_CHAT, chat }; }
export function updateChat(chat) { return { type: types.UPDATE_CHAT, chat }; }

export function setCountries(countries) { return { type: types.SET_COUNTRIES, countries }; }
export function setEvents(events) { return { type: types.SET_EVENTS, events }; }
export function setMine(mine) { return { type: types.SET_MINE, mine }; }
export function setFavorites(favorites) { return { type: types.SET_FAVORITES, favorites }; }
export function setFavoritesCategories(favorites) { return { type: types.SET_FAVORITES_CATEGORIES, favorites }; }
export function setPersonal(personal) { return { type: types.SET_PERSONAL, personal }; }
export function setOwn(own) { return { type: types.SET_OWN, own }; }
export function setBlock(block) { return { type: types.SET_BLOCK, block }; }
export function addBlock(block) { return { type: types.ADD_BLOCK, block }; }
export function removeBlock(toID) { return { type: types.REMOVE_BLOCK, toID }; }
export function setBlocked(blocked) { return { type: types.SET_BLOCKED, blocked }; }
export function setLoginType(loginType) { return { type: types.SET_LOGIN_TYPE, loginType }; }
export function setShouldUpdateData(updateData) { return { type: types.SHOULD_UPDATE_DATA, updateData }; }

export function toggleFavorite(favorite) { return { type: types.TOGGLE_FAVORITE, favorite }; }
export function setCategories(categories) { return { type: types.SET_CATEGORIES, categories }; }
export function setMessages(messages) { return { type: types.SET_MESSAGES, messages }; }

export function setUser(user) { return { type: types.SET_USER, user }; }
export function setLanguage(language) { return { type: types.SET_LANGUAGE, language }; }
export function setLanguages(languages) { return { type: types.SET_LANGUAGES, languages }; }
export function setUserInspected(userInspected) { return { type: types.SET_USER_INSPECTED, userInspected }; }
export function logout() { return { type: types.LOG_OUT }; }

export function addFavoriteCategory(category) { return { type: types.ADD_FAVORITE_CATEGORY, category }; }
export function removeFavoriteCategory(categoryID) { return { type: types.REMOVE_FAVORITE_CATEGORY, categoryID }; }
