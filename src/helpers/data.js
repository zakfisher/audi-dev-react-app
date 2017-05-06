import actions from '../redux/actions';
import store from '../redux/store';
import User from './user';
import Notes from './notes';
import Users from './users';

let dataReady = false;

const Data = {};

const dataLoaded = {
  notes: false,
  users: false
};

const checkLoadStatus = () => {
  let ready = true;
  for (let key in dataLoaded) {
    if (!dataLoaded[key]) ready = false;
  }
  if (ready) Data.ready();
};

Data.ready = () => {
  // Tell Redux we're g2g
  if (dataReady) return;
  store.dispatch(
    actions.dataReady()
  );
  dataReady = true;
};

Data.fetch = () => {
  // Escape if data already fetched
  if (dataReady) return;

  // Check if the user is logged in
  User.logIn().then(user => {
    if (!user) return Data.ready();

    // Set user in Redux
    store.dispatch(
      actions.setUser(user)
    );

    // Set notes in Redux, and sync with firebase
    Notes.sync(() => {
      dataLoaded.notes = true;
      checkLoadStatus();
    });

    // Set users in Redux, and sync with firebase
    Users.sync(snapshot => {
      dataLoaded.users = true;
      checkLoadStatus();

      // Save user to firebase
      const users = snapshot.val();
      User.save(users, user);
    });

  });
};

export default Data;
