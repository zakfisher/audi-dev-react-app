import actions from '../actions';

const {
  ENTER_PREVIEW_MODE,
  EXIT_PREVIEW_MODE
} = actions;

export function previewMode(state = false, action) {
  switch (action.type) {

  case ENTER_PREVIEW_MODE:
    return true;

  case EXIT_PREVIEW_MODE:
    return false;

  default:
    return state;
  }
}
