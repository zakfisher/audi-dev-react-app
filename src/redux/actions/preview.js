/*
 * action types
 */

export const ENTER_PREVIEW_MODE = 'ENTER_PREVIEW_MODE';
export const EXIT_PREVIEW_MODE = 'EXIT_PREVIEW_MODE';

/*
 * action creators
 */

export function enterPreviewMode() {
  return {
    type: ENTER_PREVIEW_MODE
  };
}

export function exitPreviewMode() {
  return {
    type: EXIT_PREVIEW_MODE
  };
}
