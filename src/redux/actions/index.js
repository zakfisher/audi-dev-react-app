import * as dataActions from './data';
import * as fileActions from './file';
import * as noteActions from './note';
import * as userActions from './user';
import * as previewActions from './preview';

/**
  App Actions
  ---
  ./src/actions/index.js

  - The app actions include all of the actions used by this app.

  - In this file we can choose to use only the actions that we absolutely need
  (in case this repo houses many apps).

  @returns {object} appActions
*/

const appActions = {
  ...dataActions,
  ...fileActions,
  ...noteActions,
  ...userActions,
  ...previewActions
};

export default appActions;
