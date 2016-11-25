import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function setEvents(events) {
    return {
        type: types.SET_EVENTS,
        events
    };
}
