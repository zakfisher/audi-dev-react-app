import actions from '../actions';

const {CLEAR_FILE_UPLOAD, COMPLETE_FILE_UPLOAD} = actions;

/*
 * Reducers
 */

export function downloadURL(state = null, action) {
  switch (action.type) {

    case CLEAR_FILE_UPLOAD:
      return null;

    case COMPLETE_FILE_UPLOAD:
      return action.downloadURL;

    default:
      return state;
  }
}
