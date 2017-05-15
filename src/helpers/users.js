import actions from '../redux/actions';
import store from '../redux/store';
import Firebase from './firebase';

let ref = null;

const setUsers = users => {

  // Cache users object
  localStorage.setItem('users', JSON.stringify(users));

  // Set users in redux
  store.dispatch(
    actions.setUsers(users)
  );
};

const Users = {};

Users.once = callback => {
  ref = Firebase.once('users', snapshot => {
    const users = snapshot.val();
    setUsers(users);
    callback(users);
  });
};

Users.sync = callback => {

  // Set users from localStorage
  const cache = JSON.parse(localStorage.getItem('users'));
  if (cache) {
    setUsers(cache);
    if (callback) callback(cache);
  }

  // Sync with firebase
  ref = Firebase.on('users', snapshot => {
    const users = snapshot.val();
    setUsers(users);
    if (callback) callback(users);
  });
};

Users.cancel = () => {
  Firebase.off(ref, setUsers);
  store.dispatch(
    actions.setUsers({})
  );
};

export default Users;
