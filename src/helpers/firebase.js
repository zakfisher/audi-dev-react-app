import firebase from 'firebase';
import config from '../fixtures/firebase';

class Firebase {
  constructor() {
    firebase.initializeApp(config);
  }

  ref(endpoint) {
    return firebase.database().ref(endpoint);
  }

  // Using set() overwrites data at the specified location,
  // including any child nodes.
  set(endpoint, data, callback) {
    firebase
    .database()
    .ref(endpoint)
    .set(data, callback);
  }

  // The listener receives a snapshot that contains the data at the
  // specified location in the database at the time of the event.
  on(endpoint, callback) {
    const ref = firebase.database().ref(endpoint)
    ref.on('value', callback);
    return ref;
  }

  // Same as on(), but only fires callback once
  once(endpoint, callback) {
    firebase
    .database()
    .ref(endpoint)
    .once('value')
    .then(callback);
  }

  off(ref, callback) {
    if (ref) {
      ref.off('value', callback);
    }
  }

  // Github Login (via redirect)
  // https://firebase.google.com/docs/auth/web/github-auth
  githubLogin(success, error) {
    // Create an instance of the GitHub provider object
    const provider = new firebase.auth.GithubAuthProvider();

    // Grant read/write access to profile info
    provider.addScope('user');

    // Sign in with redirect
    firebase.auth().signInWithRedirect(provider);
  }

  // Retrieve the GitHub provider's OAuth token
  // (do this on page load to check if we're logged in)
  getGithubToken(success, error) {
    firebase
    .auth()
    .getRedirectResult()
    .then(success)
    .catch(error);
  }

  githubLoginWithToken(token, success, error) {
    const credential = firebase.auth.GithubAuthProvider.credential(token);
    firebase
    .auth()
    .signInWithCredential(credential)
    .then(success)
    .catch(error);
  }

}

export default new Firebase();
