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

    // Sync Notes with Redux + Firebase
    Notes.sync(() => {
      dataLoaded.notes = true;
      checkLoadStatus();
    });

    // Sync User with Redux + Firebase
    Users.once(users => {
      dataLoaded.users = true;
      checkLoadStatus();
      User.save(users, user);

      // Sync Users with Redux + Firebase
      Users.sync();
    });
  });
};

export default Data;
