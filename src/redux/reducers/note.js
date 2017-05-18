import actions from '../actions';

const {SET_NOTES, SET_SEARCH_QUERY} = actions;

/*
 * Reducers
 */

export function notes(state = {}, action) {
  switch (action.type) {

    case SET_NOTES:
      return action.notes;

    default:
      return state;
  }
}

export function searchQuery(state = '', action) {
  switch (action.type) {

    case SET_SEARCH_QUERY:
      return action.query;

    default:
      return state;
  }
}
