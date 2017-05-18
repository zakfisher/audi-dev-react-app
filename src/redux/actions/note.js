/*
 * action types
 */

export const SET_NOTES = 'SET_NOTES';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

/*
 * action creators
 */

export function setNotes(notes) {
  return {type: SET_NOTES, notes};
}

export function setSearchQuery(query) {
  return {type: SET_SEARCH_QUERY, query};
}
