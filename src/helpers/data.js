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

    // Sync Notes with Redux + Firebase
    Notes.once(() => {
      dataLoaded.notes = true;
      checkLoadStatus();
      Notes.sync();
    });

    // Sync User(s) with Redux + Firebase
    Users.once(users => {
      dataLoaded.users = true;
      checkLoadStatus();
      User.save(users, user);
      Users.sync();
    });
  });
};

export default Data;
