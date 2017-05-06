/*
 * action types
 */

export const CLEAR_FILE_UPLOAD = 'CLEAR_FILE_UPLOAD';
export const COMPLETE_FILE_UPLOAD = 'COMPLETE_FILE_UPLOAD';

/*
 * action creators
 */

export function clearFileUpload() {
  return {
    type: CLEAR_FILE_UPLOAD
  };
}

export function completeFileUpload(downloadURL) {
  return {
    type: COMPLETE_FILE_UPLOAD,
    downloadURL
  };
}
