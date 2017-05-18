import actions from '../redux/actions';
import store from '../redux/store';
import Firebase from './firebase';

/*
  1st GH login (with redirect) contains a token for subsequent logins.
  That token expires after 1hr.
  During that hour, each page refresh re-authorizes with GH using that token.

  To allow auth-free page refreshes, we will ignore the token login for 1hr on each page refresh.
  After 1hr of no refreshes, we fall back to GH auth.
*/

const setUser = (user, credential = null) => {
  if (!user) {
    return localStorage.clear();
  }

  // Set user in Redux
  store.dispatch(actions.setUser(user));

  // Cache user token
  if (credential) {
    const {accessToken} = credential;
    localStorage.setItem('user-token', accessToken);
  }

  // Cache user object
  localStorage.setItem('user', JSON.stringify(user));

  // Allow 1hr to set user from cache
  const now = (new Date()).getTime();
  const oneHour = 1000 * 60 * 60;
  localStorage.setItem('user-cache-expiration', now + oneHour);
};

const User = {};

User.logIn = () => {
  return new Promise((resolve, reject) => {

    // Set user from cache & escape
    const cache = localStorage.getItem('user');
    const cacheExp = localStorage.getItem('user-cache-expiration');
    const now = (new Date()).getTime();

    if (cache && cacheExp) {
      const okToUseCache = (now < parseInt(cacheExp, 10));
      if (okToUseCache) {
        let user = JSON.parse(cache);
        setUser(user);
        resolve(user);
        return;
      }
    }

    const loginWithRedirect = () => {
      Firebase.getGithubToken(result => {
        const {user, credential} = result;
        setUser(user, credential);
        resolve(user);
      }, error => {
        localStorage.setItem('login-error', error.message);
        resolve();
      });
    };

    const token = localStorage.getItem('user-token');
    const loginWithToken = () => {
      Firebase.githubLoginWithToken(token, user => {
        setUser(user);
        resolve(user);
      }, error => {
        localStorage.setItem('login-error', error.message);
        resolve();
      });
    };

    // Check for login error (from github redirect)
    const loginError = localStorage.getItem('login-error');
    if (loginError) {
      console.error('Login Error:', loginError);
      localStorage.clear();
      resolve();
    }

    // Set user from token (if already logged in) Otherwise set user from Github
    // Redirect
    token ? loginWithToken() : loginWithRedirect();
  });
};

User.logOut = () => {
  localStorage.clear();
  location.href = '/';
};

User.save = (users, user) => {

  // Scrape user object (provided by github)
  const {uid, displayName, email, photoURL} = user;

  // If this is a first-time login, create a record for this user
  let newUserData = {
    uid,
    displayName,
    email,
    photoURL,
    timestamp: (new Date()).getTime()
  };

  // If a user already exists, update the fields from github we care about
  const existingUser = users[uid];
  if (existingUser) {
    newUserData = {
      ...existingUser,
      ...newUserData
    };
  }

  // Save user in firebase
  Firebase.set(`users/${uid}`, newUserData);
};

export default User;
